import { afterEach, describe, expect, it } from "vitest";
import { useCartStore } from "@/modules/cart/store/cart-store";
import { mockProducts } from "@/modules/products/data/mock-products";

const firstProduct = mockProducts[0]!;
const secondProduct = mockProducts[1]!;

describe("cart store", () => {
  afterEach(() => {
    useCartStore.setState({ items: [], hasHydrated: false });
  });

  it("adds a product with quantity one", () => {
    useCartStore.getState().addItem(firstProduct);

    expect(useCartStore.getState().items).toEqual([
      { product: firstProduct, quantity: 1 },
    ]);
  });

  it("increments the quantity when adding the same product again", () => {
    const { addItem } = useCartStore.getState();
    addItem(firstProduct);
    addItem(firstProduct);

    expect(useCartStore.getState().items).toEqual([
      { product: firstProduct, quantity: 2 },
    ]);
  });

  it("removes the selected product", () => {
    const { addItem, removeItem } = useCartStore.getState();
    addItem(firstProduct);
    addItem(secondProduct);
    removeItem(firstProduct.id);

    expect(useCartStore.getState().items).toEqual([
      { product: secondProduct, quantity: 1 },
    ]);
  });
});
