import { getPlugTypeMeta, type PlugType } from "@/data/plugTypeMeta";
import PlugTypeImage from "@/components/power/PlugTypeImage";

type PlugTypeCardProps = {
  type: PlugType;
  variant?: "socket" | "plug";
  compact?: boolean;
};

export default function PlugTypeCard({ type, variant = "socket", compact = false }: PlugTypeCardProps) {
  const meta = getPlugTypeMeta(type);

  return (
    <div className={`rounded-[14px] border border-[#d9e8f7] bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(28,94,154,.12)] ${compact ? "min-w-[108px]" : ""}`}>
      <div className="flex items-center gap-3">
        <span className="grid size-14 place-items-center rounded-[12px] bg-[#f1f8ff]">
          <PlugTypeImage type={type} variant={variant} size={42} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-black leading-5 text-[#102a56]">{meta.chineseName}</p>
          <p className="mt-1 text-xs font-black text-[#0b65df]">Type {meta.code}</p>
        </div>
      </div>
      {!compact && <p className="mt-2 text-xs font-bold leading-5 text-[#66778d]">{meta.description}</p>}
    </div>
  );
}
