import Image from "next/image";

import { Link } from "@/i18n/routing";
import { storefrontImageUnoptimized } from "@/lib/storefront-image";
import { cn } from "@/lib/utils";
import type { BlogPostSerializable } from "@/lib/blog-data";

type BlogFeatureCardProps = {
  post: BlogPostSerializable;
  priority?: boolean;
  className?: string;
};

export function BlogFeatureCard({ post, priority = false, className }: BlogFeatureCardProps) {
  const hasImage = Boolean(post.imageUrl);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative flex min-h-[280px] flex-col overflow-hidden rounded-lg border border-border/90 shadow-sm ring-1 ring-foreground/5 md:min-h-[320px]",
        hasImage ? "bg-card" : "bg-background",
        className,
      )}
    >
      {hasImage ? (
        <>
          <Image
            src={post.imageUrl!}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            priority={priority}
            unoptimized={storefrontImageUnoptimized(post.imageUrl!)}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
            aria-hidden
          />
        </>
      ) : null}
      <div className="relative mt-auto flex flex-col justify-end p-4 sm:p-5">
        <span
          className={cn(
            "mb-2 w-fit rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            hasImage ? "bg-card/95 text-foreground" : "bg-card text-foreground",
          )}
        >
          {post.category}
        </span>
        <h2 className={cn("text-lg font-semibold leading-snug sm:text-xl", hasImage ? "text-white" : "text-foreground")}>
          {post.title}
        </h2>
      </div>
    </Link>
  );
}
