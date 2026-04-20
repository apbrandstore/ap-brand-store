import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { ProductCard } from "@/components/common/product-card";
import { PageContainer } from "@/components/layout/page-container";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { getStorefrontHomeCategorySections } from "@/lib/products";
import { getStorefrontBanners } from "@/lib/storefront";
import type { PaperbaseBanner } from "@/types/paperbase";

export default async function HomePage() {
  const [tHome, categorySections, homeTopBanners, homeMidBanners, homeBottomBanners, locale] = await Promise.all([
    getTranslations("home"),
    getStorefrontHomeCategorySections(),
    getStorefrontBanners("home_top"),
    getStorefrontBanners("home_mid"),
    getStorefrontBanners("home_bottom"),
    getLocale(),
  ]);
  const heroBanner = homeTopBanners.find((banner) => Boolean(banner.image_url)) ?? null;
  const hasBottomBanners = homeBottomBanners.length > 0;

  function BannerBlock({ banners }: { banners: PaperbaseBanner[] }) {
    if (banners.length === 0) {
      return null;
    }

    return (
      <div className="space-y-4 md:space-y-6">
        {banners.map((banner) => (
          <div key={banner.public_id} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            {banner.image_url ? (
              <div className="relative">
                <Image
                  src={banner.image_url}
                  alt={banner.title?.trim() ? banner.title : tHome("headline")}
                  width={2400}
                  height={900}
                  sizes="100vw"
                  unoptimized
                  className="block h-auto w-full max-w-full"
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent px-4 pb-4 pt-10 text-white md:px-6 md:pb-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <p className="text-pretty text-base font-semibold leading-snug md:text-lg">{banner.title}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between md:gap-5 md:p-6">
                <p className="text-pretty text-base font-semibold leading-snug text-text md:text-lg">{banner.title}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  function FullBleedBannerBlock({ banners }: { banners: PaperbaseBanner[] }) {
    if (banners.length === 0) {
      return null;
    }

    return (
      <div className="w-full space-y-6 md:space-y-8">
        {banners.map((banner) => (
          <section key={banner.public_id} className="w-full">
            {banner.image_url ? (
              <div className="relative w-full">
                <Image
                  src={banner.image_url}
                  alt={banner.title?.trim() ? banner.title : tHome("headline")}
                  width={2400}
                  height={1200}
                  sizes="100vw"
                  unoptimized
                  className="block h-auto w-full max-w-full"
                  style={{ width: "100%", height: "auto" }}
                />
                {banner.title?.trim() ? (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent px-4 pb-4 pt-10 text-white md:px-6 md:pb-6">
                    <p className="text-pretty text-base font-semibold leading-snug md:text-lg">{banner.title}</p>
                  </div>
                ) : null}
              </div>
            ) : (
              <PageContainer>
                <div className="card mx-auto max-w-4xl px-4 py-6 text-center md:px-6">
                  <p className="text-pretty text-base font-semibold leading-snug text-text md:text-lg">{banner.title}</p>
                </div>
              </PageContainer>
            )}
          </section>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`bg-surface ${heroBanner?.image_url ? "pt-0" : "pt-4 md:pt-6"} ${hasBottomBanners ? "pb-0" : "pb-10 md:pb-14"}`}
    >
      {heroBanner?.image_url ? (
        <section className="mb-10 w-full md:mb-12">
          <Image
            src={heroBanner.image_url}
            alt={heroBanner.title?.trim() ? heroBanner.title : tHome("headline")}
            width={2400}
            height={1200}
            priority
            sizes="100vw"
            unoptimized
            className="block h-auto w-full max-w-full"
            style={{ width: "100%", height: "auto" }}
          />
        </section>
      ) : null}

      <PageContainer>
        <section id="products" className="space-y-12 md:space-y-16">
          {categorySections.length === 0 ? (
            <p className="card mx-auto max-w-lg text-center text-sm text-text/80">{tHome("emptyProducts")}</p>
          ) : (
            <>
              {categorySections.map((section, sectionIdx) => (
                <div key={section.slug} className="space-y-5 md:space-y-6">
                  <header className="mx-auto max-w-4xl px-1 text-center">
                    <h2 className="text-pretty text-2xl font-light tracking-tight text-text md:text-3xl lg:text-4xl">
                      {section.name}
                    </h2>
                    {section.description ? (
                      <p className="mx-auto mt-3 max-w-3xl text-pretty text-base font-normal leading-snug text-text/85 md:mt-4 md:text-lg md:leading-relaxed">
                        {section.description}
                      </p>
                    ) : null}
                  </header>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {section.products.map((product, productIdx) => (
                      <ProductCard
                        key={product.public_id}
                        product={product}
                        locale={locale as Locale}
                        priority={sectionIdx === 0 && productIdx < 4}
                      />
                    ))}
                  </div>
                  {section.showViewMore ? (
                    <div className="flex justify-center pt-1">
                      <Link
                        href={`/categories/${section.slug}`}
                        className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-200 bg-white px-5 text-sm font-medium text-text shadow-sm transition-colors hover:bg-neutral-50"
                      >
                        {tHome("viewMore")}
                      </Link>
                    </div>
                  ) : null}

                  {sectionIdx === 0 ? (
                    <div className="pt-2 md:pt-4">
                      <BannerBlock banners={homeMidBanners} />
                    </div>
                  ) : null}
                </div>
              ))}
            </>
          )}
        </section>
      </PageContainer>

      <div className="mt-12 md:mt-16">
        <FullBleedBannerBlock banners={homeBottomBanners} />
      </div>
    </div>
  );
}
