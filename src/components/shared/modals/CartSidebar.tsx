"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, Trash2, Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import {
  getCart,
  updateCartItem,
  removeCartItem,
  isAuthenticated,
  type CartItem,
} from "@/api/features/cart";
import {
  getGuestCartItems,
  updateGuestCartItemQuantity,
  removeGuestCartItem,
  type GuestCartItem,
} from "@/hooks/use-guest-cart";
import AnimatedSubmitButton from "../SubmitButton";
import CheckoutButton from "./CheckoutModal";
import ErrorState from "../Error";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface isActive {
  active: boolean;
}

type DisplayItem = {
  id: string; // real cart item id (authenticated) or localId (guest)
  productNameSnapshot: string | null;
  imageUrlSnapshot: string | null;
  currency: string;
  quantity: number;
  selectedSize: number | string | null;
  selectedColor: string | null;
  selectedMaterial: string | null;
  unitPriceSnapshot: number;
  customMeasurements?: Record<string, string | number> | null;

  pricesSnapshot?: {
    name: string;
    amount: number;
    symbol: string;
    currency: string;
    currencyId: string;
  }[];
};

const CartSidebarSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="flex gap-4 rounded-xl border border-border bg-white p-4"
      >
        <Skeleton className="h-28 w-20 flex-shrink-0 rounded-lg" />
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="mt-2 h-3 w-1/2" />
          </div>
          <Skeleton className="h-7 w-24" />
        </div>
      </div>
    ))}
  </div>
);

