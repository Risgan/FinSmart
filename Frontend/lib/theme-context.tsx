"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ColorTheme = "teal" | "purple" | "blue" | "orange"

interface ThemeContextType {
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>("teal")

  useEffect(() => {
    const saved = localStorage.getItem("color-theme") as ColorTheme
    if (saved) {
      setColorTheme(saved)
      document.documentElement.setAttribute("data-color-theme", saved)
    }
  }, [])

  const handleSetColorTheme = (theme: ColorTheme) => {
    setColorTheme(theme)
    localStorage.setItem("color-theme", theme)
    document.documentElement.setAttribute("data-color-theme", theme)
  }

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme: handleSetColorTheme }}>{children}</ThemeContext.Provider>
  )
}

export function useColorTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider")
  }
  return context
}
