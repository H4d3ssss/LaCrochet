// One place for the backend address, so every page talks to the same server.
// Set VITE_API_URL in la-crochet-project/.env to change it (e.g. when deployed).
export const API_BASE_URL = (
  import.meta.env.VITE_API_URL ??
  import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:8000"
).replace(/\/$/, "");
