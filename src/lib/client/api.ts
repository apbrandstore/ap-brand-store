import { PaperbaseApiError } from "@/lib/api/paperbase-errors";

/**
 * Same-origin fetch to the storefront BFF under `/api/v1/*`, matching the Paperbase HTTP API path prefix.
 * Do not call the Django host directly from client components.
 */
export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `/api/v1${normalizedPath}`;

  const headers = new Headers(init?.headers);
  const body = init?.body;
  if (body != null && !(body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(url, {
    ...init,
    headers,
  });
}

export async function apiFetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await apiFetch(path, init);
  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : undefined;
  } catch {
    data = { detail: text || res.statusText };
  }
  if (!res.ok) {
    throw new PaperbaseApiError("API request failed", res.status, data as Record<string, unknown>);
  }
  return data as T;
}
