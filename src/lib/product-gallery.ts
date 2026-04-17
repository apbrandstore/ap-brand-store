import type { ProductDetail } from "@/types/product";

const PLACEHOLDER = "/placeholders/hero.svg";

/**
 * Builds the full gallery URL list for the PDP.
 *
 * Many APIs set `image_url` to the cover and `images` to additional shots only (so using
 * `images` alone drops the first). Others repeat the cover in `images[0]`. We prepend
 * `image_url` when it is not already present, sort by `order`, and dedupe identical URLs.
 */
export function buildProductGalleryImageUrls(product: Pick<ProductDetail, "image_url" | "images">): string[] {
  const sorted = [...product.images].sort(
    (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0),
  );
  const fromImages = sorted
    .map((img) => img.image_url?.trim())
    .filter((u): u is string => Boolean(u));

  const main = product.image_url?.trim() ?? "";

  if (fromImages.length === 0) {
    return main ? [main] : [PLACEHOLDER];
  }

  const seen = new Set<string>();
  const out: string[] = [];
  const pushUnique = (url: string) => {
    const key = url.trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push(key);
  };

  const mainInGallery = main && fromImages.some((u) => u === main);

  if (main && !mainInGallery) {
    pushUnique(main);
  }
  for (const u of fromImages) {
    pushUnique(u);
  }

  return out.length > 0 ? out : [PLACEHOLDER];
}
