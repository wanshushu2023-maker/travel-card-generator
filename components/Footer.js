import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto mb-8 mt-4 flex w-[min(1180px,calc(100%-32px))] flex-wrap justify-center gap-5 text-sm text-[#6e8096]">
      <Link href="/disclaimer">免责声明</Link>
      <Link href="/privacy">隐私说明</Link>
      <Link href="/contact">联系我们</Link>
      <span>信息更新于 2026-06-04</span>
    </footer>
  );
}
