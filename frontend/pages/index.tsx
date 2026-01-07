import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProfessionAnalyzer from "../components/ai/ProfessionAnalyzer";
import FeaturedPackages from "../components/landing/FeaturedPackages";
import IndustryCarousel from "../components/landing/IndustryCarousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Navbar />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[90px]" />
        <div className="absolute top-48 right-0 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[110px]" />
      </div>

      <main className="relative">
        <ProfessionAnalyzer />
        <FeaturedPackages />
        <IndustryCarousel />
      </main>

      <Footer />
    </div>
  );
}
