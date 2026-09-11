import { CartHistory } from "@/types/cart.types";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";


interface OrderHeaderProps {
  order: CartHistory;
}

const OrderHeader = ({ order }: OrderHeaderProps) => {
  return (
    <div className="mb-8">
      <Link
        href="/history"
        className="mb-6 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 transition hover:text-[#A56423]"
      >
        <ArrowLeft size={14} />
        Order History
      </Link>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A56423]">
            Order Details
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight text-[#0E0E0E] lg:text-4xl">
              {order.orderNumber || `#${order.id.slice(0, 8).toUpperCase()}`}
            </h1>

            {/* <span
              className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${getStatusClasses(
                order.status
              )}`}
            >
              {formatStatus(order.status)}
            </span> */}
          </div>
{/* 
          <p className="mt-2 text-sm text-gray-500">
            Placed on {formatDate(order.createdAt)}
          </p> */}
        </div>

        {order.shippingTrackingUrl && (
          <a
            href={order.shippingTrackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#0E0E0E] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#0E0E0E] transition hover:bg-[#0E0E0E] hover:text-white"
          >
            Track Shipment
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  );
};

export default OrderHeader;