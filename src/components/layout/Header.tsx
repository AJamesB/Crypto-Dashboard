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
    <header className="bg-white shadow-sm">
      <Container className="py-4 flex items-center justify-between">
        {children}
      </Container>
    </header>
  );
};
