"use client";

import { useEffect, useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { addFavorite, getFavorites, removeFavorite } from "@/api/features/cart";
import { isAuthenticated } from "@/lib/auth-finder";

interface FavoriteButtonProps {
  productId: string;
  className?: string;
}

const FavoriteButton = ({ productId, className = "" }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const checkFavorite = async () => {
      if (!isAuthenticated()) return;

      try {
        const favorites = await getFavorites();

        setIsFavorite(
          favorites.some((product) => product.product.id === productId)
        );
      } catch (error) {
        console.error("Failed to load favorites:", error);
      }
    };

    checkFavorite();
  }, [productId]);

  const handleFavorite = async () => {
    if (!isAuthenticated()) {
      toast.error("Please log in to add favorites");
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorite) {
        await removeFavorite(productId);
        setIsFavorite(false);

        await queryClient.invalidateQueries({
          queryKey: ["favorites"],
        });

        toast.success("Removed from favorites");
      } else {
        await addFavorite(productId);
        setIsFavorite(true);

        await queryClient.invalidateQueries({
          queryKey: ["favorites"],
        });

        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Favorite action failed:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleFavorite}
      disabled={isLoading}
      className={`flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:bg-gray-100 disabled:opacity-50 ${className}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isLoading ? (
        <Loader2 className="animate-spin text-black" />
      ) : (
        <Heart
          className={`h-4 w-4 transition-all ${
            isFavorite ? "text-[red] fill-[red] " : "text-black"
          }`}
        />
      )}
    </button>
  );
};

export default FavoriteButton;