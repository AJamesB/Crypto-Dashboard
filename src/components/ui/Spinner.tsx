import type { FC } from "react";

interface SpinnerProps {
  size?: number;
  className?: string;
}

/**
 * Spinner - Animated loading spinner component.
 *
 * @param size - Size of the spinner in pixels (default: 24)
 * @param className - Additional CSS classes for styling
 */
export const Spinner: FC<SpinnerProps> = ({ size = 24, className = "" }) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-slate-300 dark:border-slate-600 border-t-blue-600 dark:border-t-blue-400 ${className}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
