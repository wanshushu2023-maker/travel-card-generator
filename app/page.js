import Footer from "@/components/Footer";
import HomeClient from "@/components/HomeClient";
import SiteHeader from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeClient />
      </main>
      <Footer />
    </>
  );
}
