"use client";

import { useMemo, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { useFilterProducts } from "@/api/features/products";
import { Product } from "@/types/Index";
import { ProductCard } from "@/components/shared/cards/ProductCard";
import { QuickViewModal } from "@/components/shared/cards/modals/ProductView";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface searchModal {
    active: boolean
}

const ProductSearchModal = ({active}: searchModal) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const { data, isLoading, error } = useFilterProducts("/api/products");

  const products: Product[] = data ?? [];

  const filteredProducts = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return products;

    return products.filter((product) =>
      product.name?.toLowerCase().includes(value)
    );
  }, [products, search]);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            setSearch("");
          }
        }}
      >
        <DialogTrigger className="flex items-center justify-center">
          <Search className={`h-5 w-5 ${active ? "text-[black]" : "text-white"}`}  />
        </DialogTrigger>

        <DialogContent className="z-[1000] flex h-[98vh] w-[98vw] max-w-[98vw]! flex-col gap-0 overflow-hidden border border-white/30 bg-white/50 p-0 backdrop-blur-3xl">          {/* Search */}
          <div className="flex shrink-0 items-center gap-4 px-5 py-4">
            <div className="flex flex-1 items-center gap-3 border-b border-black/30">
              <Search className="h-5 w-5 shrink-0 text-black/60" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                autoFocus
                className="h-12 w-full bg-transparent text-base outline-none placeholder:text-black/40"
              />
            </div>
          </div>

          {/* Products */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 md:p-7">
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : error ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-black/60">
                  Unable to load products.
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-black/60">
                  No products found
                  {search ? ` for "${search}"` : ""}.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(product) => {
                      setOpen(false);
                      setQuickViewProduct(product);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <QuickViewModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onOpenChange={(value) => {
          if (!value) {
            setQuickViewProduct(null);
          }
        }}
      />
    </>
  );
};

export default ProductSearchModal;