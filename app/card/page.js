import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import TravelCard from "@/components/TravelCard";
import { findCity, findDeparturePlace } from "@/data/cities";

export default async function CardPage({ searchParams }) {
  const params = await searchParams;
  const from = params?.from || "china-chongqing";
  const to = params?.to || "bangkok";
  const date = params?.date || "2026-07-18";
  const city = findCity(to);
  const departure = findDeparturePlace(from);

  return (
    <>
      <SiteHeader compact />
      <main className="mx-auto my-5 w-[min(1180px,calc(100%-32px))] max-sm:w-[calc(100%-20px)]">
        <TravelCard city={city} departure={departure} date={date} />
      </main>
      <Footer />
    </>
  );
}
