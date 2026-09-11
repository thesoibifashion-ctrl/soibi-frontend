import { Product } from "@/types/Index";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import DynamicPrice from "../Prices";
import FavoriteButton from "../Favorites";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const defaultImage =
    product.images?.find((img) => img.isPrimary) ?? product.images?.[0];
  const hasMultipleImages = (product.images?.length ?? 0) > 1;
  const hoverImage = hasMultipleImages
    ? product.images?.find((img) => img !== defaultImage)
    : undefined;

  return (
    <div className="group h-fit relative  rounded-lg">
      <div className="relative aspect-3/4 w-full rounded-lg overflow-hidden bg-muted">
        {defaultImage && (
          <img
            src={defaultImage.imageUrl}
            alt={defaultImage.altText ?? product.name}
            className={`absolute inset-0 h-full w-full object-cover rounded-lg transition-all duration-300 group-hover:scale-105 ${
              hoverImage ? "opacity-100 group-hover:opacity-0" : ""
            }`}
          />
        )}

        {hoverImage && (
          <img
            src={hoverImage.imageUrl}
            alt={hoverImage.altText ?? product.name}
            className="absolute inset-0 h-full w-full object-cover rounded-lg opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
          />
        )}
          <div className="absolute inset-0 flex md:hidden items-end justify-end right-3 ">
          <Button
              size="sm"
              className="mb-4 h-8 gap-1.5  rounded-full bg-white/90 px-4 text-xs font-medium text-black shadow-lg backdrop-blur-sm "
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
            >
              <Eye className="h-3.5 w-3.5" />
              Quick View
            </Button>
        </div>

        <div className="hidden md:flex items-center justify-between">
          <div className="absolute inset-0 flex items-end justify-center bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Button
              size="sm"
              className="mb-4 h-8 gap-1.5 rounded-full bg-white/90 px-4 text-xs font-medium text-black shadow-lg backdrop-blur-sm translate-y-2 transition-all duration-200 hover:bg-white group-hover:translate-y-0"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
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
          <h3 className="text-xs md:text-sm font-medium">{product.name}</h3>
          {product.id && <FavoriteButton productId={product.id} />}
        </div>
        <div className=" flex items-center gap-2">
          {/* {product.salePrice ? (
            <>
              <span className="text-sm font-semibold">{product[0.]}</span>
              <span className="text-xs text-muted-foreground line-through">${product.basePrice}</span>
            </>
          ) : (
            <span className="text-sm font-semibold">${product.basePrice}</span>
          )} */}
          {product.prices && (
            //   product.prices.map((price) => (
            //   <span key={price.currencyId} className="text-sm font-semibold">
            //     {price.symbol}{price.amount}
            //   </span>
            // ))
            <DynamicPrice
              prices={product.prices}
              className="text-xs md:text-sm font-semibold"
            />
          )}
        </div>
      </div>
    </div>
  );
}
