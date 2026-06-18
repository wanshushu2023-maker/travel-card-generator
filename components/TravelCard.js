"use client";

import DestinationPowerCard from "@/components/power/DestinationPowerCard";
import FlightPriceReference from "@/components/FlightPriceReference";
import { t } from "@/lib/i18n";

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

var entryTipsEn = {
  bangkok: ["Carry 20,000 THB cash per person", "40,000 THB for families", "Fill TDAC digital arrival card", "Prepare return flight & hotel bookings"],
  tokyo: ["Chinese passport requires tourist visa (5-7 days)", "Pre-fill Visit Japan Web", "Bring passport, visa, flight and hotel bookings"],
  singapore: ["Chinese passport visa-free 30 days", "Fill SG Arrival Card", "Passport valid 6+ months"],
  osaka: ["Chinese passport requires tourist visa (5-7 days)", "Pre-fill Visit Japan Web", "Bring passport, visa, flight and hotel bookings"],
  "kuala-lumpur": ["Chinese passport visa-free 30 days", "Fill MDAC arrival card", "Passport valid 6+ months"],
  bali: ["Visa on arrival 30 days, fee 500,000 IDR", "Apply at airport with cash", "Passport valid 6+ months"]
};

function formatTimeDifference(destinationTimezone, departure, lang) {
  try {
    const diffMinutes = getTimezoneOffsetMinutes(destinationTimezone) - getTimezoneOffsetMinutes(departure.timezone);
    if (diffMinutes === 0) return lang === "en" ? "Same timezone" : "与" + departure.nameZh + "相同";

    const absMinutes = Math.abs(diffMinutes);
    const hours = Math.floor(absMinutes / 60);
    const minutes = absMinutes % 60;
    const cityEn = departure.defaultCityEn || departure.nameEn || departure.nameZh;
    if (lang === "en") {
      const amt = minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
      const dir = diffMinutes > 0 ? "ahead of" : "behind";
      return `${amt} ${dir} ${cityEn}`;
    }
    const amount = minutes === 0 ? `${hours} 小时` : `${hours} 小时 ${minutes} 分钟`;
    return `比${departure.nameZh}${diffMinutes > 0 ? "快" : "慢"} ${amount}`;
  } catch {
    return lang === "en" ? "Check timezone info" : "请以" + departure.nameZh + "出发地时区为准";
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
  const query = `${departure.nameZh} to ${city.cityNameZh} ${date} flight search`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
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
    "护照": "🛂",
    "官方入口": "🌐",
    "机票": "🎫",
    "酒店": "🏨",
    "酒店预订": "🏨",
    "eSIM": "📱",
    "流量卡": "📱",
    "电话卡": "📱",
    "交通卡": "💳",
    "转换头": "🔌",
    "转换头(备选)": "🔌",
    "签证": "📄",
    "网络(漫游/eSIM)": "📶",
    "TDAC 入境卡填写单": "📋",
    "SG Arrival Card": "📋",
    "MDAC 电子入境卡": "📋",
    "落地签(VOA)": "📋"
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


function VisaStatusBadge({ visa, lang = "zh" }) {
  if (!visa) {
    return (
      <div className="grid gap-3">
        <p className="rounded-[12px] bg-[#fff8eb] px-4 py-3 text-sm font-black leading-6 text-[#a36a13] text-center">
          lang === "en" ? "Check visa requirements" : "请按护照确认签证要求"
        </p>
        <p className="text-sm font-bold leading-6 text-[#66778d] text-center">lang === "en" ? "Check official requirements" : "请以目的地国家官方要求为准"</p>
      </div>
    );
  }

  var iconMap = { "visa-free": "\u2705", "visa-on-arrival": "\u{1F4CB}", "eta": "\u{1F4F1}", "visa-required": "\u{1F6C2}" };
  var labelMap = {
    "visa-free": { text: "\u514d\u7b7e", color: "bg-[#0d8f89]", light: "bg-[#eaf8f5]" },
    "visa-on-arrival": { text: "\u843d\u5730\u7b7e", color: "bg-[#b26a12]", light: "bg-[#fff2df]" },
    "eta": { text: "\u7535\u5b50\u7b7e", color: "bg-[#0b65df]", light: "bg-[#eef6ff]" },
    "visa-required": { text: "\u9700\u8981\u529e\u7406\u7b7e\u8bc1", color: "bg-[#c64a3a]", light: "bg-[#fff0f0]" }
  };
  var label = labelMap[visa.type] || labelMap["visa-required"];
  var icon = iconMap[visa.type] || "\u{1F6C2}";

  return (
    <div className={"rounded-[16px] p-5 text-center " + label.light}>
      <div className="mx-auto grid size-16 place-items-center rounded-full text-3xl shadow-sm ring-1 ring-white/60" style={{ backgroundColor: label.color.replace("bg-[", "").replace("]", "") + "22" }}>
        <span>{icon}</span>
      </div>
      <p className={"mt-3 inline-block rounded-full px-5 py-2 text-lg font-black text-white " + label.color}>
        {label.text}{visa.days ? " " + visa.days + "\u5929" : ""}
      </p>
      {visa.note ? <p className="mt-3 text-sm font-bold leading-6 text-[#66778d]">{visa.note}</p> : null}
      {visa.processingTime ? (
        <div className="mt-4 space-y-2">
          <div className="rounded-[10px] bg-white px-3 py-2 text-left">
            <p className="text-xs font-black text-[#66778d]">{"\u529e\u7406\u5468\u671f"}</p>
            <p className="text-sm font-black text-[#102a56]">{visa.processingTime}</p>
          </div>
          {visa.fee ? (
            <div className="rounded-[10px] bg-white px-3 py-2 text-left">
              <p className="text-xs font-black text-[#66778d]">{"\u7b7e\u8bc1\u8d39\u7528"}</p>
              <p className="text-sm font-black text-[#102a56]">{visa.fee}</p>
            </div>
          ) : null}
          {visa.documents && visa.documents.length > 0 ? (
            <div className="rounded-[10px] bg-white px-3 py-2 text-left">
              <p className="text-xs font-black text-[#66778d]">{"\u6240\u9700\u6750\u6599"}</p>
              <ul className="mt-1 grid gap-1">
                {visa.documents.map(function(doc, i) {
                  return <li key={i} className="flex items-start gap-1.5 text-xs font-bold text-[#314663]"><span className="mt-0.5 shrink-0">{"\u2022"}</span><span>{doc}</span></li>;
                })}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default function TravelCard({ city, departure, date, flightPrice, flightPriceError, isFlightPriceLoading, exchangeRate, exchangeRateError, weatherData, weatherError, checklistItems, lang = "zh" }) {
  const timeDifference = formatTimeDifference(city.timezone, departure, lang);
  const flightSearchUrl = buildFlightSearchUrl(departure, city, date);
  const shouldShowFlightPriceReference = isFlightPriceLoading || flightPrice || flightPriceError;

  return (
    <article className="rounded-[18px] border border-[#cfe3f8] bg-white p-4 shadow-[0_10px_28px_rgba(28,94,154,.08)] md:p-5">
      <section className="relative overflow-hidden rounded-[16px] bg-gradient-to-r from-white via-white to-[#eaf8ff] p-6 md:p-8">
        <BannerIllustration city={city} />
        <div className="relative z-10 max-w-[58%] max-md:max-w-full">
          <h2 className="text-[clamp(34px,5vw,52px)] font-black leading-tight text-[#102a56]">{(lang === "en" ? (city.cityNameEn || city.cityNameZh) : city.cityNameZh)}{t(lang, "cardSuffix")}</h2>
          <p className="mt-3 flex items-center gap-2 text-xl font-bold text-[#416a9e]">
            <span className="text-[#0b65df]">⌖</span>
            {city.locationText}
          </p>
          <p className="mt-3 text-lg font-bold text-[#65758b]">{city.subtitle}</p>
          <p className="mt-4 inline-flex rounded-full bg-[#edf8ff] px-4 py-2 text-sm font-black text-[#0b65df]">
            {t(lang, "fromLabel")}: {(lang === "en" ? (departure.defaultCityEn || departure.nameEn || departure.nameZh) : (departure.defaultCityZh || departure.nameZh))} · {t(lang, "dateLabel")}: {date}
          </p>
        </div>
      </section>

              <section className="mt-5 grid grid-cols-12 gap-4">
<InfoModule icon="🛂" title={t(lang, "sectionVisa")} className="col-span-4 max-lg:col-span-6 max-md:col-span-12">
          {function() {
      var v = city.visaStatus?.[departure.countryCode];
      return <VisaStatusBadge visa={v || null} lang={lang} />;
    }()}
          <div className="mt-4 rounded-[12px] border border-[#d9e8f7] bg-white px-4 py-3">
            <p className="text-xs font-black text-[#66778d]">⏰ {t(lang, "timeDiff")}</p>
            <p className="mt-1 text-base font-black text-[#102a56]">{timeDifference}</p>
          </div>
        </InfoModule>
        
<InfoModule icon="🛂" title={t(lang, "sectionEntry")} className="col-span-4 max-lg:col-span-12">
          <div className="space-y-3 rounded-[14px] border border-[#d9e8f7] bg-white p-4">
            {(() => { var et = (lang === "en" && entryTipsEn[city.slug]) ? entryTipsEn[city.slug] : city.entryTips; return et && et.length > 0 ? (
              <div className="grid gap-2">
                {et.map(function(tip, i) {
                  return (
                    <p key={i} className="flex items-start gap-2 text-sm font-bold text-[#1f395c]">
                      <span className="mt-px shrink-0">•</span>
                      <span>{tip}</span>
                    </p>
                  );
                })}
              </div>
            ) : null; })()}
            {city.tdacUrl ? (
              <>
                <hr className="border-[#d9e8f7]" />
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e8f4ff] text-lg">📋</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black text-[#102a56]">{t(lang, "electronicEntry")}</p>
                    <a href={city.tdacUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#0b65df] px-4 py-1.5 text-xs font-black text-white hover:bg-[#0a54bd]" style={{ color: "white" }}>
                      {t(lang, "fillForm")}
                    </a>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <p className="mt-3 text-center text-xs font-bold text-[#7c8da3]">{t(lang, "policyChange")}</p>
        </InfoModule>

        
<InfoModule icon="🌧" title={t(lang, "sectionWeather")} className="col-span-4 max-lg:col-span-6 max-md:col-span-12">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{weatherData?.forecast?.[0]?.icon || "☁️"}</span>
            <div>
              <p className="text-2xl font-black text-[#0b65df]">{weatherData?.forecast?.[0]?.maxTemp || city.temperature}°C</p>
              <p className="text-xs font-bold text-[#66778d]">{weatherData?.forecast?.[0]?.label || city.weather}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-7 rounded-[12px] bg-[#f8fcff] px-2 py-2 text-center">
            {Array.from({ length: 7 }).map(function(_, idx) {
              var day = weatherData?.forecast?.[idx];
              if (!day) return null;
              var d = new Date(day.date + "T12:00:00");
              var names = t(lang, "dayNames").split(",");
              return (
                <div key={day.date}>
                  <p className="text-[11px] font-black text-[#66778d]">{idx === 0 ? t(lang, "today") : names[d.getDay()]}</p>
                  <p className="text-base leading-5">{day.icon}</p>
                  <p className="text-[11px] font-black text-[#102a56]">{day.minTemp}°</p>
                  <p className="text-[11px] font-black text-[#0b65df]">{day.maxTemp}°</p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-[#e8f1f8] py-2 last:border-b-0">
              <span className="font-bold text-xs text-[#66778d]">{t(lang, "clothingLabel")}</span>
              <span className="text-right text-xs font-black text-[#182b49]">{city.clothingTip || ""}</span>
            </div>
        </InfoModule>

        
<InfoModule icon="✈" title={t(lang, "sectionFlight")} className="col-span-4 max-lg:col-span-6 max-md:col-span-12">
          <div className="grid gap-3">
            <MiniSection title={t(lang, "airports")}>
              <ul className="grid gap-2 text-sm font-bold leading-6 text-[#314663]">
                {city.airports.map((airport) => (
                  <li key={airport} className="flex gap-2">
                    <span className="text-[#10a7b6]">•</span>
                    <span>{airport}</span>
                  </li>
                ))}
              </ul>
            </MiniSection>

            {shouldShowFlightPriceReference ? (
              <MiniSection title={t(lang, "priceReference")}>
                <FlightPriceReference
                  departureCityName={departure.defaultCityZh}
                  destinationCityName={city.cityNameZh}
                  flightPrice={flightPrice}
                  flightPriceError={flightPriceError}
                  isLoading={isFlightPriceLoading}
                />

              </MiniSection>
            ) : null}
          </div>


        </InfoModule>

        
<InfoModule icon="¥" title={t(lang, "sectionCurrency")} className="col-span-4 max-lg:col-span-6 max-md:col-span-12">
          <FieldRow label={t(lang, "currencyLabel")} value={city.currency} />
          <FieldRow label={t(lang, "rateLabel")} value={exchangeRate ? "1 CNY \u2248 " + exchangeRate.rate + " " + exchangeRate.target : city.exchangeRate} />
          <FieldRow label={t(lang, "payLabel")} value={city.paymentMethods.join(" / ")} />
          <div className="mt-4 flex flex-wrap gap-2">
            {city.paymentMethods.map((method) => (
              <PaymentBadge key={method} label={method} />
            ))}
          </div>
        </InfoModule>

        
<InfoModule icon="6" title={t(lang, "sectionLanguage")} className="col-span-4 max-lg:col-span-6 max-md:col-span-12">
          <div className="grid gap-3">
            <p className="text-lg font-black leading-8 text-[#263d62]">{city.language.join(" / ")}</p>
            {city.languagePhrases?.length ? (
              <div className="rounded-[14px] bg-[#f6fbff] p-3">
                <p className="mb-2 text-sm font-black text-[#66778d]">{t(lang, "commonPhrases")}</p>
                <ul className="grid gap-2 text-sm font-bold leading-6 text-[#314663]">
                  {city.languagePhrases.map((phrase) => (
                    <li key={phrase}>• {phrase}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="rounded-[14px] bg-[#fffaf2] p-3 text-sm font-black leading-6 text-[#a36a13]">
              {t(lang, "downloadApps")}: {(city.translationApps || [t(lang, "googleTranslate")]).join(" / ")}
            </div>
          </div>
        </InfoModule>

        
<DestinationPowerCard destinationCity={lang === "en" ? (city.cityNameEn || city.cityNameZh) : city.cityNameZh} destinationCountryCode={city.countryCode || ""} lang={lang} />

        
<InfoModule icon="🧳" title={t(lang, "sectionChecklist")} className="col-span-12">
          <div className="grid grid-cols-6 gap-4 max-md:grid-cols-3">
            {(checklistItems || city.departureChecklist).map((item) => (
              <ChecklistItem key={item} label={item} />
            ))}
          </div>
        </InfoModule>

        </section>

      <p className="mt-5 text-center text-sm font-bold text-[#72839a]">{t(lang, "footerDataNote")}</p>
    </article>
  );
}
