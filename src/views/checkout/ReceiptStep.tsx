"use client";

import { ArrowLeft, Check, Copy, Smartphone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
// import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const ACCOUNT_NUMBER = "0000000000";

interface ReceiptStepProps {
  receiptPreview: string | null;
  onReceiptSelected: (file: File | undefined) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isUploading: boolean;
}

const ReceiptStep = ({
  receiptPreview,
  onReceiptSelected,
  onBack,
  onSubmit,
  isSubmitting,
  isUploading,
}: ReceiptStepProps) => {
  const [copied, setCopied] = useState(false);
  const [receivedFromPhone, setReceivedFromPhone] = useState(false);

  const sessionId = useMemo(() => crypto.randomUUID(), []);

  const mobilePayUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/checkout/mobile-pay?session=${sessionId}`
      : "";

  //   useEffect(() => {
  //     const channel = supabase
  //       .channel(`checkout-${sessionId}`)
  //       .on("broadcast", { event: "receipt-uploaded" }, (payload) => {
  //         const url = payload.payload?.url;

  //         if (url) {
  //           onReceiptSelected(undefined);
  //           setReceivedFromPhone(true);
  //         }
  //       })
  //       .subscribe();

  //     return () => {
  //       supabase.removeChannel(channel);
  //     };
  //   }, [sessionId, onReceiptSelected]);

  const copyAccountNumber = async () => {
    await navigator.clipboard.writeText(ACCOUNT_NUMBER);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="rounded-[24px] bg-near-black ">
      <div className="bg-black rounded-[20px] p-6">
        <div className="mb-8 flex items-center gap-5">
          <span className="font-display text-4xl font-bold leading-none text-[#A56423]">
            02
          </span>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A56423]">
              Payment
            </p>

            <h2 className="mt-1 font-display text-2xl font-bold text-white">
              Make Your Payment
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/50">
              Transfer your payment using the account details below.
            </p>
          </div>
        </div>

        <div className="flex gap-[22px]">
          <div className="rounded-2xl w-1/2  bg-[#1A1A1A] p-6">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white font-sans">
                Bank Transfer Details
              </p>
              <p className="font-bold text-[10px] text-[#A56423] py-1 px-3 rounded-full bg-black w-fit">
                NGN ACCOUNT
              </p>
            </div>
            <div className="space-y-5 mt-5">
              <div className="flex items-center justify-between gap-5 border-b border-white pb-4">
                <span className="text-xs text-white">Bank Name</span>

                <span className="text-right text-sm font-semibold text-white">
                  Moniepoint
                </span>
              </div>

              <div className="flex items-center justify-between gap-5 border-b border-white pb-4">
                <span className="text-xs text-white">Account Name</span>

                <span className="max-w-[60%] text-right text-sm font-semibold text-white">
                  Soibifashion
                </span>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white">
                      Account Number
                    </span>
                
                  </div>
                  <button
                    type="button"
                    onClick={copyAccountNumber}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#A56423] transition hover:text-white"
                  >
                    {copied ? (
                      <>
                        <Check size={13} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-4">
                  <p className="font-mono text-xl font-bold tracking-[0.15em] text-[#A56423]">
                    {ACCOUNT_NUMBER}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl w-1/2  bg-[#1A1A1A] p-6">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white font-sans">
                Bank Transfer Details
              </p>
              <p className="font-bold text-[10px] text-[#A56423] py-1 px-3 rounded-full bg-black w-fit">
                NGN ACCOUNT
              </p>
            </div>
            <div className="space-y-5 mt-5">
              <div className="flex items-center justify-between gap-5 border-b border-white pb-4">
                <span className="text-xs text-white">Bank Name</span>

                <span className="text-right text-sm font-semibold text-white">
                  Moniepoint
                </span>
              </div>

              <div className="flex items-center justify-between gap-5 border-b border-white pb-4">
                <span className="text-xs text-white">Account Name</span>

                <span className="max-w-[60%] text-right text-sm font-semibold text-white">
                  Soibifashion
                </span>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white">
                      Account Number
                    </span>
                
                  </div>
                  <button
                    type="button"
                    onClick={copyAccountNumber}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#A56423] transition hover:text-white"
                  >
                    {copied ? (
                      <>
                        <Check size={13} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-4">
                  <p className="font-mono text-xl font-bold tracking-[0.15em] text-[#A56423]">
                    {ACCOUNT_NUMBER}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-center gap-2 text-white">
            <Smartphone size={14} />

            <p className="text-[10px] font-bold uppercase tracking-[0.16em]">
              Pay or Upload From Your Phone
            </p>
          </div>

          <p className="mt-2 text-xs leading-6 text-white">
            Scan this code to open the payment details and receipt upload on
            another device — it'll sync back here automatically.
          </p>

          <div className="mt-5 flex flex-col items-center gap-3">
            {receivedFromPhone ? (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-8 text-emerald-400">
                <Check size={18} />

                <span className="text-sm font-semibold">
                  Receipt received from your device
                </span>
              </div>
            ) : (
              mobilePayUrl && (
                <div className="rounded-xl bg-white p-4">
                  <QRCodeSVG value={mobilePayUrl} size={160} />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="bg-white text-black p-5 shadow-lg rounded-[20px] mt-[45px]">
        <div className="space-y-1">
          <p className="text-xs font-sans text-[#595959] font-semibold">
            VERIFICATION
          </p>
          <p className="text-2xl text-[#000000]">Payment Evidence</p>
          <p className="text-[10px] font-sans text-[#595959] font-semibold">
            Upload your receipt, transfer confirmation, screenshot, or any other
            evidence showing that payment has been made.
          </p>
        </div>
        <div className="mt-5 rounded-xl bg-[#F3F3F6] p-4 ">
          <label className="flex cursor-pointer  flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 p-8 text-center transition hover:border-white/30">
            {receiptPreview ? (
              <img
                src={receiptPreview}
                alt="Receipt preview"
                className="h-40 rounded-lg object-contain"
              />
            ) : (
              <>
                <span className="text-sm font-sans font-bold">
                  Upload Payment Evidence
                </span>

                <span className="text-[11px] text-[#404944] font-sans font-semibold">
                  Receipt, screenshot, transfer confirmation or PDF
                </span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onReceiptSelected(e.target.files?.[0])}
            />
          </label>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        {/* <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting || isUploading}
            className="flex items-center gap-2 text-sm text-black transition hover:text-white disabled:opacity-30"
          >
            <ArrowLeft size={16} />
            Back
          </button> */}

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || isUploading}
          className="w-full rounded-full bg-black px-6 py-3 text-sm font-semibold text-white "
        >
          {isSubmitting || isUploading
            ? isUploading
              ? "Uploading..."
              : "Submitting..."
            : "Submit Order"}
        </button>
      </div>
    </section>
  );
};

export default ReceiptStep;
