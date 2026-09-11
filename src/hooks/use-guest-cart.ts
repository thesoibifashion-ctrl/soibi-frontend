"use client";

import type { CartItemPayload } from "@/api/features/cart";

export const GUEST_CART_KEY = "guest-cart";

export interface GuestCartItem extends CartItemPayload {
  localId: string;
  currency:string
}

function read(): GuestCartItem[] {
  const stored = localStorage.getItem(GUEST_CART_KEY);

  try {
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items: GuestCartItem[]) {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("guest-cart-updated"));
}

export function getGuestCartItems(): GuestCartItem[] {
  return read();
}

export function updateGuestCartItemQuantity(localId: string, quantity: number) {
  const items = read().map((item) =>
    item.localId === localId ? { ...item, quantity: Math.max(1, quantity) } : item
  );
  write(items);
  return items;
}

export function removeGuestCartItem(localId: string) {
  const items = read().filter((item) => item.localId !== localId);
  write(items);
  return items;
}

export function clearGuestCart() {
  localStorage.removeItem(GUEST_CART_KEY);
  window.dispatchEvent(new Event("guest-cart-updated"));
}