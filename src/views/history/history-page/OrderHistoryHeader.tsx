import { ArrowRight } from "lucide-react";
import Link from "next/link";

const OrderHistoryHeader = () => {
  return (
    <div className="mb-10 border-b border-black/10 pb-8 lg:mb-14 lg:pb-10">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#A56423]">
            01 / Your Collection
          </p>

          <h1 className="font-display text-4xl font-bold tracking-tight text-[#0E0E0E] lg:text-6xl">
            Order History
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-black/50">
            A record of your Signature By Sarah orders, from the moment your
            selection was submitted to its journey with us.
          </p>
        </div>

        <Link
          href="/product"
          className="group flex w-fit items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0E0E0E]"
        >
          Continue Shopping
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition group-hover:border-[#A56423] group-hover:bg-[#A56423]">
            <ArrowRight size={14} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default OrderHistoryHeader;