import type { BlogArticleBlock } from "@/lib/blog-data";

type BlogArticleBlocksProps = {
  blocks: BlogArticleBlock[];
};

export function BlogArticleBlocks({ blocks }: BlogArticleBlocksProps) {
  return (
    <div className="min-w-0 space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "html") {
          const content = block.html.trim();
          if (!content) return null;

          // Blog content from API may be markdown or HTML. We render obvious HTML
          // as rich content and otherwise preserve paragraphs as plain text.
          if (content.includes("<") && content.includes(">")) {
            return (
              <div
                key={i}
                className="prose prose-neutral max-w-none prose-img:rounded-lg prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            );
          }
          return (
            <div key={i} className="space-y-4">
              {content.split(/\n{2,}/).map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-foreground/90 md:text-[17px]">
                  {paragraph}
                </p>
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
