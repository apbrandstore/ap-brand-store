"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

import { useVariantSelection } from "@/components/product/product-variant-selection";
import { cn } from "@/lib/utils";

export function ProductDetailSkuRow() {
  const tDetail = useTranslations("productDetail");
  const { variants, selectedVariant } = useVariantSelection();
  const [skuCopied, setSkuCopied] = useState(false);
  const copySkuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    return () => {
      if (copySkuTimerRef.current) clearTimeout(copySkuTimerRef.current);
    };
  }, []);

  async function copySkuToClipboard(sku: string) {
    try {
      await navigator.clipboard.writeText(sku);
      setSkuCopied(true);
      if (copySkuTimerRef.current) clearTimeout(copySkuTimerRef.current);
      copySkuTimerRef.current = setTimeout(() => {
        setSkuCopied(false);
        copySkuTimerRef.current = null;
      }, 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  if (skuDisplay.mode === "none") return null;

  if (skuDisplay.mode === "prompt") {
    return (
      <p className="mt-2 text-xs font-normal text-neutral-500">
        {tDetail("skuSelectOptions")}
      </p>
    );
  }

  const copyHint = tDetail("copySku");

  return (
    <button
      type="button"
      title={copyHint}
      onClick={() => copySkuToClipboard(skuDisplay.sku)}
      aria-label={`${skuDisplay.sku}. ${copyHint}`}
      className={cn(
        "group mt-2 inline-flex max-w-full cursor-pointer items-center gap-1.5 rounded-sm text-left text-xs tabular-nums text-neutral-600 outline-none transition-colors",
        "hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-1",
      )}
    >
      <span className="min-w-0 truncate">{skuDisplay.sku}</span>
      {skuCopied ? (
        <Check className="size-3.5 shrink-0 text-success" strokeWidth={2.5} aria-hidden />
      ) : null}
    </button>
  );
}
