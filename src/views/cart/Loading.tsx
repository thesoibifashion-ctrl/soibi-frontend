import Container from "@/components/shared/Container";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <Container className="bg-[#EEEEEE] min-h-screen pt-[120px] gap-20 flex justify-between w-full">
      {/* LEFT — loading items */}
      <div className="w-[45%] space-y-5">

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white h-[140px] rounded-[20px] flex overflow-hidden"
          >
            {/* Image */}
            <Skeleton className="h-full w-[140px] shrink-0 rounded-none bg-gray-200" />

            <div className="py-[15px] flex flex-col justify-between w-full px-10">
              {/* Name + price */}
              <div className="flex justify-between items-center gap-5">
                <Skeleton className="h-5 w-32 bg-gray-200" />

                <Skeleton className="h-4 w-16 bg-gray-200" />
              </div>

              {/* Quantity + delete */}
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-[18px] w-[18px] rounded-full bg-gray-200" />
                  <Skeleton className="h-4 w-4 bg-gray-200" />
                  <Skeleton className="h-[18px] w-[18px] rounded-full bg-gray-200" />
                </div>

                <Skeleton className="h-8 w-20 rounded-[15px] bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT — order summary */}
      <div className="bg-black h-fit p-8 rounded-lg w-[40%]">
        <div>
          <Skeleton className="h-5 w-32 bg-gray-700" />

          <div className="mt-6 flex items-center justify-between">
            <Skeleton className="h-4 w-32 bg-gray-700" />
            <Skeleton className="h-4 w-8 bg-gray-700" />
          </div>

          <div className="mt-4 border-t border-gray-700 pt-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 bg-gray-700" />
              <Skeleton className="h-6 w-24 bg-gray-700" />
            </div>
          </div>

          <Skeleton className="mt-5 h-16 w-full rounded-lg bg-gray-700" />

          <div className="mt-5 flex justify-center">
            <Skeleton className="h-10 w-40 rounded-[50px] bg-gray-700" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Loading;
