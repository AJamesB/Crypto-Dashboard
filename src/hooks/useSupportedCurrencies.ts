import { useQuery } from "@tanstack/react-query";
import { fetchSupportedCurrencies, type CurrencyInfo } from "../api/coinGecko";

const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

export function useSupportedCurrencies() {
  return useQuery<Record<string, CurrencyInfo>>({
    queryKey: ["supportedCurrencies"],
    queryFn: () => fetchSupportedCurrencies(API_KEY),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000,
  });
}
