import type { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrency,
  selectAvailableCurrencies,
  setCurrency,
} from "../../store/currencySlice";

interface CurrencySelectorProps {
  isFetching?: boolean;
}

/**
 * CurrencySelector - Presentational component for currency selection dropdown.
 *
 * @param isFetching - Optional flag to show when currency data is being fetched
 */
export const CurrencySelector: FC<CurrencySelectorProps> = ({
  isFetching = false,
}) => {
  const currency = useSelector(selectCurrency);
  const availableCurrencies = useSelector(selectAvailableCurrencies);

  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="currency" className="text-sm text-slate-600">
        Currency:
      </label>
      <select
        id="currency"
        value={currency}
        onChange={(e) => dispatch(setCurrency(e.target.value))}
        disabled={isFetching}
        className="px-3 py-1 border border-slate-300 rounded-md bg-white text-slate-900 text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isFetching ? (
          <option>Loading...</option>
        ) : (
          Object.entries(availableCurrencies).map(([code, info]) => (
            <option key={code} value={code}>
              {info.symbol ? `${info.symbol} - ` : ""}
              {info.code.toUpperCase()}
              {info.name ? ` - ${info.name}` : ""}
            </option>
          ))
        )}
      </select>
    </div>
  );
};
