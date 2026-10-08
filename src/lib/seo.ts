import { ASSETS, BRAND, CONTACT, FAQ, PRICING } from "./config";

// Structured data (schema.org JSON-LD) built from the same config the page
// renders, so prices and FAQ answers given to search engines can never drift
// from what visitors see. Injected into <head> at build time by
// scripts/prerender.mjs.

const SITE = "https://upflowmotion.fr/";
const abs = (path: string) => new URL(path, SITE).href;
const amount = (price: string) => Number(price.replace(/[^\d]/g, ""));

export function jsonLd() {
  const org = {
    "@type": "ProfessionalService",
    "@id": `${SITE}#organization`,
    name: BRAND.name,
    alternateName: "UPFLOW Motion",
    description:
      "Studio de vidéo motion design, 3D et sound design : vidéos de présentation, vidéos explicatives et campagnes publicitaires pour les entreprises.",
    url: SITE,
    logo: abs(ASSETS.logo),
    image: abs("assets/og-image.jpg"),
    email: CONTACT.email,
    telephone: CONTACT.whatsappNumber,
    areaServed: { "@type": "Country", name: "France" },
    priceRange: "€€",
    knowsAbout: ["Vidéo motion design", "Motion design", "Animation 3D", "Sound design", "Vidéo explicative", "Vidéo de présentation", "Publicité vidéo"],
    sameAs: [CONTACT.instagram, CONTACT.tiktok, CONTACT.linkedin].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Vidéos motion design",
      itemListElement: PRICING.map((plan) => ({
        "@type": "Offer",
        name: `${plan.name} — ${plan.subtitle}`,
        itemOffered: {
          "@type": "Service",
          name: plan.subtitle,
          serviceType: "Vidéo motion design",
          description: plan.features.join(", "),
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: amount(plan.price),
          priceCurrency: "EUR",
        },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE}#website`,
    name: BRAND.name,
    url: SITE,
    inLanguage: "fr-FR",
    publisher: { "@id": `${SITE}#organization` },
  };

  const video = {
    "@type": "VideoObject",
    name: "UPFLOW — vidéo de présentation du studio",
    description: "30 secondes pour comprendre ce que fait UPFLOW, studio de vidéo motion design, 3D et sound design.",
    thumbnailUrl: abs(ASSETS.introPoster),
    contentUrl: abs(ASSETS.introVideo),
    uploadDate: "2026-10-09T00:00:00+02:00",
    duration: "PT55S",
    inLanguage: "fr-FR",
    publisher: { "@id": `${SITE}#organization` },
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${SITE}#faq`,
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return JSON.stringify({ "@context": "https://schema.org", "@graph": [org, website, video, faq] });
}
