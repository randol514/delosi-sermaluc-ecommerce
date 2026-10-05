import { ProductCatalog } from "@/modules/products/components/ProductCatalog";
import { getCatalogData } from "@/modules/products/api/products";
import type { Product } from "@/modules/products/types/product";

export const metadata = {
  title: "Catálogo | Delosi",
  description: "Explora nuestro catálogo de productos.",
};

type HomePageProps = {
  searchParams: Promise<{
    category?: string | string[];
    q?: string | string[];
  }>;
};

function filterProducts(
  products: Product[],
  category?: string,
  query?: string,
) {
  const normalizedQuery = query?.trim().toLowerCase() ?? "";

  return products.filter((product) => {
    const matchesCategory =
      !category || category === "Todos" || product.category === category;
    const matchesQuery = product.title.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const [{ category, q }, { products, categories }] = await Promise.all([
    searchParams,
    getCatalogData(),
  ]);
  const selectedCategory = Array.isArray(category) ? category[0] : category;
  const searchQuery = Array.isArray(q) ? q[0] : q;
  const initialProducts = filterProducts(
    products,
    selectedCategory,
    searchQuery,
  );

  return (
    <ProductCatalog
      products={products}
      categories={categories}
      initialProducts={initialProducts}
      initialCategory={selectedCategory}
      initialQuery={searchQuery}
    />
  );
}
