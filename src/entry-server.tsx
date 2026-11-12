import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

export { jsonLd } from "./lib/seo";
export { BRAND, CONTACT, LOCATION, PORTFOLIO_ITEMS, WHATSAPP_URL } from "./lib/config";

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
