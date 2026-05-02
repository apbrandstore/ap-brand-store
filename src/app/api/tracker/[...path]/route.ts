import type { NextRequest } from "next/server";

import {
  proxyPaperbaseTrackerRequest,
  trackerProxyOptionsResponse,
} from "@/lib/server/tracker-proxy";

type RouteContext = { params: Promise<{ path?: string[] }> };

async function handle(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxyPaperbaseTrackerRequest(request, path ?? []);
}

export async function GET(request: NextRequest, context: RouteContext) {
  return handle(request, context);
}

export async function HEAD(request: NextRequest, context: RouteContext) {
  return handle(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return handle(request, context);
}

export async function OPTIONS() {
  return trackerProxyOptionsResponse();
}
