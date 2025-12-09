import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <section className={`bg-white rounded-md shadow-sm p-6 ${className}`}>
      {children}
    </section>
  );
};
