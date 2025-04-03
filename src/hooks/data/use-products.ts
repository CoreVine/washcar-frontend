import QueryKeys from "@/lib/query-keys"

import { getProduct, getProducts } from "@/actions/products"
import { useQuery } from "@tanstack/react-query"

export function useProducts(params: Record<string, string> = {}) {
  const { data, isLoading, refetch, isFetching, isRefetching, error, isError } = useQuery({
    queryKey: QueryKeys.products.index(params),
    queryFn: ({ queryKey }) => getProducts(queryKey[1] as Record<string, string>)
  })

  return { products: data, isProductsLoading: isLoading, isProductsHasError: isError, ProductsError: error, isProductsRefetching: isRefetching, isProductsFetching: isFetching, refetchProducts: refetch }
}

export function useProduct(id: number) {
  const { data, isLoading, refetch, isFetching, isRefetching, error, isError } = useQuery({
    queryKey: QueryKeys.products.single(id),
    queryFn: () => getProduct(id)
  })

  return { product: data, isProductLoading: isLoading, isProductHasError: isError, ProductError: error, isProductRefetching: isRefetching, isProductFetching: isFetching, refetchProduct: refetch }
}
