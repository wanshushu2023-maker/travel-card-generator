import { getPlugTypeMeta } from "@/data/plugTypeMeta";
import { comparePowerCompatibility, type PlugCompatibilityResult } from "@/lib/comparePowerCompatibility";
import PlugTypeImage from "@/components/power/PlugTypeImage";

type SocketComparisonCardProps = {
  originCountryCode: string;
  destinationCountryCode: string;
};

const statusStyles: Record<PlugCompatibilityResult["status"], string> = {
  "usually-compatible": "bg-[#eaf8f5] text-[#0d8f89]",
  "adapter-recommended": "bg-[#fff2df] text-[#b26a12]",
  "voltage-attention": "bg-[#fff0f0] text-[#c64a3a]"
};

function PlugResultCard({ result }: { result: PlugCompatibilityResult }) {
  const meta = getPlugTypeMeta(result.plugType);

  return (
    <div className="rounded-[16px] border border-[#d9e8f7] bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="grid size-16 place-items-center rounded-[14px] bg-[#f1f8ff]">
          <PlugTypeImage type={result.plugType} variant="plug" size={48} />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-lg font-black text-[#102a56]">{result.userName}</h4>
            <span className="rounded-full bg-[#eef6ff] px-2 py-0.5 text-xs font-black text-[#0b65df]">Type {result.plugType}</span>
          </div>
          <p className="mt-1 text-xs font-bold leading-5 text-[#66778d]">{meta.chineseName}</p>
        </div>
      </div>
      <p className="mt-3 text-sm font-bold leading-6 text-[#314663]">{result.commonDevices}</p>
      <p className={`mt-3 rounded-[12px] px-3 py-2 text-center text-sm font-black ${statusStyles[result.status]}`}>{result.displayText}</p>
    </div>
  );
}

function DestinationSocket({ plugType, note }: { plugType: string; note?: string }) {
  const meta = getPlugTypeMeta(plugType as Parameters<typeof getPlugTypeMeta>[0]);

  return (
    <div className="rounded-[14px] border border-[#d9e8f7] bg-white p-3 text-center shadow-sm">
      <div className="mx-auto grid size-16 place-items-center rounded-[12px] bg-[#f1f8ff]">
        <PlugTypeImage type={meta.code} size={46} />
      </div>
      <p className="mt-2 text-sm font-black text-[#102a56]">{meta.userName}</p>
      <p className="mt-1 text-xs font-bold text-[#0b65df]">Type {meta.code}</p>
      {note && <p className="mt-2 text-xs font-bold leading-5 text-[#66778d]">{note}</p>}
    </div>
  );
}

export default function SocketComparisonCard({ originCountryCode, destinationCountryCode }: SocketComparisonCardProps) {
  const comparison = comparePowerCompatibility(originCountryCode, destinationCountryCode);
  const { origin, destination } = comparison;

  return (
    <section className="web-info-card col-span-8 max-lg:col-span-12">
      <div className="mb-4 flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-[#e8f4ff] text-xl">🔌</span>
        <div>
          <h3 className="text-xl font-black text-[#102a56]">插座标准与用电提醒</h3>
          <p className="mt-1 text-sm font-bold leading-6 text-[#66778d]">按“你从哪里出发”和“你要去哪里”判断，不只看国家名称。</p>
        </div>
      </div>

      {comparison.originAssumed && (
        <p className="mb-3 rounded-[14px] bg-[#fff8eb] p-3 text-sm font-black leading-6 text-[#a36a13]">
          出发地未识别，已按中国大陆插头习惯展示。
        </p>
      )}

      <div className="grid grid-cols-3 gap-3 rounded-[18px] bg-[#f8fcff] p-4 max-md:grid-cols-1">
        <div>
          <p className="text-xs font-black text-[#66778d]">出发地</p>
          <p className="mt-1 text-lg font-black text-[#102a56]">{origin.countryNameZh}</p>
        </div>
        <div>
          <p className="text-xs font-black text-[#66778d]">目的地</p>
          <p className="mt-1 text-lg font-black text-[#102a56]">{destination.countryNameZh}</p>
        </div>
        <div>
          <p className="text-xs font-black text-[#66778d]">电压对比</p>
          <p className="mt-1 text-sm font-black leading-6 text-[#314663]">
            {origin.countryNameZh}{origin.voltageFrequency.displayVoltage}；{destination.countryNameZh}{destination.voltageFrequency.displayVoltage}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 max-lg:grid-cols-1">
        {comparison.plugResults.map((result) => (
          <PlugResultCard key={result.plugType} result={result} />
        ))}
      </div>

      <div className="mt-4 rounded-[18px] border border-[#d9e8f7] bg-[#f8fcff] p-4">
        <div className="mb-3">
          <p className="text-sm font-black text-[#66778d]">常见插座</p>
          <p className="mt-1 text-sm font-bold leading-6 text-[#314663]">{destination.hotelReality}</p>
        </div>
        <div className="grid grid-cols-5 gap-3 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {destination.commonTravelerSockets.map((socket) => (
            <DestinationSocket key={socket.plugType} plugType={socket.plugType} note={socket.note} />
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        <div className="rounded-[16px] bg-[#fff8eb] p-4 ring-1 ring-[#ffdba8]">
          <p className="mb-2 text-sm font-black text-[#b26a12]">旅行建议</p>
          <p className="text-sm font-black leading-7 text-[#314663]">{comparison.overallAdvice}</p>
          <p className="mt-2 text-sm font-black leading-7 text-[#314663]">{comparison.adapterSuggestion}</p>
          <p className="mt-2 text-sm font-black leading-7 text-[#314663]">{comparison.voltageReminder}</p>
        </div>
        <p className="rounded-[14px] bg-[#f6fbff] p-3 text-xs font-bold leading-5 text-[#7c8da3]">
          {comparison.sourceNote}
        </p>
      </div>
    </section>
  );
}
