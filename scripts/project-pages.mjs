// One static, indexable page per portfolio project (dist/projets/<id>/index.html)
// plus the sitemap listing them with their videos. The home page shows projects
// in a lightbox, which Google can't index as separate results; these pages give
// each client video its own URL, title, VideoObject data and storyboard.
import fs from "node:fs";

const SITE = "https://upflowmotion.fr";
const abs = (path) => `${SITE}/${path.replace(/^\//, "")}`;
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const clientOf = (title) => title.split(" — ")[0];
const isoDuration = (s) => `PT${Math.round(s)}S`;
const jsonScript = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

export const projectPath = (item) => `/projets/${item.id}/`;

function pageHtml(item, { BRAND, CONTACT, LOCATION, WHATSAPP_URL }) {
  const client = clientOf(item.title);
  const url = `${SITE}${projectPath(item)}`;
  const title = `${client} — vidéo motion design | ${BRAND.name} Paris`;
  const description = `${item.description} Studio de vidéo motion design et 3D à Paris.`.slice(0, 300);
  const poster = item.poster ? abs(item.poster) : abs("assets/og-image.jpg");

  const videos = [
    { name: item.title, video: item.video, poster: item.poster, duration: item.duration },
    ...(item.extraVideos ?? []).map((v) => ({
      name: `${client} — ${v.label ?? "vidéo"}`,
      video: v.video,
      poster: v.poster,
      duration: v.duration,
    })),
  ].filter((v) => v.video);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      ...videos.map((v) => ({
        "@type": "VideoObject",
        name: v.name,
        description: item.description,
        thumbnailUrl: abs(v.poster ?? item.poster),
        contentUrl: abs(v.video),
        uploadDate: `${item.date}T00:00:00+02:00`,
        ...(v.duration ? { duration: isoDuration(v.duration) } : {}),
        inLanguage: "fr-FR",
        creator: { "@id": `${SITE}/#organization` },
      })),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: BRAND.name, item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Projets", item: `${SITE}/#portfolio` },
          { "@type": "ListItem", position: 3, name: client, item: url },
        ],
      },
    ],
  };

  const extra = (item.extraVideos ?? [])
    .map(
      (v) => `
      <figure class="${v.vertical ? "clip clip--vertical" : "clip"}">
        <video controls playsinline preload="metadata"${v.poster ? ` poster="/${esc(v.poster)}"` : ""}>
          <source src="/${esc(v.video)}" type="video/mp4" />
        </video>
        ${v.label ? `<figcaption>${esc(v.label)}</figcaption>` : ""}
      </figure>`,
    )
    .join("");

  const boards = (item.storyboard ?? [])
    .map(
      (src, i) =>
        `<a href="/${esc(src)}" target="_blank" rel="noreferrer"><img src="/${esc(src)}" alt="${esc(
          `${client} — storyboard, planche ${i + 1}`,
        )}" loading="lazy" width="1280" height="720" /><span>${String(i + 1).padStart(2, "0")}</span></a>`,
    )
    .join("");

  const website = item.website
    ? `<a class="btn btn--grad" href="${esc(item.website)}" target="_blank" rel="noopener">Voir le site ${
        /^[aeiouyàâäéèêëîïôöùûüh]/i.test(client) ? "d'" : "de "
      }${esc(client)} ↗</a>`
    : "";

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${url}" />
  <meta name="robots" content="index, follow" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <meta name="theme-color" content="#fbf3ff" />
  <meta property="og:type" content="video.other" />
  <meta property="og:locale" content="fr_FR" />
  <meta property="og:site_name" content="${esc(BRAND.name)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${poster}" />
  <meta property="og:video" content="${abs(item.video)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${poster}" />
  ${jsonScript(data)}
  <style>
    @font-face { font-family: "Unbounded"; src: url(/fonts/unbounded-800.woff2) format("woff2"); font-weight: 800; font-display: swap; }
    @font-face { font-family: "Inter"; src: url(/fonts/inter-400.woff2) format("woff2"); font-weight: 400; font-display: swap; }
    @font-face { font-family: "Inter"; src: url(/fonts/inter-600.woff2) format("woff2"); font-weight: 600; font-display: swap; }
    :root { --ink: #3d1366; --pink: #b72ad8; --grad: linear-gradient(120deg, #f04dff 0%, #b72ad8 35%, #9c29c6 65%, #7a28bb 100%); }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: "Inter", system-ui, sans-serif; color: var(--ink); background: radial-gradient(1200px 600px at 80% -10%, #f3dcff, transparent 60%), #fbf3ff; line-height: 1.55; }
    a { color: inherit; }
    .wrap { width: min(1080px, 100% - 32px); margin: 0 auto; }
    header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 18px 0; }
    .brand { font-family: "Unbounded", sans-serif; font-weight: 800; text-decoration: none; letter-spacing: 0.02em; }
    .crumbs { font-size: 0.85rem; opacity: 0.7; }
    .eyebrow { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; color: var(--pink); text-transform: uppercase; margin: 2rem 0 0.5rem; }
    h1 { font-family: "Unbounded", sans-serif; font-weight: 800; font-size: clamp(1.8rem, 5vw, 3.2rem); line-height: 1.1; margin: 0 0 1rem; }
    h2 { font-family: "Unbounded", sans-serif; font-weight: 800; font-size: 1.2rem; margin: 3rem 0 1rem; }
    .lead { max-width: 62ch; font-size: 1.05rem; opacity: 0.85; }
    .main-video { width: 100%; aspect-ratio: 16 / 9; border-radius: 20px; background: #21013e; display: block; margin-top: 1.5rem; box-shadow: 0 30px 70px -30px rgba(61, 19, 102, 0.5); }
    .actions { display: flex; flex-wrap: wrap; gap: 0.8rem; margin: 1.5rem 0; }
    .btn { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.8rem 1.3rem; border-radius: 999px; font-weight: 600; text-decoration: none; border: 1px solid rgba(61, 19, 102, 0.2); background: #fff; }
    .btn--grad { background: var(--grad); color: #fff; border-color: transparent; }
    .clip { margin: 0; }
    .clip video { width: 100%; border-radius: 16px; background: #000; }
    .clip--vertical { display: grid; grid-template-columns: auto 1fr; gap: 2rem; align-items: center; }
    .clip--vertical video { width: auto; height: min(72vh, 620px); aspect-ratio: 9 / 16; }
    figcaption { font-family: "Unbounded", sans-serif; font-weight: 800; font-size: clamp(1.1rem, 2.4vw, 1.6rem); max-width: 18ch; }
    .boards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; }
    .boards a { position: relative; display: block; border-radius: 12px; overflow: hidden; }
    .boards img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; }
    .boards span { position: absolute; left: 0.5rem; bottom: 0.5rem; padding: 0.15rem 0.5rem; border-radius: 999px; background: rgba(5, 2, 8, 0.6); color: #fff; font-size: 0.7rem; font-weight: 600; }
    .cta { margin: 4rem 0 3rem; padding: 2rem; border-radius: 24px; background: #fff; box-shadow: 0 12px 32px -12px rgba(61, 19, 102, 0.18); }
    .cta h2 { margin-top: 0; }
    footer { padding: 2rem 0 3rem; font-size: 0.85rem; opacity: 0.7; }
    @media (max-width: 640px) {
      .boards { grid-template-columns: repeat(2, 1fr); }
      .clip--vertical { grid-template-columns: 1fr; justify-items: center; text-align: center; }
      .clip--vertical video { width: min(100%, 320px); height: auto; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <a class="brand" href="/">${esc(BRAND.name)}</a>
      <nav class="crumbs"><a href="/">Accueil</a> › <a href="/#portfolio">Projets</a> › ${esc(client)}</nav>
    </header>

    <main>
      <p class="eyebrow">${esc(item.category)}</p>
      <h1>${esc(item.title)}</h1>
      <p class="lead">${esc(item.description)}</p>
      <video class="main-video" controls playsinline preload="metadata"${item.poster ? ` poster="/${esc(item.poster)}"` : ""}>
        <source src="/${esc(item.video)}" type="video/mp4" />
      </video>
      <div class="actions">
        ${website}
        <a class="btn" href="/#portfolio">← Tous les projets</a>
      </div>
      ${extra ? `<h2>${(item.extraVideos ?? []).length > 1 ? "Les autres vidéos" : "L'autre vidéo"}</h2>${extra}` : ""}
      ${boards ? `<h2>Le storyboard</h2><div class="boards">${boards}</div>` : ""}

      <section class="cta">
        <h2>Une vidéo comme celle-ci pour votre entreprise ?</h2>
        <p>${esc(BRAND.name)} est un studio de vidéo motion design et 3D basé à ${esc(LOCATION.district)}. Vidéo de présentation dès 350 €, vidéo explicative dès 500 €.</p>
        <div class="actions">
          <a class="btn btn--grad" href="${esc(WHATSAPP_URL)}" target="_blank" rel="noopener">Parler de mon projet</a>
          <a class="btn" href="/#pricing">Voir les tarifs</a>
        </div>
      </section>
    </main>

    <footer>© ${new Date().getFullYear()} ${esc(BRAND.name)} · ${esc(LOCATION.district)} · <a href="tel:${esc(CONTACT.whatsappNumber)}">${esc(CONTACT.whatsappDisplay)}</a></footer>
  </div>
</body>
</html>
`;
}

function sitemapXml(items) {
  const today = new Date().toISOString().slice(0, 10);
  const videoTag = (item, v) => `
    <video:video>
      <video:thumbnail_loc>${abs(v.poster ?? item.poster)}</video:thumbnail_loc>
      <video:title>${esc(v.title)}</video:title>
      <video:description>${esc(item.description)}</video:description>
      <video:content_loc>${abs(v.video)}</video:content_loc>${v.duration ? `\n      <video:duration>${Math.round(v.duration)}</video:duration>` : ""}
      <video:publication_date>${item.date}T00:00:00+02:00</video:publication_date>
    </video:video>`;
  const urls = items
    .map((item) => {
      const vids = [
        { title: item.title, video: item.video, poster: item.poster, duration: item.duration },
        ...(item.extraVideos ?? []).map((v) => ({
          title: `${clientOf(item.title)} — ${v.label ?? "vidéo"}`,
          video: v.video,
          poster: v.poster,
          duration: v.duration,
        })),
      ].filter((v) => v.video);
      return `
  <url>
    <loc>${SITE}${projectPath(item)}</loc>
    <lastmod>${item.date ?? today}</lastmod>${vids.map((v) => videoTag(item, v)).join("")}
  </url>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${today}</lastmod>
  </url>${urls}
</urlset>
`;
}

export function writeProjectPages(distUrl, data) {
  const items = data.PORTFOLIO_ITEMS.filter((item) => item.video && item.date);
  for (const item of items) {
    const dir = new URL(`.${projectPath(item)}`, distUrl);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(new URL("index.html", dir), pageHtml(item, data));
  }
  fs.writeFileSync(new URL("sitemap.xml", distUrl), sitemapXml(items));
  return items.length;
}
