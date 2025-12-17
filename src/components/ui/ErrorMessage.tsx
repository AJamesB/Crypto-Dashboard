import type { FC } from "react";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

/**
 * ErrorMessage - Displays an error message in a styled container
 *
 * @param message - The error message to display
 * @param className - Additional CSS classes for styling
 */
export const ErrorMessage: FC<ErrorMessageProps> = ({
  message,
  className = "",
}) => {
  return (
    <div
      className={`text-center py-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md p-4 transition-colors ${className}`}
    >
      Error: {message}
    </div>
  );
};
