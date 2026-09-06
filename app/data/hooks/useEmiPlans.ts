import { useQuery } from '@tanstack/react-query';
import { getEmiPlans } from '../api/marketplaceApi';

/** EMI tenure options for a given product + variant. Refetches when the variant changes. */
export function useEmiPlans(productId: string | undefined, variantId: string | undefined) {
  return useQuery({
    queryKey: ['emiPlans', productId, variantId],
    queryFn: () => getEmiPlans(productId as string, variantId as string),
    enabled: Boolean(productId && variantId),
  });
}
