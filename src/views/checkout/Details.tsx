"use client";

import { useState } from "react";
import FormInput from "@/components/shared/input/FormInput";
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
import { countries } from "@/country";
import PaymentMethodModal from "./ChoosePayment";

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
  onContinue: (method: "paystack" | "bank_transfer") => void;
  profileSaving: boolean;
  onPaystack: () => Promise<void>;
}

type FieldKey =
  | "name"
  | "email"
  | "phone"
  | "whatsapp"
  | "country"
  | "state"
  | "city"
  | "address";

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p role="alert" className="mt-1.5 text-xs text-red-600">
      {message}
    </p>
  ) : null;

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
  onPaystack,
  profileSaving,
}: DetailsStepProps) => {
  const [countryOpen, setCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((country) => state.startsWith(country.name)) || null
  );
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCountrySelect = (country: (typeof countries)[number]) => {
    setSelectedCountry(country);
    onStateChange(`${country.name}, `);
    setCountryOpen(false);
  };

  const getFlag = (code: string) =>
    code
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
      );

  // ---------- Validation ----------
  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  const isValidPhone = (v: string) => v.replace(/\D/g, "").length >= 7;

  // The state field is prefixed with "Country, " — strip it to check what the user typed
  const stateOnly = selectedCountry
    ? state.replace(`${selectedCountry.name},`, "").trim()
    : state.trim();

  const errors: Partial<Record<FieldKey, string>> = {};

  if (!guestName.trim()) errors.name = "Please enter your full name.";

  if (!guestEmail.trim()) errors.email = "Please enter your email address.";
  else if (!isValidEmail(guestEmail))
    errors.email = "Please enter a valid email address.";

  if (!guestPhone.trim()) errors.phone = "Please enter your phone number.";
  else if (!isValidPhone(guestPhone))
    errors.phone = "Please enter a valid phone number.";

  if (contactMethod === "whatsapp") {
    if (!whatsappOverride.trim())
      errors.whatsapp = "Please enter your WhatsApp number.";
    else if (!isValidPhone(whatsappOverride))
      errors.whatsapp = "Please enter a valid WhatsApp number.";
  }

  if (!selectedCountry) errors.country = "Please select your country.";
  if (!stateOnly) errors.state = "Please enter your state / province.";
  if (!city.trim()) errors.city = "Please enter your city.";
  if (!address.trim()) errors.address = "Please enter your delivery address.";

  const errorKeys = Object.keys(errors) as FieldKey[];
  const isValid = errorKeys.length === 0;

  const err = (key: FieldKey) => (submitted ? errors[key] : undefined);

  const handleContinueClick = () => {
    setSubmitted(true);

    if (!isValid) {
      // Scroll to the first field with an error
      const order: FieldKey[] = [
        "name",
        "email",
        "phone",
        "whatsapp",
        "country",
        "state",
        "city",
        "address",
      ];
      const firstError = order.find((k) => errors[k]);
      if (firstError) {
        document
          .getElementById(`field-${firstError}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setShowPaymentModal(true);
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
          <div id="field-name">
            <FormInput
              placeholder=""
              value={guestName}
              onChange={(e) => onGuestNameChange(e.target.value)}
              label="Full name"
              type="text"
            />
            <FieldError message={err("name")} />
          </div>

          <div id="field-email">
            <FormInput
              placeholder=""
              type="email"
              value={guestEmail}
              onChange={(e) => onGuestEmailChange(e.target.value)}
              label="Email"
            />
            <FieldError message={err("email")} />
          </div>

          <div id="field-phone">
            <FormInput
              placeholder=""
              value={guestPhone}
              onChange={(e) => onGuestPhoneChange(e.target.value)}
              label="Phone number"
              type="tel"
            />
            <FieldError message={err("phone")} />
          </div>
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
          <div id="field-whatsapp">
            <FormInput
              placeholder="WhatsApp number"
              value={whatsappOverride}
              onChange={(e) => onWhatsappOverrideChange(e.target.value)}
              label={""}
            />
            <FieldError message={err("whatsapp")} />
          </div>
        )}
      </div>

      <div className="space-y-3 mt-[50px]">
        <h2 className="font-semibold text-2xl">Delivery Address</h2>

        <p className="text-xs text-gray-500">
          Used only to help our team reach you.
        </p>

        <div className="space-y-2 ">
          <div id="field-country" className="w-full lg:w-1/2">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
              Country
            </label>
            <Popover open={countryOpen} onOpenChange={setCountryOpen}>
              <PopoverTrigger
                type="button"
                role="combobox"
                aria-expanded={countryOpen}
                className={`flex h-12.5 mt-3 w-full items-center justify-between rounded-[10px] bg-[#F3F3F6] px-3 text-sm text-black outline-none ${
                  err("country") ? "ring-1 ring-red-500" : ""
                }`}
              >
                {selectedCountry ? (
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{getFlag(selectedCountry.code)}</span>
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
                          <span className="mr-2 text-lg">{getFlag(item.code)}</span>
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
            <FieldError message={err("country")} />
          </div>
        </div>

        <div className="lg:flex-row flex-col flex gap-3 mt-5">
          <div id="field-state" className="w-full lg:w-1/2">
            <FormInput
              label="State / Province"
              placeholder=""
              value={state}
              onChange={(e) => onStateChange(e.target.value)}
              type="text"
            />
            <FieldError message={err("state")} />
          </div>
          {/* <input  hidden/> */}
          <div id="field-city" className="w-full  lg:w-1/2">
            <FormInput
              label="City"
              placeholder=""
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              type="text"
            />
            <FieldError message={err("city")} />
          </div>
        </div>

        <div id="field-address">
          <FormInput
            label="Address"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            textarea
            rows={5}
          />
          <FieldError message={err("address")} />
        </div>
      </div>

      <p className="rounded-lg bg-yellow-50 p-3 text-xs leading-5 text-yellow-800">
        Delivery is not available for online booking yet. Our team will reach
        out to you directly to arrange delivery once your order is confirmed.
      </p>

      {submitted && !isValid && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-700"
        >
          Please complete all required fields before continuing.
        </p>
      )}

      <div className="w-full flex justify-end items-end ">
        <div className="w-fit">
          {/* <AnimatedSubmitButton
            onClick={onContinue}
            text={profileSaving ? "loading " : "Proceed to Payment"}
          /> */}
          <button
            type="button"
            disabled={profileSaving}
            onClick={handleContinueClick}
            className={`rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition-opacity ${
              !isValid || profileSaving ? "opacity-50" : "opacity-100"
            } ${profileSaving ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {profileSaving ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>
      <PaymentMethodModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        onContinue={(method) => onContinue(method)}
        onPaystack={onPaystack}
      />
    </div>
  );
};

export default DetailsStep;