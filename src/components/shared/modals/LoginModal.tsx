"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { requestCode, verifyCode } from "@/api/features/auth";
import { authStorage } from "@/lib/auth-storage";
import { syncGuestCartToServer } from "@/hooks/use-cart";
import Image from "next/image";
import { toast } from "sonner";

type ModalView = "email" | "code";

const RESEND_SECONDS = 60;

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [view, setView] = useState<ModalView>("email");
  const [email, setEmail] = useState("");
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((c) => Math.max(0, c - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const requestCodeMutation = useMutation({
    mutationFn: requestCode,

    onSuccess: () => {
      setView("code");
      setDigits(["", "", "", "", "", ""]);
      setCountdown(RESEND_SECONDS);

      setTimeout(() => inputRefs.current[0]?.focus(), 0);
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Couldn't send code, please try again"
      );
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: verifyCode,

    onSuccess: async (response) => {
      authStorage.setToken(response.accessToken);
      await syncGuestCartToServer();

      onOpenChange(false);
      window.location.href =
        window.location.pathname + window.location.search;
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Invalid or expired code"
      );

      setDigits(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    },
  });

  const handleSendCode = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) return;

    requestCodeMutation.mutate({ email });
  };

  const handleDigitChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 1);

    const next = [...digits];
    next[index] = cleaned;
    setDigits(next);

    if (cleaned && index < digits.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullCode = next.join("");

    if (fullCode.length === digits.length) {
      verifyCodeMutation.mutate({
        email,
        code: fullCode,
      });
    }
  };

  const handleDigitKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleDigitPaste = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, digits.length);

    if (!pasted) return;

    const next = [...digits];

    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }

    setDigits(next);

    inputRefs.current[
      Math.min(pasted.length, digits.length - 1)
    ]?.focus();

    if (pasted.length === digits.length) {
      verifyCodeMutation.mutate({
        email,
        code: pasted,
      });
    }
  };

  const handleResend = () => {
    if (countdown > 0) return;

    requestCodeMutation.mutate({ email });
  };

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setView("email");
      setEmail("");
      setDigits(["", "", "", "", "", ""]);
      setCountdown(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="md:min-w-112 w-full rounded-3xl border-0 bg-white p-4 md:p-8 shadow-2xl">
        {view === "email" && (
          <>
            <DialogHeader>
              <DialogTitle className="font-(--font-prata) text-3xl text-black">
                Welcome back
              </DialogTitle>

              <DialogDescription className="mt-2 text-sm leading-6 text-gray-500">
                Enter your email and we'll send you a login code.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSendCode} className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  autoFocus
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 text-sm outline-none transition focus:border-black"
                />
              </div>

              <button
                type="submit"
                disabled={requestCodeMutation.isPending}
                className="flex h-12 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition-all duration-300 hover:bg-black/85 disabled:opacity-60"
              >
                {requestCodeMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Send Code"
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-[11px] text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-black bg-white text-sm font-medium text-black transition-all duration-300 hover:bg-black hover:text-white"
            >
              <Image
                width={20}
                height={20}
                alt="google"
                src="/google.png"
              />
              Continue with Google
            </button>
          </>
        )}

        {view === "code" && (
          <>
            <button
              type="button"
              onClick={() => setView("email")}
              className="mb-6 flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <DialogHeader>
              <DialogTitle className="font-(--font-prata) text-3xl text-black">
                Enter your code
              </DialogTitle>

              <DialogDescription className="mt-2 text-sm leading-6 text-gray-500">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-black">
                  {email}
                </span>
                .
              </DialogDescription>
            </DialogHeader>

            <div className="mt-7 flex justify-between overflow-auto gap-1 md:gap-3">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  disabled={verifyCodeMutation.isPending}
                  onChange={(e) =>
                    handleDigitChange(index, e.target.value)
                  }
                  onKeyDown={(e) =>
                    handleDigitKeyDown(index, e)
                  }
                  onPaste={handleDigitPaste}
                  className="h-10 md:h-12 w-10 md:w-12 rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] text-center text-xl font-semibold outline-none transition focus:border-black disabled:opacity-60"
                />
              ))}
            </div>

            {verifyCodeMutation.isPending && (
              <div className="mt-4 flex justify-center">
                <Loader2
                  className="animate-spin text-gray-400"
                  size={18}
                />
              </div>
            )}

            <div className="mt-6 text-center text-sm text-gray-500">
              {countdown > 0 ? (
                <span>Resend code in {countdown}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={requestCodeMutation.isPending}
                  className="font-medium text-black underline underline-offset-4 disabled:opacity-60"
                >
                  {requestCodeMutation.isPending
                    ? "Sending..."
                    : "Resend code"}
                </button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
