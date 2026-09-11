"use client";

import { useQuery } from "@tanstack/react-query";
import ProductFiltersSidebar from "./Filters";
import { useSearchParams } from "next/navigation";
import ProductErrorState from "./ErrorState";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2, SlidersHorizontal } from "lucide-react";
import { getProducts, useFilterProducts } from "@/api/features/products";
import { Product } from "@/types/Index";
import { ProductCard } from "@/components/shared/cards/ProductCard";
import { QuickViewModal } from "@/components/shared/cards/modals/ProductView";
import { useMemo, useState } from "react";
import { InstagramCarousel } from "@/components/shared/carousels/InstagramCarousel";
import LoadingAnimation from "@/components/shared/GifLoader";
import CurrencyPicker from "@/components/shared/CurrencyPicker";

const images: string[] = [
  "/home1.jpg",
  "/home2.jpg",
  "/home3.jpg",
  "/home4.jpg",
  "/home-5.jpg",
  "/home-6.jpg",
  "/home-7.jpg",
  "/home-8.jpg",
  "/home-9.jpg",
];

const DEFAULT_CATEGORY = "Clothes";

const Index = () => {
  const searchParams = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [selectedStyle, setSelectedStyle] = useState<string>("");

  // Build the query string for the filtered fetch. If no category is
  // selected yet, default to "Clothes" rather than sending an empty filter.
  const params = new URLSearchParams(searchParams.toString());
  if (!params.get("category")) {
    params.set("category", DEFAULT_CATEGORY);
  }
  const queryString = params.toString();

  const {
    data: filteredData,
    isLoading,
    error,
  } = useFilterProducts(`/api/products?${queryString}`);
  const { data: allProductsData, isLoading: allProductsLoading } =
    useFilterProducts("/api/products");

  const products: Product[] = filteredData ?? [];
  const allProducts: Product[] = allProductsData ?? [];

  // Unique, non-empty list of styles (still stored as `gender` on the
  // product) present in the currently category-filtered set, so the
  // style row only ever shows one button per style, never duplicates.
  const availableStyles = useMemo(() => {
    const seen = new Set<string>();

    products.forEach((item) => {
      if (item.gender) seen.add(item.gender);
    });

    return Array.from(seen);
  }, [products]);

  // Apply the style filter on top of the category-filtered products.
  const visibleProducts = useMemo(() => {
    if (!selectedStyle) return products;

    return products.filter((item) => item.gender === selectedStyle);
  }, [products, selectedStyle]);

  if (error) {
    return <ProductErrorState />;
  }
  if (allProductsLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="bg-[#EEEEEE]">
      <section className="grid grid-cols-1   gap-8 lg:grid-cols-[280px_1fr]">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <ProductFiltersSidebar
            products={allProducts}
            isLoading={isLoading}
            error={!!error}
          />
        </div>

        <div>
          <div className="mb-6 flex sticky top-20 z-10 lg:hidden">
            <Sheet>
              <SheetTrigger>
                <div className="flex items-center gap-2 border border-input mt-2 mx-4 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </div>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-[320px] border-none overflow-y-auto "
              >
                <SheetHeader></SheetHeader>

                <div className="mt-6">
                  <ProductFiltersSidebar
                    products={allProducts}
                    isLoading={isLoading}
                    error={!!error}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {!isLoading && availableStyles.length > 0 && (
            <div className="flex px-4 lg:px-0 flex-wrap gap-2  mt-8 mb-4">
              <button
                type="button"
                onClick={() => setSelectedStyle("")}
                className={`rounded-full border px-3.5 py-2 text-sm font-medium capitalize ${
                  selectedStyle === ""
                    ? "border-black bg-black text-white"
                    : "border-black"
                }`}
              >
                All
              </button>

              {availableStyles.map((styleValue) => (
                <button
                  key={styleValue}
                  type="button"
                  onClick={() =>
                    setSelectedStyle((current) =>
                      current === styleValue ? "" : styleValue
                    )
                  }
                  className={`rounded-full border px-3.5 py-2 text-sm font-medium capitalize ${
                    selectedStyle === styleValue
                      ? "border-black bg-black text-white"
                      : "border-black"
                  }`}
                >
                  {styleValue}
                </button>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="flex h-1/2 justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 p-4 lg:p-0  lg:grid-cols-4 max-w-full md:max-w-[90%]  gap-3 mt-8">
              {visibleProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}
          <QuickViewModal
            product={quickViewProduct}
            open={!!quickViewProduct}
            onOpenChange={(open) => !open && setQuickViewProduct(null)}
          />
        </div>
      </section>
      <InstagramCarousel images={images} />
      <CurrencyPicker/>
    </div>
  );
};

export default Index;