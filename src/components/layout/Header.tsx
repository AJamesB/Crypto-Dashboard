import type { ReactNode } from "react";
import { Container } from "..";

interface HeaderProps {
  children: ReactNode;
}

/**
 * Header - The main header component for the application
 *
 * @param children - The content to be displayed inside the header
 */
export const Header = ({ children }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm dark:shadow-slate-700/20 transition-colors">
      <Container className="py-4 flex items-center justify-between">
        {children}
      </Container>
    </header>
  );
};
