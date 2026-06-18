"use client";


import Link from "next/link";
import { t, languages } from "@/lib/i18n";

export default function SiteHeader({ compact = false, lang = "zh" }) {
  return (
    <header className={`mx-auto flex w-[min(1180px,calc(100%-32px))] items-center justify-between gap-4 py-4 ${compact ? "mb-2" : ""} max-md:flex-col max-md:gap-2`}>
      <Link href={"/" + lang} className="inline-flex items-center gap-3 text-2xl font-black text-[#102a56] max-sm:text-lg" aria-label={t(lang, "brand") + " " + t(lang, "navUsage")}>
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[#0993ff] to-[#16d1b0] text-white shadow-lg">✈</span>
        <span>{t(lang, "brand")}</span>
      </Link>
      <nav className="flex items-center gap-5 text-sm font-bold text-[#263d62] max-md:w-full max-md:overflow-x-auto" aria-label={t(lang, "navUsage")}>
        <Link href={"/" + lang + "/about"}>{t(lang, "navUsage")}</Link>
        <div className="relative inline-flex items-center gap-1">
          <select value={lang} onChange={function(e) { window.location.href = "/" + e.target.value + window.location.pathname.replace(/^\/[a-z]{2}/, ""); }} className="appearance-none bg-transparent pr-4 font-bold text-[#263d62] outline-none cursor-pointer min-w-[130px]">
            {Object.keys(languages).map(function(l) {
              return <option key={l} value={l}>{languages[l].flag} {languages[l].label}</option>;
            })}
          </select>
          <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">⌄</span>
        </div>
      </nav>
    </header>
  );
}
