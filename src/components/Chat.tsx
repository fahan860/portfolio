"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/data/site";
import { Close, Send, Sparkles } from "./icons";

type Msg = { role: "user" | "assistant"; content: string };

const TXT = {
  title: { fr: "Ask Fatima · assistant IA", en: "Ask Fatima · AI assistant" },
  hello: {
    fr: "Bonjour ! Je suis l’assistant de Fatima. Posez-moi une question sur ses projets, ses compétences ou sa disponibilité.",
    en: "Hi! I’m Fatima’s assistant. Ask me about her projects, skills or availability.",
  },
  placeholder: { fr: "Votre question…", en: "Your question…" },
  suggestions: {
    fr: ["Quel est son meilleur projet en IA ?", "Quand est-elle disponible ?", "A-t-elle de l’expérience en Data Engineering ?"],
    en: ["What is her best AI project?", "When is she available?", "Does she have data engineering experience?"],
  },
  note: {
    fr: "RAG : recherche BM25 sur une base de connaissances + LLM Gemini. Réponses limitées aux faits du portfolio.",
    en: "RAG: BM25 retrieval over a knowledge base + Gemini LLM. Answers are grounded in portfolio facts only.",
  },
  error: { fr: "Erreur réseau, réessayez.", en: "Network error, please retry." },
  open: { fr: "Ouvrir l’assistant IA", en: "Open AI assistant" },
};

export default function Chat({ lang, open, setOpen }: { lang: Lang; open: boolean; setOpen: (o: boolean) => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  async function ask(q: string) {
    const question = q.trim();
    if (!question || loading) return;
    const next: Msg[] = [...msgs, { role: "user", content: question }];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });
      const data = await r.json();
      setMsgs([...next, { role: "assistant", content: data.answer ?? TXT.error[lang] }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: TXT.error[lang] }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label={TXT.open[lang]}
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-3 text-sm font-semibold text-bg shadow-xl shadow-accent/25 transition hover:scale-105"
        >
          <Sparkles /> Ask Fatima
        </button>
      )}
      {open && (
        <div
          role="dialog"
          aria-label={TXT.title[lang]}
          className="fixed inset-x-3 bottom-3 z-50 flex max-h-[80vh] flex-col overflow-hidden rounded-2xl border border-line bg-bg-2 shadow-2xl sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[400px]"
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="text-accent"><Sparkles /></span> {TXT.title[lang]}
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-md p-1 text-muted hover:bg-white/5 hover:text-text"><Close /></button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm" aria-live="polite">
            <Bubble role="assistant" text={TXT.hello[lang]} />
            {msgs.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {TXT.suggestions[lang].map((s) => (
                  <button key={s} onClick={() => ask(s)} className="rounded-full border border-line px-3 py-1.5 text-left text-xs text-muted transition hover:border-accent/60 hover:text-text">
                    {s}
                  </button>
                ))}
              </div>
            )}
            {msgs.map((m, i) => <Bubble key={i} role={m.role} text={m.content} />)}
            {loading && (
              <div className="flex gap-1 px-1 py-2" aria-label="…">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-accent" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="flex gap-2 border-t border-line p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder={TXT.placeholder[lang]}
              className="flex-1 rounded-lg border border-line bg-bg px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-accent"
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send" className="rounded-lg bg-accent px-3 text-bg transition disabled:opacity-40">
              <Send />
            </button>
          </form>
          <p className="px-4 pb-3 text-[10px] leading-snug text-muted">{TXT.note[lang]}</p>
        </div>
      )}
    </>
  );
}

function Bubble({ role, text }: { role: Msg["role"]; text: string }) {
  const me = role === "user";
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 leading-relaxed ${me ? "rounded-br-sm bg-accent text-bg" : "rounded-bl-sm border border-line bg-card text-text"}`}>
        {text}
      </div>
    </div>
  );
}
