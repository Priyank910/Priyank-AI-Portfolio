export const API_URL = import.meta.env.VITE_API_URL;

export function apiUrl(path) {
  const base = (API_URL || "").replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!base) {
    console.warn(
      "VITE_API_URL is not set. API requests may fail. Add it to your .env file.",
    );
  }

  return `${base}${normalizedPath}`;
}
