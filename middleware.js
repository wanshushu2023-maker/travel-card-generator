
import { NextResponse } from "next/server";
import { languages } from "./lib/i18n";

var langCodes = Object.keys(languages);

export function middleware(request) {
  var pathname = request.nextUrl.pathname;
  var first = pathname.split("/").filter(Boolean)[0] || "";
  if (langCodes.includes(first)) return NextResponse.next();
  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/") || pathname.startsWith("/icons/") || pathname.startsWith("/card-templates/") || pathname.startsWith("/uploaded/") || pathname === "/favicon.ico" || pathname === "/robots.txt" || pathname === "/sitemap.xml") return NextResponse.next();
  return NextResponse.redirect(new URL("/zh" + pathname + (request.nextUrl.search || ""), request.url));
}

export var config = { matcher: ["/((?!api/|_next/|static/|icons/|card-templates/|uploaded/|favicon.ico|robots.txt|sitemap.xml).*)"] };
