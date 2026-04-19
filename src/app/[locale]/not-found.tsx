import type { Metadata } from "next";
import { Home, Search } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { PageContainer } from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations({ locale, namespace: "states" });
  return {
    title: t("notFoundMetaTitle"),
    description: t("notFoundMetaDescription"),
  };
}

export default async function NotFoundPage() {
  const locale = (await getLocale()) as Locale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "states" });

  return (
    <div className="flex flex-1 flex-col bg-background">
      <PageContainer>
        <div className="flex min-h-[min(72vh,760px)] flex-col items-center justify-center px-2 py-14 text-center md:py-20">
          <div className="w-full max-w-lg rounded-lg border border-neutral-200/70 bg-surface px-6 py-10 shadow-sm md:px-10 md:py-12">
            <p className="price-display-eyebrow mb-3">{t("notFoundBadge")}</p>
            <p
              className="font-sans-en text-[clamp(3.5rem,16vw,7.5rem)] font-extrabold leading-none tracking-tighter text-primary"
              aria-hidden
            >
              404
            </p>
            <h1 className="mt-6 text-pretty text-2xl font-semibold tracking-tight text-text md:text-3xl">
              {t("notFoundTitle")}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-neutral-600 md:text-base">
              {t("notFoundDescription")}
            </p>

            <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center sm:gap-3">
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "primary", size: "md" }),
                  "inline-flex w-full min-h-12 items-center justify-center gap-2 sm:w-auto sm:min-w-[10rem]",
                )}
              >
                <Home className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                {t("goHome")}
              </Link>
              <Link
                href="/search"
                className={cn(
                  buttonVariants({ variant: "outline", size: "md" }),
                  "inline-flex w-full min-h-12 items-center justify-center gap-2 border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50 sm:w-auto sm:min-w-[10rem]",
                )}
              >
                <Search className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                {t("notFoundBrowseSearch")}
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
