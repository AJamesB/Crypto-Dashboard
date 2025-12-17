import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchTopMarketCoins } from "../api/coinGecko";
import { selectCurrency } from "../store/currencySlice";

export function useTopCoins(options?: {
  perPage?: number;
  enabled?: boolean;
}) {
  // Read currency from Redux store
  const currency = useSelector(selectCurrency);
  
  const {
    perPage = 10,
    enabled = true,
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
    staleTime: 1000 * 60 * 2, // 2 minutes 
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchInterval: false, // Disabled auto-polling to avoid rate limits
    refetchOnWindowFocus: false, // Disabled to avoid rate limits
    retry: 2,
  });
}
