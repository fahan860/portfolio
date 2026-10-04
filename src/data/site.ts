// ─────────────────────────────────────────────────────────────
//  Toutes les données du portfolio sont ici.
//  Pour modifier un texte, un lien ou un chiffre : éditer ce fichier uniquement.
// ─────────────────────────────────────────────────────────────

export type Lang = "fr" | "en";
export type T = { fr: string; en: string };


export const links = {
  email: "ahannuk.fatimazahrae@etu.uae.ac.ma",
  github: "https://github.com/fahan860",
  linkedin: "https://www.linkedin.com/in/fatima-zahrae-ahannuk-b936b1351/",
  cv: { fr: "/cv/CV_Fatima_Zahrae_Ahannuk_FR.pdf", en: "/cv/CV_Fatima_Zahrae_Ahannuk_EN.pdf" },
};

export const ui = {
  nav: {
    projects: { fr: "Projets", en: "Projects" },
    skills: { fr: "Compétences", en: "Skills" },
    journey: { fr: "Parcours", en: "Journey" },
    contact: { fr: "Contact", en: "Contact" },
  },
  available: { fr: "Disponible · PFE février 2027", en: "Available · Internship Feb 2027" },
  role: { fr: "Élève ingénieure Big Data & IA", en: "Big Data & AI Engineering Student" },
  tagline: {
    fr: "Je construis des pipelines de données et des modèles de Machine Learning — du scraping et de l’ETL jusqu’à l’API déployée.",
    en: "I build data pipelines and machine learning models — from scraping and ETL to a deployed API.",
  },
  seeking: {
    fr: "Je recherche un stage PFE de 4 à 6 mois à partir de février 2027 en Machine Learning, IA ou Data Engineering.",
    en: "Looking for a 4–6 month end-of-studies internship (PFE) from February 2027 in Machine Learning, AI or Data Engineering.",
  },
  cvBtn: { fr: "Télécharger mon CV", en: "Download my CV" },
  askBtn: { fr: "Poser une question (FAQ)", en: "Ask a question (FAQ)" },
  projectsTitle: { fr: "Projets", en: "Projects" },
  projectsSub: {
    fr: "Chaque projet : le problème, ce qui a été construit et le résultat mesuré. Cliquez pour l’étude de cas complète.",
    en: "Each project: the problem, what was built and the measured result. Click for the full case study.",
  },
  all: { fr: "Tous", en: "All" },
  problem: { fr: "Problème", en: "Problem" },
  built: { fr: "Ce qui a été construit", en: "What was built" },
  myRole: { fr: "Mon rôle", en: "My role" },
  team: { fr: "Équipe", en: "Team" },
  results: { fr: "Résultats", en: "Results" },
  limits: { fr: "Limites honnêtes", en: "Honest limitations" },
  learned: { fr: "Ce que j’en retiens", en: "What I learned" },
  next: { fr: "Projet suivant", en: "Next project" },
  back: { fr: "Tous les projets", en: "All projects" },
  caseStudy: { fr: "Voir l’étude de cas", en: "Read the case study" },
  demo: { fr: "Tester la démo", en: "Try the demo" },
  code: { fr: "Code", en: "Code" },
  skillsTitle: { fr: "Compétences", en: "Skills" },
  journeyTitle: { fr: "Parcours", en: "Journey" },
  certsTitle: { fr: "Certifications", en: "Certifications" },
  contactTitle: { fr: "Travaillons ensemble", en: "Let’s work together" },
  contactText: {
    fr: "Un stage PFE, une question sur un projet, ou juste échanger sur la data et l’IA : écrivez-moi.",
    en: "An internship, a question about a project, or just a chat about data and AI: get in touch.",
  },
  footer: { fr: "Conçu et développé par Fatima Zahrae Ahannuk", en: "Designed & built by Fatima Zahrae Ahannuk" },
  languages: { fr: "Langues", en: "Languages" },
  lowerBetter: { fr: "plus bas = mieux", en: "lower is better" },
  higherBetter: { fr: "plus haut = mieux", en: "higher is better" },
};

export const stats: { value: string; label: T }[] = [
  { value: "R² 0.94", label: { fr: "prix des voitures d’occasion", en: "used-car price model" } },
  { value: "~87%", label: { fr: "précision CNN (deepfakes)", en: "CNN accuracy (deepfakes)" } },
  { value: "5 400+", label: { fr: "documents web collectés", en: "web documents collected" } },
  { value: "123", label: { fr: "garages réels en base", en: "real garages in database" } },
];

// ─── Catégories (filtres) ────────────────────────────────────
export const categories: { id: string; label: T }[] = [
  { id: "ml", label: { fr: "Machine Learning", en: "Machine Learning" } },
  { id: "genai", label: { fr: "IA générative", en: "Generative AI" } },
  { id: "data", label: { fr: "Data Engineering", en: "Data Engineering" } },
  { id: "web", label: { fr: "Full-stack", en: "Full-stack" } },
];

export type Chart = {
  title: T;
  unit?: string;
  better: "low" | "high";
  data: { label: string | T; value: number; best?: boolean }[];
};
export type Section = {
  title: T;
  body?: T;
  bullets?: T[];
  chart?: Chart;
  image?: { src: string; alt: T; caption: T };
};
export type Project = {
  id: string;
  title: string;
  cats: string[];
  tag: T;
  context: T;
  summary: T;
  problem: T;
  built: T[];
  metrics: { value: string; label: T }[];
  stack: string[];
  code?: string;
  demo?: string;
  featured?: boolean;
  flow?: string[];
  team?: T;
  role?: T;
  sections?: Section[];
  limits?: T[];
  learned?: T[];
};

