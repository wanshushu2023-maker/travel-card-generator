"use client";

import DestinationPowerCard from "@/components/power/DestinationPowerCard";
import FlightPriceReference from "@/components/FlightPriceReference";

function getTimezoneOffsetMinutes(timezone) {
  const date = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second)
  );
  return Math.round((asUtc - date.getTime()) / 60000);
}

function formatTimeDifference(destinationTimezone, departure) {
  try {
    const diffMinutes = getTimezoneOffsetMinutes(destinationTimezone) - getTimezoneOffsetMinutes(departure.timezone);
    if (diffMinutes === 0) return `与${departure.nameZh}相同`;

    const absMinutes = Math.abs(diffMinutes);
    const hours = Math.floor(absMinutes / 60);
    const minutes = absMinutes % 60;
    const amount = minutes === 0 ? `${hours} 小时` : `${hours} 小时 ${minutes} 分钟`;
    return `比${departure.nameZh}${diffMinutes > 0 ? "快" : "慢"} ${amount}`;
  } catch {
    return `请以${departure.nameZh}出发地时区为准`;
  }
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

function ActionButton({ children, href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="rounded-[12px] border border-[#9bcfff] bg-[#f4fbff] px-4 py-3 text-center text-sm font-black text-[#0b65df] transition hover:-translate-y-0.5 hover:bg-white">
      {children}
    </a>
  );
}

function buildFlightSearchUrl(departure, city, date) {
  const query = `${departure.nameZh}到${city.cityNameZh} ${date} 机票`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function getFlightPriceRangeLabel(city, departure) {
  if (city.flightPriceRanges?.[departure.slug]) return city.flightPriceRanges[departure.slug];
  if (departure.countryCode === "CN") return city.flightPriceRanges?.["mainland-china"] ?? "请查询实时价格";
  if (departure.countryCode === "JP") return city.flightPriceRanges?.japan ?? "请查询实时价格";
  if (departure.countryCode === "KR") return city.flightPriceRanges?.["south-korea"] ?? "请查询实时价格";
  if (departure.countryCode === "SG") return city.flightPriceRanges?.singapore ?? "请查询实时价格";
  if (departure.countryCode === "MY") return city.flightPriceRanges?.malaysia ?? "请查询实时价格";
  if (departure.countryCode === "ID") return city.flightPriceRanges?.indonesia ?? "请查询实时价格";
  if (departure.countryCode === "TH") return city.flightPriceRanges?.thailand ?? "请查询实时价格";
  return "请查询实时价格";
}

function EntryLine({ children, href }) {
  const className = "flex w-full items-center justify-between rounded-[12px] border border-[#dcebf7] bg-white px-4 py-3 text-left font-bold text-[#314663] transition hover:bg-[#f5fbff]";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        <span>{children}</span>
        <span className="text-2xl leading-none text-[#7c8da3]">›</span>
      </a>
    );
  }

  return (
    <div className={className}>
      <span>{children}</span>
      <span className="text-2xl leading-none text-[#7c8da3]">›</span>
    </div>
  );
}

