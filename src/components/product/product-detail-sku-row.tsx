"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { useVariantSelection } from "@/components/product/product-variant-selection";

export function ProductDetailSkuRow() {
  const tDetail = useTranslations("productDetail");
  const { variants, selectedVariant } = useVariantSelection();

  const skuDisplay = useMemo(() => {
    if (variants.length === 0) return { mode: "none" as const };
    const only = variants[0];
    if (variants.length === 1 && only.sku?.trim()) {
      return { mode: "value" as const, sku: only.sku.trim() };
    }
    if (variants.length > 1) {
      const sku = selectedVariant?.sku?.trim();
      if (sku) return { mode: "value" as const, sku };
      return { mode: "prompt" as const };
    }
    return { mode: "none" as const };
  }, [variants, selectedVariant]);

  if (skuDisplay.mode === "none") return null;

  if (skuDisplay.mode === "prompt") {
    return (
      <p className="mt-2 text-xs font-normal text-neutral-500">
        {tDetail("skuSelectOptions")}
      </p>
    );
  }

  return (
    <p className="mt-2 text-xs tabular-nums text-neutral-600">
      {skuDisplay.sku}
    </p>
  );
}
