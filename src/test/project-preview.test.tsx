import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ProjectPreview } from "@/components/portfolio/ProjectPreview";
import { CONTENT } from "@/lib/portfolio-data";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it("restores project trigger focus and prior reading position after closing", async () => {
  const project = CONTENT.mgmt.projects[0];
  if (!project) throw new Error("Missing supplied study");
  vi.spyOn(window, "scrollY", "get").mockReturnValue(620);
  const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  render(<ProjectPreview project={project} />);
  const trigger = screen.getByRole("button", { name: `Preview ${project.title}` });
  fireEvent.click(trigger);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Close" }));
  await waitFor(() => expect(document.activeElement).toBe(trigger));
  expect(scroll).toHaveBeenCalledWith({ top: 620, behavior: "instant" });
});