export const projects: Project[] = [
  // ════════════════════════════════════════════════════════════════
  {
    id: "autoplus",
    title: "AUTO+ Maroc",
    featured: true,
    cats: ["ml", "genai", "data", "web"],
    tag: { fr: "PFA · Plateforme data & IA", en: "Year-end project · Data & AI platform" },
    context: { fr: "PFA ENSA Tétouan, en binôme, encadré par un professeur · juin → oct. 2026", en: "Year-end project, ENSA Tétouan, team of 2, faculty-supervised · Jun → Oct 2026" },
    summary: {
      fr: "Plateforme qui met en relation automobilistes et garages au Maroc : données réelles, API, app mobile, 3 modèles ML et un agent IA de diagnostic.",
      en: "Platform connecting drivers with repair shops in Morocco: real data, API, mobile app, 3 ML models and an AI diagnosis agent.",
    },
    problem: {
      fr: "4,95 M de véhicules au Maroc, mais 95 % des garages ne sont pas digitalisés : trouver un garage fiable, connaître le juste prix ou comprendre une panne reste difficile.",
      en: "Morocco has 4.95M vehicles, yet 95% of repair shops are not digitised: finding a reliable garage, knowing a fair price or understanding a fault is hard.",
    },
    built: [
      { fr: "Données réelles : scraping + OpenStreetMap → 123 garages en PostgreSQL/PostGIS ; pipeline d’événements Redis → Parquet.", en: "Real data: scraping + OpenStreetMap → 123 garages in PostgreSQL/PostGIS; Redis → Parquet event pipeline." },
      { fr: "API Node.js/Express (JWT, 3 rôles, avis, chiffrement AES-256-GCM) et app mobile React Native (Expo).", en: "Node.js/Express API (JWT, 3 roles, reviews, AES-256-GCM encryption) and React Native (Expo) mobile app." },
      { fr: "Estimation du prix des voitures d’occasion : XGBoost sur 70 368 annonces → MAE 11 779 DH, R² 0,94.", en: "Used-car price estimation: XGBoost on 70,368 listings → MAE 11,779 MAD, R² 0.94." },
      { fr: "Recommandation de garages (embeddings e5, 87,5 % top-1), détection de faux avis et agent IA de diagnostic (RAG + Mistral).", en: "Garage recommendation (e5 embeddings, 87.5% top-1), fake-review detection and an AI diagnosis agent (RAG + Mistral)." },
    ],
    metrics: [
      { value: "R² 0.94", label: { fr: "modèle de prix", en: "price model" } },
      { value: "87.5%", label: { fr: "panne bien classée", en: "fault top-1" } },
      { value: "123", label: { fr: "garages réels", en: "real garages" } },
    ],
    flow: ["Scraping + OSM", "PostgreSQL/PostGIS", "Node.js API", "FastAPI ML", "React Native"],
    stack: ["Python", "XGBoost", "Optuna", "multilingual-e5", "RAG", "pgvector", "Mistral", "FastAPI", "PostgreSQL", "PostGIS", "Redis", "Parquet", "Node.js", "JWT", "React Native", "Docker"],
    code: "https://github.com/fahan860/AutoPlus-Maroc",
    demo: "https://fahan-autoplus.streamlit.app",
    team: { fr: "Binôme : Fatima Zahrae Ahannuk & Marouane · encadrement : professeur de l’ENSA Tétouan", en: "Team of two: Fatima Zahrae Ahannuk & Marouane · supervised by an ENSA Tétouan professor" },
    role: {
      fr: "Je me suis occupée en particulier de la collecte et du nettoyage des données (scraper telecontact.ma, fusion, import idempotent), du schéma de base, des endpoints API, du pipeline Redis → Parquet, des rôles / back-office / avis (API + mobile), de la vérification d’email et de la base de connaissances de l’agent IA. Les modèles ML et l’agent ont été développés en binôme.",
      en: "I focused on data collection and cleaning (telecontact.ma scraper, merge, idempotent import), the database schema, the API endpoints, the Redis → Parquet pipeline, roles / back-office / reviews (API + mobile), email verification and the AI agent’s knowledge base. The ML models and the agent were built as a pair.",
    },
    sections: [
      {
        title: { fr: "1 · Collecte de données réelles", en: "1 · Collecting real data" },
        body: {
          fr: "Plutôt que des données fictives, nous avons construit un annuaire réel des garages de Casablanca à partir de deux sources indépendantes.",
          en: "Instead of fake data, we built a real directory of Casablanca repair shops from two independent sources.",
        },
        bullets: [
          { fr: "Scraper Python de l’annuaire telecontact.ma : 3 passes fusionnées et dédupliquées → 100 garages (téléphones normalisés au format marocain, notes, encodage UTF-8 + BOM pour Excel).", en: "Python scraper for the telecontact.ma directory: 3 runs merged and deduplicated → 100 garages (Moroccan phone format, ratings, UTF-8 + BOM for Excel)." },
          { fr: "API Overpass d’OpenStreetMap : 35 points géolocalisés, dédupliqués par nom normalisé → 23 garages ajoutés.", en: "OpenStreetMap Overpass API: 35 geolocated points, deduplicated by normalised name → 23 garages added." },
          { fr: "Import idempotent (UPSERT) dans PostgreSQL + PostGIS (colonne GEOGRAPHY) pour la recherche « garages proches de moi ».", en: "Idempotent import (UPSERT) into PostgreSQL + PostGIS (GEOGRAPHY column) for “garages near me” search." },
          { fr: "Pipeline d’événements : chaque action de l’API est écrite dans Redis, puis vidée par un job Python vers un data lake Parquet partitionné par date.", en: "Event pipeline: every API action is written to Redis, then flushed by a Python job into a date-partitioned Parquet data lake." },
        ],
      },
      {
        title: { fr: "2 · Plateforme : API et application mobile", en: "2 · Platform: API and mobile app" },
        bullets: [
          { fr: "API REST Node.js/Express avec JWT et 3 rôles (automobiliste, mécanicien, admin) : garages, véhicules, cycle de vie des RDV (demande → confirmé → en cours → terminé), avis, revendication d’un garage validée par l’admin.", en: "Node.js/Express REST API with JWT and 3 roles (driver, mechanic, admin): garages, vehicles, appointment lifecycle (requested → confirmed → in progress → done), reviews, garage claims validated by an admin." },
          { fr: "Sécurité : téléphone et email chiffrés en base (AES-256-GCM) avec un hash HMAC-SHA256 pour la recherche et l’unicité, vérification d’email par code à usage unique.", en: "Security: phone and email encrypted at rest (AES-256-GCM) with an HMAC-SHA256 hash for lookup and uniqueness, one-time email verification codes." },
          { fr: "App React Native (Expo) : garages triés par distance, carte, prise de RDV, dashboard garagiste, back-office admin, estimation de prix, recommandation et assistant IA.", en: "React Native (Expo) app: garages sorted by distance, map, booking, mechanic dashboard, admin back-office, price estimation, recommendation and AI assistant." },
        ],
      },
      {
        title: { fr: "3 · Modèle A — estimation du prix d’une voiture d’occasion", en: "3 · Model A — used-car price estimation" },
        body: {
          fr: "Dataset public MUCars-2024 (annonces marocaines, licence CC BY 4.0) : 101 896 annonces brutes → 70 368 après 10 règles de nettoyage (doublons, prix manquants ou hors [15 000 ; 1 500 000] DH, véhicules accidentés, incohérences « neuf » / kilométrage, prix aberrants vs annonces comparables). XGBoost sur log(prix), 30 variables (marque, modèle, âge, kilométrage, boîte, carburant, ville, 14 équipements…), réglé avec Optuna (40 essais).",
          en: "Public MUCars-2024 dataset (Moroccan listings, CC BY 4.0): 101,896 raw listings → 70,368 after 10 cleaning rules (duplicates, missing or out-of-range prices, damaged vehicles, “new” vs mileage inconsistencies, price outliers vs comparable listings). XGBoost on log(price), 30 features (make, model, age, mileage, gearbox, fuel, city, 14 equipment flags…), tuned with Optuna (40 trials).",
        },
        chart: {
          title: { fr: "Erreur moyenne (MAE) sur la validation — 5 modèles comparés", en: "Mean absolute error on validation — 5 models compared" },
          unit: "DH",
          better: "low",
          data: [
            { label: "XGBoost", value: 13446, best: true },
            { label: "CatBoost", value: 15321 },
            { label: "Random Forest", value: 16433 },
            { label: { fr: "Régression linéaire", en: "Linear regression" }, value: 21690 },
            { label: { fr: "Médiane par groupe", en: "Group median" }, value: 24287 },
          ],
        },
        image: {
          src: "/projects/autoplus/reel_vs_predit.png",
          alt: { fr: "Nuage de points prix réel vs prix prédit", en: "Scatter plot of actual vs predicted price" },
          caption: { fr: "Jeu de test (10 556 annonces) : MAE 11 779 DH, erreur médiane 5 813 DH, MAPE 10,8 %, R² 0,939 ; 81 % des annonces estimées à ±15 %. Une fourchette de prix calibrée contient le vrai prix dans 80 % des cas.", en: "Test set (10,556 listings): MAE 11,779 MAD, median error 5,813 MAD, MAPE 10.8%, R² 0.939; 81% of listings within ±15%. A calibrated price range contains the actual price 80% of the time." },
        },
      },
      {
        title: { fr: "4 · Modèle B — recommandation de garages", en: "4 · Model B — garage recommendation" },
        body: {
          fr: "L’utilisateur décrit son problème en texte libre (« ça grince quand je freine »). Le modèle classe la panne par similarité d’embeddings multilingual-e5-large, puis classe les garages selon la spécialité (40 %), la distance (50 %) et la note (10 %), avec un filtrage collaboratif SVD en complément.",
          en: "The user describes the problem in free text (“it squeaks when I brake”). The model classifies the fault with multilingual-e5-large embedding similarity, then ranks garages by specialty (40%), distance (50%) and rating (10%), with SVD collaborative filtering on top.",
        },
        chart: {
          title: { fr: "Panne bien classée du premier coup (40 requêtes de test)", en: "Fault correctly classified at rank 1 (40 test queries)" },
          unit: "%",
          better: "high",
          data: [
            { label: "multilingual-e5-large", value: 87.5, best: true },
            { label: "MiniLM multilingue", value: 67.5 },
            { label: { fr: "Mots-clés", en: "Keywords" }, value: 40 },
          ],
        },
      },
      {
        title: { fr: "5 · Modèle C — détection de faux avis", en: "5 · Model C — fake-review detection" },
        body: {
          fr: "Gradient boosting (scikit-learn) sur 12 signaux : ancienneté du compte, avis lié à un RDV terminé ou annulé, rafales d’avis sur 48 h, écart avec la note moyenne, superlatifs, détails concrets, similarité avec les avis récents… Les avis suspects sont mis en modération à la publication. Évalué uniquement sur des avis simulés, en attendant des décisions de modération réelles.",
          en: "Gradient boosting (scikit-learn) on 12 signals: account age, review tied to a completed or cancelled appointment, 48-hour review bursts, gap with the average rating, superlatives, concrete details, similarity with recent reviews… Suspicious reviews are held for moderation on publication. Evaluated on simulated reviews only, until real moderation decisions are available.",
        },
      },
      {
        title: { fr: "6 · Agent IA de diagnostic (RAG)", en: "6 · AI diagnosis agent (RAG)" },
        bullets: [
          { fr: "Base de connaissances de pannes et de codes OBD (norme SAE J2012) avec un schéma, une politique de sources et un script Python de validation qualité ; recherche par embeddings e5 dans pgvector.", en: "Knowledge base of faults and OBD codes (SAE J2012) with a schema, a sources policy and a Python validation script; e5-embedding retrieval in pgvector." },
          { fr: "La conversation (français ou darija) est d’abord reformulée en une phrase française, puis le LLM (Mistral, ou Groq en test) pose au plus 2 questions ou donne une analyse prudente, uniquement à partir du contexte trouvé.", en: "The conversation (French or Darija) is first rephrased into one French sentence, then the LLM (Mistral, or Groq for tests) asks at most 2 questions or gives a cautious analysis grounded only in the retrieved context." },
          { fr: "Garde-fous : alerte immédiate en cas de danger (fumée, freins, odeur d’essence…), sources inventées retirées, gravité jamais inférieure à celle des sources, refus si le contexte n’est pas assez proche (seuil de similarité 0,79 mesuré sur 54 questions). Garages recommandés après l’analyse.", en: "Guardrails: immediate alert on danger (smoke, brakes, fuel smell…), invented sources removed, severity never below the sources’, refusal when context is not close enough (0.79 similarity threshold measured on 54 questions). Garages recommended after the analysis." },
        ],
      },
    ],
    limits: [
      { fr: "Le modèle de prix utilise des prix demandés dans des annonces 2024, pas des prix de transaction.", en: "The price model uses 2024 asking prices, not transaction prices." },
      { fr: "Le filtrage collaboratif et les faux avis sont évalués sur des données simulées : leurs scores ne valent pas performance réelle.", en: "Collaborative filtering and fake reviews are evaluated on simulated data: their scores are not real-world performance." },
      { fr: "Seuls 23 garages sur 123 sont géolocalisés ; l’agent IA est encore sur une branche de développement.", en: "Only 23 of 123 garages are geolocated; the AI agent is still on a development branch." },
    ],
    learned: [
      { fr: "Les vraies données coûtent du temps mais rendent tout le reste crédible.", en: "Real data costs time but makes everything else credible." },
      { fr: "Toujours comparer à une baseline simple (médiane par groupe, mots-clés) avant de célébrer un score.", en: "Always compare with a simple baseline (group median, keywords) before celebrating a score." },
      { fr: "Un agent LLM utile, c’est surtout des garde-fous et de l’évaluation, pas seulement un prompt.", en: "A useful LLM agent is mostly guardrails and evaluation, not just a prompt." },
    ],
  },
  // ════════════════════════════════════════════════════════════════
  {
    id: "deepfake",
    title: "Fake vs Real Face Detection",
    cats: ["ml"],
    tag: { fr: "Deep Learning · Computer Vision", en: "Deep Learning · Computer Vision" },
    context: { fr: "Projet d’équipe, module Deep Learning (Pr. Belcaid Anass) · janv. 2026", en: "Team project, Deep Learning course (Prof. Belcaid Anass) · Jan 2026" },
    summary: { fr: "Détecter automatiquement les visages générés par IA : 4 architectures CNN comparées en PyTorch.", en: "Automatically detecting AI-generated faces: 4 CNN architectures compared in PyTorch." },
    problem: { fr: "Les visages générés par IA sont de plus en plus réalistes : comment les distinguer automatiquement des vraies photos ?", en: "AI-generated faces are increasingly realistic: how can we tell them apart from real photos automatically?" },
    built: [
      { fr: "Dataset large et équilibré : détection et recadrage des visages, normalisation, nettoyage.", en: "Large, balanced dataset: face detection and cropping, normalisation, cleaning." },
      { fr: "4 architectures en PyTorch : VGG16 et AlexNet from scratch, DenseNet-121 en transfer learning, CNN maison à 5 blocs.", en: "4 PyTorch architectures: VGG16 and AlexNet from scratch, DenseNet-121 with transfer learning, custom 5-block CNN." },
      { fr: "Évaluation (matrice de confusion, classification report), analyse précision / coût de calcul et interface de test.", en: "Evaluation (confusion matrix, classification report), accuracy vs compute analysis and a test UI." },
    ],
    metrics: [
      { value: "~87%", label: { fr: "précision (test)", en: "test accuracy" } },
      { value: "4", label: { fr: "architectures", en: "architectures" } },
    ],
    stack: ["PyTorch", "CNN", "VGG16", "AlexNet", "DenseNet-121", "Transfer learning", "Computer Vision"],
    team: { fr: "Projet d’équipe, filière BDIA", en: "Team project, BDIA track" },
    code: "https://github.com/merouane01/DL1",
    demo: "https://fahan-face-detection.streamlit.app",
    sections: [
      {
        title: { fr: "Pourquoi comparer 4 architectures ?", en: "Why compare 4 architectures?" },
        bullets: [
          { fr: "VGG16 et AlexNet entraînés from scratch montrent ce qu’un réseau apprend sans connaissance préalable — et le risque de surapprentissage avec des millions de paramètres.", en: "VGG16 and AlexNet trained from scratch show what a network learns without prior knowledge — and the overfitting risk with millions of parameters." },
          { fr: "DenseNet-121 pré-entraîné sur ImageNet réutilise des caractéristiques visuelles générales : c’est l’apport du transfer learning.", en: "DenseNet-121 pre-trained on ImageNet reuses general visual features: the value of transfer learning." },
          { fr: "Le CNN maison à 5 blocs mesure jusqu’où un modèle léger peut aller pour un coût de calcul bien plus faible.", en: "The custom 5-block CNN measures how far a light model can go at a much lower compute cost." },
        ],
      },
    ],
    limits: [
      { fr: "Un détecteur peut mal généraliser à des images produites par d’autres générateurs que ceux du dataset.", en: "A detector may generalise poorly to images from generators not in the dataset." },
    ],
  },
  // ════════════════════════════════════════════════════════════════
  {
    id: "cyber",
    title: "Cyber-Intelligence",
    cats: ["data"],
    tag: { fr: "Web mining · Collecte multi-sources", en: "Web mining · Multi-source collection" },
    context: { fr: "Projet d’équipe (3 personnes) · mai 2026", en: "Team project (3 people) · May 2026" },
    summary: { fr: "Plateforme de détection de campagnes de désinformation : j’ai construit la collecte Reddit, Telegram et presse (5 400+ documents en arabe, français et anglais).", en: "Disinformation-campaign detection platform: I built the Reddit, Telegram and press collection (5,400+ documents in Arabic, French and English)." },
    problem: { fr: "Les campagnes de désinformation s’appuient sur des comptes coordonnés, des réseaux de sites et des contenus amplifiés artificiellement. Pour les détecter, il faut d’abord collecter des données hétérogènes, propres et reliées entre elles.", en: "Disinformation campaigns rely on coordinated accounts, site networks and artificially amplified content. Detecting them first requires collecting heterogeneous, clean and linked data." },
    built: [
      { fr: "Collecteur Reddit (API JSON publique) : 427 posts et 2 806 commentaires sur 10+ subreddits Maroc / Maghreb / Moyen-Orient.", en: "Reddit collector (public JSON API): 427 posts and 2,806 comments across 10+ Morocco / Maghreb / Middle-East subreddits." },
      { fr: "Graphe d’interactions auteur → post de 3 233 arêtes, prêt pour l’analyse de réseaux (Neo4j, centralité, communautés).", en: "Author → post interaction graph with 3,233 edges, ready for network analysis (Neo4j, centrality, communities)." },
      { fr: "Collecteur Telegram (Telethon) : 2 072 messages de canaux d’actualité (81 % arabe) avec vues et partages ; collecteur presse RSS + scraping : 153 articles.", en: "Telegram collector (Telethon): 2,072 news-channel messages (81% Arabic) with views and forwards; RSS + scraping press collector: 153 articles." },
    ],
    metrics: [
      { value: "5 458", label: { fr: "documents", en: "documents" } },
      { value: "3 233", label: { fr: "arêtes de graphe", en: "graph edges" } },
      { value: "3", label: { fr: "langues", en: "languages" } },
    ],
    flow: ["Reddit · Telegram · RSS", "Nettoyage + langue", "CSV / JSON", "Graphe d’interactions", "Analyse NLP & réseau"],
    stack: ["Python", "Requests", "Telethon", "Feedparser", "BeautifulSoup", "Pandas", "langdetect", "Graphes"],
    code: "https://github.com/saidjadli/cyber-intelligence",
    team: { fr: "Équipe de 3 : chacun a construit des collecteurs pour des sources différentes", en: "Team of 3: each member built collectors for different sources" },
    role: { fr: "J’ai développé les 3 collecteurs Reddit, Telegram et presse politique, avec un schéma de sortie commun (id, contenu, date, source, région, langue, liens sortants) et le graphe d’interactions Reddit.", en: "I built the Reddit, Telegram and political-press collectors with a shared output schema (id, content, date, source, region, language, outgoing links) and the Reddit interaction graph." },
    sections: [
      {
        title: { fr: "Architecture cible du projet", en: "Target architecture" },
        bullets: [
          { fr: "Stockage hybride prévu : MongoDB (documents), Neo4j (graphes de relations), Elasticsearch (recherche plein texte).", en: "Planned hybrid storage: MongoDB (documents), Neo4j (relationship graphs), Elasticsearch (full-text search)." },
          { fr: "3 axes d’analyse : contenu (texte généré par IA, toxicité, polarisation), structure (backlinks, link farms, PageRank, communautés) et usage (propagation, détection de bots).", en: "3 analysis axes: content (AI-generated text, toxicity, polarisation), structure (backlinks, link farms, PageRank, communities) and usage (propagation, bot detection)." },
          { fr: "Collecte éthique : données publiques uniquement, respect de robots.txt, auteurs pseudonymisés.", en: "Ethical collection: public data only, robots.txt respected, pseudonymised authors." },
        ],
        chart: {
          title: { fr: "Documents collectés par source (ma partie)", en: "Documents collected per source (my part)" },
          better: "high",
          data: [
            { label: { fr: "Reddit (commentaires)", en: "Reddit (comments)" }, value: 2806 },
            { label: "Telegram", value: 2072 },
            { label: "Reddit (posts)", value: 427 },
            { label: { fr: "Presse (RSS)", en: "Press (RSS)" }, value: 153 },
          ],
        },
      },
    ],
    limits: [
      { fr: "Les couches d’analyse (détection de bots, communautés, dashboard) sont la suite du projet.", en: "The analysis layers (bot detection, communities, dashboard) are the next phase." },
    ],
  },
  // ════════════════════════════════════════════════════════════════
  {
    id: "smartlearn",
    title: "SmartLearn",
    cats: ["ml", "data", "web"],
    tag: { fr: "Système de recommandation · Full-stack", en: "Recommender system · Full-stack" },
    context: { fr: "Projet personnel · févr. → mai 2026", en: "Personal project · Feb → May 2026" },
    summary: { fr: "Plateforme d’apprentissage qui recommande le bon cours suivant grâce à des embeddings, avec 5 microservices Docker.", en: "Learning platform recommending the right next course with embeddings, built as 5 Docker microservices." },
    problem: { fr: "Un catalogue identique pour tout le monde : les apprenants ne trouvent pas le bon cours suivant.", en: "A one-size-fits-all catalogue: learners can’t find the right next course." },
    built: [
      { fr: "Microservice de recommandation FastAPI : embeddings sentence-transformers des cours et historique d’interactions (vues, inscriptions, cours terminés).", en: "FastAPI recommendation microservice: sentence-transformers course embeddings and interaction history (views, enrolments, completions)." },
      { fr: "ETL Spark / Pandas sur 15 000 interactions (1 200 utilisateurs, 150 cours) ; MongoDB pour les événements, MySQL pour les données relationnelles.", en: "Spark / Pandas ETL over 15,000 interactions (1,200 users, 150 courses); MongoDB for events, MySQL for relational data." },
      { fr: "Robustesse : timeout de 2 s puis repli sur un classement par popularité ; tests Jest ; 5 services Docker Compose.", en: "Resilience: 2 s timeout then popularity fallback; Jest tests; 5 Docker Compose services." },
    ],
    metrics: [
      { value: "15k", label: { fr: "interactions", en: "interactions" } },
      { value: "5", label: { fr: "microservices", en: "microservices" } },
    ],
    flow: ["React + TS", "Express API (JWT)", "FastAPI ML", "MongoDB + MySQL"],
    stack: ["Python", "sentence-transformers", "FastAPI", "Spark", "React", "TypeScript", "Express", "MongoDB", "MySQL", "Docker", "Jest"],
    code: "https://github.com/fahan860/smartlearn-platform",
    demo: "https://fahan-smartlearn.streamlit.app",
    limits: [{ fr: "Données synthétiques : l’architecture est validée de bout en bout, pas la qualité réelle des recommandations.", en: "Synthetic data: the architecture is validated end to end, not real recommendation quality." }],
  },
  // ════════════════════════════════════════════════════════════════
  {
    id: "fakenews",
    title: "Fake News Detection",
    cats: ["ml"],
    tag: { fr: "NLP · Classification de texte", en: "NLP · Text classification" },
    context: { fr: "Projet d’équipe (4 personnes), module ML (Mme Imane Hachchane) · mai 2025", en: "Team project (4 people), ML course (Ms Imane Hachchane) · May 2025" },
    summary: { fr: "Classifier un article comme vrai ou faux : TF-IDF et 4 modèles comparés, SVM à 85,8 %.", en: "Classifying news as real or fake: TF-IDF and 4 models compared, SVM at 85.8%." },
    problem: { fr: "La désinformation circule plus vite que la vérification manuelle.", en: "Misinformation spreads faster than manual fact-checking." },
    built: [
      { fr: "Données enrichies via NewsAPI, prétraitement et vectorisation TF-IDF ; SVM, Random Forest, régression logistique et Naive Bayes comparés.", en: "Data enriched via NewsAPI, preprocessing and TF-IDF; SVM, Random Forest, Logistic Regression and Naive Bayes compared." },
      { fr: "Application qui analyse un texte ou une URL et renvoie la prédiction avec un score de confiance (API Flask avec authentification).", en: "App that analyses a text or a URL and returns the prediction with a confidence score (authenticated Flask API)." },
      { fr: "Démo en ligne sur les titres FakeNewsNet (TF-IDF 1–2 grammes + régression logistique) avec explication mot par mot.", en: "Live demo on FakeNewsNet headlines (TF-IDF 1–2-grams + logistic regression) with word-level explanation." },
    ],
    metrics: [{ value: "85.8%", label: { fr: "accuracy (SVM)", en: "accuracy (SVM)" } }],
    stack: ["Python", "Scikit-learn", "TF-IDF", "SVM", "NLP", "Flask", "Streamlit"],
    code: "https://github.com/fahan860/fake_news_detection",
    demo: "https://fahan-fakenews.streamlit.app",
    limits: [{ fr: "Le modèle apprend des mots et des styles, pas la vérité des faits ; il est biaisé vers la politique américaine et les célébrités.", en: "The model learns words and styles, not factual truth; it is biased toward US politics and celebrity news." }],
  },
  // ════════════════════════════════════════════════════════════════
  {
    id: "finsight",
    title: "FinSight AI",
    cats: ["genai", "web"],
    tag: { fr: "IA générative · Analyse de documents", en: "Generative AI · Document analysis" },
    context: { fr: "Projet personnel · 2026", en: "Personal project · 2026" },
    summary: { fr: "Analyse de rapports financiers PDF par LLM : résumé, KPI, risques et score de santé financière, sauvegardés par utilisateur.", en: "LLM analysis of financial-report PDFs: summary, KPIs, risks and a financial health score, saved per user." },
    problem: { fr: "Un rapport 10-K fait des centaines de pages : extraire vite les chiffres clés et les risques est long et technique.", en: "A 10-K report runs hundreds of pages: quickly extracting key figures and risks is slow and technical." },
    built: [
      { fr: "Upload de PDF (stockage privé par utilisateur), extraction du texte puis appel à Gemini dans une Edge Function avec une sortie JSON structurée.", en: "PDF upload (private per-user storage), text extraction, then a Gemini call in an Edge Function with structured JSON output." },
      { fr: "Extraction de KPI (chiffre d’affaires, résultat net, EBITDA, BPA, dette, cash-flow), facteurs de risque et score de santé de 0 à 100.", en: "KPI extraction (revenue, net income, EBITDA, EPS, debt, cash flow), risk factors and a 0–100 health score." },
      { fr: "Dashboard et historique, authentification, PostgreSQL avec Row Level Security, quota gratuit de 2 analyses par mois.", en: "Dashboard and history, authentication, PostgreSQL with Row Level Security, free quota of 2 analyses per month." },
    ],
    metrics: [],
    flow: ["React SPA", "Supabase Storage", "Edge Function", "Gemini (JSON)", "Postgres + RLS"],
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "RLS", "Edge Functions", "Gemini", "Tailwind"],
    code: "https://github.com/fahan860/analyze-gem",
    limits: [{ fr: "Pas d’OCR : les PDF scannés ne sont pas bien extraits.", en: "No OCR: scanned PDFs are not extracted well." }],
  },
  // ════════════════════════════════════════════════════════════════
  {
    id: "atlastrip",
    title: "AtlasTrip AI",
    cats: ["genai", "web"],
    tag: { fr: "IA générative · Agents", en: "Generative AI · Agents" },
    context: { fr: "Projet personnel · 2026", en: "Personal project · 2026" },
    summary: { fr: "Planificateur de voyages au Maroc : chat IA en streaming et agents pour vols, hôtels, météo et itinéraires.", en: "Morocco travel planner: streaming AI chat and agents for flights, hotels, weather and itineraries." },
    problem: { fr: "Préparer un voyage au Maroc demande de jongler entre beaucoup de sites (vols, riads, météo, programme).", en: "Planning a trip to Morocco means juggling many sites (flights, riads, weather, itinerary)." },
    built: [
      { fr: "Assistant de voyage avec réponses en streaming et historique des conversations.", en: "Travel assistant with streaming responses and conversation history." },
      { fr: "5 Edge Functions : chat, agent vols, agent hôtels/riads, agent météo et génération d’itinéraire enregistrée dans le voyage.", en: "5 Edge Functions: chat, flights agent, hotels/riads agent, weather agent and itinerary generation saved to the trip." },
      { fr: "Voyages sauvegardés par utilisateur (CRUD) protégés par Row Level Security ; clés IA uniquement côté serveur.", en: "Per-user saved trips (CRUD) protected by Row Level Security; AI keys server-side only." },
    ],
    metrics: [{ value: "5", label: { fr: "agents IA", en: "AI agents" } }],
    stack: ["React", "TypeScript", "Supabase", "Edge Functions", "LLM", "React Query", "Tailwind"],
    code: "https://github.com/fahan860/atlas-ai-travel",
  },
  // ════════════════════════════════════════════════════════════════
  {
    id: "diabetes",
    title: "Diabetes Risk Screening",
    cats: ["ml"],
    tag: { fr: "Machine Learning · Santé", en: "Machine Learning · Healthcare" },
    context: { fr: "Projet académique · 2026", en: "Academic project · 2026" },
    summary: { fr: "Dépistage du diabète : 4 modèles comparés, avec le rappel comme priorité et un Pipeline pour éviter le training-serving skew.", en: "Diabetes screening: 4 models compared, recall-first, with a Pipeline to avoid training-serving skew." },
    problem: { fr: "Dépister le diabète tôt à partir de quelques mesures cliniques.", en: "Screen for diabetes early from a few clinical measurements." },
    built: [
      { fr: "Pima Indians (768 patientes) : zéros impossibles remplacés par la médiane, log de l’insuline, normalisation.", en: "Pima Indians (768 patients): impossible zeros replaced by the median, log insulin, scaling." },
      { fr: "4 modèles comparés et sélection par F1-score, en privilégiant le rappel (rater un cas est plus grave qu’une fausse alerte).", en: "4 models compared, selected by F1-score, prioritising recall (missing a case is worse than a false alarm)." },
      { fr: "Bug corrigé : l’app envoyait des valeurs non normalisées au SVM ; tout le prétraitement est maintenant dans un Pipeline scikit-learn.", en: "Bug fixed: the app sent unscaled values to the SVM; all preprocessing now lives in a scikit-learn Pipeline." },
    ],
    metrics: [
      { value: "77.8%", label: { fr: "rappel (SVM)", en: "recall (SVM)" } },
      { value: "75.3%", label: { fr: "accuracy", en: "accuracy" } },
    ],
    stack: ["Scikit-learn", "Pandas", "SVM", "Pipeline", "Flask", "Streamlit"],
    code: "https://github.com/fahan860/diabetes-prediction-ml",
    demo: "https://fahan-diabetes.streamlit.app",
    sections: [
      {
        title: { fr: "Comparaison des modèles (jeu de test)", en: "Model comparison (test set)" },
        chart: {
          title: { fr: "F1-score", en: "F1-score" },
          unit: "%",
          better: "high",
          data: [
            { label: "SVM (RBF)", value: 64.8, best: true },
            { label: { fr: "Régression logistique", en: "Logistic regression" }, value: 60.8 },
            { label: "KNN", value: 53.8 },
            { label: "Random Forest", value: 50.0 },
          ],
        },
      },
    ],
  },
  // ════════════════════════════════════════════════════════════════
  {
    id: "dwbi",
    title: "Mini Data Warehouse (Pentaho)",
    cats: ["data"],
    tag: { fr: "BI · ETL · Schéma en étoile", en: "BI · ETL · Star schema" },
    context: { fr: "TP Informatique décisionnelle (Pr. Nisrine El Ayat) · déc. 2025", en: "Business Intelligence lab (Prof. Nisrine El Ayat) · Dec 2025" },
    summary: { fr: "ETL Pentaho PDI vers MySQL : nettoyage, règles de validation et schéma en étoile pour analyser les résultats d’examens.", en: "Pentaho PDI ETL into MySQL: cleaning, validation rules and a star schema to analyse exam results." },
    problem: { fr: "Trois fichiers CSV sales (étudiants, cours, examens) doivent devenir un entrepôt fiable pour l’analyse.", en: "Three dirty CSV files (students, courses, exams) must become a reliable warehouse for analysis." },
    built: [
      { fr: "Règles de validation par fichier (identifiants non nuls, âge > 17, note entre 0 et 20, normalisation Oui/Non) avec champs is_valid et error_reason.", en: "Per-file validation rules (non-null ids, age > 17, grade between 0 and 20, Yes/No normalisation) with is_valid and error_reason fields." },
      { fr: "Déduplication (Sort rows + Unique rows) et jointures Stream lookup pour garantir des clés étrangères valides.", en: "Deduplication (Sort rows + Unique rows) and Stream lookup joins to guarantee valid foreign keys." },
      { fr: "Schéma en étoile : dim_etudiant, dim_cours et table de faits fact_examens.", en: "Star schema: dim_etudiant, dim_cours and the fact_examens fact table." },
    ],
    metrics: [],
    flow: ["3 CSV", "Pentaho PDI", "Validation + dédup", "MySQL (étoile)"],
    stack: ["Pentaho PDI", "MySQL", "ETL", "Star schema", "SQL"],
  },
  // ════════════════════════════════════════════════════════════════
  {
    id: "banking",
    title: "Banking Anti-Overload System",
    cats: ["data"],
    tag: { fr: "Bases de données · PL/SQL", en: "Databases · PL/SQL" },
    context: { fr: "Projet en binôme, module Bases de données · janv. 2026", en: "Pair project, Databases course · Jan 2026" },
    summary: { fr: "Traiter un grand volume d’opérations bancaires sans surcharger Oracle : file d’attente, triggers et procédures PL/SQL.", en: "Processing high volumes of banking operations without overloading Oracle: queue, triggers and PL/SQL procedures." },
    problem: { fr: "Traiter un grand nombre d’opérations bancaires sans surcharger la base.", en: "Process a high volume of banking operations without overloading the database." },
    built: [
      { fr: "Les débits/crédits sont mis en file d’attente, interceptés par des triggers PL/SQL et traités progressivement par des procédures stockées.", en: "Debits/credits are queued, intercepted by PL/SQL triggers and processed progressively by stored procedures." },
      { fr: "Détection automatique des conflits et anomalies ; interface web Flask de monitoring.", en: "Automatic conflict and anomaly detection; Flask monitoring web interface." },
    ],
    metrics: [],
    stack: ["Oracle", "PL/SQL", "Triggers", "Python", "Flask"],
    code: "https://github.com/fahan860/bank-app-flask-oracle",
  },
  // ════════════════════════════════════════════════════════════════
  {
    id: "mapsscraper",
    title: "Google Maps Restaurant Scraper",
    cats: ["data"],
    tag: { fr: "Web scraping · Automatisation", en: "Web scraping · Automation" },
    context: { fr: "Projet personnel · mars 2026", en: "Personal project · Mar 2026" },
    summary: { fr: "Scraper Playwright asynchrone qui extrait les restaurants d’une ville depuis Google Maps vers un CSV.", en: "Async Playwright scraper extracting a city’s restaurants from Google Maps into a CSV." },
    problem: { fr: "Constituer rapidement une base de commerces locaux (nom, adresse, téléphone, note, avis, site web) pour une analyse de marché.", en: "Quickly build a dataset of local businesses (name, address, phone, rating, reviews, website) for market analysis." },
    built: [
      { fr: "Playwright en mode asynchrone pour le contenu dynamique, scroll automatique pour charger 50+ résultats.", en: "Async Playwright for dynamic content, auto-scroll to load 50+ results." },
      { fr: "CLI configurable (--ville, --categorie, --max-results), délais aléatoires, gestion d’erreurs, export CSV avec Pandas.", en: "Configurable CLI (--ville, --categorie, --max-results), random delays, error handling, CSV export with Pandas." },
    ],
    metrics: [],
    stack: ["Python", "Playwright", "asyncio", "Pandas"],
  },
  // ════════════════════════════════════════════════════════════════
  {
    id: "traffic",
    title: "Urban Traffic Analysis",
    cats: ["ml"],
    tag: { fr: "Data Mining · Analyse exploratoire", en: "Data Mining · Exploratory analysis" },
    context: { fr: "Projet académique, module Data Mining (Pr. Belcaid Anass) · 2025", en: "Academic project, Data Mining course (Prof. Belcaid Anass) · 2025" },
    summary: { fr: "Analyse d’un dataset Kaggle de trafic urbain et comparaison de 5 algorithmes supervisés et non supervisés.", en: "Analysis of a Kaggle urban-traffic dataset and comparison of 5 supervised and unsupervised algorithms." },
    problem: { fr: "Comprendre les tendances du trafic urbain et identifier les modèles les plus adaptés.", en: "Understand urban traffic patterns and find the most suitable models." },
    built: [
      { fr: "Analyse exploratoire (EDA) pour repérer tendances et anomalies.", en: "Exploratory data analysis (EDA) to spot trends and anomalies." },
      { fr: "K-means, clustering hiérarchique, arbres de décision, Naive Bayes et SVM comparés et interprétés.", en: "K-means, hierarchical clustering, decision trees, Naive Bayes and SVM compared and interpreted." },
    ],
    metrics: [{ value: "5", label: { fr: "algorithmes", en: "algorithms" } }],
    stack: ["Python", "Pandas", "Scikit-learn", "Clustering", "Matplotlib"],
  },
  // ════════════════════════════════════════════════════════════════
  {
    id: "excel",
    title: "Excel Sales Automation",
    cats: ["data"],
    tag: { fr: "Automatisation · ETL Python", en: "Automation · Python ETL" },
    context: { fr: "Projet personnel · 2025", en: "Personal project · 2025" },
    summary: { fr: "Pipeline Python qui fusionne des fichiers Excel mensuels, les nettoie et génère un rapport de direction multi-onglets.", en: "Python pipeline that merges monthly Excel files, cleans them and generates a multi-sheet executive report." },
    problem: { fr: "Consolider chaque mois des tableurs de ventes à la main est long et source d’erreurs : formats de date mélangés, noms de produits incohérents, valeurs manquantes, doublons.", en: "Consolidating monthly sales spreadsheets by hand is slow and error-prone: mixed date formats, inconsistent product names, missing values, duplicates." },
    built: [
      { fr: "Lecture et fusion automatiques de tous les fichiers du dossier ; dates texte, datetime ou numéro de série Excel unifiées.", en: "Automatic discovery and merge of every file in the folder; text, datetime and Excel-serial dates unified." },
      { fr: "Normalisation des noms de produits et catégories, imputation par médiane par produit, suppression des doublons, calcul du chiffre d’affaires.", en: "Product and category normalisation, per-product median imputation, duplicate removal, revenue computation." },
      { fr: "Rapport Excel formaté : KPI, top produits, chiffre d’affaires par pays et par catégorie, données propres.", en: "Formatted Excel report: KPIs, top products, revenue by country and category, clean data." },
    ],
    metrics: [{ value: "1 389 → 1 254", label: { fr: "lignes nettoyées (démo)", en: "rows cleaned (demo)" } }],
    flow: ["Excel mensuels", "Fusion", "Nettoyage", "Rapport multi-onglets"],
    stack: ["Python", "Pandas", "openpyxl", "XlsxWriter", "ETL"],
    code: "https://github.com/fahan860/excel-automation-project",
    demo: "https://fahan-excel.streamlit.app",
  },
];

