import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}
/**
 * Container - A container that centers content and limits max width
 *
 * @param children - The content to be displayed inside the container
 * @param className - Additional CSS classes for styling
 */
export const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`max-w-5xl mx-auto px-4 ${className}`}>{children}</div>
  );
};
