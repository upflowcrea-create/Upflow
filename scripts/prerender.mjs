// Writes the app's rendered HTML into dist/index.html at build time, so the
// page's text is in the HTML itself — readable by crawlers that don't run
// JavaScript (and by Google before its delayed rendering pass).
import fs from "node:fs";
import { jsonLd, render } from "../dist-ssr/entry-server.js";

const file = new URL("../dist/index.html", import.meta.url);
const html = fs.readFileSync(file, "utf8");
const placeholder = '<div id="root"></div>';
if (!html.includes(placeholder)) throw new Error("prerender: #root placeholder not found in dist/index.html");

// "<" escaped so nothing in the data can close the <script> tag early.
const structuredData = `<script type="application/ld+json">${jsonLd().replace(/</g, "\\u003c")}</script>`;

fs.writeFileSync(
  file,
  html.replace(placeholder, `<div id="root">${render()}</div>`).replace("</head>", `    ${structuredData}\n  </head>`),
);
console.log("prerender: dist/index.html filled with the rendered page");
