import Image from "next/image";
import Container from "@/components/shared/Container";
import { CustomizationCategory } from "@/types/Index";
import ScrollTypewriter from "@/components/shared/Typewriter";

interface HeroProps {
  customization: CustomizationCategory[];
}

const Hero = ({ customization }: HeroProps) => {
  const latestCollection = customization?.find(
    (item) => item.slug === "Gallery"
  );
  console.log(latestCollection, "gallery");
  const latestCollectionOption = latestCollection?.options?.filter(
    (item) => item.status === "active"
  );
  if (!latestCollectionOption || latestCollectionOption.length === 0) return;
  return (
    <div className="mt-30">
      <Container>
        <p className="text-[#000000] text-[30px] md:text-[55px]">
          Soibi In The World
        </p>
      </Container>

      <div className="relative z-10 mt-9 h-full">
        <Container className="h-full">
          <div className="grid h-162.5 grid-cols-1 md:grid-cols-2 gap-3">
            {/* Left image */}
            <div className="relative h-full">
              <Image
                src={latestCollectionOption?.[0]?.imageUrl || ""}
                alt=""
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Right column */}
            <div className="flex h-full flex-col-reverse md:flex-col">
              {/* Right image */}
              <div className="relative min-h-0 mt-[10px] md:mt-0 flex-1">
                <Image
                  src={latestCollectionOption?.[1]?.imageUrl || ""}
                  alt=""
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Text */}
              <div className="bg-black leading-10 md:mt-3 px-[30px] py-[35px] text-2xl md:text-[55px] text-white">
                <ScrollTypewriter text={"Worn by Queens."} />
                <br />
                <ScrollTypewriter text={"Made for You."} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Hero;
