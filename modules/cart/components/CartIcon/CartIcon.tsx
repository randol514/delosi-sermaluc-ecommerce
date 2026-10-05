import type { MouseEventHandler } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/modules/cart/hooks/useCart";
import styles from "./cart-icon.module.sass";

interface CartIconProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}

export const CartIcon = ({ onClick, isOpen }: CartIconProps) => {
  const { count, hasHydrated } = useCart();

  const cartLabel = isOpen ? "Cerrar carrito" : "Abrir carrito";
  const visibleCount = hasHydrated ? count : "…";

  return (
    <button
      type="button"
      className={styles["cart-icon"]}
      onClick={onClick}
      aria-label={`${cartLabel}. ${
        hasHydrated
          ? `${count} ${count === 1 ? "producto" : "productos"}`
          : "cargando carrito"
      }`}
      aria-expanded={isOpen}
      aria-controls="shopping-cart"
    >
      <ShoppingCart size={30} aria-hidden="true" />

      <span className={styles["cart-icon__count"]} aria-live="polite">
        {visibleCount}
      </span>

      <span className={styles["cart-icon__text"]}>Ver carrito</span>
    </button>
  );
};
