import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CodePreview } from "@/components/CodePreview";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <CodePreview />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
