
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import TravelCard from "@/components/TravelCard";
import { findCity, findDeparturePlace } from "@/data/cities";

export default async function LangCardPage({ params, searchParams }) {
  var p = await params;
  var sp = await searchParams;
  var lang = p.lang || "zh";
  var from = sp?.from || "china-chongqing";
  var to = sp?.to || "bangkok";
  var date = sp?.date || "2026-07-18";
  var city = findCity(to);
  var departure = findDeparturePlace(from);
  return (
    <>
      <SiteHeader lang={lang} compact />
      <main className="mx-auto my-5 w-[min(1180px,calc(100%-32px))] max-sm:w-[calc(100%-20px)]">
        <TravelCard city={city} departure={departure} date={date} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
