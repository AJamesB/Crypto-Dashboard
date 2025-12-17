import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchCoinDetails } from "../api/coinGecko";
import { selectCurrency } from "../store/currencySlice";

export function useCoinDetails(coinId: string | undefined) {
  // Read currency from Redux store
  const currency = useSelector(selectCurrency);
  
  return useQuery({
    queryKey: ["coin", coinId, currency.toLowerCase()],
    queryFn: () => fetchCoinDetails(coinId!, currency.toLowerCase(), import.meta.env.VITE_COINGECKO_API_KEY),
    enabled: !!coinId,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchInterval: false, // Disabled auto-polling to avoid rate limits
    refetchOnWindowFocus: false, // Disabled to avoid rate limits
    retry: 2,
  });
}
