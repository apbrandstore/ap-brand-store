"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";

import type { BlogPostSerializable } from "@/lib/blog-data";
import type { Locale } from "@/i18n/routing";

import { BlogFeatureCard } from "./blog-feature-card";
import { BlogSearch } from "./blog-search";
import { BlogSidebar } from "./blog-sidebar";

type BlogListingProps = {
  posts: BlogPostSerializable[];
  featuredPosts: BlogPostSerializable[];
  latestPosts: BlogPostSerializable[];
  sectionTitle: string;
  featuredHeading: string;
  latestHeading: string;
  searchPlaceholder: string;
  searchButtonLabel: string;
  emptySearch: string;
};

export function BlogListing({
  posts,
  featuredPosts,
  latestPosts,
  sectionTitle,
  featuredHeading,
  latestHeading,
  searchPlaceholder,
  searchButtonLabel,
  emptySearch,
}: BlogListingProps) {
  const [query, setQuery] = useState("");
  const locale = useLocale() as Locale;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }, [posts, query]);

  return (
    <div className="mt-10 md:mt-12">
      <BlogSearch
        value={query}
        onChange={setQuery}
        placeholder={searchPlaceholder}
        searchButtonLabel={searchButtonLabel}
        className="mb-10 md:mb-12"
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <div className="min-w-0">
          <div className="mb-6 border-b border-neutral-200 pb-2">
            <h2 className="text-base font-semibold tracking-tight text-foreground md:text-lg">{sectionTitle}</h2>
          </div>

          {filtered.length === 0 ? (
            <p className="rounded-lg border border-dashed border-neutral-200 bg-neutral-50/80 px-4 py-8 text-center text-sm text-neutral-600">
              {emptySearch}
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              {filtered.map((post, idx) => (
                <li key={post.slug} className="min-w-0">
                  <BlogFeatureCard post={post} priority={idx < 2} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <BlogSidebar
            featuredHeading={featuredHeading}
            latestHeading={latestHeading}
            featuredPosts={featuredPosts}
            latestPosts={latestPosts}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}
