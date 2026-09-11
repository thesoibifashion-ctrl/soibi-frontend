import { TrackingOrder } from "@/types/cart.types";
import { ExternalLink } from "lucide-react";


interface TrackingPaymentProps {
  order: TrackingOrder;
}

const TrackingPayment = ({ order }: TrackingPaymentProps) => {
  if (!order.receiptUrl && !order.paymentUrl) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-[#E5E1D9] bg-white p-6 lg:p-7">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#927f04]">
        04
      </p>

      <h2 className="mt-1 font-display text-xl font-bold text-[#0E0E0E]">
        Payment
      </h2>

      <div className="mt-6 flex flex-wrap gap-3">
        {order.receiptUrl && (
          <a
            href={order.receiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#E5E1D9] bg-white px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#0E0E0E] transition hover:border-[#C9A227]"
          >
            View Receipt
            <ExternalLink size={13} />
          </a>
        )}

        {order.paymentUrl && (
          <a
            href={order.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#E5E1D9] bg-white px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#0E0E0E] transition hover:border-[#C9A227]"
          >
            Payment Details
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </section>
  );
};

export default TrackingPayment;