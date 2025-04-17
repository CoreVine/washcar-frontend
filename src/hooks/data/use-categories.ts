import QueryKeys from "@/lib/query-keys"

import { getCategories, getCategory, getCategoryProducts, getCategorySubCategories } from "@/actions/categories"
import { useQuery } from "@tanstack/react-query"

export function useCategories() {
  const { data, isLoading, refetch, isFetching, isRefetching, error, isError } = useQuery({
    queryKey: QueryKeys.categories.index,
    queryFn: getCategories
  })

  return { categories: data, isCategoriesLoading: isLoading, isCategoriesHasError: isError, CategoriesError: error, isCategoriesRefetching: isRefetching, isCategoriesFetching: isFetching, refetchCategories: refetch }
}

export function useCategory(id: number) {
  const { data, isLoading, refetch, isFetching, isRefetching, error, isError } = useQuery({
    queryKey: QueryKeys.categories.single(id),
    queryFn: ({ queryKey }) => getCategory(queryKey[1] as number)
  })

  return { category: data, isCategoryLoading: isLoading, isCategoryHasError: isError, CategoryError: error, isCategoryRefetching: isRefetching, isCategoryFetching: isFetching, refetchCategory: refetch }
}

export function useCategorySubCategories(id: number) {
  const { data, isLoading, refetch, isFetching, isRefetching, error, isError } = useQuery({
    queryKey: QueryKeys.categories.singleSubCategories(id),
    queryFn: ({ queryKey }) => getCategorySubCategories(queryKey[1] as number)
  })

  return { subCategories: data, isSubCategoriesLoading: isLoading, isSubCategoriesHasError: isError, SubCategoriesError: error, isSubCategoriesRefetching: isRefetching, isSubCategoriesFetching: isFetching, refetchSubCategories: refetch }
}

export function useCategoryProducts(id: number) {
  const { data, isLoading, refetch, isFetching, isRefetching, error, isError } = useQuery({
    queryKey: QueryKeys.categories.singleProducts(id),
    queryFn: ({ queryKey }) => getCategoryProducts(queryKey[1] as number)
  })

  return { products: data, isProductsLoading: isLoading, isProductsHasError: isError, ProductsError: error, isProductsRefetching: isRefetching, isProductsFetching: isFetching, refetchProducts: refetch }
}
