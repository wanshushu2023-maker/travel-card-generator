"use client";

import { useMemo, useRef, useState } from "react";
import TravelCard from "@/components/TravelCard";
import { findTravelCity, travelCities } from "@/data/travel-card-cities";

function todayString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function HomeClient() {
  const [from, setFrom] = useState("东京 Tokyo");
  const [draftDestination, setDraftDestination] = useState("bangkok");
  const [activeDestination, setActiveDestination] = useState("bangkok");
  const [date, setDate] = useState(todayString() || "2026-07-18");
  const cardRef = useRef(null);

  const city = useMemo(() => findTravelCity(activeDestination), [activeDestination]);

  function generateCard(event) {
    event.preventDefault();
    setActiveDestination(draftDestination);
    window.setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function chooseHotCity(slug) {
    setDraftDestination(slug);
    setActiveDestination(slug);
  }

  async function downloadCard() {
    const target = cardRef.current;
    if (!target) return;

    try {
      const mod = await import("html2canvas");
      const html2canvas = mod.default || mod;
      const canvas = await html2canvas(target, {
        backgroundColor: null,
        scale: 2,
        useCORS: true
      });
      const link = document.createElement("a");
      link.download = `${city.slug}-travel-card.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      const serialized = new XMLSerializer().serializeToString(target.cloneNode(true));
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920"><foreignObject width="100%" height="100%">${serialized}</foreignObject></svg>`;
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const link = document.createElement("a");
      link.download = `${city.slug}-travel-card.svg`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    }
  }

  return (
    <div className="overflow-hidden">
      <section className="relative mx-auto w-[min(1180px,calc(100%-28px))] rounded-[32px] border border-white/80 bg-gradient-to-b from-[#d7f7ff] via-[#f9fdff] to-white px-5 pb-7 pt-8 shadow-[0_24px_70px_rgba(26,102,170,.16)] max-sm:w-full max-sm:rounded-none max-sm:px-4">
        <div className="hero-illustration" aria-hidden="true">
          <span className="cloud cloud-a" />
          <span className="cloud cloud-b" />
          <span className="city-line" />
          <span className="temple-silhouette" />
          <span className="longtail-boat" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="absolute left-0 top-1 rotate-[-8deg] text-left text-lg font-black italic leading-tight text-[#168ee8] max-md:static max-md:mb-2 max-md:rotate-0">
            Plan Smart<br />
            <span className="text-[#ff6b3f]">Travel Happy!</span>
          </p>
          <h1 className="text-[clamp(40px,7vw,76px)] font-black leading-tight tracking-tight text-[#102a56]">
            旅游信息卡<span className="text-[#e55435]">生成器</span>
          </h1>
          <p className="mt-3 text-[clamp(16px,2.4vw,24px)] font-bold text-[#40546f]">
            一键生成旅行必备信息卡，出行更省心，规划更轻松！
          </p>
        </div>

        <form onSubmit={generateCard} className="relative z-10 mx-auto mt-8 grid max-w-5xl grid-cols-[1fr_1fr_1fr_auto] gap-4 rounded-[24px] bg-white/95 p-4 shadow-[0_18px_45px_rgba(28,94,154,.14)] max-lg:grid-cols-2 max-sm:grid-cols-1">
          <label className="form-tile">
            <span className="form-icon bg-[#ffe8e5] text-[#ff5f4f]">📍</span>
            <span className="min-w-0">
              <span className="form-label">出发地：</span>
              <input value={from} onChange={(event) => setFrom(event.target.value)} className="form-control" />
            </span>
          </label>
          <label className="form-tile">
            <span className="form-icon bg-[#e8f4ff] text-[#1677e8]">🗺️</span>
            <span className="min-w-0">
              <span className="form-label">目的地：</span>
              <select value={draftDestination} onChange={(event) => setDraftDestination(event.target.value)} className="form-control">
                {travelCities.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.nameZh} {item.nameEn}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <label className="form-tile">
            <span className="form-icon bg-[#fff0e2] text-[#ff7a3d]">🗓️</span>
            <span className="min-w-0">
              <span className="form-label">出发日期：</span>
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="form-control" />
            </span>
          </label>
          <button type="submit" className="rounded-[22px] bg-gradient-to-br from-[#ff7b58] to-[#ff403d] px-9 py-4 text-lg font-black text-white shadow-[0_16px_30px_rgba(255,82,70,.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(255,82,70,.36)]">
            ✨ 生成信息卡
          </button>
        </form>
      </section>

      <section className="mx-auto mt-6 w-[min(1180px,calc(100%-28px))] rounded-[26px] bg-white/90 p-4 shadow-[0_16px_45px_rgba(28,94,154,.1)] max-sm:w-[calc(100%-18px)]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="mr-1 text-lg font-black text-[#102a56]">🔥 热门城市</span>
          {travelCities.map((item) => (
            <button key={item.slug} type="button" onClick={() => chooseHotCity(item.slug)} className={`hot-pill ${item.slug === activeDestination ? "hot-pill-active" : ""}`}>
              <span>{item.emoji}</span>
              {item.nameZh}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto my-8 grid w-[min(1180px,calc(100%-28px))] justify-items-center gap-4 max-sm:w-[calc(100%-18px)]">
        <TravelCard ref={cardRef} city={city} from={from} date={date} shareUrl={`https://example.com/card?to=${city.slug}`} />
        <button type="button" onClick={downloadCard} className="w-[min(540px,100%)] rounded-[18px] bg-gradient-to-br from-[#ffb347] via-[#ff7462] to-[#1677e8] px-6 py-4 text-xl font-black text-white shadow-[0_18px_42px_rgba(36,95,162,.22)] transition hover:-translate-y-0.5">
          下载信息卡
        </button>
      </section>
    </div>
  );
}
