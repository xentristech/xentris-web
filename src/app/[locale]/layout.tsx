import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Assistant } from "@/components/Assistant";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { JsonLd } from "@/components/JsonLd";
import { legalSlug } from "@/lib/legal";
import { organizationSchema, websiteSchema, altLanguages } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  getDictionary,
  isLocale,
  locales,
  ogLocale,
  type Locale,
} from "@/lib/i18n";

// Tipografías del brandbook: Montserrat (texto) + Mansfield Black Italic (títulos).
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const mansfield = localFont({
  variable: "--font-mansfield",
  src: "../fonts/mansfield-black-italic.woff2",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${dict.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: dict.description,
    alternates: {
      canonical: `/${locale}`,
      ...altLanguages("/"),
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title: `${site.name} — ${dict.tagline}`,
      description: dict.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${dict.tagline}`,
      description: dict.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  return (
    <html
      lang={l}
      className={`${montserrat.variable} ${mansfield.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white">
        <JsonLd data={organizationSchema(l)} />
        <JsonLd data={websiteSchema(l)} />
        <Navbar
          locale={l}
          labels={dict.nav}
          ctaLabel={dict.common.scheduleCall}
        />
        <main>{children}</main>
        <Footer locale={l} dict={dict} />
        <Assistant locale={l} t={dict.assistant} />
        <WhatsAppFab locale={l} />
        <CookieBanner
          message={dict.cookieBanner.message}
          accept={dict.cookieBanner.accept}
          reject={dict.cookieBanner.reject}
          more={dict.cookieBanner.more}
          policyHref={`/${l}/legal/${legalSlug(l, "cookies")}`}
        />
      </body>
    </html>
  );
}
