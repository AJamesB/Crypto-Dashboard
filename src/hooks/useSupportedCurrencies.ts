import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSupportedCurrencies, type CurrencyInfo } from "../api/coinGecko";
import { setCurrencies, setLoading } from "../store/currencySlice";

const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

export function useSupportedCurrencies() {
  const dispatch = useDispatch();
  
  const query = useQuery<Record<string, CurrencyInfo>>({
    queryKey: ["supportedCurrencies"],
    queryFn: () => fetchSupportedCurrencies(API_KEY),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  useEffect(() => {
    dispatch(setLoading(query.isLoading));
    
    if (query.data) {
      dispatch(setCurrencies(query.data));
    }
  }, [query.data, query.isLoading, dispatch]);

  return query;
}
