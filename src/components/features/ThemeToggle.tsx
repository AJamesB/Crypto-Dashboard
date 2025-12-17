import type { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsDarkMode, toggleTheme } from "../../store/themeSlice";

/**
 * ThemeToggle - Button to toggle between light and dark mode
 */
export const ThemeToggle: FC = () => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xl"
      aria-label="Toggle dark mode"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="text-slate-700 dark:text-slate-300">
        {isDarkMode ? <>&#9728;</> : <>&#9790;</>}
      </span>
    </button>
  );
};
