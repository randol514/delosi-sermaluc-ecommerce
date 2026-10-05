"use client";

import { Button } from "@/shared/components/Button";
import { useCart } from "@/modules/cart/hooks/useCart";
import type { Product } from "@/modules/products/types/product";

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addItem, hasHydrated } = useCart();

  return (
    <Button disabled={!hasHydrated} onClick={() => addItem(product)}>
      Agregar al carrito
    </Button>
  );
};

export default AddToCartButton;