export const skills: { group: T; items: string[] }[] = [
  { group: { fr: "Langages", en: "Languages" }, items: ["Python", "SQL", "PL/SQL"] },
  { group: { fr: "Machine Learning", en: "Machine Learning" }, items: ["Scikit-learn", "XGBoost", "Optuna", "SVM", "Random Forest", "Feature engineering"] },
  { group: { fr: "Deep Learning & NLP", en: "Deep Learning & NLP" }, items: ["PyTorch", "CNN", "Transfer learning", "TF-IDF", "Embeddings (e5, sentence-transformers)"] },
  { group: { fr: "IA générative", en: "Generative AI" }, items: ["RAG", "pgvector", "LLM (Mistral, Gemini)", "Agents", "Garde-fous / guardrails"] },
  { group: { fr: "Data Engineering", en: "Data Engineering" }, items: ["Web scraping", "Playwright", "Apache Spark", "ETL", "Pentaho PDI", "Redis", "Parquet"] },
  { group: { fr: "Bases de données", en: "Databases" }, items: ["PostgreSQL / PostGIS", "Oracle", "MySQL", "MongoDB", "Supabase"] },
  { group: { fr: "Déploiement & Web", en: "Deployment & Web" }, items: ["FastAPI", "Flask", "Node.js", "React Native", "Docker", "Git", "Next.js"] },
  { group: { fr: "BI", en: "BI" }, items: ["Power BI", "Excel", "Schéma en étoile"] },
];

