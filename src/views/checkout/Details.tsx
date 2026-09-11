"use client";

import { useState } from "react";
import FormInput from "@/components/shared/input/FormInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import AnimatedSubmitButton from "@/components/shared/SubmitButton";

interface DetailsStepProps {
  authenticated: boolean;
  guestName: string;
  onGuestNameChange: (v: string) => void;
  guestEmail: string;
  onGuestEmailChange: (v: string) => void;
  guestPhone: string;
  onGuestPhoneChange: (v: string) => void;
  whatsappOverride: string;
  onWhatsappOverrideChange: (v: string) => void;
  contactMethod: "email" | "whatsapp";
  onContactMethodChange: (v: "email" | "whatsapp") => void;
  state: string;
  onStateChange: (v: string) => void;
  city: string;
  onCityChange: (v: string) => void;
  address: string;
  onAddressChange: (v: string) => void;
  onContinue: () => void;
}

const countries = [
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
];

const DetailsStep = ({
  authenticated,
  guestName,
  onGuestNameChange,
  guestEmail,
  onGuestEmailChange,
  guestPhone,
  onGuestPhoneChange,
  whatsappOverride,
  onWhatsappOverrideChange,
  contactMethod,
  onContactMethodChange,
  state,
  onStateChange,
  city,
  onCityChange,
  address,
  onAddressChange,
  onContinue,
}: DetailsStepProps) => {
  const [countryOpen, setCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((country) => state.startsWith(country.name)) || null
  );

  const handleCountrySelect = (country: (typeof countries)[number]) => {
    setSelectedCountry(country);
    onStateChange(`${country.name}, `);
    setCountryOpen(false);
  };

  return (
    <div className="space-y-5 bg-white shadow-lg rounded-2xl border p-6">
      <div className="space-y-3">
        <div className="flex gap-[10px] items-center">
          <div>
            <p className="font-normal text-[32px] text-[#A56423]">01</p>
          </div>

          <div>
            <p className="font-sans font-semibold text-xs text-[#595959]">
              Customer Information
            </p>

            <p className="font-normal text-2xl text-[#000000]">
              Make Your Payment
            </p>

            <p className="font-sans font-semibold text-xs text-[#595959]">
              Transfer your payment using the account details below.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          <FormInput
            placeholder=""
            value={guestName}
            onChange={(e) => onGuestNameChange(e.target.value)}
            label="Full name"
            type="text"
          />

          <FormInput
            placeholder=""
            type="email"
            value={guestEmail}
            onChange={(e) => onGuestEmailChange(e.target.value)}
            label="Email"
          />

          <FormInput
            placeholder=""
            value={guestPhone}
            onChange={(e) => onGuestPhoneChange(e.target.value)}
            label="Phone number"
            type="tel"
          />
        </div>
      </div>
      <div className="mt-[50px]">
        <p className="text-[24px] font-medium">
          How Would You Like Us To Contact You?
        </p>
        <p className="font-sans text-xs text-[#404944]">
          Choose how our team should contact you about your order.
        </p>

        <div className="flex gap-2 mt-[26px]">
          <button
            type="button"
            onClick={() => onContactMethodChange("email")}
            className={`flex-1 rounded-full border px-4 py-2 text-sm ${
              contactMethod === "email"
                ? "border-black bg-black text-white"
                : "border-gray-300"
            }`}
          >
            Email
          </button>

          <button
            type="button"
            onClick={() => onContactMethodChange("whatsapp")}
            className={`flex-1 rounded-full border px-4 py-2 text-sm ${
              contactMethod === "whatsapp"
                ? "border-black bg-black text-white"
                : "border-gray-300"
            }`}
          >
            WhatsApp
          </button>
        </div>

        {contactMethod === "whatsapp" && (
          <FormInput
            placeholder="WhatsApp number"
            value={whatsappOverride}
            onChange={(e) => onWhatsappOverrideChange(e.target.value)}
            label={""}
          />
        )}
      </div>

      <div className="space-y-3 mt-[50px]">
        <h2 className="font-semibold text-2xl">Delivery Address</h2>

        <p className="text-xs text-gray-500">
          Optional for now, used only to help our team reach you.
        </p>

        <div className="space-y-2 ">
          <div className="w-1/2">
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
          Country
            </label>
            <Popover open={countryOpen} onOpenChange={setCountryOpen}>
              <PopoverTrigger
                type="button"
                role="combobox"
                aria-expanded={countryOpen}
                className="flex h-12.5 mt-3 w-full items-center justify-between rounded-[10px] bg-[#F3F3F6] px-3 text-sm text-black outline-none"
              >
                {selectedCountry ? (
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{selectedCountry.flag}</span>
                    <span>{selectedCountry.name}</span>
                  </span>
                ) : (
                  <span className="text-gray-500">Select country</span>
                )}

                <ChevronsUpDown size={16} className="text-gray-400" />
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="w-[var(--radix-popover-trigger-width)] p-0"
              >
                <Command>
                  <CommandInput placeholder="Search country..." />

                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>

                    <CommandGroup>
                      {countries.map((item) => (
                        <CommandItem
                          key={item.code}
                          value={item.name}
                          onSelect={() => handleCountrySelect(item)}
                          className="cursor-pointer"
                        >
                          <span className="mr-2 text-lg">{item.flag}</span>
                          <span>{item.name}</span>

                          <Check
                            size={16}
                            className={`ml-auto ${
                              selectedCountry?.code === item.code
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <div className="w-1/2">
            <FormInput
              label="State / Province / Region"
              placeholder=""
              value={
                state.includes(", ")
                  ? state.substring(state.indexOf(", ") + 2)
                  : state
              }
              onChange={(e) => {
                const countryName = selectedCountry?.name;

                onStateChange(
                  countryName
                    ? `${countryName}, ${e.target.value}`
                    : e.target.value
                );
              }}
              type="text"
            />
          </div>
          <div className="w-1/2">
            <FormInput
              label="City"
              placeholder=""
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              type="text"
            />
          </div>
        </div>

        <FormInput
          label="Address"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          textarea
          rows={5}
        />
      </div>

      <p className="rounded-lg bg-yellow-50 p-3 text-xs leading-5 text-yellow-800">
        Delivery is not available for online booking yet. Our team will reach
        out to you directly to arrange delivery once your order is confirmed.
      </p>
      <div className="w-full flex justify-end items-end ">
        <div className="w-fit">
          <AnimatedSubmitButton
            onClick={onContinue}
            text="Proceed to Payment"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
