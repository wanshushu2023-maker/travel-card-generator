"use client";

import { useEffect, useMemo, useState } from "react";
import TravelCard from "@/components/TravelCard";
import { cityCoordinates } from "@/data/coordinates";
import { getDestinationChecklist } from "@/data/checklist";
import { t } from "@/lib/i18n";
import { cities, departurePlaces, findCity, findDepartureByTimezone, findDeparturePlace } from "@/data/cities";

const unmatchedStorageKey = "travel-card-unmatched-places";

function normalizeInput(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function includesToken(value, query) {
  return normalizeInput(value).includes(normalizeInput(query));
}

function matchDeparturePlace(value) {
  const query = normalizeInput(value);
  if (!query) return null;

  return departurePlaces.find((place) => {
    const tokens = [
      place.label,
      place.nameZh,
      place.nameEn,
      place.defaultCityZh,
      place.defaultCityEn,
      place.airportCode,
      `${place.defaultCityZh} ${place.airportCode}`,
      `${place.defaultCityEn} ${place.airportCode}`
    ];
    return tokens.some((token) => normalizeInput(token) === query);
  }) ?? departurePlaces.find((place) => {
    const tokens = [place.label, place.nameZh, place.nameEn, place.defaultCityZh, place.defaultCityEn, place.airportCode];
    return tokens.some((token) => includesToken(token, query));
  }) ?? null;
}

function matchCity(value) {
  const query = normalizeInput(value);
  if (!query) return null;

  return cities.find((city) => {
    const tokens = [
      city.cityNameZh,
      city.cityNameEn,
      city.airportCode,
      city.countryNameZh,
      city.country,
      `${city.countryNameZh} ${city.cityNameZh}`,
      `${city.countryNameZh} · ${city.cityNameZh} ${city.cityNameEn}`,
      `${city.cityNameZh} ${city.airportCode}`,
      `${city.cityNameEn} ${city.airportCode}`
    ];
    return tokens.some((token) => normalizeInput(token) === query);
  }) ?? cities.find((city) => {
    const tokens = [city.cityNameZh, city.cityNameEn, city.airportCode, city.countryNameZh, city.country];
    return tokens.some((token) => includesToken(token, query));
  }) ?? null;
}

async function detectIpDeparture() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) return null;
    const data = await res.json();
    const city = data.city || "";
    const country = data.country_name || "";
    const query = city + " " + country;
    return matchDeparturePlace(query) || matchDeparturePlace(city) || null;
  } catch {
    return null;
  }
}

function readUnmatchedPlaces() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(unmatchedStorageKey) || "[]");
  } catch {
    return [];
  }
}

function saveUnmatchedPlace(record) {
  if (typeof window === "undefined" || !record.value.trim()) return;
  const nextRecord = {
    ...record,
    value: record.value.trim(),
    createdAt: new Date().toISOString()
  };
  const current = readUnmatchedPlaces();
  const duplicated = current.some((item) => item.type === nextRecord.type && normalizeInput(item.value) === normalizeInput(nextRecord.value));
  if (duplicated) return;
  window.localStorage.setItem(unmatchedStorageKey, JSON.stringify([nextRecord, ...current].slice(0, 60)));
}

function detectDepartureSlug() {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return findDepartureByTimezone(timezone).slug;
  } catch {
    return "china-chongqing";
  }
}

