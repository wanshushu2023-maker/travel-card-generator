export default function sitemap() {
  const base = "https://example.com";
  return ["", "/card", "/about", "/disclaimer", "/privacy", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-06-04")
  }));
}
