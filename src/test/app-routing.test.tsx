import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/App";

describe("Portfolio homepage", () => {
  it("renders the introduction and switches between both portfolios", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    const btech = screen.getByRole("button", { name: /view b\.tech portfolio/i });
    const pgdm = screen.getByRole("button", { name: /view pgdm portfolio/i });
    expect(btech).toHaveAttribute("aria-pressed", "true");
    expect(pgdm).toHaveAttribute("aria-pressed", "false");
    expect(screen.queryByText("Project Management Foundations")).not.toBeInTheDocument();
    expect(screen.getByText(/electrical and electronics engineer shaped by technical events/i)).toBeInTheDocument();
    fireEvent.click(pgdm);
    expect(screen.queryByText(/electrical and electronics engineer shaped by technical events/i)).not.toBeInTheDocument();
    expect(screen.getByText(/PGDM student at Muthoot Business School exploring the intersection/i)).toBeInTheDocument();
    expect(screen.getByText("Project Management Foundations")).toBeInTheDocument();
    expect(pgdm).toHaveAttribute("aria-pressed", "true");
    expect(btech).toHaveAttribute("aria-pressed", "false");
  });
});

