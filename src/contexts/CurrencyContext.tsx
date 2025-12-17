import { createContext, useContext, useState, type ReactNode } from "react";
import { useSupportedCurrencies } from "../hooks/useSupportedCurrencies";
import type { CurrencyInfo } from "../api/coinGecko";

export type CurrencyCode = string;

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  currencySymbol: string;
  currencyName: string;
  availableCurrencies: Record<string, CurrencyInfo>;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("ZAR");
  
  const { data: fetchedCurrencies, isLoading } = useSupportedCurrencies();
  
  // Fallback values while loading or if currency doesn't exist
  const availableCurrencies = fetchedCurrencies || {};
  const currencyInfo = availableCurrencies[currency] || {
    code: currency.toLowerCase(),
    symbol: currency,
    name: currency,
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencySymbol: currencyInfo.symbol,
        currencyName: currencyInfo.name,
        availableCurrencies,
        isLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}
