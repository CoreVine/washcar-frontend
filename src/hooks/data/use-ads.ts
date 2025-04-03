import { getAds } from "@/actions/app"
import QueryKeys from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"

export function useAds() {
  const { data, isLoading, refetch, isFetching, isRefetching, error, isError } = useQuery({
    queryKey: QueryKeys.ads.index,
    queryFn: getAds
  })

  return { ads: data, isAdsLoading: isLoading, isAdsHasError: isError, adsError: error, isAdsRefetching: isRefetching, isAdsFetching: isFetching, refetchAds: refetch }
}
