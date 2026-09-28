// hooks/use-guest-details.ts
const GUEST_DETAILS_KEY = "soibi_guest_details";

export interface GuestDetails {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  state: string;
  city: string;
  address: string;
}

const defaultDetails: GuestDetails = {
  guestName: "",
  guestEmail: "",
  guestPhone: "",
  state: "",
  city: "",
  address: "",
};

export function getGuestDetails(): GuestDetails {
  if (typeof window === "undefined") return defaultDetails;

  try {
    const raw = localStorage.getItem(GUEST_DETAILS_KEY);
    if (!raw) return defaultDetails;
    return { ...defaultDetails, ...JSON.parse(raw) };
  } catch {
    return defaultDetails;
  }
}

export function saveGuestDetails(details: GuestDetails) {
  if (typeof window === "undefined") return;
  localStorage.setItem(GUEST_DETAILS_KEY, JSON.stringify(details));
}