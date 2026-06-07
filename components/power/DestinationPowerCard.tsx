import { getPlugTypeMeta, type PlugType } from "@/data/plugTypeMeta";
import { getDestinationPowerInfo } from "@/lib/getDestinationPowerInfo";
import PlugTypeImage from "@/components/power/PlugTypeImage";

type DestinationPowerCardProps = {
  destinationCity: string;
  destinationCountryCode?: string;
};

function SocketIconCard({ type }: { type: PlugType }) {
  const meta = getPlugTypeMeta(type);

  return (
    <div className="rounded-[16px] border border-[#d9e8f7] bg-white p-3 text-center shadow-sm">
      <div className="mx-auto grid size-20 place-items-center rounded-[14px] bg-[#f1f8ff]">
        <PlugTypeImage type={type} size={58} />
      </div>
      <p className="mt-2 text-sm font-black leading-5 text-[#102a56]">{meta.chineseName}</p>
      <p className="mt-1 text-xs font-black text-[#0b65df]">Type {meta.code}</p>
      <p className="mt-2 text-xs font-bold leading-5 text-[#66778d]">{meta.userName}</p>
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

export default function DestinationPowerCard({ destinationCity, destinationCountryCode = "" }: DestinationPowerCardProps) {
  const powerInfo = getDestinationPowerInfo({ destinationCity, destinationCountryCode });
  const { destination } = powerInfo;
  const displaySockets = destination.countryCode === "TH" ? (["A", "B", "O"] as PlugType[]) : powerInfo.sockets;

  return (
    <section className="web-info-card col-span-8 max-lg:col-span-12">
      <div className="mb-4 flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-[#e8f4ff] text-xl">🔌</span>
        <div>
          <h3 className="text-xl font-black text-[#102a56]">插座与电压提醒</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 rounded-[18px] bg-[#f8fcff] p-4 max-md:grid-cols-1">
        <div>
          <p className="text-xs font-black text-[#66778d]">国家/地区</p>
          <p className="mt-1 text-xl font-black text-[#102a56]">
            {destination.countryNameZh}{destinationCity ? ` / ${destinationCity}` : ""}
          </p>
        </div>
        <div>
          <p className="text-xs font-black text-[#66778d]">电压频率</p>
          <p className="mt-1 text-xl font-black text-[#102a56]">
            {powerInfo.voltageDisplay} / {powerInfo.frequencyDisplay}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-3 text-sm font-black text-[#66778d]">常见插座</p>
        {displaySockets.length ? (
          <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {displaySockets.map((type) => (
              <SocketIconCard key={type} type={type} />
            ))}
          </div>
        ) : (
          <p className="rounded-[16px] bg-[#fff8eb] p-4 text-sm font-black leading-7 text-[#a36a13]">{powerInfo.socketSummary}</p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 max-lg:grid-cols-1">
        <AdviceBlock title="转换头建议" tone="orange">{powerInfo.adapterSuggestion}</AdviceBlock>
        <AdviceBlock title="电压与用电安全">{powerInfo.highRiskDeviceWarning}</AdviceBlock>
      </div>
    </section>
  );
}
