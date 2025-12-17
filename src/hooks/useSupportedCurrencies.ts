import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSupportedCurrencies } from "../api/coinGecko";
import type { CurrencyInfo } from "../types";
import { setCurrencies, setLoading } from "../store/currencySlice";
import { COINGECKO_API_KEY } from "../config/constants";

/**
 * useSupportedCurrencies - Custom hook to fetch and store supported currencies
 *
 * @returns React Query result containing supported currencies
 */
export function useSupportedCurrencies() {
  const dispatch = useDispatch();

  const query = useQuery<Record<string, CurrencyInfo>>({
    queryKey: ["supportedCurrencies"],
    queryFn: () => fetchSupportedCurrencies(COINGECKO_API_KEY),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  /**
   * Sync query state with Redux store
   * Updates loading state and currencies when data changes
   */
  useEffect(() => {
    dispatch(setLoading(query.isLoading));

    if (query.data) {
      dispatch(setCurrencies(query.data));
    }
  }, [query.data, query.isLoading, dispatch]);

  return query;
}
