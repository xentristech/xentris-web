import Link from "next/link";
import { Container } from "@/components/ui";
import { IconArrow } from "@/components/icons";
import { defaultLocale } from "@/lib/locales";

// not-found.tsx no recibe params; usamos el idioma por defecto con línea bilingüe.
export default function NotFound() {
  const l = defaultLocale;
  return (
    <section className="gradient-navy relative overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-7xl font-bold text-white sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold text-white">
          Esta página no existe · This page doesn&apos;t exist
        </h1>
        <p className="mt-3 max-w-md text-ink-300">
          Puede que el enlace esté roto o se haya movido. The link may be broken
          or the page may have moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${l}`}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Inicio / Home
            <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={`/${l}/contacto`}
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/10"
          >
            Contacto / Contact
          </Link>
        </div>
      </Container>
    </section>
  );
}
