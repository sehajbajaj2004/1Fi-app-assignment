import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/marketplaceApi';

/** Category list for grouping the marketplace listing — same "getProducts" failure flag applies. */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}