export const journey: { when: string; title: T; org: T; text: T }[] = [
  {
    when: "2022 – 2027",
    title: { fr: "Cycle ingénieur — Big Data & Intelligence Artificielle", en: "Engineering degree — Big Data & Artificial Intelligence" },
    org: { fr: "ENSA Tétouan, Université Abdelmalek Essaâdi", en: "ENSA Tétouan, Abdelmalek Essaâdi University" },
    text: { fr: "Machine Learning, Deep Learning, Big Data, bases de données, informatique décisionnelle, data mining.", en: "Machine Learning, Deep Learning, Big Data, databases, business intelligence, data mining." },
  },
  {
    when: "2026",
    title: { fr: "Projet de fin d’année — AUTO+ Maroc", en: "Year-end project — AUTO+ Morocco" },
    org: { fr: "ENSA Tétouan, en binôme, encadré par un professeur", en: "ENSA Tétouan, team of two, faculty-supervised" },
    text: { fr: "Plateforme data & IA : données réelles, API, app mobile, 3 modèles ML, agent RAG.", en: "Data & AI platform: real data, API, mobile app, 3 ML models, RAG agent." },
  },
  {
    when: "2026",
    title: { fr: "Explorer Program", en: "Explorer Program" },
    org: { fr: "UM6P — Université Mohammed VI Polytechnique", en: "UM6P — Mohammed VI Polytechnic University" },
    text: { fr: "Programme sélectif innovation & entrepreneuriat : startup EdTech basée sur l’IA, mentoring, pitch.", en: "Selective innovation & entrepreneurship program: AI-powered EdTech startup, mentoring, pitch." },
  },
];

export const certs: { name: string; org: string }[] = [
  { name: "Intermediate Deep Learning with PyTorch", org: "DataCamp" },
  { name: "GenAI Job Simulation — AI & Data Analysis", org: "BCG X" },
  { name: "Harnessing the Power of Data with Power BI", org: "Microsoft" },
  { name: "Master PL/SQL", org: "EDUCBA · Coursera" },
  { name: "Introduction to Cloud", org: "IBM" },
  { name: "Open-source AI Models", org: "Scrimba" },
  { name: "Preparing Data for Analysis with Excel", org: "Microsoft" },
];

export const languages: { name: T; level: T }[] = [
  { name: { fr: "Arabe", en: "Arabic" }, level: { fr: "Natif", en: "Native" } },
  { name: { fr: "Français", en: "French" }, level: { fr: "Courant", en: "Fluent" } },
  { name: { fr: "Anglais", en: "English" }, level: { fr: "Intermédiaire", en: "Intermediate" } },
  { name: { fr: "Espagnol", en: "Spanish" }, level: { fr: "Débutant", en: "Beginner" } },
];
