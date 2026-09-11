import { formatPrice } from "@/lib/format";
import { TrackingOrder } from "@/types/cart.types";
import { Package } from "lucide-react";


interface TrackingItemsProps {
  order: TrackingOrder;
}

const TrackingItems = ({ order }: TrackingItemsProps) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#E5E1D9] bg-white">
      <div className="border-b border-[#EDEAE4] px-6 py-5 lg:px-7">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#927f04]">
          02
        </p>

        <div className="mt-1 flex items-center justify-between gap-4">
          <h2 className="font-display text-xl font-bold text-[#0E0E0E]">
            Order Items
          </h2>

          <span className="text-xs text-gray-400">
            {order.items.length}{" "}
            {order.items.length === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      <div className="divide-y divide-[#EDEAE4]">
        {order.items.map((item, index) => (
          <div
            key={`${item.productId || "custom"}-${index}`}
            className="flex flex-col gap-5 p-6 sm:flex-row"
          >
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#F8F6F2]">
              {item.imageUrlSnapshot ? (
                <img
                  src={item.imageUrlSnapshot}
                  alt={item.productNameSnapshot || "Order item"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Package className="h-6 w-6 text-gray-300" />
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-bold text-[#0E0E0E]">
                    {item.productNameSnapshot || "Custom Item"}
                  </h3>

                  <p className="shrink-0 font-display text-lg font-bold text-[#0E0E0E]">
                    {formatPrice(
                      item.unitPriceSnapshot * item.quantity
                    )}
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {item.selectedMaterial && (
                    <span className="rounded-md bg-[#F8F6F2] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-gray-600">
                      {item.selectedMaterial}
                    </span>
                  )}

                  {item.selectedColor && (
                    <span className="flex items-center gap-2 rounded-md bg-[#F8F6F2] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-gray-600">
                      <span
                        className="h-2.5 w-2.5 rounded-full border border-black/10"
                        style={{
                          backgroundColor: item.selectedColor,
                        }}
                      />

                      {item.selectedColor}
                    </span>
                  )}

                  {item.selectedSize && (
                    <span className="rounded-md bg-[#F8F6F2] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-gray-600">
                      Size {item.selectedSize}
                    </span>
                  )}

                  <span className="rounded-md bg-[#F8F6F2] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-gray-600">
                    Qty {item.quantity}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400">
                {formatPrice(item.unitPriceSnapshot)} each
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrackingItems;