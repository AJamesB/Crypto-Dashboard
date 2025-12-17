import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Container } from "..";

interface HeaderProps {
  children: ReactNode;
}

/**
 * Header - The main header component for the application
 * Features sticky positioning that hides on scroll down and shows on scroll up
 *
 * @param children - The content to be displayed inside the header
 */
export const Header = ({ children }: HeaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  /**
   * Handle scroll events to show/hide header
   * Hides when scrolling down, shows when scrolling up
   * Ignores elastic scroll bounce at page bottom
   */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const isAtBottom =
        window.innerHeight + currentScrollY >=
        document.documentElement.scrollHeight - 10;

      if (isAtBottom) {
        return;
      }

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-40
        bg-white dark:bg-slate-800 shadow-sm dark:shadow-slate-700/20 
        transition-all duration-300
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <Container className="py-4 flex items-center justify-between">
        {children}
      </Container>
    </header>
  );
};
