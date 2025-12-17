import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Header, CurrencySelector } from "./components";
import { useSupportedCurrencies } from "./hooks/useSupportedCurrencies";
import HomePage from "./pages/HomePage";
import CoinDetailPage from "./pages/CoinDetailPage";

export default function App() {
  // Fetch currencies and sync to Redux store on app load
  useSupportedCurrencies();

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
          <CurrencySelector />
        </Header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coin/:coinId" element={<CoinDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
