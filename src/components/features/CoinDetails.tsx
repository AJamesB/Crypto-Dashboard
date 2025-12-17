import type { FC } from "react";
import { useSelector } from "react-redux";
import type { CoinDetails as CoinDetailsType } from "../../types";
import {
  selectCurrency,
  selectCurrentCurrencyInfo,
} from "../../store/currencySlice";
import { StatCard, KeyValueRow } from "..";

interface CoinDetailsProps {
  coin: CoinDetailsType;
  isFetching?: boolean;
}

/**
 * CoinDetails - Presentational component that displays detailed information about a cryptocurrency.
 *
 * @param coin - Detailed coin data to display
 * @param isFetching - Optional flag to show when data is being refreshed
 */
export const CoinDetails: FC<CoinDetailsProps> = ({
  coin,
  isFetching = false,
}) => {
  // Read currency data from Redux store
  const currency = useSelector(selectCurrency);
  const { symbol: currencySymbol } = useSelector(selectCurrentCurrencyInfo);
  const currencyLower = currency.toLowerCase();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-700 pb-4 transition-colors">
        <img
          src={coin.image?.large}
          alt={coin.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            {coin.name}
            {isFetching && (
              <span className="text-sm text-slate-500 dark:text-slate-400 ml-2 font-normal">
                (updating...)
              </span>
            )}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 uppercase text-sm">
            {coin.symbol}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Current Price"
          value={`${currencySymbol}${coin.market_data?.current_price?.[
            currencyLower
          ]?.toLocaleString()}`}
        />

        <StatCard
          label="Market Cap"
          value={`${currencySymbol}${coin.market_data?.market_cap?.[
            currencyLower
          ]?.toLocaleString()}`}
        />

        <StatCard
          label="24h Volume"
          value={`${currencySymbol}${coin.market_data?.total_volume?.[
            currencyLower
          ]?.toLocaleString()}`}
        />

        <StatCard
          label="24h Change"
          value={
            <span
              className={
                (coin.market_data?.price_change_percentage_24h ?? 0) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {(coin.market_data?.price_change_percentage_24h ?? 0) >= 0
                ? "+"
                : ""}
              {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          }
        />

        <StatCard label="Market Cap Rank" value={`#${coin.market_cap_rank}`} />

        <StatCard
          label="Circulating Supply"
          value={coin.market_data?.circulating_supply?.toLocaleString(
            undefined,
            {
              maximumFractionDigits: 0,
            }
          )}
        />
      </div>

      {coin.description?.en && (
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 transition-colors">
            About {coin.name}
          </h2>
          <div
            className="text-slate-700 dark:text-slate-300 leading-relaxed transition-colors"
            dangerouslySetInnerHTML={{
              __html:
                coin.description.en.split(". ").slice(0, 3).join(". ") + ".",
            }}
          />
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 transition-colors">
          Additional Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {coin.market_data?.high_24h?.[currencyLower] && (
            <KeyValueRow
              label="24h High"
              value={`${currencySymbol}${coin.market_data.high_24h[
                currencyLower
              ].toLocaleString()}`}
            />
          )}
          {coin.market_data?.low_24h?.[currencyLower] && (
            <KeyValueRow
              label="24h Low"
              value={`${currencySymbol}${coin.market_data.low_24h[
                currencyLower
              ].toLocaleString()}`}
            />
          )}
          {coin.market_data?.ath?.[currencyLower] && (
            <KeyValueRow
              label="All-Time High"
              value={`${currencySymbol}${coin.market_data.ath[
                currencyLower
              ].toLocaleString()}`}
            />
          )}
          {coin.market_data?.atl?.[currencyLower] && (
            <KeyValueRow
              label="All-Time Low"
              value={`${currencySymbol}${coin.market_data.atl[
                currencyLower
              ].toLocaleString()}`}
            />
          )}
        </div>
      </div>

      {(coin.links?.homepage?.[0] || coin.links?.blockchain_site?.[0]) && (
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 transition-colors">
            Links
          </h2>
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
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
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
