// api/features/cart.ts

import { apiGet, apiPost, apiPatch, apiDelete } from "@/api/requests/auth";
import { publicApiPost } from "@/api/requests/public";
import { Favorite, Product } from "@/types/Index";
import { useQuery } from "@tanstack/react-query";


// ======================================================
// TYPES
// ======================================================

export interface CartItemPayload {
  productId?: string | null;
  productNameSnapshot?: string | null;
  imageUrlSnapshot?: string | null;
  quantity: number;
  selectedSize?: number | string | null;
  selectedColor?: string | null;
  selectedMaterial?: string | null;
  unitPriceSnapshot: number;
  customMeasurements?: Record<string, string | number> | null;
  customNotes?: string | null;

  pricesSnapshot?: {
    name: string;
    amount: number;
    symbol: string;
    currency: string;
    currencyId: string;
  }[];
}

export interface GuestQuoteItem {
  productId?: string | null;
  productNameSnapshot?: string | null;
  imageUrlSnapshot?: string | null;
  shoeNameSnapshot?: string | null;
  toeStyleSnapshot?: string | null;
  size?: number | null;
  material?: string | null;
  color?: string | null;
  quantity: number;
  unitPriceSnapshot?: number | null;
  customMeasurements?: Record<string, string | number> | null;
  customNotes?: string | null;
}

export interface GuestQuotePayload {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  customerNotes?: string;
  items: GuestQuoteItem[];

  state?: string | null;
  city?: string | null;
  address?: string | null;
  receiptUrl?: string | null;
}

export interface CartItem {
  id: string;
  productId: string | null;
  productNameSnapshot: string | null;
  currency: string;
  imageUrlSnapshot: string | null;
  quantity: number;
  selectedSize: number | string | null;
  selectedColor: string | null;
  selectedMaterial: string | null;
  unitPriceSnapshot: number;
  customMeasurements?: Record<string, string | number> | null;
  customNotes?: string | null;

  pricesSnapshot?: {
    name: string;
    amount: number;
    symbol: string;
    currency: string;
    currencyId: string;
  }[];
}

export interface Cart {
  id: string;
  profileId: string;
  status: "active" | "submitted" | "abandoned";
  items: CartItem[];
  state?: string | null;
  city?: string | null;
  address?: string | null;
  selectedCurrency?:string;
  paymentUrl?: string | null;
  receiptUrl?: string | null;

  pricesSnapshot?: {
    name: string;
    amount: number;
    symbol: string;
    currency: string;
    currencyId: string;
  }[];
}

export interface CartHistory {
  id: string;
  originalCartId: string;
  profileId: string;
  items: CartItem[];
  totalSnapshot: number;
  completedAt: string;
  createdAt: string;
}


// ======================================================
// AUTHENTICATED CART
// ======================================================

// GET /api/cart
export const getCart = () => {
  return apiGet<Cart>("/api/cart");
};


// POST /api/cart/items
export const addCartItem = (payload: CartItemPayload) => {
  return apiPost<Cart>("/api/cart/items", payload);
};


// PATCH /api/cart/items/:id
export const updateCartItem = (
  id: string,
  payload: {
    quantity?: number;
    selectedSize?: number | string | null;
    selectedColor?: string | null;
    selectedMaterial?: string | null;
  }
) => {
  return apiPatch<Cart>(`/api/cart/items/${id}`, payload);
};


// DELETE /api/cart/items/:id
export const removeCartItem = (id: string) => {
  return apiDelete<Cart>(`/api/cart/items/${id}`);
};


// DELETE /api/cart
export const clearCart = () => {
  return apiDelete<Cart>("/api/cart");
};


// POST /api/cart/submit
export const submitCart = (payload: {
  contactMethod: "email" | "whatsapp";
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  state?: string;
  city?: string;
  address?: string;
  phoneNumber?: string;
  items?:CartItemPayload[];
}) => {
  return apiPost<{
    submittedCartId: string;
    historyId: string;
    newActiveCartId: string;
  }>("/api/cart/submit", payload);
};


// GET /api/cart/history
export const getCartHistory = () => {
  return apiGet<CartHistory[]>("/api/cart/history");
};


// GET /api/cart/history/:id
export const getCartHistoryById = (id: string) => {
  return apiGet<CartHistory>(`/api/cart/history/${id}`);
};


// PATCH /api/cart/history/:id/receipt
export const updateCartHistoryReceipt = (
  id: string,
  payload: {
    receiptUrl: string | null;
    receiptPublicId?: string | null;
  }
) => {
  return apiPatch<CartHistory>(
    `/api/cart/history/${id}/receipt`,
    payload
  );
};


export const updateCartAddress = (payload: {
  state?: string | null;
  city?: string | null;
  address?: string | null;
  paymentUrl?: string | null;
  receiptUrl?: string | null;
  selectedCurrency?: string | null;
}) => {
  return apiPatch<Cart>("/api/cart", payload);
};

// ======================================================
// GUEST QUOTE
// ======================================================

// POST /api/quotes
export const createGuestQuote = (payload: GuestQuotePayload) => {
  return publicApiPost("/api/quotes", payload);
};


// ======================================================
// AUTH STATE
// ======================================================

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;

  return !!localStorage.getItem("accessToken");
};


// ======================================================
// FAVORITES
// ======================================================

// GET /api/favorites
export const getFavorites = () => {
  return apiGet<Favorite[]>("/api/favorites");
};
export const useFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });
};

// POST /api/favorites/:productId
export const addFavorite = (productId: string) => {
  return apiPost(`/api/favorites/${productId}`, {});
};


// DELETE /api/favorites/:productId
export const removeFavorite = (productId: string) => {
  return apiDelete(`/api/favorites/${productId}`);
};