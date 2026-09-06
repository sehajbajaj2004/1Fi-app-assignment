import type { Product, ProductVariant } from '../types/marketplace';

/** The variant a screen should default to: cheapest in-stock variant, or cheapest overall if none are in stock. */
export function getDefaultVariant(product: Product): ProductVariant {
  const inStock = product.variants.filter((v) => v.inStock);
  const pool = inStock.length > 0 ? inStock : product.variants;
  return pool.reduce((cheapest, v) => (v.price < cheapest.price ? v : cheapest), pool[0]);
}
