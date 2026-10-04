"use client";

import Image from "next/image";
import Link from "next/link";
import { projects, ui, type T } from "@/data/site";
import BarChart from "./BarChart";
import { useLang } from "./LangProvider";
import { Flow } from "./Portfolio";
import { ArrowUpRight, GitHub, Play } from "./icons";

export default function ProjectView({ id }: { id: string }) {
  const { t } = useLang();
  const i = projects.findIndex((p) => p.id === id);
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="relative overflow-hidden pt-24 pb-20 sm:pt-28">
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <div className="glow pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <Link href="/#projects" className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-text">
          ← {t(ui.back)}
        </Link>

        {/* En-tête */}
        <header className="reveal mt-6">
          <p className="font-mono text-xs uppercase tracking-wider text-accent-2">{t(p.tag)}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{p.title}</h1>
          <p className="mt-2 text-sm text-muted">{t(p.context)}</p>
          <p className="mt-5 text-lg leading-relaxed text-text/90">{t(p.summary)}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-accent-2 px-4 py-2 text-sm font-semibold text-bg transition hover:brightness-110">
                <Play /> {t(ui.demo)}
              </a>
            )}
            {p.code && (
              <a href={p.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 text-sm font-semibold transition hover:border-accent/60">
                <GitHub /> {t(ui.code)} <ArrowUpRight />
              </a>
            )}
          </div>
        </header>

        {/* Chiffres clés */}
        {p.metrics.length > 0 && (
          <div className="reveal mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {p.metrics.map((m) => (
              <div key={m.value + m.label.en} className="card px-5 py-4">
                <div className="font-mono text-2xl font-semibold text-gradient sm:text-3xl">{m.value}</div>
                <div className="mt-1 text-xs text-muted sm:text-sm">{t(m.label)}</div>
              </div>
            ))}
          </div>
        )}

        {/* Problème + rôle */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Box title={t(ui.problem)} accent="text-accent-3">{t(p.problem)}</Box>
          {(p.role || p.team) && (
            <Box title={t(p.role ? ui.myRole : ui.team)} accent="text-accent-2">
              {p.role ? t(p.role) : t(p.team!)}
              {p.role && p.team && <span className="mt-2 block text-xs text-muted">{t(p.team)}</span>}
            </Box>
          )}
        </div>

        {p.flow && (
          <div className="reveal mt-6">
            <Flow flow={p.flow} />
          </div>
        )}

        {/* Ce qui a été construit */}
        <section className="reveal mt-12">
          <H2>{t(ui.built)}</H2>
          <Bullets items={p.built} />
        </section>

        {/* Sections détaillées */}
        {p.sections?.map((s) => (
          <section key={s.title.en} className="reveal mt-12">
            <H2>{t(s.title)}</H2>
            {s.body && <p className="mt-3 leading-relaxed text-muted">{t(s.body)}</p>}
            {s.bullets && <Bullets items={s.bullets} />}
            {s.chart && <div className="mt-5"><BarChart chart={s.chart} /></div>}
            {s.image && (
              <figure className="mt-5 overflow-hidden rounded-xl border border-line bg-white p-3">
                <Image src={s.image.src} alt={t(s.image.alt)} width={715} height={660} className="mx-auto h-auto w-full max-w-md" />
                <figcaption className="mt-2 text-center text-xs text-slate-600">{t(s.image.caption)}</figcaption>
              </figure>
            )}
          </section>
        ))}

        {/* Stack */}
        <section className="reveal mt-12">
          <H2>Stack</H2>
          <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
        </section>

        {(p.limits || p.learned) && (
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {p.limits && <Box title={t(ui.limits)} accent="text-accent-3"><List items={p.limits} /></Box>}
            {p.learned && <Box title={t(ui.learned)} accent="text-accent-2"><List items={p.learned} /></Box>}
          </div>
        )}

        {/* Projet suivant */}
        <Link href={`/projects/${next.id}`} className="reveal card group mt-16 flex items-center justify-between gap-4 p-6 transition hover:border-accent/50">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted">{t(ui.next)}</p>
            <p className="mt-1 text-xl font-semibold">{next.title}</p>
            <p className="mt-1 text-sm text-muted">{t(next.tag)}</p>
          </div>
          <span className="text-2xl text-accent transition group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{children}</h2>;
}

function Box({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="reveal card p-5">
      <p className={`text-sm font-semibold ${accent}`}>{title}</p>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

function Bullets({ items }: { items: T[] }) {
  const { t } = useLang();
  return (
    <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">
      {items.map((b) => (
        <li key={b.en} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
          <span>{t(b)}</span>
        </li>
      ))}
    </ul>
  );
}

function List({ items }: { items: T[] }) {
  const { t } = useLang();
  return (
    <ul className="space-y-2">
      {items.map((b) => <li key={b.en}>— {t(b)}</li>)}
    </ul>
  );
}
