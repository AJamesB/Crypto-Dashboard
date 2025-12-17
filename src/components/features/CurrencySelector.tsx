import { useMemo } from "react";
import type { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrency,
  selectAvailableCurrencies,
  selectIsLoading,
  setCurrency,
} from "../../store/currencySlice";
import { Select } from "..";

/**
 * CurrencySelector - Component for currency selection dropdown.
 */
export const CurrencySelector: FC = () => {
  const currency = useSelector(selectCurrency);
  const availableCurrencies = useSelector(selectAvailableCurrencies);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  const currencyOptions = useMemo(() => {
    if (isLoading) {
      return [{ value: "", label: "Loading..." }];
    }

    return Object.entries(availableCurrencies).map(([code, info]) => ({
      value: code,
      label: `${
        info.symbol ? `${info.symbol} - ` : ""
      }${info.code.toUpperCase()}${info.name ? ` - ${info.name}` : ""}`,
    }));
  }, [availableCurrencies, isLoading]);

  return (
    <Select
      id="currency"
      label="Currency:"
      value={currency}
      onChange={(value) => dispatch(setCurrency(value))}
      options={currencyOptions}
      disabled={isLoading}
    />
  );
};
