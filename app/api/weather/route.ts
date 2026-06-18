import { NextResponse } from "next/server";

const weatherIconMap = {
  0: { label: "晴", icon: "☀️" },
  1: { label: "少云", icon: "🌤️" },
  2: { label: "多云", icon: "⛅" },
  3: { label: "阴", icon: "☁️" },
  45: { label: "雾", icon: "🌫️" },
  48: { label: "雾", icon: "🌫️" },
  51: { label: "小毛毛雨", icon: "🌦️" },
  53: { label: "毛毛雨", icon: "🌦️" },
  55: { label: "大毛毛雨", icon: "🌦️" },
  61: { label: "小雨", icon: "🌦️" },
  63: { label: "中雨", icon: "🌧️" },
  65: { label: "大雨", icon: "🌧️" },
  80: { label: "小阵雨", icon: "🌦️" },
  81: { label: "中阵雨", icon: "🌧️" },
  82: { label: "大阵雨", icon: "🌧️" },
  95: { label: "雷暴", icon: "⛈️" },
  96: { label: "雷暴+冰雹", icon: "⛈️" },
  99: { label: "强雷暴+冰雹", icon: "⛈️" }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon are required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto",
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Weather API failed");
    const data = await res.json();
    const daily = data.daily;
    
    const forecast = daily.time.map(function(date, i) {
      var code = daily.weathercode[i];
      var info = weatherIconMap[code] || { label: "未知", icon: "❓" };
      return {
        date: date,
        maxTemp: Math.round(daily.temperature_2m_max[i]),
        minTemp: Math.round(daily.temperature_2m_min[i]),
        weatherCode: code,
        label: info.label,
        icon: info.icon
      };
    });

    return NextResponse.json({ forecast: forecast, current: forecast[0] });
  } catch {
    return NextResponse.json({ error: "暂未获取到天气数据" }, { status: 500 });
  }
}
