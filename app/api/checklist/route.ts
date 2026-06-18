import { NextResponse } from "next/server";
import { getDestinationChecklist } from "@/data/checklist";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const to = searchParams.get("to") || "bangkok";
  const originCode = searchParams.get("originCode") || "CN";

  try {
    const items = getDestinationChecklist(to, originCode);
    return NextResponse.json({ destination: to, originCountryCode: originCode, items });
  } catch {
    return NextResponse.json({ error: "暂无出发提醒数据" }, { status: 500 });
  }
}
