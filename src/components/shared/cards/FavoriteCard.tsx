import { Favorite, Product } from "@/types/Index";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import DynamicPrice from "../Prices";
import FavoriteButton from "../Favorites";

interface ProductCardProps {
  product: Favorite;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const prod = product.product;
  const defaultImage =
    prod.images?.find((img) => img.isPrimary) ?? prod.images?.[0];
  const hasMultipleImages = (prod.images?.length ?? 0) > 1;
  const hoverImage = hasMultipleImages
    ? prod.images?.find((img) => img !== defaultImage)
    : undefined;
  // const price = prod.prices?.map((item) => item.amount)

  return (
    <div className="group h-fit relative  rounded-lg">
      <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-muted">
        {defaultImage && (
          <img
            src={defaultImage.imageUrl}
            alt={defaultImage.altText ?? prod.name}
            className={`absolute inset-0 h-full w-full object-cover rounded-lg transition-all duration-300 group-hover:scale-105 ${
              hoverImage ? "opacity-100 group-hover:opacity-0" : ""
            }`}
          />
        )}

        {hoverImage && (
          <img
            src={hoverImage.imageUrl}
            alt={hoverImage.altText ?? prod.name}
            className="absolute inset-0 h-full w-full object-cover rounded-lg opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        <div className="flex items-center justify-between">
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Button
              size="sm"
              className="mb-4 h-8 gap-1.5 rounded-full bg-white/90 px-4 text-xs font-medium text-black shadow-lg backdrop-blur-sm translate-y-2 transition-all duration-200 hover:bg-white group-hover:translate-y-0"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(prod);
              }}
            >
              <Eye className="h-3.5 w-3.5" />
              Quick View
            </Button>
          </div>
        </div>
      </div>

      <div className="p-3 mt0">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">{prod.name}</h3>
          {product.id && <FavoriteButton productId={product.id} />}
        </div>
        <div className=" flex items-center gap-2">
          {prod.prices && (
            <DynamicPrice
              prices={prod.prices}
              className="text-sm font-semibold"
            />
          )}
        </div>
      </div>
    </div>
  );
}
