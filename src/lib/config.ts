// ---------------------------------------------------------------------------
// Config centrale UPFLOW — modifie les valeurs ici, rien d'autre à toucher.
// ---------------------------------------------------------------------------

export const BRAND = {
  name: "UPFLOW",
  tagline: "MOTION DESIGN / 3D / VIDÉO",
};

// Marques et clients pour qui UPFLOW a réalisé une vidéo (bande « Ils m'ont
// confié leur vidéo » sous le haut de page).
export const BRANDS: {
  name: string;
  /** Logo in public/; brands without one are shown as their name. */
  logo?: string;
  /** "dark": single-colour logo shown as a dark silhouette (e.g. a white one). */
  tone?: "dark";
}[] = [
  { name: "Adidas" },
  { name: "Reebok", logo: "assets/brands/reebok.png", tone: "dark" },
  { name: "Live Nation" },
  { name: "UNLOCKED", logo: "assets/brands/unlocked.png" },
  { name: "Maison Vivaldi", logo: "assets/brands/maison-vivaldi.png" },
  { name: "Shot by 12", logo: "assets/brands/shotby12.png" },
  { name: "Maxance Pics", logo: "assets/brands/maxance-pics.png" },
  { name: "AuPropre", logo: "assets/brands/aupropre.png" },
  { name: "Aura Vitres", logo: "assets/brands/aura-vitres.png" },
  { name: "Lendy" },
  { name: "RendUp" },
];

// La personne derrière UPFLOW, montrée au moment de la prise de contact.
export const FOUNDER = {
  name: "Eliot",
  role: "Fondateur d'UPFLOW et motion designer",
  photo: "assets/team/eliot.jpg",
};

export const CONTACT = {
  email: "upflow.crea@gmail.com",
  whatsappNumber: "+33651478638", // format international, sans espaces, pour le lien wa.me
  whatsappDisplay: "+33 6 51 47 86 38",
  whatsappMessage: "Bonjour Eliot, j'aimerais parler de mon projet vidéo.",
  instagram: "https://www.instagram.com/upflow.motion",
  tiktok: "https://www.tiktok.com/@upflow.motion",
  linkedin: "", // laisse vide tant qu'il n'y a pas de page : l'icône est alors masquée
};

// Fiche Google Business : doit rester identique (nom, adresse, téléphone) à ce que
// le site affiche et envoie à Google, c'est ce qui fait remonter la fiche sur Maps.
export const LOCATION = {
  street: "18 Rue Hélène Brion",
  postalCode: "75013",
  city: "Paris",
  district: "Paris 13e",
  region: "Île-de-France",
  googleBusinessUrl: "https://www.google.com/search?kgmid=/g/11zzfxj32y",
};

// Agence web partenaire : lien en haut de page et crédit dans le pied de page.
export const PARTNER = {
  name: "AuPropre",
  url: "https://aupropreagency.fr/",
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
  logo: "assets/logo/upflow-logo-color.png",
  introVideo: "assets/video/upflow-presentation-2026-11.mp4",
  introPoster: "assets/video/upflow-presentation-2026-11-poster.jpg",
};

// ---------------------------------------------------------------------------
// Pricing — modifiable facilement.
// ---------------------------------------------------------------------------

// Promo "Première commande" (affichée au-dessus des tarifs, façon vyzuall) :
// chaque formule qui a un regularPrice montre son prix barré et sa remise.
export const FIRST_ORDER_PROMO = {
  tag: "PREMIÈRE COMMANDE",
  title: "Première commande ?",
  note: "Valable uniquement pour votre toute première commande.",
};

