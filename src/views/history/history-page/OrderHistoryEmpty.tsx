import { ArrowRight, Package } from "lucide-react";
import Link from "next/link";

const OrderHistoryEmpty = () => {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
      <div className="px-6 py-16 text-center lg:px-10 lg:py-24">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F6F2]">
          <Package
            size={25}
            strokeWidth={1.5}
            className="text-[#927f04]"
          />
        </div>

        <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.3em] text-[#927f04]">
          02 / No Orders Yet
        </p>

        <h2 className="mt-3 font-display text-2xl font-bold text-[#0E0E0E] lg:text-3xl">
          Your story starts here.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-black/50">
          You haven&apos;t submitted an order yet. Explore our collection and
          find something made for you.
        </p>

        <Link
          href="/product"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0E0E0E] px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#C9A227] hover:text-[#0E0E0E]"
        >
          Explore Collection
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
};

export default OrderHistoryEmpty;