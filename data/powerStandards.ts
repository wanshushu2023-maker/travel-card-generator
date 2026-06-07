import type { PlugType } from "@/data/plugTypeMeta";

export type VoltageLevel = "100-120V" | "220-240V";

export type TravelerPlug = {
  plugType: PlugType;
  userName: string;
  commonDevices: string;
};

export type TravelerSocket = {
  plugType: PlugType;
  note?: string;
};

export type ChinaTravelerCompatibility = {
  typeA: string;
  typeC: string;
  typeI: string;
  summaryForChineseTraveler: string;
};

export type VoltageFrequency = {
  voltage: string;
  frequency: string;
  displayVoltage: string;
  voltageLevel: VoltageLevel;
};

export type PowerStandard = {
  countryCode: string;
  countryNameZh: string;
  countryNameEn: string;
  officialStandard: string;
  commonTravelerPlugsFromThisCountry?: TravelerPlug[];
  commonTravelerSockets: TravelerSocket[];
  voltageFrequency: VoltageFrequency;
  hotelReality: string;
  chinaTravelerCompatibility?: ChinaTravelerCompatibility;
  travelerSummary: string;
  destinationNote?: string;
  sourceNotes: string;
};

const chinaTravelerPlugs: TravelerPlug[] = [
  {
    plugType: "A",
    userName: "两脚扁头",
    commonDevices: "手机充电器、充电宝、相机充电器"
  },
  {
    plugType: "C",
    userName: "两脚圆头",
    commonDevices: "剃须刀、小电器、欧规充电器"
  },
  {
    plugType: "I",
    userName: "三脚斜扁头",
    commonDevices: "笔记本电源线、排插、电热水壶"
  }
];

