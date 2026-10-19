"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Index";
import { useCurrency } from "@/providers/currency-provider";
import { getSelectedPrice } from "@/lib/get-price";

interface products {
  products: Product[];
  error: boolean;
  isLoading: boolean;
  onSelect?: () => void;
}

const ProductFiltersSidebar = ({ products, onSelect }: products) => {
  const allSizes = products.flatMap(
    (product) => product.sizes?.map((size) => size.toString()) ?? []
  );

  const sizes = [...new Set(allSizes)];

  const allCategories = products.map((item) => item.category);
  const categories = [...new Set(allCategories)];

  const genders = [...new Set(products.map((product) => product.gender))]
    .filter(Boolean)
    .map((gender) => ({
      label: gender,
      value: gender,
    }));

  const allColors = products.flatMap(
    (product) => product.colors?.map((item) => item.hexCode) ?? []
  );

  // const colors = [...new Set(allColors)];

  const allMaterials = products.flatMap(
    (product) =>
      product.materials?.map((item) => ({
        name: item.name,
        slug: item.slug,
      })) ?? []
  );

  const materialsMap = new Map(allMaterials.map((item) => [item.name, item]));

  const collections = Array.from(
    new Map(
      products.flatMap(
        (item) =>
          item.collections?.map((c) => [
            c.name,
            {
              name: c.name,
              slug: c.slug,
            },
          ]) || []
      )
    ).values()
  );

  const material = Array.from(materialsMap.values());
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedCurrency } = useCurrency();

  const availablePrices = products
    .map((product) =>
      getSelectedPrice(product.prices ?? [], selectedCurrency)
    )
    .filter((price) => price && typeof price.amount === "number")
    .map((price) => price!.amount);

  const minAvailable = availablePrices.length
    ? Math.min(...availablePrices)
    : 0;

  const maxAvailable = availablePrices.length
    ? Math.max(...availablePrices)
    : 0;

  const currencySymbol =
    products
      .map((product) =>
        getSelectedPrice(product.prices ?? [], selectedCurrency)
      )
      .find(Boolean)?.symbol ?? selectedCurrency;

  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") ?? ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") ?? ""
  );

  useEffect(() => {
    setMinPrice("");
    setMaxPrice("");
  }, [selectedCurrency]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(key);

    if (!value || current === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Collection and Category are mutually exclusive — selecting one
    // clears the other so they never both appear active at once.
    if (key === "category") {
      params.delete("collection");
    } else if (key === "collection") {
      params.delete("category");
    }

    router.replace(`/shop?${params.toString()}`, {
      scroll: false,
    });

    // lets the parent (e.g. the mobile filter sheet) react to a selection
    onSelect?.();
  };

  const updateRange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`/shop?${params.toString()}`, {
      scroll: false,
    });
  };

  const applyPriceRange = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (minPrice && Number(minPrice) > minAvailable) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice && Number(maxPrice) < maxAvailable) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    router.replace(`/shop?${params.toString()}`, {
      scroll: false,
    });

    onSelect?.();
  };

  const isActive = (key: string, value: string) => {
    return searchParams.get(key) === value;
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    router.push("/shop");
    onSelect?.();
  };

  return (
    <aside className="w-full rounded-xl lg:border h-fit bg-white px-5 lg:p-5 lg:sticky lg:top-30 lg:w-72">
      <div className="h-[90vh] overflow-scroll space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            className="inline-block rounded-lg bg-near-black px-2.5 py-0.75 text-[9px] font-bold uppercase tracking-[0.12em] text-gold"
            variant="ghost"
            size="sm"
            onClick={clearFilters}
          >
            Clear
          </Button>
        </div>

        <Separator />

        <section>
          <h3 className="mb-3 font-medium">Collections</h3>
          <div className="space-y-3">
            {collections.map((collection) => (
              <label
                key={collection.slug}
                className="flex cursor-pointer items-center gap-3 text-sm"
              >
                <Checkbox
                  checked={isActive("collection", collection.slug)}
                  onCheckedChange={(checked) =>
                    updateFilter("collection", checked ? collection.slug : "")
                  }
                />
                {collection.name}
              </label>
            ))}
          </div>
        </section>

        <Separator />

        {categories && (
          <section>
            <h3 className="mb-3 font-medium">Category</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex cursor-pointer items-center gap-3 text-xs"
                >
                  <Checkbox
                    checked={isActive("category", category)}
                    onCheckedChange={(checked) =>
                      updateFilter("category", checked ? category : "")
                    }
                  />
                  {category}
                </label>
              ))}
            </div>
          </section>
        )}

        {/* <Separator /> */}

        <Separator />

        {/* Sizes */}
        {/* <section>
          <h3 className="mb-3 font-medium">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size, idx) => (
              <button
                key={idx}
                onClick={() => updateFilter("size", size)}
                className={`rounded-md border px-3 py-1 text-sm ${
                  isActive("size", size)
                    ? "border-black bg-black text-white"
                    : ""
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </section>
        <Separator /> */}

        {/* <section>
          <h3 className="mb-3 font-medium">Materials</h3>
          <div className="space-y-3">
            {material.map((material, idx) => (
              <label
                key={idx}
                className="flex cursor-pointer items-center gap-3 text-sm"
              >
                <Checkbox
                  checked={isActive("material", material.slug)}
                  onCheckedChange={(checked) =>
                    updateFilter("material", checked ? material.slug : "")
                  }
                />
                {material.name}
              </label>
            ))}
          </div>
        </section> */}

        {/* <Separator /> */}

        <section>
          <h3 className="mb-3 font-medium">Price Range</h3>

          {availablePrices.length > 0 ? (
            <>
              <p className="mb-3 text-xs text-gray-500">
                Available prices: {currencySymbol}
                {minAvailable.toLocaleString()} – {currencySymbol}
                {maxAvailable.toLocaleString()}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min={minAvailable}
                  max={maxAvailable}
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm"
                />

                <input
                  type="number"
                  min={minAvailable}
                  max={maxAvailable}
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm"
                />
              </div>

              <Button
                onClick={applyPriceRange}
                className="mt-3 w-full bg-near-black text-gold hover:bg-near-black/90"
              >
                Apply Price
              </Button>
            </>
          ) : (
            <p className="text-xs text-gray-500">
              No prices available in {selectedCurrency}.
            </p>
          )}
        </section>

        <Separator />
      </div>
    </aside>
  );
};

export default ProductFiltersSidebar;