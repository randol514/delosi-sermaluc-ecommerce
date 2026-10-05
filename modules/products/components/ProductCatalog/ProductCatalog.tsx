"use client";

import { useState } from "react";
import type { Product } from "@/modules/products/types/product";
import { ProductFilter } from "../ProductFilter/ProductFilter";
import { ProductList } from "../ProductList/ProductList";
import { ProductSearch } from "../ProductSearch/ProductSearch";

import "./product-catalog.sass";

type ProductCatalogProps = {
  products: Product[];
  categories: string[];
  initialProducts: Product[];
  initialCategory?: string;
  initialQuery?: string;
};

export function ProductCatalog({
  products,
  categories,
  initialProducts,
  initialCategory,
  initialQuery,
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory ?? "Todos",
  );
  const [searchTerm, setSearchTerm] = useState(initialQuery ?? "");
  const [visibleProducts, setVisibleProducts] = useState(initialProducts);
  const filterCategories = [
    "Todos",
    ...categories.filter((category) => category !== "Todos"),
  ];

  function updateSearchParam(name: string, value: string) {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    const query = params.toString();
    window.history.replaceState(null, "", query ? `/?${query}` : "/");
  }

  function handleCategoryChange(category: string) {
    const nextCategory = category === "Todos" ? "" : category;
    setSelectedCategory(nextCategory || "Todos");
    setVisibleProducts(filterProducts(products, nextCategory, searchTerm));
    updateSearchParam("category", nextCategory);
  }

  function handleSearchChange(query: string) {
    setSearchTerm(query);
    setVisibleProducts(filterProducts(products, selectedCategory, query));
    updateSearchParam("q", query.trim());
  }

  return (
    <div className="product-catalog">
      <div className="product-catalog__container site-container">
        <div className="product-catalog__content">
          <div className="product-catalog__filters">
            <ProductFilter
              categories={filterCategories}
              value={selectedCategory}
              onChange={handleCategoryChange}
            />
            <ProductSearch value={searchTerm} onChange={handleSearchChange} />
          </div>
          <div className="product-catalog__body">
            <ProductList products={visibleProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}

function filterProducts(products: Product[], category: string, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory =
      !category || category === "Todos" || product.category === category;
    const matchesQuery = product.title.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
}
