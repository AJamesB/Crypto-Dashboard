import type { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentCurrencyInfo } from "../../store/currencySlice";
import type { CoinMarket } from "../../types";

interface TopCoinsListProps {
  coins: CoinMarket[];
}

/**
 * TopCoinsList - Presentational component that displays a list of top cryptocurrencies.
 *
 * @param coins - Array of coin market data to display
 */
export const TopCoinsList: FC<TopCoinsListProps> = ({ coins }) => {
  const { symbol: currencySymbol } = useSelector(selectCurrentCurrencyInfo);

  return (
    <div className="space-y-4">
      {/* Coins List */}
      <ol className="space-y-3">
        {coins.map((c, index) => (
          <li key={c.id}>
            <Link
              to={`/coin/${c.id}`}
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer no-underline hover:no-underline"
            >
              {/* Coin Info */}
              <div className="flex items-center gap-3">
                <span className="text-slate-500 dark:text-slate-400 font-medium w-6">
                  {index + 1}
                </span>
                <span>
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-6 h-6 rounded-full"
                  />
                </span>
                <strong className="text-slate-900 dark:text-slate-100">
                  {c.name}
                </strong>
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                  {c.symbol}
                </span>
              </div>

              {/* Price and Market Cap */}
              <div className="flex flex-col items-end">
                <div className="flex items-end gap-3">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Price
                  </span>
                  <span className="text-slate-900 dark:text-slate-100 font-mono font-medium">
                    {currencySymbol}
                    {c.current_price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 8,
                    })}
                  </span>
                </div>
                <div className="flex items-end gap-3">
                  <span className="text-sm text-slate-500 dark:text-slate-400 w-13">
                    Market Cap
                  </span>
                  <span className="text-slate-900 dark:text-slate-100 font-mono font-medium w-30">
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
