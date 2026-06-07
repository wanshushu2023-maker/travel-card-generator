export type SerpApiFlightPriceResult = {
  origin: string;
  destination: string;
  departureDate: string;
  currency: string;
  minPrice: number;
  maxPrice: number;
  offerCount: number;
  updatedAt: string;
  provider: "SerpApi Google Flights";
  notice: string;
};

type SerpApiParams = {
  origin: string;
  destination: string;
  departureDate: string;
};

type SerpApiFlight = {
  price?: number | string;
};

type SerpApiGoogleFlightsResponse = {
  error?: string;
  search_metadata?: {
    status?: string;
  };
  price_insights?: {
    lowest_price?: number;
    price_level?: string;
    typical_price_range?: number[];
    price_history?: [number, number][];
  };
  best_flights?: SerpApiFlight[];
  other_flights?: SerpApiFlight[];
};

const notice = "Google Flights 价格洞察仅供参考，机票价格实时浮动，税费、行李、选座、平台服务费等以出票页为准。";

function formatChinaTime(date = new Date()) {
  const parts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day} ${values.hour}:${values.minute}`;
}

function normalizePrice(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const numeric = Number(value.replace(/[^\d.]/g, ""));
    if (Number.isFinite(numeric) && numeric > 0) return numeric;
  }
  return null;
}

export async function searchSerpApiGoogleFlights({ origin, destination, departureDate }: SerpApiParams): Promise<SerpApiFlightPriceResult> {
  const apiKey = process.env.SERPAPI_API_KEY;
  if (!apiKey) {
    throw new Error("SerpApi key is not configured");
  }

  const normalizedOrigin = origin.toUpperCase();
  const normalizedDestination = destination.toUpperCase();
  const params = new URLSearchParams({
    engine: "google_flights",
    departure_id: normalizedOrigin,
    arrival_id: normalizedDestination,
    outbound_date: departureDate,
    type: "2",
    currency: "CNY",
    hl: "zh-cn",
    gl: "cn",
    api_key: apiKey
  });

  const response = await fetch(`https://serpapi.com/search.json?${params.toString()}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("SerpApi request failed");
  }

  const data = (await response.json()) as SerpApiGoogleFlightsResponse;
  if (data.error) {
    throw new Error(data.error);
  }

  const typicalRange = data.price_insights?.typical_price_range || [];
  const insightPrices = typicalRange.map(normalizePrice).filter((price): price is number => price !== null);
  const lowestPrice = normalizePrice(data.price_insights?.lowest_price);
  const offerPrices = [...(data.best_flights || []), ...(data.other_flights || [])]
    .map((flight) => normalizePrice(flight.price))
    .filter((price): price is number => price !== null);

  const priceCandidates = [...insightPrices, ...(lowestPrice ? [lowestPrice] : []), ...offerPrices];
  if (priceCandidates.length === 0) {
    throw new Error("SerpApi returned no price candidates");
  }

  const minPrice = Math.round(Math.min(...priceCandidates));
  const maxPrice = Math.round(Math.max(...priceCandidates));
  const offerCount = Math.max(offerPrices.length, priceCandidates.length);

  return {
    origin: normalizedOrigin,
    destination: normalizedDestination,
    departureDate,
    currency: "CNY",
    minPrice,
    maxPrice,
    offerCount,
    updatedAt: formatChinaTime(),
    provider: "SerpApi Google Flights",
    notice
  };
}
