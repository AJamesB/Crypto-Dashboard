import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}
/**
 * Card - A reusable card component with padding and shadow
 *
 * @param children - The content to be displayed inside the card
 * @param className - Additional CSS classes for styling
 */
export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <section
      className={`bg-white dark:bg-slate-800 rounded-md shadow-sm dark:shadow-slate-700/20 p-6 transition-colors ${className}`}
    >
      {children}
    </section>
  );
};
