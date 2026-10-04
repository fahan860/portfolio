"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ui } from "@/data/site";
import Chat from "./Chat";
import { useLang } from "./LangProvider";

export default function Shell({ children }: { children: React.ReactNode }) {
  const { lang, setLang, t, chatOpen, setChatOpen } = useLang();
  const pathname = usePathname();

  // Animation d'apparition au scroll (relancée à chaque changement de page)
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname, lang]);

  const items = [
    ["/#projects", ui.nav.projects],
    ["/#skills", ui.nav.skills],
    ["/#journey", ui.nav.journey],
    ["/#contact", ui.nav.contact],
  ] as const;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-bg/70 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
            <span className="text-gradient">fatima</span><span className="text-muted">.zahrae</span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <ul className="hidden items-center gap-1 md:flex">
              {items.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-text">
                    {t(label)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="ml-2 flex rounded-lg border border-line p-0.5 font-mono text-xs" role="group" aria-label="Language">
              {(["fr", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-md px-2.5 py-1.5 uppercase transition ${lang === l ? "bg-accent text-bg" : "text-muted hover:text-text"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="border-t border-line py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} · {t(ui.footer)} · Next.js · Tailwind · Vercel
      </footer>
      <Chat lang={lang} open={chatOpen} setOpen={setChatOpen} />
    </>
  );
}
