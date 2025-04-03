import QueryKeys from "@/lib/query-keys"

import { getCategories, getCategory } from "@/actions/categories"
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
