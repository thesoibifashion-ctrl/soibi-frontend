import { formatStatus, formatDate, formatPrice } from "@/lib/format";
import { TrackingOrder } from "@/types/cart.types";
import { ArrowLeft, Check, Package } from "lucide-react";
import Link from "next/link";


interface TrackingSummaryProps {
  order: TrackingOrder;
  total: number;
}

const TrackingSummary = ({
  order,
  total,
}: TrackingSummaryProps) => {
  return (
    <aside className="lg:sticky lg:top-8 lg:h-fit">
      <div className="overflow-hidden rounded-2xl bg-[#0E0E0E] text-white">
        <div className="p-6">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A56423]">
            Order Summary
          </p>

          <h2 className="mt-2 font-display text-2xl font-bold">
            {order.orderNumber}
          </h2>

          <div className="mt-7 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs text-white/50">
                Items
              </span>

              <span className="text-sm">
                {order.items.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs text-white/50">
                Status
              </span>

              <span className="text-xs text-[#A56423]">
                {formatStatus(order.status)}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs text-white/50">
                Ordered
              </span>

              <span className="text-xs">
                {formatDate(order.createdAt)}
              </span>
            </div>

            <div className="flex items-end justify-between pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                Order Total
              </span>

              <span className="font-display text-2xl font-bold text-[#A56423]">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-white/[0.03] px-6 py-5">
          <div className="flex items-start gap-3">
            <Check
              size={15}
              className="mt-0.5 shrink-0 text-[#A56423]"
            />

            <p className="text-xs leading-5 text-white/50">
              Your order status is updated by our team as it moves through the
              fulfilment process.
            </p>
          </div>
        </div>
      </div>

      {/* <Link
        href={`/tracking/${order.orderNumber}`}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D9D4CA] bg-white py-3.5 text-xs font-semibold uppercase tracking-widest text-[#0E0E0E] transition hover:border-[#A56423]"
      >
        <Package size={14} />
        View Order Details
      </Link> */}

      <Link
        href="/history"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D9D4CA] bg-white py-3.5 text-xs font-semibold uppercase tracking-widest text-[#0E0E0E] transition hover:border-[#A56423]"
      >
        <ArrowLeft size={14} />
        Back to Order History
      </Link>
    </aside>
  );
};

export default TrackingSummary;