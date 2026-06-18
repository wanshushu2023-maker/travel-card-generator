import generatedTravelContent from "@/data/generated/travel-content.json";

export type City = {
  slug: string;
  country: string;
  countryCode: string;
  countryNameZh: string;
  city: string;
  cityNameZh: string;
  cityNameEn: string;
  airportCode: string;
  locationText: string;
  timezone: string;
  flyCities: string[];
  airports: string[];
  visaOptions: string[];
  visaRequirement?: string;
  visaProcessingTime?: string;
  visaStayDuration?: string;
  flightPriceRanges: Record<string, string>;
  feeNotes: string[];
  flightSearchUrl: string;
  hotelSearchUrl: string;
  transportWays: string[];
  entryTips: string[];
  tdacUrl: string;
  currency: string;
  exchangeRate: string;
  paymentMethods: string[];
  weather: string;
  temperature: string;
  temperatureRange: string;
  clothingTip: string;
  language: string[];
  languagePhrases?: string[];
  translationApps?: string[];
  plug: string;
  voltage: string;
  departureChecklist: string[];
  visaStatus: Record<string, VisaStatus>;
  subtitle: string;
  emoji: string;
  accent: string;
};

export type VisaStatus = {
  type: "visa-free" | "visa-required" | "visa-on-arrival" | "eta";
  days?: number;
  note?: string;
  processingTime?: string;
  fee?: string;
  documents?: string[];
};

export type DeparturePlace = {
  slug: string;
  label: string;
  nameZh: string;
  nameEn: string;
  defaultCityZh: string;
  defaultCityEn: string;
  airportCode: string;
  countryCode: string;
  timezone: string;
  timezoneAliases: string[];
};

export const departurePlaces: DeparturePlace[] = [
  {
    slug: "china-chongqing",
    label: "中国 · 重庆 Chongqing (CKG)",
    nameZh: "重庆",
    nameEn: "Mainland China",
    defaultCityZh: "重庆",
    defaultCityEn: "Chongqing",
    airportCode: "CKG",
    countryCode: "CN",
    timezone: "Asia/Shanghai",
    timezoneAliases: ["Asia/Shanghai", "Asia/Chongqing", "Asia/Harbin", "Asia/Urumqi"]
  },
  {
    slug: "china-shanghai",
    label: "中国 · 上海 Shanghai (PVG)",
    nameZh: "上海",
    nameEn: "Shanghai",
    defaultCityZh: "上海",
    defaultCityEn: "Shanghai",
    airportCode: "PVG",
    countryCode: "CN",
    timezone: "Asia/Shanghai",
    timezoneAliases: ["Asia/Shanghai"]
  },
  {
    slug: "china-beijing",
    label: "中国 · 北京 Beijing (PEK)",
    nameZh: "北京",
    nameEn: "Beijing",
    defaultCityZh: "北京",
    defaultCityEn: "Beijing",
    airportCode: "PEK",
    countryCode: "CN",
    timezone: "Asia/Shanghai",
    timezoneAliases: ["Asia/Shanghai"]
  },
  {
    slug: "china-guangzhou",
    label: "中国 · 广州 Guangzhou (CAN)",
    nameZh: "广州",
    nameEn: "Guangzhou",
    defaultCityZh: "广州",
    defaultCityEn: "Guangzhou",
    airportCode: "CAN",
    countryCode: "CN",
    timezone: "Asia/Shanghai",
    timezoneAliases: ["Asia/Shanghai"]
  },
  {
    slug: "china-shenzhen",
    label: "中国 · 深圳 Shenzhen (SZX)",
    nameZh: "深圳",
    nameEn: "Shenzhen",
    defaultCityZh: "深圳",
    defaultCityEn: "Shenzhen",
    airportCode: "SZX",
    countryCode: "CN",
    timezone: "Asia/Shanghai",
    timezoneAliases: ["Asia/Shanghai"]
  },
  {
    slug: "china-chengdu",
    label: "中国 · 成都 Chengdu (TFU)",
    nameZh: "成都",
    nameEn: "Chengdu",
    defaultCityZh: "成都",
    defaultCityEn: "Chengdu",
    airportCode: "TFU",
    countryCode: "CN",
    timezone: "Asia/Shanghai",
    timezoneAliases: ["Asia/Shanghai"]
  },
  {
    slug: "japan-tokyo",
    label: "日本 · 东京 Tokyo (NRT)",
    nameZh: "东京",
    nameEn: "Tokyo",
    defaultCityZh: "东京",
    defaultCityEn: "Tokyo",
    airportCode: "NRT",
    countryCode: "JP",
    timezone: "Asia/Tokyo",
    timezoneAliases: ["Asia/Tokyo"]
  },
  {
    slug: "south-korea-seoul",
    label: "韩国 · 首尔 Seoul (ICN)",
    nameZh: "首尔",
    nameEn: "Seoul",
    defaultCityZh: "首尔",
    defaultCityEn: "Seoul",
    airportCode: "ICN",
    countryCode: "KR",
    timezone: "Asia/Seoul",
    timezoneAliases: ["Asia/Seoul"]
  },
  {
    slug: "thailand-bangkok",
    label: "泰国 · 曼谷 Bangkok (BKK)",
    nameZh: "曼谷",
    nameEn: "Bangkok",
    defaultCityZh: "曼谷",
    defaultCityEn: "Bangkok",
    airportCode: "BKK",
    countryCode: "TH",
    timezone: "Asia/Bangkok",
    timezoneAliases: ["Asia/Bangkok"]
  },
  {
    slug: "singapore-singapore",
    label: "新加坡 · 新加坡 Singapore (SIN)",
    nameZh: "新加坡",
    nameEn: "Singapore",
    defaultCityZh: "新加坡",
    defaultCityEn: "Singapore",
    airportCode: "SIN",
    countryCode: "SG",
    timezone: "Asia/Singapore",
    timezoneAliases: ["Asia/Singapore"]
  },
  {
    slug: "malaysia-kuala-lumpur",
    label: "马来西亚 · 吉隆坡 Kuala Lumpur (KUL)",
    nameZh: "吉隆坡",
    nameEn: "Kuala Lumpur",
    defaultCityZh: "吉隆坡",
    defaultCityEn: "Kuala Lumpur",
    airportCode: "KUL",
    countryCode: "MY",
    timezone: "Asia/Kuala_Lumpur",
    timezoneAliases: ["Asia/Kuala_Lumpur"]
  },
  {
    slug: "indonesia-bali",
    label: "印度尼西亚 · 巴厘岛 Bali (DPS)",
    nameZh: "巴厘岛",
    nameEn: "Bali",
    defaultCityZh: "巴厘岛",
    defaultCityEn: "Bali",
    airportCode: "DPS",
    countryCode: "ID",
    timezone: "Asia/Jakarta",
    timezoneAliases: ["Asia/Jakarta", "Asia/Makassar", "Asia/Jayapura"]
  }
];

