
import Link from "next/link";
import { t } from "@/lib/i18n";

export default function Footer({ lang = "zh" }) {
  return (
    <footer className="mx-auto mb-8 mt-4 flex w-[min(1180px,calc(100%-32px))] flex-wrap justify-center gap-5 text-sm text-[#6e8096]">
      <Link href={"/" + lang + "/disclaimer"}>{t(lang, "footerDisclaimer")}</Link>
      <Link href={"/" + lang + "/privacy"}>{t(lang, "footerPrivacy")}</Link>
      <Link href={"/" + lang + "/contact"}>{t(lang, "footerContact")}</Link>
      <span>{t(lang, "footerDataNote")}</span>
    </footer>
  );
}
