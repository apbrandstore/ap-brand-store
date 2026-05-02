import "server-only";

import type { NextRequest } from "next/server";

import { getServerPaperbaseConfig } from "@/lib/server/config";

/** Headers we must not forward to the Paperbase origin. */
const DROP_REQUEST_HEADERS = new Set([
  "authorization",
  "connection",
  "cookie",
  "host",
  "keep-alive",
  "proxy-connection",
  "transfer-encoding",
  "upgrade",
]);

/**
 * Dev-only reverse proxy for `tracker.js`: forwards `/api/tracker/*` to `PAPERBASE_API_URL` origin
 * with the publishable key (same contract as other server-side Paperbase calls).
 */
export async function proxyPaperbaseTrackerRequest(request: NextRequest, pathSegments: string[]) {
  if (pathSegments.length === 0) {
    return new Response(null, { status: 404 });
  }

  const { origin, publishableKey } = getServerPaperbaseConfig();
  const path = pathSegments.map(encodeURIComponent).join("/");
  const url = `${origin}/${path}${request.nextUrl.search}`;

  const headers = new Headers();
  for (const [key, value] of request.headers) {
    if (DROP_REQUEST_HEADERS.has(key.toLowerCase())) continue;
    headers.set(key, value);
  }
  headers.set("Authorization", `Bearer ${publishableKey}`);

  const method = request.method;
  const init: RequestInit & { duplex?: "half" } = {
    method,
    headers,
    redirect: "manual",
  };

  if (method !== "GET" && method !== "HEAD") {
    init.body = request.body;
    init.duplex = "half";
  }

  const upstream = await fetch(url, init);

  const outHeaders = new Headers(upstream.headers);
  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: outHeaders,
  });
}

export function trackerProxyOptionsResponse() {
  return new Response(null, {
    status: 204,
    headers: { Allow: "GET, HEAD, POST, OPTIONS" },
  });
}
