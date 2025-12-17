import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
}

/**
 * Load theme preference with the following priority:
 * 1. User's saved preference from localStorage (if exists)
 * 2. System preference (prefers-color-scheme)
 * 3. Light mode (default fallback)
 * 
 * Once the user manually toggles the theme, their choice is saved to localStorage
 * and will always take precedence over system preference on future visits.
 */
const getInitialTheme = (): Theme => {
  // Priority 1: Check if user has explicitly set a preference
  const savedTheme = localStorage.getItem("theme") as Theme | null;
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  
  // Priority 2: Check system preference (only on first visit)
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  
  // Priority 3: Default to light mode
  return "light";
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

/**
 * Redux slice for managing application theme (light/dark mode)
 */
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    /**
     * Set the theme to light or dark
     */
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    /**
     * Toggle between light and dark themes
     */
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
