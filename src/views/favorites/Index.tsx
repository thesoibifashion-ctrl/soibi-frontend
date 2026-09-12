"use client";

import {  useState } from "react";
import {  useFavorites } from "@/api/features/cart";
// import { isAuthenticated } from "@/lib/auth-finder";
import { Product } from "@/types/Index";
import { ProductCard } from "@/components/shared/cards/ProductCard";
import { QuickViewModal } from "@/components/shared/cards/modals/ProductView";
// import { getLocalFavorites } from "@/api/features/favorites";
// import { useQuery } from "@tanstack/react-query";
import ErrorState from "@/components/shared/Error";
import LoadingState from "./Loading";

const FavoritesGrid = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const {
    data: favorites,
    isLoading: favoritesLoading,
    // isError: favoritesError,
  } = useFavorites();
  console.log(
    favorites?.map((item) => item.id),
    "fav"
  );

  if (favoritesLoading) return <LoadingState/>
  if (favorites && favorites.length === 0) {
    return (
      <ErrorState
        title="Favourites"
        text="Opps! You don’t have any favourites here at the moment."
        image="/empty-favorites.jpg"
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 mt-32 max-w-[90%] mx-auto gap-3 mt-8">
        {favorites?.map((item) => {
          return (
            <ProductCard
              key={item.id}
              product={item?.product}
              onQuickView={setQuickViewProduct}
            />
          );
        })}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onOpenChange={(open) => !open && setQuickViewProduct(null)}
      />
    </>
  );
};

export default FavoritesGrid;
