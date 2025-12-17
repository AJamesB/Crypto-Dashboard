import type { FC, ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: ReactNode;
  className?: string;
}

/**
 * StatCard - Displays a labeled statistic in a card
 *
 * @param label - The label for the statistic
 * @param value - The statistic value to display
 * @param className - Additional CSS classes for styling
 */
export const StatCard: FC<StatCardProps> = ({
  label,
  value,
  className = "",
}) => {
  return (
    <div className={`p-4 bg-slate-50 rounded-lg ${className}`}>
      <p className="text-sm text-slate-600 mb-1">{label}</p>
      <div className="text-2xl font-bold font-mono">{value}</div>
    </div>
  );
};
