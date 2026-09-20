// ---------------------------------------------------------------------------
// Config centrale UPFLOW — modifie les valeurs ici, rien d'autre à toucher.
// ---------------------------------------------------------------------------

export const BRAND = {
  name: "UPFLOW",
  tagline: "MOTION DESIGN / 3D / VIDÉO",
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

// ---------------------------------------------------------------------------
// Formulaire de réservation (bouton "Book a call" / "Parler du projet").
//
// Le site a un vrai formulaire intégré (date, heure, coordonnées, message) —
// pas d'iframe Google qui peut être bloquée. À la validation, le formulaire
// envoie un email avec toutes les infos directement à upflow.crea@gmail.com,
// via Web3Forms (gratuit, sans backend à héberger).
//
// Pour l'activer :
//   1. Va sur https://web3forms.com
//   2. Entre ton adresse email (upflow.crea@gmail.com) — pas besoin de créer de compte.
//   3. Tu reçois une "Access Key" par email : copie-la.
//   4. Colle-la ci-dessous, à la place de la valeur d'exemple.
// ---------------------------------------------------------------------------
export const WEB3FORMS_ACCESS_KEY = "eb6f6655-29dc-4636-aa77-414064e847c8";

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
    price: "350€",
    prefix: "À partir de",
    features: ["Motion Design", "3D", "Sound Design", "1 format livré"],
    cta: "CRÉER LA MIENNE",
  },
  {
    id: "explain",
    name: "EXPLAIN",
    subtitle: "Vidéo explicative — 45 à 90s",
    price: "500€",
    prefix: "À partir de",
    features: ["Motion Design", "3D", "Storytelling", "Sound Design"],
    cta: "EXPLIQUER MON PROJET",
    highlight: true,
  },
  {
    id: "ads",
    name: "ADS",
    subtitle: "Vidéos courtes multi-angles",
    price: "500€",
    prefix: "À partir de",
    features: ["5 vidéos courtes type ads", "Motion Design", "3D", "Multi-formats"],
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
  videoWebm?: string;
  poster?: string;
  photos?: string[];
  extraVideos?: { video: string; videoWebm?: string; poster?: string; label?: string }[];
  description?: string;
  badge?: string;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "lendy",
    title: "Lendy — Vidéo de lancement",
    category: "MOTION / APP",
    description:
      "Lendy, une appli qui se lance avec un principe simple : louer du matériel multimédia entre particuliers pour créer du contenu. J'ai réalisé leur vidéo de présentation, du concept à l'animation.",
    video: "assets/portfolio/lendy/video.mp4",
    videoWebm: "assets/portfolio/lendy/video.webm",
    poster: "assets/portfolio/lendy/poster.jpg",
  },
  {
    id: "rendup",
    title: "RendUp — Vidéo de marque",
    category: "3D / MOCKUP",
    description:
      "RendUp, un prestataire qui propose des mockups 3D pour donner aux marques des visuels produits plus professionnels. J'ai réalisé leur vidéo de présentation, du concept à l'animation.",
    video: "assets/portfolio/rendup/video.mp4",
    videoWebm: "assets/portfolio/rendup/video.webm",
    poster: "assets/portfolio/rendup/poster.jpg",
  },
  {
    id: "adidas-bucket",
    title: "Adidas × Bucket — Live Event",
    category: "ÉVÉNEMENTIEL / LIVE",
    badge: "On fait ça aussi",
    description:
      "Un tournoi de streetball en plein Paris, écran géant, et mes animations diffusées en direct pendant l'event : scores, noms des équipes, règles du jeu, moments forts. Le motion design, en temps réel.",
    video: "assets/portfolio/event-adidas-bucket/video.mp4",
    videoWebm: "assets/portfolio/event-adidas-bucket/video.webm",
    poster: "assets/portfolio/event-adidas-bucket/poster.jpg",
    photos: [
      "assets/portfolio/event-adidas-bucket/photo-1.jpg",
      "assets/portfolio/event-adidas-bucket/photo-2.jpg",
      "assets/portfolio/event-adidas-bucket/photo-3.jpg",
      "assets/portfolio/event-adidas-bucket/photo-4.jpg",
    ],
    extraVideos: [
      {
        label: "Diffusée en direct sur l'écran géant",
        video: "assets/portfolio/event-adidas-bucket/screen-clip.mp4",
        videoWebm: "assets/portfolio/event-adidas-bucket/screen-clip.webm",
        poster: "assets/portfolio/event-adidas-bucket/screen-clip-poster.jpg",
      },
    ],
  },
  {
    id: "winter-classique",
    title: "Adidas × UNLOCKED — Winter Classique",
    category: "ÉVÉNEMENTIEL / LIVE",
    description:
      "Un événement basket organisé par Adidas et UNLOCKED, en collaboration avec Wingstop, réunissant les meilleurs joueurs U21 de France. J'ai réalisé la vidéo teaser de promotion de l'event et géré la diffusion des animations sur l'écran géant en direct.",
    video: "assets/portfolio/winter-classique/screen-clip.mp4",
    videoWebm: "assets/portfolio/winter-classique/screen-clip.webm",
    poster: "assets/portfolio/winter-classique/screen-clip-poster.jpg",
    photos: [
      "assets/portfolio/winter-classique/photo-1.jpg",
      "assets/portfolio/winter-classique/photo-2.jpg",
      "assets/portfolio/winter-classique/photo-3.jpg",
      "assets/portfolio/winter-classique/photo-4.jpg",
    ],
    extraVideos: [
      {
        label: "La vidéo teaser de promotion de l'event",
        video: "assets/portfolio/winter-classique/video.mp4",
        videoWebm: "assets/portfolio/winter-classique/video.webm",
        poster: "assets/portfolio/winter-classique/poster.jpg",
      },
      {
        label: "Les animations diffusées en direct sur les écrans",
        video: "assets/portfolio/winter-classique/animations-live.mp4",
        videoWebm: "assets/portfolio/winter-classique/animations-live.webm",
        poster: "assets/portfolio/winter-classique/animations-live-poster.jpg",
      },
    ],
  },
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
    tags: ["Motion Design", "3D", "Multi-formats"],
    cta: "LANCER UNE CAMPAGNE →",
  },
];
