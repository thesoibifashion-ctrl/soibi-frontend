"use client";

import { useState } from "react";
import {
  CreditCard,
  Building2,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Modal from "../../components/shared/cards/modals/General";

interface PaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: (method: "paystack" | "bank_transfer") => void;
}

const PaymentMethodModal = ({
  open,
  onOpenChange,
  onContinue,
}: PaymentMethodModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<
    "paystack" | "bank_transfer" | null
  >(null);

  const handleContinue = () => {
    if (!paymentMethod) return;

    onContinue(paymentMethod);
    onOpenChange(false);
  };

  const paymentOptions = [
    {
      id: "paystack" as const,
      title: "Pay with Paystack",
      description: "Card, bank transfer and other secure payment options.",
      icon: CreditCard,
      tag: "Secure payment",
    },
    {
      id: "bank_transfer" as const,
      title: "Bank Transfer",
      description: "Make a direct transfer to our designated bank account.",
      icon: Building2,
      tag: "Direct payment",
    },
  ];

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Choose Payment Method"
      description="How would you like to complete your payment?"
      className="max-w-[460px] rounded-3xl border-0 p-6 sm:p-8"
    >
      <div className="space-y-3">
        {paymentOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = paymentMethod === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setPaymentMethod(option.id)}
              className={`group relative flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-black bg-[#faf8f5] shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50/70"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  isSelected
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                }`}
              >
                <Icon size={21} strokeWidth={1.7} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {option.title}
                  </p>

                  {option.id === "paystack" && (
                    <span className="rounded-full bg-[#f2e9dc] px-2 py-0.5 text-[10px] font-medium text-[#95652f]">
                      Recommended
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {option.description}
                </p>

                <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  {option.tag}
                </p>
              </div>

              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                  isSelected
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {isSelected && <CheckCircle2 size={15} />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 border-t border-gray-100 pt-5">
        <button
          type="button"
          disabled={!paymentMethod}
          onClick={handleContinue}
          className="group flex h-13 w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Continue
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>

        <div className="mt-4 flex items-center justify-center gap-2 text-gray-400">
          <ShieldCheck size={14} />
          <span className="text-[11px]">
            Your payment information is handled securely
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentMethodModal;