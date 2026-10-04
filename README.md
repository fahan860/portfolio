# Portfolio — Fatima Zahrae Ahannuk

Bilingual (FR/EN) portfolio with project case studies, live demos and an AI assistant "Ask Fatima"
(RAG: BM25 retrieval over the site content + Gemini generation).

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Vercel

```
src/
├── data/site.ts            ← all content (texts, projects, links, metrics)
├── lib/knowledge.ts        ← chatbot knowledge base (built from site.ts)
├── lib/retrieve.ts         ← BM25 search engine (retrieval part of the RAG)
├── app/api/chat/route.ts   ← chatbot API (Gemini call, degraded mode without a key)
├── app/projects/[id]/      ← one case-study page per project (static generation)
├── components/             ← page sections, chat window, charts
public/cv/                  ← downloadable CVs (FR / EN)
```

Live demos of the projects: [portfolio-demos](https://github.com/fahan860/portfolio-demos) (Streamlit).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Optional environment variables: `GEMINI_API_KEY` (chatbot generation), `GEMINI_MODEL` (default `gemini-flash-latest`).
