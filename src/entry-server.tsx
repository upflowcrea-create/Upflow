import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

export { jsonLd } from "./lib/seo";

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
