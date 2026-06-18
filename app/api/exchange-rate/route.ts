import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const base = searchParams.get("base") || "CNY";
  const target = searchParams.get("target") || "THB";

  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${base}`, {
      cache: "no-store"
    });
    if (!res.ok) throw new Error("Exchange rate API failed");
    const data = await res.json();
    const rate = data.rates?.[target];
    if (!rate) throw new Error(`No rate for ${target}`);

    return NextResponse.json({
      base,
      target,
      rate: Math.round(rate * 100) / 100,
      updatedAt: data.time_update_utc || new Date().toISOString(),
      provider: "open.er-api.com"
    });
  } catch {
    return NextResponse.json(
      { error: "暂未获取到实时汇率，请以银行或兑换机构为准" },
      { status: 500 }
    );
  }
}
