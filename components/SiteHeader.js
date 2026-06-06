import Link from "next/link";

export default function SiteHeader({ compact = false }) {
  return (
    <header className={`mx-auto flex w-[min(1180px,calc(100%-32px))] items-center justify-between gap-4 py-4 ${compact ? "mb-2" : ""} max-md:items-start max-md:flex-col`}>
      <Link href="/" className="inline-flex items-center gap-3 text-2xl font-black text-[#102a56] max-sm:text-xl" aria-label="旅游信息卡生成器首页">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[#0993ff] to-[#16d1b0] text-white shadow-lg">✈</span>
        <span>旅游信息卡生成器</span>
      </Link>
      <nav className="flex items-center gap-5 text-sm font-bold text-[#263d62] max-md:w-full max-md:overflow-x-auto" aria-label="顶部导航">
        <Link href="/about">使用指南</Link>
        <button type="button" className="whitespace-nowrap">收藏此页</button>
        <button type="button" className="whitespace-nowrap">简体中文⌄</button>
      </nav>
    </header>
  );
}
