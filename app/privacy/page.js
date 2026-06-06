import ContentPage from "@/components/ContentPage";

export default function PrivacyPage() {
  return (
    <ContentPage title="隐私说明">
      <p>中文版 V1 不提供注册和登录，不使用后台数据库。最近选择的出发地仅保存在当前浏览器的 localStorage 中。</p>
    </ContentPage>
  );
}
