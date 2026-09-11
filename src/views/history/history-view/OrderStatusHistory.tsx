import { Check, Clock3 } from "lucide-react";

import { Cart, CartHistory } from "@/types/cart.types";
import { formatDateTime, formatStatus } from "@/lib/format";

interface OrderStatusHistoryProps {
  order: CartHistory;
}

const OrderStatusHistory = ({ order }: OrderStatusHistoryProps) => {
  if (!order.statusHistory || order.statusHistory.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-[#E5E1D9] bg-white p-6">
      <div className="mb-7">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#927f04]">
          02
        </p>

        <h2 className="mt-1 font-display text-xl font-bold text-[#0E0E0E]">
          Order Progress
        </h2>
      </div>

      <div className="relative space-y-7">
        {order.statusHistory.map((history, index) => (
          <div
            key={history.id || `${history.oldStatus}-${index}`}
            className="relative flex gap-4"
          >
            {index !== order.statusHistory!.length - 1 && (
              <div className="absolute left-[13px] top-8 h-full w-px bg-[#EDEAE4]" />
            )}

            <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/30 bg-[#F8F6F2]">
              {index === 0 ? (
                <Check size={13} className="text-[#927f04]" />
              ) : (
                <Clock3 size={13} className="text-[#927f04]" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-[#0E0E0E]">
                  {formatStatus(history.oldStatus || "")}
                </p>

                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                  {formatDateTime(history.createdAt)}
                </p>
              </div>

              {history.note && (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {history.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderStatusHistory;