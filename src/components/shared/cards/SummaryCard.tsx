// "use client";

// import { getCurrencyTotals, type PricedItem } from "@/lib/cart-totals";

// export interface OrderSummaryItem extends PricedItem {
//   id: string;
//   productNameSnapshot: string | null;
//   imageUrlSnapshot: string | null;
//   pricesSnapshot?: {
//     name: string;
//     amount: number;
//     symbol: string;
//     currency: string;
//     currencyId: string;
//   }[];
// }

// interface OrderSummaryCardProps {
//   items: OrderSummaryItem[];
//   selectedCurrency: string;
//   className?: string;
//   footer?: React.ReactNode;
// }

// const OrderSummaryCard = ({ items, selectedCurrency, className = "", footer }: OrderSummaryCardProps) => {
//   const currencyTotals = getCurrencyTotals(items);
//   const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
//   return (
//     <div className={`rounded-2xl border p-6 w-full lg:w-[443px] ${className}`}>
//         <p className="text-xs text-[#A56423] font-sans font-semibold">YOUR ORDER</p>
//       <h2 className="font-semibold text-white text-2xl leading-[40px]">Order Summary</h2>

//       <div className="space-y-3 mt-[27px]">
//         {items.map((item,idx) => {
//           const selectedPrice = item.pricesSnapshot?.find(
//             (price) => price.currency === selectedCurrency
//           );

//           return (
//           <div key={idx} className="flex items-center gap-3">
//             {item.imageUrlSnapshot && (
//               <img
//                 src={item.imageUrlSnapshot}
//                 alt={item.productNameSnapshot ?? "Product"}
//                 className="h-[102px] w-[84px] rounded-lg object-cover"
//               />
//             )}

//             <div className="flex-1">
//               <p className="text-base text-white font-normal">{item.productNameSnapshot ?? "Custom item"}</p>
//               <p className="text-xs text-[#595959]">Qty {item.quantity}</p>
//               <span className="text-sm font-semibold text-[#A56423]">
//                 {selectedPrice?.symbol}{" "}
//                 {((selectedPrice?.amount ?? 0) * item.quantity).toLocaleString()}
//               </span>
//             </div>
//           </div>
//           );
//         })}
//       </div>

//       <div className="space-y-2 border-t border-[#404944] mt-[36px]">
//         <div className="flex mt-[23px] items-center justify-between text-lg font-semibold">
//           <span className="text-[12px] text-[#404944]">Total </span>
//           <span className="text-2xl text-[#A56423]">
//             {items[0]?.pricesSnapshot?.find(
//               (price) => price.currency === selectedCurrency
//             )?.symbol}{" "}
//             {items.reduce((total, item) => {
//               const selectedPrice = item.pricesSnapshot?.find(
//                 (price) => price.currency === selectedCurrency
//               );

//               return total + (selectedPrice?.amount ?? 0) * item.quantity;
//             }, 0).toLocaleString()}
//           </span>
//         </div>
//         <p className="text-white text-xs mt-8">Your order will only be processed after payment has been verified.</p>
//       </div>

//       {footer}
//     </div>
//   );
// };

// export default OrderSummaryCard;

"use client";

import { type PricedItem } from "@/lib/cart-totals";
import { formatPrice } from "@/lib/format-price";
import { Info } from "lucide-react";

export interface OrderSummaryItem extends PricedItem {
  id: string;
  productNameSnapshot: string | null;
  imageUrlSnapshot: string | null;
}

interface OrderSummaryCardProps {
  items: OrderSummaryItem[];
  selectedCurrency: string;
  className?: string;
  footer?: React.ReactNode;
}

const OrderSummaryCard = ({ items, selectedCurrency, className = "", footer }: OrderSummaryCardProps) => {
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`rounded-2xl border p-6 w-full lg:w-[443px] ${className}`}>
      <p className="text-xs text-[#A56423] font-sans font-semibold">YOUR ORDER</p>
      <h2 className="font-semibold text-white text-2xl leading-[40px]">Order Summary</h2>

      <div className="space-y-3 mt-[27px]">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            {item.imageUrlSnapshot && (
              <img
                src={item.imageUrlSnapshot}
                alt={item.productNameSnapshot ?? "Product"}
                className="h-[102px] w-[84px] rounded-lg object-cover"
              />
            )}

            <div className="flex-1">
              <p className="text-base text-white font-normal">{item.productNameSnapshot ?? "Custom item"}</p>
              <p className="text-xs text-[#595959]">Qty {item.quantity}</p>
              <span className="text-sm font-semibold text-[#A56423]">
                {formatPrice((item.unitPriceSnapshot ?? 0) * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-[#404944] mt-[36px]">
        <div className="flex mt-[23px] items-center justify-between text-lg font-semibold">
          <span className="text-[12px] text-[#404944]">Total </span>
          <span className="text-2xl text-[#A56423]">
            {formatPrice(
              items.reduce(
                (total, item) =>
                  total + (item.unitPriceSnapshot ?? 0) * item.quantity,
                0
              )
            )}
          </span>
        </div>

        <p className="text-white text-xs mt-8">
          Your order will only be processed after payment has been verified.
        </p>

        <div className="mt-6 flex gap-3 rounded-xl border border-[#A56423]/20 bg-[#A56423]/[0.08] ">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#A56423]" />

          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#D6A66F]">
              A quick note before you order
            </p>
            <p className="text-xs leading-5 text-[#D0CCC5]">
              Please review your selected size and measurements carefully before placing your order.
            </p>
            <p className="text-xs leading-5 text-[#D0CCC5]">
              As our pieces are handcrafted, textiles, dyes and embellishments may vary slightly from the images shown.
            </p>
          </div>
        </div>
      </div>

      {footer}
    </div>
  );
};

export default OrderSummaryCard;
