"use client";

import { useCurrencies } from "@/api/features/products";
import { useCurrency } from "@/providers/currency-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const CurrencyPicker = () => {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const { data: currencies = [], isLoading } = useCurrencies();

  if (isLoading || !currencies.length) return null;

  const selected = currencies.find(
    (currency) => currency.code === selectedCurrency
  );

  return (
    <div className="fixed bottom-5 left-18 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium shadow-md outline-none">
          {selected?.name && (
            <img
              src={selected.name}
              alt={`${selected.code} flag`}
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover"
            />
          )}

          <span>{selected?.code || "Currency"}</span>

          <ChevronDown size={15} strokeWidth={1.5} />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="top"
          align="start"
          className="min-w-40 rounded-xl p-1"
        >
          {currencies.map((currency) => (
            <DropdownMenuItem
              key={currency.id}
              onClick={() => setSelectedCurrency(currency.code || "")}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm"
            >
              {currency.name && (
                <img
                  src={currency.name}
                  alt={`${currency.code} flag`}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}

              <span className="font-medium">{currency.code}</span>

              {currency.name && currency.name === selected?.name && (
                <span className="ml-auto text-xs text-gray-400">Selected</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CurrencyPicker;