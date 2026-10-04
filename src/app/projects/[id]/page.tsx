import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/site";
import ProjectView from "@/components/ProjectView";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = projects.find((x) => x.id === id);
  if (!p) return {};
  return {
    title: `${p.title} — Fatima Zahrae Ahannuk`,
    description: p.summary.en,
    openGraph: { title: `${p.title} — Fatima Zahrae Ahannuk`, description: p.summary.en },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!projects.some((p) => p.id === id)) notFound();
  return <ProjectView id={id} />;
}
