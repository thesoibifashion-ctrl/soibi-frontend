import { Skeleton } from "@/components/ui/skeleton";

const LoadingState = () => {
 return(
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-32 max-w-[90%] mx-auto gap-3 mt-8">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="h-fit rounded-lg">
        <Skeleton className="aspect-3/4 w-full rounded-lg" />

        <div className="p-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3.5 w-2/3" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>

          <Skeleton className="mt-2 h-3.5 w-1/3" />
        </div>
      </div>
    ))}
  </div>
 )
};

export default LoadingState;
