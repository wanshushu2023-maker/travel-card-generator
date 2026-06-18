type FlightPrice = {
  origin: string;
  destination: string;
  departureDate: string;
  currency: string;
  minPrice: number;
  maxPrice: number;
  offerCount: number;
  updatedAt: string;
  provider: string;
  notice: string;
  isTestData?: boolean;
};

type FlightPriceReferenceProps = {
  departureCityName: string;
  destinationCityName: string;
  flightPrice: FlightPrice | null;
  flightPriceError?: string;
  isLoading?: boolean;
  lang?: string;
};

function formatCurrency(value: number, currency: string) {
  if (currency === "CNY") return `¥${Number(value).toLocaleString("zh-CN")}`;
  return `${currency} ${Number(value).toLocaleString("zh-CN")}`;
}

export default function FlightPriceReference({ departureCityName, destinationCityName, flightPrice, flightPriceError, isLoading, lang = "zh" }: FlightPriceReferenceProps) {
  return (
    <div className="grid gap-3">
      {isLoading ? (
        <div className="rounded-[12px] bg-[#f6fbff] px-4 py-3 text-sm font-black text-[#66778d]">{(lang === "en") ? "Loading prices..." : "正在查询机票参考价..."}</div>
      ) : flightPrice ? (
        <>
          <div className="rounded-[12px] bg-[#f6fbff] px-4 py-3">
            <p className="text-sm font-bold text-[#66778d]">{departureCityName} {flightPrice.origin} → {destinationCityName} {flightPrice.destination}</p>
            <p className="mt-1 text-xs font-black text-[#66778d]">{flightPrice.departureDate}</p>
          </div>
          <p className="text-3xl font-black text-[#102a56]">
            <span className="text-[#10a7b6]">{formatCurrency(flightPrice.minPrice, flightPrice.currency)}–{formatCurrency(flightPrice.maxPrice, flightPrice.currency)}</span>
            <span className="ml-2 text-base font-black text-[#66778d]">{(lang === "en") ? "one-way ref. price" : "单程参考价"}</span>
          </p>

        </>
      ) : (
        <p className="rounded-[12px] bg-[#fffaf2] px-4 py-3 text-sm font-black text-[#a36a13]">
          {(lang === "en" && !flightPriceError) ? "Generate info to see prices" : (flightPriceError || "点击生成信息后获取机票价格参考")}
        </p>
      )}
    </div>
  );
}
