import type { FC } from "react";

interface EmptyStateProps {
  message: string;
  className?: string;
}

/**
 * EmptyState - Component to display when no data is available
 *
 * @param message - Message to display
 * @param className - Additional CSS classes
 */
export const EmptyState: FC<EmptyStateProps> = ({
  message,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-center h-full text-slate-600 dark:text-slate-400 ${className}`}
    >
      <p>{message}</p>
    </div>
  );
};
