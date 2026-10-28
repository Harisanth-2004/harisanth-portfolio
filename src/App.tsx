import { Hero } from "@/components/portfolio/Hero";
import { Navigator } from "@/components/portfolio/Navigator";
import { Sections } from "@/components/portfolio/Sections";
import { PortfolioProvider } from "@/components/portfolio/state";

export default function App() {
  return (
    <PortfolioProvider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navigator />
      <main
        id="main-content"
        tabIndex={-1}
        className="pb-24 outline-none lg:pb-0"
      >
        <Hero />
        <Sections />
      </main>
    </PortfolioProvider>
  );
}
