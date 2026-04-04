import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    primary: string;
    text: string;
    textSecondary: string;
    border: string;
    cardGradient: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('myfleet-theme');
    return (saved as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('myfleet-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const colors = theme === 'dark' 
    ? {
        background: '#050404',
        surface: '#2E1C2B',
        primary: '#4A1942',
        text: '#EAEAEA',
        textSecondary: 'rgba(234, 234, 234, 0.6)',
        border: 'rgba(234, 234, 234, 0.1)',
        cardGradient: 'linear-gradient(135deg, #2E1C2B 0%, rgba(46, 28, 43, 0.8) 100%)',
      }
    : {
        background: '#F5F5F7',
        surface: '#FFFFFF',
        primary: '#4A1942',
        text: '#1D1D1F',
        textSecondary: 'rgba(29, 29, 31, 0.6)',
        border: 'rgba(0, 0, 0, 0.1)',
        cardGradient: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%)',
      };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
