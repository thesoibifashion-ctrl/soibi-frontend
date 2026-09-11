import { Product } from "@/types/Index";

const STORAGE_KEY = "favorites";

function readAll(): Product[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch (error) {
    console.error("Failed to read local favorites:", error);
    return [];
  }
}

function writeAll(products: Product[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function getLocalFavorites(): Product[] {
  return readAll();
}

export function isLocalFavorite(productId: string): boolean {
  return readAll().some((product) => product.id === productId);
}

export function addLocalFavorite(product: Product) {
  const current = readAll();

  if (current.some((item) => item.id === product.id)) return;

  writeAll([...current, product]);
}

export function removeLocalFavorite(productId: string) {
  const current = readAll();

  writeAll(current.filter((item) => item.id !== productId));
}