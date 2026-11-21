"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Check, Clock, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export type CheckoutSuccessVariant = "transfer" | "paystack";

interface CheckoutSuccessProps {
  variant: CheckoutSuccessVariant;
  orderNumber?: string | null;
  // Optional: where "View my orders" should go. The button is hidden if omitted.
  ordersHref?: string;
}

const CONTENT = {
  transfer: {
    eyebrow: "Order received",
    title: "Thank you for shopping with us.",
    body: "Your order has been submitted. We'll start processing it as soon as your bank transfer has been confirmed. Please check back to see when your transfer has been confirmed.",
    cardTitle: "Your transfer is awaiting confirmation",
    cardText:
      "We'll confirm your payment shortly. Check back here or in your orders to see when it's confirmed.",
  },
  paystack: {
    eyebrow: "Payment confirmed",
    title: "Payment received. Thank you!",
    body: "Your payment was successful and your order is confirmed. We've received your details and will keep you updated as your order is processed.",
    cardTitle: "Your order is being processed",
    cardText: "You'll receive updates as your order progresses.",
  },
} as const;

const CheckoutSuccess = ({
  variant,
  orderNumber,
  ordersHref,
}: CheckoutSuccessProps) => {
  const content = CONTENT[variant];
  const isPaid = variant === "paystack";
  useEffect(() => {
    const duration = 1800;
    const end = Date.now() + duration;
  
    const colors = ["#111111", "#8B7355", "#D6C5B3", "#FFFFFF"];
  
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
  
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
  
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
  
    frame();
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F5F2] px-6 py-20">
      {/* Decorative background */}
      <div className="pointer-events-none absolute left-[-10%] top-[-15%] h-[40vw] w-[40vw] rounded-full bg-[#E8DED3]/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-15%] right-[-10%] h-[35vw] w-[35vw] rounded-full bg-[#DDD3C8]/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-xl text-center">
        {/* Status icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black">
            {isPaid ? (
              <Check className="h-7 w-7 text-white" strokeWidth={2} />
            ) : (
              <Clock className="h-7 w-7 text-white" strokeWidth={2} />
            )}
          </div>
        </div>

        <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/40">
          {content.eyebrow}
        </p>

        <h1 className="mt-4 font-serif text-4xl tracking-tight text-black md:text-5xl">
          {content.title}
        </h1>

        {orderNumber && (
          <p className="mt-3 text-xs font-medium tracking-wide text-black/60">
            Order number: {orderNumber}
          </p>
        )}

        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-black/55">
          {content.body}
        </p>

        {/* Confirmation card */}
        <div className="mt-10 rounded-2xl border border-black/10 bg-white/70 p-6 text-left shadow-[0_20px_70px_rgba(0,0,0,0.06)] backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7F5F2]">
              <ShoppingBag className="h-5 w-5 text-black/70" />
            </div>

            <div>
              <p className="text-sm font-medium text-black">
                {content.cardTitle}
              </p>
              <p className="mt-1 text-xs text-black/45">{content.cardText}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/shop"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-black px-7 text-sm font-medium text-white transition hover:bg-black/80"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>

          {ordersHref && (
            <Link
              href={ordersHref}
              className="flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-7 text-sm font-medium text-black transition hover:bg-black/5"
            >
              View my orders
            </Link>
          )}

          <Link
            href="/"
            className="flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-7 text-sm font-medium text-black transition hover:bg-black/5"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccess;