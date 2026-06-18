import "./globals.css";
import { headers } from "next/headers";

export const metadata = {
  title: "旅游目的地检索",
  description: "你的旅行,几分钟就能规划好"
};

export default async function RootLayout({ children }) {
  var htmlLang = "zh-CN";
  try {
    var h = await headers();
    var url = h.get("x-url") || "";
    if (!url) url = h.get("referer") || "";
    if (url) {
      var pathname = new URL(url).pathname;
      var langs = { en: "en", ja: "ja", ko: "ko", th: "th" };
      for (var k in langs) {
        if (pathname.startsWith("/" + k)) {
          htmlLang = langs[k];
          break;
        }
      }
    }
  } catch {}

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
