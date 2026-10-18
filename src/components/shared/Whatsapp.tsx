"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

// International format, digits only (no +, spaces or dashes).
// e.g. Nigeria: 2348012345678
const WHATSAPP_NUMBER = "234XXXXXXXXXX";
const DEFAULT_MESSAGE = "Hello! I'd like to make an enquiry.";

const WhatsAppButton = () => {
  const reduceMotion = useReducedMotion();

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <div className="group fixed bottom-5 right-5 z-50 md:bottom-8 md:right-8">
      {/* Tooltip */}
      <span
        className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-lg bg-black px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
        role="tooltip"
      >
        Contact us on WhatsApp
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-black" />
      </span>

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="block"
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2.2,
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src="/whatsapp.png"
          alt="WhatsApp"
          width={56}
          height={56}
          className="h-14 rounded-full w-14 drop-shadow-xl"
        />
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;