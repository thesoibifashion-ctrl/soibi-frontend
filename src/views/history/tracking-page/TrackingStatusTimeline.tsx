import { formatStatus, formatDateTime } from "@/lib/format";
import { TrackingOrder } from "@/types/cart.types";
import { Check, Clock3 } from "lucide-react";


interface TrackingStatusTimelineProps {
  order: TrackingOrder;
}

const TrackingStatusTimeline = ({
  order,
}: TrackingStatusTimelineProps) => {
  return (
    <section className="rounded-2xl border border-[#E5E1D9] bg-white p-6 lg:p-7">
      <div className="mb-8">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#927f04]">
          01
        </p>

        <h2 className="mt-1 font-display text-xl font-bold text-[#0E0E0E]">
          Order Progress
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Follow your order as it moves through our fulfilment process.
        </p>
      </div>

      {order.statusHistory && order.statusHistory.length > 0 ? (
        <div className="space-y-8">
          {order.statusHistory.map((history, index) => {
            const isLatest =
              index === order.statusHistory!.length - 1;

            return (
              <div
                key={`${history.status}-${history.createdAt}-${index}`}
                className="relative flex gap-4"
              >
                {!isLatest && (
                  <div className="absolute left-[14px] top-8 h-[calc(100%+1rem)] w-px bg-[#EDEAE4]" />
                )}

                <div
                  className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                    isLatest
                      ? "border-[#A56423] bg-[#A56423]"
                      : "border-[#C9A227]/30 bg-[#F8F6F2]"
                  }`}
                >
                  {isLatest ? (
                    <Check
                      size={13}
                      className="text-[#0E0E0E]"
                    />
                  ) : (
                    <Check
                      size={13}
                      className="text-[#A56423]"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p
                      className={`text-sm font-semibold ${
                        isLatest
                          ? "text-[#0E0E0E]"
                          : "text-gray-600"
                      }`}
                    >
                      {formatStatus(history.status)}
                    </p>

                    <p className="text-[10px] uppercase tracking-wider text-gray-400">
                      {formatDateTime(history.createdAt)}
                    </p>
                  </div>

                  {history.note && (
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {history.note}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center gap-4 rounded-xl bg-[#F8F6F2] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <Clock3 size={17} className="text-[#C9A227]" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#0E0E0E]">
              {formatStatus(order.status)}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Your order has been received and is being processed.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrackingStatusTimeline;