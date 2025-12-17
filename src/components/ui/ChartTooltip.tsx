import type { FC } from "react";

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  formatter?: (value: number) => string;
}

/**
 * ChartTooltip - Custom tooltip component for Recharts
 *
 * @param active - Whether the tooltip is active
 * @param payload - Data payload from Recharts
 * @param formatter - Optional function to format the value
 */
export const ChartTooltip: FC<ChartTooltipProps> = ({
  active,
  payload,
  formatter,
}) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0].payload;
  const value = payload[0].value;

  return (
    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 transition-colors">
      <p className="text-sm text-slate-600 dark:text-slate-400">{data.date}</p>
      <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {formatter ? formatter(value) : value}
      </p>
    </div>
  );
};
