import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { CheckoutSuccessPageClient } from "@/components/checkout/checkout-success-page-client";
import { PageContainer } from "@/components/layout/page-container";
import { routing, type Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; orderId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "checkout" });
  return {
    title: t("orderSuccessMetaTitle"),
    description: t("orderSuccessMetaDescription"),
  };
}

export default async function CheckoutSuccessPage({ params }: PageProps) {
  const { locale, orderId } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PageContainer>
        <CheckoutSuccessPageClient orderId={orderId} />
      </PageContainer>
    </div>
  );
}