export const PRICING: {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  /** Usual price, shown struck through next to `price` (launch offer). */
  regularPrice?: string;
  prefix?: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  /** Delivery promise, shown as a badge on the card. */
  delivery?: string;
  /** External offer page: the CTA opens it instead of WhatsApp. */
  href?: string;
}[] = [
  {
    id: "essentiel",
    name: "LANCEMENT ESSENTIEL",
    subtitle: "Vidéo de 30 s",
    price: "150€",
    delivery: "Livrée en 7 jours",
    features: ["Script inclus", "Voix off", "Musique", "1 révision", "1 format au choix"],
    cta: "LANCER MA VIDÉO",
  },
  {
    id: "complet",
    name: "LANCEMENT COMPLET",
    subtitle: "Vidéo de 1 min",
    price: "250€",
    delivery: "Livrée en 7 jours",
    features: ["Script et storyboard", "Voix off", "2 révisions", "Formats LinkedIn et Instagram"],
    cta: "LANCER MA VIDÉO",
    highlight: true,
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
  /** Lightweight, muted, no-audio variant for the small grid-card preview
   * (the full `video` is used in the lightbox where it's shown full-screen).
   * Falls back to `video` when a project's source footage is already small. */
  previewVideo?: string;
  poster?: string;
  photos?: string[];
  /** Main video length in seconds and the date it went online (ISO), for the
   * project's own page and the VideoObject data Google reads. */
  duration?: number;
  date?: string;
  /** Main video shot in 9:16: shown whole (phone-shaped, over its own blurred
   * poster) instead of being cropped to 16:9, storyboard boards too. */
  vertical?: boolean;
  /** Portfolio category (tabs) and rank inside the portfolio (1 = shown first). */
  group?: "saas" | "commerce";
  rank?: number;
  /** A result shown on the card, e.g. { value: "10K", label: "vues" }. */
  stat?: { value: string; label: string };
  /** One short line shown on the portfolio card. */
  tagline?: string;
  /** The client's own website, linked from the project's lightbox. */
  website?: string;
  /** Storyboard boards (16:9 key frames), shown in order under the video. */
  storyboard?: string[];
  extraVideos?: { video: string; videoWebm?: string; poster?: string; label?: string; vertical?: boolean; duration?: number }[];
  description?: string;
  badge?: string;
};

const boards = (dir: string, count: number) =>
  Array.from({ length: count }, (_, i) => `assets/portfolio/${dir}/storyboard/board-${String(i + 1).padStart(2, "0")}.jpg`);

// Portfolio tabs, so visitors find a video like the one they need.
export const PORTFOLIO_CATEGORIES = [
  { id: "saas", label: "SaaS & applis" },
  { id: "commerce", label: "Freelance & commerce" },
] as const;

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "fluvo",
    group: "saas",
    category: "MOTION / 3D / SAAS",
    rank: 3,
    duration: 37,
    date: "2026-11-02",
    title: "Fluvo — Démo SaaS",
    tagline: "Paiement B2B différé · marque fictive.",
    description:
      "Une démo de vidéo SaaS pour une marque fictive, Fluvo, une solution de paiement B2B différé : le problème des délais de paiement, la solution, et ce que ça change pour l'entreprise. Motion design, 3D et voix off.",
    video: "assets/portfolio/fluvo/video.mp4",
    previewVideo: "assets/portfolio/fluvo/preview.mp4",
    poster: "assets/portfolio/fluvo/poster.jpg",
    storyboard: boards("fluvo", 12),
  },
  {
    id: "velto",
    group: "saas",
    category: "MOTION / SAAS",
    rank: 5,
    duration: 48,
    date: "2026-11-06",
    title: "Velto — Démo SaaS",
    tagline: "Logiciel d'automatisation · marque fictive.",
    description:
      "Une démo de vidéo SaaS pour une marque fictive, Velto, qui automatise les processus métier : comment présenter un logiciel B2B clairement, en moins d'une minute.",
    video: "assets/portfolio/velto/video.mp4",
    previewVideo: "assets/portfolio/velto/preview.mp4",
    poster: "assets/portfolio/velto/poster.jpg",
    storyboard: boards("velto", 12),
  },
  {
    id: "au-propre",
    group: "commerce",
    rank: 7,
    tagline: "Agence web pour créatifs et indépendants.",
    duration: 40,
    date: "2026-10-13",
    website: "https://aupropreagency.fr/",
    title: "AuPropre — Vidéo de présentation",
    category: "MOTION / AGENCE WEB",
    description:
      "AuPropre, l'agence web partenaire d'UPFLOW, qui crée des sites pour les créatifs et les indépendants. J'ai réalisé leur vidéo de présentation, du concept à l'animation.",
    video: "assets/portfolio/au-propre/video-v2.mp4",
    previewVideo: "assets/portfolio/au-propre/preview-v2.mp4",
    poster: "assets/portfolio/au-propre/poster-v2.jpg",
    storyboard: boards("au-propre", 19),
  },
  {
    id: "aura-vitres",
    group: "commerce",
    rank: 8,
    tagline: "Nettoyage de vitres et vitrines en Île-de-France.",
    duration: 26,
    date: "2026-10-12",
    website: "https://auravitres.com/",
    title: "Aura Vitres — Vidéo de présentation",
    category: "MOTION / NETTOYAGE",
    description:
      "Aura Vitres, une société de nettoyage de vitres et de vitrines. J'ai réalisé leur vidéo de présentation, du concept à l'animation.",
    video: "assets/portfolio/aura-vitre/video.mp4",
    previewVideo: "assets/portfolio/aura-vitre/preview.mp4",
    poster: "assets/portfolio/aura-vitre/poster.jpg",
    storyboard: boards("aura-vitre", 12),
  },
  {
    id: "maxance-pics",
    group: "commerce",
    rank: 6,
    tagline: "Photographe et vidéaste dans le sport.",
    duration: 33,
    date: "2026-10-14",
    website: "https://maxancepics.com/",
    title: "Maxance Pics — Présentation + annonce",
    category: "MOTION / PHOTO & VIDÉO",
    description:
      "Maxance Pics, photographe et vidéaste dans le sport : projets, événements et équipes, de la prise de vue au montage. J'ai réalisé sa vidéo de présentation et sa vidéo d'annonce en vertical pour les réseaux.",
    video: "assets/portfolio/maxance-pics/video-v2.mp4",
    previewVideo: "assets/portfolio/maxance-pics/preview-v2.mp4",
    poster: "assets/portfolio/maxance-pics/poster-v2.jpg",
    extraVideos: [
      {
        label: "La vidéo d'annonce, en vertical pour les réseaux",
        video: "assets/portfolio/maxance-pics/annonce.mp4",
        duration: 24,
        poster: "assets/portfolio/maxance-pics/annonce-poster.jpg",
        vertical: true,
      },
    ],
    storyboard: boards("maxance-pics", 12),
  },
  {
    id: "maison-vivaldi",
    group: "commerce",
    rank: 4,
    tagline: "Atelier de personnalisation textile.",
    duration: 40,
    date: "2026-10-17",
    website: "https://www.maisonvivaldi.com/",
    title: "Maison Vivaldi — Présentation + annonce",
    category: "MOTION / 3D / TEXTILE",
    description:
      "Maison Vivaldi, un atelier de personnalisation textile et une agence de communication : de l'idée au vêtement, puis la communication autour du produit. J'ai réalisé leur vidéo de présentation et la vidéo verticale qui annonce la mise en ligne de leur site.",
    video: "assets/portfolio/maison-vivaldi/video.mp4",
    previewVideo: "assets/portfolio/maison-vivaldi/preview.mp4",
    poster: "assets/portfolio/maison-vivaldi/poster.jpg",
    extraVideos: [
      {
        label: "La vidéo d'annonce, en vertical pour les réseaux",
        video: "assets/portfolio/maison-vivaldi/annonce.mp4",
        duration: 28,
        poster: "assets/portfolio/maison-vivaldi/annonce-poster.jpg",
        vertical: true,
      },
    ],
    storyboard: boards("maison-vivaldi", 12),
  },
  {
    id: "shotby12",
    group: "commerce",
    rank: 2,
    tagline: "Les événements sportifs racontés en stories.",
    duration: 34,
    date: "2026-10-30",
    website: "https://shotby12.fr/",
    title: "Shot by 12 — Vidéo de présentation",
    category: "MOTION / ÉVÉNEMENTIEL SPORT",
    description:
      "Shot by 12 raconte les événements sportifs en stories : tournois, matchs, soirées, couverts en direct. J'ai réalisé sa vidéo de présentation, du concept à l'animation.",
    video: "assets/portfolio/shotby12/video.mp4",
    previewVideo: "assets/portfolio/shotby12/preview.mp4",
    poster: "assets/portfolio/shotby12/poster.jpg",
    storyboard: boards("shotby12", 12),
  },
  {
    id: "unlocked-reebok",
    group: "commerce",
    rank: 1,
    stat: { value: "10K", label: "vues" },
    tagline: "Les détections Saison 3, expliquées aux joueurs.",
    duration: 50,
    date: "2026-11-04",
    vertical: true,
    title: "UNLOCKED × Reebok × Live Nation — Le tournoi expliqué",
    category: "MOTION / ÉVÉNEMENTIEL SPORT",
    description:
      "La vidéo verticale qui explique aux joueurs sélectionnés les détections UNLOCKED Saison 3, avec Reebok et Live Nation : la date, le lieu, le programme et les infos pratiques, jusqu'à la place à décrocher pour le Winter Classic.",
    video: "assets/portfolio/unlocked-reebok/video.mp4",
    previewVideo: "assets/portfolio/unlocked-reebok/preview.mp4",
    poster: "assets/portfolio/unlocked-reebok/poster.jpg",
    storyboard: boards("unlocked-reebok", 12),
  },
];

