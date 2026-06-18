
import ContentPage from "@/components/ContentPage";
import { t } from "@/lib/i18n";

export default async function LangContentPage({ params }) {
  var p = await params;
  var lang = p.lang || "zh";
  return <ContentPage lang={lang} title={t(lang, "navUsage")}><p>{t(lang, "noData")}</p></ContentPage>;
}
