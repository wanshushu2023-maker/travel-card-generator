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
};

function formatCurrency(value: number, currency: string) {
  if (currency === "CNY") return `¥${Number(value).toLocaleString("zh-CN")}`;
  return `${currency} ${Number(value).toLocaleString("zh-CN")}`;
}

export default function FlightPriceReference({ departureCityName, destinationCityName, flightPrice, flightPriceError, isLoading }: FlightPriceReferenceProps) {
  return (
    <div className="grid gap-3">
      {isLoading ? (
        <div className="rounded-[14px] bg-[#f6fbff] p-4 text-sm font-black text-[#66778d]">正在查询机票参考价...</div>
      ) : flightPrice ? (
        <>
          <div className="rounded-[14px] bg-[#f6fbff] p-3 text-sm font-black leading-6 text-[#314663]">
            <p>
              {departureCityName} {flightPrice.origin} → {destinationCityName} {flightPrice.destination}
            </p>
            <p>出发日期：{flightPrice.departureDate}</p>
          </div>
          <p className="text-2xl font-black text-[#102a56]">
            单程参考价：<span className="text-[#10a7b6]">{formatCurrency(flightPrice.minPrice, flightPrice.currency)}–{formatCurrency(flightPrice.maxPrice, flightPrice.currency)}</span>
          </p>
          <p className="font-bold leading-7 text-[#66778d]">
            已检索 {flightPrice.offerCount} 条报价 · 数据源 {flightPrice.provider}
          </p>
          <p className="font-bold leading-7 text-[#66778d]">更新时间：{flightPrice.updatedAt}</p>
          {flightPrice.isTestData ? <p className="rounded-[14px] bg-[#fffaf2] p-3 text-xs font-black leading-5 text-[#a36a13]">测试环境数据仅供开发验证</p> : null}
          <p className="rounded-[14px] bg-[#f6fbff] p-3 text-sm font-bold leading-6 text-[#314663]">
            价格实时浮动，通常可能包含票价、税费、航司附加费、燃油/国际附加费、民航发展基金、机场/旅客服务费等；行李、选座、退改签和平台服务费可能另计，最终以出票页为准。
          </p>
        </>
      ) : (
        <p className="rounded-[14px] bg-[#fffaf2] p-4 text-sm font-black leading-6 text-[#a36a13]">
          {flightPriceError || "点击生成信息后获取机票价格参考"}
        </p>
      )}
    </div>
  );
}
