"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: string[];
  productName: string;
  /** When set, shows a sale badge on the main image (e.g. 15 for "-15%") */
  discountPercent?: number | null;
};

const FALLBACK = "/placeholders/hero.svg";

export function ProductGallery({ images, productName, discountPercent }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [failedIndices, setFailedIndices] = useState<Record<number, true>>({});

  const safeImages = images.length > 0 ? images : [FALLBACK];
  const safeActive = Math.min(active, safeImages.length - 1);

  const getImageSrc = (src: string, index: number) => (failedIndices[index] ? FALLBACK : src);

  const handleError = (index: number) => {
    setFailedIndices((prev) => ({ ...prev, [index]: true }));
  };

  const mainSrc = getImageSrc(safeImages[safeActive] ?? FALLBACK, safeActive);

  return (
    <div className="flex gap-3 sm:gap-4">
      {/* Thumbnail strip */}
      <div className="flex w-[4.5rem] shrink-0 flex-col gap-2 overflow-y-auto pb-1 sm:w-[5rem]">
        {safeImages.map((src, i) => (
          <button
            key={`thumb-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={i === safeActive ? "true" : undefined}
            className={cn(
              "relative aspect-square w-full shrink-0 overflow-hidden rounded-lg bg-white transition-all duration-150",
              i === safeActive
                ? "shadow-md ring-2 ring-primary ring-offset-1"
                : "shadow-sm ring-1 ring-neutral-200 hover:ring-neutral-300",
            )}
          >
            <Image
              src={getImageSrc(src, i)}
              alt=""
              fill
              sizes="80px"
              unoptimized
              className="object-contain"
              onError={() => handleError(i)}
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-neutral-100">
        {discountPercent != null && discountPercent > 0 ? (
          <div className="absolute start-3 top-3 z-10 rounded-sm bg-primary px-2.5 py-1 text-xs font-bold text-white shadow-sm">
            -{discountPercent}%
          </div>
        ) : null}

        <div className="relative aspect-square w-full">
          <Image
            key={safeActive}
            src={mainSrc}
            alt={productName}
            fill
            priority
            unoptimized
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 42vw"
            className="object-contain"
            onError={() => handleError(safeActive)}
          />
        </div>
      </div>
    </div>
  );
}
