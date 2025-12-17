import type { FC } from "react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  id: string;
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  className?: string;
}

/**
 * Select - Reusable dropdown select component
 *
 * @param id - Unique identifier for the select element
 * @param label - Optional label text displayed before the select
 * @param value - Currently selected value
 * @param onChange - Callback function when selection changes
 * @param options - Array of options to display
 * @param disabled - Whether the select is disabled
 * @param className - Additional CSS classes for the container
 */
export const Select: FC<SelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
