import "./cart-summary.sass";
import { useCart } from "@/modules/cart/hooks/useCart";

const CartSummary = () => {
  const { count, total } = useCart();

  return (
    <section className="cart-summary" aria-label="Resumen del carrito">
      <div className="cart-summary__list">
        <div className="cart-summary__list-item">
          <span>Productos ({count})</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="cart-summary__list-item">
          <strong>Total</strong>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </div>
    </section>
  );
};

export default CartSummary;
