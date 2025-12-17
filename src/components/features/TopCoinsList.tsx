import type { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentCurrencyInfo } from "../../store/currencySlice";
import type { CoinMarket } from "../../types";

interface TopCoinsListProps {
  coins: CoinMarket[];
  isFetching?: boolean;
}

/**
 * TopCoinsList - Presentational component that displays a list of top cryptocurrencies.
 *
 * @param coins - Array of coin market data to display
 * @param isFetching - Optional flag to show when data is being refreshed
 */
export const TopCoinsList: FC<TopCoinsListProps> = ({
  coins,
  isFetching = false,
}) => {
  // Read currency symbol from Redux store
  const { symbol: currencySymbol } = useSelector(selectCurrentCurrencyInfo);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
        Top 10 by Market Cap{" "}
        {isFetching && (
          <span className="text-sm text-slate-500">(updating...)</span>
        )}
      </h2>

      <ol className="space-y-3">
        {coins.map((c, index) => (
          <li key={c.id}>
            <Link
              to={`/coin/${c.id}`}
              className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg hover:scale-105 hover:shadow-lg transition-all cursor-pointer no-underline hover:no-underline"
            >
              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-medium w-6">
                  {index + 1}
                </span>
                <span>
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-6 h-6 rounded-full"
                  />
                </span>
                <strong className="text-slate-900">{c.name}</strong>
                <span className="text-xs text-slate-500 uppercase">
                  {c.symbol}
                </span>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-end gap-3">
                  <span className="text-sm text-slate-500">Price</span>
                  <span className="text-slate-900 font-mono font-medium">
                    {currencySymbol}
                    {c.current_price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 8,
                    })}
                  </span>
                </div>
                <div className="flex items-end gap-3">
                  <span className="text-sm text-slate-500 w-13">
                    Market Cap
                  </span>
                  <span className="text-slate-900 font-mono font-medium w-30">
                    {currencySymbol}
                    {c.market_cap.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 8,
                    })}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};
