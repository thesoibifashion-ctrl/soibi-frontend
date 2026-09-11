import { useCollections } from "@/api/features/collection";
import Container from "@/components/shared/Container";

const Memory = () => {
  const {
    data: collection,
    // isLoading: collectionLoading,
    // isError: collectionError,
  } = useCollections();
  const collectionLength = collection?.filter(
    (item) => item.status === "published"
  );

  return (
    <Container className="md:grid grid-cols-2 flex flex-col-reverse  items-center pb-10 md:pb-50 pt-8 md:pt-29.75 gap-15">
      <div className="mt-8 md:mt-0">
        <p className="font-medium text-[15px] md:text-xl text-[#404944]">
          Est. Port Harcourt 2022
        </p>
        <div className="mt-4.25 md:mt-8">
          <p className="text-[32px] md:text-[64px] text-[#000000] leading-12.5">
            {" "}
            Fashion as{" "}
          </p>
          <span className="text-[#7B3C10] text-[36px] md:text-[55px]">Living memory</span>
          <p className="text-base md:text-[24px] text-[#000000]">
            We design for the woman who arrives in her own time, confidently,
            and entirely herself. Pieces created to transcend seasons and
            trends.
          </p>
        </div>
      </div>
      <div className="h-150 relative w-full">
        <img
          src="/memory.png"
          className="h-full rounded-lg w-full object-cover"
        />
        <div className="absolute -bottom-18 md:-bottom-7 md:-left-10 left-2 w-48.25 rounded-[10px] bg-black p-6 animate-subtle-bounce">
          <p className="flex items-baseline text-[50px] leading-none text-white">
            {collectionLength?.length}
            <span className="ml-1 text-[20px]">Collections</span>
          </p>

          <p className="mt-3 text-sm text-white">
            Beauty of a lady in her ankara
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Memory;
