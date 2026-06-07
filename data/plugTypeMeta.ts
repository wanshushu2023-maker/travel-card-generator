export type PlugType = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "I" | "J" | "K" | "L" | "O";

export type PlugTypeMeta = {
  code: PlugType;
  chineseName: string;
  userName: string;
  shape: string;
  shortName: string;
  socketIcon?: string;
  plugIcon?: string;
  hasIcon: boolean;
  description: string;
};

export const plugTypeMeta: Record<PlugType, PlugTypeMeta> = {
  A: {
    code: "A",
    chineseName: "美标两扁脚",
    userName: "两脚扁头",
    shape: "两个平行扁脚",
    shortName: "美标两扁",
    socketIcon: "/icons/plugs/socket-a.svg",
    plugIcon: "/icons/plugs/plug-a.svg",
    hasIcon: true,
    description: "不带接地。"
  },
  B: {
    code: "B",
    chineseName: "美标三孔",
    userName: "两扁一圆三脚",
    shape: "两个平行扁脚 + 一个圆形接地脚",
    shortName: "美标三孔",
    socketIcon: "/icons/plugs/socket-b.svg",
    plugIcon: "/icons/plugs/plug-b.svg",
    hasIcon: true,
    description: "美标三孔，不是中国三脚斜扁头。"
  },
  C: {
    code: "C",
    chineseName: "欧标两圆脚",
    userName: "两脚圆头",
    shape: "两个圆脚",
    shortName: "欧标两圆",
    socketIcon: "/icons/plugs/socket-c.svg",
    plugIcon: "/icons/plugs/plug-c.svg",
    hasIcon: true,
    description: "不带接地。"
  },
  D: {
    code: "D",
    chineseName: "老式英印三圆脚",
    userName: "老式三圆脚",
    shape: "三个圆形插脚",
    shortName: "老式三圆",
    hasIcon: false,
    description: "印度、尼泊尔等部分地区常见；香港少量老建筑可能见到，不作为香港主流展示。"
  },
  E: {
    code: "E",
    chineseName: "法标圆脚",
    userName: "法标两圆脚带接地",
    shape: "两个圆脚 + 接地结构",
    shortName: "法标圆脚",
    hasIcon: false,
    description: "法国、比利时、波兰等地常见。"
  },
  F: {
    code: "F",
    chineseName: "德标圆脚",
    userName: "欧标接地圆孔",
    shape: "两个圆脚 + 侧边接地结构",
    shortName: "德标圆脚",
    socketIcon: "/icons/plugs/socket-f.svg",
    plugIcon: "/icons/plugs/plug-f.svg",
    hasIcon: true,
    description: "常见于德国、印尼、韩国等地区。"
  },
  G: {
    code: "G",
    chineseName: "英标三方脚",
    userName: "英标大三脚",
    shape: "三个方形插脚",
    shortName: "英标三方",
    socketIcon: "/icons/plugs/socket-g.svg",
    plugIcon: "/icons/plugs/plug-g.svg",
    hasIcon: true,
    description: "英国、香港、新加坡、马来西亚、阿联酋等地常见。"
  },
  I: {
    code: "I",
    chineseName: "国标/澳标斜扁脚",
    userName: "中国/澳洲斜扁脚",
    shape: "两个斜扁脚 + 一个接地脚",
    shortName: "国标斜扁",
    socketIcon: "/icons/plugs/socket-i.svg",
    plugIcon: "/icons/plugs/plug-i.svg",
    hasIcon: true,
    description: "中国大陆、澳大利亚、新西兰等地常见。"
  },
  J: {
    code: "J",
    chineseName: "瑞士三圆脚",
    userName: "瑞士三圆脚",
    shape: "三个圆形插脚",
    shortName: "瑞士三圆",
    hasIcon: false,
    description: "瑞士、列支敦士登常见，不能简单按普通欧标处理。"
  },
  K: {
    code: "K",
    chineseName: "丹麦三脚",
    userName: "丹麦三脚",
    shape: "丹麦特殊三脚",
    shortName: "丹麦三脚",
    hasIcon: false,
    description: "丹麦常见的特殊标准。"
  },
  L: {
    code: "L",
    chineseName: "意标三圆脚",
    userName: "意大利三圆脚",
    shape: "三个圆形插脚",
    shortName: "意标三圆",
    hasIcon: false,
    description: "意大利常见，部分插座也兼容 Type C / F。"
  },
  O: {
    code: "O",
    chineseName: "泰标三圆脚",
    userName: "泰国三圆脚",
    shape: "三个圆形插脚",
    shortName: "泰标三圆",
    socketIcon: "/icons/plugs/socket-o.svg",
    plugIcon: "/icons/plugs/plug-o.svg",
    hasIcon: true,
    description: "泰国官方标准之一。"
  }
};

export function getPlugTypeMeta(type: PlugType) {
  return plugTypeMeta[type];
}
