import { useQuery } from "@tanstack/react-query";
import { fetchTopMarketCoins } from "../api/coinGecko";
import { useCurrency } from "../contexts/CurrencyContext";

export function useTopCoins(options?: {
  perPage?: number;
  enabled?: boolean;
  refetchIntervalMs?: number;
}) {
  const { currency } = useCurrency();
  const {
    perPage = 10,
    enabled = true,
    refetchIntervalMs = 30000,
  } = options ?? {};

  return useQuery({
    queryKey: ["topCoins", perPage, currency.toLowerCase()],
    queryFn: () =>
      fetchTopMarketCoins(
        perPage,
        currency.toLowerCase(),
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
