import "server-only";

const BASE_PATH = "/api/v1/";

function assertPublishableKey(key: string) {
  if (!key.startsWith("ak_pk_")) {
    throw new Error("PAPERBASE_PUBLISHABLE_KEY must start with ak_pk_.");
  }
}

export type ServerPaperbaseConfig = {
  baseUrl: string; // e.g. http://localhost:8000/api/v1/
  origin: string; // e.g. http://localhost:8000
  publishableKey: string;
};

export function getServerPaperbaseConfig(): ServerPaperbaseConfig {
  const raw = process.env.PAPERBASE_API_URL?.trim();
  const publishableKey = process.env.PAPERBASE_PUBLISHABLE_KEY?.trim();

  if (!raw) throw new Error("Missing PAPERBASE_API_URL environment variable.");
  if (!publishableKey) throw new Error("Missing PAPERBASE_PUBLISHABLE_KEY environment variable.");

  assertPublishableKey(publishableKey);

  // Strip /api/v1 suffix to get bare origin
  const origin = raw.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "");

  return {
    baseUrl: `${origin}${BASE_PATH}`,
    origin,
    publishableKey,
  };
}
