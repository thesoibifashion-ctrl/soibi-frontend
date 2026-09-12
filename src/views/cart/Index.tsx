"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleMinus, CirclePlus, Trash2, Loader2 } from "lucide-react";
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
import Container from "@/components/shared/Container";
import Link from "next/link";
import { useCurrency } from "@/providers/currency-provider";
import ErrorState from "@/components/shared/Error";
import Loading from "./Loading";

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
  pricesSnapshot?: {
    name: string;
    amount: number;
    symbol: string;
    currency: string;
    currencyId: string;
  }[];
  customMeasurements?: Record<string, string | number> | null;
};

const CartPage = () => {
  const queryClient = useQueryClient();
  const { selectedCurrency } = useCurrency();

  // Hydration-safe auth check: start false (matches server render),
  // only flip to the real value after mount, inside an effect.
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setAuthChecked(true);
  }, []);

  const [guestItems, setGuestItems] = useState<GuestCartItem[]>([]);

  // Track which item ids currently have a quantity change or removal in
  // flight, so only that specific row shows a loader.
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

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
    onSettled: () => setUpdatingItemId(null),
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: (id: string) => removeCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed");
    },
    onError: () => toast.error("Couldn't remove item"),
    onSettled: () => setRemovingItemId(null),
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

  const activeCurrency = authenticated
    ? cart?.selectedCurrency ?? selectedCurrency
    : selectedCurrency;

  const total = displayItems.reduce((sum, item) => {
    const selectedPrice = item.pricesSnapshot?.find(
      (price) => price.currency === activeCurrency
    );

    return (
      sum +
      (selectedPrice?.amount ?? item.unitPriceSnapshot) * item.quantity
    );
  }, 0);

  const currencySymbol =
    displayItems
      .flatMap((item) => item.pricesSnapshot ?? [])
      .find((price) => price.currency === activeCurrency)?.symbol ?? "";

  const totalItemCount = displayItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleIncrease = (item: DisplayItem) => {
    if (authenticated) {
      setUpdatingItemId(item.id);
      patchQuantity({ id: item.id, quantity: item.quantity + 1 });
    } else {
      setGuestItems(updateGuestCartItemQuantity(item.id, item.quantity + 1));
    }
  };

  const handleDecrease = (item: DisplayItem) => {
    if (item.quantity <= 1) return;

    if (authenticated) {
      setUpdatingItemId(item.id);
      patchQuantity({ id: item.id, quantity: item.quantity - 1 });
    } else {
      setGuestItems(updateGuestCartItemQuantity(item.id, item.quantity - 1));
    }
  };

  const handleRemove = (item: DisplayItem) => {
    if (authenticated) {
      setRemovingItemId(item.id);
      deleteItem(item.id);
    } else {
      setGuestItems(removeGuestCartItem(item.id));
      toast.success("Item removed");
    }
  };

  if (!authChecked) {
    return <Loading />;
  }

  if (authenticated && cartLoading) {
    return <Loading />;
  }
  if (displayItems.length === 0) {
    return (
      <ErrorState
        title="Cart"
        text="Oops! Your bag is empty."
        image="/empty-cart.png"
        route="/shop"
      />
    );
  }

  return (
    <Container className="bg-[#EEEEEE] min-h-screen pt-30 gap-8 lg:gap-20 lg:flex-row flex flex-col-reverse lg:justify-between w-full">
      {/* LEFT — item cards */}
      
      <div className=" lg:w-[45%] space-y-5">
        <h1 className="text-[50px] hidden lg:flex">Cart</h1>

        {displayItems.map((item, idx) => {
          const isUpdating = updatingItemId === item.id;
          const isRemoving = removingItemId === item.id;

          return (
            <div
              key={idx}
              className={`bg-white h-35 rounded-[20px] flex transition-opacity ${
                isRemoving ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {item.imageUrlSnapshot && (
                <img
                  src={item.imageUrlSnapshot}
                  alt={item.productNameSnapshot ?? "Product"}
                  className="h-full w-35  rounded-l-[20px]  object-cover"
                />
              )}

              <div className="py-3.75 flex flex-col justify-between  w-full px-10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-[20px]">
                      {item.productNameSnapshot ?? "Custom item"}
                    </p>
                  </div>

                  <div className="flex text-sm">
                    <p>
                      {item.pricesSnapshot?.find(
                        (price) => price.currency === activeCurrency
                      )?.symbol}
                    </p>
                    <span>
                      {(
                        (item.pricesSnapshot?.find(
                          (price) => price.currency === activeCurrency
                        )?.amount ?? item.unitPriceSnapshot) * item.quantity
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="w-full flex justify-between items-center">
                  <div className="flex w-fit items-center gap-3">
                    {isUpdating ? (
                      <Loader2 size={16} className="animate-spin text-gray-500" />
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleDecrease(item)}
                          disabled={item.quantity <= 1}
                          className="disabled:opacity-30"
                        >
                          <CircleMinus size={18} />
                        </button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => handleIncrease(item)}>
                          <CirclePlus size={18} />
                        </button>
                      </>
                    )}
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => handleRemove(item)}
                      disabled={isRemoving}
                      className="flex items-center gap-1 cursor-pointer border border-black rounded-[15px] px-2 py-1 disabled:opacity-50"
                    >
                      {isRemoving ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}

                      <span className="text-sm">
                        {isRemoving ? "Removing..." : "Delete"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>


    <div className="w-full lg:w-[45%]">
        <h1 className="text-[50px]  lg:hidden">Cart</h1>

      <div className="bg-[#000000] h-fit p-8 rounded-lg w-full">

        <div className="rounded-2xl  ">
          <h2 className="mb-4 font-semibold text-white">Order Summary</h2>

          <div className="flex items-center justify-between text-sm text-white">
            <span>Number of Products</span>
            <span>{totalItemCount}</span>
          </div>

          <div className="mt-2 space-y-3 border-t pt-3">
            <div className="flex items-center justify-between text-xs text-white font-semibold">
              <span>Total ({activeCurrency})</span>
              <span>
                {currencySymbol}
                {total.toLocaleString()}
              </span>
            </div>
          </div>

          <p className="mt-4 rounded-lg bg-yellow-50 p-3 text-xs leading-5 text-yellow-800">
            Delivery is not available for online booking yet. Our team will
            reach out to you directly to arrange delivery once your order is
            confirmed.
          </p>
        </div>
        <div className="  cursor-pointer mt-5 flex justify-center items-center">
          <span className="w-fit bg-white rounded-[50px] px-8   text-sm py-2">
            <Link href="/checkout">Proceed to checkout</Link>
          </span>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default CartPage;