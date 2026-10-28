import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  CalendarDays,
  ClipboardCheck,
  ChevronDown,
  Cpu,
  FolderOpen,
  GraduationCap,
  Lightbulb,
  Mail,
  Megaphone,
  Moon,
  Sun,
  Target,
  TrendingUp,
  Trophy,
  UserRound,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CONTENT,
  PERSON,
  SECTIONS,
  type Mode,
  type SectionId,
} from "@/lib/portfolio-data";
import { scrollToSection, usePortfolio } from "./state";

const SECTION_ICONS: Record<SectionId, LucideIcon> = {
  about: UserRound,
  education: GraduationCap,
  experience: Briefcase,
  goals: CalendarDays,
  reflections: Lightbulb,
  development: TrendingUp,
  evaluation: ClipboardCheck,
  clubs: UsersRound,
  projects: FolderOpen,
  skills: Lightbulb,
  certifications: Award,
  achievements: Trophy,
  contact: Mail,
};

const DESKTOP_SECTION_LABELS: Record<SectionId, string> = {
  about: "Introduction",
  education: "Education",
  experience: "Experience",
  goals: "Career goals",
  reflections: "Reflection",
  development: "Development",
  evaluation: "Rubric",
  clubs: "Clubs",
  projects: "Projects",
  skills: "Skills",
  certifications: "Credentials",
  achievements: "Achievements",
  contact: "Contact",
};

function sectionIcon(id: SectionId, mode: Mode | "neutral"): LucideIcon {
  if (id === "projects" && mode === "mgmt") return Megaphone;
  if (id === "skills" && mode === "eng") return Cpu;
  if (id === "skills" && mode === "mgmt") return Target;
  return SECTION_ICONS[id];
}

