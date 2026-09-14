"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getCart,
  submitCart,
  updateCartAddress,
  isAuthenticated,
  type CartItem,
} from "@/api/features/cart";
import {
  getGuestCartItems,
  clearGuestCart,
  type GuestCartItem,
} from "@/hooks/use-guest-cart";
import { uploadToCloudinary } from "@/lib/upload-to-cloudinary";
import Container from "@/components/shared/Container";
import OrderSummaryCard, {
  OrderSummaryItem,
} from "@/components/shared/cards/SummaryCard";
import DetailsStep from "./Details";
import ReceiptStep from "./ReceiptStep";
import { useCurrency } from "@/providers/currency-provider";
import { useRouter } from "next/navigation";

type Step = "details" | "receipt";

const CheckoutPage = () => {
  const { selectedCurrency } = useCurrency();
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setAuthChecked(true);
  }, []);

  const [guestItems, setGuestItems] = useState<GuestCartItem[]>([]);

  useEffect(() => {
    if (!authChecked || authenticated) return;
    setGuestItems(getGuestCartItems());
  }, [authChecked, authenticated]);

  const { data: cart, isLoading: cartLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: authenticated,
  });

  const [step, setStep] = useState<Step>("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Step 1 — details
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [whatsappOverride, setWhatsappOverride] = useState("");
  const [contactMethod, setContactMethod] = useState<"email" | "whatsapp">(
    "email"
  );
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // Step 2 — receipt
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);

  const summaryItems: OrderSummaryItem[] = authenticated
    ? (cart?.items ?? []).map((item: CartItem) => ({
        id: item.id,
        productNameSnapshot: item.productNameSnapshot,
        imageUrlSnapshot: item.imageUrlSnapshot,
        quantity: item.quantity,
        unitPriceSnapshot: item.unitPriceSnapshot,
        currency: item.currency,
        pricesSnapshot: item.pricesSnapshot ?? [],
      }))
    : guestItems.map((item) => ({
        id: item.localId,
        productNameSnapshot: item.productNameSnapshot ?? null,
        imageUrlSnapshot: item.imageUrlSnapshot ?? null,
        quantity: item.quantity,
        unitPriceSnapshot: item.unitPriceSnapshot,
        currency: item.currency ?? "",
        pricesSnapshot: item.pricesSnapshot ?? [],
      }));

  const handleReceiptSelected = (file: File | undefined) => {
    if (!file) return;
    setReceiptFile(file);
    setReceiptPreview(URL.createObjectURL(file));
    setReceiptUrl(null);
  };

  const handleContinueToReceipt = () => {
    if (!authenticated) {
      if (!guestName.trim() || !guestEmail.trim() || !guestPhone.trim()) {
        toast.error("Please fill in your name, email, and phone number");
        return;
      }
    }

    if (contactMethod === "whatsapp" && !authenticated && !guestPhone.trim()) {
      toast.error("A phone number is required for WhatsApp contact");
      return;
    }

    setStep("receipt");
  };

  const handleFinalSubmit = async () => {
    if (summaryItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    try {
      let uploadedReceiptUrl = receiptUrl;

      if (receiptFile && !uploadedReceiptUrl) {
        setIsUploading(true);
        uploadedReceiptUrl = await uploadToCloudinary(receiptFile);
        setReceiptUrl(uploadedReceiptUrl);
        setIsUploading(false);
      }

      if (authenticated) {
        await updateCartAddress({
          state: state || null,
          city: city || null,
          address: address || null,
          receiptUrl: uploadedReceiptUrl,
        });

        await submitCart({
          contactMethod,
          phoneNumber:
            contactMethod === "whatsapp"
              ? whatsappOverride || undefined
              : undefined,
        });
      } else {
        await submitCart({
          contactMethod,
          guestName,
          guestEmail,
          guestPhone,
          state: state || undefined,
          city: city || undefined,
          address: address || undefined,
          items: guestItems.map(({ localId, ...rest }) => rest),
        });

        clearGuestCart();
      }

      toast.success("Order submitted");
      router.push("/shop");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Couldn't submit your order"
      );
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  if (!authChecked || (authenticated && cartLoading)) {
    return (
      <div className="p-10 text-center text-sm text-gray-500">Loading...</div>
    );
  }

  if (summaryItems.length === 0) {
    return (
      <div className="p-10 text-center text-sm text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="bg-[#EEEEEE] min-h-screen py-24">
      <Container className="flex flex-col-reverse lg:flex-row gap-10">
        <div>
       
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-3 w-[80%] lg:w-[400px] mt-5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  step === "details"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                1
              </div>
              <span
                className={step === "details" ? "font-medium" : "text-gray-500"}
              >
                Details
              </span>

              <div className="h-px w-8 lg:w-full flex-1 bg-gray-200" />

              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  step === "receipt"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                2
              </div>
              <span
                className={step === "receipt" ? "font-medium" : "text-gray-500"}
              >
                Receipt
              </span>
            </div>

            {step === "details" && (
              <DetailsStep
                authenticated={authenticated}
                guestName={guestName}
                onGuestNameChange={setGuestName}
                guestEmail={guestEmail}
                onGuestEmailChange={setGuestEmail}
                guestPhone={guestPhone}
                onGuestPhoneChange={setGuestPhone}
                whatsappOverride={whatsappOverride}
                onWhatsappOverrideChange={setWhatsappOverride}
                contactMethod={contactMethod}
                onContactMethodChange={setContactMethod}
                state={state}
                onStateChange={setState}
                city={city}
                onCityChange={setCity}
                address={address}
                onAddressChange={setAddress}
                onContinue={handleContinueToReceipt}
              />
            )}

            {step === "receipt" && (
              <ReceiptStep
                receiptPreview={receiptPreview}
                onReceiptSelected={handleReceiptSelected}
                onBack={() => setStep("details")}
                onSubmit={handleFinalSubmit}
                isSubmitting={isSubmitting}
                isUploading={isUploading}
              />
            )}
          </div>
        </div>

    <div>
    <div className=" lg:hidden">
            <p className="text-xs text-[#A56423] font-semibold">CHECKOUT</p>
            <p className="text-3xl lg:text-[50px] mt-[3.5px] text-[#000000]">Complete Your Order</p>
            <p className="text-xs font-semibold my-2  text-[#595959]">
              Complete your details and payment information to submit your
              order.
            </p>
          </div>
        <OrderSummaryCard
          items={summaryItems}
          selectedCurrency={
            authenticated
              ? cart?.selectedCurrency ?? selectedCurrency
              : selectedCurrency
          }
          className="lg:sticky lg:top-24 bg-black h-fit text-white"
        />
    </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;