export default function HomeClient({ lang = "zh" }) {
  const [fromSlug, setFromSlug] = useState("china-chongqing");
  const [fromInput, setFromInput] = useState("中国 · 重庆 Chongqing (CKG)");
  const [draftDestination, setDraftDestination] = useState("bangkok");
  const [destinationInput, setDestinationInput] = useState("泰国 · 曼谷 Bangkok");
  const [activeDestination, setActiveDestination] = useState("bangkok");
  const [date, setDate] = useState("2026-07-18");
  const [flightPrice, setFlightPrice] = useState(null);
  const [flightPriceError, setFlightPriceError] = useState("");
  const [isFlightPriceLoading, setIsFlightPriceLoading] = useState(false);
  const [unmatchedMessage, setUnmatchedMessage] = useState("");
  const [openCombo, setOpenCombo] = useState("");
  const [departureTouched, setDepartureTouched] = useState(false);
  const [destinationTouched, setDestinationTouched] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [exchangeRateError, setExchangeRateError] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherError, setWeatherError] = useState("");
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [isExchangeRateLoading, setIsExchangeRateLoading] = useState(false);

  const currencyMap = {
    bangkok: "THB",
    tokyo: "JPY",
    singapore: "SGD",
    osaka: "JPY",
    "kuala-lumpur": "MYR",
    bali: "IDR"
  };

  const city = useMemo(() => findCity(activeDestination), [activeDestination]);
  const departure = useMemo(() => findDeparturePlace(fromSlug), [fromSlug]);
  const departureSuggestions = useMemo(() => {
    const query = normalizeInput(fromInput);
    if (!query) return departurePlaces;
    if (departurePlaces.some((place) => normalizeInput(place.label) === query)) return departurePlaces;
    return departurePlaces.filter((place) => [place.label, place.nameZh, place.nameEn, place.defaultCityZh, place.defaultCityEn, place.airportCode].some((token) => includesToken(token, query))).slice(0, 8);
  }, [fromInput]);
  const destinationSuggestions = useMemo(() => {
    const query = normalizeInput(destinationInput);
    if (!query) return cities;
    if (cities.some((item) => normalizeInput(`${item.countryNameZh} · ${item.cityNameZh} ${item.cityNameEn}`) === query)) return cities;
    return cities.filter((item) => [item.countryNameZh, item.country, item.cityNameZh, item.cityNameEn, item.airportCode].some((token) => includesToken(token, query))).slice(0, 8);
  }, [destinationInput]);

  useEffect(() => {
    let cancelled = false;

    async function initialLoad() {
      const ipDeparture = await detectIpDeparture();
      const detectedSlug = ipDeparture?.slug || detectDepartureSlug();
      const detectedDeparture = findDeparturePlace(detectedSlug);
      if (cancelled) return;

      setFromSlug(detectedDeparture.slug);
      setFromInput(detectedDeparture.label);

      const defaultDest = findCity("bangkok");
      setActiveDestination("bangkok");
      setDestinationInput(defaultDest.countryNameZh + " \u00b7 " + defaultDest.cityNameZh + " " + defaultDest.cityNameEn);

      setIsFlightPriceLoading(true);
      try {
        const params = new URLSearchParams({
          origin: detectedDeparture.airportCode,
          destination: defaultDest.airportCode,
          departureDate: date,
          adults: "1"
        });
        const response = await fetch("/api/flight-prices?" + params.toString());
        if (!response.ok || cancelled) throw new Error();
        const data = await response.json();
        if (cancelled) return;
        if (data.error) throw new Error(data.error);
        setFlightPrice(data);
        setFlightPriceError("");
      } catch {
        if (!cancelled) setFlightPrice(null);
      } finally {
        if (!cancelled) setIsFlightPriceLoading(false);
      }

      // Fetch exchange rate
      const currencyCode = currencyMap["bangkok"] || "THB";
      setIsExchangeRateLoading(true);
      try {
        const erParams = new URLSearchParams({ base: "CNY", target: currencyCode });
        const erRes = await fetch("/api/exchange-rate?" + erParams.toString());
        if (!erRes.ok || cancelled) throw new Error();
        const erData = await erRes.json();
        if (cancelled) return;
        if (erData.error) throw new Error(erData.error);
        setExchangeRate(erData);
        setExchangeRateError("");
      } catch {
        if (!cancelled) setExchangeRate(null);
      } finally {
        if (!cancelled) setIsExchangeRateLoading(false);
      }
      // Fetch weather
      await fetchWeatherForCity("bangkok");
    }

    initialLoad();
    return () => { cancelled = true; };
  }, []);

  async function fetchFlightPrice(destinationSlug = draftDestination, departureSlug = fromSlug, departureDate = date) {
    const nextCity = findCity(destinationSlug);
    const nextDeparture = findDeparturePlace(departureSlug);
    setIsFlightPriceLoading(true);
    setFlightPriceError("");

    try {
      const params = new URLSearchParams({
        origin: nextDeparture.airportCode,
        destination: nextCity.airportCode,
        departureDate,
        adults: "1"
      });
      const response = await fetch(`/api/flight-prices?${params.toString()}`);
      if (!response.ok) throw new Error("flight price request failed");
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setFlightPrice(data);
    } catch {
      setFlightPrice(null);
      setFlightPriceError(lang === "en" ? "Unable to load prices" : "暂未获取到实时价格，请前往出票平台查询");
    } finally {
      setIsFlightPriceLoading(false);
    }
  }

  async function generateInfo(event) {
    event.preventDefault();
    const matchedDeparture = matchDeparturePlace(fromInput);
    const matchedDestination = matchCity(destinationInput);
    const missing = [];

    if (matchedDeparture) {
      setFromSlug(matchedDeparture.slug);
      setFromInput(matchedDeparture.label);
    } else {
      saveUnmatchedPlace({
        type: "departure",
        value: fromInput,
        activeDeparture: departure.label,
        activeDestination: city.cityNameZh,
        date
      });
      missing.push(t(lang, "fromLabel"));
    }

    if (matchedDestination) {
      setDraftDestination(matchedDestination.slug);
      setActiveDestination(matchedDestination.slug);
      setDestinationInput(`${matchedDestination.countryNameZh} · ${matchedDestination.cityNameZh} ${matchedDestination.cityNameEn}`);
    } else {
      saveUnmatchedPlace({
        type: "destination",
        value: destinationInput,
        activeDeparture: departure.label,
        activeDestination: city.cityNameZh,
        date
      });
      missing.push(t(lang, "toLabel"));
    }

    if (missing.length) {
      setUnmatchedMessage(`{t(lang, "unmatchedMsg", { missing: missing.join("、") })}`);
      return;
    }

    setUnmatchedMessage("");
    await fetchFlightPrice(matchedDestination.slug, matchedDeparture.slug, date);

    // Fetch exchange rate
    const currencyCode = currencyMap[matchedDestination.slug] || "THB";
    setIsExchangeRateLoading(true);
    try {
      const erParams = new URLSearchParams({ base: "CNY", target: currencyCode });
      const erRes = await fetch("/api/exchange-rate?" + erParams.toString());
      if (!erRes.ok) throw new Error();
      const erData = await erRes.json();
      if (erData.error) throw new Error(erData.error);
      setExchangeRate(erData);
      setExchangeRateError("");
    } catch {
      setExchangeRate(null);
      setExchangeRateError(lang === "en" ? "Unable to load exchange rate" : "暂未获取到实时汇率，请以银行或兑换机构为准");
    } finally {
      setIsExchangeRateLoading(false);
    }
  }

  async function chooseHotCity(slug) {
    const nextCity = findCity(slug);
    setDraftDestination(slug);
    setActiveDestination(slug);
    setDestinationInput(`${nextCity.countryNameZh} · ${nextCity.cityNameZh} ${nextCity.cityNameEn}`);
    setUnmatchedMessage("");
    fetchFlightPrice(slug, fromSlug, date);

    const currencyCode = currencyMap[slug] || "THB";
    setIsExchangeRateLoading(true);
    try {
      const erParams = new URLSearchParams({ base: "CNY", target: currencyCode });
      const erRes = await fetch("/api/exchange-rate?" + erParams.toString());
      if (!erRes.ok) throw new Error();
      const erData = await erRes.json();
      if (erData.error) throw new Error(erData.error);
      setExchangeRate(erData);
      setExchangeRateError("");
    } catch {
      setExchangeRate(null);
    } finally {
      setIsExchangeRateLoading(false);
    }
    await fetchWeatherForCity(slug);
  }

  function chooseDeparturePlace(place) {
    setFromSlug(place.slug);
    setFromInput(place.label);
    setDepartureTouched(false);
    setOpenCombo("");
    setUnmatchedMessage("");
  }

  function chooseDestinationCity(item) {
    setDraftDestination(item.slug);
    setDestinationInput(`${item.countryNameZh} · ${item.cityNameZh} ${item.cityNameEn}`);
    setOpenCombo("");
    setUnmatchedMessage("");
  }

  function updateDepartureInput(value) {
    setFromInput(value);
    const matched = matchDeparturePlace(value);
    if (matched) {
      setFromSlug(matched.slug);
      setUnmatchedMessage("");
    }
  }

  async function fetchWeatherForCity(slug) {
    const coords = cityCoordinates[slug];
    if (!coords) return;
    setIsWeatherLoading(true);
    try {
      const res = await fetch("/api/weather?lat=" + coords.lat + "&lon=" + coords.lon);
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setWeatherData(data);
      setWeatherError("");
    } catch {
      setWeatherData(null);
    } finally {
      setIsWeatherLoading(false);
    }
  }

  function updateDestinationInput(value) {
    setDestinationInput(value);
    const matched = matchCity(value);
    if (matched) {
      setDraftDestination(matched.slug);
      setUnmatchedMessage("");
    }
  }

  return (
    <div className="pb-10">
      <section className="mx-auto w-[min(1180px,calc(100%-32px))] rounded-[18px] border border-[#cfe3f8] bg-[linear-gradient(180deg,#f8fcff_0%,#fff_100%)] px-8 py-9 shadow-[0_10px_28px_rgba(24,91,156,.08)] max-md:px-5 max-sm:w-full max-sm:rounded-none">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-[clamp(32px,5vw,48px)] font-black leading-tight tracking-normal">
            <span className="text-[#0b65df]">{t(lang, "headline1")}</span>
            <span className="text-[#102a56]">{t(lang, "headline2")}</span>
          </h1>
        </div>

        <form onSubmit={generateInfo} className="mx-auto mt-8 grid max-w-5xl gap-4 rounded-[16px] border border-[#d9e8f7] bg-white px-7 py-6 shadow-[0_8px_20px_rgba(28,94,154,.08)] max-md:px-4">
          <div className="app-combo">
            <label className="app-field">
              <span className="app-field-icon text-[#0b65df]">⌖</span>
              <span className="app-field-body">
                <span className="app-field-label">{t(lang, "departureLabel")}</span>
                <input
                  value={fromInput}
                  onChange={(event) => updateDepartureInput(event.target.value)}
                  onFocus={() => {
            if (!departureTouched) {
              setFromInput("");
              setDepartureTouched(true);
            }
            setOpenCombo("departure");
          }}
                  onClick={() => setOpenCombo("departure")}
                  onMouseDown={() => setOpenCombo("departure")}
                  onBlur={() => {
            window.setTimeout(() => {
              setOpenCombo("");
              if (!fromInput.trim()) {
                var d = findDeparturePlace(fromSlug);
                setFromInput(d.label);
              }
            }, 160);
          }}
                  className="app-control"
                  aria-label={t(lang, "departureLabel")}
                  placeholder={t(lang, "departurePlaceholder")}
                />
              </span>
              <span className="text-sm font-bold text-[#6f7f93]">{t(lang, "modifiable")}</span>
            </label>
            {openCombo === "departure" ? (
              <div className="combo-menu">
                {departureSuggestions.length ? departureSuggestions.map((place) => (
                  <button key={place.slug} type="button" className="combo-option" onMouseDown={(event) => event.preventDefault()} onClick={() => chooseDeparturePlace(place)}>
                    <span>{place.label}</span>
                    <small>{place.airportCode}</small>
                  </button>
                )) : (
                  <p className="combo-empty">{t(lang, "noMatch")}</p>
                )}
              </div>
            ) : null}
          </div>

          <div className="app-combo">
            <label className="app-field">
              <span className="app-field-icon text-[#10a7b6]">⌾</span>
              <span className="app-field-body">
                <span className="app-field-label">{t(lang, "destinationLabel")}</span>
                <input
                  value={destinationInput}
                  onChange={(event) => updateDestinationInput(event.target.value)}
                  onFocus={() => {
            if (!destinationTouched) {
              setDestinationInput("");
              setDestinationTouched(true);
            }
            setOpenCombo("destination");
          }}
                  onClick={() => setOpenCombo("destination")}
                  onMouseDown={() => setOpenCombo("destination")}
                  onBlur={() => {
            window.setTimeout(() => {
              setOpenCombo("");
              if (!fromInput.trim()) {
                var d = findDeparturePlace(fromSlug);
                setFromInput(d.label);
              }
            }, 160);
          }}
                  className="app-control"
                  aria-label={t(lang, "destinationLabel")}
                  placeholder={t(lang, "departurePlaceholder")}
                />
              </span>
              <span className="text-3xl leading-none">→</span>
            </label>
            {openCombo === "destination" ? (
              <div className="combo-menu">
                {destinationSuggestions.length ? destinationSuggestions.map((item) => (
                  <button key={item.slug} type="button" className="combo-option" onMouseDown={(event) => event.preventDefault()} onClick={() => chooseDestinationCity(item)}>
                    <span>{item.countryNameZh} · {item.cityNameZh} {item.cityNameEn}</span>
                    <small>{item.airportCode}</small>
                  </button>
                )) : (
                  <p className="combo-empty">{t(lang, "noMatch")}</p>
                )}
              </div>
            ) : null}
          </div>

          <label className="app-field">
            <span className="app-field-icon text-[#ff7a3d]">日</span>
            <span className="app-field-body">
              <span className="app-field-label">{t(lang, "dateLabel")}</span>
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="app-control" aria-label={t(lang, "dateLabel")} />
            </span>
            <span className="text-3xl leading-none">→</span>
          </label>

          <button type="submit" className="mt-1 rounded-[14px] bg-gradient-to-r from-[#16c6b7] to-[#0b73e8] px-8 py-4 text-xl font-black text-white shadow-[0_8px_18px_rgba(13,116,214,.2)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(13,116,214,.26)]">
            目的地信息检索
          </button>

          {unmatchedMessage ? (
            <p className="rounded-[14px] bg-[#fffaf2] px-4 py-3 text-sm font-black leading-6 text-[#9a6515]">
              {unmatchedMessage}
            </p>
          ) : null}

        </form>
      </section>

      <section className="mx-auto mt-6 w-[min(1180px,calc(100%-32px))] rounded-[16px] border border-[#d9e8f7] bg-white/95 p-5 shadow-[0_8px_20px_rgba(28,94,154,.07)]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="mr-2 text-lg font-black text-[#102a56]">{t(lang, "hotCitiesTitle")}</span>
          {cities.map((item) => (
            <button key={item.slug} type="button" onClick={() => chooseHotCity(item.slug)} className={`hot-city-button ${item.slug === activeDestination ? "hot-city-button-active" : ""}`}>
              <span>{item.emoji}</span>
              {item.cityNameZh}
            </button>
          ))}
          <button type="button" className="ml-auto inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-[#6f7f93] transition hover:bg-[#edf7ff] max-md:ml-0">
            {t(lang, "refreshBtn")}
          </button>
        </div>
      </section>

      <section className="mx-auto mt-7 w-[min(1180px,calc(100%-32px))]">
        <TravelCard city={city} departure={departure} date={date} flightPrice={flightPrice} flightPriceError={flightPriceError} isFlightPriceLoading={isFlightPriceLoading} exchangeRate={exchangeRate} exchangeRateError={exchangeRateError} weatherData={weatherData} weatherError={weatherError} lang={lang} checklistItems={getDestinationChecklist(activeDestination, departure.countryCode)} />
      </section>
    </div>
  );
}
