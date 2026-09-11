"use client";

interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for one full loop
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

export function Marquee({ items, speed = 20, direction = "right", pauseOnHover = true }: MarqueeProps) {
  return (
    <div className="group relative overflow-hidden whitespace-nowrap py-8.25 md:py-10  bg-[#000000]">
      <div
        className={`flex w-max animate-marquee gap-[18.34px] md:gap-29.75  ${pauseOnHover ? "group-hover:paused" : ""}`}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((text, i) => (
          <span key={i} className="flex items-center text-white text-[20px] md:text-[70px] font-medium uppercase tracking-wide">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}