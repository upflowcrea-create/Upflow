// ---------------------------------------------------------------------------
// Config centrale UPFLOW — modifie les valeurs ici, rien d'autre à toucher.
// ---------------------------------------------------------------------------

export const BRAND = {
  name: "UPFLOW",
  tagline: "MOTION / 3D / VIDEO",
};

export const CONTACT = {
  email: "upflow.crea@gmail.com",
  whatsappNumber: "+33651478638", // format international, sans espaces, pour le lien wa.me
  whatsappDisplay: "+33 6 51 47 86 38",
  whatsappMessage: "Bonjour UPFLOW, j'aimerais parler de mon projet vidéo.",
  instagram: "https://instagram.com/upflow",
  tiktok: "https://tiktok.com/@upflow",
  linkedin: "https://linkedin.com/company/upflow",
};

export const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
  CONTACT.whatsappMessage,
)}`;

// Remplace par ton lien Calendly perso quand tu l'as.
export const CALENDLY_URL = "https://calendly.com/upflow/appel-decouverte";

// ---------------------------------------------------------------------------
// Assets — voir ASSETS.md à la racine du projet pour les instructions.
// ---------------------------------------------------------------------------

export const ASSETS = {
  logo: "assets/logo/upflow-logo.png",
  introVideo: "assets/video/upflow-intro.mp4",
  introVideoWebm: "assets/video/upflow-intro.webm",
  introPoster: "assets/video/upflow-intro-poster.jpg",
};

// ---------------------------------------------------------------------------
// Pricing — modifiable facilement.
// ---------------------------------------------------------------------------

export const PRICING = [
  {
    id: "starter",
    name: "STARTER",
    subtitle: "Vidéo présentation — 30s",
    price: "490€",
    prefix: "À partir de",
    features: ["Motion Design", "3D", "Sound Design", "1 format livré"],
    cta: "CRÉER LA MIENNE",
  },
  {
    id: "explain",
    name: "EXPLAIN",
    subtitle: "Vidéo explicative — 45 à 90s",
    price: "890€",
    prefix: "À partir de",
    features: ["Motion Design", "3D", "Storytelling", "Sound Design"],
    cta: "EXPLIQUER MON PROJET",
    highlight: true,
  },
  {
    id: "ads",
    name: "ADS",
    subtitle: "Vidéos courtes multi-angles",
    price: null,
    prefix: null,
    features: ["PACK 3 — 750€", "PACK 5 — 1 100€", "Tarifs de lancement"],
    cta: "LANCER UNE CAMPAGNE",
  },
];

// ---------------------------------------------------------------------------
// Portfolio — remplace src / poster par tes propres fichiers.
// ---------------------------------------------------------------------------

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  video?: string;
  poster?: string;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: "p1", title: "Nova — Sport App", category: "MOTION / SPORT" },
  { id: "p2", title: "Fluxa — SaaS Onboarding", category: "SaaS / EXPLICATIVE" },
  { id: "p3", title: "Origin — Product Reveal", category: "3D" },
  { id: "p4", title: "Byte — Ads Campaign", category: "ADVERTISING" },
  { id: "p5", title: "Vela — Brand Film", category: "MOTION" },
  { id: "p6", title: "Kairo — App Launch", category: "3D / SaaS" },
];

// ---------------------------------------------------------------------------
// Process steps
// ---------------------------------------------------------------------------

export const PROCESS_STEPS = [
  { n: "01", title: "CALL", text: "On parle." },
  { n: "02", title: "SCRIPT", text: "On met les idées dans le bon ordre." },
  { n: "03", title: "STORYBOARD", text: "On visualise." },
  { n: "04", title: "MOTION", text: "On anime." },
  { n: "05", title: "DELIVERY", text: "Vous récupérez la vidéo." },
];

// ---------------------------------------------------------------------------
// Services (section "OK. MAIS TU FAIS QUOI ?")
// ---------------------------------------------------------------------------

export const SERVICES = [
  {
    id: "presentation",
    n: "01",
    label: "VIDÉO DE PRÉSENTATION",
    short: "30 secondes pour comprendre qui vous êtes et ce que vous faites.",
    title: ["30 SECONDES.", "PAS UN TED TALK."],
    description: "Une vidéo courte pour présenter votre entreprise, votre produit ou votre service.",
    usage: ["SITE", "RÉSEAUX", "PROSPECTION", "SALES"],
    tags: ["Motion Design", "3D", "Sound Design"],
    cta: "CRÉER LA MIENNE →",
  },
  {
    id: "explicative",
    n: "02",
    label: "VIDÉO EXPLICATIVE",
    short: "Quand votre produit est compliqué, on le rend simple à comprendre.",
    title: ["EXPLIQUEZ.", "SANS ÉCRIRE UN ROMAN."],
    description: "Une vidéo plus longue pour expliquer clairement votre fonctionnement et votre valeur.",
    usage: ["ONBOARDING", "SITE", "RÉSEAUX", "CLIENTS"],
    tags: ["Motion Design", "3D", "Storytelling", "Sound Design"],
    cta: "EXPLIQUER MON PROJET →",
  },
  {
    id: "ads",
    n: "03",
    label: "CAMPAGNE ADS",
    short: "Des vidéos courtes pour montrer un problème, votre solution et donner envie d'agir.",
    title: ["3 VIDÉOS.", "PLUS D'ANGLES.", "PLUS DE POSSIBILITÉS."],
    description: "Des vidéos courtes pensées pour présenter un problème, votre solution et votre valeur.",
    usage: ["HOOK", "PROBLÈME", "SOLUTION", "CTA"],
    tags: ["PACK 3 — 750€", "PACK 5 — 1 100€"],
    note: "Tarifs de lancement.",
    cta: "LANCER UNE CAMPAGNE →",
  },
];
