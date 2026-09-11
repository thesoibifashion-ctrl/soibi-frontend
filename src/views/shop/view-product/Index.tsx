
"use client";

import { useState } from "react";
import { useProductBySlug } from "@/api/features/products";
import Container from "@/components/shared/Container";
import AnimatedSubmitButton from "@/components/shared/SubmitButton";
import { Input } from "@/components/ui/input";
import MeasurementGuideModal from "@/components/shared/modals/MeasurementGuide";
import { addCartItem } from "@/api/features/cart";
import { toast } from "sonner";
import SizeGuideModal from "@/components/shared/cards/modals/SizeGuide";
import { ArrowLeft, InfoIcon, Minus, Plus } from "lucide-react";
import { isAuthenticated } from "@/lib/auth-finder";
import CheckoutButton from "@/components/shared/modals/CheckoutModal";
import DynamicPrice from "@/components/shared/Prices";
import { useCurrency } from "@/providers/currency-provider";
import { getSelectedPrice } from "@/lib/get-price";
import LoadingAnimation from "@/components/shared/GifLoader";
import ProductDescription from "./ProductImage";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import CurrencyPicker from "@/components/shared/CurrencyPicker";

interface ViewProductPageProps {
  slug: string;
}

const GUEST_CART_KEY = "guest-cart";

