import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header, CurrencySelector } from "./components";
import { useSupportedCurrencies } from "./hooks/useSupportedCurrencies";
import { selectIsLoading } from "./store/currencySlice";
import HomePage from "./pages/HomePage";
import CoinDetailPage from "./pages/CoinDetailPage";

export default function App() {
  useSupportedCurrencies();
  const isCurrenciesLoading = useSelector(selectIsLoading);

  return (
    <BrowserRouter basename="/Crypto-Dashboard">
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Header>
          <Link
            to="/"
            className="text-xl font-semibold hover:text-slate-700 transition-colors"
          >
            Crypto Dashboard
          </Link>
          <CurrencySelector isFetching={isCurrenciesLoading} />
        </Header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coin/:coinId" element={<CoinDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
