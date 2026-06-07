import { searchAmadeusFlightOffers } from "@/lib/flightProviders/amadeus";
import { searchSerpApiGoogleFlights } from "@/lib/flightProviders/serpapiGoogleFlights";

export type FlightPriceRange = {
  origin: string;
  destination: string;
  departureDate: string;
  currency: string;
  minPrice: number;
  maxPrice: number;
  offerCount: number;
  updatedAt: string;
  provider: string;
  notice: string;
  isTestData?: boolean;
};

type FlightPriceParams = {
  origin: string;
  destination: string;
  departureDate: string;
  adults?: number;
};

export async function getFlightPriceRange({ origin, destination, departureDate, adults = 1 }: FlightPriceParams): Promise<FlightPriceRange> {
  try {
    const result = await searchAmadeusFlightOffers({
      origin,
      destination,
      departureDate,
      adults
    });

    return {
      ...result,
      isTestData: process.env.AMADEUS_ENV !== "production"
    };
  } catch {
    return searchSerpApiGoogleFlights({
      origin,
      destination,
      departureDate
    });
  }
}
