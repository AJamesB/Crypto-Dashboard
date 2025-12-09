import { useQuery } from "@tanstack/react-query";
import { fetchTopMarketCoins } from "../api/coinGecko";

export function useTopCoins(options?: {
  perPage?: number;
  vsCurrency?: string;
  enabled?: boolean;
  refetchIntervalMs?: number;
}) {
  const {
    perPage = 10,
    vsCurrency = "usd",
    enabled = true,
    refetchIntervalMs = 30000,
  } = options ?? {};

  return useQuery({
    queryKey: ["topCoins", perPage, vsCurrency],
    queryFn: () =>
      fetchTopMarketCoins(
        perPage,
        vsCurrency,
        1,
        import.meta.env.VITE_COINGECKO_API_KEY,
      ),
    enabled,
    staleTime: 1000 * 30, // 30s considered fresh
    gcTime: 1000 * 60 * 5, // cache for 5min (previously called cacheTime)
    refetchInterval: refetchIntervalMs, // automatic polling
    retry: 2,
  });
}
