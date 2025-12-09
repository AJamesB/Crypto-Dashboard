import type { ReactNode } from "react";
import { Container } from "./Container";

interface HeaderProps {
  children: ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <Container className="py-4 flex items-center justify-between">
        {children}
      </Container>
    </header>
  );
};
