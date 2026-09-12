import Image from "next/image";
import AnimatedButton from "@/components/shared/AnimatedButton";
import Container from "@/components/shared/Container";
import { CustomizationCategory } from "@/types/Index";

interface HeroProps {
  customization: CustomizationCategory[];
}

const Hero = ({ customization }: HeroProps) => {
  const latestCollection = customization?.find(
    (item) => item.slug === "latest-collection"
  );

  const latestCollectionOption = latestCollection?.options?.[0].imageUrl;
  if (!latestCollectionOption || latestCollectionOption?.length === 0) return;
  console.log(latestCollectionOption, latestCollection);
  return (
    <div className="">
      <Container>
        <p className="text-[#000000] text-[30px]  md:text-[66px] lg:text-[55px]">
          Our Latest Collection
        </p>
      </Container>
      <div className="relative min-h-screen md:min-h-250 w-full overflow-hidden pb-12.5">
        <Image
          src={latestCollectionOption || ""}
          alt="Hero"
          fill
          priority
          className="object-cover object-top"
        />

        <div className="relative z-10 ">
          <Container className="">
            <div className="pt-10 min-h-screen md:min-h-250 flex flex-col justify-between">
              <div>
                <div className="rounded-2xl border w-fit border-white/20 bg-white/10 py-3 md:py-0  px-5 md:p-6 backdrop-blur-lg">
                  <p className="text-[30px] md:text-[96px] md:leading-25 text-black">
                    {latestCollection?.options?.[0]?.name ||
                      "Latest Collection"}
                  </p>
                </div>
                <div className="h-full mt-10  md:mt-55 flex justify-center items-center">
                  <p className="max-w-[90%] text-center text-sm md:text-[30px] leading-6 md:leading-12.5">
                    {latestCollection?.options?.[0]?.description ||
                      "Latest Collection"}
                  </p>
                </div>
              </div>
              <div className="flex w-fit self-end gap-13">
                <AnimatedButton
                  text="Explore our Collections"
                  route="/collection"
                  variant="black"
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Hero;
