import type { FC } from "react";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

/**
 * LoadingState - Displays a centered loading message
 *
 * @param message - The loading message to display (default: "Loading...")
 * @param className - Additional CSS classes for styling
 */
export const LoadingState: FC<LoadingStateProps> = ({
  message = "Loading...",
  className = "",
}) => {
  return (
    <div className={`text-center py-8 text-slate-600 ${className}`}>
      {message}
    </div>
  );
};
