import { getPlugTypeMeta, type PlugType } from "@/data/plugTypeMeta";
import { getDestinationPowerInfo } from "@/lib/getDestinationPowerInfo";
import PlugTypeImage from "@/components/power/PlugTypeImage";
import { t } from "@/lib/i18n";

type DestinationPowerCardProps = {
  destinationCity: string;
  destinationCountryCode?: string;
  lang?: string;
};

function SocketIconCard({ type, lang }: { type: PlugType; lang?: string }) {
  const meta = getPlugTypeMeta(type);
  function pn(code, l) {
    var m = { A: {zh:"美标两扁脚",en:"Type A (2-pin)"}, B: {zh:"美标三孔",en:"Type B (3-pin)"}, C: {zh:"欧标两圆脚",en:"Type C (2-pin round)"}, F: {zh:"德标圆脚",en:"Type F (Schuko)"}, G: {zh:"英标三方脚",en:"Type G (British)"}, I: {zh:"国标斜扁脚",en:"Type I (Australian)"}, O: {zh:"泰标三圆脚",en:"Type O (Thai)"} };
    return m[code]?.[l] || m[code]?.zh || code;
  }
  function pd(code, l) {
    var m = { A: {zh:"两脚扁头",en:"Flat 2-pin"}, B: {zh:"两扁一圆三脚",en:"2-flat-1-round"}, C: {zh:"两脚圆头",en:"Round 2-pin"}, F: {zh:"欧标接地圆孔",en:"Round with ground"}, G: {zh:"英标大三脚",en:"Large 3-pin"}, I: {zh:"斜扁三脚",en:"Angled 3-pin"}, O: {zh:"泰标三圆脚",en:"Thai 3-round"} };
    return m[code]?.[l] || m[code]?.zh || code;
  }

  return (
    <div className="rounded-[16px] border border-[#d9e8f7] bg-white p-3 text-center shadow-sm">
      <div className="mx-auto grid size-20 place-items-center rounded-[14px] bg-[#f1f8ff]">
        <PlugTypeImage type={type} size={58} />
      </div>
      <p className="mt-2 text-sm font-black leading-5 text-[#102a56]">{pn(meta.code, lang)}</p>
      <p className="mt-1 text-xs font-black text-[#0b65df]">Type {meta.code}</p>
      <p className="mt-2 text-xs font-bold leading-5 text-[#66778d]">{pd(meta.code, lang)}</p>
    </div>
  );
}

function AdviceBlock({ title, children, tone = "blue" }: { title: string; children: string; tone?: "blue" | "orange" }) {
  return (
    <div className={`rounded-[16px] p-4 ring-1 ${tone === "orange" ? "bg-[#fff8eb] ring-[#ffdba8]" : "bg-white ring-[#d9e8f7]"}`}>
      <p className={`mb-2 text-sm font-black ${tone === "orange" ? "text-[#b26a12]" : "text-[#66778d]"}`}>{title}</p>
      <p className="whitespace-pre-line text-sm font-black leading-7 text-[#314663]">{children}</p>
    </div>
  );
}

function cleanAdapterText(text) {
  if (!text) return text;
  return text
    .replace(/：多数场景可直接插，通常不需要转接头。/g, "。")
    .replace(/：多数场景可直接插。/g, "。")
    .replace(/：通常不能直接插，建议带转换头。/g, "。")
    .replace(/通常不需要转接头。?/g, "")
    .replace(/：通常不能直接插。/g, "。")
    .replace(/：多数场景可直接插/g, "：")
    .trim();
}

function enAdapterText(code) {
  var m = {TH:"Flat 2-pin (phone, charger, camera) \u2192 Compatible with most Thai sockets\n\nRound 2-pin (shaver, small appliances) \u2192 Compatible with European round pin\n\nAngled 3-pin (laptop, kettle, power strip) \u2192 Thai sockets are 3-round-pin or 2-flat-1-round. Bring an adapter.",JP:"Bring a US flat 2-pin adapter.",SG:"Bring a Type G (British) adapter.",MY:"Bring a Type G (British) adapter.",KR:"Bring a European round pin adapter.",ID:"Bring a European round pin adapter."};
  return m[code] || "";
}

function enHighRiskText(code) {
  var m = {TH:"If your device was bought in 100-120V region and only supports 100-110V, DO NOT plug into 220V sockets.",JP:"Japan uses 100V. Check device supports 100-240V before plugging in."};
  return m[code] || "";
}

export default function DestinationPowerCard({ destinationCity, destinationCountryCode = "", lang = "zh" }: DestinationPowerCardProps) {
  const powerInfo = getDestinationPowerInfo({ destinationCity, destinationCountryCode });
  const { destination } = powerInfo;
  const displaySockets = destination.countryCode === "TH" ? (["A", "B", "O"] as PlugType[]) : powerInfo.sockets;

  return (
    <section className="web-info-card col-span-12">
      <div className="mb-4 flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-[#e8f4ff] text-xl">🔌</span>
        <div>
          <h3 className="text-xl font-black text-[#102a56]">{t(lang, "powerTitle")}</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 rounded-[18px] bg-[#f8fcff] p-4 max-md:grid-cols-1">
        <div>
          <p className="text-xs font-black text-[#66778d]">{t(lang, "powerCountry")}</p>
          <p className="mt-1 text-xl font-black text-[#102a56]">
            {lang === "en" ? destination.countryNameEn : destination.countryNameZh}{destinationCity ? " / " + destinationCity : ""}
          </p>
        </div>
        <div>
          <p className="text-xs font-black text-[#66778d]">{t(lang, "powerVoltage")}</p>
          <p className="mt-1 text-xl font-black text-[#102a56]">
            {lang === "en" ? powerInfo.voltageDisplay.replace(/\u7ea6 /, "") : powerInfo.voltageDisplay} / {powerInfo.frequencyDisplay}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-3 text-sm font-black text-[#66778d]">{t(lang, "powerSockets")}</p>
        {displaySockets.length ? (
          <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {displaySockets.map((type) => (
              <SocketIconCard key={type} type={type} lang={lang} />
            ))}
          </div>
        ) : (
          <p className="rounded-[16px] bg-[#fff8eb] p-4 text-sm font-black leading-7 text-[#a36a13]">{powerInfo.socketSummary}</p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 max-lg:grid-cols-1">
        <AdviceBlock title={t(lang, "powerAdapter")} tone="orange">{lang === "en" ? enAdapterText(destination.countryCode) : cleanAdapterText(powerInfo.adapterSuggestion)}</AdviceBlock>
        <AdviceBlock title={t(lang, "powerSafety")}>{lang === "en" ? (enHighRiskText(destination.countryCode) || powerInfo.highRiskDeviceWarning) : powerInfo.highRiskDeviceWarning}</AdviceBlock>
      </div>
    </section>
  );
}
