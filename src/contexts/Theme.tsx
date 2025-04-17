import { createContext, useState } from 'react'
import { Theme } from '../models/Themes'

const DEFAULT_CONTEXT = {
  themeMode: Theme.DYNAMIC,
  setThemeMode: () => {},
}

export const ThemeContext = createContext<ThemeContextType>(DEFAULT_CONTEXT)

export interface ThemeContextType {
  themeMode: Theme
  setThemeMode: (newTheme: Theme) => void
}

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<Theme>(Theme.DYNAMIC)

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
