import { getCart } from "@/actions/cart"
import { useQuery } from "@tanstack/react-query"

export function useCart() {
  const q = useQuery({
    queryKey: ["cart"],
    queryFn: getCart
  })

  return {
    cart: q.data,
    isCartLoading: q.isLoading,
    isCartError: q.isError,
    cartError: q.error,
    isCartFetched: q.isFetched,
    refetchCart: q.refetch
  }
}
