export interface PricedItem {
    currency: string;
    unitPriceSnapshot: number;
    quantity: number;
  }
  
  export interface CurrencyTotal {
    currency: string;
    total: number;
  }
  
  /**
   * Groups any array of priced items by currency and sums (unitPrice * quantity)
   * per currency. Works for cart items, order items, or any object shape that
   * has at least { currency, unitPriceSnapshot, quantity } — pass extra fields
   * on your item type freely, they're ignored.
   */
  export function getCurrencyTotals<T extends PricedItem>(items: T[]): CurrencyTotal[] {
    const totalsByCurrency = new Map<string, number>();
  
    for (const item of items) {
      const currency = item.currency || "—";
      const lineTotal = item.unitPriceSnapshot * item.quantity;
      totalsByCurrency.set(currency, (totalsByCurrency.get(currency) ?? 0) + lineTotal);
    }
  
    return Array.from(totalsByCurrency.entries()).map(([currency, total]) => ({
      currency,
      total,
    }));
  }