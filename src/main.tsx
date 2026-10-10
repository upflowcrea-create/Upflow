import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML arrives prerendered (scripts/prerender.mjs): reuse it.
// The dev server serves an empty #root, so render from scratch there.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
