// components/checkout/PaymentDetails.tsx
"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

const PaymentDetails = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyAccountNumber = async (account: string) => {
    await navigator.clipboard.writeText(account);
    setCopied(account);
    setTimeout(() => setCopied(null), 2000);
  };

  const accounts = [
    {
      label: "NGN ACCOUNT",
      bank: "ZENITH BANK",
      name: "THE SOIBI FASHION",
      number: "1313115151",
    },
    {
      label: "DOLLAR ACCOUNT",
      bank: "ZENITH BANK",
      name: "THE SOIBI FASHION",
      number: "5076272023",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
      {accounts.map((account) => (
        <div
          key={account.number}
          className="rounded-2xl w-full  bg-[#1A1A1A] p-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white font-sans">
              Bank Transfer Details
            </p>
            <p className="font-bold text-[10px] text-[#A56423] py-1 px-3 rounded-full bg-black w-fit">
              {account.label}
            </p>
          </div>

          <div className="space-y-5 mt-5">
            <div className="flex items-center justify-between gap-5 border-b border-white pb-4">
              <span className="text-xs text-white">Bank Name</span>
              <span className="text-right text-sm font-semibold text-white">
                {account.bank}
              </span>
            </div>

            <div className="flex items-center justify-between gap-5 border-b border-white pb-4">
              <span className="text-xs text-white">Account Name</span>
              <span className="max-w-[60%] text-right text-sm font-semibold text-white">
                {account.name}
              </span>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-white">Account Number</span>
                <button
                  type="button"
                  onClick={() => copyAccountNumber(account.number)}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#A56423] transition hover:text-white"
                >
                  {copied === account.number ? (
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
                  {account.number}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentDetails;