import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";

export default function ContentPage({ title, children }) {
  return (
    <>
      <SiteHeader compact />
      <main className="card-shadow mx-auto my-10 w-[min(760px,calc(100%-32px))] rounded-lg bg-white p-8 leading-8">
        <h1 className="mb-4 text-4xl font-black">{title}</h1>
        <div className="space-y-4 text-[#314663]">{children}</div>
      </main>
      <Footer />
    </>
  );
}
