"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import type { Locale } from "@/lib/locales";
import { IconArrow, IconSpark, IconVolume, IconStop } from "./icons";

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
  listen: string;
  stop: string;
};

/** Quita el markdown para que el texto leído en voz suene natural. */
function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_#>~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

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
  // Audio: índice del mensaje que se está leyendo y su estado.
  const [audio, setAudio] = useState<{ idx: number; status: "loading" | "playing" } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  // Detiene cualquier audio (elemento <audio> o síntesis del navegador).
  function stopAudio() {
    if (audioElRef.current) {
      audioElRef.current.pause();
      audioElRef.current = null;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setAudio(null);
  }

  // Respaldo gratuito: lee el texto con la voz del navegador.
  function speakWithBrowser(idx: number, text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setAudio(null);
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = locale === "en" ? "en-US" : "es-ES";
    u.onend = () => setAudio(null);
    u.onerror = () => setAudio(null);
    setAudio({ idx, status: "playing" });
    window.speechSynthesis.speak(u);
  }

  // Alterna la lectura en voz alta del mensaje: OpenAI TTS con respaldo del navegador.
  async function toggleSpeak(idx: number, raw: string) {
    if (audio?.idx === idx) {
      stopAudio();
      return;
    }
    stopAudio();
    const text = stripMarkdown(raw);
    if (!text) return;
    setAudio({ idx, status: "loading" });
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, locale }),
      });
      if (!res.ok) throw new Error("tts_unavailable");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      audioUrlRef.current = url;
      const el = new Audio(url);
      audioElRef.current = el;
      el.onended = () => stopAudio();
      el.onerror = () => speakWithBrowser(idx, text);
      await el.play();
      setAudio({ idx, status: "playing" });
    } catch {
      speakWithBrowser(idx, text);
    }
  }

  // Limpia el audio al cerrar el panel o desmontar.
  useEffect(() => {
    if (!open) stopAudio();
    return () => stopAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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
                      <>
                        <MarkdownMessage content={m.content} />
                        <button
                          type="button"
                          onClick={() => toggleSpeak(i, m.content)}
                          aria-label={audio?.idx === i ? t.stop : t.listen}
                          title={audio?.idx === i ? t.stop : t.listen}
                          className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium text-brand-600 transition-colors hover:bg-ink-100"
                        >
                          {audio?.idx === i ? (
                            audio.status === "loading" ? (
                              <span className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-brand-500 border-t-transparent" />
                            ) : (
                              <IconStop className="h-3.5 w-3.5" />
                            )
                          ) : (
                            <IconVolume className="h-3.5 w-3.5" />
                          )}
                          <span>{audio?.idx === i ? t.stop : t.listen}</span>
                        </button>
                      </>
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
