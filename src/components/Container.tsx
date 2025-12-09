import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`max-w-5xl mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
};