const CartSidebar = ({ active }: isActive) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);

  const [open, setOpen] = useState(false);

  // Hydration-safe auth check: start false (matches server render),
  // only flip to the real value after mount, inside an effect.
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setAuthChecked(true);
  }, []);

  const [guestItems, setGuestItems] = useState<GuestCartItem[]>([]);

  const { data: cart, isLoading: cartLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: authenticated,
  });

  useEffect(() => {
    if (!authChecked) return;

    if (!authenticated) {
      setGuestItems(getGuestCartItems());

      const handler = () => setGuestItems(getGuestCartItems());
      window.addEventListener("guest-cart-updated", handler);
      return () => window.removeEventListener("guest-cart-updated", handler);
    }
  }, [authenticated, authChecked]);

  const { mutate: patchQuantity } = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      updateCartItem(id, { quantity }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    onError: () => toast.error("Couldn't update quantity"),
  });

  const { mutate: deleteItem, isPending: isRemoving } = useMutation({
    mutationFn: (id: string) => removeCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed");
    },
    onError: () => toast.error("Couldn't remove item"),
  });

  const displayItems: DisplayItem[] = authenticated
    ? (cart?.items ?? []).map((item: CartItem) => ({
        id: item.id,
        productNameSnapshot: item.productNameSnapshot,
        imageUrlSnapshot: item.imageUrlSnapshot,
        quantity: item.quantity,
        currency: item.currency,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        selectedMaterial: item.selectedMaterial,
        unitPriceSnapshot: item.unitPriceSnapshot,
        pricesSnapshot: item.pricesSnapshot,
        customMeasurements: item.customMeasurements,
      }))
    : guestItems.map((item) => ({
        id: item.localId,
        productNameSnapshot: item.productNameSnapshot ?? null,
        imageUrlSnapshot: item.imageUrlSnapshot ?? null,
        quantity: item.quantity,
        selectedSize: item.selectedSize ?? null,
        currency: item.currency ?? "",
        selectedColor: item.selectedColor ?? null,
        selectedMaterial: item.selectedMaterial ?? null,
        unitPriceSnapshot: item.unitPriceSnapshot,
        pricesSnapshot: item.pricesSnapshot,
        customMeasurements: item.customMeasurements,
      }));

  const totalItemCount = displayItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const isLoading = !authChecked || (authenticated && cartLoading);

  // const handleCheckout = async () => {
  //   isAuthenticated()
  //     ? (window.location.href = "/checkout")
  //     : setOpenCheckoutModal(true);
  // };

  const handleCheckout = async () => {
    if (isAuthenticated()) {
      window.location.href = "/checkout";
    } else {
      setOpen(false);
      setOpenCheckoutModal(true);
    }
  };

  const handleIncrease = (item: DisplayItem) => {
    if (authenticated) {
      patchQuantity({ id: item.id, quantity: item.quantity + 1 });
    } else {
      setGuestItems(updateGuestCartItemQuantity(item.id, item.quantity + 1));
    }
  };

  const handleDecrease = (item: DisplayItem) => {
    if (item.quantity <= 1) return;

    if (authenticated) {
      patchQuantity({ id: item.id, quantity: item.quantity - 1 });
    } else {
      setGuestItems(updateGuestCartItemQuantity(item.id, item.quantity - 1));
    }
  };

  const handleRemove = (item: DisplayItem) => {
    if (authenticated) {
      deleteItem(item.id);
    } else {
      setGuestItems(removeGuestCartItem(item.id));
      toast.success("Item removed");
    }
  };

  /*
   * Open from anywhere on the page by dispatching:
   *
   * window.dispatchEvent(new Event("open-cart-sidebar"));
   */
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-cart-sidebar", handleOpen);
    return () => window.removeEventListener("open-cart-sidebar", handleOpen);
  }, []);

  return (
    <>
      {/* Cart trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-off-white"
      >
        <ShoppingCart size={19} color={active ? "black" : "white"} />
        {totalItemCount > 0 && (
          <Badge className="absolute -right-0.5 -top-0.5 h-5 min-w-5 justify-center rounded-full bg-black px-1 text-[9px] font-bold text-white">
            {totalItemCount}
          </Badge>
        )}
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex lg:w-full w-[90%]! lg:max-w-[430px] flex-col bg-[#F8F6F2] p-0 z-[1001]">
          <SheetHeader className="border-b border-border bg-white px-6 py-5">
            <SheetTitle className="font-display text-xl font-bold text-near-black">
              Your Bag
            </SheetTitle>
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#999]">
              {totalItemCount} {totalItemCount === 1 ? "item" : "items"}
            </p>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {isLoading ? (
              <CartSidebarSkeleton />
            ) : displayItems.length === 0 ? (
              <ErrorState
                title=""
                text="Oops! Your bag is empty."
                image="/empty-cart.png"
              />
            ) : (
              <div className="space-y-4">
                {displayItems.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="overflow-hidden rounded-xl border border-border bg-white"
                  >
                    <div className="flex gap-4 p-4">
                      {/* Image */}
                      <div className="h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-off-white">
                        {item.imageUrlSnapshot && (
                          <img
                            src={item.imageUrlSnapshot}
                            alt={item.productNameSnapshot ?? "Product"}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <h3 className="line-clamp-2 font-display text-sm font-bold text-near-black">
                            {item.productNameSnapshot ?? "Custom item"}
                          </h3>

                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {item.selectedSize && (
                              <Badge
                                variant="secondary"
                                className="bg-off-white text-[9px] text-[#666]"
                              >
                                {item.selectedSize}
                              </Badge>
                            )}

                            {item.selectedMaterial && (
                              <Badge
                                variant="secondary"
                                className="bg-off-white text-[9px] text-[#666]"
                              >
                                {item.selectedMaterial}
                              </Badge>
                            )}

                            {item.selectedColor && (
                              <Badge
                                variant="secondary"
                                className="flex items-center gap-1 bg-off-white text-[9px] text-[#666]"
                              >
                                <span
                                  className="h-1.5 w-1.5 rounded-full border border-black/10"
                                  style={{
                                    backgroundColor: item.selectedColor,
                                  }}
                                />
                                {item.selectedColor}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          {/* Quantity */}
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              disabled={item.quantity <= 1}
                              onClick={() => handleDecrease(item)}
                              className="h-7 w-7 border-black"
                            >
                              <Minus size={12} color="black" />
                            </Button>

                            <span className="min-w-4 text-center text-xs font-bold text-black">
                              {item.quantity}
                            </span>

                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => handleIncrease(item)}
                              className="h-7 w-7 border-black"
                            >
                              <Plus size={12} color="black" />
                            </Button>
                          </div>

                          <p className="font-display text-sm font-bold text-near-black">
                            {item.pricesSnapshot
                              ?.find(
                                (price) =>
                                  price.currency === cart?.selectedCurrency
                              )
                              ?.amount?.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Delete */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(item)}
                        disabled={isRemoving}
                        className="h-7 w-7 flex-shrink-0 self-start text-red-500 hover:bg-red-50"
                      >
                        {isRemoving ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <Trash2 size={13} />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {!isLoading && displayItems.length > 0 && (
            <SheetFooter className="flex-col gap-4 border-t border-border bg-white p-5">
              {cart?.selectedCurrency && (
                <>
                  <div className="flex w-full items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#999]">
                      Total ({cart.selectedCurrency})
                    </span>

                    <span className="font-display text-xl font-bold text-near-black">
                      {cart.selectedCurrency}{" "}
                      {cart.items
                        .reduce((total, item) => {
                          const selectedPrice = item.pricesSnapshot?.find(
                            (price) => price.currency === cart.selectedCurrency
                          );

                          return (
                            total +
                            (selectedPrice?.amount ?? item.unitPriceSnapshot) *
                              item.quantity
                          );
                        }, 0)
                        .toLocaleString()}
                    </span>
                  </div>

                  <Separator />
                </>
              )}

              <div className="flex w-full gap-3">
                <AnimatedSubmitButton
                  text={"View Bag"}
                  onClick={() => {
                    setOpen(false);
                    router.push("/cart");
                  }}
                />

                <div className="w-fit">
                  <AnimatedSubmitButton
                    onClick={handleCheckout}
                    text={"Checkout"}
                  />
                </div>

             
              </div>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
      <CheckoutButton
                  open={openCheckoutModal}
                  onOpenChange={setOpenCheckoutModal}
                />
    </>
  );
};

export default CartSidebar;
