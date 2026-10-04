import type { Chunk } from "./knowledge";

// Petit moteur de recherche BM25 (sans dépendance) pour la partie "retrieval" du RAG.

const STOP = new Set(
  "a an the and or of to in on for with is are was were be by at as it its this that what which who how does do did her she fatima zahrae ahannuk le la les un une des de du et ou en au aux est sont pour par sur avec dans quel quelle quels quelles qui que quoi comment elle son sa ses a-t-elle".split(" "),
);

// Synonymes FR → EN pour que les questions en français trouvent les passages (rédigés en anglais).
const SYN: Record<string, string> = {
  projet: "project", projets: "project", competences: "skills", compétences: "skills", langues: "languages",
  stage: "internship", formation: "education", diplome: "degree", diplôme: "degree", experience: "experience",
  expérience: "experience", certificat: "certifications", certificats: "certifications", certification: "certifications",
  donnees: "data", données: "data", apprentissage: "learning", profond: "deep", modele: "model", modèle: "model",
  modeles: "model", modèles: "model", precision: "accuracy", précision: "accuracy", resultat: "results", résultat: "results",
  resultats: "results", résultats: "results", garage: "garages", visage: "face", visages: "face",
  recommandation: "recommendation", faux: "fake", fausses: "fake", nouvelles: "news", diabete: "diabetes", diabète: "diabetes",
  banque: "banking", bancaire: "banking", contacter: "contact", joindre: "contact", email: "contact", mail: "contact",
  disponible: "available", quand: "february", force: "strengths", forces: "strengths", qualites: "strengths", qualités: "strengths",
  ia: "ai", prix: "price", voitures: "car", voiture: "car", occasion: "used", avis: "review", desinformation: "disinformation", collecte: "collection", financier: "financial", financiers: "financial", voyage: "travel", entrepot: "warehouse", intelligence: "ai", artificielle: "ai", ingenierie: "engineering", engineer: "engineering", disponibilite: "available", dispo: "available", parle: "languages", anglais: "english", français: "french", outils: "stack", technologies: "stack",
};

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{M}+/gu, "")
    .replace(/[^\p{L}\p{N}+#/.-]+/gu, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[.-]+|[.-]+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map((t) => SYN[t] ?? t);
}

export class BM25 {
  private docs: string[][];
  private df = new Map<string, number>();
  private avgdl: number;
  constructor(private chunks: Chunk[], private k1 = 1.4, private b = 0.75) {
    this.docs = chunks.map((c) => tokenize(`${c.title} ${c.title} ${c.text}`));
    for (const d of this.docs) for (const t of new Set(d)) this.df.set(t, (this.df.get(t) ?? 0) + 1);
    this.avgdl = this.docs.reduce((a, d) => a + d.length, 0) / this.docs.length;
  }
  search(query: string, k = 3): Chunk[] {
    const q = tokenize(query);
    const N = this.docs.length;
    const scored = this.docs.map((d, i) => {
      let score = 0;
      for (const t of q) {
        const f = d.filter((x) => x === t).length;
        if (!f) continue;
        const n = this.df.get(t) ?? 0;
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        score += idf * ((f * (this.k1 + 1)) / (f + this.k1 * (1 - this.b + (this.b * d.length) / this.avgdl)));
      }
      return { i, score };
    });
    scored.sort((a, b) => b.score - a.score);
    const top = scored.filter((s) => s.score > 0).slice(0, k).map((s) => this.chunks[s.i]);
    // Toujours inclure le profil général pour le contexte
    const profile = this.chunks.find((c) => c.id === "profile");
    if (profile && !top.includes(profile)) top.push(profile);
    return top;
  }
}
