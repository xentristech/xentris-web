import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";

const PUBLIC_FILE = /\.[^/]+$/;
const COOKIE = "NEXT_LOCALE";

// Países cuyo idioma por defecto es inglés (por IP). El resto → español.
const ENGLISH_COUNTRIES = new Set(["US"]);

function localeFromCountry(req: NextRequest): string {
  // Vercel inyecta el país por IP en producción.
  const country =
    req.headers.get("x-vercel-ip-country")?.toUpperCase() ?? "";
  if (country) return ENGLISH_COUNTRIES.has(country) ? "en" : "es";

  // Fallback (ej. desarrollo local): idioma del navegador.
  const header = req.headers.get("accept-language")?.toLowerCase() ?? "";
  if (header.split(",")[0]?.trim().startsWith("en")) return "en";
  return defaultLocale;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/llms.txt" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ¿Ya tiene prefijo de idioma? Recordamos la elección en una cookie.
  const current = locales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (current) {
    const res = NextResponse.next();
    if (req.cookies.get(COOKIE)?.value !== current) {
      res.cookies.set(COOKIE, current, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }
    return res;
  }

  // Sin prefijo: 1) respeta la cookie (elección manual previa),
  // 2) si no hay, decide por país (IP) / idioma del navegador.
  const cookieLocale = req.cookies.get(COOKIE)?.value;
  const locale =
    cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : localeFromCountry(req);

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
