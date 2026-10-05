import type { Product } from "@/modules/products/types/product";
import AddToCartButton from "@/modules/cart/components/AddToCartButton/AddToCartButton";
import { Button } from "@/shared/components/Button";
import { ProductImage } from "@/modules/products/components/ProductImage/ProductImage";
import "./product-detail.sass";

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <main className="product-detail ">
      <div className="product-detail__container site-container">
        <div className="product-detail__content">
          <article className="product-detail__layout">
            <div className="product-detail__media">
              <ProductImage
                className="product-detail__image"
                src={product.image}
                alt={product.title}
                width={640}
                height={640}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="product-detail__body">
              <p className="product-detail__category">{product.category}</p>
              <h1 className="product-detail__title">{product.title}</h1>
              <p className="product-detail__rating">
                {product.rating.rate.toFixed(1)} / 5 ({product.rating.count}{" "}
                reseñas)
              </p>
              <p className="product-detail__description">
                {product.description}
              </p>
              <p className="product-detail__price">
                ${product.price.toFixed(2)}
              </p>
              <div className="product-detail__actions">
                <AddToCartButton product={product} />
                <Button href="/" variant="secondary">
                  Volver al catálogo
                </Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
