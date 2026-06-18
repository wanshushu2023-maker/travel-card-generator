
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import HomeClient from "@/components/HomeClient";

export default async function LangHomePage({ params }) {
  var p = await params;
  var lang = p.lang || "zh";
  return (
    <>
      <SiteHeader lang={lang} />
      <main><HomeClient lang={lang} /></main>
      <Footer lang={lang} />
    </>
  );
}
