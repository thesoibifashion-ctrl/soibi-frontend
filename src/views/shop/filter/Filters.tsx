"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Index";

interface products {
  products: Product[];
  error: boolean;
  isLoading: boolean;
}

const ProductFiltersSidebar = ({ products }: products) => {
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

  const isActive = (key: string, value: string) => {
    return searchParams.get(key) === value;
  };

  const clearFilters = () => {
    router.push("/shop");
  };

  return (
    <aside className="w-full  rounded-xl lg:border h-fit  bg-white px-5 lg:p-5 lg:sticky lg:top-30 lg:w-72">
      <div className="h-[90vh] overflow-scroll space-y-6  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            className="inline-block rounded-lg bg-near-black px-2.5 py-0.75 text-[9px] font-bold uppercase tracking-[0.12em]  text-gold"
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
      {
        categories &&   <section>
        <h3 className="mb-3 font-medium">Category</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 text-sm"
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
      }
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
        {/* Price */}
        <section>
          <h3 className="mb-3 font-medium">Price Range</h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Min"
              defaultValue={searchParams.get("minPrice") ?? ""}
              onBlur={(e) => updateRange("minPrice", e.target.value)}
              className="border border-[gray] rounded-lg px-1.5"
            />
            <input
              placeholder="Max"
              defaultValue={searchParams.get("maxPrice") ?? ""}
              onBlur={(e) => updateRange("maxPrice", e.target.value)}
              className="border border-[gray] focus:border-[gray] rounded-lg px-1.5"
            />
          </div>
        </section>
        <Separator />
      </div>
    </aside>
  );
};
export default ProductFiltersSidebar;