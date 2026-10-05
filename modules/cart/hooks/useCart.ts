"use client";

import { useEffect } from "react";
import { hydrateCartStore, useCartStore } from "@/modules/cart/store/cart-store";

export function useCart() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  useEffect(() => {
    void hydrateCartStore();
  }, []);

  const count = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return { items, count, total, addItem, removeItem, hasHydrated };
}
