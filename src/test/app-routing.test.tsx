import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/App";

describe("Portfolio homepage", () => {
  it("starts in PGDM and switches between both portfolios", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: /PGDM at MBS/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 1, name: /Portfolio/ }),
    ).not.toBeInTheDocument();
    const btech = screen.getByRole("button", {
      name: /view b\.tech portfolio/i,
    });
    const pgdm = screen.getByRole("button", { name: /view pgdm portfolio/i });
    expect(btech).toHaveAttribute("aria-pressed", "false");
    expect(pgdm).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement).toHaveAttribute("data-mode", "mgmt");
    expect(
      screen.getByRole("heading", { name: /Career goals/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("IEDC at MBS")).toBeInTheDocument();
    fireEvent.click(btech);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Electrical & Electronics Engineering/,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Field-Oriented Control for a PMSM Electric Bike",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/report pending/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Career goals/ }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "View report" }));
    expect(
      screen.getByTitle(
        "Project report: Field-Oriented Control for a PMSM Electric Bike",
      ),
    ).toBeInTheDocument();
    const theme = screen.getByRole("button", { name: "Switch to dark theme" });
    fireEvent.click(theme);
    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement).toHaveAttribute(
      "data-theme-transitioning",
      "true",
    );
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
        /electrical and electronics engineer with experience in technical events/i,
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
        /electrical and electronics engineer with experience in technical events/i,
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
      screen.getAllByText(/In the final presentation before PGDM/).length,
    ).toBeGreaterThan(0);
    const reflectionImage = screen.getByAltText(/final pre-PGDM presentation/i);
    expect(reflectionImage).toBeInTheDocument();
    const marketingInternship = screen
      .getByText("Marketing Intern")
      .closest("button");
    expect(marketingInternship).not.toBeNull();
    fireEvent.click(marketingInternship as HTMLButtonElement);
    expect(reflectionImage).toBeInTheDocument();
    expect(screen.getByText("What happened")).toBeInTheDocument();
    expect(
      screen.getByText("Project Management Foundations"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Customer Profiling Field Survey" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /This special project was directly under the Managing Director; my day-to-day internship reporting line was the MarCom Chief Manager\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /54 across the Chennai cluster and 50 across the Bengaluru cluster/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Certifications/ }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();
    expect(screen.queryByText(/\+91/)).not.toBeInTheDocument();
    expect(
      document.querySelector(
        'a[href="https://linkedin.com/in/b-harisanth-krishna"]',
      ),
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
    expect(
      screen.getByRole("heading", { name: /Career goals/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("Short-term goals")).toBeInTheDocument();
    expect(screen.getByText("Long-term goals")).toBeInTheDocument();
    expect(
      screen.getByText(/work-integrated role and live projects/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Exploring the introduction of a student-led innovation/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Proposed initiative")).toBeInTheDocument();
    for (const sectionId of [
      "about",
      "education",
      "skills",
      "projects",
      "goals",
      "reflections",
      "development",
      "evaluation",
    ]) {
      expect(document.querySelector(`#${sectionId} [data-section-title]`)).toBeInTheDocument();
    }
    expect(screen.getAllByText("Evidence:").length).toBeGreaterThan(0);
    expect(screen.getByText(/Current work-integrated role/)).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Content Completeness & Organization")).toBeInTheDocument();
    expect(screen.getByText("Progress & Initiative")).toBeInTheDocument();
    expect(screen.getByText("Reflection & Personal Insights")).toBeInTheDocument();
    expect(screen.getByText("Presentation Quality & Communication Skills")).toBeInTheDocument();
    expect(screen.getByText("Visual Appeal & Digital Tools Usage")).toBeInTheDocument();
    expect(screen.getByText("Professionalism & Relevance")).toBeInTheDocument();
    expect(screen.getByText("Weights retained as provided.")).toBeInTheDocument();
    expect(screen.queryByText(/The toolkit/)).not.toBeInTheDocument();
  }, 10000);
});

