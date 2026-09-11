import Container from "@/components/shared/Container";
import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";


const TrackingUnavailable = () => {
  return (
    <main className="min-h-screen bg-[#F8F6F2] py-10">
      <Container>
        <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A227]/20 bg-white">
            <Package className="h-7 w-7 text-[#C9A227]" />
          </div>

          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#927f04]">
            Tracking unavailable
          </p>

          <h1 className="mt-3 font-display text-3xl font-bold text-[#0E0E0E]">
            Order not found
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
            We couldn&apos;t find a tracking record for this order. Please
            check the order number and try again.
          </p>

          <Link
            href="/orders"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0E0E0E] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#222]"
          >
            <ArrowLeft size={14} />
            Back to Orders
          </Link>
        </div>
      </Container>
    </main>
  );
};

export default TrackingUnavailable;