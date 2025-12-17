import type { FC } from "react";
import { Spinner } from "..";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

/**
 * LoadingState - Displays a centered loading message with animated spinner
 *
 * @param message - The loading message to display (default: "Loading...")
 * @param className - Additional CSS classes for styling
 */
export const LoadingState: FC<LoadingStateProps> = ({
  message = "Loading...",
  className = "",
}) => {
  return (
    <div className={`text-center py-8 ${className}`}>
      <div className="flex flex-col items-center gap-3">
        <Spinner size={32} />
        <p className="text-slate-600">{message}</p>
      </div>
    </div>
  );
};
