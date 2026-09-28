import { Skeleton } from "@/components/ui/skeleton";

const CheckoutDetailsSkeleton = () => {
  return (
    <div className="space-y-5 rounded-2xl border bg-white p-6 shadow-lg">
      {/* Contact */}
      <div className="space-y-5">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-12 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-12 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>

      {/* Delivery Address */}
      <div className="mt-[50px] space-y-5">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-3 w-72" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-12 w-1/2" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-12 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>

      {/* Button */}
      <div className="pt-3">
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  );
};

export default CheckoutDetailsSkeleton;