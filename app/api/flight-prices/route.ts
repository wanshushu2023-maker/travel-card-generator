import { NextResponse } from "next/server";
import { getFlightPriceRange } from "@/lib/flightPrice";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const departureDate = searchParams.get("departureDate") || "";
  const adults = Number(searchParams.get("adults") || "1");

  if (!origin || !destination || !departureDate) {
    return NextResponse.json({ error: "origin, destination and departureDate are required" }, { status: 400 });
  }

  try {
    const data = await getFlightPriceRange({ origin, destination, departureDate, adults });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "暂未获取到实时价格，请前往出票平台查询" }, { status: 500 });
  }
}
