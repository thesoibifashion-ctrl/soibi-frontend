"use client";

import { addCartItem, submitCart as submitCartRequest } from "@/api/features/cart";
import { isAuthenticated } from "@/lib/auth-finder";
import { toast } from "sonner";

export const GUEST_CART_KEY = "guest-cart";

export interface CartItemPayload {
  productId: string | null;
  productNameSnapshot: string;
  imageUrlSnapshot: string | null;
  quantity: number;
  selectedSize: number | string | null;
  selectedColor: string | null;
  selectedMaterial: string | null;
  unitPriceSnapshot: number;
  customMeasurements: Record<string, string> | null;
}

export interface GuestCheckoutDetails {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  contactMethod: "email" | "whatsapp";
  state?: string;
  city?: string;
  address?: string;
}

export interface AuthenticatedCheckoutDetails {
  contactMethod: "email" | "whatsapp";
  phoneNumber?: string;
}

function readGuestCart(): CartItemPayload[] {
  const stored = localStorage.getItem(GUEST_CART_KEY);

  try {
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeGuestCart(items: CartItemPayload[]) {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("guest-cart-updated"));
}

function clearGuestCart() {
  localStorage.removeItem(GUEST_CART_KEY);
  window.dispatchEvent(new Event("guest-cart-updated"));
}

function isSameLineItem(a: CartItemPayload, b: CartItemPayload) {
  return (
    a.productId === b.productId &&
    a.selectedSize === b.selectedSize &&
    a.selectedColor === b.selectedColor &&
    a.selectedMaterial === b.selectedMaterial &&
    JSON.stringify(a.customMeasurements) === JSON.stringify(b.customMeasurements)
  );
}

/**
 * Single entry point for adding an item to cart, from anywhere in the app
 * (product cards, quick view, product detail page, etc).
 * Branches authenticated vs. guest internally so callers never think about it.
 */
export async function addToCart(item: CartItemPayload) {
  if (isAuthenticated()) {
    await addCartItem(item);
    toast.success("Added to cart");
    return;
  }

  const guestItems = readGuestCart();
  const existingIndex = guestItems.findIndex((existing) => isSameLineItem(existing, item));

  if (existingIndex !== -1) {
    guestItems[existingIndex] = {
      ...guestItems[existingIndex],
      quantity: guestItems[existingIndex].quantity + item.quantity,
    };
  } else {
    guestItems.push(item);
  }

  writeGuestCart(guestItems);
  toast.success("Added to cart");
}

/**
 * Called once, right after a successful login (email/password or Google).
 * Pushes every locally-stored guest-cart item into the now-authenticated
 * user's real cart via POST /api/cart/items — the backend itself merges
 * quantities for matching product/size/color/material/measurement
 * combinations, so this is a simple per-item loop, not a manual merge.
 */
export async function syncGuestCartToServer() {
  const guestItems = readGuestCart();

  if (guestItems.length === 0) return;

  const results = await Promise.allSettled(guestItems.map((item) => addCartItem(item)));

  const failed = results.filter((r) => r.status === "rejected").length;

  if (failed > 0) {
    toast.error(`${failed} item(s) couldn't be synced to your cart`);
  }

  clearGuestCart();
}

/**
 * Checkout for a logged-in customer: submits their real, server-side active
 * cart via POST /api/cart/submit. No items are sent — the backend already
 * knows the active cart's contents.
 */
export async function submitAuthenticatedCart(details: AuthenticatedCheckoutDetails) {
  const response = await submitCartRequest({
    contactMethod: details.contactMethod,
    phoneNumber: details.phoneNumber,
  });

  toast.success("Order submitted");
  return response;
}

/**
 * One-time guest checkout: sends the current localStorage cart items plus
 * guest contact/delivery details straight to POST /api/cart/submit with no
 * auth token. The backend creates a standalone order — there is no ongoing
 * guest cart to sync afterward, so localStorage is cleared once this
 * succeeds.
 */
export async function submitGuestCart(details: GuestCheckoutDetails) {
  const guestItems = readGuestCart();

  if (guestItems.length === 0) {
    throw new Error("Your cart is empty");
  }

  const response = await submitCartRequest({
    contactMethod: details.contactMethod,
    guestName: details.guestName,
    guestEmail: details.guestEmail,
    guestPhone: details.guestPhone,
    state: details.state,
    city: details.city,
    address: details.address,
    items: guestItems,
  });

  clearGuestCart();
  toast.success("Order submitted");
  return response;
}

export function getGuestCartItems(): CartItemPayload[] {
  return readGuestCart();
}