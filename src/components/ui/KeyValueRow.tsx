import type { FC, ReactNode } from "react";

interface KeyValueRowProps {
  label: string;
  value: ReactNode;
  className?: string;
}

/**
 * KeyValueRow - Displays a key-value pair in a horizontal row
 *
 * @param label - The label or key to display
 * @param value - The corresponding value to display
 * @param className - Additional CSS classes for styling
 */
export const KeyValueRow: FC<KeyValueRowProps> = ({
  label,
  value,
  className = "",
}) => {
  return (
    <div
      className={`flex justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded transition-colors ${className}`}
    >
      <span className="text-slate-600 dark:text-slate-400">{label}</span>
      <span className="font-mono font-medium text-slate-900 dark:text-slate-100">
        {value}
      </span>
    </div>
  );
};
