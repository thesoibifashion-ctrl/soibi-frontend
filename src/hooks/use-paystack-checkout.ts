import {
  initializePaystackOrder,
  preparePaystackPayment,
  verifyPaystackPayment,
  type CartItemPayload,
} from "@/api/features/cart";

export const PAYSTACK_CHECKOUT_KEY = "soibi_paystack_checkout";

export interface SavedPaystackCheckout {
  historyId: string;
  guestPaymentToken?: string;
  reference?: string;
}

export interface PaystackPrepareDetails {
  authenticated: boolean;
  contactMethod: "email" | "whatsapp";
  phoneNumber?: string;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  state?: string;
  city?: string;
  address?: string;
  items?: CartItemPayload[];
}

export function readSavedPaystackCheckout(): SavedPaystackCheckout | null {
  try {
    const value = localStorage.getItem(PAYSTACK_CHECKOUT_KEY);
    return value ? JSON.parse(value) as SavedPaystackCheckout : null;
  } catch {
    return null;
  }
}

export function savePaystackCheckout(value: SavedPaystackCheckout) {
  try {
    const previous = readSavedPaystackCheckout();
    localStorage.setItem(PAYSTACK_CHECKOUT_KEY, JSON.stringify({
      ...previous,
      ...value,
      guestPaymentToken: value.guestPaymentToken ?? previous?.guestPaymentToken,
    }));
  } catch {
    // Payment can proceed when browser storage is unavailable.
  }
}

export function clearSavedPaystackCheckout() {
  try {
    localStorage.removeItem(PAYSTACK_CHECKOUT_KEY);
  } catch {
    // Storage may be unavailable.
  }
}

function clearSavedPaystackReference() {
  const saved = readSavedPaystackCheckout();
  if (!saved) return;
  try {
    localStorage.setItem(PAYSTACK_CHECKOUT_KEY, JSON.stringify({
      historyId: saved.historyId,
      ...(saved.guestPaymentToken ? { guestPaymentToken: saved.guestPaymentToken } : {}),
    }));
  } catch {
    // Storage may be unavailable.
  }
}

export function getPaystackErrorMessage(error: unknown, stage: "prepare" | "initialize" | "verify") {
  const status = (error as { status?: number } | null)?.status;
  const message = error instanceof Error ? error.message : "";
  if (status === 401) return "";
  if (stage === "prepare" && status === 404) return "Your cart is empty.";
  if (stage === "prepare" && status === 400 && message === "items must contain at least one item") return "Your cart is empty.";
  if (status === 403) return "We couldn't confirm access to this payment. Please try again.";
  if (stage === "initialize" && status === 409) return "Setting up your payment, please wait";
  if (stage === "verify" && [400, 404, 500].includes(status ?? 0)) {
    return "We couldn't confirm your payment. If you were charged, please contact support.";
  }
  if (stage === "verify" && status === undefined) {
    return "We couldn't confirm your payment. If you were charged, please contact support.";
  }
  return stage === "verify"
    ? "We couldn't confirm your payment. If you were charged, please contact support."
    : "We couldn't start your payment. Please try again.";
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function startPaystackCheckout(details: PaystackPrepareDetails) {
  const saved = readSavedPaystackCheckout();
  const guestReuse = !details.authenticated && saved?.historyId && saved.guestPaymentToken;
  const body = {
    contactMethod: details.contactMethod,
    ...(details.authenticated
      ? { phoneNumber: details.contactMethod === "whatsapp" ? details.phoneNumber : undefined }
      : {
          guestName: details.guestName,
          guestEmail: details.guestEmail,
          guestPhone: details.guestPhone,
          state: details.state,
          city: details.city,
          address: details.address,
          items: details.items,
        }),
    ...(guestReuse ? { historyId: saved.historyId, guestPaymentToken: saved.guestPaymentToken } : {}),
  };

  let prepared;
  try {
    prepared = await preparePaystackPayment(body);
  } catch (error) {
    if (!details.authenticated && guestReuse && (error as { status?: number })?.status === 403) {
      clearSavedPaystackCheckout();
      prepared = await preparePaystackPayment({ ...body, historyId: undefined, guestPaymentToken: undefined });
    } else throw error;
  }

  savePaystackCheckout({
    historyId: prepared.historyId,
    ...(prepared.guestPaymentToken ? { guestPaymentToken: prepared.guestPaymentToken } : {}),
  });
  clearSavedPaystackReference();

  const initialize = () => initializePaystackOrder(
    prepared.historyId,
    details.authenticated ? undefined : prepared.guestPaymentToken ?? readSavedPaystackCheckout()?.guestPaymentToken,
  );
  let initialized;
  try {
    initialized = await initialize();
  } catch (error) {
    const status = (error as { status?: number })?.status;
    const message = error instanceof Error ? error.message : "";
    if (!details.authenticated && status === 403) {
      clearSavedPaystackCheckout();
      return startPaystackCheckout(details);
    }
    if (status === 409 && [
      "Payment initialization is in progress. Please try again shortly.",
      "Payment attempt changed while initializing",
    ].includes(message)) {
      await delay(4000);
      initialized = await initialize();
    } else throw error;
  }

  if (initialized.paymentStatus === "paid") return { paid: true as const };
  if (initialized.reference) savePaystackCheckout({ historyId: prepared.historyId, reference: initialized.reference });
  if (initialized.authorizationUrl) {
    window.location.assign(initialized.authorizationUrl);
    return { paid: false as const, redirected: true as const };
  }
  throw new Error("Payment initialization did not return an authorization URL");
}

export const verifyPaystackReference = (reference: string) => verifyPaystackPayment(reference);
