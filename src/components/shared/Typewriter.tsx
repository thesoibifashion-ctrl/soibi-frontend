"use client";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";

interface ScrollTypewriterProps {
  text: string | string[];
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  speed?: number;
  threshold?: number;
  triggerOnce?: boolean;
  cursor?: boolean;
}

const ScrollTypewriter = ({
  text,
  as = "p",
  className = "",
  speed = 30,
  threshold = 0.3,
  triggerOnce = true,
  cursor = false,
}: ScrollTypewriterProps) => {
  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
  });

  const sequence = Array.isArray(text) ? text : [text];

  return (
    <div ref={ref}>
      {inView && (
        <TypeAnimation
          sequence={sequence}
          wrapper={as}
          speed={speed as any}
          cursor={cursor}
          className={className}
        />
      )}
    </div>
  );
};

export default ScrollTypewriter;