const ViewProductPage = ({ slug }: ViewProductPageProps) => {
  const {
    data: product,
    isLoading: productLoading,
    isError: productError,
  } = useProductBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [measurementGuideOpen, setMeasurementGuideOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number | string | null>(
    null
  );
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [measurementValues, setMeasurementValues] = useState<
    Record<string, string>
  >({});
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { selectedCurrency } = useCurrency();
  const selectedPrice = getSelectedPrice(product?.prices, selectedCurrency);

  const handleMeasurementChange = (title: string, value: string) => {
    setMeasurementValues((prev) => ({
      ...prev,
      [title]: value,
    }));

    if (selectionError) setSelectionError(null);
  };

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const hasMeasurementValue = Object.values(measurementValues).some(
    (value) => value.trim() !== ""
  );

 
  const validateSelection = (): boolean => {
    if (product?.category !== "Clothes") return true;

    if (!selectedSize && !hasMeasurementValue) {
      setSelectionError(
        "Please select a size or enter your measurements before continuing."
      );
      return false;
    }

    setSelectionError(null);
    return true;
  };


  const addCurrentSelectionToCart = async (): Promise<boolean> => {
    if (!product) return false;

    if (!validateSelection()) return false;

    setIsAdding(true);

    try {
      const imageUrl =
        product.images?.[selectedImage]?.imageUrl ??
        product.images?.[0]?.imageUrl ??
        null;

      const customMeasurements = hasMeasurementValue ? measurementValues : null;

      const cartItem = {
        productId: product.id,
        productNameSnapshot: product.name,
        imageUrlSnapshot: imageUrl,
        quantity,
        selectedSize,
        selectedColor: null,
        selectedMaterial: product.materials?.[0]?.name ?? null,
        unitPriceSnapshot: selectedPrice?.amount ?? 0,
        currency: selectedPrice?.currency ?? "",
        pricesSnapshot: product.prices ?? [],
        customMeasurements,
      };

      if (isAuthenticated()) {
        await addCartItem(cartItem);
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.success("Added to cart");
        return true;
      }

      let guestItems: (typeof cartItem)[] = [];

      const storedCart = localStorage.getItem(GUEST_CART_KEY);

      try {
        const parsed = storedCart ? JSON.parse(storedCart) : [];
        guestItems = Array.isArray(parsed) ? parsed : [];
      } catch {
        guestItems = [];
      }

      const existingIndex = guestItems.findIndex(
        (item) =>
          item.productId === cartItem.productId &&
          item.selectedSize === cartItem.selectedSize &&
          item.selectedColor === cartItem.selectedColor &&
          item.selectedMaterial === cartItem.selectedMaterial &&
          JSON.stringify(item.customMeasurements) ===
            JSON.stringify(cartItem.customMeasurements)
      );

      if (existingIndex !== -1) {
        guestItems[existingIndex] = {
          ...guestItems[existingIndex],
          quantity: guestItems[existingIndex].quantity + cartItem.quantity,
        };
      } else {
        guestItems.push(cartItem);
      }

      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(guestItems));
      window.dispatchEvent(new Event("guest-cart-updated"));

      toast.success("Added to cart");
      return true;
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error(
        error instanceof Error ? error.message : "Couldn't add item to cart"
      );
      return false;
    } finally {
      setIsAdding(false);
    }
  };

  const handleAddToCart = () => {
    addCurrentSelectionToCart();
  };

  const handleCheckout = async () => {
    // const added = await addCurrentSelectionToCart();
    // if (!added) return;

    isAuthenticated()
      ? (window.location.href = "/checkout")
      : setOpenCheckoutModal(true);
  };

  if (productLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoadingAnimation />
      </div>
    );
  }

  if (productError || !product) {
    return <div>Product not found</div>;
  }

  const images = product.images ?? [];
  const measurements = product.measurements ?? [];

  const showMeasurements = Object.values(measurementValues).some(
    (value) => value.trim() !== ""
  );

  return (
    <Container className="h-full lg:min-h-screen bg-[#EEEEEE] pt-28.75">
    <div className="lg:grid grid-cols-2 gap-13.25">
      <div className="lg:sticky lg:top-25 lg:flex lg:h-[80vh] gap-1">
        <div className="">
          <div>
            <Link
              href="/shop"
              className="flex font-medium text-sm items-center gap-1"
            >
              <ArrowLeft size={12} />
              Back to shop
            </Link>
          </div>
          <div className="lg:flex gap-1 mt-3">
            <div className="w-full lg:w-[80%]">
              {images.length > 0 && (
                <img
                  src={images[selectedImage]?.imageUrl}
                  alt={images[selectedImage]?.altText || product.name}
                  className="w-full h-auto lg:h-[85%] object-cover object-top"
                />
              )}
            </div>
  
            {images.length > 1 && (
              <div className="lg:w-[20%] flex gap-2 overflow-x-auto mt-3 lg:mt-0 lg:gap-0 flex-row lg:flex-col">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`lg:relative shrink-0 overflow-hidden ${
                      selectedImage === index
                        ? "ring-2 ring-transparent"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.altText || product.name}
                      className="lg:aspect-square w-[90px] lg:w-full h-[100px] lg:h-[133px] rounded-sm lg:rounded-lg object-cover transition-opacity"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
  
      <div className="h-full w-full">
        <div className="flex flex-col justify-between gap-6 lg:gap-12 mt-4 lg:p-10">
          <div>
            <p className="text-2xl lg:text-[95px] leading-tight lg:leading-[120px] text-black">
              {product.name}
            </p>
  
            <DynamicPrice
              prices={product.prices}
              className="text-sm font-semibold"
            />
  
            {product.description && (
              <ProductDescription description={product.description} />
            )}
          </div>
  
          {product.category === "Clothes" && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-black">Size</p>
  
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="cursor-pointer text-sm underline underline-offset-4"
                >
                  Size Guide
                </button>
              </div>
  
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {[8, 10, 12, 14, 16, 18, 20, 22].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      if (selectionError) setSelectionError(null);
                    }}
                    className={`flex w-fit items-center justify-center rounded-[5px] border px-1.5 py-1.5 text-[12px] transition-colors ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-black bg-transparent text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    UK {size}
                  </button>
                ))}
              </div>
            </div>
          )}
  
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex w-fit items-center gap-4 rounded-[5px] border border-black lg:px-2">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="flex h-6 w-6 items-center justify-center disabled:opacity-30"
              >
                <Minus size={16} />
              </button>
  
              <span className="w-6 text-center text-sm">{quantity}</span>
  
              <button
                type="button"
                onClick={increaseQuantity}
                className="flex h-6 w-6 items-center justify-center"
              >
                <Plus size={16} />
              </button>
            </div>
  
            {measurements.length > 0 && (
              <button
                type="button"
                onClick={() => setMeasurementGuideOpen(true)}
                className="flex cursor-pointer items-center gap-1 text-left text-sm underline underline-offset-4"
              >
                Show measurement guide
                <InfoIcon size={20} className="animate-bounce" />
              </button>
            )}
          </div>
  
          {measurements.length > 0 && showMeasurements && (
            <div className="space-y-4">
              <p className="text-lg font-semibold text-black">Measurements</p>
  
              <div className="grid grid-cols-2 gap-3">
                {measurements.map((m) => (
                  <div key={m.title}>
                    <label className="mb-1 block text-sm text-gray-600">
                      {m.title}
                    </label>
  
                    <Input
                      value={measurementValues[m.title || "bust"] ?? ""}
                      onChange={(e) =>
                        handleMeasurementChange(
                          m.title || "bust",
                          e.target.value
                        )
                      }
                      placeholder={`Enter your ${m.title}`}
                      className="h-12 rounded-xl border-[#E5E7EB] bg-[#F9FAFB] px-4"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
  
          {selectionError && (
            <p className="text-sm text-red-600">{selectionError}</p>
          )}
  
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="w-full sm:w-fit">
              <AnimatedSubmitButton
                onClick={handleAddToCart}
                text={isAdding ? "Adding..." : "Add to cart"}
              />
            </div>
            <div className="w-full sm:w-fit">
              <AnimatedSubmitButton onClick={handleCheckout} text={"Checkout"} />
            </div>
            <div>
              <CheckoutButton
                open={openCheckoutModal}
                onOpenChange={setOpenCheckoutModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div className="flex">
      <MeasurementGuideModal
        open={measurementGuideOpen}
        onOpenChange={setMeasurementGuideOpen}
        measurements={measurements}
        measurementValues={measurementValues}
        handleMeasurementChange={handleMeasurementChange}
      />
  
      <SizeGuideModal
        open={sizeGuideOpen}
        onOpenChange={setSizeGuideOpen}
        selectedSize={selectedSize}
        onSizeSelect={setSelectedSize}
      />
    </div>
    <CurrencyPicker />
  </Container>
  );
};

export default ViewProductPage;
