import { CartHistory } from "@/types/cart.types";
import OrderHistoryCard from "./OrderHistroyCard";



interface OrderHistoryListProps {
  history: CartHistory[];
}

const OrderHistoryList = ({ history }: OrderHistoryListProps) => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A56423]">
            02 / Submitted Orders
          </p>

          <h2 className="mt-1 font-display text-xl font-bold text-[#0E0E0E]">
            Your Orders
          </h2>
        </div>

        <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-black/50">
          {history.length} {history.length === 1 ? "Order" : "Orders"}
        </span>
      </div>

      <div className="space-y-5">
        {history.map((order, index) => (
          <OrderHistoryCard
            key={index}
            order={order}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryList;