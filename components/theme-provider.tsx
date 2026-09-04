"use client"

import * as React from "react"

type Theme = "dark" | "light" | "system"

function getTheme(): Theme {
  if (typeof window === "undefined") return "system"
  try {
    return (localStorage.getItem("theme") as Theme) || "system"
  } catch {
    return "system"
  }
}

function getResolvedTheme(theme: Theme): "dark" | "light" {
  if (theme !== "system") return theme
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(theme: Theme) {
  const resolved = getResolvedTheme(theme)
  const html = document.documentElement
  html.classList.remove("dark", "light")
  html.classList.add(resolved)
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(() => getTheme())
  const [resolvedTheme, setResolvedTheme] = React.useState<"dark" | "light">(
    () => getResolvedTheme(getTheme())
  )

  React.useEffect(() => {
    applyTheme(theme)
    setResolvedTheme(getResolvedTheme(theme))
  }, [theme])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) return
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (!event.key || event.key.toLowerCase() !== "d") return
      if (
        document.activeElement instanceof HTMLElement &&
        (document.activeElement.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName))
      )
        return
      setThemeState(resolvedTheme === "dark" ? "light" : "dark")
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [resolvedTheme])

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)")
    function handler() {
      if (getTheme() === "system") applyTheme("system")
    }
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  function setTheme(next: Theme) {
    setThemeState(next)
    try {
      localStorage.setItem("theme", next)
    } catch {}
  }

  return <>{children}</>
}

export { ThemeProvider }
export type { Theme }
export function useTheme() {
  const [resolvedTheme, setResolvedTheme] = React.useState<"dark" | "light">("light")
  return { resolvedTheme, setTheme: () => {} }
}
