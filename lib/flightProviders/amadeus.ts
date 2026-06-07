export type AmadeusFlightOfferResult = {
  origin: string;
  destination: string;
  departureDate: string;
  currency: string;
  minPrice: number;
  maxPrice: number;
  offerCount: number;
  updatedAt: string;
  provider: "Amadeus";
  notice: string;
};

type AmadeusParams = {
  origin: string;
  destination: string;
  departureDate: string;
  adults: number;
};

type AmadeusTokenResponse = {
  access_token?: string;
};

type AmadeusOffer = {
  price?: {
    currency?: string;
    grandTotal?: string;
    total?: string;
  };
};

type AmadeusOffersResponse = {
  data?: AmadeusOffer[];
};

const notice = "机票价格实时浮动，税费、行李、选座、平台服务费等以出票页为准。";

function getAmadeusBaseUrl() {
  return process.env.AMADEUS_ENV === "production" ? "https://api.amadeus.com" : "https://test.api.amadeus.com";
}

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

async function getAccessToken() {
  const clientId = process.env.AMADEUS_CLIENT_ID;
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Amadeus credentials are not configured");
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret
  });

  const response = await fetch(`${getAmadeusBaseUrl()}/v1/security/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Amadeus token request failed");
  }

  const data = (await response.json()) as AmadeusTokenResponse;
  if (!data.access_token) {
    throw new Error("Amadeus token missing");
  }

  return data.access_token;
}

export async function searchAmadeusFlightOffers({ origin, destination, departureDate, adults }: AmadeusParams): Promise<AmadeusFlightOfferResult> {
  const normalizedOrigin = origin.toUpperCase();
  const normalizedDestination = destination.toUpperCase();
  const accessToken = await getAccessToken();
  const params = new URLSearchParams({
    originLocationCode: normalizedOrigin,
    destinationLocationCode: normalizedDestination,
    departureDate,
    adults: String(Math.max(1, adults || 1)),
    currencyCode: "CNY",
    max: "20"
  });

  const response = await fetch(`${getAmadeusBaseUrl()}/v2/shopping/flight-offers?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Amadeus flight offers request failed");
  }

  const data = (await response.json()) as AmadeusOffersResponse;
  const prices = (data.data || [])
    .map((offer) => Number(offer.price?.grandTotal || offer.price?.total))
    .filter((price) => Number.isFinite(price) && price > 0);

  if (prices.length === 0) {
    throw new Error("Amadeus returned no prices");
  }

  return {
    origin: normalizedOrigin,
    destination: normalizedDestination,
    departureDate,
    currency: "CNY",
    minPrice: Math.round(Math.min(...prices)),
    maxPrice: Math.round(Math.max(...prices)),
    offerCount: prices.length,
    updatedAt: formatChinaTime(),
    provider: "Amadeus",
    notice
  };
}
