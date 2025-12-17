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
      className={`text-center py-8 text-red-600 bg-red-50 rounded-md p-4 ${className}`}
    >
      Error: {message}
    </div>
  );
};
