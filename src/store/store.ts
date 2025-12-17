import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currencySlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
