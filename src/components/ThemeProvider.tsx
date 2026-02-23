"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";
interface ThemeCtx { theme: Theme; toggleTheme: () => void; }
const ThemeContext = createContext<ThemeCtx>({ theme: "light", toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === "light" ? "dark" : "light";
      if (next === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      return next;
    });
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
