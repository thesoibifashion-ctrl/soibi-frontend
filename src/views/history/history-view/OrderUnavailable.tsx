import Container from "@/components/shared/Container";
import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";


const OrderUnavailable = () => {
  return (
    <main className="min-h-screen bg-off-white py-10">
      <Container>
        <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A227]/20 bg-white">
            <Package className="h-7 w-7 text-[#C9A227]" />
          </div>

          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#927f04]">
            Order unavailable
          </p>

          <h1 className="mt-3 font-display text-3xl font-bold text-[#0E0E0E]">
            We couldn&apos;t find this order
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
            The order may no longer be available, or you may not have
            permission to view it.
          </p>

          <Link
            href="/history"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0E0E0E] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#222]"
          >
            <ArrowLeft size={14} />
            Back to history
          </Link>
        </div>
      </Container>
    </main>
  );
};

export default OrderUnavailable;