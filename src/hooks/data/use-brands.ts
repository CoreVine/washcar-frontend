import QueryKeys from "@/lib/query-keys"

import { getBrands } from "@/actions/brands"
import { useQuery } from "@tanstack/react-query"

export function useBrands(params: Record<string, string> = {}) {
  const { data, isLoading, refetch, isFetching, isRefetching, error, isError } = useQuery({
    queryKey: QueryKeys.brands.index(params),
    queryFn: ({ queryKey }) => getBrands(queryKey[1] as Record<string, string>)
  })

  return { brands: data, isBrandsLoading: isLoading, isBrandsHasError: isError, BrandsError: error, isBrandsRefetching: isRefetching, isBrandsFetching: isFetching, refetchBrands: refetch }
}