export const cities: City[] = [
  {
    slug: "bangkok",
    country: "Thailand",
    countryCode: "TH",
    countryNameZh: "泰国",
    city: "Bangkok",
    cityNameZh: "曼谷",
    cityNameEn: "Bangkok",
    airportCode: "BKK",
    locationText: "Bangkok, Thailand",
    timezone: "Asia/Bangkok",
    flyCities: ["曼谷", "清迈", "普吉", "苏梅", "董里"],
    airports: ["BKK 素万那普机场", "DMK 廊曼机场"],
    visaOptions: ["免签 60天", "旅游签 60天"],
    visaRequirement: "中国大陆普通护照短期旅游可按免签入境；停留更久或非旅游目的，请按出行目的办理相应签证。",
    visaProcessingTime: "免签无需提前办签；旅游签通常建议预留 5-10 个工作日，具体以使领馆或签证中心为准。",
    visaStayDuration: "免签通常可停留 60 天；旅游签常见为 60 天，能否延期以泰国移民局要求为准。",
    flightPriceRanges: {
      "mainland-china": "约 ¥800-¥2500",
      japan: "约 ¥900-¥2600",
      "south-korea": "约 ¥900-¥2400",
      singapore: "约 ¥500-¥1600",
      malaysia: "约 ¥400-¥1400",
      indonesia: "约 ¥700-¥2200",
      thailand: "约 ¥200-¥900"
    },
    feeNotes: ["泰国游客入境费 / 旅游税确实有 300 泰铢的政策规划，截至今天还没有执行。", "请出行前以泰国官方最新公告和航司 / 订票平台订单页为准。"],
    flightSearchUrl: "https://www.google.com/travel/flights",
    hotelSearchUrl: "https://www.google.com/travel/hotels",
    transportWays: ["直飞", "中转", "联运查询"],
    entryTips: ["个人需准备 20,000 泰铢现金或等值货币", "家庭需准备 40,000 泰铢现金或等值货币", "入境需填写 TDAC 电子入境卡", "准备回程机票预订单和酒店预订单"],
    tdacUrl: "https://tdac.immigration.go.th/",
    currency: "THB 泰铢",
    exchangeRate: "1 CNY ≈ 4.9 THB",
    paymentMethods: ["现金", "VISA", "Mastercard", "支付宝", "微信支付"],
    weather: "局部晴朗",
    temperature: "33°C",
    temperatureRange: "28-35°C",
    clothingTip: "高 UV，注意防晒补水；未来几天有阵雨，随身带伞；商场和 BTS 空调较冷，可备薄外套",
    language: ["泰语", "英语基础可用"],
    languagePhrases: ["你好：สวัสดี ค่ะ/ครับ（Sawadee ka/krub）", "谢谢：ขอบคุณ ค่ะ/ครับ（Khob khun ka/krub）", "多少钱：เท่าไหร่（Tao rai）"],
    translationApps: ["Google 翻译 App", "Papago", "有道翻译官"],
    plug: "Type A / C",
    voltage: "220V",
    departureChecklist: ["护照", "官方入口", "机票", "酒店", "eSIM", "转换头"],
    visaStatus: {
      CN: { type: "visa-free", days: 60, note: "中国大陆护照赴泰旅游免签60天，需确保护照有效期6个月以上" },
      JP: { type: "visa-free", days: 30 },
      KR: { type: "visa-free", days: 30 },
      TH: { type: "visa-free" },
      SG: { type: "visa-free", days: 30 },
      MY: { type: "visa-free", days: 30 },
      ID: { type: "visa-free", days: 30 }
    },
    subtitle: "微笑之都，精彩无限！",
    emoji: "🏯",
    accent: "#10b8c4"
  },
  {
    slug: "tokyo",
    country: "Japan",
    countryCode: "JP",
    countryNameZh: "日本",
    city: "Tokyo",
    cityNameZh: "东京",
    cityNameEn: "Tokyo",
    airportCode: "NRT",
    locationText: "Tokyo, Japan",
    timezone: "Asia/Tokyo",
    flyCities: ["东京", "大阪", "札幌", "福冈", "冲绳"],
    airports: ["HND 羽田机场", "NRT 成田机场"],
    visaOptions: ["按护照与出发地确认签证要求"],
    flightPriceRanges: {
      "mainland-china": "约 ¥1200-¥3500",
      japan: "约 ¥300-¥1200",
      "south-korea": "约 ¥700-¥2200",
      singapore: "约 ¥1500-¥4200",
      malaysia: "约 ¥1400-¥3900",
      indonesia: "约 ¥1600-¥4600",
      thailand: "约 ¥1200-¥3800"
    },
    feeNotes: ["机票价格浮动，请以实际查询为准", "税费、机场建设费、燃油附加费等以航司和订票平台订单页为准", "入境相关费用请以官方最新要求为准"],
    flightSearchUrl: "https://www.google.com/travel/flights",
    hotelSearchUrl: "https://www.google.com/travel/hotels",
    transportWays: ["直飞", "中转", "机场铁路"],
    entryTips: ["中国护照赴日需提前办理旅游签证(办理周期约5-7个工作日)", "入境需通过Visit Japan Web预填入境和海关信息", "需携带护照、签证、往返机票和酒店预订单", "建议准备行程单和资产证明备查"],
    tdacUrl: "https://www.vjw.digital.go.jp/",
    currency: "JPY 日元",
    exchangeRate: "1 CNY ≈ 21 JPY",
    paymentMethods: ["现金", "VISA", "Mastercard", "交通卡", "移动支付"],
    weather: "多云",
    temperature: "24°C",
    temperatureRange: "22-29°C",
    clothingTip: "轻便外套，舒适步行鞋",
    language: ["日语", "热门区域英语基础可用"],
    plug: "Type A / B",
    voltage: "100V",
    departureChecklist: ["护照", "官方入口", "机票", "酒店", "交通卡", "转换头"],
    visaStatus: {
      CN: { type: "visa-required", note: "中国大陆护照需提前办理日本旅游签证", processingTime: "5-7 个工作日", fee: "单次 ¥200-300 / 多次 ¥400-600", documents: ["护照原件(有效期6个月以上)", "签证照片(4.5×4.5cm)", "在职证明/资产证明", "机票酒店预订单", "签证申请表"] },
      JP: { type: "visa-free" },
      KR: { type: "visa-free" },
      TH: { type: "visa-free", days: 15 },
      SG: { type: "visa-free", days: 30 },
      MY: { type: "visa-free" },
      ID: { type: "visa-free" }
    },
    subtitle: "秩序都市，四季皆宜。",
    emoji: "🗼",
    accent: "#1677e8"
  },
  {
    slug: "singapore",
    country: "Singapore",
    countryCode: "SG",
    countryNameZh: "新加坡",
    city: "Singapore",
    cityNameZh: "新加坡",
    cityNameEn: "Singapore",
    airportCode: "SIN",
    locationText: "Singapore, Singapore",
    timezone: "Asia/Singapore",
    flyCities: ["新加坡"],
    airports: ["SIN 樟宜机场"],
    visaOptions: ["按护照与出发地确认签证要求"],
    flightPriceRanges: {
      "mainland-china": "约 ¥900-¥2800",
      japan: "约 ¥1400-¥4200",
      "south-korea": "约 ¥1300-¥3900",
      singapore: "本地出发",
      malaysia: "约 ¥300-¥1200",
      indonesia: "约 ¥500-¥1600",
      thailand: "约 ¥600-¥1800"
    },
    feeNotes: ["机票价格浮动，请以实际查询为准", "税费、机场建设费、燃油附加费等以航司和订票平台订单页为准", "入境相关费用请以官方最新要求为准"],
    flightSearchUrl: "https://www.google.com/travel/flights",
    hotelSearchUrl: "https://www.google.com/travel/hotels",
    transportWays: ["直飞", "中转", "地铁接驳"],
    entryTips: ["中国护照赴新加坡免签30天(2024年2月起互免)", "入境需在抵达前3天内填写SG Arrival Card", "确保护照有效期6个月以上", "建议备好回程机票和酒店预订单"],
    tdacUrl: "https://eservices.ica.gov.sg/sgarrivalcard/",
    currency: "SGD 新加坡元",
    exchangeRate: "1 CNY ≈ 0.18 SGD",
    paymentMethods: ["现金", "VISA", "Mastercard", "支付宝", "微信支付"],
    weather: "阵雨",
    temperature: "30°C",
    temperatureRange: "27-32°C",
    clothingTip: "短袖为主，随身带雨具，室内空调可备薄外套",
    language: ["英语", "华语基础可用"],
    plug: "Type G",
    voltage: "230V",
    departureChecklist: ["护照", "官方入口", "机票", "酒店", "流量卡", "转换头"],
    visaStatus: {
      CN: { type: "visa-free", days: 30, note: "中国与新加坡互免签证，入境需提前填写SG Arrival Card" },
      JP: { type: "visa-free", days: 30 },
      KR: { type: "visa-free", days: 30 },
      SG: { type: "visa-free" },
      MY: { type: "visa-free", days: 30 },
      ID: { type: "visa-free", days: 30 },
      TH: { type: "visa-free", days: 30 }
    },
    subtitle: "花园城市，轻松短途旅行。",
    emoji: "🦁",
    accent: "#18b889"
  },
  {
    slug: "osaka",
    country: "Japan",
    countryCode: "JP",
    countryNameZh: "日本",
    city: "Osaka",
    cityNameZh: "大阪",
    cityNameEn: "Osaka",
    airportCode: "KIX",
    locationText: "Osaka, Japan",
    timezone: "Asia/Tokyo",
    flyCities: ["东京", "大阪", "札幌", "福冈", "冲绳"],
    airports: ["KIX 关西国际机场", "ITM 伊丹机场"],
    visaOptions: ["按护照与出发地确认签证要求"],
    flightPriceRanges: {
      "mainland-china": "约 ¥1100-¥3300",
      japan: "约 ¥300-¥1200",
      "south-korea": "约 ¥700-¥2200",
      singapore: "约 ¥1500-¥4200",
      malaysia: "约 ¥1400-¥3900",
      indonesia: "约 ¥1600-¥4600",
      thailand: "约 ¥1200-¥3800"
    },
    feeNotes: ["机票价格浮动，请以实际查询为准", "税费、机场建设费、燃油附加费等以航司和订票平台订单页为准", "入境相关费用请以官方最新要求为准"],
    flightSearchUrl: "https://www.google.com/travel/flights",
    hotelSearchUrl: "https://www.google.com/travel/hotels",
    transportWays: ["直飞", "中转", "关西铁路"],
    entryTips: ["中国护照赴日需提前办理旅游签证(办理周期约5-7个工作日)", "入境需通过Visit Japan Web预填入境和海关信息", "需携带护照、签证、往返机票和酒店预订单", "建议准备行程单和资产证明备查"],
    tdacUrl: "https://www.vjw.digital.go.jp/",
    currency: "JPY 日元",
    exchangeRate: "1 CNY ≈ 21 JPY",
    paymentMethods: ["现金", "VISA", "Mastercard", "交通卡", "移动支付"],
    weather: "多云",
    temperature: "25°C",
    temperatureRange: "22-30°C",
    clothingTip: "轻装，备薄外套，适合步行鞋",
    language: ["日语", "热门区域英语基础可用"],
    plug: "Type A / B",
    voltage: "100V",
    departureChecklist: ["护照", "官方入口", "机票", "酒店", "交通卡", "转换头"],
    visaStatus: {
      CN: { type: "visa-required", note: "中国大陆护照需提前办理日本旅游签证", processingTime: "5-7 个工作日", fee: "单次 ¥200-300 / 多次 ¥400-600", documents: ["护照原件(有效期6个月以上)", "签证照片(4.5×4.5cm)", "在职证明/资产证明", "机票酒店预订单", "签证申请表"] },
      JP: { type: "visa-free" },
      KR: { type: "visa-free" },
      TH: { type: "visa-free", days: 15 },
      SG: { type: "visa-free", days: 30 },
      MY: { type: "visa-free" },
      ID: { type: "visa-free" }
    },
    subtitle: "美食、城景与关西旅行起点。",
    emoji: "🏯",
    accent: "#f59f35"
  },
  {
    slug: "kuala-lumpur",
    country: "Malaysia",
    countryCode: "MY",
    countryNameZh: "马来西亚",
    city: "Kuala Lumpur",
    cityNameZh: "吉隆坡",
    cityNameEn: "Kuala Lumpur",
    airportCode: "KUL",
    locationText: "Kuala Lumpur, Malaysia",
    timezone: "Asia/Kuala_Lumpur",
    flyCities: ["吉隆坡", "槟城", "兰卡威", "亚庇", "古晋"],
    airports: ["KUL 吉隆坡国际机场"],
    visaOptions: ["按护照与出发地确认签证要求"],
    flightPriceRanges: {
      "mainland-china": "约 ¥800-¥2600",
      japan: "约 ¥1500-¥4200",
      "south-korea": "约 ¥1300-¥3900",
      singapore: "约 ¥300-¥1200",
      malaysia: "约 ¥200-¥900",
      indonesia: "约 ¥600-¥1800",
      thailand: "约 ¥500-¥1600"
    },
    feeNotes: ["机票价格浮动，请以实际查询为准", "税费、机场建设费、燃油附加费等以航司和订票平台订单页为准", "入境相关费用请以官方最新要求为准"],
    flightSearchUrl: "https://www.google.com/travel/flights",
    hotelSearchUrl: "https://www.google.com/travel/hotels",
    transportWays: ["直飞", "中转", "机场快线"],
    entryTips: ["中国护照赴马来西亚免签30天(2023年12月起免签)", "入境需在抵达前3天内填写MDAC电子入境卡", "确保护照有效期6个月以上", "建议备好往返机票和酒店预订单"],
    tdacUrl: "https://imigresen-online.imi.gov.my/mdac/main",
    currency: "MYR 林吉特",
    exchangeRate: "1 CNY ≈ 0.65 MYR",
    paymentMethods: ["现金", "VISA", "Mastercard", "支付宝", "移动支付"],
    weather: "雷阵雨",
    temperature: "30°C",
    temperatureRange: "25-32°C",
    clothingTip: "轻装，带雨具，注意防晒",
    language: ["马来语", "英语基础可用"],
    plug: "Type G",
    voltage: "240V",
    departureChecklist: ["护照", "官方入口", "机票", "酒店", "eSIM", "转换头"],
    visaStatus: {
      CN: { type: "visa-free", days: 30, note: "中国大陆护照赴马来西亚免签30天，需填写MDAC电子入境卡" },
      JP: { type: "visa-free" },
      KR: { type: "visa-free" },
      SG: { type: "visa-free" },
      MY: { type: "visa-free" },
      ID: { type: "visa-free" },
      TH: { type: "visa-free" }
    },
    subtitle: "热带城市，多元文化夜景。",
    emoji: "🏙️",
    accent: "#6c63ff"
  },
  {
    slug: "bali",
    country: "Indonesia",
    countryCode: "ID",
    countryNameZh: "印度尼西亚",
    city: "Bali",
    cityNameZh: "巴厘岛",
    cityNameEn: "Bali",
    airportCode: "DPS",
    locationText: "Bali, Indonesia",
    timezone: "Asia/Makassar",
    flyCities: ["巴厘岛", "雅加达", "泗水", "日惹", "棉兰"],
    airports: ["DPS 伍拉赖国际机场"],
    visaOptions: ["按护照与出发地确认签证要求"],
    flightPriceRanges: {
      "mainland-china": "约 ¥1300-¥4200",
      japan: "约 ¥1700-¥4800",
      "south-korea": "约 ¥1600-¥4500",
      singapore: "约 ¥700-¥2200",
      malaysia: "约 ¥700-¥2200",
      indonesia: "约 ¥300-¥1400",
      thailand: "约 ¥1000-¥3200"
    },
    feeNotes: ["机票价格浮动，请以实际查询为准", "税费、机场建设费、燃油附加费等以航司和订票平台订单页为准", "入境相关费用请以官方最新要求为准"],
    flightSearchUrl: "https://www.google.com/travel/flights",
    hotelSearchUrl: "https://www.google.com/travel/hotels",
    transportWays: ["直飞", "中转", "包车接驳"],
    entryTips: ["中国护照可办理落地签(VOA)30天，费用500,000印尼盾(约¥230)", "落地签可在机场办理，需准备现金支付", "确保护照有效期6个月以上", "建议备好回程机票和酒店预订单"],
    tdacUrl: "https://ecd.beacukai.go.id/",
    currency: "IDR 印尼盾",
    exchangeRate: "1 CNY ≈ 2250 IDR",
    paymentMethods: ["现金", "VISA", "Mastercard", "移动支付"],
    weather: "晴间多云",
    temperature: "29°C",
    temperatureRange: "25-31°C",
    clothingTip: "夏装，注意防晒，海边准备拖鞋和防晒衣",
    language: ["印尼语", "旅游区英语基础可用"],
    plug: "Type C / F",
    voltage: "230V",
    departureChecklist: ["护照", "官方入口", "机票", "酒店", "流量卡", "转换头"],
    visaStatus: {
      CN: { type: "visa-on-arrival", days: 30, note: "中国大陆护照可办理落地签(VOA)30天，费用500,000印尼盾(约¥230)，可延期一次", processingTime: "落地后办理(约15-30分钟)", fee: "500,000印尼盾(约¥230)" },
      JP: { type: "visa-free", days: 30 },
      KR: { type: "visa-free", days: 30 },
      SG: { type: "visa-free", days: 30 },
      MY: { type: "visa-free" },
      ID: { type: "visa-free" },
      TH: { type: "visa-free" }
    },
    subtitle: "海岛、稻田与慢节奏假期。",
    emoji: "🌴",
    accent: "#19b7a8"
  }
];

export function findCity(slug: string) {
  const city = cities.find((item) => item.slug === slug) ?? cities[0];
  const generated = generatedTravelContent.destinations?.[city.slug] ?? {};
  return {
    ...city,
    airports: generated.airports?.length ? generated.airports : city.airports,
    visaOptions: generated.visaOptions?.length ? generated.visaOptions : city.visaOptions,
    flightPriceRanges: generated.flightPriceRanges ? { ...city.flightPriceRanges, ...generated.flightPriceRanges } : city.flightPriceRanges,
    feeNotes: generated.feeNotes?.length ? generated.feeNotes : city.feeNotes,
    entryTips: generated.entryTips?.length ? generated.entryTips : city.entryTips,
    tdacUrl: generated.tdacUrl || city.tdacUrl,
    flightSearchUrl: generated.flightSearchUrl || city.flightSearchUrl,
    hotelSearchUrl: generated.hotelSearchUrl || city.hotelSearchUrl
  };
}

export function findDeparturePlace(slug: string) {
  return departurePlaces.find((place) => place.slug === slug) ?? departurePlaces[0];
}

export function findDepartureByTimezone(timezone: string) {
  return departurePlaces.find((place) => place.timezoneAliases.includes(timezone)) ?? departurePlaces[0];
}
