import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="my-8 grid grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50"
        >
          {/* Image */}
          <Skeleton className="h-70 w-full rounded-none bg-zinc-300" />

          <div className="space-y-4 p-5">
            <Skeleton className="h-2 w-20 bg-zinc-300" />

            <Skeleton className="h-6 w-3/4 bg-zinc-300" />

            <Skeleton className="h-3 w-1/2 bg-zinc-300" />

            <div className="flex gap-2">
              <Skeleton className="h-3 w-3 rounded-full bg-zinc-300" />
              <Skeleton className="h-3 w-3 rounded-full bg-zinc-300" />
              <Skeleton className="h-3 w-3 rounded-full bg-zinc-300" />
            </div>

            <Skeleton className="h-6 w-24 bg-zinc-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;