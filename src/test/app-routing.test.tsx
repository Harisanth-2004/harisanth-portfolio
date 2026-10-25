import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/App";

describe("Portfolio homepage", () => {
  it("renders the introduction and switches between both portfolios", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Electrical & Electronics Engineering/,
      }),
    ).toBeInTheDocument();
    const theme = screen.getByRole("button", { name: "Switch to dark theme" });
    fireEvent.click(theme);
    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement).toHaveAttribute(
      "data-theme-transitioning",
      "true",
    );
    const btech = screen.getByRole("button", {
      name: /view b\.tech portfolio/i,
    });
    const pgdm = screen.getByRole("button", { name: /view pgdm portfolio/i });
    expect(btech).toHaveAttribute("aria-pressed", "true");
    expect(pgdm).toHaveAttribute("aria-pressed", "false");
    expect(
      screen.getByText("Introduction to Soft Computing"),
    ).toBeInTheDocument();
    expect(screen.getByText("Linguaskill")).toBeInTheDocument();
    expect(
      screen.queryByAltText(/Linguaskill certificate/i),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        /electrical and electronics engineer shaped by technical events/i,
      ),
    ).toBeInTheDocument();
    const linguaskill = screen.getByText("Linguaskill").closest("article");
    expect(linguaskill).not.toBeNull();
    fireEvent.click(
      within(linguaskill as HTMLElement).getByRole("button", {
        name: "Show credential",
      }),
    );
    expect(screen.getByAltText(/Linguaskill certificate/i)).toBeInTheDocument();
    fireEvent.click(
      within(linguaskill as HTMLElement).getByRole("button", {
        name: "Hide credential",
      }),
    );
    expect(
      screen.queryByAltText(/Linguaskill certificate/i),
    ).not.toBeInTheDocument();
    fireEvent.click(pgdm);
    expect(
      screen.queryByText(
        /electrical and electronics engineer shaped by technical events/i,
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByAltText(/Linguaskill certificate/i),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        /PGDM student at Muthoot Business School exploring the intersection/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /PGDM at MBS/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Project Management Foundations"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Certifications/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByAltText(/Marketing Management I certificate/i),
    ).not.toBeInTheDocument();
    const marketingCredential = screen
      .getByText("Marketing Management I")
      .closest("article");
    expect(marketingCredential).not.toBeNull();
    fireEvent.click(
      within(marketingCredential as HTMLElement).getByRole("button", {
        name: "Show credential",
      }),
    );
    expect(
      screen.getByAltText(/Marketing Management I certificate/i),
    ).toBeInTheDocument();
    expect(pgdm).toHaveAttribute("aria-pressed", "true");
    expect(btech).toHaveAttribute("aria-pressed", "false");
  });
});
