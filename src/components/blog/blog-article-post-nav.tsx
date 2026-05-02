import { ChevronLeft, ChevronRight } from "lucide-react";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { BlogPostSerializable } from "@/lib/blog-data";

type BlogArticlePostNavProps = {
  prev: BlogPostSerializable | null;
  next: BlogPostSerializable | null;
  prevLabel: string;
  nextLabel: string;
};

export function BlogArticlePostNav({ prev, next, prevLabel, nextLabel }: BlogArticlePostNavProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      aria-label="Article pagination"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          title={prev.title}
          aria-label={`${prevLabel}: ${prev.title}`}
          className={cn(
            "inline-flex min-h-10 max-w-full items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-start transition-colors hover:border-neutral-300 hover:bg-white",
          )}
        >
          <ChevronLeft className="size-4 shrink-0 text-neutral-500" strokeWidth={2.25} aria-hidden />
          <span className="text-xs font-medium text-foreground">{prevLabel}</span>
        </Link>
      ) : null}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          title={next.title}
          aria-label={`${nextLabel}: ${next.title}`}
          className="group inline-flex min-h-10 max-w-full items-center gap-2 rounded-lg border border-primary/30 bg-primary px-4 py-2.5 text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <span className="text-xs font-medium">{nextLabel}</span>
          <ChevronRight className="size-4 shrink-0 opacity-90" strokeWidth={2.25} aria-hidden />
        </Link>
      ) : null}
    </nav>
  );
}
