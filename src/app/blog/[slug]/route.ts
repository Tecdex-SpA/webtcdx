import type { NextRequest } from "next/server";

const WORDPRESS_ORIGIN = "https://tecdex.net";
const INTERNAL_PROXY_HEADER = "x-tecdex-internal-proxy";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

function wordpressUrl(request: NextRequest, slug: string): URL {
  const target = new URL(`/${encodeURIComponent(slug)}/`, WORDPRESS_ORIGIN);

  request.nextUrl.searchParams.forEach((value, key) => {
    target.searchParams.append(key, value);
  });

  return target;
}

async function proxyArticle(
  request: NextRequest,
  context: RouteContext,
  method: "GET" | "HEAD",
): Promise<Response> {
  const { slug } = await context.params;
  const target = wordpressUrl(request, slug);
  const requestHeaders = new Headers();
  const proxySecret = process.env.TCDX_PROXY_SECRET;

  requestHeaders.set("accept", request.headers.get("accept") ?? "text/html");
  requestHeaders.set(
    "accept-language",
    request.headers.get("accept-language") ?? "es-CL,es;q=0.9",
  );

  if (proxySecret) {
    requestHeaders.set(INTERNAL_PROXY_HEADER, proxySecret);
  } else {
    // Deliberately do not fail builds or requests while the WordPress redirect
    // guard is inactive. Never include the secret (or its value) in logs.
    console.warn(
      "[blog-proxy] TCDX_PROXY_SECRET is not configured; forwarding without the internal bypass header.",
    );
  }

  const upstream = await fetch(target, {
    method,
    headers: requestHeaders,
    redirect: "manual",
    cache: "no-store",
  });

  if (upstream.status >= 300 && upstream.status < 400) {
    console.error(
      `[blog-proxy] Blocked upstream redirect for /blog/${slug} (status ${upstream.status}).`,
    );

    return new Response("WordPress returned an unexpected redirect.", {
      status: 502,
      headers: {
        "cache-control": "no-store",
        "content-type": "text/plain; charset=utf-8",
      },
    });
  }

  const responseHeaders = new Headers({
    "cache-control": "no-store",
    "content-type":
      upstream.headers.get("content-type") ?? "text/html; charset=UTF-8",
  });

  const contentLanguage = upstream.headers.get("content-language");
  if (contentLanguage) responseHeaders.set("content-language", contentLanguage);

  return new Response(method === "HEAD" ? null : upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export function GET(request: NextRequest, context: RouteContext) {
  return proxyArticle(request, context, "GET");
}

export function HEAD(request: NextRequest, context: RouteContext) {
  return proxyArticle(request, context, "HEAD");
}

// PROXY_BYPASS_GUARD=REMOVE_OR_RETIRED when /blog/[slug] becomes native and
// no longer fetches the public WordPress article URL.
