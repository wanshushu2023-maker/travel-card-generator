"use client";

import { useMemo, useState } from "react";
import TravelCard from "@/components/TravelCard";
import { cities, findCity } from "@/data/cities";

export default function HomeClient() {
  const [from, setFrom] = useState("东京 Tokyo");
  const [draftDestination, setDraftDestination] = useState("bangkok");
  const [activeDestination, setActiveDestination] = useState("bangkok");
  const [date, setDate] = useState("2026-07-18");

  const city = useMemo(() => findCity(activeDestination), [activeDestination]);

  function generateInfo(event) {
    event.preventDefault();
    setActiveDestination(draftDestination);
  }

  function chooseHotCity(slug) {
    setDraftDestination(slug);
    setActiveDestination(slug);
  }

  return (
    <div className="pb-10">
      <section className="mx-auto w-[min(1180px,calc(100%-32px))] rounded-[28px] border border-[#cfe3f8] bg-[linear-gradient(180deg,#f6fbff_0%,#fff_100%)] px-8 py-10 shadow-[0_18px_60px_rgba(24,91,156,.12)] max-md:px-5 max-sm:w-full max-sm:rounded-none">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-[clamp(34px,5.5vw,54px)] font-black leading-tight tracking-normal">
            <span className="text-[#0b65df]">输入目的地，</span>
            <span className="text-[#102a56]">生成一张旅游信息卡</span>
          </h1>
        </div>

        <form onSubmit={generateInfo} className="mx-auto mt-8 grid max-w-5xl gap-5 rounded-[22px] border border-[#d9e8f7] bg-white px-7 py-6 shadow-[0_20px_45px_rgba(28,94,154,.12)] max-md:px-4">
          <label className="app-field">
            <span className="app-field-icon text-[#0b65df]">⌖</span>
            <span className="app-field-body">
              <span className="app-field-label">已识别出发地：</span>
              <input value={from} onChange={(event) => setFrom(event.target.value)} className="app-control" aria-label="已识别出发地" />
            </span>
            <span className="text-sm font-bold text-[#6f7f93]">可修改</span>
          </label>

          <label className="app-field">
            <span className="app-field-icon text-[#10a7b6]">⌾</span>
            <span className="app-field-body">
              <span className="app-field-label">目的地：</span>
              <select value={draftDestination} onChange={(event) => setDraftDestination(event.target.value)} className="app-control" aria-label="目的地">
                {cities.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.cityNameZh} {item.cityNameEn}
                  </option>
                ))}
              </select>
            </span>
            <span className="text-3xl leading-none">→</span>
          </label>

          <label className="app-field">
            <span className="app-field-icon text-[#ff7a3d]">日</span>
            <span className="app-field-body">
              <span className="app-field-label">出发日期：</span>
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="app-control" aria-label="出发日期" />
            </span>
            <span className="text-3xl leading-none">→</span>
          </label>

          <button type="submit" className="mt-1 rounded-[16px] bg-gradient-to-r from-[#16c6b7] to-[#0b73e8] px-8 py-4 text-xl font-black text-white shadow-[0_16px_32px_rgba(13,116,214,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(13,116,214,.3)]">
            生成旅行信息
          </button>
        </form>
      </section>

      <section className="mx-auto mt-6 w-[min(1180px,calc(100%-32px))] rounded-[22px] border border-[#d9e8f7] bg-white/95 p-5 shadow-[0_16px_36px_rgba(28,94,154,.1)]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="mr-2 text-lg font-black text-[#102a56]">🔥 热门城市</span>
          {cities.map((item) => (
            <button key={item.slug} type="button" onClick={() => chooseHotCity(item.slug)} className={`hot-city-button ${item.slug === activeDestination ? "hot-city-button-active" : ""}`}>
              <span>{item.emoji}</span>
              {item.cityNameZh}
            </button>
          ))}
          <button type="button" className="ml-auto inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-[#6f7f93] transition hover:bg-[#edf7ff] max-md:ml-0">
            换一批 <span className="text-lg">↻</span>
          </button>
        </div>
      </section>

      <section className="mx-auto mt-7 w-[min(1180px,calc(100%-32px))]">
        <TravelCard city={city} from={from} date={date} shareUrl={`https://example.com/card?to=${city.slug}`} />
      </section>
    </div>
  );
}
