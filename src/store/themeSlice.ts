import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
}

/**
 * Get initial theme from localStorage or system preference
 * Priority: localStorage > system preference > default (dark)
 */
const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem("theme") as Theme | null;
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "dark";
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

// Selectors
export const selectTheme = (state: RootState) => state.theme.theme;
export const selectIsDarkMode = (state: RootState) =>
  state.theme.theme === "dark";

export default themeSlice.reducer;
