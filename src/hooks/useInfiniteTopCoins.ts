import { useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchTopMarketCoins } from "../api/coinGecko";
import { selectCurrency } from "../store/currencySlice";
import { COINGECKO_API_KEY } from "../config/constants";

/**
 * useInfiniteTopCoins - Custom hook to fetch top market coins with infinite scrolling
 *
 * @param options - Optional parameters for the hook
 * @param options.perPage - Number of coins to fetch per page (default: 50)
 * @param options.enabled - Whether the query is enabled (default: true)
 * @returns React Query infinite result containing top market coins
 */
export function useInfiniteTopCoins(options?: {
  perPage?: number;
  enabled?: boolean;
}) {
  // Read currency from Redux store
  const currency = useSelector(selectCurrency);

  const { perPage = 100, enabled = true } = options ?? {};

  return useInfiniteQuery({
    queryKey: ["topCoinsInfinite", perPage, currency.toLowerCase()],
    queryFn: ({ pageParam = 1 }) =>
      fetchTopMarketCoins(
        perPage,
        currency.toLowerCase(),
        pageParam,
        COINGECKO_API_KEY
      ),
    // Determine next page number, return undefined when no more pages
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < perPage) {
        return undefined; // No more pages if received fewer items than requested
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
    enabled,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchInterval: false, // Disabled auto-polling to avoid rate limits
    // refetchInterval: refetchIntervalMs // for automatic polling
    refetchOnWindowFocus: false, // Disabled to avoid rate limits
    retry: 2,
  });
}
