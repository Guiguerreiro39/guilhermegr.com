"use client";

import { createContext, useContext, useState } from "react";

export type Theme = "base" | "japanese" | "retro";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  slowTheme: Theme;
  fastTheme: Theme;
  themeHasChanged: boolean;
  changeTheme: (theme: Theme, callback?: () => void) => void;
};

const initialState: ThemeProviderState = {
  slowTheme: "base",
  fastTheme: "base",
  themeHasChanged: false,
  changeTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [slowTheme, setSlowTheme] = useState<Theme>("base");
  const [fastTheme, setFastTheme] = useState<Theme>("base");
  const [themeHasChanged, setThemeHasChanged] = useState(false);

  const handleThemeChange = (theme: Theme, callback?: () => void) => {
    setTimeout(() => {
      setSlowTheme(theme);
      callback?.();
    }, 1000);

    setFastTheme(theme);
    setThemeHasChanged(true);
  };

  const value: ThemeProviderState = {
    slowTheme,
    fastTheme,
    themeHasChanged,
    changeTheme: handleThemeChange,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
