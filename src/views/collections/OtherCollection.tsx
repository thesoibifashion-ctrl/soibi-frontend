import { Collection } from "@/api/features/collection";
import Container from "@/components/shared/Container";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Collections {
  collection: Collection[];
}
const OtherCollection = ({ collection }: Collections) => {
  return (
    <Container className="mt-20 ">
      <div className="border-t border-[#404944] pt-8.5">
        <p className="text-[20px] text-[#404944]">OTHER COLLECTIONS</p>
        {collection.map((item) => (
          <div
            className=" border-b w-full md:flex justify-between items-center  border-[#949494] py-8.5 "
            key={item.id}
          >
            <div className="md:flex  items-start md:items-center gap-6.5">
              <Image
                src={item.imageUrl || ""}
                width={66}
                height={87}
                alt={item.name}
              />
              <div className="w-full  mt-3 md:mt-0">
                <h3 className="text-[24px]">{item.name}</h3>
                <p className="text-[15px] font-sans">{item.description}</p>
              </div>
            </div>

            <Link className="self-end w-full" href={`/collection/${item.slug}`}>
              <div className="flex  mt-2  justify-end  items-center gap-2 cursor-pointer">
                <p className="text-[15px] flex gap-1 items-center font-sans">
                  {item.productCount} <span>Pieces</span>
                </p>
                <ArrowRight size={14} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default OtherCollection;
