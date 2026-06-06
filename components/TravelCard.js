"use client";

import { forwardRef } from "react";

function FakeQr({ value }) {
  let seed = 2166136261;
  for (let i = 0; i < value.length; i += 1) seed = Math.imul(seed ^ value.charCodeAt(i), 16777619);
  return (
    <div className="grid size-[150px] grid-cols-[repeat(25,1fr)] rounded-[14px] bg-white p-3 shadow-[0_12px_24px_rgba(16,42,86,.16)]" aria-label="二维码占位">
      {Array.from({ length: 625 }, (_, index) => {
        const x = index % 25;
        const y = Math.floor(index / 25);
        const finder = (x < 7 && y < 7) || (x > 17 && y < 7) || (x < 7 && y > 17);
        seed = Math.imul(seed + index * 31, 1664525);
        return <span key={index} className={finder || seed % 7 < 3 ? "bg-black" : "bg-white"} />;
      })}
    </div>
  );
}

function MapPanel() {
  return (
    <div className="map-panel absolute inset-y-0 right-0 w-[48%] overflow-hidden max-sm:opacity-40">
      <span className="river-line" />
      <span className="route-line" />
      <span className="map-pin">📍</span>
      <span className="plane-mark">✈</span>
      <span className="photo-card photo-a" />
      <span className="photo-card photo-b" />
      <span className="heart-mark">♡</span>
    </div>
  );
}

