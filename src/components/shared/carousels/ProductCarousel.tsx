"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/Index";
import { ProductCard } from "@/components/shared/cards/ProductCard";
import { useIsMobile } from "@/hooks/use-isMobile";

interface ProductCarouselProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export function ProductCarousel({
  products,
  onQuickView,
}: ProductCarouselProps) {
  const isMobile = useIsMobile();

  const VISIBLE_COUNT = isMobile ? 1.3 : 3.5;
  const AUTOPLAY_INTERVAL = 4000;
  const TRANSITION_DURATION = 0.4;

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

 const isCarousel = isMobile
  ? products.length > 2
  : products.length > 3;

  const cloneCount = Math.ceil(VISIBLE_COUNT);
  const itemWidthPercent = 100 / VISIBLE_COUNT;

  const trackProducts = isCarousel
    ? [...products, ...products.slice(0, cloneCount)]
    : products;

  const goNext = () => {
    setAnimate(true);
    setIndex((i) => i + 1);
  };

  const goPrev = () => {
    if (index === 0) return;

    setAnimate(true);
    setIndex((i) => i - 1);
  };

  useEffect(() => {
    if (!isCarousel || index !== products.length) return;

    const timeout = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, TRANSITION_DURATION * 1000);

    return () => clearTimeout(timeout);
  }, [index, products.length, isCarousel]);

  useEffect(() => {
    if (animate) return;

    const raf = requestAnimationFrame(() => setAnimate(true));

    return () => cancelAnimationFrame(raf);
  }, [animate]);

  useEffect(() => {
    if (!isCarousel || isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCarousel, isHovered]);

  if (!products.length) return null;

  if (!isCarousel) {
    return (
      <div className="flex gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="shrink-0"
            style={{ width: `${itemWidthPercent}%` }}
          >
            <ProductCard
              product={product}
              onQuickView={onQuickView}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative"
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
          {trackProducts.map((product, i) => (
            <div
              key={`${product.id}-${i}`}
              className="shrink-0 pr-4"
              style={{
                width: `${itemWidthPercent}%`,
              }}
            >
              <ProductCard
                product={product}
                onQuickView={onQuickView}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {index > 0 && (
        <button
          onClick={goPrev}
          className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-background p-2 shadow-md hover:bg-accent ${
            isMobile
              ? "left-2"
              : "left-0 -translate-x-4"
          }`}
          aria-label="Previous products"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      <button
        onClick={goNext}
        className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-background p-2 shadow-md hover:bg-accent ${
          isMobile
            ? "right-2"
            : "right-10 translate-x-4"
        }`}
        aria-label="Next products"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}