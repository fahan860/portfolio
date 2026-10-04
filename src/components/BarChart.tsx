"use client";

import type { Chart } from "@/data/site";
import { ui } from "@/data/site";
import { useLang } from "./LangProvider";

const fmt = (v: number, lang: string) => v.toLocaleString(lang === "fr" ? "fr-FR" : "en-US", { maximumFractionDigits: 1 });

/** Graphique en barres horizontales, sans dépendance. */
export default function BarChart({ chart }: { chart: Chart }) {
  const { t, lang } = useLang();
  const max = Math.max(...chart.data.map((d) => d.value));
  return (
    <figure className="rounded-xl border border-line bg-bg-2/70 p-4 sm:p-5">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-semibold">{t(chart.title)}</span>
        <span className="font-mono text-[11px] text-muted">{t(chart.better === "low" ? ui.lowerBetter : ui.higherBetter)}</span>
      </figcaption>
      <div className="space-y-2.5">
        {chart.data.map((d) => {
          const label = t(d.label);
          return (
            <div key={label} className="grid grid-cols-[minmax(0,7.5rem)_1fr] items-center gap-3 text-xs sm:grid-cols-[11rem_1fr]">
              <span className={`truncate ${d.best ? "font-semibold text-text" : "text-muted"}`} title={label}>{label}</span>
              <div className="flex items-center gap-2">
                <div className="h-5 flex-1 overflow-hidden rounded-md bg-white/[0.04]">
                  <div
                    className={`h-full rounded-md ${d.best ? "bg-gradient-to-r from-accent to-accent-2" : "bg-accent/35"}`}
                    style={{ width: `${Math.max(3, (d.value / max) * 100)}%` }}
                  />
                </div>
                <span className={`w-16 text-right font-mono ${d.best ? "text-text" : "text-muted"}`}>
                  {fmt(d.value, lang)}{chart.unit === "%" ? " %" : chart.unit ? ` ${chart.unit}` : ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </figure>
  );
}
