import { NextRequest, NextResponse } from "next/server";

import { checkRateLimit, getClientIp, paperbaseErrorResponse } from "@/lib/server/handler-utils";
import { getServerPaperbaseConfig } from "@/lib/server/config";

/**
 * Proxies GET /api/v1/theming/ to the Paperbase API so the browser only hits same-origin
 * `/api/v1/theming` and the publishable key stays server-side.
 */
export async function GET(request: NextRequest) {
  const ip = getClientIp(request.headers.get("x-forwarded-for"));
  const limited = checkRateLimit(`theming:get:${ip}`, 120, 60_000);
  if (!limited.ok) {
    return new Response(null, {
      status: 429,
      headers: { "Retry-After": String(limited.retryAfterSec) },
    });
  }

  try {
    const { baseUrl, publishableKey } = getServerPaperbaseConfig();
    const url = `${baseUrl}theming/`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${publishableKey}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      const status = res.status >= 500 ? 502 : res.status;
      return NextResponse.json(
        { detail: text || `Upstream returned ${res.status}` },
        { status },
      );
    }

    const body = (await res.json()) as Record<string, unknown>;
    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "private, no-store, must-revalidate",
      },
    });
  } catch (error) {
    return paperbaseErrorResponse(error);
  }
}
