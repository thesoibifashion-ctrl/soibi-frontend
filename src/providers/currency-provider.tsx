"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getCart, updateCartAddress } from "@/api/features/cart";
import { useAuth } from "@/providers/query-provider";
import { getGuestCartItems } from "@/hooks/use-guest-cart";
import { useQueryClient } from "@tanstack/react-query";

interface CurrencyContextType {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

const STORAGE_KEY = "selectedCurrency";
const GUEST_CART_CURRENCY_KEY = "guest-cart-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const queryClient = useQueryClient();
  const { isAuthenticated, isInitializing } = useAuth();

  useEffect(() => {
    const savedCurrency = localStorage.getItem(STORAGE_KEY);
  
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    } else {
      localStorage.setItem(STORAGE_KEY, "NGN");
    }
  }, []);

  useEffect(() => {
    if (!selectedCurrency || isInitializing) return;

    const syncCartCurrency = async () => {
      try {
        if (isAuthenticated) {
          const cart = await getCart();

          if (!cart?.items?.length) return;

          await updateCartAddress({
            selectedCurrency,
          });

          queryClient.invalidateQueries({ queryKey: ["cart"] });

          return;
        }

        const guestItems = getGuestCartItems();

        if (!guestItems.length) return;

        localStorage.setItem(
          GUEST_CART_CURRENCY_KEY,
          selectedCurrency
        );

        window.dispatchEvent(new Event("guest-cart-updated"));
      } catch (error) {
        console.error("Failed to sync cart currency:", error);
      }
    };

    syncCartCurrency();
  }, [selectedCurrency, queryClient, isAuthenticated, isInitializing]);

  const handleSetCurrency = (currency: string) => {
    if (!currency) return;

    setSelectedCurrency(currency);
    localStorage.setItem(STORAGE_KEY, currency);

  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency: handleSetCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }

  return context;
}
