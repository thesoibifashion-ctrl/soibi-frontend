import { TrackingOrder } from "@/types/cart.types";
import { ExternalLink, Truck } from "lucide-react";


interface TrackingDeliveryProps {
  order: TrackingOrder;
}

const TrackingDelivery = ({ order }: TrackingDeliveryProps) => {
  if (
    !order.shippingTrackingNumber &&
    !order.shippingTrackingUrl &&
    !order.shippingDetails
  ) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-[#E5E1D9] bg-white p-6 lg:p-7">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#927f04]">
        03
      </p>

      <h2 className="mt-1 font-display text-xl font-bold text-[#0E0E0E]">
        Delivery
      </h2>

      <div className="mt-6 flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F8F6F2]">
          <Truck className="h-5 w-5 text-[#927f04]" />
        </div>

        <div className="space-y-4">
          {order.shippingTrackingNumber && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Tracking Number
              </p>

              <p className="mt-1 text-sm font-semibold text-[#0E0E0E]">
                {order.shippingTrackingNumber}
              </p>
            </div>
          )}

          {order.shippingDetails && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Delivery Details
              </p>

              <div className="mt-1 text-sm leading-6 text-gray-600">
                {order.shippingDetails.address && (
                  <p>{order.shippingDetails.address}</p>
                )}

                {(order.shippingDetails.city ||
                  order.shippingDetails.state) && (
                  <p>
                    {order.shippingDetails.city}
                    {order.shippingDetails.city &&
                    order.shippingDetails.state
                      ? ", "
                      : ""}
                    {order.shippingDetails.state}
                  </p>
                )}

                {order.shippingDetails.country && (
                  <p>{order.shippingDetails.country}</p>
                )}
              </div>
            </div>
          )}

          {order.shippingTrackingUrl && (
            <a
              href={order.shippingTrackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#927f04]"
            >
              Open tracking
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrackingDelivery;