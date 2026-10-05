import { memo } from "react";
import Link from "next/link";
import AddToCartButton from "../../../cart/components/AddToCartButton/AddToCartButton";
import { ProductImage } from "../ProductImage/ProductImage";
import type { ProductCardProps } from "./ProductCard.types";
import "./product-card.sass";

export const ProductCard = memo(function ProductCard({
  product,
}: ProductCardProps) {
  const { image, title, category, price } = product;

  return (
    <article className="product-card">
      <Link className="product-card__link" href={`/products/${product.id}`}>
        <div className="product-card__image">
          <ProductImage
            src={image}
            alt={title}
            width={474}
            height={527}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 474px"
            className="product-card__image-img"
          />
        </div>
        <div className="product-card__content">
          <span className="product-card__category">{category}</span>
          <h3 className="product-card__title">{title}</h3>
          <span className="product-card__price">${price.toFixed(2)}</span>
        </div>
      </Link>
      <div className="product-card__actions">
        <AddToCartButton product={product} />
      </div>
    </article>
  );
});