function Module({ tone, icon, title, children, className = "" }) {
  return (
    <section className={`info-module ${tone} ${className}`}>
      <h3 className="mb-3 flex items-center gap-2 text-[clamp(20px,2vw,26px)] font-black">
        <span className="text-3xl">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function BulletList({ items }) {
  return (
    <ul className="grid gap-2 text-[15px] font-bold leading-6 text-[#263c59]">
      {items.map((item) => (
        <li key={item} className="flex gap-2 before:text-[#ff6a55] before:content-['•']">
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SmallButton({ children }) {
  return <span className="inline-flex min-h-9 items-center rounded-[10px] bg-[#ff6154] px-3 text-sm font-black text-white shadow-sm">{children}</span>;
}

function PaymentIcons() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <span className="pay-icon bg-[#24a865] text-white">💵</span>
      <span className="pay-icon text-[#1e56b5]">VISA</span>
      <span className="pay-icon text-[#e84038]">MC</span>
      <span className="pay-icon text-[#1677e8]">支</span>
    </div>
  );
}

function PlugDrawing() {
  return (
    <div className="mt-4 flex gap-4">
      <span className="plug-shape"><i /><i /></span>
      <span className="plug-shape rounded-full"><b /><b /></span>
    </div>
  );
}

function PrepIcon({ icon, label }) {
  return (
    <div className="grid justify-items-center gap-2 text-center text-sm font-bold text-[#263c59]">
      <span className="grid size-16 place-items-center rounded-full bg-white text-3xl shadow-inner ring-1 ring-[#f0d8c8]">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

const TravelCard = forwardRef(function TravelCard({ city, from, date, shareUrl }, ref) {
  return (
    <article ref={ref} className="travel-share-card w-[min(100%,720px)] overflow-hidden rounded-[30px] border-[7px] border-[#ff9b7c] bg-[#fffaf6] shadow-[0_26px_70px_rgba(20,91,150,.18)]">
      <section className="relative min-h-[280px] overflow-hidden bg-gradient-to-br from-[#048fe6] to-[#20c6ef] px-8 py-7 text-white max-sm:px-5">
        <MapPanel />
        <div className="relative z-10 max-w-[58%] max-sm:max-w-full">
          <div className="text-5xl leading-none">{city.flag}</div>
          <p className="mt-4 text-[clamp(30px,5vw,44px)] font-black italic drop-shadow-md">{city.nameEn} Travel Card</p>
          <h2 className="mt-2 text-[clamp(42px,7vw,62px)] font-black leading-none tracking-tight drop-shadow-md">{city.nameZh}旅游信息卡</h2>
          <p className="mt-4 text-xl font-black">📍 {city.subtitle}</p>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-4 p-5 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:p-3">
        <Module tone="tone-red" icon="✈" title="怎么去">
          <BulletList items={[city.airports[0], city.airports[1] || "主要国际机场", city.transport]} />
          <div className="mt-4 flex flex-wrap gap-2">
            <SmallButton>查机票</SmallButton>
            <SmallButton>查酒店</SmallButton>
            <SmallButton>查路线</SmallButton>
          </div>
        </Module>

        <Module tone="tone-blue" icon="🛂" title="入境提示">
          <BulletList items={city.entry} />
          <div className="mt-4 inline-flex rounded-[10px] bg-[#1677e8] px-4 py-2 text-sm font-black text-white">{city.entryButton}</div>
        </Module>

        <Module tone="tone-yellow" icon="💰" title="汇率与支付">
          <BulletList items={[`货币：${city.currency}`, city.rate, city.payment]} />
          <PaymentIcons />
        </Module>

        <Module tone="tone-sky" icon="🌧" title="天气与穿衣">
          <div className="flex items-center gap-3">
            <strong className="text-5xl font-black text-[#1677e8]">{city.weather}</strong>
            <span className="rounded-full border border-[#b6dcff] bg-[#e9f5ff] px-3 py-1 text-sm font-black text-[#1677e8]">{city.weatherDesc}</span>
          </div>
          <BulletList items={[city.forecast, city.clothing]} />
          <div className="mt-2 text-4xl">☂️ 👕</div>
        </Module>

        <Module tone="tone-purple" icon="💬" title="语言与沟通">
          <BulletList items={city.language} />
          <div className="mt-4 rounded-[14px] bg-[#9271e8] px-4 py-3 text-center text-sm font-black text-white">{city.phrase}</div>
        </Module>

        <Module tone="tone-green" icon="🔌" title="插头电压">
          <BulletList items={[`插头类型：${city.plug}`, `电压：${city.voltage}`]} />
          <PlugDrawing />
        </Module>

        <Module tone="tone-orange" icon="✅" title="出发前提醒" className="lg:col-span-2">
          <div className="grid grid-cols-5 gap-3 max-sm:grid-cols-3">
            <PrepIcon icon="🛂" label="护照" />
            <PrepIcon icon="🎫" label="机票" />
            <PrepIcon icon="🏨" label="酒店预订" />
            <PrepIcon icon="📱" label="eSIM" />
            <PrepIcon icon="🔌" label="转换头" />
          </div>
          <p className="mt-4 font-bold text-[#7c6a5f]">建议提前准备，旅途更安心！</p>
        </Module>
      </section>

      <section className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-5 bg-gradient-to-r from-[#d8f5ff] via-white to-[#fff3cf] px-8 py-7 max-sm:grid-cols-1 max-sm:justify-items-center max-sm:text-center">
        <div className="relative min-h-32">
          <span className="absolute left-0 top-12 text-7xl">🛺</span>
          <span className="absolute left-24 top-2 text-5xl">🌴</span>
          <span className="absolute left-5 top-0 text-4xl">🗺️</span>
        </div>
        <div className="text-center">
          <h3 className="text-4xl font-black text-[#102a56]">扫码分享</h3>
          <p className="mt-3 max-w-[280px] font-bold leading-7 text-[#40546f]">保存到手机，分享给同行小伙伴，一起出发，玩得更开心！</p>
        </div>
        <div className="grid justify-items-center gap-3">
          <FakeQr value={shareUrl} />
          <div className="flex items-end gap-2 text-5xl">🍜 🥭 🧋</div>
        </div>
      </section>

      <p className="px-5 pb-5 pt-3 text-center text-sm font-bold text-[#6d7f95]">
        出发地：{from} · 出发日期：{date} · 数据仅供参考，请以官方信息为准
      </p>
    </article>
  );
});

export default TravelCard;
