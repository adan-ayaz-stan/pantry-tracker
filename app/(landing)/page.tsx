import Image from "next/image";
import Navbar from "./_components/Navbar";
import HeroSection from "./_components/HeroSection";
import SecondSection from "./_components/SecondSection";
import ThirdSection from "./_components/ThirdSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-yBg">
      <Navbar />
      <HeroSection />
      <SecondSection />
      <ThirdSection />
    </main>
  );
}
