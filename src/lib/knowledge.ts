import { certs, journey, languages, links, projects, skills } from "@/data/site";

export type Chunk = { id: string; title: string; text: string };

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
      });
    }
  }

  chunks.push({
    id: "skills",
    title: "Skills",
    text: skills.map((s) => `${s.group.en}: ${s.items.join(", ")}`).join(". ") + ".",
  });

  chunks.push({
    id: "journey",
    title: "Education and experience",
    text: journey.map((j) => `${j.when} — ${j.title.en}, ${j.org.en}: ${j.text.en}`).join(" "),
  });

  chunks.push({
    id: "certs",
    title: "Certifications",
    text: "Certifications: " + certs.map((c) => `${c.name} (${c.org})`).join("; ") + ".",
  });

  chunks.push({
    id: "languages",
    title: "Languages",
    text: "Spoken languages: " + languages.map((l) => `${l.name.en} (${l.level.en})`).join(", ") + ".",
  });

  chunks.push({
    id: "strengths",
    title: "Strengths and working style",
    text:
      "Her strength is covering the whole data lifecycle: collecting real data (web scraping, APIs), building pipelines (Spark, Redis to Parquet), modelling (scikit-learn, PyTorch) and shipping it behind an API (FastAPI, Flask, Docker). " +
      "She prefers real data over synthetic data (e.g. 123 real garages scraped for AUTO+), documents her work in READMEs and progress reports, and works well in teams (most academic projects were team projects). " +
      "She also has an entrepreneurial side: she was selected for the UM6P Explorer innovation program.",
  });

  chunks.push({
    id: "data-engineering",
    title: "Data engineering experience",
    text:
      "Data engineering experience: in AUTO+ Maroc she built a real data collection pipeline (web scraping of the telecontact.ma directory and the OpenStreetMap Overpass API, cleaning, deduplication, idempotent UPSERT import of 123 garages into PostgreSQL/PostGIS) and an event pipeline (Redis queue flushed to a date-partitioned Parquet data lake with Python). " +
      "In the Cyber-Intelligence team project she built the Reddit, Telegram and press collectors (5,458 documents in Arabic, French and English, plus a 3,233-edge interaction graph). " +
      "In SmartLearn she wrote a Spark / Pandas ETL over 15,000 interactions. She built a star-schema data warehouse with Pentaho PDI and MySQL, a Google Maps scraper with Playwright, and Oracle PL/SQL queue processing with triggers and stored procedures.",
  });

  chunks.push({
    id: "ai-experience",
    title: "Machine learning and AI experience",
    text:
      "Machine learning and AI experience: used-car price estimation with XGBoost tuned by Optuna on 70,368 Moroccan listings (MAE 11,779 MAD, R² 0.94, best of 5 models, team of two); garage recommendation with multilingual-e5 embeddings (87.5% top-1 fault classification vs 40% for keywords); fake-review detection with gradient boosting; " +
      "an AI diagnosis agent with RAG (pgvector, Mistral LLM, guardrails, French and Darija); deep learning with PyTorch (fake vs real face detection, 4 CNN architectures, about 87% test accuracy); NLP (fake news detection, SVM 85.8% accuracy); LLM apps (FinSight AI financial report analyzer with Gemini, AtlasTrip AI travel agents); " +
      "recommender systems (SmartLearn); diabetes screening (SVM, 77.8% recall). This chatbot itself is a small RAG system she built.",
  });

  chunks.push({
    id: "portfolio",
    title: "This portfolio and the chatbot",
    text:
      "This portfolio was built with Next.js and Tailwind CSS and is deployed on Vercel. " +
      "This assistant is a small retrieval-augmented generation (RAG) system: the question is matched against a knowledge base about Fatima with BM25 ranking, and the best passages are given to a Gemini LLM that must answer only from them. " +
      "The interactive demos run on Streamlit Community Cloud (code: github.com/fahan860/portfolio-demos).",
  });

  return chunks;
}
