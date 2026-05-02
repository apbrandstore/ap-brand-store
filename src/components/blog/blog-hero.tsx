type BlogHeroProps = {
  badge: string;
  title: string;
  intro: string;
};

export function BlogHero({ badge, title, intro }: BlogHeroProps) {
  return (
    <header className="mx-auto max-w-3xl px-1 text-center">
      <p className="mb-4 inline-flex rounded-sm border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {badge}
      </p>
      <h1 className="text-pretty text-2xl font-light tracking-tight text-foreground md:text-3xl lg:text-4xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-foreground/85 md:mt-5 md:text-lg">
        {intro}
      </p>
    </header>
  );
}
