/**
 * Production API host baked into Paperbase tracker.js.
 * tracker.js calls are proxied through /api/tracker in development (no extra browser env).
 */
export const PAPERBASE_PRODUCTION_API_ORIGIN = "https://api.paperbase.me";

/**
 * Returns the local URL prefix that the fetch shim should use for tracker calls.
 * In development, points at the Next.js proxy route.
 */
export function getBrowserPaperbaseBackendOrigin(): string | null {
  if (process.env.NODE_ENV === "development") {
    return "/api/tracker";
  }
  return null;
}

/**
 * Rewrites hardcoded production API URLs for the fetch shim.
 * Maps ANY https://api.paperbase.me/* → /api/tracker/* in dev.
 */
export function rewritePaperbaseProductionFetchUrl(inputUrl: string, rewriteOrigin: string): string {
  if (!inputUrl.startsWith(PAPERBASE_PRODUCTION_API_ORIGIN)) {
    return inputUrl;
  }
  const remainder = inputUrl.slice(PAPERBASE_PRODUCTION_API_ORIGIN.length);
  return `/api/tracker${remainder}`;
}