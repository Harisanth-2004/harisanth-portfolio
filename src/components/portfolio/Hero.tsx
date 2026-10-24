import { useEffect, useRef } from "react";
import { CircleDollarSign, Trophy, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTENT, PERSON } from "@/lib/portfolio-data";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { Schematic } from "./Schematic";
import { scrollToSection, usePortfolio } from "./state";
import portrait from "@/assets/harisanth-portrait-cutout.png";

function Lines({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={i} className={`line ${className}`}>
          <span className="line-inner">{l}</span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const { mode, setMode, ready } = usePortfolio();
  const root = useRef<HTMLElement>(null);
  const first = useRef(true);
  const animation = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!ready || !root.current) return;
    const media = gsap.matchMedia();
    media.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      () => {
        const reduce = prefersReducedMotion();
        const q = gsap.utils.selector(root);
        const layers = q("[data-layer]");
        const show = q(`[data-layer=${mode}]`)[0] as HTMLElement | undefined;
        if (!show) return;
        const intro = first.current && mode === "neutral" && !reduce;
        const title = q("[data-intro-title]");
        animation.current?.kill();
        gsap.killTweensOf([
          ...layers,
          ...q(".line-inner, [data-stagger], [data-path], [data-rule], [data-curtain]"),
        ]);
        // Clear interrupted child reveals before selecting the newest scene.
        gsap.set(q(".line-inner, [data-stagger], [data-rule]"), {
          clearProps: "transform,opacity,visibility",
        });
        gsap.set(title, { clearProps: "transform,opacity,visibility" });
        if (intro) {
          gsap.set(title, { autoAlpha: 0, scale: 0.94, y: 12, transformOrigin: "50% 60%" });
        }
        gsap.set(q("[data-path]"), { strokeDashoffset: 0 });
        gsap.set(layers, { autoAlpha: 0, x: 0, y: 0 });
        gsap.set(show, { autoAlpha: 1 });
        const tl = gsap.timeline({ defaults: { ease: "power2.out", overwrite: "auto" } });
        animation.current = tl;
        if (first.current && !reduce) {
          tl.to(q("[data-curtain]"), { scaleY: 0, duration: 0.3 }, 0);
        } else gsap.set(q("[data-curtain]"), { scaleY: 0 });
        if (!reduce) {
          tl.fromTo(
            show,
            { opacity: 0, x: mode === "eng" ? 12 : mode === "mgmt" ? -12 : 0 },
            { opacity: 1, x: 0, duration: 0.32 },
            first.current ? 0.08 : 0,
          );
          if (intro) {
            tl.to(title, { autoAlpha: 1, scale: 1, y: 0, duration: 0.62, ease: "expo.out" }, 0.18);
          }
        }
        const scrollContext = gsap.context(() => {
          if (mode === "neutral" && !reduce) {
            gsap.fromTo(
              q("[data-cover-scroll]"),
              { yPercent: 0, autoAlpha: 1 },
              {
                yPercent: -7,
                autoAlpha: 0.28,
                ease: "none",
                scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.4 },
              },
            );
          }
        }, root);
        first.current = false;
        return () => {
          tl.kill();
          scrollContext.revert();
        };
      },
    );
    return () => media.revert();
  }, [mode, ready]);

  const eng = CONTENT.eng;
  const mgmt = CONTENT.mgmt;

  return (
    <section
      id="hero"
      ref={root}
      aria-label="Introduction"
      className={`portfolio-hero relative overflow-hidden ${mode === "neutral" ? "portfolio-cover" : ""}`}
    >
      {/* B.Tech circuit traces add a quiet electrical reference without a wallpaper grid. */}
      <div
        aria-hidden
        className={`absolute right-0 top-0 h-full w-px bg-signal transition-opacity duration-300 ${mode === "mgmt" ? "opacity-100" : "opacity-0"}`}
      />
      {/* axis marks (eng) */}
      <div
        aria-hidden
        className={`t-meta absolute inset-x-0 top-20 hidden justify-between px-[5vw] text-muted-foreground transition-opacity duration-300 lg:flex ${mode === "eng" ? "opacity-100" : "opacity-0"}`}
      >
        {["X 000", "X 240", "X 480", "X 720", "X 960"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      {/* NEUTRAL */}
      <div data-layer="neutral" inert={mode !== "neutral"} className="absolute inset-0 z-10">
        <div className="cover-meta absolute inset-x-5 top-[38%] flex items-center justify-between gap-6 sm:inset-x-8 lg:inset-x-[5vw]">
          <p data-stagger className="max-w-[38ch] text-sm sm:text-base">Electrical Engineer / Management Student / Project Coordinator</p>
          <p data-stagger className="hidden text-right text-sm sm:block">{PERSON.location} &nbsp; / &nbsp; Portfolio 2026</p>
        </div>

        <div data-cover-scroll className="absolute inset-x-0 bottom-0">
          <h1 data-intro-title className="cover-title font-grotesk font-semibold text-foreground">
            <span className="sr-only">Portfolio — {PERSON.name}</span>
            <span aria-hidden="true">PORTFOLIO</span>
          </h1>
        </div>

      </div>

      {/* ENGINEERING — enters from the right */}
      <div data-layer="eng" inert={mode !== "eng"} className="invisible absolute inset-0 z-10">
        <Schematic className="pointer-events-none absolute left-0 top-[10%] h-[42%] w-[min(100%,620px)] text-signal/35 sm:top-[8%] sm:h-[48%] lg:left-[2vw] lg:top-[14%] lg:h-[72%] lg:w-[min(47vw,660px)] lg:text-signal/45" />
        <figure aria-hidden="true" className="hero-portrait hero-portrait-eng">
          <img src={portrait} alt="" width={1280} height={1280} loading="eager" decoding="async" />
        </figure>
        <div className="hero-scrim absolute inset-x-0 bottom-0 px-5 pb-6 pt-24 sm:px-8 lg:inset-y-0 lg:left-auto lg:right-[5vw] lg:flex lg:w-[min(40vw,560px)] lg:flex-col lg:justify-center lg:bg-none lg:px-0 lg:pb-0">
          <p data-stagger className="t-meta flex items-center gap-3 text-signal">
            <span className="inline-block h-px w-8 bg-signal" />
            {eng.hero.meta}
          </p>
          <h2 className="t-headline mt-5 font-grotesk">
            <Lines lines={eng.hero.lines} />
          </h2>
          <p data-stagger className="t-body mt-6 max-w-[42ch] text-muted-foreground">
            {eng.hero.summary}
          </p>
          <div data-stagger className="mt-8 flex flex-wrap gap-3">
            <HeroCta onClick={() => scrollToSection("about")} primary>
              Explore engineering
            </HeroCta>
            <HeroCta onClick={() => setMode("mgmt")}>Switch to PGDM →</HeroCta>
          </div>
          <dl
            data-stagger
            className="t-meta mt-10 hidden grid-cols-3 gap-6 border-t border-border pt-4 text-muted-foreground lg:grid"
          >
            <div>
              <dt className="inline-flex items-center gap-2"><CircleDollarSign size={14} strokeWidth={1.5} aria-hidden="true" />Grants</dt>
              <dd className="mt-1 text-foreground">$2,500</dd>
            </div>
            <div>
              <dt className="inline-flex items-center gap-2"><UsersRound size={14} strokeWidth={1.5} aria-hidden="true" />Largest event</dt>
              <dd className="mt-1 text-foreground">3,000+</dd>
            </div>
            <div>
              <dt className="inline-flex items-center gap-2"><Trophy size={14} strokeWidth={1.5} aria-hidden="true" />SAUVC 2026</dt>
              <dd className="mt-1 text-foreground">Top 8</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* MANAGEMENT — enters from the left */}
      <div data-layer="mgmt" inert={mode !== "mgmt"} className="invisible absolute inset-0 z-10">
        <figure aria-hidden="true" className="hero-portrait hero-portrait-mgmt">
          <img src={portrait} alt="" width={1280} height={1280} loading="eager" decoding="async" />
        </figure>
        <div className="hero-scrim absolute inset-x-0 bottom-0 px-5 pb-6 pt-24 sm:px-8 lg:inset-y-0 lg:left-[20vw] lg:right-auto lg:flex lg:w-[min(42vw,520px)] lg:flex-col lg:justify-center lg:bg-none lg:px-0 lg:pb-0">
          <p data-stagger className="font-sans text-sm text-signal">
            {mgmt.hero.meta}
          </p>
          <span data-rule className="mt-4 block h-px w-full bg-foreground/30" />
          <h2 className="management-headline mt-6 font-grotesk font-medium">
            <Lines lines={mgmt.hero.lines.slice(0, 2)} />
            <Lines lines={mgmt.hero.lines.slice(2)} className="text-signal" />
          </h2>
          <p data-stagger className="t-body mt-6 max-w-[40ch] text-muted-foreground">
            {mgmt.hero.summary}
          </p>
          <div data-stagger className="mt-8 flex flex-wrap gap-3">
            <HeroCta onClick={() => scrollToSection("about")} primary>
              Read the profile
            </HeroCta>
            <HeroCta onClick={() => setMode("eng")}>← Switch to B.Tech</HeroCta>
          </div>
        </div>
      </div>

      <div
        data-curtain
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 origin-top pointer-events-none bg-foreground"
      />
    </section>
  );
}

function HeroCta({
  children,
  onClick,
  primary,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`relative inline-flex h-auto min-h-11 items-center rounded-none overflow-hidden border px-5 text-sm font-medium transition-[color,background-color,transform] duration-500 active:scale-[0.98] ${
        primary
          ? "border-foreground bg-foreground text-background hover:bg-signal hover:border-signal"
          : "border-border text-foreground hover:border-foreground"
      }`}
    >
      {children}
    </Button>
  );
}

