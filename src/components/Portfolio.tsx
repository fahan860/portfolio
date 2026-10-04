"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  categories, certs, journey, languages, links, projects, skills, stats, ui,
  type Lang, type Project, type T,
} from "@/data/site";
import { useLang } from "./LangProvider";
import { ArrowUpRight, Download, GitHub, LinkedIn, Mail, Play, Sparkles } from "./icons";

export default function Portfolio() {
  const { t, lang, openChat } = useLang();
  return (
    <>
      <Hero t={t} lang={lang} onAsk={openChat} />
      <Projects t={t} />
      <Skills t={t} />
      <Journey t={t} />
      <Contact t={t} lang={lang} />
    </>
  );
}

type TT = { t: (x: T | string) => string };

function Hero({ t, lang, onAsk }: TT & { lang: Lang; onAsk: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-6 sm:pt-36 sm:pb-8">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[1fr_auto]">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-2/30 bg-accent-2/10 px-3 py-1 text-xs font-medium text-accent-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
            </span>
            {t(ui.available)}
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
            Fatima Zahrae <span className="text-gradient">Ahannuk</span>
          </h1>
          <p className="mt-3 font-mono text-sm text-accent sm:text-base">
            {t(ui.role)} · ML · Deep Learning · Data Engineering
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{t(ui.tagline)}</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted/80">{t(ui.seeking)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={links.cv[lang]} download className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-bg shadow-lg shadow-accent/20 transition hover:brightness-110">
              <Download /> {t(ui.cvBtn)}
            </a>
            <button onClick={onAsk} className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/5 px-5 py-3 text-sm font-semibold transition hover:border-accent/60">
              <Sparkles /> {t(ui.askBtn)}
            </button>
            <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-line text-muted transition hover:text-text"><GitHub /></a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-line text-muted transition hover:text-text"><LinkedIn /></a>
          </div>
        </div>
        <div className="reveal mx-auto md:mx-0">
          <div className="relative h-48 w-48 sm:h-60 sm:w-60">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent via-accent-3/60 to-accent-2 opacity-70 blur-md" />
            <Image src="/photo.jpg" alt="Fatima Zahrae Ahannuk" fill priority sizes="240px" className="relative rounded-full border-4 border-bg object-cover" />
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-3 px-4 sm:px-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.value} className="reveal card px-5 py-4">
            <div className="font-mono text-2xl font-semibold text-text sm:text-3xl">{s.value}</div>
            <div className="mt-1 text-xs text-muted sm:text-sm">{t(s.label)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ id, title, sub, n }: { id: string; title: string; sub?: string; n: string }) {
  return (
    <div className="reveal mb-10" id={id}>
      <p className="font-mono text-sm text-accent">{n}</p>
      <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 max-w-2xl text-muted">{sub}</p>}
    </div>
  );
}