// ---------------------------------------------------------------------------
// Process steps
// ---------------------------------------------------------------------------

export const PROCESS_STEPS = [
  { n: "01", day: "JOUR 1", title: "CALL", text: "On discute de votre projet, vos objectifs, et ce que vous voulez vraiment dire." },
  { n: "02", day: "JOUR 2", title: "SCRIPT", text: "On écrit le script et on le valide ensemble avant de toucher à quoi que ce soit." },
  { n: "03", day: "JOUR 3", title: "STORYBOARD", text: "On pose chaque scène à plat pour visualiser la vidéo avant de l'animer." },
  { n: "04", day: "JOURS 4 À 6", title: "MOTION", text: "Motion design, 3D, sound design — on anime le tout." },
  { n: "05", day: "JOUR 7", title: "DELIVERY", text: "Vous récupérez votre vidéo, dans tous les formats dont vous avez besoin." },
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
];

// ---------------------------------------------------------------------------
// FAQ — affichée sur le site ET envoyée à Google (données structurées).
// Les prix sont repris automatiquement de PRICING ci-dessus.
// ---------------------------------------------------------------------------

const euros = (price?: string) => price?.replace("€", " €") ?? "";
const priceOf = (id: string) => {
  const plan = PRICING.find((p) => p.id === id);
  if (!plan) return "";
  return plan.regularPrice
    ? `${euros(plan.price)} au lieu de ${euros(plan.regularPrice)} (offre première commande)`
    : euros(plan.price);
};

