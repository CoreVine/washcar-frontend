import QueryKeys from "@/lib/query-keys"

import { getProduct, getProducts } from "@/actions/products"
import { useQuery } from "@tanstack/react-query"
import { TSearchParams } from "@/types/default"

export function useProducts(params: TSearchParams = {}) {
  const { data, isLoading, refetch, isFetching, isRefetching, error, isError } = useQuery({
    queryKey: QueryKeys.products.index(params),
    queryFn: ({ queryKey }) => getProducts(queryKey[1] as TSearchParams)
  })

  return { products: data, isProductsLoading: isLoading, isProductsHasError: isError, productsError: error, isProductsRefetching: isRefetching, isProductsFetching: isFetching, refetchProducts: refetch }
}

export function useProduct(id: number) {
  const { data, isLoading, refetch, isFetching, isRefetching, error, isError } = useQuery({
    queryKey: QueryKeys.products.single(id),
    queryFn: () => getProduct(id)
  })

  return { product: data, isProductLoading: isLoading, isProductHasError: isError, productError: error, isProductRefetching: isRefetching, isProductFetching: isFetching, refetchProduct: refetch }
}
