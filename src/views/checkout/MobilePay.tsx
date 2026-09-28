// app/checkout/mobile-pay/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";
import PaymentDetails from "./AccountDetails";
import { uploadToCloudinary } from "@/lib/cloudinary-id";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export default function MobilePayPage() {
  const params = useSearchParams();
  const sessionId = params.get("session");

  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (!sessionId) {
      setError("Missing session — please rescan the QR code.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const { secureUrl, publicId } = await uploadToCloudinary(file);

      const res = await fetch(
        `${API_URL}/api/checkout/mobile-sessions/${sessionId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            receiptUrl: secureUrl,
            receiptPublicId: publicId,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          res.status === 404
            ? "This session has expired. Please rescan the QR code."
            : "Failed to sync receipt"
        );
      }

      setUploaded(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setUploading(false);
    }
  };

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6 text-center text-white">
        <p>Invalid link. Please rescan the QR code from your checkout screen.</p>
      </div>
    );
  }

  if (uploaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-black p-6 text-center text-white">
        <div className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-emerald-400">
          <Check size={18} />
          <span className="text-sm font-semibold">Receipt uploaded</span>
        </div>
        <p className="text-sm text-white/60">
          You can return to your computer now.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mx-auto max-w-md space-y-6">
        <h1 className="font-display text-xl font-bold text-white">
          Complete Your Payment
        </h1>

        <PaymentDetails />

        <div className="rounded-xl bg-[#1A1A1A] p-4">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 p-8 text-center transition hover:border-white/30">
            <span className="text-sm font-sans font-bold text-white">
              {uploading ? "Uploading..." : "Upload Payment Evidence"}
            </span>
            <span className="text-[11px] text-white/50 font-sans font-semibold">
              Receipt, screenshot, or transfer confirmation
            </span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) =>
                e.target.files?.[0] && handleFile(e.target.files[0])
              }
            />
          </label>
        </div>

        {error && (
          <p className="text-center text-sm text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
}