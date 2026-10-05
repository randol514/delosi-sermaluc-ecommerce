"use client";

import { useEffect } from "react";
import { CircleX, Trash2 } from "lucide-react";
import { useCart } from "@/modules/cart/hooks/useCart";
import CartSummary from "../CartSummary/CartSummary";

import "./cart-drawer.sass";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, removeItem } = useCart();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="cart-drawer__backdrop"
          onClick={onClose}
          aria-label="Cerrar carrito"
        />
      )}
      <aside
        id="shopping-cart"
        className={`cart-drawer${isOpen ? " cart-drawer--active" : ""}`}
        role="dialog"
        aria-modal={isOpen}
        aria-labelledby="shopping-cart-title"
        aria-hidden={!isOpen}
      >
        <div className="cart-drawer__header">
          <h2 id="shopping-cart-title">Tu carrito</h2>
          <button
            type="button"
            className="cart-drawer__close"
            onClick={onClose}
            aria-label="Cerrar carrito"
            tabIndex={isOpen ? 0 : -1}
          >
            <CircleX size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="cart-drawer__content">
          {items.length === 0 ? (
            <p className="cart-drawer__empty">Tu carrito está vacío.</p>
          ) : (
            <ul className="cart-list">
              {items.map(({ product, quantity }) => (
                <li className="cart-drawer-item" key={product.id}>
                  <div>
                    <p className="cart-drawer-item__title">{product.title}</p>
                    <p>
                      {quantity} × ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="cart-drawer-item__delete"
                    onClick={() => removeItem(product.id)}
                    aria-label={`Quitar ${product.title} del carrito`}
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="cart-drawer__summary">
            <CartSummary />
          </div>
        </div>
      </aside>
    </>
  );
};
