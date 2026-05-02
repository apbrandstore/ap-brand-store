import Image from "next/image";

import { Link } from "@/i18n/routing";
import { storefrontImageUnoptimized } from "@/lib/storefront-image";

type ProductCardGalleryProps = {
  urls: string[];
  alt: string;
  href: string;
  priority?: boolean;
};

export function ProductCardGallery({ urls, alt, href, priority }: ProductCardGalleryProps) {
  const src =
    urls.find((u) => typeof u === "string" && u.trim().length > 0)?.trim() ?? "/placeholders/hero.svg";
  const unoptimized = storefrontImageUnoptimized(src);

  return (
    <div className="relative aspect-square w-full shrink-0 border border-border bg-card">
      <Link
        href={href}
        className="relative block size-full bg-card outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground/15"
        aria-label={alt}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="block object-contain object-center mix-blend-multiply [-webkit-user-drag:none]"
          unoptimized={unoptimized}
          priority={priority}
          loading={priority ? "eager" : undefined}
          draggable={false}
        />
      </Link>
    </div>
  );
}
