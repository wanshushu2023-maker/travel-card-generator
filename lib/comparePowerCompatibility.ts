import { getPlugTypeMeta, type PlugType } from "@/data/plugTypeMeta";
import { getChinaTravelerPlugs, getPowerStandard, type PowerStandard, type TravelerPlug } from "@/data/powerStandards";

export type PlugCompatibilityStatus = "usually-compatible" | "adapter-recommended" | "voltage-attention";

export type PlugCompatibilityResult = {
  plugType: PlugType;
  userName: string;
  commonDevices: string;
  status: PlugCompatibilityStatus;
  displayText: string;
};

export type PowerCompatibilityComparison = {
  origin: PowerStandard;
  destination: PowerStandard;
  originAssumed: boolean;
  voltageWarning: string;
  frequencyWarning: string;
  plugResults: PlugCompatibilityResult[];
  overallAdvice: string;
  adapterSuggestion: string;
  voltageReminder: string;
  sourceNote: string;
};

const chinaRules: Record<string, Partial<Record<PlugType, { status: PlugCompatibilityStatus; displayText: string }>>> = {
  CN: {
    A: { status: "usually-compatible", displayText: "国内出行通常不需要转换头" },
    C: { status: "usually-compatible", displayText: "国内部分插座可能兼容" },
    I: { status: "usually-compatible", displayText: "国内常见，通常可用" },
    B: { status: "adapter-recommended", displayText: "请按现场插座判断" },
    F: { status: "adapter-recommended", displayText: "请按现场插座判断" },
    G: { status: "adapter-recommended", displayText: "请按现场插座判断" },
    O: { status: "adapter-recommended", displayText: "请按现场插座判断" }
  },
  TH: {
    A: { status: "usually-compatible", displayText: "通常可用" },
    C: { status: "usually-compatible", displayText: "通常可用" },
    I: { status: "adapter-recommended", displayText: "建议转换头" },
    B: { status: "usually-compatible", displayText: "部分场景可用" },
    F: { status: "adapter-recommended", displayText: "建议按现场插座判断" },
    G: { status: "adapter-recommended", displayText: "建议转换头" },
    O: { status: "adapter-recommended", displayText: "建议转换头" }
  },
  JP: {
    A: { status: "voltage-attention", displayText: "通常可插，但注意 100V 电压" },
    C: { status: "adapter-recommended", displayText: "建议转换头" },
    I: { status: "adapter-recommended", displayText: "建议转换头" },
    B: { status: "voltage-attention", displayText: "部分场景可插，但注意 100V 电压" },
    F: { status: "adapter-recommended", displayText: "建议转换头" },
    G: { status: "adapter-recommended", displayText: "建议转换头" },
    O: { status: "adapter-recommended", displayText: "建议转换头" }
  },
  SG: {
    A: { status: "adapter-recommended", displayText: "建议 Type G 转换头" },
    C: { status: "adapter-recommended", displayText: "建议 Type G 转换头" },
    I: { status: "adapter-recommended", displayText: "建议 Type G 转换头" },
    B: { status: "adapter-recommended", displayText: "建议 Type G 转换头" },
    F: { status: "adapter-recommended", displayText: "建议 Type G 转换头" },
    G: { status: "usually-compatible", displayText: "英标插头通常可用" },
    O: { status: "adapter-recommended", displayText: "建议 Type G 转换头" }
  },
  MY: {
    A: { status: "adapter-recommended", displayText: "建议 Type G 转换头" },
    C: { status: "adapter-recommended", displayText: "建议 Type G 转换头" },
    I: { status: "adapter-recommended", displayText: "建议 Type G 转换头" },
    B: { status: "adapter-recommended", displayText: "建议 Type G 转换头" },
    F: { status: "adapter-recommended", displayText: "建议 Type G 转换头" },
    G: { status: "usually-compatible", displayText: "英标插头通常可用" },
    O: { status: "adapter-recommended", displayText: "建议 Type G 转换头" }
  },
  ID: {
    A: { status: "adapter-recommended", displayText: "建议转换头" },
    C: { status: "usually-compatible", displayText: "通常可用" },
    I: { status: "adapter-recommended", displayText: "建议转换头" },
    B: { status: "adapter-recommended", displayText: "建议转换头" },
    F: { status: "usually-compatible", displayText: "通常可用" },
    G: { status: "adapter-recommended", displayText: "建议转换头" },
    O: { status: "adapter-recommended", displayText: "建议转换头" }
  },
  VN: {
    A: { status: "usually-compatible", displayText: "通常可用" },
    C: { status: "usually-compatible", displayText: "通常可用" },
    I: { status: "adapter-recommended", displayText: "建议转换头" },
    B: { status: "adapter-recommended", displayText: "建议按现场插座判断" },
    F: { status: "usually-compatible", displayText: "部分场景可用" },
    G: { status: "adapter-recommended", displayText: "建议转换头" },
    O: { status: "adapter-recommended", displayText: "建议转换头" }
  }
};

