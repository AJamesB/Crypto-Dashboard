import type { FC } from "react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * ErrorMessage - Displays an error message in a styled container
 *
 * @param message - The error message to display
 * @param onRetry - Optional callback function to retry the failed action
 * @param className - Additional CSS classes for styling
 */
export const ErrorMessage: FC<ErrorMessageProps> = ({
  message,
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={`text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md p-4 transition-colors ${className}`}
    >
      <p className="mb-3">Error: {message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
