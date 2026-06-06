import "./globals.css";

export const metadata = {
  title: "旅游信息卡生成器",
  description: "输入目的地和出发日期，一键生成出发前必看的旅游信息卡。"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
