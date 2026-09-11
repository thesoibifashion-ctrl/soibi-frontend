"use client";

import { getSelectedPrice } from "@/lib/get-price";
import { useCurrency } from "@/providers/currency-provider";
import { ProductPriceResponse } from "@/types/Index";

interface PriceProps {
  prices?: ProductPriceResponse[];
  className?: string;
}

const DynamicPrice = ({ prices = [], className }: PriceProps) => {
  const { selectedCurrency } = useCurrency();

  const price = getSelectedPrice(prices, selectedCurrency);

  if (!price) return null;

  return (
    <span className={className}>
      {price.symbol}
      {price.amount.toLocaleString()}
    </span>
  );
};

export default DynamicPrice;