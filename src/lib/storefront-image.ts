const PLACEHOLDER = "/placeholders/hero.svg";

/**
 * Resolves cart / product image URLs for the browser.
 */
export function resolveStorefrontImageUrl(url: string | null | undefined): string {
  const raw = url?.trim();
  if (!raw) {
    return PLACEHOLDER;
  }
  if (raw.startsWith("//")) {
    return `https:${raw}`;
  }
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }
  if (raw.startsWith("/")) {
    if (raw.startsWith("/placeholders/")) {
      return raw;
    }
    // Paperbase returns absolute `http(s)://` media URLs in practice; host-relative paths are unsupported here.
    return PLACEHOLDER;
  }
  return raw;
}

/** Keep unoptimized only for schemes unsupported by the optimizer proxy. */
export function storefrontImageUnoptimized(resolvedUrl: string): boolean {
  const value = resolvedUrl.trim().toLowerCase();
  if (!value) {
    return true;
  }
  // Keep optimizer off only for schemes Next/Image optimizer cannot proxy.
  return value.startsWith("data:") || value.startsWith("blob:");
}
