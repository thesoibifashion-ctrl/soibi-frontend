import Image from "next/image";
import Container from "@/components/shared/Container";
import { CustomizationCategory } from "@/types/Index";
import ScrollTypewriter from "@/components/shared/Typewriter";
import Link from "next/link";

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

  console.log(customization, "custoomizations");

  return (
    <div className="mt-30">
      <Container>
        <p className="text-[#000000] text-[30px] md:text-[55px]">
          Soibi In The World
        </p>
      </Container>

      <div className="relative z-10 lg:mt-9 h-full">
        <Container className="h-full">
          <div className="grid lg:h-162.5 grid-cols-1 md:grid-cols-2 gap-3">
            {/* Left image */}
            <div className="relative min-h-120 lg:min-h-0 h-full group">
              <Image
                src={latestCollectionOption?.[0]?.imageUrl || ""}
                alt=""
                fill
                className="object-cover object-top"
              />

              {/* Gallery button */}
              <div className="absolute inset-0 hidden justify-end p-10 md:flex">
                <Link
                  href="/gallery"
                  className="inline-flex w-full h-fit items-center justify-center rounded-[50px] bg-white px-3 py-2 font-[var(--font-inter)] text-sm font-medium tracking-wide text-black md:w-fit md:px-6 md:py-4"
                >
                  View Gallery
                </Link>
              </div>

              {/* Gallery mobile button */}
              <div className="absolute inset-0 flex items-end justify-center p-4 md:hidden">
                <Link
                  href="/gallery"
                  className="rounded-full bg-white px-6 py-2 text-xs font-bold uppercase tracking-widest text-black"
                >
                  View Gallery
                </Link>
              </div>
            </div>

            {/* Right column */}
            <div className="flex h-full flex-col-reverse md:flex-col">
              {/* Right image */}
              <div className="relative min-h-120 lg:min-h-0 mt-[10px] md:mt-0 flex-1 group">
                <Image
                  src={latestCollectionOption?.[1]?.imageUrl || ""}
                  alt=""
                  fill
                  className="object-cover object-top"
                />

                {/* Blog button */}
                <div className="absolute inset-0 hidden items-start justify-end p-5 md:flex">
                  <Link
                    href="/"
                    className="inline-flex w-full items-center justify-center rounded-[50px] bg-white px-3 py-2 font-[var(--font-inter)] text-sm font-medium tracking-wide text-black md:w-fit md:px-6 md:py-4"
                  >
                    View Blog
                  </Link>
                </div>

                {/* Blog mobile button */}
                <div className="absolute inset-0 flex items-end justify-center p-4 md:hidden">
                  <Link
                    href="/"
                    className="rounded-full bg-white px-6 py-2 text-xs font-bold uppercase tracking-widest text-black"
                  >
                    View Blog
                  </Link>
                </div>
              </div>

              {/* Text */}
              <div className="bg-black leading-10 lg:leading-15 md:mt-3 px-[30px] py-[35px] text-lg lg:text-[55px] text-white">
                <ScrollTypewriter text={"Worn by Queens."} />
                <br className="hidden" />
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