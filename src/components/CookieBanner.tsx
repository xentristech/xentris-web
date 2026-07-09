"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE = "xentris-consent";

function hasConsent() {
  if (typeof document === "undefined") return true;
  return document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE}=`));
}

function setConsent(value: "all" | "essential") {
  const maxAge = 60 * 60 * 24 * 180; // 180 días
  document.cookie = `${COOKIE}=${value}; path=/; max-age=${maxAge}; samesite=lax`;
  // Punto único para activar píxeles/analytics cuando value === "all".
  window.dispatchEvent(
    new CustomEvent("xentris-consent", { detail: { value } }),
  );
}

export function CookieBanner({
  message,
  accept,
  reject,
  more,
  policyHref,
}: {
  message: string;
  accept: string;
  reject: string;
  more: string;
  policyHref: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (value: "all" | "essential") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-ink-200 bg-white/95 p-5 shadow-[var(--shadow-premium)] backdrop-blur-md sm:inset-x-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-ink-600">
          {message}{" "}
          <Link
            href={policyHref}
            className="font-semibold text-brand-600 underline underline-offset-2"
          >
            {more}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="rounded-full px-4 py-2 text-sm font-semibold text-navy-900 ring-1 ring-ink-200 transition-colors hover:ring-brand-400"
          >
            {reject}
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            {accept}
          </button>
        </div>
      </div>
    </div>
  );
}
