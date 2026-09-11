import { CartHistory } from "@/types/cart.types";
import {
    CalendarDays,
    ChevronRight,
    Package,
    ReceiptText,
    Truck,
  } from "lucide-react";
  import Link from "next/link";

  interface OrderHistoryCardProps {
    order: CartHistory;
    index: number;
  }
  
  const formatPrice = (value: number) =>
    `₦${Number(value || 0).toLocaleString("en-NG")}`;
  
  const formatDate = (date?: string | null) => {
    if (!date) return "—";
  
    return new Date(date).toLocaleDateString("en-NG", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  

  const getStatusLabel = (status?: string) => {
    if (!status) return "Submitted";
  
    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  
  const OrderHistoryCard = ({
    order,
    index,
  }: OrderHistoryCardProps) => {
    const firstItem = order.items?.[0];
  
    const itemCount = order.items?.reduce(
      (total, item) => total + item.quantity,
      0
    );
  
    return (
      <div className="group block overflow-hidden rounded-2xl border border-black/10 bg-white transition duration-300 hover:-translate-y-0.5 hover:border-[#C9A227]/40 hover:shadow-xl hover:shadow-black/5">
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="relative h-64 w-full overflow-hidden bg-[#EDEAE4] lg:h-auto lg:w-56 lg:min-w-56">
            {firstItem?.imageUrlSnapshot ? (
              <img
                src={firstItem.imageUrlSnapshot}
                alt={firstItem.productNameSnapshot || "Order item"}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full min-h-64 items-center justify-center">
                <Package
                  size={28}
                  strokeWidth={1.5}
                  className="text-black/20"
                />
              </div>
            )}
  
            <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#0E0E0E]/90 text-[10px] font-bold text-[#A56423]">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
  
          {/* Content */}
          <div className="flex flex-1 flex-col p-6 lg:p-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A56423]">
                    Order
                  </span>
  
                  <span className="text-xs font-semibold text-black/40">
                    #
                    {order.orderNumber ||
                      order.id.slice(0, 8).toUpperCase()}
                  </span>
                </div>
  
                <h3 className="mt-3 font-display text-xl font-bold text-[#0E0E0E] lg:text-2xl">
                  {firstItem?.productNameSnapshot ||
                    "Signature By Sarah Order"}
                </h3>
  
                {order.items.length > 1 && (
                  <p className="mt-1 text-xs text-black/40">
                    + {order.items.length - 1} other{" "}
                    {order.items.length - 1 === 1 ? "item" : "items"}
                  </p>
                )}
              </div>
  
              <span
                className={`h-fit w-fit rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider ${getStatusLabel(
                  order.status
                )}`}
              >
                {getStatusLabel(order.status)}
              </span>
            </div>
  
            {/* Meta */}
            <div className="mt-7 grid grid-cols-2 gap-5 border-y border-black/5 py-5 sm:grid-cols-3">
              <div>
                <div className="flex items-center gap-2 text-black/30">
                  <CalendarDays size={13} />
                  <span className="text-[9px] font-bold uppercase tracking-wider">
                    Submitted
                  </span>
                </div>
  
                <p className="mt-2 text-xs font-semibold text-[#0E0E0E]">
                  {formatDate(order.completedAt || order.createdAt)}
                </p>
              </div>
  
              <div>
                <div className="flex items-center gap-2 text-black/30">
                  <Package size={13} />
                  <span className="text-[9px] font-bold uppercase tracking-wider">
                    Items
                  </span>
                </div>
  
                <p className="mt-2 text-xs font-semibold text-[#0E0E0E]">
                  {itemCount} {itemCount === 1 ? "Piece" : "Pieces"}
                </p>
              </div>
  
              <div className="col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 text-black/30">
                  <ReceiptText size={13} />
                  <span className="text-[9px] font-bold uppercase tracking-wider">
                    Total
                  </span>
                </div>
  
                <p className="mt-2 font-display text-lg font-bold text-[#A56423]">
                  {formatPrice(order.totalSnapshot)}
                </p>
              </div>
            </div>
  
            {/* Footer */}
            <div className="mt-5 flex items-center justify-between gap-3">
              <Link
                href={`/history/${order.id}`}
                className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/35 transition hover:text-[#927f04]"
              >
                View order details
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition hover:border-[#C9A227] hover:bg-[#C9A227]">
                  <ChevronRight
                    size={15}
                    className="text-black/50 transition group-hover:text-[#0E0E0E]"
                  />
                </span>
              </Link>
  
              <Link
                href={`/tracking/${order.orderNumber}`}
                className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#927f04] transition hover:text-[#C9A227]"
              >
                Track order
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A227]/30 transition hover:border-[#C9A227] hover:bg-[#C9A227]">
                  <Truck
                    size={14}
                    className="text-[#A56423] transition hover:text-[#0E0E0E]"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default OrderHistoryCard