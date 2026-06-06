"use client";

function useLocalTime(timezone) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(new Date());
  } catch {
    return "13:20";
  }
}

function FakeQr({ value }) {
  let seed = 2166136261;
  for (let i = 0; i < value.length; i += 1) seed = Math.imul(seed ^ value.charCodeAt(i), 16777619);
  return (
    <div className="qr-box" aria-label="二维码占位">
      {Array.from({ length: 441 }, (_, index) => {
        const x = index % 21;
        const y = Math.floor(index / 21);
        const finder = (x < 6 && y < 6) || (x > 14 && y < 6) || (x < 6 && y > 14);
        seed = Math.imul(seed + index * 17, 1664525);
        return <span key={index} className={finder || seed % 9 < 4 ? "bg-black" : "bg-white"} />;
      })}
    </div>
  );
}

function FieldRow({ label, value, accent = false }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#e8f1f8] py-2 last:border-b-0">
      <span className="font-bold text-[#66778d]">{label}</span>
      <span className={`text-right font-black ${accent ? "text-[#10a7b6]" : "text-[#182b49]"}`}>{value}</span>
    </div>
  );
}

function InfoModule({ icon, title, children, className = "" }) {
  return (
    <section className={`web-info-card ${className}`}>
      <h3 className="mb-4 flex items-center gap-2 text-xl font-black text-[#102a56]">
        <span className="grid size-8 place-items-center rounded-full bg-[#e8f4ff] text-lg">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function ActionButton({ children }) {
  return (
    <button type="button" className="rounded-[12px] border border-[#9bcfff] bg-[#f4fbff] px-4 py-3 text-sm font-black text-[#0b65df] transition hover:-translate-y-0.5 hover:bg-white">
      {children}
    </button>
  );
}

function EntryLine({ children }) {
  return (
    <button type="button" className="flex w-full items-center justify-between rounded-[12px] border border-[#dcebf7] bg-white px-4 py-3 text-left font-bold text-[#314663] transition hover:bg-[#f5fbff]">
      <span>{children}</span>
      <span className="text-2xl leading-none text-[#7c8da3]">›</span>
    </button>
  );
}

function PaymentBadge({ label }) {
  return (
    <span className="inline-grid min-h-8 min-w-14 place-items-center rounded-[9px] border border-[#d9e8f7] bg-white px-2 text-xs font-black text-[#1d4c8f] shadow-sm">
      {label}
    </span>
  );
}

function ChecklistItem({ label }) {
  const iconMap = {
    护照: "🛂",
    官方入口: "🌐",
    机票: "🎫",
    酒店: "🏨",
    eSIM: "📱",
    流量卡: "📱",
    交通卡: "💳",
    转换头: "🔌"
  };
  return (
    <div className="grid justify-items-center gap-2 text-center">
      <span className="grid size-16 place-items-center rounded-full border border-[#d9e8f7] bg-[#f3faff] text-2xl shadow-inner">{iconMap[label] || "✓"}</span>
      <span className="text-sm font-black text-[#263d62]">{label}</span>
    </div>
  );
}

function BannerIllustration({ city }) {
  return (
    <div className="city-banner" style={{ "--accent": city.accent }}>
      <span className="banner-sun" />
      <span className="banner-temple" />
      <span className="banner-cityline" />
      <span className="banner-plane">✈</span>
      <span className="banner-pin">📍</span>
    </div>
  );
}

export default function TravelCard({ city, from, date, shareUrl }) {
  const localTime = useLocalTime(city.timezone);

  return (
    <article className="rounded-[24px] border border-[#cfe3f8] bg-white p-4 shadow-[0_20px_55px_rgba(28,94,154,.14)] md:p-5">
      <section className="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-white via-white to-[#eaf8ff] p-6 md:p-8">
        <BannerIllustration city={city} />
        <div className="relative z-10 max-w-[58%] max-md:max-w-full">
          <h2 className="text-[clamp(34px,5vw,52px)] font-black leading-tight text-[#102a56]">{city.cityNameZh}旅游信息卡</h2>
          <p className="mt-3 flex items-center gap-2 text-xl font-bold text-[#416a9e]">
            <span className="text-[#0b65df]">⌖</span>
            {city.locationText}
          </p>
          <p className="mt-3 text-lg font-bold text-[#65758b]">{city.subtitle}</p>
          <p className="mt-4 inline-flex rounded-full bg-[#edf8ff] px-4 py-2 text-sm font-black text-[#0b65df]">
            出发地：{from} · 出发日期：{date}
          </p>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-12 gap-4">
        <InfoModule icon="i" title="基础信息" className="col-span-4 max-lg:col-span-6 max-md:col-span-12">
          <FieldRow label="国家" value={city.country} />
          <FieldRow label="城市" value={city.city} />
          <FieldRow label="时区" value={city.timezone} />
          <FieldRow label="当地时间" value={localTime} accent />
        </InfoModule>

        <InfoModule icon="✈" title="怎么去" className="col-span-4 max-lg:col-span-6 max-md:col-span-12">
          <FieldRow label="主要机场" value={city.airports.join(" / ")} />
          <FieldRow label="常见方式" value={city.transportWays.join(" / ")} />
          <div className="mt-4 grid grid-cols-3 gap-3">
            <ActionButton>查机票</ActionButton>
            <ActionButton>查酒店</ActionButton>
            <ActionButton>查路线</ActionButton>
          </div>
        </InfoModule>

        <InfoModule icon="🛂" title="入境提示" className="col-span-4 max-lg:col-span-12">
          <div className="grid gap-3">
            {city.entryTips.map((tip) => (
              <EntryLine key={tip}>{tip}</EntryLine>
            ))}
          </div>
        </InfoModule>

        <InfoModule icon="¥" title="汇率与支付" className="col-span-4 max-lg:col-span-6 max-md:col-span-12">
          <FieldRow label="货币" value={city.currency} />
          <FieldRow label="汇率参考" value={city.exchangeRate} />
          <FieldRow label="支付方式" value={city.paymentMethods.join(" / ")} />
          <div className="mt-4 flex flex-wrap gap-2">
            {city.paymentMethods.map((method) => (
              <PaymentBadge key={method} label={method} />
            ))}
          </div>
        </InfoModule>

        <InfoModule icon="🌧" title="天气" className="col-span-4 max-lg:col-span-6 max-md:col-span-12">
          <div className="flex items-center gap-4">
            <strong className="text-5xl font-black text-[#0b65df]">{city.temperature}</strong>
            <span className="rounded-full border border-[#b6dcff] bg-[#eaf6ff] px-4 py-2 font-black text-[#0b65df]">{city.weather}</span>
          </div>
          <FieldRow label="未来 7 天" value={city.temperatureRange} />
          <FieldRow label="穿衣建议" value={city.clothingTip} />
        </InfoModule>

        <InfoModule icon="6" title="语言" className="col-span-2 max-lg:col-span-4 max-md:col-span-6 max-sm:col-span-12">
          <p className="text-lg font-black leading-8 text-[#263d62]">{city.language.join(" / ")}</p>
        </InfoModule>

        <InfoModule icon="🔌" title="插头电压" className="col-span-2 max-lg:col-span-4 max-md:col-span-6 max-sm:col-span-12">
          <p className="text-lg font-black leading-8 text-[#263d62]">{city.plug}，{city.voltage}</p>
        </InfoModule>

        <InfoModule icon="🧳" title="出发前提醒" className="col-span-8 max-lg:col-span-8 max-md:col-span-12">
          <div className="grid grid-cols-6 gap-4 max-md:grid-cols-3">
            {city.departureChecklist.map((item) => (
              <ChecklistItem key={item} label={item} />
            ))}
          </div>
        </InfoModule>

        <InfoModule icon="▣" title="扫码分享此卡" className="col-span-4 max-lg:col-span-12">
          <div className="flex items-center justify-center gap-5 max-sm:flex-col">
            <FakeQr value={shareUrl} />
            <div>
              <p className="text-xl font-black text-[#102a56]">保存或分享给旅伴</p>
              <p className="mt-2 max-w-[220px] font-bold leading-7 text-[#65758b]">扫码回到页面，查看当前目的地的旅行信息内容。</p>
            </div>
          </div>
        </InfoModule>
      </section>

      <p className="mt-5 text-center text-sm font-bold text-[#72839a]">数据仅供参考，请以官方信息为准。</p>
    </article>
  );
}
