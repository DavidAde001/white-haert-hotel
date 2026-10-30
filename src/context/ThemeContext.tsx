import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDesktopMode: boolean;
  toggleDesktopMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: defaults to 'dark'
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('whh_theme_mode');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  // Desktop mode: Mobile and tablet screens (< 1024px) default to responsive mobile/tablet view
  const [isDesktopMode, setIsDesktopMode] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const isMobileOrTablet = window.innerWidth < 1024;
        const saved = localStorage.getItem('whh_desktop_view_mode_v4');
        if (saved !== null) {
          return saved === 'true';
        }
        // Default to false for mobile and tablet so they are 100% responsive fluid
        return !isMobileOrTablet;
      }
      return false;
    } catch {
      return false;
    }
  });

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    try {
      localStorage.setItem('whh_theme_mode', theme);
    } catch {
      // ignore in iframe
    }
  }, [theme]);

  // Apply desktop mode attribute and viewport meta tag
  useEffect(() => {
    try {
      localStorage.setItem('whh_desktop_view_mode_v4', String(isDesktopMode));
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (isDesktopMode) {
        document.documentElement.setAttribute('data-view-mode', 'desktop');
        if (viewportMeta) {
          const screenW = typeof window !== 'undefined' ? window.innerWidth : 375;
          const initialScale = screenW < 1024 ? Math.max(0.35, screenW / 1100).toFixed(2) : '1.0';
          viewportMeta.setAttribute(
            'content',
            `width=1100, initial-scale=${initialScale}, minimum-scale=0.25, maximum-scale=5.0, user-scalable=yes`
          );
        }
      } else {
        document.documentElement.removeAttribute('data-view-mode');
        if (viewportMeta) {
          viewportMeta.setAttribute(
            'content',
            'width=device-width, initial-scale=1.0, maximum-scale=5.0'
          );
        }
      }
    } catch {
      // localStorage may fail in restricted iframes
    }
  }, [isDesktopMode]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleDesktopMode = () => {
    setIsDesktopMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isDesktopMode,
        toggleDesktopMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
