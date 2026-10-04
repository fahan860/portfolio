import { certs, journey, languages, links, projects, skills, type T } from "@/data/site";

/** text = passage indexé (anglais) ; display = réponse affichée telle quelle dans la FAQ (fr / en). */
export type Chunk = { id: string; title: string; text: string; label: T; display: T };

const both = (fr: string, en: string): T => ({ fr, en });

/** Base de connaissances du chatbot, générée à partir de src/data/site.ts (+ quelques fiches en plus). */
export function buildKnowledge(): Chunk[] {
  const chunks: Chunk[] = [];

  chunks.push({
    id: "profile",
    title: "Profile",
    text:
      "Fatima Zahrae Ahannuk is a final-year Big Data & Artificial Intelligence engineering student at ENSA Tétouan (Abdelmalek Essaâdi University, Morocco), graduating in 2027. " +
      "She is looking for a 4–6 month end-of-studies internship (PFE) starting February 2027 in Machine Learning, AI or Data Engineering, on-site, hybrid or remote. " +
      "She is based in Tétouan (Tanger-Tétouan-Al Hoceima region), Morocco. " +
      `Contact: ${links.email}. GitHub: ${links.github}. LinkedIn: ${links.linkedin}.`,
    label: both("Profil et disponibilité", "Profile and availability"),
    display: both(
      "Fatima Zahrae Ahannuk est élève ingénieure en dernière année Big Data & Intelligence Artificielle à l’ENSA Tétouan (Université Abdelmalek Essaâdi), diplômée en 2027.\n\n" +
        "Elle est disponible pour un stage de fin d’études (PFE) de 4 à 6 mois à partir de février 2027, en Machine Learning, IA ou Data Engineering — sur site, hybride ou à distance. Basée à Tétouan, Maroc.\n\n" +
        `Contact : ${links.email}\nGitHub : ${links.github}\nLinkedIn : ${links.linkedin}`,
      "Fatima Zahrae Ahannuk is a final-year Big Data & Artificial Intelligence engineering student at ENSA Tétouan (Abdelmalek Essaâdi University), graduating in 2027.\n\n" +
        "She is available for a 4–6 month end-of-studies internship (PFE) from February 2027 in Machine Learning, AI or Data Engineering — on-site, hybrid or remote. Based in Tétouan, Morocco.\n\n" +
        `Contact: ${links.email}\nGitHub: ${links.github}\nLinkedIn: ${links.linkedin}`,
    ),
  });

  for (const p of projects) {
    chunks.push({
      id: `project-${p.id}`,
      title: `Project: ${p.title}`,
      text:
        `${p.title} (${p.tag.en}; ${p.context.en}). Problem: ${p.problem.en} ` +
        `What was built: ${p.built.map((b) => b.en).join(" ")} ` +
        (p.team ? `Team: ${p.team.en}. ` : "") +
        (p.role ? `Her role: ${p.role.en} ` : "") +
        (p.metrics.length ? `Results: ${p.metrics.map((m) => `${m.value} ${m.label.en}`).join(", ")}. ` : "") +
        `Tech stack: ${p.stack.join(", ")}.` +
        (p.code ? ` Code: ${p.code}.` : "") +
        (p.demo ? ` Live demo: ${p.demo}.` : "") +
        (p.limits ? ` Limitations: ${p.limits.map((l) => l.en).join(" ")}` : ""),
      label: both(`Projet : ${p.title}`, `Project: ${p.title}`),
      display: both(projectCard(p, "fr"), projectCard(p, "en")),
    });
    // Sections détaillées des études de cas = passages supplémentaires
    for (const sec of p.sections ?? []) {
      const chart = sec.chart
        ? ` ${sec.chart.title.en}: ` + sec.chart.data.map((d) => `${typeof d.label === "string" ? d.label : d.label.en} ${d.value}${sec.chart!.unit ?? ""}`).join(", ") + "."
        : "";
      chunks.push({
        id: `project-${p.id}-${sec.title.en}`,
        title: `${p.title} — ${sec.title.en}`,
        text: [sec.body?.en, ...(sec.bullets ?? []).map((x) => x.en), sec.image?.caption.en].filter(Boolean).join(" ") + chart,
        label: both(`${p.title} — ${sec.title.fr}`, `${p.title} — ${sec.title.en}`),
        display: both(sectionCard(p.title, sec, "fr"), sectionCard(p.title, sec, "en")),
      });
    }
  }

  chunks.push({
    id: "skills",
    title: "Skills",
    text: skills.map((s) => `${s.group.en}: ${s.items.join(", ")}`).join(". ") + ".",
    label: both("Compétences", "Skills"),
    display: both(
      "Compétences techniques :\n" + skills.map((s) => `• ${s.group.fr} : ${s.items.join(", ")}`).join("\n"),
      "Technical skills:\n" + skills.map((s) => `• ${s.group.en}: ${s.items.join(", ")}`).join("\n"),
    ),
  });

  chunks.push({
    id: "journey",
    title: "Education and experience",
    text: journey.map((j) => `${j.when} — ${j.title.en}, ${j.org.en}: ${j.text.en}`).join(" "),
    label: both("Formation et parcours", "Education and experience"),
    display: both(
      "Parcours :\n" + journey.map((j) => `• ${j.when} — ${j.title.fr} (${j.org.fr}) : ${j.text.fr}`).join("\n"),
      "Journey:\n" + journey.map((j) => `• ${j.when} — ${j.title.en} (${j.org.en}): ${j.text.en}`).join("\n"),
    ),
  });

  chunks.push({
    id: "certs",
    title: "Certifications",
    text: "Certifications: " + certs.map((c) => `${c.name} (${c.org})`).join("; ") + ".",
    label: both("Certifications", "Certifications"),
    display: both(
      "Certifications :\n" + certs.map((c) => `• ${c.name} — ${c.org}`).join("\n"),
      "Certifications:\n" + certs.map((c) => `• ${c.name} — ${c.org}`).join("\n"),
    ),
  });

  chunks.push({
    id: "languages",
    title: "Languages",
    text: "Spoken languages: " + languages.map((l) => `${l.name.en} (${l.level.en})`).join(", ") + ".",
    label: both("Langues", "Languages"),
    display: both(
      "Langues : " + languages.map((l) => `${l.name.fr} (${l.level.fr})`).join(", ") + ".",
      "Languages: " + languages.map((l) => `${l.name.en} (${l.level.en})`).join(", ") + ".",
    ),
  });

  chunks.push({
    id: "strengths",
    title: "Strengths and working style",
    text:
      "Her strength is covering the whole data lifecycle: collecting real data (web scraping, APIs), building pipelines (Spark, Redis to Parquet), modelling (scikit-learn, PyTorch) and shipping it behind an API (FastAPI, Flask, Docker). " +
      "She prefers real data over synthetic data (e.g. 123 real garages scraped for AUTO+), documents her work in READMEs and progress reports, and works well in teams (most academic projects were team projects). " +
      "She also has an entrepreneurial side: she was selected for the UM6P Explorer innovation program.",
    label: both("Points forts", "Strengths"),
    display: both(
      "Ses points forts :\n" +
        "• Elle couvre tout le cycle de la donnée : collecte de données réelles (scraping, API), pipelines (Spark, Redis → Parquet), modélisation (scikit-learn, PyTorch) et mise en production derrière une API (FastAPI, Flask, Docker).\n" +
        "• Elle privilégie les données réelles (ex. 123 vrais garages collectés pour AUTO+) et documente son travail (README, rapports d’avancement).\n" +
        "• Habituée au travail en équipe : la plupart de ses projets académiques sont des projets d’équipe.\n" +
        "• Fibre entrepreneuriale : sélectionnée pour l’Explorer Program de l’UM6P.",
      "Her strengths:\n" +
        "• She covers the whole data lifecycle: collecting real data (scraping, APIs), pipelines (Spark, Redis → Parquet), modelling (scikit-learn, PyTorch) and shipping behind an API (FastAPI, Flask, Docker).\n" +
        "• She prefers real data (e.g. 123 real garages collected for AUTO+) and documents her work (READMEs, progress reports).\n" +
        "• Used to teamwork: most of her academic projects were team projects.\n" +
        "• Entrepreneurial side: selected for the UM6P Explorer Program.",
    ),
  });

  chunks.push({
    id: "data-engineering",
    title: "Data engineering experience",
    text:
      "Data engineering experience: in AUTO+ Maroc she built a real data collection pipeline (web scraping of the telecontact.ma directory and the OpenStreetMap Overpass API, cleaning, deduplication, idempotent UPSERT import of 123 garages into PostgreSQL/PostGIS) and an event pipeline (Redis queue flushed to a date-partitioned Parquet data lake with Python). " +
      "In the Cyber-Intelligence team project she built the Reddit, Telegram and press collectors (5,458 documents in Arabic, French and English, plus a 3,233-edge interaction graph). " +
      "In SmartLearn she wrote a Spark / Pandas ETL over 15,000 interactions. She built a star-schema data warehouse with Pentaho PDI and MySQL, a Google Maps scraper with Playwright, and Oracle PL/SQL queue processing with triggers and stored procedures.",
    label: both("Expérience Data Engineering", "Data engineering experience"),
    display: both(
      "Expérience en Data Engineering :\n" +
        "• AUTO+ Maroc : pipeline de collecte réelle (scraping de telecontact.ma + API OpenStreetMap Overpass, nettoyage, dédoublonnage, import UPSERT idempotent de 123 garages dans PostgreSQL/PostGIS) et pipeline d’événements (file Redis → data lake Parquet partitionné par date).\n" +
        "• Cyber-Intelligence : collecteurs Reddit, Telegram et presse (5 458 documents en arabe, français et anglais + graphe de 3 233 interactions).\n" +
        "• SmartLearn : ETL Spark / Pandas sur 15 000 interactions.\n" +
        "• Aussi : data warehouse en étoile (Pentaho PDI + MySQL), scraper Google Maps (Playwright), traitement en file d’attente Oracle PL/SQL (triggers, procédures).",
      "Data engineering experience:\n" +
        "• AUTO+ Maroc: real data collection pipeline (scraping telecontact.ma + OpenStreetMap Overpass API, cleaning, deduplication, idempotent UPSERT of 123 garages into PostgreSQL/PostGIS) and an event pipeline (Redis queue → date-partitioned Parquet data lake).\n" +
        "• Cyber-Intelligence: Reddit, Telegram and press collectors (5,458 documents in Arabic, French and English + a 3,233-edge interaction graph).\n" +
        "• SmartLearn: Spark / Pandas ETL over 15,000 interactions.\n" +
        "• Also: star-schema data warehouse (Pentaho PDI + MySQL), Google Maps scraper (Playwright), Oracle PL/SQL queue processing (triggers, procedures).",
    ),
  });

  chunks.push({
    id: "ai-experience",
    title: "Machine learning and AI experience",
    text:
      "Machine learning and AI experience: used-car price estimation with XGBoost tuned by Optuna on 70,368 Moroccan listings (MAE 11,779 MAD, R² 0.94, best of 5 models, team of two); garage recommendation with multilingual-e5 embeddings (87.5% top-1 fault classification vs 40% for keywords); fake-review detection with gradient boosting; " +
      "an AI diagnosis agent with RAG (pgvector, Mistral LLM, guardrails, French and Darija); deep learning with PyTorch (fake vs real face detection, 4 CNN architectures, about 87% test accuracy); NLP (fake news detection, SVM 85.8% accuracy); LLM apps (FinSight AI financial report analyzer with Gemini, AtlasTrip AI travel agents); " +
      "recommender systems (SmartLearn); diabetes screening (SVM, 77.8% recall). This FAQ assistant uses BM25 retrieval, the search half of a RAG system.",
    label: both("Expérience Machine Learning & IA", "Machine learning and AI experience"),
    display: both(
      "Expérience en Machine Learning et IA :\n" +
        "• Estimation de prix de voitures d’occasion : XGBoost + Optuna sur 70 368 annonces marocaines (MAE 11 779 MAD, R² 0,94, meilleur de 5 modèles).\n" +
        "• Recommandation de garages par embeddings multilingual-e5 (87,5 % de pannes bien classées au 1er rang vs 40 % par mots-clés) et détection de faux avis.\n" +
        "• Agent de diagnostic RAG (pgvector, LLM Mistral, garde-fous, français et darija).\n" +
        "• Deep Learning PyTorch : détection de visages générés par IA, 4 CNN, ~87 % de précision en test.\n" +
        "• NLP : détection de fake news (SVM, 85,8 % de précision) · Apps LLM : FinSight AI (Gemini), AtlasTrip AI (agents).\n" +
        "• Systèmes de recommandation (SmartLearn) · Dépistage du diabète (SVM, rappel 77,8 %).",
      "Machine learning and AI experience:\n" +
        "• Used-car price estimation: XGBoost + Optuna on 70,368 Moroccan listings (MAE 11,779 MAD, R² 0.94, best of 5 models).\n" +
        "• Garage recommendation with multilingual-e5 embeddings (87.5% top-1 fault classification vs 40% with keywords) and fake-review detection.\n" +
        "• RAG diagnosis agent (pgvector, Mistral LLM, guardrails, French and Darija).\n" +
        "• Deep learning with PyTorch: AI-generated face detection, 4 CNNs, ~87% test accuracy.\n" +
        "• NLP: fake news detection (SVM, 85.8% accuracy) · LLM apps: FinSight AI (Gemini), AtlasTrip AI (agents).\n" +
        "• Recommender systems (SmartLearn) · Diabetes screening (SVM, 77.8% recall).",
    ),
  });

  chunks.push({
    id: "portfolio",
    title: "This portfolio and the chatbot",
    text:
      "This portfolio was built with Next.js and Tailwind CSS and is deployed on Vercel. " +
      "This assistant is a FAQ chatbot: the question is matched against a knowledge base about Fatima with BM25 ranking and the best matching answer is shown, without any LLM. " +
      "The interactive demos (live demo links) run on Streamlit Community Cloud (code: github.com/fahan860/portfolio-demos).",
    label: both("Ce portfolio et l’assistant", "This portfolio and the assistant"),
    display: both(
      "Ce portfolio est construit avec Next.js et Tailwind CSS, déployé sur Vercel.\n\n" +
        "Cet assistant est une FAQ intelligente : votre question est comparée à une base de connaissances sur Fatima avec un classement BM25 (moteur de recherche écrit sans dépendance), et la réponse la plus pertinente s’affiche — sans LLM, donc sans invention.\n\n" +
        "Les démos interactives tournent sur Streamlit Community Cloud (code : github.com/fahan860/portfolio-demos).",
      "This portfolio is built with Next.js and Tailwind CSS and deployed on Vercel.\n\n" +
        "This assistant is a smart FAQ: your question is matched against a knowledge base about Fatima with BM25 ranking (a dependency-free search engine) and the most relevant answer is shown — no LLM, so nothing is made up.\n\n" +
        "The interactive demos run on Streamlit Community Cloud (code: github.com/fahan860/portfolio-demos).",
    ),
  });

  return chunks;
}

