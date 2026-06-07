import { getPlugTypeMeta, type PlugType } from "@/data/plugTypeMeta";

type PlugTypeImageProps = {
  type: PlugType;
  variant?: "socket" | "plug";
  size?: number;
  className?: string;
};

export default function PlugTypeImage({ type, size = 52, className = "" }: PlugTypeImageProps) {
  const meta = getPlugTypeMeta(type);
  const src = meta.socketIcon;
  const alt = `${meta.chineseName}插座`;

  if (!src || !meta.hasIcon) {
    return (
      <span
        className={`grid place-items-center rounded-[14px] border border-dashed border-[#b8d5ef] bg-[#f8fcff] text-center text-xs font-black leading-5 text-[#66778d] ${className}`}
        style={{ width: size, height: size }}
        aria-label={alt}
      >
        特殊插座
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`block shrink-0 object-contain ${className}`}
      loading="lazy"
    />
  );
}
