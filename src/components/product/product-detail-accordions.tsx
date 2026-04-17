"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export type AccordionItem = {
  id: string;
  title: string;
  /** Plain text body when `bulletParagraphs` is not used */
  body: string;
};

type ProductDetailAccordionsProps = {
  items: AccordionItem[];
  /** When set, the matching item id renders as a bullet list instead of `body` */
  bulletParagraphs?: string[];
  bulletItemId?: string;
  defaultOpenId?: string | null;
};

export function ProductDetailAccordions({
  items,
  bulletParagraphs,
  bulletItemId = "product-details",
  defaultOpenId = bulletItemId,
}: ProductDetailAccordionsProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="divide-y divide-neutral-100 rounded-lg border border-neutral-100">
      {items.map((item) => {
        const open = openId === item.id;
        const bullets =
          bulletParagraphs && item.id === bulletItemId
            ? bulletParagraphs.filter((p) => p.trim().length > 0)
            : null;

        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-start transition-colors hover:bg-neutral-50"
            >
              <span className="text-sm font-bold uppercase tracking-widest text-text">
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-neutral-400 transition-transform duration-200",
                  open && "rotate-180 text-primary",
                )}
                strokeWidth={2.5}
                aria-hidden
              />
            </button>

            {open ? (
              <div className="px-4 pb-4 pt-0.5">
                {bullets?.length ? (
                  <ul className="list-disc space-y-2 ps-4 text-sm leading-relaxed text-neutral-600 marker:text-primary">
                    {bullets.map((paragraph, index) => (
                      <li key={index}>{paragraph}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-relaxed text-neutral-600">{item.body}</p>
                )}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
