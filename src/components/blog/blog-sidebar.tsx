import type { BlogPostSerializable } from "@/lib/blog-data";

import { BlogSidebarItem } from "./blog-sidebar-item";

type BlogSidebarProps = {
  featuredHeading: string;
  featuredPosts: BlogPostSerializable[];
  locale: string;
  /** When false, only Featured is shown (e.g. blog article sidebar). Default true. */
  showLatest?: boolean;
  latestHeading?: string;
  latestPosts?: BlogPostSerializable[];
};

export function BlogSidebar({
  featuredHeading,
  featuredPosts,
  locale,
  showLatest = true,
  latestHeading,
  latestPosts = [],
}: BlogSidebarProps) {
  const showLatestSection = showLatest && latestHeading != null;

  return (
    <aside className="flex min-w-0 flex-col gap-8 lg:gap-10">
      <section aria-labelledby="blog-featured-heading">
        <div className="border-b border-border pb-2">
          <h2 id="blog-featured-heading" className="text-sm font-semibold tracking-tight text-foreground">
            {featuredHeading}
          </h2>
        </div>
        <ul className="mt-4 space-y-1">
          {featuredPosts.map((post) => (
            <li key={post.slug}>
              <BlogSidebarItem post={post} locale={locale} />
            </li>
          ))}
        </ul>
      </section>

      {showLatestSection ? (
        <section aria-labelledby="blog-latest-heading">
          <div className="border-b border-border pb-2">
            <h2 id="blog-latest-heading" className="text-sm font-semibold tracking-tight text-foreground">
              {latestHeading}
            </h2>
          </div>
          <ul className="mt-4 space-y-1">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <BlogSidebarItem post={post} locale={locale} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
}
