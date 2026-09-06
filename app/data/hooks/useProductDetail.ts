import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../api/marketplaceApi';

/** A single product by id, for ProductDetailScreen. */
export function useProductDetail(productId: string | undefined) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId as string),
    enabled: Boolean(productId),
  });
}
