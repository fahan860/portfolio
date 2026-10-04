import { buildKnowledge } from "@/lib/knowledge";
import { links } from "@/data/site";
import { BM25 } from "@/lib/retrieve";

// Chatbot "Ask Fatima" en mode FAQ : recherche BM25 dans la base de connaissances (src/lib/knowledge.ts),
// puis affichage de la fiche la plus pertinente dans la langue choisie. Aucun LLM, aucune clé d'API.

const KB = buildKnowledge();
const index = new BM25(KB);
const MIN_SCORE = 1.2; // en dessous : question hors sujet → message d'aide

type Lang = "fr" | "en";

// Limite simple anti-abus : 30 messages / 10 min par IP (mémoire de l'instance serveur)
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 30;
}

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/\p{M}+/gu, "").trim();
const GREET = /^(bonjour|bonsoir|salut|coucou|hello|hi|hey|salam|slt)\b[\s!.?]*$/;
const CONTACT = /\b(contact\w*|joindre|email|e-mail|mail|linkedin|telephone|cv|recrut\w*|disponib\w*|available|availability|stage|internship|pfe)\b/;
const THANKS = /^(merci|thanks|thank you|thx|super|parfait|top|ok|okay|d'accord)\b/;

const MSG = {
  greet: {
    fr: "Bonjour ! Posez-moi une question sur Fatima : ses projets (AUTO+, Face Detection, SmartLearn…), ses compétences, son parcours ou sa disponibilité pour un stage PFE.",
    en: "Hello! Ask me about Fatima: her projects (AUTO+, Face Detection, SmartLearn…), her skills, her background or her availability for an internship.",
  },
  thanks: {
    fr: `Avec plaisir ! Pour aller plus loin, vous pouvez écrire à Fatima : ${links.email}`,
    en: `You’re welcome! To go further, you can email Fatima: ${links.email}`,
  },
  unknown: {
    fr: `Je n’ai pas de réponse précise à cette question — je réponds uniquement à partir du contenu du portfolio.\n\nEssayez par exemple : « projets IA », « Data Engineering », « compétences », « disponibilité », « certifications ».\n\nOu contactez Fatima directement : ${links.email}`,
    en: `I don’t have a precise answer to that — I only answer from the portfolio content.\n\nTry for example: “AI projects”, “data engineering”, “skills”, “availability”, “certifications”.\n\nOr contact Fatima directly: ${links.email}`,
  },
};

const SUGGEST = {
  fr: ["Projet : AUTO+ Maroc", "Expérience Data Engineering", "Profil et disponibilité"],
  en: ["Project: AUTO+ Maroc", "Data engineering experience", "Profile and availability"],
};

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return Response.json({ answer: "Too many questions in a short time — please try again in a few minutes." }, { status: 429 });
  }

  let body: { messages?: { role: string; content: string }[]; lang?: Lang };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
  const lang: Lang = body.lang === "en" ? "en" : "fr";
  const question =
    [...(body.messages ?? [])].reverse().find((m) => m.role === "user")?.content?.toString().slice(0, 500) ?? "";
  if (!question.trim()) return Response.json({ error: "Empty question" }, { status: 400 });

  const q = norm(question);
  if (GREET.test(q)) return Response.json({ answer: MSG.greet[lang], sources: [] });
  if (THANKS.test(q) && q.length < 30) return Response.json({ answer: MSG.thanks[lang], sources: [] });

  // Questions de contact / disponibilité → fiche profil directement
  if (CONTACT.test(q) && q.split(/\s+/).length <= 8) {
    const profile = KB.find((c) => c.id === "profile")!;
    return Response.json({ answer: profile.display[lang], sources: [profile.label[lang]], followups: [] });
  }

  const ranked = index.rank(question, 4);
  // Si une section détaillée d'un projet arrive en tête, on préfère la fiche générale du projet (si elle est proche)
  const top = ranked[0]?.chunk;
  if (top && /^project-.+-/.test(top.id)) {
    const mainIdx = ranked.findIndex((r) => top.id.startsWith(r.chunk.id + "-"));
    if (mainIdx > 0 && ranked[mainIdx].score >= ranked[0].score * 0.6) {
      const [main] = ranked.splice(mainIdx, 1);
      ranked.unshift(main);
    }
  }
  if (!ranked.length || ranked[0].score < MIN_SCORE) {
    return Response.json({ answer: MSG.unknown[lang], sources: [], followups: SUGGEST[lang] });
  }

  const best = ranked[0].chunk;
  const others = ranked
    .slice(1)
    .filter((r) => r.score >= Math.max(MIN_SCORE, ranked[0].score * 0.45))
    .map((r) => r.chunk.label[lang])
    .slice(0, 2);
  // Les autres fiches pertinentes sont renvoyées comme questions de suivi cliquables
  return Response.json({ answer: best.display[lang], sources: [best.label[lang]], followups: others });
}
