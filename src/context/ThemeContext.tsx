import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  statusBarStyle: "light" | "dark";
}

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
  isDark: boolean;
}

const darkColors: ThemeColors = {
  background: "#050404",
  surface: "#2E1C2B",
  primary: "#4A1942",
  text: "#EAEAEA",
  textSecondary: "rgba(234, 234, 234, 0.6)",
  textMuted: "rgba(234, 234, 234, 0.4)",
  border: "rgba(234, 234, 234, 0.1)",
  statusBarStyle: "light",
};

const lightColors: ThemeColors = {
  background: "#F5F5F7",
  surface: "#FFFFFF",
  primary: "#4A1942",
  text: "#1D1D1F",
  textSecondary: "rgba(29, 29, 31, 0.6)",
  textMuted: "rgba(29, 29, 31, 0.4)",
  border: "rgba(0, 0, 0, 0.1)",
  statusBarStyle: "dark",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const colors = theme === "dark" ? darkColors : lightColors;
  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
