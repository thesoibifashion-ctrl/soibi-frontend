import { Collection } from "@/api/features/collection";
import AnimatedButton from "@/components/shared/AnimatedButton";
import Container from "@/components/shared/Container";
import Image from "next/image";
import Note from "./Note";

interface Collections {
  collection: Collection[];
}
const FeaturedCollection = ({ collection }: Collections) => {
  const featured = collection.filter((item) => item.isFeatured);
  console.log(featured, "featured");
  return (
    <div>
      <Container className="mt-15 w-full ">
        <p className="font-black text-[32px] md:text-[50px] w-full">Latest Collection</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-28 justify-between w-full items-center mt-10">
          <div className="relative h-200">
            <Image
              src={featured[0]?.imageUrl || ""}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className=" flex flex-col items-center">
            <p className="text-black text-[40px] md:text-[80px]">{featured[0]?.name}</p>
            <div className="">
              <AnimatedButton text={"View Collection "} route={`/collection/${featured[0].slug}`} />
            </div>
          </div>
        </div>
      </Container>
      <Note />
      {collection.length > 1 && (
  <Container className="md:mt-15 w-full">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-28 justify-between w-full items-center mt-10">
      {/* Text */}
      <div className="flex flex-col items-center order-2 md:order-1">
        <p className="text-black text-[40px] md:text-[80px]">{featured[1]?.name}</p>
        <div>
          <AnimatedButton
            text={"View Collection "}
            route={`/collection/${featured[1].slug}`}
          />
        </div>
      </div>

      {/* Image */}
      <div className="relative h-200 order-1 md:order-2">
        <Image
          src={featured[1]?.imageUrl || ""}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  </Container>
)}
    </div>
  );
};

export default FeaturedCollection;
