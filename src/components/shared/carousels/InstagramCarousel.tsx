"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-isMobile";

interface InstagramCarouselProps {
  images: string[];
}

export function InstagramCarousel({ images }: InstagramCarouselProps) {

  const isMobile = useIsMobile()

  const VISIBLE_COUNT = isMobile ? 1.2 : 5;
  const AUTOPLAY_INTERVAL = 3000;
  const TRANSITION_DURATION = 0.4;

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isCarousel = images.length > 3;
  const cloneCount = Math.ceil(VISIBLE_COUNT);
  const itemWidthPercent = 100 / VISIBLE_COUNT;

  const trackImages = isCarousel
    ? [...images, ...images.slice(0, cloneCount)]
    : images;

  const goNext = () => {
    setAnimate(true);
    setIndex((i) => i + 1);
  };

  const goPrev = () => {
    if (index === 0) return;
    setAnimate(true);
    setIndex((i) => i - 1);
  };

  // Reset after reaching cloned images
  useEffect(() => {
    if (!isCarousel || index !== images.length) return;

    const timeout = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, TRANSITION_DURATION * 1000);

    return () => clearTimeout(timeout);
  }, [index, images.length, isCarousel]);

  // Re-enable animation after reset
  useEffect(() => {
    if (animate) return;

    const raf = requestAnimationFrame(() => setAnimate(true));

    return () => cancelAnimationFrame(raf);
  }, [animate]);

  // Autoplay
  useEffect(() => {
    if (!isCarousel || isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isCarousel, isHovered]);

  if (!images.length) return null;

  return (
    <div className="mt-8 md:mt-32.5 p-4">
      <p className="text-center font-black text-lg md:text-[32px]">
        Follow Us On Instagram
      </p>
      <div
        className="relative mt-8 md:mt-14.25 "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: `-${index * itemWidthPercent}%`,
            }}
            transition={{
              duration: animate ? TRANSITION_DURATION : 0,
              ease: "easeInOut",
            }}
          >
            {trackImages.map((image, i) => (
              <div
                key={`${image}-${i}`}
                className="relative shrink-0 pr-4"
                style={{ width: `${itemWidthPercent}%` }}
              >
                <div className="relative aspect-3/4 w-full overflow-hidden">
                  <Image src={image} alt="" fill className="object-cover" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Previous */}
        {index > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-8 top-1/2 -translate-x-4 -translate-y-1/2 rounded-full bg-background p-2 shadow-md hover:bg-accent"
            aria-label="Previous images"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Next */}
        <button
          onClick={goNext}
          className="absolute right-10 top-1/2 translate-x-4 -translate-y-1/2 rounded-full bg-background p-2 shadow-md hover:bg-accent"
          aria-label="Next images"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
