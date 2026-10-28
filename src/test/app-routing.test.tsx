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
    expect(screen.getByText("Power BI for Beginners")).toBeInTheDocument();
    fireEvent.click(btech);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Electrical & Electronics Engineering/,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Design and Simulation of a Field-Oriented PMSM Drive for Electric Bike Applications",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/report pending/i)).not.toBeInTheDocument();
    expect(screen.queryByText("Power BI for Beginners")).not.toBeInTheDocument();
    expect(screen.getByText("Unmanned Aerial Vehicle Technology")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Career goals/ }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "View report" }));
    expect(
      screen.getByTitle(
        "Project report: Design and Simulation of a Field-Oriented PMSM Drive for Electric Bike Applications",
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
    expect(
      screen.getByRole("heading", { name: /Prakalp — Best Departmental Project/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/receiving the Prakalp Best Departmental Project award/i),
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
        /PGDM student learning how customer and market insight/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/With a growing interest in marketing/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Prakalp — Best Departmental Project/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /PGDM at MBS/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/At the end of my three-month placement/),
    ).toBeInTheDocument();
    const reflectionImage = screen.getByAltText(/final pre-PGDM presentation/i);
    expect(reflectionImage).toBeInTheDocument();
    const marketingInternship = screen
      .getByText("Marketing Intern")
      .closest("button");
    expect(marketingInternship).not.toBeNull();
    fireEvent.click(marketingInternship as HTMLButtonElement);
    expect(reflectionImage).toBeInTheDocument();
    expect(screen.queryByText("What happened")).not.toBeInTheDocument();
    expect(screen.queryByText("My response")).not.toBeInTheDocument();
    expect(screen.queryByText("The connection")).not.toBeInTheDocument();
    expect(screen.queryByText("What I learned")).not.toBeInTheDocument();
    expect(screen.queryByText("Next time")).not.toBeInTheDocument();
    expect(screen.getByText(/present its work in only a few minutes/i)).toBeInTheDocument();
    expect(
      screen.getByText("Project Management Foundations"),
    ).toBeInTheDocument();
    const reflectionToggle = screen.getByRole("button", { name: "Read reflection" });
    expect(reflectionToggle.closest("figure")).toBeNull();
    expect(reflectionToggle.closest("[data-tarang-reflection]")).toBeInTheDocument();
    expect(screen.queryByText(/Tarang had several rounds/)).not.toBeInTheDocument();
    fireEvent.click(reflectionToggle);
    expect(screen.getByText(/Tarang had several rounds/)).toBeInTheDocument();
    expect(screen.getByText(/We were eliminated after that round/)).toBeInTheDocument();
    expect(screen.getByAltText(/gravity-sorter prototype built by the team/i)).toBeInTheDocument();
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
    expect(screen.getByRole("link", { name: "official.harisanth@gmail.com" })).toHaveAttribute("href", "mailto:official.harisanth@gmail.com");
    expect(screen.getByRole("link", { name: /\+91 9447250868/ })).toHaveAttribute("href", "tel:+919447250868");
    expect(screen.queryByText(/not an official/i)).not.toBeInTheDocument();
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
      screen.getByText(/Apply PGDM concepts to current work/i),
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
    ]) {
      expect(document.querySelector(`#${sectionId} [data-section-title]`)).toBeInTheDocument();
    }
    expect(document.querySelector("#evaluation")).not.toBeInTheDocument();
    expect(screen.queryByText(/Evaluation Rubric/)).not.toBeInTheDocument();
    expect(screen.queryByText("Evidence:")).not.toBeInTheDocument();
    expect(screen.getByText(/Practise research and analysis through coursework/)).toBeInTheDocument();
    expect(screen.getByText(/defined responsibilities in academic or club work/)).toBeInTheDocument();
    expect(screen.queryByText(/Chennai and Bengaluru field survey/)).not.toBeInTheDocument();
    expect(screen.queryByText(/The toolkit/)).not.toBeInTheDocument();
  }, 10000);
});

