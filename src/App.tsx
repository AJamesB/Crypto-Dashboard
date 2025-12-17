import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Header, CurrencySelector, ThemeToggle } from "./components";
import { useSupportedCurrencies } from "./hooks/useSupportedCurrencies";
import { selectIsDarkMode } from "./store/themeSlice";
import HomePage from "./pages/HomePage";
import CoinDetailPage from "./pages/CoinDetailPage";

export default function App() {
  // Fetch and store supported currencies on app load
  useSupportedCurrencies();

  // Get current theme mode from Redux store
  const isDarkMode = useSelector(selectIsDarkMode);

  //Apply or remove dark mode class on document root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    /* Router setup with base path for GitHub Pages deployment */
    <BrowserRouter basename="/Crypto-Dashboard">
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
        {/* App Header */}
        <Header>
          <Link
            to="/"
            className="text-xl font-semibold hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Crypto Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <CurrencySelector />
          </div>
        </Header>

        {/* Main Content */}
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coin/:coinId" element={<CoinDetailPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
