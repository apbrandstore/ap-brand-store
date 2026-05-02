/**
 * Inline script + ThemeProvider must stay aligned — bump version when cache shape changes.
 * `data-theme-mode` is derived from `resolved_palette.header` (fallback: `background`) in applyTheme + FOUC.
 */
export const THEME_CACHE_VERSION = "v3";
export const THEME_LS_KEY = "sf_theme_cache";
export const THEME_LS_VERSION_KEY = "sf_theme_cache_version";
