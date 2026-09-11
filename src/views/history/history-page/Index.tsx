"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import OrderHistoryHeader from "./OrderHistoryHeader";
import OrderHistoryError from "./OrderHistoryError";
import OrderHistoryEmpty from "./OrderHistoryEmpty";
import OrderHistoryList from "./OrderHistoryList";
import Container from "@/components/shared/Container";
import { CartHistory } from "@/types/cart.types";
import { isAuthenticated } from "@/api/features/cart";
import { apiGet } from "@/api/requests/auth";


const OrderHistoryPage = () => {
  // const { session, isLoading: isSessionLoading } = useSession();

  const {
    data,
    isLoading: isHistoryLoading,
    isError,
  } = useQuery({
    queryKey: ["cart-history"],
    queryFn: () => apiGet<CartHistory[]>("/api/cart/history"),
    enabled: !!isAuthenticated,
  });

  // const history: CartHistory[] = data ?? [];

  if ( isHistoryLoading) {
    return (
      <main className="min-h-screen bg-[#F8F6F2]">
        <Container>
          <div className="flex min-h-[70vh] items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-[#C9A227]" />
          </div>
        </Container>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#EEEEEE]">
        <Container>
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="max-w-md text-center">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#927f04]">
                01 / Account Required
              </p>

              <h1 className="font-display text-3xl font-bold text-[#0E0E0E]">
                Your Orders
              </h1>

              <p className="mt-4 text-sm leading-7 text-black/50">
                Please sign in to view your submitted orders and order history.
              </p>

              <a
                href="/login"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0E0E0E] px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#C9A227] hover:text-[#0E0E0E]"
              >
                Sign In
              </a>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen mt-20 bg-[#EEEEEE] py-10 lg:py-16">
      <Container>
        <div className="mx-auto max-w-6xl">
          <OrderHistoryHeader />

          {isError && <OrderHistoryError />}

          {!isError && data?.length === 0 && <OrderHistoryEmpty />}

          {!isError && data &&  data.length > 0 && (
            <OrderHistoryList history={data} />
          )}
        </div>
      </Container>
    </main>
  );
};

export default OrderHistoryPage;