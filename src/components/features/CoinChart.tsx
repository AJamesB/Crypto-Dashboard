import { useState, useMemo, useCallback } from "react";
import type { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { selectCurrentCurrencyInfo } from "../../store/currencySlice";
import type { HistoricalChartData, ChartDataPoint } from "../../types";
import { Select, EmptyState, ChartTooltip, Spinner } from "..";

interface CoinChartProps {
  data: HistoricalChartData;
  isFetching?: boolean;
}

// Chart data type options
const DATA_TYPES = [
  { value: "prices" as const, label: "Price" },
  { value: "market_caps" as const, label: "Market Cap" },
  { value: "total_volumes" as const, label: "Volume" },
];

// Time range options
const TIME_RANGES = [
  { value: 1, label: "24 Hours" },
  { value: 7, label: "7 Days" },
  { value: 30, label: "30 Days" },
  { value: 90, label: "90 Days" },
  { value: 180, label: "180 Days" },
  { value: 365, label: "1 Year" },
  { value: "max" as const, label: "Max" },
];

export { TIME_RANGES };

/**
 * CoinChart - Component to display historical price data with interactive controls
 *
 * @param data - Historical chart data
 * @param isFetching - Optional flag to indicate loading/refreshing state
 */
export const CoinChart: FC<CoinChartProps> = ({ data, isFetching = false }) => {
  const [dataType, setDataType] = useState<keyof HistoricalChartData>("prices");
  const { symbol: currencySymbol } = useSelector(selectCurrentCurrencyInfo);

  // Transform the data for the chart
  const chartData: ChartDataPoint[] = useMemo(() => {
    if (!data || !data[dataType]) return [];

    return data[dataType].map(([timestamp, value]) => ({
      timestamp,
      date: new Date(timestamp).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
      value,
    }));
  }, [data, dataType]);

  const formatValue = useCallback(
    (value: number) => {
      if (dataType === "prices") {
        return `${currencySymbol}${value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      }

      return `${currencySymbol}${value.toLocaleString(undefined, {
        notation: "compact",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
    [dataType, currencySymbol]
  );

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <Select
          id="dataType"
          label="Data Type:"
          value={dataType}
          onChange={(value) => setDataType(value as keyof HistoricalChartData)}
          options={DATA_TYPES}
          disabled={isFetching}
        />
      </div>

      {/* Chart */}
      <div className="w-full h-[400px] bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 transition-colors">
        {isFetching ? (
          <div className="flex items-center justify-center h-full gap-2">
            <Spinner size={24} />
            <p className="text-slate-600 dark:text-slate-400">
              Loading chart data...
            </p>
          </div>
        ) : chartData.length === 0 ? (
          <EmptyState message="No data available" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#cbd5e1"
                className="dark:stroke-slate-600"
              />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                style={{ fontSize: "12px" }}
                tick={{ fill: "#64748b" }}
              />
              <YAxis
                stroke="#64748b"
                style={{ fontSize: "12px" }}
                tick={{ fill: "#64748b" }}
                tickFormatter={(value) =>
                  value.toLocaleString(undefined, {
                    notation: "compact",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                  })
                }
              />
              <Tooltip content={<ChartTooltip formatter={formatValue} />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
