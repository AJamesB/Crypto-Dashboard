import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CurrencyInfo } from "../types";

interface CurrencyState {
  selectedCurrency: string;
  availableCurrencies: Record<string, CurrencyInfo>;
  isLoading: boolean;
}

const initialState: CurrencyState = {
  selectedCurrency: "ZAR",
  availableCurrencies: {},
  isLoading: false,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.selectedCurrency = action.payload;
    },

    setCurrencies: (
      state,
      action: PayloadAction<Record<string, CurrencyInfo>>
    ) => {
      state.availableCurrencies = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCurrency, setCurrencies, setLoading } = currencySlice.actions;

export default currencySlice.reducer;

// Selectors
export const selectCurrency = (state: { currency: CurrencyState }) =>
  state.currency.selectedCurrency;

export const selectAvailableCurrencies = (state: { currency: CurrencyState }) =>
  state.currency.availableCurrencies;

export const selectIsLoading = (state: { currency: CurrencyState }) =>
  state.currency.isLoading;

export const selectCurrentCurrencyInfo = (state: {
  currency: CurrencyState;
}) => {
  const currency = state.currency.selectedCurrency;
  const available = state.currency.availableCurrencies;

  return (
    available[currency] || {
      code: currency.toLowerCase(),
      symbol: currency,
      name: currency,
    }
  );
};