const chinaAdvice: Record<string, Pick<PowerCompatibilityComparison, "adapterSuggestion" | "voltageReminder">> = {
  CN: {
    adapterSuggestion: "国内出行通常不需要转换头，但酒店、老旧插座或大功率设备仍需注意插座形态和功率。",
    voltageReminder: "国内电压频率通常一致，但仍需查看设备功率和插座额定值。"
  },
  TH: {
    adapterSuggestion: "建议携带万能转换插头，尤其带笔记本、排插、电热水壶时。",
    voltageReminder: "两地电压频率接近，但仍需查看设备铭牌。"
  },
  JP: {
    adapterSuggestion: "建议携带美标两扁脚转换头。",
    voltageReminder: "日本 100V，与中国大陆不同，大功率电器谨慎使用。"
  },
  SG: {
    adapterSuggestion: "建议携带英标 Type G 转换头。",
    voltageReminder: "电压频率接近，重点是插头形态不兼容。"
  },
  MY: {
    adapterSuggestion: "建议携带英标 Type G 转换头。",
    voltageReminder: "电压频率接近，重点是插头形态不兼容。"
  },
  ID: {
    adapterSuggestion: "去巴厘岛建议携带欧标或万能转换头。",
    voltageReminder: "电压频率接近，但仍需查看设备铭牌。"
  },
  VN: {
    adapterSuggestion: "建议携带万能转换插头，尤其带笔记本、排插、大功率电器时。",
    voltageReminder: "电压频率接近，但仍需查看设备铭牌。"
  }
};

function getTravelerPlugs(origin: PowerStandard): TravelerPlug[] {
  return origin.commonTravelerPlugsFromThisCountry?.length ? origin.commonTravelerPlugsFromThisCountry : origin.commonTravelerSockets.map((socket) => {
    const meta = getPlugTypeMeta(socket.plugType);
    return {
      plugType: socket.plugType,
      userName: meta.userName,
      commonDevices: `${meta.shape}；${meta.description}`
    };
  });
}

function getGenericPlugResult(plug: TravelerPlug, destination: PowerStandard): PlugCompatibilityResult {
  const destinationTypes = destination.commonTravelerSockets.map((socket) => socket.plugType);
  const compatible = destinationTypes.includes(plug.plugType);
  return {
    plugType: plug.plugType,
    userName: plug.userName,
    commonDevices: plug.commonDevices,
    status: compatible ? "usually-compatible" : "adapter-recommended",
    displayText: compatible ? "通常可用，但建议备用转换头" : "建议转换头"
  };
}

export function comparePowerCompatibility(originCountryCode: string, destinationCountryCode: string): PowerCompatibilityComparison {
  const originAssumed = !originCountryCode;
  const origin = getPowerStandard(originCountryCode || "CN");
  const destination = getPowerStandard(destinationCountryCode || "CN");
  const travelerPlugs = origin.countryCode === "CN" ? getChinaTravelerPlugs() : getTravelerPlugs(origin);
  const rules = origin.countryCode === "CN" ? chinaRules[destination.countryCode] : undefined;
  const plugResults = travelerPlugs.map((plug) => {
    const rule = rules?.[plug.plugType];
    if (!rule) return getGenericPlugResult(plug, destination);
    return {
      plugType: plug.plugType,
      userName: plug.userName,
      commonDevices: plug.commonDevices,
      status: rule.status,
      displayText: rule.displayText
    };
  });

  const advice = origin.countryCode === "CN" ? chinaAdvice[destination.countryCode] : undefined;
  const voltageWarning = origin.voltageFrequency.voltageLevel !== destination.voltageFrequency.voltageLevel
    ? `${destination.countryNameZh}电压等级与${origin.countryNameZh}不同，请重点查看设备铭牌。`
    : "两地电压等级通常接近。";
  const frequencyWarning = origin.voltageFrequency.frequency === destination.voltageFrequency.frequency
    ? "频率通常接近。"
    : "频率可能不同，请留意电机类或大功率设备。";
  const hasAdapterRecommended = plugResults.some((result) => result.status !== "usually-compatible");

  return {
    origin,
    destination,
    originAssumed,
    voltageWarning,
    frequencyWarning,
    plugResults,
    overallAdvice: origin.countryCode === "CN" && destination.chinaTravelerCompatibility
      ? destination.chinaTravelerCompatibility.summaryForChineseTraveler
      : hasAdapterRecommended
        ? "当前出发地插头数据不足或与目的地不完全匹配，建议携带万能转换插头，并查看设备铭牌。"
        : "常见插头存在兼容可能，但酒店、公寓、机场、老旧建筑插座可能不同，建议备用万能转换插头。",
    adapterSuggestion: advice?.adapterSuggestion || (hasAdapterRecommended ? "建议携带万能转换插头。" : "建议备用万能转换插头。"),
    voltageReminder: advice?.voltageReminder || (destination.voltageFrequency.voltageLevel === "100-120V" ? "目的地电压较低，大功率电器谨慎使用。" : "电压频率请以设备铭牌为准。"),
    sourceNote: destination.sourceNotes
  };
}
