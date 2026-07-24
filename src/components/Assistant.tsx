"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import type { Locale } from "@/lib/locales";
import { IconArrow, IconSpark } from "./icons";

const mdComponents: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold text-navy-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => (
    <ul className="mb-2 list-disc space-y-1 pl-4 last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-2 list-decimal space-y-1 pl-4 last:mb-0">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-snug">{children}</li>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700"
    >
      {children}
    </a>
  ),
  h1: ({ children }) => (
    <p className="mb-1 mt-2 font-semibold text-navy-900">{children}</p>
  ),
  h2: ({ children }) => (
    <p className="mb-1 mt-2 font-semibold text-navy-900">{children}</p>
  ),
  h3: ({ children }) => (
    <p className="mb-1 mt-2 font-semibold text-navy-900">{children}</p>
  ),
  code: ({ children }) => (
    <code className="rounded bg-ink-100 px-1 py-0.5 font-mono text-[0.8em] text-navy-900">
      {children}
    </code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-2 border-l-2 border-brand-400 pl-3 text-ink-500">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-2 border-ink-200" />,
};

function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className="[&_a]:break-words">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

type Msg = { role: "user" | "assistant"; content: string };

type Strings = {
  launcher: string;
  title: string;
  subtitle: string;
  greeting: string;
  placeholder: string;
  suggestions: string[];
  send: string;
  error: string;
  disclaimer: string;
};

export function Assistant({
  locale,
  t,
}: {
  locale: Locale;
  t: Strings;
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: t.greeting },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || busy) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: clean }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, locale }),
      });
      if (!res.ok || !res.body) throw new Error("chat_failed");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "assistant", content: t.error };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.title}
        className="fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-12px_rgba(27,18,63,0.6)] ring-1 ring-white/10 transition-all hover:bg-brand-600 hover:-translate-y-0.5"
      >
        <IconSpark className="h-5 w-5 text-brand-300" />
        <span className="hidden sm:inline">{open ? "—" : t.launcher}</span>
      </button>

      {/* Panel */}
      {open ? (
        <div className="fixed bottom-24 right-5 z-[70] flex h-[32rem] w-[calc(100vw-2.5rem)] max-w-[26rem] flex-col overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-[var(--shadow-premium)]">
          <div className="gradient-navy relative flex items-center gap-3 px-5 py-4">
            <div className="grid-lines absolute inset-0 opacity-50" aria-hidden />
            <Image
              src="/brand/mark-white.png"
              alt="Xentris"
              width={28}
              height={28}
              className="relative h-7 w-auto"
            />
            <div className="relative">
              <p className="font-display text-sm font-semibold text-white">
                {t.title}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-ink-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t.subtitle}
              </p>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto bg-ink-50/50 px-4 py-5"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "whitespace-pre-wrap bg-brand-500 text-white"
                      : "bg-white text-navy-900 ring-1 ring-ink-200"
                  }`}
                >
                  {m.role === "assistant" ? (
                    m.content ? (
                      <MarkdownMessage content={m.content} />
                    ) : (
                      "…"
                    )
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {t.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-brand-600 ring-1 ring-ink-200 transition-colors hover:ring-brand-400"
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-ink-200 bg-white p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="min-w-0 flex-1 rounded-full border border-ink-200 px-4 py-2.5 text-sm text-navy-900 outline-none focus:border-brand-400"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label={t.send}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600 disabled:opacity-50"
            >
              <IconArrow className="h-4 w-4" />
            </button>
          </form>
          <p className="bg-white px-4 pb-3 text-center text-[0.65rem] leading-tight text-ink-400">
            {t.disclaimer}
          </p>
        </div>
      ) : null}
    </>
  );
}
