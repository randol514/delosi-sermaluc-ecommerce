import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCatalogData, getProduct } from "@/modules/products/api/products";
import { mockProducts } from "@/modules/products/data/mock-products";

describe("products API fallback", () => {
  beforeEach(() => {
    vi.stubEnv("USE_MOCK_PRODUCTS", "false");
    vi.stubGlobal("fetch", vi.fn());
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("uses mock products when the catalog API returns 522", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 522 }));

    const result = await getCatalogData();

    expect(result.products).toEqual(mockProducts);
    expect(result.categories).toEqual([
      "electronics",
      "jewelery",
      "men's clothing",
      "women's clothing",
    ]);
  });

  it("returns null when the API confirms the product does not exist", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 404 }));

    await expect(getProduct("999")).resolves.toBeNull();
  });
});
