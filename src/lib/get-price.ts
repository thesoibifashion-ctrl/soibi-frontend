import { ProductPriceResponse } from "@/types/Index";

export const getSelectedPrice = (
  prices: ProductPriceResponse[] = [],
  currency: string
): ProductPriceResponse | null => {
  return (
    prices.find((price) => price.currency === currency) ??
    prices[0] ??
    null
  );
};