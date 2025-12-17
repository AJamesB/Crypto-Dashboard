import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchCoinMarketChart } from "../api/coinGecko";
import { selectCurrency } from "../store/currencySlice";
import { COINGECKO_API_KEY } from "../config/constants";

/**
 * useCoinMarketChart - Custom hook to fetch historical market chart data
 *
 * @param coinId - The coin ID to fetch data for
 * @param days - Number of days of historical data (1, 7, 14, 30, 90, 180, 365, or "max")
 * @param enabled - Whether the query is enabled (default: true)
 * @returns React Query result containing historical market data
 */
export function useCoinMarketChart(
  coinId: string | undefined,
  days: number | "max" = 1,
  enabled: boolean = true
) {
  const currency = useSelector(selectCurrency);

  return useQuery({
    queryKey: ["coinMarketChart", coinId, currency.toLowerCase(), days],
    queryFn: () =>
      fetchCoinMarketChart(
        coinId!,
        currency.toLowerCase(),
        days,
        COINGECKO_API_KEY
      ),
    enabled: enabled && !!coinId,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchInterval: false, // Disabled auto-polling to avoid rate limits
    // refetchInterval: refetchIntervalMs // for automatic polling
    refetchOnWindowFocus: false, // Disabled to avoid rate limits
    retry: 2,
  });
}
