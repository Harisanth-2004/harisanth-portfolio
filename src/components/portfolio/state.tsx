import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Mode, SectionId } from "@/lib/portfolio-data";

export type ViewMode = "neutral" | Mode;
export type Theme = "light" | "dark";
export type ActiveId = SectionId | "hero";

type Ctx = {
  mode: ViewMode;
  setMode: (m: ViewMode) => void;
  theme: Theme;
  toggleTheme: () => void;
  ready: boolean;
  active: ActiveId;
  setActive: (id: ActiveId) => void;
  navExpanded: boolean;
  setNavExpanded: (v: boolean) => void;
};

const PortfolioContext = createContext<Ctx | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ViewMode>("neutral");
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<ActiveId>("hero");
  const [navExpanded, setNavExpanded] = useState(false);
  const reading = useRef<{ element: HTMLElement; offset: number } | null>(null);
  const currentMode = useRef<ViewMode>("neutral");

  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.classList.contains("dark") ? "dark" : "light");
    const stored = root.dataset["mode"];
    if (stored === "eng" || stored === "mgmt") {
      currentMode.current = stored;
      setModeState(stored);
    }
    setReady(true);
  }, []);

  const setMode = useCallback((m: ViewMode) => {
    if (currentMode.current === m) return;
    // Preserve the section-relative reading position when content heights change.
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    const anchor = m === "neutral" ? undefined : sections
      .map((element) => ({ element, top: element.getBoundingClientRect().top }))
      .filter(({ top }) => top <= 90)
      .at(-1);
    if (!reading.current && anchor && anchor.element.id !== "hero") {
      reading.current = {
        element: anchor.element,
        offset: Math.max(0, 90 - anchor.top),
      };
    }
    currentMode.current = m;
    setModeState(m);
    try {
      if (m === "neutral") localStorage.removeItem("bhk-mode");
      else localStorage.setItem("bhk-mode", m);
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;
    document.documentElement.dataset["mode"] = mode;
    const snapshot = reading.current;
    reading.current = null;
    if (!snapshot) return;
    const rect = snapshot.element.getBoundingClientRect();
    const offset = Math.min(snapshot.offset, Math.max(0, rect.height - 120));
    window.scrollTo({ top: window.scrollY + rect.top + offset - 90, behavior: "instant" });
  }, [mode, ready]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("bhk-theme", next);
      } catch {
        /* Theme still works without storage. */
      }
      return next;
    });
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        mode,
        setMode,
        theme,
        toggleTheme,
        ready,
        active,
        setActive,
        navExpanded,
        setNavExpanded,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used inside PortfolioProvider");
  return ctx;
}

let focusTimer: ReturnType<typeof setTimeout> | undefined;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heading = el.querySelector<HTMLElement>("[data-section-title]");
  clearTimeout(focusTimer);
  heading?.focus({ preventScroll: true });
  // Explicit coordinates avoid transformed reveal elements changing jump targets.
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 80,
    behavior: reduce ? "instant" : "smooth",
  });
  focusTimer = setTimeout(() => heading?.focus({ preventScroll: true }), reduce ? 0 : 400);
}