export function Navigator() {
  const {
    mode,
    setMode,
    theme,
    toggleTheme,
    active,
    setActive,
    navExpanded,
    setNavExpanded,
  } = usePortfolio();
  const menu = useRef<HTMLDivElement>(null);
  const [mobileNavVisible, setMobileNavVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as typeof active);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("section[id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [setActive]);

  useEffect(() => {
    if (!navExpanded) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNavExpanded(false);
        menu.current
          ?.querySelector<HTMLButtonElement>("[aria-expanded]")
          ?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.current?.contains(event.target))
        setNavExpanded(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [navExpanded, setNavExpanded]);

  useEffect(() => {
    let previousY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      if (Math.abs(delta) < 6) return;
      previousY = currentY;

      if (navExpanded || menu.current?.contains(document.activeElement)) {
        setMobileNavVisible(true);
        return;
      }
      setMobileNavVisible(currentY < 80 || delta < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navExpanded]);

  const jump = (id: string) => {
    setNavExpanded(false);
    scrollToSection(id);
  };
  const label =
    active === "achievements" && mode === "mgmt"
      ? "Campus life"
      : (SECTIONS.find((s) => s.id === active)?.label ?? "Introduction");
  const visibleSections = SECTIONS.filter(
    (section) =>
      (section.id !== "projects" ||
        CONTENT[mode === "mgmt" ? "mgmt" : "eng"].projects.length > 0) &&
      (section.id !== "goals" || mode === "mgmt") &&
      (section.id !== "reflections" || mode === "mgmt") &&
      (section.id !== "development" || mode === "mgmt") &&
      (section.id !== "evaluation" || mode === "mgmt"),
  ).map((section) =>
    section.id === "achievements" && mode === "mgmt"
      ? { ...section, label: "Campus life" }
      : section.id === "about"
        ? { ...section, label: "Introduction" }
        : section.id === "education"
          ? { ...section, label: "Educational Background" }
          : section.id === "projects"
            ? { ...section, label: "Projects and achievements" }
            : section,
  );
  return (
    <>
      <header
        className={`portfolio-header fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border px-5 sm:px-8 lg:px-[5vw] ${mode === "neutral" && active === "hero" ? "portfolio-header-cover" : ""}`}
      >
        <Button
          variant="ghost"
          className="h-11 rounded-none px-0 font-grotesk text-sm hover:bg-transparent"
          onClick={() => {
            setMode("neutral");
            jump("hero");
          }}
          aria-label={`${PERSON.name}, back to introduction`}
        >
          <span className="font-medium">
            B Harisanth Krishna<span className="text-signal">.</span>
          </span>
        </Button>
        <div className="flex shrink-0 items-center gap-1 sm:gap-4">
          <div
            role="group"
            aria-label="Choose portfolio"
            className="flex border border-border"
          >
            {(["eng", "mgmt"] as const).map((m) => (
              <Button
                key={m}
                variant="ghost"
                aria-pressed={mode === m}
                aria-label={
                  m === "eng" ? "View B.Tech portfolio" : "View PGDM portfolio"
                }
                onClick={() => setMode(m)}
                className={`h-11 rounded-none px-3 font-mono text-[11px] ${mode === m ? "bg-foreground text-background hover:bg-foreground hover:text-background" : "text-muted-foreground"}`}
              >
                {m === "eng" ? "B.Tech" : "PGDM"}
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-11 rounded-none"
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            title={theme === "dark" ? "Light theme" : "Dark theme"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </header>
      <nav
        aria-label="Portfolio sections"
        className="portfolio-desktop-index fixed bottom-10 left-[5vw] z-40 hidden w-44 lg:block"
      >
        <p className="t-meta mb-4 text-muted-foreground">
          Index / {mode === "mgmt" ? "02" : "01"}
        </p>
        {visibleSections.map((section, index) => {
          const Icon = sectionIcon(section.id, mode);
          return (
            <Button
              variant="ghost"
              key={section.id}
              onClick={() => jump(section.id)}
              aria-current={active === section.id ? "location" : undefined}
              className={`group flex h-11 w-full justify-start gap-3 rounded-none px-0 text-xs hover:bg-transparent ${active === section.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <span
                className={`h-px transition-all duration-500 ${active === section.id ? "w-5 bg-signal" : "w-2 bg-border group-hover:w-5"}`}
              />
              <Icon
                aria-hidden="true"
                size={15}
                strokeWidth={1.5}
                className={
                  active === section.id
                    ? "text-signal"
                    : "text-muted-foreground/70 group-hover:text-foreground"
                }
              />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="desktop-index-label">
                {section.id === "achievements" && mode === "mgmt"
                  ? "Campus life"
                  : DESKTOP_SECTION_LABELS[section.id]}
              </span>
            </Button>
          );
        })}
      </nav>
      <div
        ref={menu}
        data-hidden={
          !navExpanded && (active === "hero" || !mobileNavVisible)
            ? "true"
            : undefined
        }
        onFocusCapture={() => setMobileNavVisible(true)}
        className="portfolio-mobile-index fixed inset-x-5 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 sm:inset-x-8 lg:hidden"
      >
        {navExpanded && (
          <nav
            id="mobile-sections"
            aria-label="Mobile portfolio sections"
            className="mb-2 grid grid-cols-2 border border-border bg-background p-3 shadow-lg"
          >
            {visibleSections.map((section, i) => {
              const Icon = sectionIcon(section.id, mode);
              return (
                <Button
                  key={section.id}
                  variant="ghost"
                  onClick={() => jump(section.id)}
                  aria-current={active === section.id ? "location" : undefined}
                  className={`h-12 justify-start rounded-none ${active === section.id ? "text-signal" : "text-foreground"}`}
                >
                  <span className="t-meta text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    aria-hidden="true"
                    size={16}
                    strokeWidth={1.5}
                    className={
                      active === section.id
                        ? "text-signal"
                        : "text-muted-foreground"
                    }
                  />
                  {section.label}
                  <ArrowUpRight className="ml-auto" />
                </Button>
              );
            })}
          </nav>
        )}
        <Button
          variant="outline"
          aria-expanded={navExpanded}
          aria-controls={navExpanded ? "mobile-sections" : undefined}
          onClick={() => {
            setMobileNavVisible(true);
            setNavExpanded(!navExpanded);
          }}
          className="portfolio-header h-12 w-full justify-between rounded-none px-4"
        >
          <span className="t-meta text-muted-foreground">Index</span>
          <span>{label}</span>
          {navExpanded ? <X /> : <ChevronDown />}
        </Button>
      </div>
    </>
  );
}

