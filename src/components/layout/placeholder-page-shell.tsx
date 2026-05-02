import { PageContainer } from "@/components/layout/page-container";
import { Link } from "@/i18n/routing";

type PlaceholderPageShellProps = {
  title: string;
  message: string;
  backLabel: string;
};

export function PlaceholderPageShell({ title, message, backLabel }: PlaceholderPageShellProps) {
  return (
    <div className="min-h-[50vh] bg-card py-16 md:py-24">
      <PageContainer>
        <div className="mx-auto max-w-lg rounded-lg border border-border bg-card px-8 py-12 text-center shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{message}</p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {backLabel}
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}
