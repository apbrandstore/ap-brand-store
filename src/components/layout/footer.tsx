import { Globe, MapPin, Mail, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { PageContainer } from "@/components/layout/page-container";
import { Link } from "@/i18n/routing";
import { getStorefrontStorePublic } from "@/lib/storefront";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M13.5 21v-7h2.4l.4-3H13.5V9.1c0-.9.2-1.6 1.6-1.6h1.4V4.8c-.2 0-1.1-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8.2v3h2.4v7h2.9Z"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm5.2-.9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M18.9 2H22l-6.8 7.8L23.4 22h-6.6l-5.2-6.7L5.7 22H2.6l7.3-8.4L.6 2h6.8l4.7 6.1L18.9 2Zm-1.2 18h1.7L6.5 3.9H4.7L17.7 20Z"
      />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M21.6 7.2a2.8 2.8 0 0 0-2-2C18 4.8 12 4.8 12 4.8s-6 0-7.6.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2C6 19.2 12 19.2 12 19.2s6 0 7.6-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3.5 9H6.5v12H3.5V9Zm7 0H13.4v1.7h.04c.4-.8 1.5-2 3.5-2 3.7 0 4.4 2.4 4.4 5.5V21h-3v-6c0-1.4 0-3.1-2-3.1s-2.3 1.5-2.3 3V21h-3V9Z"
      />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12.1 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.7-7.1s-.4-.8-.4-2c0-1.9 1.1-3.3 2.5-3.3 1.2 0 1.8.9 1.8 2 0 1.2-.8 3-1.1 4.6-.3 1.3.7 2.4 2 2.4 2.4 0 4.2-2.5 4.2-6.2 0-3.2-2.3-5.4-5.6-5.4-3.8 0-6.1 2.9-6.1 5.9 0 1.2.5 2.5 1 3.2.1.1.1.2.1.4l-.4 1.6c-.1.5-.3.6-.7.4-2-.9-3.2-3.7-3.2-5.9 0-4.8 3.5-9.2 10-9.2 5.3 0 9.4 3.8 9.4 8.8 0 5.2-3.3 9.4-7.9 9.4-1.5 0-3-.8-3.5-1.7l-.9 3.5c-.3 1-1 2.3-1.5 3.1.9.3 1.9.4 2.9.4A10 10 0 0 0 12.1 2Z"
      />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64v-3.5a6.33 6.33 0 1 0 5.13 6.23V8.73a8.16 8.16 0 0 0 4.77 1.55V6.69h-.79Z"
      />
    </svg>
  );
}

export async function Footer() {
  const [t, common, store] = await Promise.all([
    getTranslations("footer"),
    getTranslations("common"),
    getStorefrontStorePublic(),
  ]);
  const year = new Date().getFullYear();

  const socialClass =
    "flex size-11 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-900 transition-colors hover:border-neutral-300 hover:bg-neutral-50";

  const socials = [
    {
      id: "facebook",
      label: t("socialFacebook"),
      href: store.social_links.facebook,
      icon: <FacebookIcon className="size-[18px]" />,
    },
    {
      id: "instagram",
      label: t("socialInstagram"),
      href: store.social_links.instagram,
      icon: <InstagramIcon className="size-[18px]" />,
    },
    {
      id: "twitter",
      label: t("socialTwitter"),
      href: store.social_links.twitter,
      icon: <XIcon className="size-[18px]" />,
    },
    {
      id: "youtube",
      label: t("socialYoutube"),
      href: store.social_links.youtube,
      icon: <YouTubeIcon className="size-[18px]" />,
    },
    {
      id: "linkedin",
      label: t("socialLinkedin"),
      href: store.social_links.linkedin,
      icon: <LinkedInIcon className="size-[18px]" />,
    },
    {
      id: "tiktok",
      label: t("socialTiktok"),
      href: store.social_links.tiktok,
      icon: <TikTokIcon className="size-[18px]" />,
    },
    {
      id: "pinterest",
      label: t("socialPinterest"),
      href: store.social_links.pinterest,
      icon: <PinterestIcon className="size-[18px]" />,
    },
    {
      id: "website",
      label: t("socialWebsite"),
      href: store.social_links.website,
      icon: <Globe className="size-[18px]" strokeWidth={1.75} />,
    },
  ].filter((item) => Boolean(item.href?.trim()));

  return (
    <footer className="border-t border-neutral-200 bg-white pt-10 pb-8 text-neutral-900">
      <PageContainer>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wide text-neutral-900">
              {t("contact")}
            </h2>
            <ul className="list-none space-y-5 p-0">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-neutral-700" strokeWidth={1.5} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-neutral-900">
                    {t("addressLabel")}
                  </p>
                  <p className="mt-0.5 text-sm font-normal text-neutral-800">{store.address || t("addressLine")}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-neutral-700" strokeWidth={1.5} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-neutral-900">
                    {t("emailLabel")}
                  </p>
                  <a
                    className="mt-0.5 block text-sm text-neutral-800 underline-offset-2 hover:underline"
                    href={`mailto:${store.support_email || t("emailLine")}`}
                  >
                    {store.support_email || t("emailLine")}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-neutral-700" strokeWidth={1.5} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-neutral-900">
                    {t("phoneLabel")}
                  </p>
                  <a
                    className="mt-0.5 block text-sm text-neutral-800 underline-offset-2 hover:underline"
                    href={`tel:${store.phone.replace(/\s/g, "")}`}
                  >
                    {store.phone}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wide text-neutral-900">
              {t("customer")}
            </h2>
            <ul className="list-none space-y-2.5 p-0">
              <li>
                <Link href="/account" className="text-sm text-neutral-900 underline-offset-2 hover:underline">
                  {t("customerAccount")}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-neutral-900 underline-offset-2 hover:underline">
                  {t("customerCart")}
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-sm text-neutral-900 underline-offset-2 hover:underline">
                  {t("customerWishlist")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-neutral-900 underline-offset-2 hover:underline">
                  {t("customerBlog")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wide text-neutral-900">
              <Link href="/information" className="underline-offset-4 hover:underline">
                {t("information")}
              </Link>
            </h2>
            <ul className="list-none space-y-2.5 p-0">
              <li>
                <Link href="/about-us" className="text-sm text-neutral-900 underline-offset-2 hover:underline">
                  {t("infoAbout")}
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-sm text-neutral-900 underline-offset-2 hover:underline">
                  {t("infoContact")}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-neutral-900 underline-offset-2 hover:underline">
                  {t("infoPrivacy")}
                </Link>
              </li>
              <li>
                <Link href="/return-refund" className="text-sm text-neutral-900 underline-offset-2 hover:underline">
                  {t("infoReturns")}
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation-policy"
                  className="text-sm text-neutral-900 underline-offset-2 hover:underline"
                >
                  {t("infoCancellation")}
                </Link>
              </li>
            </ul>
          </div>

          {socials.length > 0 ? (
            <div>
              <h2 className="mb-5 text-sm font-bold uppercase tracking-wide text-neutral-900">
                {t("socialLinks")}
              </h2>
              <div className="flex flex-wrap gap-3">
                {socials.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialClass}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <p className="mt-12 text-center text-sm text-neutral-500">
          © {year} {store.store_name || common("brand")}. {t("copyright")}{" "}
          <span className="text-neutral-400">|</span> {t("developedBy")}{" "}
          <a
            href="https://mushfikurahmaan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-neutral-600 underline-offset-2 transition-colors hover:text-neutral-900 hover:underline"
          >
            {t("developerName")}
          </a>
        </p>
      </PageContainer>
    </footer>
  );
}
