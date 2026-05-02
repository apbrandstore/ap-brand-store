import type { ResolvedPalette } from "./ThemeContext"

/**
 * Applies palette tokens as CSS custom properties on :root.
 * Keys from the API are already CSS variable names (with hyphens).
 * e.g. "primary-foreground" → "--primary-foreground"
 * One system. No mapping. No dual variables.
 */
export function applyTheme(palette: ResolvedPalette): void {
  if (typeof document === "undefined") return
  const root = document.documentElement
  Object.entries(palette).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value)
  })
}
