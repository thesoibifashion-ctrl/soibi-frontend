// import { CartHistory } from "@/api/features/cart";
// import { Truck } from "lucide-react";


// interface OrderShippingProps {
//   order: CartHistory;
// }

// const OrderShipping = ({ order }: OrderShippingProps) => {
//   if (
//     !order.shippingTrackingNumber &&
//     !order.shippingDetails &&
//     !order.shippingTrackingUrl
//   ) {
//     return null;
//   }

//   return (
//     <section className="rounded-2xl border border-[#E5E1D9] bg-white p-6">
//       <div className="mb-6">
//         <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#927f04]">
//           03
//         </p>

//         <h2 className="mt-1 font-display text-xl font-bold text-[#0E0E0E]">
//           Delivery
//         </h2>
//       </div>

//       <div className="flex gap-4">
//         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F8F6F2]">
//           <Truck className="h-5 w-5 text-[#927f04]" />
//         </div>

//         <div className="space-y-3">
//           {order.shippingTrackingNumber && (
//             <div>
//               <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
//                 Tracking Number
//               </p>

//               <p className="mt-1 text-sm font-semibold text-[#0E0E0E]">
//                 {order.shippingTrackingNumber}
//               </p>
//             </div>
//           )}

//           {order.shippingDetails && (
//             <div>
//               <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
//                 Delivery Details
//               </p>

//               <div className="mt-1 text-sm leading-6 text-gray-600">
//                 {order.shippingDetails.address && (
//                   <p>{order.shippingDetails.address}</p>
//                 )}

//                 {(order.shippingDetails.city || order.shippingDetails.state) && (
//                   <p>
//                     {order.shippingDetails.city}
//                     {order.shippingDetails.city &&
//                     order.shippingDetails.state
//                       ? ", "
//                       : ""}
//                     {order.shippingDetails.state}
//                   </p>
//                 )}

//                 {order.shippingDetails.country && (
//                   <p>{order.shippingDetails.country}</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OrderShipping;

import React from 'react'

const OrderShipping = () => {
  return (
    <div>OrderShipping</div>
  )
}

export default OrderShipping