export const FAQ = [
  {
    q: "Qu'est-ce qu'une vidéo motion design ?",
    a: "C'est une vidéo en graphisme animé : textes, formes, icônes, illustrations et éléments 3D qui prennent vie pour expliquer une idée ou présenter une marque, sans tournage. Idéal pour présenter votre entreprise, expliquer un produit ou une application, ou créer des publicités qui se démarquent sur les réseaux sociaux.",
  },
  {
    q: "Combien coûte une vidéo motion design ?",
    a: `Chez UPFLOW, deux formules à prix fixe, livrées en 7 jours maximum : le Lancement Essentiel à ${priceOf("essentiel")} (vidéo de 30 s, script inclus, voix off, musique, 1 révision, 1 format au choix) et le Lancement Complet à ${priceOf("complet")} (vidéo de 1 min, script et storyboard, voix off, 2 révisions, formats LinkedIn et Instagram). Besoin d'autre chose ? Envoyez-nous votre projet et on vous donne un tarif clair.`
  },
  {
    q: "Vous travaillez avec des entreprises à Paris ?",
    a: "Oui. UPFLOW est un studio de motion design basé à Paris (13e) : on travaille en priorité avec les entreprises, startups et agences de Paris et d'Île-de-France, et on peut se rencontrer pour lancer votre projet. On réalise aussi des vidéos à distance partout en France.",
  },
  {
    q: "En combien de temps ma vidéo est-elle prête ?",
    a: "En 7 jours maximum. Les deux formules, Lancement Essentiel et Lancement Complet, sont livrées en 7 jours : script, animation, musique ou voix off et révisions prévues dans la formule.",
  },
  {
    q: "Je n'ai pas encore de script, vous pouvez m'aider ?",
    a: "Oui. L'écriture du script fait partie du process : on part de votre objectif et de votre message, on écrit le script et on le valide ensemble avant de passer au storyboard puis à l'animation.",
  },
  {
    q: "Comment se passe la création d'une vidéo avec UPFLOW ?",
    a: "En cinq étapes : un appel pour comprendre votre projet, l'écriture du script, le storyboard pour visualiser chaque scène, l'animation en motion design et 3D avec le sound design, puis la livraison de votre vidéo. Pour démarrer, envoyez votre script ou écrivez-nous sur WhatsApp : on vous répond en moins de 48h.",
  },
  {
    q: "Motion design, 3D, sound design : quelle différence ?",
    a: "Le motion design anime des éléments graphiques en 2D (textes, formes, interfaces), la 3D ajoute des objets et des décors en volume pour un rendu plus premium, et le sound design crée l'ambiance sonore et les effets qui donnent du rythme à la vidéo. Chez UPFLOW, on combine les trois selon votre projet.",
  },
  {
    q: "Dans quels formats livrez-vous les vidéos ?",
    a: "Horizontal (16:9) pour votre site ou YouTube, vertical (9:16) pour Instagram, TikTok et les Reels, carré pour les fils d'actualité. Le Lancement Essentiel comprend un format au choix ; le Lancement Complet est décliné en formats LinkedIn et Instagram.",
  },
];
