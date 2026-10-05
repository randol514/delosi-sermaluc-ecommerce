import type { Product } from "@/modules/products/types/product";
import { mockProducts } from "@/modules/products/data/mock-products";

const API_BASE_URL = (
  process.env.FAKE_STORE_API_URL ?? "https://fakestoreapi.com"
).replace(/\/+$/, "");
const PRODUCTS_URL = `${API_BASE_URL}/products`;
const CACHE_SECONDS = 3600;
const REQUEST_TIMEOUT_MS = 5000;

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: CACHE_SECONDS },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Fake Store API respondió ${response.status}.`);
  }

  return response.json() as Promise<T>;
}

function getCategories(products: Product[]) {
  return [...new Set(products.map((product) => product.category))];
}

export async function getCatalogData(): Promise<{
  products: Product[];
  categories: string[];
}> {
  if (process.env.USE_MOCK_PRODUCTS === "true") {
    return { products: mockProducts, categories: getCategories(mockProducts) };
  }

  try {
    const products = await fetchJson<Product[]>(PRODUCTS_URL);
    let categories = getCategories(products);

    try {
      categories = await fetchJson<string[]>(`${PRODUCTS_URL}/categories`);
    } catch {
      console.warn(
        "No se pudieron cargar las categorías; se derivan del catálogo.",
      );
    }

    return { products, categories };
  } catch (error) {
    console.warn(
      "Fake Store API no disponible; se usan productos mock.",
      error,
    );
    return { products: mockProducts, categories: getCategories(mockProducts) };
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  if (process.env.USE_MOCK_PRODUCTS === "true") {
    return mockProducts.find((product) => product.id === Number(id)) ?? null;
  }

  try {
    const response = await fetch(`${PRODUCTS_URL}/${encodeURIComponent(id)}`, {
      next: { revalidate: CACHE_SECONDS },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Fake Store API respondió ${response.status}.`);
    }

    return (await response.json()) as Product;
  } catch (error) {
    const mockProduct = mockProducts.find(
      (product) => product.id === Number(id),
    );

    if (mockProduct) {
      console.warn(
        `Fake Store API no disponible para el producto ${id}; se usa mock.`,
        error,
      );
      return mockProduct;
    }

    throw error;
  }
}
