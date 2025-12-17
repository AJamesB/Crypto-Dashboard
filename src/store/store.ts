import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currencySlice";
import themeReducer from "./themeSlice";

/**
 * Redux store configuration
 * Combines currency and theme slices for global UI state
 */
export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    theme: themeReducer,
  },
});

// Infer RootState type from the store
export type RootState = ReturnType<typeof store.getState>;

// Infer AppDispatch type from the store
export type AppDispatch = typeof store.dispatch;
