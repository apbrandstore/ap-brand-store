"use client";

import { useEffect, useMemo } from "react";
import useSWR from "swr";

import { ThemeContext, type ThemeConfig } from "./ThemeContext";
import { applyTheme } from "./applyTheme";
import { THEME_CACHE_VERSION, THEME_LS_KEY, THEME_LS_VERSION_KEY } from "./themeCacheKeys";

export const STOREFRONT_THEME_SWR_KEY = "/api/v1/theming";

type ThemeApiResponse = {
  palette: string;
  resolved_palette: ThemeConfig["resolved_palette"];
};

function readLocalFallback(): ThemeApiResponse | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const cached = localStorage.getItem(THEME_LS_KEY);
    const version = localStorage.getItem(THEME_LS_VERSION_KEY);
    if (version !== THEME_CACHE_VERSION) {
      localStorage.removeItem(THEME_LS_KEY);
      localStorage.removeItem(THEME_LS_VERSION_KEY);
      return undefined;
    }
    if (!cached) return undefined;
    return JSON.parse(cached) as ThemeApiResponse;
  } catch {
    return undefined;
  }
}

async function fetchTheme(): Promise<ThemeApiResponse> {
  const res = await fetch(STOREFRONT_THEME_SWR_KEY, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `theme_fetch_${res.status}`);
  }
  return res.json() as Promise<ThemeApiResponse>;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const fallbackData = useMemo(() => readLocalFallback(), []);

  const { data } = useSWR(STOREFRONT_THEME_SWR_KEY, fetchTheme, {
    dedupingInterval: 5 * 60 * 1000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    fallbackData,
    shouldRetryOnError: true,
    errorRetryCount: 2,
  });

  const themeValue: ThemeConfig | null = useMemo(() => {
    if (!data?.palette || !data?.resolved_palette) return null;
    return {
      palette: data.palette,
      resolved_palette: data.resolved_palette,
    };
  }, [data]);

  useEffect(() => {
    if (data) {
      try {
        localStorage.setItem(THEME_LS_KEY, JSON.stringify(data));
        localStorage.setItem(THEME_LS_VERSION_KEY, THEME_CACHE_VERSION);
      } catch {
        /* ignore quota */
      }
      if (data.resolved_palette) {
        applyTheme(data.resolved_palette);
      }
      return;
    }
    const fb = readLocalFallback();
    if (fb?.resolved_palette) applyTheme(fb.resolved_palette);
  }, [data]);

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
}