function MiniSection({ title, children }) {
  return (
    <div className="rounded-[14px] bg-[#f6fbff] p-3">
      <p className="mb-2 text-sm font-black text-[#66778d]">{title}</p>
      {children}
    </div>
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

export default function TravelCard({ city, departure, date, flightPrice, flightPriceError, isFlightPriceLoading }) {
  const timeDifference = formatTimeDifference(city.timezone, departure);
  const flightPriceRange = getFlightPriceRangeLabel(city, departure);
  const flightSearchUrl = buildFlightSearchUrl(departure, city, date);
  const feeNotice = ["泰国游客入境费 / 旅游税确实有 300 泰铢的政策规划，截至今天还没有执行。", "请出行前以泰国官方最新公告和航司/订票平台订单页为准。"];

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
            出发地：{departure.label} · 出发日期：{date}
          </p>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-12 gap-4">
        <InfoModule icon="🛂" title="签证办理" className="col-span-4 max-lg:col-span-6 max-md:col-span-12">
          <div className="grid gap-3">
            <MiniSection title="入境要求">
              <p className="text-sm font-bold leading-7 text-[#314663]">{city.visaRequirement || "请按目的地官方入境要求准备签证或免签材料。"}</p>
            </MiniSection>
            <MiniSection title="签证类型">
              <div className="flex flex-wrap gap-2">
                {city.visaOptions.map((item) => (
                  <span key={item} className="rounded-full bg-white px-3 py-1 text-sm font-black text-[#0b65df] shadow-sm ring-1 ring-[#d9e8f7]">{item}</span>
                ))}
              </div>
            </MiniSection>
            <FieldRow label="办理周期" value={city.visaProcessingTime || "请以使领馆或官方平台为准"} />
            <FieldRow label="可停留时间" value={city.visaStayDuration || city.visaOptions.join(" / ")} />
          </div>
          <FieldRow label="时差" value={timeDifference} accent />
        </InfoModule>

        <InfoModule icon="✈" title="机票查询" className="col-span-8 max-lg:col-span-12">
          <div className="grid gap-3">
            <MiniSection title="直飞的机场">
              <ul className="grid gap-2 text-sm font-bold leading-6 text-[#314663]">
                {city.airports.map((airport) => (
                  <li key={airport} className="flex gap-2">
                    <span className="text-[#10a7b6]">•</span>
                    <span>{airport}</span>
                  </li>
                ))}
              </ul>
            </MiniSection>

            <MiniSection title="机票价格参考">
              <FlightPriceReference
                departureCityName={departure.defaultCityZh}
                destinationCityName={city.cityNameZh}
                flightPrice={flightPrice}
                flightPriceError={flightPriceError}
                isLoading={isFlightPriceLoading}
              />
              <div className="mt-3 grid gap-2">
                <FieldRow label="静态参考区间" value={flightPriceRange} accent />
                <ActionButton href={flightSearchUrl}>去 Google Flights 查询</ActionButton>
                <p className="text-xs font-bold leading-5 text-[#7c8da3]">航班价格和税费以出票页面为准。</p>
              </div>
            </MiniSection>
          </div>

          <div className="mt-3 rounded-[14px] bg-[#fffaf2] p-3">
            <p className="mb-2 text-sm font-black text-[#a36a13]">费用提示</p>
            <ul className="grid gap-2 text-sm font-bold leading-7 text-[#314663]">
              {feeNotice.map((notice) => (
                <li key={notice} className="flex gap-2">
                  <span className="text-[#10a7b6]">•</span>
                  <span>{notice}</span>
                </li>
              ))}
            </ul>
          </div>
        </InfoModule>

        <InfoModule icon="🛂" title="入境提示" className="col-span-4 max-lg:col-span-12">
          <div className="grid gap-3">
            <div className="rounded-[14px] bg-[#f6fbff] p-3">
              <p className="mb-2 text-sm font-black text-[#66778d]">现金准备</p>
              <ul className="grid gap-2 text-sm font-bold leading-6 text-[#314663]">
                <li>个人：20,000 泰铢现金或等值货币</li>
                <li>家庭：40,000 泰铢现金或等值货币</li>
              </ul>
            </div>
            <EntryLine href={city.tdacUrl}>TDAC 电子入境卡官方入口</EntryLine>
            <div className="rounded-[14px] bg-[#fffaf2] p-3">
              <p className="mb-2 text-sm font-black text-[#a36a13]">行程材料</p>
              <ul className="grid gap-2 text-sm font-bold leading-6 text-[#314663]">
                <li>回程机票预订单</li>
                <li>酒店预订单</li>
              </ul>
            </div>
            <p className="text-xs font-bold leading-5 text-[#7c8da3]">政策可能随时变化，请以官方最新要求为准。</p>
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

        <InfoModule icon="6" title="语言" className="col-span-4 max-lg:col-span-6 max-md:col-span-12">
          <div className="grid gap-3">
            <p className="text-lg font-black leading-8 text-[#263d62]">{city.language.join(" / ")}</p>
            {city.languagePhrases?.length ? (
              <div className="rounded-[14px] bg-[#f6fbff] p-3">
                <p className="mb-2 text-sm font-black text-[#66778d]">常用当地语言</p>
                <ul className="grid gap-2 text-sm font-bold leading-6 text-[#314663]">
                  {city.languagePhrases.map((phrase) => (
                    <li key={phrase}>• {phrase}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="rounded-[14px] bg-[#fffaf2] p-3 text-sm font-black leading-6 text-[#a36a13]">
              建议提前下载：{(city.translationApps || ["Google 翻译 App"]).join(" / ")}
            </div>
          </div>
        </InfoModule>

        <DestinationPowerCard destinationCity={city.cityNameZh} destinationCountryCode={city.countryCode || ""} />

        <InfoModule icon="🧳" title="出发前提醒" className="col-span-6 max-lg:col-span-12 max-md:col-span-12">
          <div className="grid grid-cols-6 gap-4 max-md:grid-cols-3">
            {city.departureChecklist.map((item) => (
              <ChecklistItem key={item} label={item} />
            ))}
          </div>
        </InfoModule>

      </section>

      <p className="mt-5 text-center text-sm font-bold text-[#72839a]">数据仅供参考，请以官方信息为准。</p>
    </article>
  );
}
