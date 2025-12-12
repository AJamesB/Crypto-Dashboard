import { useQuery } from "@tanstack/react-query";
import { fetchCoinDetails } from "../api/coinGecko";

export function useCoinDetails(coinId: string | undefined) {
  return useQuery({
    queryKey: ["coin", coinId],
    queryFn: () => fetchCoinDetails(coinId!, import.meta.env.VITE_COINGECKO_API_KEY),
    enabled: !!coinId,
    staleTime: 1000 * 30, // 30s considered fresh
    gcTime: 1000 * 60 * 5, // cache for 5min
    retry: 2,
  });
}
