
export type ChecklistMap = Record<string, Record<string, string[]>>;

export const checklistData: ChecklistMap = {
  bangkok: {
    CN: ["护照", "机票", "酒店预订", "TDAC 入境卡填写单", "电话卡", "转换头(备选)"],
    JP: ["护照", "机票", "酒店预订", "电话卡", "转换头(备选)"],
    KR: ["护照", "机票", "酒店预订", "电话卡", "转换头(备选)"],
    SG: ["护照", "机票", "酒店预订", "电话卡"],
    MY: ["护照", "机票", "酒店预订", "电话卡"],
    ID: ["护照", "机票", "酒店预订", "电话卡"],
    TH: ["机票", "酒店预订"]
  },
  tokyo: {
    CN: ["护照", "签证", "机票", "酒店预订", "网络(漫游/eSIM)", "转换头(备选)"],
    JP: ["机票", "酒店预订"]
  },
  singapore: {
    CN: ["护照", "机票", "酒店预订", "SG Arrival Card", "电话卡", "转换头(备选)"],
    SG: ["机票", "酒店预订"]
  },
  osaka: {
    CN: ["护照", "签证", "机票", "酒店预订", "网络(漫游/eSIM)", "转换头(备选)"],
    JP: ["机票", "酒店预订"]
  },
  "kuala-lumpur": {
    CN: ["护照", "机票", "酒店预订", "MDAC 电子入境卡", "电话卡", "转换头(备选)"],
    MY: ["机票", "酒店预订"]
  },
  bali: {
    CN: ["护照", "机票", "酒店预订", "落地签(VOA)", "电话卡", "转换头(备选)"],
    ID: ["机票", "酒店预订"]
  }
};

export function getDestinationChecklist(destinationSlug: string, originCountryCode: string): string[] {
  const destData = checklistData[destinationSlug];
  if (destData?.[originCountryCode]) {
    return [...destData[originCountryCode]];
  }
  return ["护照", "机票", "酒店预订", "电话卡", "转换头(备选)"];
}
