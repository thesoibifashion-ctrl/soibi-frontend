// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Loader2,
  UserRound,
  MapPin,
  Mail,
  Phone,
  Check,
  ChevronsUpDown,
} from "lucide-react";

import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetAuth, useUpdateProfile } from "@/api/features/auth";
import { isAuthenticated } from "@/lib/auth-finder";
import LoginModal from "@/components/shared/modals/LoginModal";
import { countries } from "@/country";
import { cn } from "@/lib/utils";

const ProfilePage = () => {
  const { data: profile, isLoading } = useGetAuth();
  const updateProfileMutation = useUpdateProfile();
  const [authenticated, setAuthenticated] = useState(false);
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState<"email" | "whatsapp">(
    "email"
  );
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const getFlag = (code: string) =>
    code
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
      );

  const selectedCountry =
    countries.find((item) => item.name === country) ?? null;

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  useEffect(() => {
    if (!profile) return;

    setFullName(profile.fullName ?? "");
    setPhone(profile.phone ?? "");
    setContactMethod(profile.preferredContactMethod ?? "email");
    setCountry(profile.country ?? "");
    setState(profile.state ?? "");
    setCity(profile.city ?? "");
    setAddress(profile.address ?? "");
  }, [profile]);

  const isDirty =
    !!profile &&
    (fullName !== (profile.fullName ?? "") ||
      phone !== (profile.phone ?? "") ||
      contactMethod !== (profile.preferredContactMethod ?? "email") ||
      country !== (profile.country ?? "") ||
      state !== (profile.state ?? "") ||
      city !== (profile.city ?? "") ||
      address !== (profile.address ?? ""));

  const initials =
    (profile?.fullName ?? profile?.email ?? "?")
      .trim()
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  const handleSave = async () => {
    try {
      await updateProfileMutation.mutateAsync({
        fullName: fullName || undefined,
        phone: phone || undefined,
        preferredContactMethod: contactMethod,
        country: country || undefined,
        state: state || undefined,
        city: city || undefined,
        address: address || undefined,
      });

      toast.success("Profile updated");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Couldn't update profile"
      );
    }
  };

  const handleCancel = () => {
    if (!profile) return;

    setFullName(profile.fullName ?? "");
    setPhone(profile.phone ?? "");
    setContactMethod(profile.preferredContactMethod ?? "email");
    setCountry(profile.country ?? "");
    setState(profile.state ?? "");
    setCity(profile.city ?? "");
    setAddress(profile.address ?? "");
  };

  if (!authenticated) {
    return (
      <>
        <div className="min-h-screen bg-[#F7F5F2]">
          <Container className="flex min-h-screen items-center justify-center py-20">
            <div className="w-full max-w-lg text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
                <UserRound className="h-8 w-8 text-black/50" />
              </div>

              <h1 className="mt-7 text-3xl font-medium tracking-tight text-black">
                You are not authenticated
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/50">
                Please sign in to view and manage your profile.
              </p>

              <button
                type="button"
                onClick={() => setOpenCheckoutModal(true)}
                className="mt-7 w-full rounded-full bg-black py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Login
              </button>
            </div>
          </Container>
        </div>

        <LoginModal
          open={openCheckoutModal}
          onOpenChange={setOpenCheckoutModal}
        />
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5F2]">
        <Loader2 className="h-6 w-6 animate-spin text-black/50" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2] py-28">
      <Container className="max-w-5xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-black text-sm font-medium tracking-wide text-white">
              {initials}
            </div>

            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.2em] text-black/40">
                My Account
              </p>

              <h1 className="text-2xl font-medium tracking-tight text-black">
                {profile?.fullName || "Your Profile"}
              </h1>

              <div className="mt-1 flex items-center gap-1.5 text-sm text-black/50">
                <Mail className="h-3.5 w-3.5" />
                {profile?.email}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Personal Information */}
          <section className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            <div className="flex items-start gap-4 border-b border-black/10 px-6 py-6 md:px-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F5F2]">
                <UserRound className="h-4 w-4 text-black/60" />
              </div>

              <div>
                <h2 className="text-base font-medium text-black">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-black/45">
                  Manage your personal details and contact preferences.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 px-6 py-7 sm:grid-cols-2 md:px-8">
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-xs font-medium text-black/60"
                >
                  Full Name
                </Label>

                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ada Okafor"
                  className="h-12 border-black/10 bg-[#FAFAFA] shadow-none focus-visible:ring-black/20"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-medium text-black/60"
                >
                  Email
                </Label>

                <Input
                  id="email"
                  value={profile?.email ?? ""}
                  disabled
                  className="h-12 border-black/10 bg-[#F5F5F5] text-black/50 shadow-none"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-xs font-medium text-black/60"
                >
                  Phone Number
                </Label>

                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />

                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 801 234 5678"
                    className="h-12 border-black/10 bg-[#FAFAFA] pl-10 shadow-none focus-visible:ring-black/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="contactMethod"
                  className="text-xs font-medium text-black/60"
                >
                  Preferred Contact Method
                </Label>

                <Select
                  value={contactMethod}
                  onValueChange={(value) => {
                    if (value === "email" || value === "whatsapp") {
                      setContactMethod(value);
                    }
                  }}
                >
                  <SelectTrigger
                    id="contactMethod"
                    className="h-12 border-black/10 bg-[#FAFAFA] shadow-none focus:ring-black/20"
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Delivery Address */}
          <section className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            <div className="flex items-start gap-4 border-b border-black/10 px-6 py-6 md:px-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F5F2]">
                <MapPin className="h-4 w-4 text-black/60" />
              </div>

              <div>
                <h2 className="text-base font-medium text-black">
                  Delivery Address
                </h2>

                <p className="mt-1 text-sm text-black/45">
                  Save your usual delivery details for a faster checkout.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 px-6 py-7 lg:grid-cols-2 md:px-8">
              <div className="space-y-2">
                <Label
                  htmlFor="country"
                  className="text-xs font-medium text-black/60"
                >
                  Country
                </Label>

                <Popover open={countryPickerOpen} onOpenChange={setCountryPickerOpen}>
                  <PopoverTrigger
                    id="country"
                    type="button"
                    className="flex h-12 w-full items-center justify-between rounded-md border border-black/10 bg-[#FAFAFA] px-3 text-sm shadow-none"
                  >
                    {selectedCountry ? (
                      <span className="flex items-center gap-2">
                        <span className="text-lg">
                          {getFlag(selectedCountry.code)}
                        </span>
                        <span>{selectedCountry.name}</span>
                      </span>
                    ) : (
                      <span className="text-gray-500">Select country</span>
                    )}

                    <ChevronsUpDown className="h-4 w-4 text-black/40" />
                  </PopoverTrigger>

                  <PopoverContent
                    align="start"
                    className="w-[var(--radix-popover-trigger-width)] p-0"
                  >
                    <Command>
                      <CommandInput placeholder="Search country..." />

                      <CommandEmpty>No country found.</CommandEmpty>

                      <CommandGroup className="max-h-[300px] overflow-y-auto">
                        {countries.map((item) => (
                          <CommandItem
                            key={item.code}
                            value={item.name}
                            onSelect={() => {
                              setCountry(item.name);
                              setCountryPickerOpen(false);
                            }}
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-lg">{getFlag(item.code)}</span>
                              <span>{item.name}</span>
                            </span>

                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                country === item.name ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="state"
                  className="text-xs font-medium text-black/60"
                >
                  State / Province
                </Label>

                <Input
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Lagos"
                  className="h-12 border-black/10 bg-[#FAFAFA] shadow-none focus-visible:ring-black/20"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className="text-xs font-medium text-black/60"
                >
                  City
                </Label>

                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Victoria Island"
                  className="h-12 border-black/10 bg-[#FAFAFA] shadow-none focus-visible:ring-black/20"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label
                  htmlFor="address"
                  className="text-xs font-medium text-black/60"
                >
                  Address
                </Label>

                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="12 Example Street"
                  className="h-12 border-black/10 bg-[#FAFAFA] shadow-none focus-visible:ring-black/20"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Actions */}
        <div className="mt-7 flex items-center justify-end gap-3">
          {isDirty && (
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              disabled={updateProfileMutation.isPending}
              className="rounded-full px-6"
            >
              Cancel
            </Button>
          )}

          <Button
            type="button"
            onClick={handleSave}
            disabled={!isDirty || updateProfileMutation.isPending}
            className="rounded-full px-7"
          >
            {updateProfileMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;