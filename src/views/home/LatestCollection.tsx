"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedButton from "@/components/shared/AnimatedButton";
import Container from "@/components/shared/Container";
import { CustomizationCategory } from "@/types/Index";
import ScrollTypewriter from "@/components/shared/Typewriter";

interface HeroProps {
  customization: CustomizationCategory[];
}

const ROTATE_INTERVAL = 6000;

const Hero = ({ customization }: HeroProps) => {
  const latestCollection = customization?.find(
    (item) => item.slug === "latest-collection"
  );

  const options = useMemo(
    () => latestCollection?.options ?? [],
    [latestCollection]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const shouldRotate = options.length > 1;

  useEffect(() => {
    if (!shouldRotate) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % options.length);
    }, ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [shouldRotate, options.length]);

  const activeOption = options[activeIndex];

  if (!activeOption?.imageUrl) return null;

  return (
    <div className="mt-8 lg::mt-32 ">
      <Container className="">
        <hr className="lg:border-t lg:border-[#00000040] border-dotted"/>
        <p className="text-[#000000] text-[30px] lg:mt-24  md:text-[66px] lg:text-[55px]">
          Our Latest Collection
        </p>
      </Container>

      <div className="relative min-h-screen  lg:min-h-250 w-full overflow-hidden pb-12.5">
        {/* Background image crossfade */}
        <AnimatePresence mode="sync">
          <motion.div
            key={activeOption.imageUrl}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeOption.imageUrl}
              alt={activeOption.name || "Hero"}
              fill
              priority
              className="object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 ">
          <Container className="">
            <div className="pt-10 min-h-screen md:min-h-250 flex flex-col justify-between">
              <div>
                <div className="rounded-2xl border w-fit border-white/20 bg-white/10 py-3 md:py-0  px-5 md:p-6 backdrop-blur-lg">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeOption.name ?? activeIndex}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <ScrollTypewriter
                        text={activeOption.name || "Latest Collection"}
                        className="text-[28px] md:text-[50px]"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="h-full mt-16  md:mt-55 flex justify-center items-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeOption.description ?? activeIndex}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                      className="max-w-[90%] text-center text-lg md:text-[30px] leading-6 md:leading-12.5"
                    >
                      {activeOption.description || "Latest Collection"}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex w-fit self-end items-end gap-13">
                {shouldRotate && (
                  <div className="mr-4 flex items-center gap-2">
                    {options.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        aria-label={`Show slide ${i + 1}`}
                        className="relative h-1.5 w-8 overflow-hidden rounded-full bg-white/30"
                      >
                        {i === activeIndex && (
                          <motion.span
                            key={activeIndex}
                            className="absolute inset-0 rounded-full bg-white"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: ROTATE_INTERVAL / 1000, ease: "linear" }}
                            style={{ transformOrigin: "left" }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}

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