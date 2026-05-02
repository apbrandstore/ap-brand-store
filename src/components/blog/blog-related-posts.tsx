import Image from "next/image";

import { Link } from "@/i18n/routing";
import type { BlogPostSerializable } from "@/lib/blog-data";
import { storefrontImageUnoptimized } from "@/lib/storefront-image";

type BlogRelatedPostsProps = {
  posts: BlogPostSerializable[];
  heading: string;
};

export function BlogRelatedPosts({ posts, heading }: BlogRelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-border pt-12" aria-labelledby="blog-related-heading">
      <h2 id="blog-related-heading" className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
        {heading}
      </h2>
      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              {post.imageUrl ? (
                <div className="relative aspect-[4/3] bg-muted">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    unoptimized={storefrontImageUnoptimized(post.imageUrl)}
                  />
                </div>
              ) : null}
              <div className="p-4">
                <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                  {post.title}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
