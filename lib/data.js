import cities from "@/data/cities.json";
import countries from "@/data/countries.json";
import hotCities from "@/data/hot-cities.json";
import destinationInfo from "@/data/destination-info.json";
import entryRules from "@/data/entry-rules.json";
import officialLinks from "@/data/official-links.json";
import paymentNotes from "@/data/payment-notes.json";
import powerPlugs from "@/data/power-plugs.json";
import routeLinks from "@/data/route-links.json";
import travelNotes from "@/data/travel-notes.json";

export const data = {
  cities,
  countries,
  hotCities,
  destinationInfo,
  entryRules,
  officialLinks,
  paymentNotes,
  powerPlugs,
  routeLinks,
  travelNotes
};

export function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[（(].*?[）)]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function findCity(value, fallback = "bangkok") {
  const query = normalize(value);
  const matched = cities.find((city) => {
    const names = [city.slug, city.name_zh, city.name_en, ...(city.aliases || [])].map(normalize);
    return names.includes(query) || names.some((name) => query && name.includes(query));
  });
  return matched || cities.find((city) => city.slug === fallback) || cities[0];
}

export function getCardPayload({ from = "tokyo", to = "bangkok", date = "2026-07-18" } = {}) {
  const fromCity = findCity(from, "tokyo");
  const toCity = findCity(to, "bangkok");
  const destination = destinationInfo[toCity.slug] || destinationInfo.bangkok;
  const entry = entryRules[toCity.country_slug] || {};
  const official = officialLinks[toCity.country_slug] || {};
  const payment = paymentNotes[toCity.country_slug] || {};
  const plug = powerPlugs[toCity.country_slug] || {};

  return {
    fromCity,
    toCity,
    date,
    destination,
    entry,
    official,
    payment,
    plug,
    routeLinks
  };
}
