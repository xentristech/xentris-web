"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { IconArrow, IconCheck } from "./icons";

type ContactStrings = {
  fName: string;
  fNamePh: string;
  fEmail: string;
  fEmailPh: string;
  fCompany: string;
  fCompanyPh: string;
  fService: string;
  fMessage: string;
  fMessagePh: string;
  fSubmit: string;
  fSending: string;
  fSuccess: string;
  fError: string;
  fNote1: string;
  fNote2: string;
  serviceOptions: string[];
};

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ t }: { t: ContactStrings }) {
  const [service, setService] = useState(t.serviceOptions[0]);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          service,
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("send_failed");
      setStatus("success");
      form.reset();
      setService(t.serviceOptions[0]);
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-navy-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10";
  const label = "text-sm font-medium text-navy-900";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-brand-500/5 p-8 text-center ring-1 ring-brand-500/20">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-500 text-white">
          <IconCheck className="h-6 w-6" />
        </span>
        <p className="mt-4 font-medium text-navy-900">{t.fSuccess}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            {t.fName}
          </label>
          <input id="name" name="name" required placeholder={t.fNamePh} className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            {t.fEmail}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t.fEmailPh}
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className={label}>
          {t.fCompany}
        </label>
        <input id="company" name="company" placeholder={t.fCompanyPh} className={field} />
      </div>

      <div>
        <label htmlFor="service" className={label}>
          {t.fService}
        </label>
        <select
          id="service"
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={field}
        >
          {t.serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          {t.fMessage}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t.fMessagePh}
          className={`${field} resize-y`}
        />
      </div>

      {status === "error" ? (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {t.fError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? t.fSending : t.fSubmit}
        {status !== "sending" ? (
          <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        ) : null}
      </button>
      <p className="text-xs text-ink-400">
        {t.fNote1} {site.email}. {t.fNote2}
      </p>
    </form>
  );
}
