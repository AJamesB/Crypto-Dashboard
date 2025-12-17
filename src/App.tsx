import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Header } from "./components/Header";
import { CurrencySelector } from "./components/CurrencySelector";
import HomePage from "./pages/HomePage";
import CoinDetailPage from "./pages/CoinDetailPage";

export default function App() {
  return (
    <BrowserRouter basename="/Crypto-Dashboard">
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Header>
          <Link to="/" className="text-xl font-semibold hover:text-slate-700 transition-colors">
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
