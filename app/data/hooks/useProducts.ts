import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/marketplaceApi';

/** All marketplace products (Phase 3 filters/groups client-side from this list). */
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
}