export const powerStandards: Record<string, PowerStandard> = {
  CN: {
    countryCode: "CN",
    countryNameZh: "中国大陆",
    countryNameEn: "China Mainland",
    officialStandard: "Type A / Type I，部分资料和旅行场景仍会看到 Type C 或兼容圆孔",
    commonTravelerPlugsFromThisCountry: chinaTravelerPlugs,
    commonTravelerSockets: [
      { plugType: "A", note: "两脚扁头，手机充电器、充电宝、相机充电器常见" },
      { plugType: "C", note: "两脚圆头，部分小电器或欧规充电器常见" },
      { plugType: "I", note: "三脚斜扁头，笔记本电脑电源线、电热水壶、排插常见" }
    ],
    voltageFrequency: {
      voltage: "约 220V",
      frequency: "50Hz",
      displayVoltage: "约 220V / 50Hz",
      voltageLevel: "220-240V"
    },
    hotelReality: "中国大陆酒店和住宅常见国标插座，也可能有兼容两扁脚或两圆脚的插孔。",
    travelerSummary: "中国大陆用户常见两脚扁头、两脚圆头和三脚斜扁头。出境时不要只看国家代码，要按自己携带设备的插头形态判断。",
    sourceNotes: "插座信息为旅行参考，可能因酒店、公寓、机场、老旧建筑不同而变化，请以现场插座和设备铭牌为准。"
  },
  TH: {
    countryCode: "TH",
    countryNameZh: "泰国",
    countryNameEn: "Thailand",
    officialStandard: "Type O，泰国官方新标准；部分资料也会把 Type C 作为官方/常见圆孔体系",
    commonTravelerSockets: [
      { plugType: "A", note: "美标两扁脚，泰国很多混合插座可兼容" },
      { plugType: "B", note: "美标三孔，部分泰国三孔或混合插座可见" },
      { plugType: "C", note: "欧标两圆脚，泰国常见" },
      { plugType: "F", note: "德标圆脚，部分旅行资料列为可见或兼容场景" },
      { plugType: "O", note: "泰标三圆脚，泰国官方新标准" }
    ],
    voltageFrequency: {
      voltage: "220-230V",
      frequency: "50Hz",
      displayVoltage: "约 220-230V / 50Hz",
      voltageLevel: "220-240V"
    },
    hotelReality: "泰国酒店、公寓、机场、民宿插座形态比较混杂，常见混合插座。不要默认所有插座都一样。",
    chinaTravelerCompatibility: {
      typeA: "通常可直接插",
      typeC: "通常可直接插",
      typeI: "通常不能直接插，建议携带转换头",
      summaryForChineseTraveler: "中国两脚扁头和两脚圆头在泰国多数旅行场景通常可用；中国三脚斜扁头不等于泰国三孔，笔记本电脑电源线、排插、电热水壶建议携带转换头。"
    },
    travelerSummary: "泰国常见欧标两圆脚、泰标三圆脚和混合插座，中国游客建议按自己设备插头形态判断。",
    sourceNotes: "插座信息为旅行参考，可能因酒店、公寓、机场、老旧建筑不同而变化，请以现场插座和设备铭牌为准。"
  },
  JP: {
    countryCode: "JP",
    countryNameZh: "日本",
    countryNameEn: "Japan",
    officialStandard: "Type A / Type B",
    commonTravelerPlugsFromThisCountry: [
      { plugType: "A", userName: "两脚扁头", commonDevices: "手机充电器、相机充电器、小功率电器" },
      { plugType: "B", userName: "两扁一圆三脚", commonDevices: "部分美规或日规接地设备" }
    ],
    commonTravelerSockets: [
      { plugType: "A", note: "美标两扁脚，日本最常见" },
      { plugType: "B", note: "美标三孔，部分场所可见" }
    ],
    voltageFrequency: {
      voltage: "100V",
      frequency: "50Hz / 60Hz",
      displayVoltage: "100V / 50Hz 或 60Hz",
      voltageLevel: "100-120V"
    },
    hotelReality: "东京等东日本多为 50Hz，大阪等西日本多为 60Hz。大多数旅行者主要关注 100V 电压差异和两扁脚插头。",
    chinaTravelerCompatibility: {
      typeA: "通常可直接插，但要注意电压",
      typeC: "通常不能直接插，建议转换头",
      typeI: "通常不能直接插，建议转换头",
      summaryForChineseTraveler: "中国两脚扁头 Type A 在日本通常能插，但日本是 100V；中国两脚圆头和三脚斜扁头通常需要转换头。手机、电脑充电器请查看是否支持 100-240V；吹风机、卷发棒等大功率电器谨慎使用。"
    },
    travelerSummary: "日本插座以两脚扁头为主，重点关注 100V 电压和大功率电器。",
    sourceNotes: "插座信息为旅行参考，可能因酒店、公寓、机场、老旧建筑不同而变化，请以现场插座和设备铭牌为准。"
  },
  SG: {
    countryCode: "SG",
    countryNameZh: "新加坡",
    countryNameEn: "Singapore",
    officialStandard: "Type G",
    commonTravelerSockets: [{ plugType: "G", note: "英标三方脚" }],
    voltageFrequency: {
      voltage: "230V",
      frequency: "50Hz",
      displayVoltage: "230V / 50Hz",
      voltageLevel: "220-240V"
    },
    hotelReality: "新加坡主要使用英标三方脚，部分酒店可能有 USB 或万能插座，但不要默认。",
    chinaTravelerCompatibility: {
      typeA: "通常不能直接插，建议 Type G 转换头",
      typeC: "通常不能直接插，建议 Type G 转换头",
      typeI: "通常不能直接插，建议 Type G 转换头",
      summaryForChineseTraveler: "中国大陆常见两脚扁头、两脚圆头、三脚斜扁头通常都不能直接插入新加坡英标三方脚插座，建议携带英标 Type G 转换头。"
    },
    travelerSummary: "新加坡主要使用英标三方脚，中国大陆普通插头通常需要转换头。",
    sourceNotes: "插座信息为旅行参考，可能因酒店、公寓、机场、老旧建筑不同而变化，请以现场插座和设备铭牌为准。"
  },
  MY: {
    countryCode: "MY",
    countryNameZh: "马来西亚",
    countryNameEn: "Malaysia",
    officialStandard: "Type G",
    commonTravelerSockets: [{ plugType: "G", note: "英标三方脚" }],
    voltageFrequency: {
      voltage: "230-240V",
      frequency: "50Hz",
      displayVoltage: "约 230-240V / 50Hz",
      voltageLevel: "220-240V"
    },
    hotelReality: "马来西亚主要使用英标三方脚。部分酒店可能有万能插座，但不要默认。",
    chinaTravelerCompatibility: {
      typeA: "通常不能直接插，建议 Type G 转换头",
      typeC: "通常不能直接插，建议 Type G 转换头",
      typeI: "通常不能直接插，建议 Type G 转换头",
      summaryForChineseTraveler: "中国大陆常见插头通常不能直接插入马来西亚英标三方脚插座，建议携带英标 Type G 转换头。"
    },
    travelerSummary: "马来西亚主要使用英标三方脚，中国大陆普通插头通常需要转换头。",
    sourceNotes: "插座信息为旅行参考，可能因酒店、公寓、机场、老旧建筑不同而变化，请以现场插座和设备铭牌为准。"
  },
  ID: {
    countryCode: "ID",
    countryNameZh: "印度尼西亚",
    countryNameEn: "Indonesia",
    destinationNote: "巴厘岛属于印度尼西亚",
    officialStandard: "Type C / Type F",
    commonTravelerSockets: [
      { plugType: "C", note: "欧标两圆脚" },
      { plugType: "F", note: "德标圆脚" }
    ],
    voltageFrequency: {
      voltage: "230V",
      frequency: "50Hz",
      displayVoltage: "230V / 50Hz",
      voltageLevel: "220-240V"
    },
    hotelReality: "巴厘岛酒店、民宿、公寓常见欧标圆孔体系，部分场所可能配万能插座。",
    chinaTravelerCompatibility: {
      typeA: "通常不能直接插，建议转换头",
      typeC: "通常可直接插",
      typeI: "通常不能直接插，建议转换头",
      summaryForChineseTraveler: "去巴厘岛时，中国两脚圆头 Type C 通常较容易兼容；中国两脚扁头和三脚斜扁头通常需要转换头。建议携带欧标或万能转换头。"
    },
    travelerSummary: "巴厘岛常见欧标圆孔体系，中国三脚斜扁头通常需要转换头。",
    sourceNotes: "插座信息为旅行参考，可能因酒店、公寓、机场、老旧建筑不同而变化，请以现场插座和设备铭牌为准。"
  },
  VN: {
    countryCode: "VN",
    countryNameZh: "越南",
    countryNameEn: "Vietnam",
    officialStandard: "多种插座并存，旅行场景常见 Type A / Type C / Type F",
    commonTravelerSockets: [
      { plugType: "A", note: "美标两扁脚" },
      { plugType: "C", note: "欧标两圆脚" },
      { plugType: "F", note: "德标圆脚，部分场景可见" }
    ],
    voltageFrequency: {
      voltage: "220-230V",
      frequency: "50Hz",
      displayVoltage: "约 220-230V / 50Hz",
      voltageLevel: "220-240V"
    },
    hotelReality: "越南酒店、民宿、老建筑插座差异较大，常见 A/C 混合或圆孔体系。",
    chinaTravelerCompatibility: {
      typeA: "通常可直接插",
      typeC: "通常可直接插",
      typeI: "通常不能直接插，建议转换头",
      summaryForChineseTraveler: "中国两脚扁头和两脚圆头在越南多数旅行场景通常可用；中国三脚斜扁头通常需要转换头，建议携带万能转换插头。"
    },
    travelerSummary: "越南插座形态比较混杂，建议携带万能转换插头。",
    sourceNotes: "插座信息为旅行参考，可能因酒店、公寓、机场、老旧建筑不同而变化，请以现场插座和设备铭牌为准。"
  }
};

export function getPowerStandard(countryCode: string) {
  return powerStandards[countryCode] ?? powerStandards.CN;
}

export function getChinaTravelerPlugs() {
  return chinaTravelerPlugs;
}