type P = (typeof projects)[number];
type S = NonNullable<P["sections"]>[number];

function projectCard(p: P, l: "fr" | "en"): string {
  const fr = l === "fr";
  const lines = [`${p.title} — ${p.tag[l]} (${p.context[l]})`, "", p.summary[l]];
  if (p.built.length) lines.push("", (fr ? "Réalisé :" : "What was built:"), ...p.built.slice(0, 4).map((b) => `• ${b[l]}`));
  if (p.metrics.length) lines.push("", (fr ? "Résultats : " : "Results: ") + p.metrics.map((m) => `${m.value} ${m.label[l]}`).join(" · "));
  if (p.team) lines.push((fr ? "Équipe : " : "Team: ") + p.team[l]);
  lines.push((fr ? "Stack : " : "Stack: ") + p.stack.join(", "));
  if (p.demo) lines.push((fr ? "Démo en ligne : " : "Live demo: ") + p.demo);
  if (p.code) lines.push((fr ? "Code : " : "Code: ") + p.code);
  return lines.join("\n");
}

function sectionCard(title: string, sec: S, l: "fr" | "en"): string {
  const lines = [`${title} — ${sec.title[l]}`];
  if (sec.body) lines.push("", sec.body[l]);
  if (sec.bullets?.length) lines.push("", ...sec.bullets.map((b) => `• ${b[l]}`));
  if (sec.chart)
    lines.push("", `${sec.chart.title[l]}${l === "fr" ? " :" : ":"} ` + sec.chart.data.map((d) => `${typeof d.label === "string" ? d.label : d.label[l]} ${d.value}${sec.chart!.unit ?? ""}`).join(", "));
  return lines.join("\n");
}
