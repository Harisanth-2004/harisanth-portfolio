import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PortfolioProvider, scrollToSection, usePortfolio } from "@/components/portfolio/state";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

function Controls() {
  const { mode, theme, setMode, toggleTheme } = usePortfolio();
  return (
    <>
      <output data-testid="state">
        {mode}/{theme}
      </output>
      <button onClick={() => setMode("eng")}>Engineering</button>
      <button onClick={() => setMode("mgmt")}>Management</button>
      <button onClick={toggleTheme}>Theme</button>
    </>
  );
}

describe("Independent portfolio switches", () => {
  it("supports all four identities and themes without changing identity during theme switching", () => {
    document.documentElement.classList.remove("dark");
    document.documentElement.dataset["mode"] = "neutral";
    vi.spyOn(window, "scrollBy").mockImplementation(() => {});
    render(
      <PortfolioProvider>
        <Controls />
      </PortfolioProvider>,
    );
    fireEvent.click(screen.getByText("Engineering"));
    expect(screen.getByTestId("state")).toHaveTextContent("eng/light");
    fireEvent.click(screen.getByText("Theme"));
    expect(screen.getByTestId("state")).toHaveTextContent("eng/dark");
    fireEvent.click(screen.getByText("Management"));
    expect(screen.getByTestId("state")).toHaveTextContent("mgmt/dark");
    fireEvent.click(screen.getByText("Theme"));
    expect(screen.getByTestId("state")).toHaveTextContent("mgmt/light");
    expect(document.documentElement.dataset["mode"]).toBe("mgmt");
  });

  it("settles rapid identity choices on the latest identity without remounting", () => {
    document.documentElement.dataset["mode"] = "neutral";
    function Persistent() {
      return <Controls />;
    }
    render(
      <PortfolioProvider>
        <Persistent />
      </PortfolioProvider>,
    );
    const output = screen.getByTestId("state");
    act(() => {
      fireEvent.click(screen.getByText("Engineering"));
      fireEvent.click(screen.getByText("Management"));
      fireEvent.click(screen.getByText("Engineering"));
    });
    expect(document.documentElement.dataset["mode"]).toBe("eng");
    expect(screen.getByTestId("state")).toBe(output);
  });

  it("starts in PGDM while retaining the early initialized theme", () => {
    document.documentElement.dataset["mode"] = "eng";
    document.documentElement.classList.add("dark");
    render(
      <PortfolioProvider>
        <Controls />
      </PortfolioProvider>,
    );
    expect(screen.getByTestId("state")).toHaveTextContent("mgmt/dark");
    expect(document.documentElement.dataset["mode"]).toBe("mgmt");
  });

  it("preserves the reading offset after the identity typography changes", () => {
    document.documentElement.dataset["mode"] = "neutral";
    render(
      <PortfolioProvider>
        <Controls />
        <section id="reading" />
      </PortfolioProvider>,
    );
    const section = document.getElementById("reading");
    if (!section) throw new Error("Missing reading section");
    vi.spyOn(section, "getBoundingClientRect")
      .mockReturnValueOnce({ top: -210, height: 1000 } as DOMRect)
      .mockReturnValue({ top: 190, height: 1100 } as DOMRect);
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    fireEvent.click(screen.getByText("Engineering"));
    expect(scroll).toHaveBeenCalledWith({ top: 400, behavior: "instant" });
  });

  it("cancels stale delayed focus when the user jumps again", () => {
    vi.useFakeTimers();
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: false } as MediaQueryList);
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <>
        <section id="first">
          <h2 tabIndex={-1} data-section-title>
            First
          </h2>
        </section>
        <section id="last">
          <h2 tabIndex={-1} data-section-title>
            Last
          </h2>
        </section>
      </>,
    );
    scrollToSection("first");
    vi.advanceTimersByTime(100);
    scrollToSection("last");
    vi.advanceTimersByTime(400);
    expect(document.activeElement).toBe(screen.getByText("Last"));
  });
});

