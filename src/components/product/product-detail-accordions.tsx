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
  /** Bullet list per accordion `id` (description vs specs, etc.). */
  bulletParagraphsByItemId?: Record<string, string[]>;
  defaultOpenId?: string | null;
};

export function ProductDetailAccordions({
  items,
  bulletParagraphsByItemId,
  defaultOpenId = items[0]?.id ?? null,
}: ProductDetailAccordionsProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="divide-y divide-border rounded-lg border border-border">
      {items.map((item) => {
        const open = openId === item.id;
        const bullets = bulletParagraphsByItemId?.[item.id]?.filter((p) => p.trim().length > 0) ?? null;

        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-start transition-colors hover:bg-muted"
            >
              <span className="text-sm font-bold uppercase tracking-normal text-foreground">
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                  open && "rotate-180 text-primary",
                )}
                strokeWidth={2.5}
                aria-hidden
              />
            </button>

            {open ? (
              <div className="product-detail-accordion-scroll max-h-[min(22rem,42dvh)] overflow-y-auto overscroll-y-contain px-4 pb-4 pt-0.5 [-webkit-overflow-scrolling:touch] md:max-h-[min(26rem,38dvh)]">
                {bullets?.length ? (
                  <ul className="list-disc space-y-2.5 ps-4 text-sm leading-relaxed text-muted-foreground marker:text-primary">
                    {bullets.map((paragraph, index) => (
                      <li key={index} className="min-w-0 break-words ps-0.5">
                        {paragraph}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                )}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
