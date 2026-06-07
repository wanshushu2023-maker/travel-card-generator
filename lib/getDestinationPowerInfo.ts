import { getCountryCodeByCity } from "@/data/cityCountryMap";
import { getDestinationPowerStandard } from "@/data/destinationPowerStandards";

type DestinationPowerInfoParams = {
  destinationCity?: string;
  destinationCountryCode?: string;
};

export function getDestinationPowerInfo({ destinationCity = "", destinationCountryCode = "" }: DestinationPowerInfoParams) {
  const countryCode = destinationCountryCode || getCountryCodeByCity(destinationCity);
  const destination = getDestinationPowerStandard(countryCode);

  if (!destination) {
    return {
      destination: {
        countryCode: countryCode || "UNKNOWN",
        countryNameZh: "暂未收录",
        countryNameEn: "Unknown",
        destinationNameExamples: destinationCity ? [destinationCity] : [],
        sockets: [],
        socketSummary: "暂未收录该目的地插座数据，请携带万能转换头，并查看设备铭牌。",
        realWorldNote: "不同酒店、公寓、机场、老旧建筑可能不同。",
        voltageDisplay: "未知",
        frequencyDisplay: "未知",
        voltageSafetyLevel: "unknown" as const,
        adapterSuggestion: "建议携带万能转换头。",
        transformerAdvice: "请查看设备铭牌，确认电压输入范围。",
        highRiskDeviceWarning: "吹风机、直发夹、卷发棒、电热水壶等大功率电器请谨慎使用。",
        safetyNote: "转换头只改变插头形状，不改变电压。",
        sourceNote: "暂未收录该目的地插座数据。"
      },
      sockets: [],
      socketSummary: "暂未收录该目的地插座数据，请携带万能转换头，并查看设备铭牌。",
      officialStandardText: "",
      realWorldNote: "不同酒店、公寓、机场、老旧建筑可能不同。",
      voltageDisplay: "未知",
      frequencyDisplay: "未知",
      adapterSuggestion: "建议携带万能转换头。",
      transformerAdvice: "请查看设备铭牌，确认电压输入范围。",
      highRiskDeviceWarning: "吹风机、直发夹、卷发棒、电热水壶等大功率电器请谨慎使用。",
      safetyNote: "转换头只改变插头形状，不改变电压。",
      sourceNote: "暂未收录该目的地插座数据。"
    };
  }

  return {
    destination,
    sockets: destination.sockets,
    socketSummary: destination.socketSummary,
    officialStandardText: destination.officialStandardText || "",
    realWorldNote: destination.realWorldNote,
    voltageDisplay: destination.voltageDisplay,
    frequencyDisplay: destination.frequencyDisplay,
    adapterSuggestion: destination.adapterSuggestion,
    transformerAdvice: destination.transformerAdvice,
    highRiskDeviceWarning: destination.highRiskDeviceWarning,
    safetyNote: destination.safetyNote,
    sourceNote: destination.sourceNote
  };
}
