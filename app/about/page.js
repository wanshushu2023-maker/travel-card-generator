import ContentPage from "@/components/ContentPage";

export default function AboutPage() {
  return (
    <ContentPage title="使用指南">
      <p>输入出发地、目的地和出发日期，点击生成信息卡。热门城市按钮可快速填入目的地。</p>
      <p>生成后的分享链接会包含出发地、目的地和日期，打开链接即可重新渲染同一张信息卡。</p>
    </ContentPage>
  );
}
