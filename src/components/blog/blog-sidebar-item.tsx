import Image from "next/image";

import { Link } from "@/i18n/routing";
import type { BlogPostSerializable } from "@/lib/blog-data";
import { storefrontImageUnoptimized } from "@/lib/storefront-image";

type BlogSidebarItemProps = {
  post: BlogPostSerializable;
};

function formatDate(iso: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

type BlogSidebarItemWithLocaleProps = BlogSidebarItemProps & {
  locale: string;
};

export function BlogSidebarItem({ post, locale }: BlogSidebarItemWithLocaleProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex gap-3 rounded-lg border border-transparent p-1.5 transition-colors hover:border-border hover:bg-muted/80">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt=""
            role="presentation"
            fill
            sizes="64px"
            className="object-cover"
            unoptimized={storefrontImageUnoptimized(post.imageUrl)}
          />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] tabular-nums text-muted-foreground">{formatDate(post.publishedAt, locale)}</p>
        <p className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
          {post.title}
        </p>
      </div>
    </Link>
  );
}