function Projects({ t }: TT) {
  const [cat, setCat] = useState<string>("all");
  const list = projects.filter((p) => cat === "all" || p.cats.includes(cat));
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionTitle id="projects" n="01 /" title={t(ui.projectsTitle)} sub={t(ui.projectsSub)} />
      <div className="reveal mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtres">
        {[{ id: "all", label: ui.all }, ...categories].map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            aria-pressed={cat === c.id}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${cat === c.id ? "border-accent bg-accent/15 text-text" : "border-line text-muted hover:border-accent/50 hover:text-text"}`}
          >
            {t(c.label)} <span className="ml-1 font-mono text-xs text-muted">{c.id === "all" ? projects.length : projects.filter((p) => p.cats.includes(c.id)).length}</span>
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {list.map((p) => <ProjectCard key={p.id} p={p} t={t} featured={!!p.featured && cat === "all"} />)}
      </div>
    </section>
  );
}

function ProjectCard({ p, t, featured }: TT & { p: Project; featured: boolean }) {
  return (
    <article className={`card group relative flex flex-col p-6 transition hover:-translate-y-0.5 hover:border-accent/50 ${featured ? "md:col-span-2" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-accent-2">{t(p.tag)}</p>
          <h3 className="mt-1 text-2xl font-semibold">
            <Link href={`/projects/${p.id}`} className="after:absolute after:inset-0 after:content-['']">{p.title}</Link>
          </h3>
          <p className="mt-1 text-xs text-muted">{t(p.context)}</p>
        </div>
        {p.metrics.length > 0 && (
          <div className="flex gap-2">
            {p.metrics.map((m) => (
              <div key={m.value + m.label.en} className="rounded-xl border border-line bg-bg-2 px-3 py-2 text-center">
                <div className="font-mono text-lg font-semibold text-gradient">{m.value}</div>
                <div className="text-[11px] leading-tight text-muted">{t(m.label)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-text/90">{t(p.summary)}</p>
      {featured && p.flow && <Flow flow={p.flow} />}
      {featured && (
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted md:columns-2 md:gap-8">
          {p.built.map((b) => (
            <li key={b.en} className="flex gap-2 break-inside-avoid">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
              <span>{t(b)}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.stack.slice(0, featured ? 16 : 6).map((s) => <span key={s} className="chip">{s}</span>)}
        {!featured && p.stack.length > 6 && <span className="chip">+{p.stack.length - 6}</span>}
      </div>
      <div className="relative z-10 mt-auto flex flex-wrap items-center gap-2 pt-6">
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">{t(ui.caseStudy)} <ArrowUpRight /></span>
        <span className="flex-1" />
        {p.demo && (
          <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-accent-2 px-3 py-1.5 text-xs font-semibold text-bg transition hover:brightness-110">
            <Play /> {t(ui.demo)}
          </a>
        )}
        {p.code && (
          <a href={p.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold transition hover:border-accent/60">
            <GitHub /> {t(ui.code)}
          </a>
        )}
      </div>
    </article>
  );
}

export function Flow({ flow }: { flow: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-1.5 rounded-xl border border-dashed border-line bg-bg-2/60 p-3 font-mono text-[11px] text-muted" aria-label="Architecture">
      {flow.map((step, i) => (
        <span key={step} className="flex items-center gap-1.5">
          <span className="rounded-md border border-line bg-card px-2 py-1 text-text">{step}</span>
          {i < flow.length - 1 && <span className="text-accent">→</span>}
        </span>
      ))}
    </div>
  );
}

function Skills({ t }: TT) {
  return (
    <section className="border-y border-line/60 bg-bg-2/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionTitle id="skills" n="02 /" title={t(ui.skillsTitle)} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <div key={s.group.en} className="reveal card p-5">
              <h3 className="text-sm font-semibold text-accent">{t(s.group)}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.items.map((i) => <span key={i} className="chip">{i}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey({ t }: TT) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionTitle id="journey" n="03 /" title={t(ui.journeyTitle)} />
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <ol className="relative space-y-8 border-l border-line pl-6">
          {journey.map((j) => (
            <li key={j.title.en} className="reveal relative">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-accent ring-4 ring-accent/20" />
              <p className="font-mono text-xs text-accent-2">{j.when}</p>
              <h3 className="mt-1 text-lg font-semibold">{t(j.title)}</h3>
              <p className="text-sm text-text/80">{t(j.org)}</p>
              <p className="mt-1 text-sm text-muted">{t(j.text)}</p>
            </li>
          ))}
        </ol>
        <div className="space-y-6">
          <div className="reveal card p-5">
            <h3 className="text-sm font-semibold text-accent">{t(ui.certsTitle)}</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              {certs.map((c) => (
                <li key={c.name} className="flex justify-between gap-3">
                  <span>{c.name}</span>
                  <span className="whitespace-nowrap font-mono text-xs text-muted">{c.org}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal card p-5">
            <h3 className="text-sm font-semibold text-accent">{t(ui.languages)}</h3>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {languages.map((l) => (
                <li key={l.name.en}>{t(l.name)} <span className="text-muted">· {t(l.level)}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ t, lang }: TT & { lang: Lang }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div id="contact" className="reveal card relative overflow-hidden p-8 text-center sm:p-14">
        <div className="glow pointer-events-none absolute inset-0" />
        <div className="relative">
          <p className="font-mono text-sm text-accent">04 /</p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{t(ui.contactTitle)}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{t(ui.contactText)}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${links.email}`} className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-bg transition hover:brightness-110">
              <Mail /> {links.email}
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-semibold transition hover:border-accent/60"><LinkedIn /> LinkedIn</a>
            <a href={links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-semibold transition hover:border-accent/60"><GitHub /> GitHub</a>
            <a href={links.cv[lang]} download className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-semibold transition hover:border-accent/60"><Download /> CV</a>
          </div>
        </div>
      </div>
    </section>
  );
}
