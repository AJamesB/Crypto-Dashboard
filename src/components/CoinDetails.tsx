import type { FC } from "react";
import { useSelector } from "react-redux";
import type { CoinDetails as CoinDetailsType } from "../api/coinGecko";
import { selectCurrency, selectCurrentCurrencyInfo } from "../store/currencySlice";

interface CoinDetailsProps {
  coin: CoinDetailsType;
}

export const CoinDetails: FC<CoinDetailsProps> = ({ coin }) => {
  // Read currency data from Redux store
  const currency = useSelector(selectCurrency);
  const { symbol: currencySymbol } = useSelector(selectCurrentCurrencyInfo);
  const currencyLower = currency.toLowerCase();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
        <img
          src={coin.image?.large}
          alt={coin.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{coin.name}</h1>
          <p className="text-slate-600 uppercase text-sm">{coin.symbol}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600 mb-1">Current Price</p>
          <p className="text-2xl font-bold font-mono">
            {currencySymbol}{coin.market_data?.current_price?.[currencyLower]?.toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600 mb-1">Market Cap</p>
          <p className="text-2xl font-bold font-mono">
            {currencySymbol}{coin.market_data?.market_cap?.[currencyLower]?.toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600 mb-1">24h Volume</p>
          <p className="text-2xl font-bold font-mono">
            {currencySymbol}{coin.market_data?.total_volume?.[currencyLower]?.toLocaleString()}
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600 mb-1">24h Change</p>
          <p
            className={`text-2xl font-bold ${
              (coin.market_data?.price_change_percentage_24h ?? 0) >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {(coin.market_data?.price_change_percentage_24h ?? 0) >= 0
              ? "+"
              : ""}
            {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600 mb-1">Market Cap Rank</p>
          <p className="text-2xl font-bold">#{coin.market_cap_rank}</p>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600 mb-1">Circulating Supply</p>
          <p className="text-2xl font-bold font-mono">
            {coin.market_data?.circulating_supply?.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
      </div>

      {coin.description?.en && (
        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">
            About {coin.name}
          </h2>
          <div
            className="text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: coin.description.en.split(". ").slice(0, 3).join(". ") + ".",
            }}
          />
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-3">
          Additional Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {coin.market_data?.high_24h?.[currencyLower] && (
            <div className="flex justify-between p-3 bg-slate-50 rounded">
              <span className="text-slate-600">24h High</span>
              <span className="font-mono font-medium">
                {currencySymbol}{coin.market_data.high_24h[currencyLower].toLocaleString()}
              </span>
            </div>
          )}
          {coin.market_data?.low_24h?.[currencyLower] && (
            <div className="flex justify-between p-3 bg-slate-50 rounded">
              <span className="text-slate-600">24h Low</span>
              <span className="font-mono font-medium">
                {currencySymbol}{coin.market_data.low_24h[currencyLower].toLocaleString()}
              </span>
            </div>
          )}
          {coin.market_data?.ath?.[currencyLower] && (
            <div className="flex justify-between p-3 bg-slate-50 rounded">
              <span className="text-slate-600">All-Time High</span>
              <span className="font-mono font-medium">
                {currencySymbol}{coin.market_data.ath[currencyLower].toLocaleString()}
              </span>
            </div>
          )}
          {coin.market_data?.atl?.[currencyLower] && (
            <div className="flex justify-between p-3 bg-slate-50 rounded">
              <span className="text-slate-600">All-Time Low</span>
              <span className="font-mono font-medium">
                {currencySymbol}{coin.market_data.atl[currencyLower].toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Links */}
      {(coin.links?.homepage?.[0] || coin.links?.blockchain_site?.[0]) && (
        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Links</h2>
          <div className="flex flex-wrap gap-2">
            {coin.links?.homepage?.[0] && (
              <a
                href={coin.links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Official Website
              </a>
            )}
            {coin.links?.blockchain_site?.[0] && (
              <a
                href={coin.links.blockchain_site[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-200 text-slate-900 rounded-md hover:bg-slate-300 transition-colors"
              >
                Explorer
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
