"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang, T } from "@/data/site";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (x: T | string) => string; openChat: () => void; chatOpen: boolean; setChatOpen: (o: boolean) => void };
const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");
  const [chatOpen, setChatOpen] = useState(false);

  // Langue : ?lang=en dans l'URL > choix mémorisé > langue du navigateur
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    let saved: string | null = null;
    try { saved = localStorage.getItem("lang"); } catch {}
    const nav = navigator.language?.startsWith("fr") ? "fr" : "en";
    const l = (fromUrl === "fr" || fromUrl === "en" ? fromUrl : saved === "fr" || saved === "en" ? saved : nav) as Lang;
    // Lecture de l'état du navigateur après l'hydratation (le HTML statique est en FR par défaut)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLang(l);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);

  const t = (x: T | string) => (typeof x === "string" ? x : x[lang]);
  return (
    <LangCtx.Provider value={{ lang, setLang, t, chatOpen, setChatOpen, openChat: () => setChatOpen(true) }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error("useLang must be used inside LangProvider");
  return c;
}
