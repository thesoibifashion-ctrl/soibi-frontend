import Container from "@/components/shared/Container";
import Link from "next/link";

const Featured = () => {
  return (
    <div className="mt-20 md:mt-46.75">
      <Container className="flex justify-between items-center">
        <div>
          <hr className="border-0.5  border-[black] w-10 " />
          <p className="text-[26px] md:text-[55px] text-[#000000]">
            Featured Pieces
          </p>
        </div>
        <Link href={"/shop"} className="underline font-normal text-sm text-[#000000]">View all</Link>
      </Container>
    </div>
  );
};

export default Featured;
