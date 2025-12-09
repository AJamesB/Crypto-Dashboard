import type { FC } from "react";
import { useTopCoins } from "../hooks/useTopCoins";

const TopCoinsList: FC = () => {
  const { data, isLoading, error, isFetching } = useTopCoins({
    perPage: 10,
    refetchIntervalMs: 0,
  });

  if (isLoading) {
    return (
      <div className="text-center py-8 text-slate-600">
        Loading top coins…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600 bg-red-50 rounded-md p-4">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
        Top 10 by Market Cap{" "}
        {isFetching && (
          <span className="text-sm text-slate-500">(updating...)</span>
        )}
      </h2>

      <ol className="space-y-3">
        {data?.map((c, index) => (
          <li
            key={c.id}
            className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {/* Left side: Rank, name, and symbol */}
            <div className="flex items-center gap-3">
              <span className="text-slate-500 font-medium w-6">
                {index + 1}
              </span>
              <strong className="text-slate-900">{c.name}</strong>
              <span className="text-xs text-slate-500 uppercase">
                {c.symbol}
              </span>
            </div>

            {/* Right side: Price */}
            <span className="text-slate-900 font-mono font-medium">
              $
              {c.current_price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
              })}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopCoinsList;
