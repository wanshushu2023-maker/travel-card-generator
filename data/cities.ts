export type City = {
  slug: string;
  country: string;
  city: string;
  cityNameZh: string;
  cityNameEn: string;
  locationText: string;
  timezone: string;
  airports: string[];
  transportWays: string[];
  entryTips: string[];
  currency: string;
  exchangeRate: string;
  paymentMethods: string[];
  weather: string;
  temperature: string;
  temperatureRange: string;
  clothingTip: string;
  language: string[];
  plug: string;
  voltage: string;
  departureChecklist: string[];
  subtitle: string;
  emoji: string;
  accent: string;
};

export const cities: City[] = [
  {
    slug: "bangkok",
    country: "Thailand",
    city: "Bangkok",
    cityNameZh: "曼谷",
    cityNameEn: "Bangkok",
    locationText: "Bangkok, Thailand",
    timezone: "Asia/Bangkok",
    airports: ["BKK 素万那普机场", "DMK 廊曼机场"],
    transportWays: ["直飞", "中转", "联运查询"],
    entryTips: ["查看官方入境要求", "电子入境卡 / 官方入口", "政策可能随时变化，请以官方信息为准"],
    currency: "THB 泰铢",
    exchangeRate: "1 CNY ≈ 4.9 THB",
    paymentMethods: ["现金", "VISA", "Mastercard", "支付宝", "微信支付"],
    weather: "小雨",
    temperature: "31°C",
    temperatureRange: "28-33°C",
    clothingTip: "轻装，带雨具；商场和 BTS 空调较冷，可备薄外套",
    language: ["泰语", "英语基础可用"],
    plug: "Type A / C",
    voltage: "220V",
    departureChecklist: ["护照", "官方入口", "机票", "酒店", "eSIM", "转换头"],
    subtitle: "微笑之都，精彩无限！",
    emoji: "🏯",
    accent: "#10b8c4"
  },
  {
    slug: "tokyo",
    country: "Japan",
    city: "Tokyo",
    cityNameZh: "东京",
    cityNameEn: "Tokyo",
    locationText: "Tokyo, Japan",
    timezone: "Asia/Tokyo",
    airports: ["HND 羽田机场", "NRT 成田机场"],
    transportWays: ["直飞", "中转", "机场铁路"],
    entryTips: ["查看官方入境要求", "Visit Japan Web / 官方入口", "签证与入境政策请以官方信息为准"],
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
    subtitle: "秩序都市，四季皆宜。",
    emoji: "🗼",
    accent: "#1677e8"
  },
  {
    slug: "singapore",
    country: "Singapore",
    city: "Singapore",
    cityNameZh: "新加坡",
    cityNameEn: "Singapore",
    locationText: "Singapore, Singapore",
    timezone: "Asia/Singapore",
    airports: ["SIN 樟宜机场"],
    transportWays: ["直飞", "中转", "地铁接驳"],
    entryTips: ["查看官方入境要求", "SG Arrival Card / 官方入口", "政策可能随时变化，请以官方信息为准"],
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
    subtitle: "花园城市，轻松短途旅行。",
    emoji: "🦁",
    accent: "#18b889"
  },
  {
    slug: "osaka",
    country: "Japan",
    city: "Osaka",
    cityNameZh: "大阪",
    cityNameEn: "Osaka",
    locationText: "Osaka, Japan",
    timezone: "Asia/Tokyo",
    airports: ["KIX 关西国际机场", "ITM 伊丹机场"],
    transportWays: ["直飞", "中转", "关西铁路"],
    entryTips: ["查看官方入境要求", "Visit Japan Web / 官方入口", "签证与入境政策请以官方信息为准"],
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
    subtitle: "美食、城景与关西旅行起点。",
    emoji: "🏯",
    accent: "#f59f35"
  },
  {
    slug: "kuala-lumpur",
    country: "Malaysia",
    city: "Kuala Lumpur",
    cityNameZh: "吉隆坡",
    cityNameEn: "Kuala Lumpur",
    locationText: "Kuala Lumpur, Malaysia",
    timezone: "Asia/Kuala_Lumpur",
    airports: ["KUL 吉隆坡国际机场"],
    transportWays: ["直飞", "中转", "机场快线"],
    entryTips: ["查看官方入境要求", "MDAC 电子入境卡 / 官方入口", "政策可能随时变化，请以官方信息为准"],
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
    subtitle: "热带城市，多元文化夜景。",
    emoji: "🏙️",
    accent: "#6c63ff"
  },
  {
    slug: "bali",
    country: "Indonesia",
    city: "Bali",
    cityNameZh: "巴厘岛",
    cityNameEn: "Bali",
    locationText: "Bali, Indonesia",
    timezone: "Asia/Makassar",
    airports: ["DPS 伍拉赖国际机场"],
    transportWays: ["直飞", "中转", "包车接驳"],
    entryTips: ["查看官方入境要求", "电子海关申报 / 官方入口", "政策可能随时变化，请以官方信息为准"],
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
    subtitle: "海岛、稻田与慢节奏假期。",
    emoji: "🌴",
    accent: "#19b7a8"
  }
];

export function findCity(slug: string) {
  return cities.find((city) => city.slug === slug) ?? cities[0];
}
