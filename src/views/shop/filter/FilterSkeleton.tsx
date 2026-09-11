import { Skeleton } from "@/components/ui/skeleton";

const ProductFiltersSidebarSkeleton = () => {
  return (
    <aside className="h-fit w-full rounded-xl border bg-white p-5 lg:sticky lg:top-20 lg:w-72">
      <div className="h-[90vh] space-y-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>

        <Skeleton className="h-px w-full" />

        {/* Collections */}
        <section className="space-y-3">
          <Skeleton className="h-5 w-24" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </section>

        <Skeleton className="h-px w-full" />

        {/* Category */}
        <section className="space-y-3">
          <Skeleton className="h-5 w-20" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </div>
        </section>

        <Skeleton className="h-px w-full" />

        {/* Gender */}
        <section className="space-y-3">
          <Skeleton className="h-5 w-20" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </section>

        <Skeleton className="h-px w-full" />

        {/* Sizes */}
        <section className="space-y-3">
          <Skeleton className="h-5 w-14" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-10 rounded-md" />
            ))}
          </div>
        </section>

        <Skeleton className="h-px w-full" />

        {/* Colors */}
        <section className="space-y-3">
          <Skeleton className="h-5 w-20" />
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 14 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-5 rounded-full" />
            ))}
          </div>
        </section>

        <Skeleton className="h-px w-full" />

        {/* Materials */}
        <section className="space-y-3">
          <Skeleton className="h-5 w-24" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </section>

        <Skeleton className="h-px w-full" />

        {/* Price */}
        <section className="space-y-3">
          <Skeleton className="h-5 w-28" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-10 rounded-md" />
            <Skeleton className="h-10 rounded-md" />
          </div>
        </section>
      </div>
    </aside>
  );
};

export default ProductFiltersSidebarSkeleton;