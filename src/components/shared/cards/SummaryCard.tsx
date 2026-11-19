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

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { type PricedItem } from "@/lib/cart-totals";
import { ArrowDown } from "lucide-react";

export interface OrderSummaryItem extends PricedItem {
  id: string;
  productNameSnapshot: string | null;
  imageUrlSnapshot: string | null;
  selectedSize?:string | number | null | undefined;
  customMeasurements?: Record<string, string | number> | null;

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
                {/* {item.basePrice?.symbol}{" "} */}₦
                {((item.unitPriceSnapshot ?? 0) * item.quantity).toLocaleString()}
                
              </span>
            </div>
                  {item.selectedSize && (
                              <p className="line-clamp-2 font-display text-xs text-near-black">
                                <strong>Selected size:</strong> UK
                                {item.selectedSize}
                              </p>
                            )}
                            {item.customMeasurements &&
                              Object.entries(item.customMeasurements).some(
                                ([, value]) => String(value).trim() !== ""
                              ) && (
                                <Popover>
                                <PopoverTrigger className="mt-1 flex items-center gap-1 text-xs font-bold text-near-black">
                                  Custom measurements
                                  <ArrowDown size={12} />
                                </PopoverTrigger>
                              
                                <PopoverContent
                                  align="start"
                                  className="z-[1100] max-h-60 w-56 overflow-y-auto p-3"
                                >
                                  <p className="mb-2 text-xs font-bold text-near-black">
                                    Custom measurements
                                  </p>
                              
                                  <ul className="space-y-1">
                                    {Object.entries(item.customMeasurements)
                                      .filter(([, value]) => String(value).trim() !== "")
                                      .map(([title, value]) => (
                                        <li
                                          key={title}
                                          className="flex justify-between gap-3 text-xs capitalize text-near-black"
                                        >
                                          <span>{title}</span>
                                          <span className="font-medium">{value}</span>
                                        </li>
                                      ))}
                                  </ul>
                                </PopoverContent>
                              </Popover>
                              )} 
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-[#404944] mt-[36px]">
        <div className="flex mt-[23px] items-center justify-between text-lg font-semibold">
          <span className="text-[12px] text-[#404944]">Total </span>
          <span className="text-2xl text-[#A56423]">
            {/* {items[0]?.unitPriceSnapshot?.symbol}{" "} */}₦
            {items.reduce(
              (total, item) => total + (item.unitPriceSnapshot ?? 0) * item.quantity,
              0
            ).toLocaleString()}
          </span>
        </div>
        <p className="text-white text-xs mt-8">Your order will only be processed after payment has been verified.</p>
      </div>

      {footer}
    </div>
  );
};

export default OrderSummaryCard;