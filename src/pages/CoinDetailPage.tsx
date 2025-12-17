import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCoinDetails } from "../hooks/useCoinDetails";
import { useCoinMarketChart } from "../hooks/useCoinMarketChart";
import {
  CoinDetails,
  CoinChart,
  Container,
  Card,
  LoadingState,
  ErrorMessage,
  Select,
  TIME_RANGES,
} from "../components";

/**
 * CoinDetailPage - Page component to display detailed information about a specific coin
 */
export default function CoinDetailPage() {
  const { coinId } = useParams<{ coinId: string }>();
  const [timeRange, setTimeRange] = useState<number | "max">(1); // Default to 24 hours

  const { data, isLoading, error, refetch } = useCoinDetails(coinId);

  const {
    data: chartData,
    isLoading: isChartLoading,
    isFetching: isChartFetching,
    error: chartError,
    refetch: refetchChart,
  } = useCoinMarketChart(coinId, timeRange);

  return (
    <Container className="py-8">
      {/* Back Link */}
      <div className="mb-4">
        <Link
          to="/"
          className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
        >
          &larr; Back to list
        </Link>
      </div>

      <div className="space-y-6">
        {/* Coin Details Card */}
        <Card>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-4">
              Coin Details
            </h2>

            {/* Coin Details Error State */}
            {error && (
              <ErrorMessage message={error.message} onRetry={() => refetch()} />
            )}

            {/* Coin Details */}
            {!error && data && <CoinDetails coin={data} />}

            {/* Coin Details Loading State (initial load) */}
            {isLoading && !data && (
              <div className="min-h-[400px] flex items-center justify-center">
                <LoadingState message="Loading coin details..." />
              </div>
            )}
          </div>
        </Card>

        {/* Historical Chart Card */}
        <Card>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Historical Data
              </h2>

              {/* Time Range Selector */}
              <Select
                id="timeRange"
                label="Time Range:"
                value={timeRange}
                onChange={(value) =>
                  setTimeRange(value === "max" ? "max" : Number(value))
                }
                options={TIME_RANGES}
                disabled={isChartFetching}
              />
            </div>

            {/* Chart Error State */}
            {chartError && (
              <ErrorMessage
                message={chartError.message}
                onRetry={() => refetchChart()}
              />
            )}

            {/* Chart */}
            {!chartError && chartData && (
              <CoinChart data={chartData} isFetching={isChartFetching} />
            )}

            {/* Chart Loading State (initial load) */}
            {isChartLoading && !chartData && (
              <div className="h-[400px] flex items-center justify-center">
                <LoadingState message="Loading chart data..." />
              </div>
            )}
          </div>
        </Card>
      </div>
    </Container>
  );
}
