import type { FC } from "react";
import { useCurrency, type CurrencyCode } from "../contexts/CurrencyContext";

export const CurrencySelector: FC = () => {
  const { currency, setCurrency, availableCurrencies, isLoading } =
    useCurrency();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500">Loading currencies...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="currency" className="text-sm text-slate-600">
        Currency:
      </label>
      <select
        id="currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className="px-3 py-1 border border-slate-300 rounded-md bg-white text-slate-900 text-sm focus:outline-none"
      >
        {Object.entries(availableCurrencies).map(([code, info]) => (
          <option key={code} value={code}>
            {info.symbol ? `${info.symbol} - ` : ""}
            {info.code.toUpperCase()}
            {info.name ? ` - ${info.name}` : ""}
          </option>
        ))}
      </select>
    </div>
  );
};
