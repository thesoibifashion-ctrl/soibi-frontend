"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

import OrderHeader from "./OrderHeader";
import OrderItems from "./OrderItems";
import OrderStatusHistory from "./OrderStatusHistory";
import OrderShipping from "./OrderShipping";
import OrderPayment from "./OrderPayment";
import OrderSummary from "./OrderSummary";
import OrderUnavailable from "./OrderUnavailable";
import Container from "@/components/shared/Container";
import { CartHistory } from "@/types/cart.types";
import { apiGet } from "@/api/requests/auth";

const HistoryView = () => {
  const params = useParams();
  const orderId = params?.id as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart-order", orderId],
    queryFn: () => apiGet<CartHistory>(`/api/cart/history/${orderId}`),
    enabled: !!orderId,
  });

  const order = data;
  if (isLoading) {
    return (
      <main className="min-h-screen bg-off-white py-10">
        <Container>
          <div className="flex min-h-[60vh] items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-[#C9A227]" />
          </div>
        </Container>
      </main>
    );
  }

  if (isError || !order) {
    return <OrderUnavailable />;
  }

  return (
    <main className="min-h-screen mt-20 bg-[#EEEEEE] py-8 lg:py-12">
      <Container>
        <div className="mx-auto max-w-6xl">
          <OrderHeader order={order} />

          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-6">
              <OrderItems order={order} />
              <OrderStatusHistory order={order} />
              {/* <OrderShipping order={order} /> */}
              <OrderPayment order={order} />
            </div>
            <OrderSummary order={order} />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default HistoryView;
