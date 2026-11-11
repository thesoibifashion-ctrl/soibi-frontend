"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authStorage, initializeAuth } from "@/lib/auth-storage";

export interface AuthContextValue {
  isAuthenticated: boolean;
  isInitializing: boolean;
  user: Record<string, unknown> | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within QueryProvider");
  return context;
}

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  useEffect(() => {
    let active = true;
    const handleAuthChange = () => {
      setIsAuthenticated(Boolean(authStorage.getToken()));
      setUser(authStorage.getUser());
      if (authStorage.getToken()) setIsInitializing(false);
    };
    window.addEventListener("auth-change", handleAuthChange);
    const initialize = () => void initializeAuth().then(() => {
      if (active) {
        setIsAuthenticated(Boolean(authStorage.getToken()));
        setUser(authStorage.getUser());
        if (!authStorage.hasTransientRefreshFailure()) setIsInitializing(false);
      }
    });
    const handleOnline = () => initialize();
    window.addEventListener("online", handleOnline);
    initialize();
    return () => {
      active = false;
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("online", handleOnline);
    };
  }, []);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, isInitializing, user }}>
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}
