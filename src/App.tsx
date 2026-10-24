import { Hero } from "@/components/portfolio/Hero";
import { Navigator } from "@/components/portfolio/Navigator";
import { Sections } from "@/components/portfolio/Sections";
import { PortfolioProvider } from "@/components/portfolio/state";

export default function App() {
  return (
    <PortfolioProvider>
      <a href="#about" className="skip-link">Skip to profile</a>
      <Navigator />
      <main className="pb-24 lg:pb-0">
        <Hero />
        <Sections />
      </main>
    </PortfolioProvider>
  );
}

