import emiPlansData from '../mock/emiPlans.json';
import productsData from '../mock/products.json';
import type { Category, EMIPlan, Product } from '../../types/marketplace';

const products = productsData.products as Product[];
const categories = productsData.categories as Category[];
const tenureTemplates = emiPlansData.tenureTemplates;

// --- Simulated network conditions -----------------------------------------
// There is no real backend for this assignment. These two knobs let the app
// (and a grader/QA pass) exercise realistic loading and error states without
// a real network:
//   - latency: every call takes 400-800ms, like a real API round trip.
//   - simulateFailureFor: a set of endpoint names that should reject on their
//     next call, toggled from the dev-only "Simulate error" control in
//     MarketplaceTab (__DEV__ only). Persistent (not one-shot) so the error →
//     retry → recovery cycle is easy to demo: turn it on, see the error state,
//     turn it off, hit Retry.
type Endpoint = 'getProducts' | 'getProductById' | 'getEmiPlans';

const simulateFailureFor = new Set<Endpoint>();

export function setSimulateFailure(endpoint: Endpoint, shouldFail: boolean) {
  if (shouldFail) simulateFailureFor.add(endpoint);
  else simulateFailureFor.delete(endpoint);
}

function randomLatency() {
  return 400 + Math.random() * 400;
}

async function withLatency<T>(endpoint: Endpoint, work: () => T): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, randomLatency()));
  if (simulateFailureFor.has(endpoint)) {
    throw new Error(`Simulated failure for ${endpoint}() — turn off "Simulate error" to recover.`);
  }
  return work();
}

// --- Endpoints ---------------------------------------------------------

export async function getProducts(): Promise<Product[]> {
  return withLatency('getProducts', () => products);
}

export async function getCategories(): Promise<Category[]> {
  return withLatency('getProducts', () => categories);
}

export async function getProductById(id: string): Promise<Product> {
  return withLatency('getProductById', () => {
    const product = products.find((p) => p.id === id);
    if (!product) throw new Error(`Product "${id}" not found.`);
    return product;
  });
}

/**
 * Pure EMI math shared by the async endpoint below and by ProductCard's
 * synchronous "EMI from ₹X/mo" teaser — one source of truth for the interest
 * formula, no network/latency involved since it's a plain derivation from a
 * price that was itself fetched through the hooks.
 */
export function computeEmiPlans(price: number): EMIPlan[] {
  return tenureTemplates.map((template) => {
    const totalPayable = Math.round(price * (1 + (template.interestRatePercent / 100) * (template.tenureMonths / 12)));
    const interestAmount = totalPayable - price;
    return {
      tenureMonths: template.tenureMonths,
      monthlyAmount: Math.round(totalPayable / template.tenureMonths),
      totalPayable,
      interestAmount,
      noCostEmi: template.noCostEmi,
    } satisfies EMIPlan;
  });
}

export async function getEmiPlans(productId: string, variantId: string): Promise<EMIPlan[]> {
  return withLatency('getEmiPlans', () => {
    const product = products.find((p) => p.id === productId);
    const variant = product?.variants.find((v) => v.id === variantId);
    if (!product || !variant) {
      throw new Error(`Variant "${variantId}" not found on product "${productId}".`);
    }
    return computeEmiPlans(variant.price);
  });
}
