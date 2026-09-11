import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { addCartItem } from "@/api/features/cart";
import { toast } from "sonner";
import { isAuthenticated } from "@/lib/auth-finder";
import DynamicPrice from "@/components/shared/Prices";
import { useCurrency } from "@/providers/currency-provider";
import { getSelectedPrice } from "@/lib/get-price";
import LoadingAnimation from "@/components/shared/GifLoader";
import { useProductBySlug } from "@/api/features/products";
import AnimatedSubmitButton from "@/components/shared/SubmitButton";
import { GUEST_CART_KEY } from "@/hooks/use-guest-cart";
import { useQueryClient } from "@tanstack/react-query";
interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(
    null
  );

  const parser = new DOMParser();
  const doc = parser.parseFromString(description || "", "text/html");

  const nodes = Array.from(doc.body.childNodes);

  const renderNode = (node: ChildNode, index: number): React.ReactNode => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";

      /*
       * Looks for:
       *
       * {{product:product-slug}}
       */

      const parts = text.split(/(\{\{product:[^}]+\}\})/g);

      return (
        <span key={index}>
          {parts.map((part, partIndex) => {
            const match = part.match(/^\{\{product:([^}]+)\}\}$/);

            if (match) {
              const productSlug = match[1];

              return (
                <button
                  key={partIndex}
                  type="button"
                  onClick={() => setSelectedProductSlug(productSlug)}
                  className="mx-1 italic inline text-[blue] cursor-pointer text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-50"
                >
                  View product
                </button>
              );
            }

            return <span key={partIndex}>{part}</span>;
          })}
        </span>
      );
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const element = node as HTMLElement;

    if (element.tagName === "BR") {
      return <br key={index} />;
    }

    return (
      <span key={index}>
        {Array.from(element.childNodes).map((child, childIndex) =>
          renderNode(child, childIndex)
        )}
      </span>
    );
  };

  return (
    <>
      <div className="mt-5 text-[16px] leading-[30px] text-black">
        {nodes.map(renderNode)}
      </div>

      {selectedProductSlug && (
        <ReferencedProduct
          slug={selectedProductSlug}
          onClose={() => setSelectedProductSlug(null)}
        />
      )}
    </>
  );
};

interface ReferencedProductProps {
  slug: string;
  onClose: () => void;
}

const ReferencedProduct = ({ slug, onClose }: ReferencedProductProps) => {
  const { data: product, isLoading, isError } = useProductBySlug(slug);

  const [isAdding, setIsAdding] = useState(false);

  const { selectedCurrency } = useCurrency();

  const selectedPrice = getSelectedPrice(product?.prices, selectedCurrency);
  const queryClient = useQueryClient();

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAdding(true);

    try {
      const cartItem = {
        productId: product.id,
        productNameSnapshot: product.name,
        imageUrlSnapshot: product.images?.[0]?.imageUrl ?? null,
        quantity: 1,
        selectedSize: null,
        selectedColor: null,
        selectedMaterial: product.materials?.[0]?.name ?? null,
        unitPriceSnapshot: selectedPrice?.amount ?? 0,
        currency: selectedPrice?.currency ?? "",
        pricesSnapshot: product.prices ?? [],
        customMeasurements: null,
      };

      if (isAuthenticated()) {
        await addCartItem(cartItem);
      } else {
        let guestItems: (typeof cartItem)[] = [];

        const storedCart = localStorage.getItem(GUEST_CART_KEY);

        try {
          const parsed = storedCart ? JSON.parse(storedCart) : [];

          guestItems = Array.isArray(parsed) ? parsed : [];
        } catch {
          guestItems = [];
        }

        const existingIndex = guestItems.findIndex(
          (item) => item.productId === cartItem.productId
        );

        if (existingIndex !== -1) {
          guestItems[existingIndex] = {
            ...guestItems[existingIndex],
            quantity: guestItems[existingIndex].quantity + 1,
          };
        } else {
          guestItems.push(cartItem);
        }

        localStorage.setItem(GUEST_CART_KEY, JSON.stringify(guestItems));

        window.dispatchEvent(new Event("guest-cart-updated"));
      }
      await queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("Added to cart");
      onClose();
    } catch (error) {
      console.error("Add to cart failed:", error);

      toast.error(
        error instanceof Error ? error.message : "Couldn't add item to cart"
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-2xl overflow-hidden rounded-2xl border-none p-0">
        {isLoading && (
          <div className="flex min-h-[400px] items-center justify-center">
            <LoadingAnimation />
          </div>
        )}

        {isError && (
          <div className="p-10 text-center">
            <p className="text-sm text-gray-500">
              Unable to load this product.
            </p>
          </div>
        )}

        {product && (
          <div className="relative h-[500px] w-full overflow-hidden">
            {/* Background Image */}
            {product.images?.[0]?.imageUrl && (
              <img
                src={product.images[0].imageUrl}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">
              <div>
                <p className="text-3xl font-semibold">{product.name}</p>

                <DynamicPrice
                  prices={product.prices}
                  className="mt-2 text-sm font-semibold text-white"
                />

                {product.shortDescription && (
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/80">
                    {product.shortDescription}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <AnimatedSubmitButton
                  onClick={handleAddToCart}
                  text={isAdding ? "Adding..." : "Add to cart"}
                />
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default ProductDescription;
