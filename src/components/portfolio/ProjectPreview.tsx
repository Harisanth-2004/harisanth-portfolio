import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project } from "@/lib/portfolio-data";

export function ProjectPreview({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const scroll = useRef(0);
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) scroll.current = window.scrollY;
        setOpen(next);
      }}
    >
      <DialogTrigger asChild>
        <Button
          ref={trigger}
          variant="outline"
          aria-pressed={open}
          aria-label={`Preview ${project.title}`}
          className="mt-6 min-h-11 rounded-none gap-3 border-border"
        >
          {project.placeholder ? "View pending details" : "Preview study"}
          <ArrowUpRight className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="project-dialog max-h-[85svh] w-[calc(100%-2rem)] overflow-y-auto rounded-none p-6 pt-16 sm:p-8 sm:pt-16"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          window.scrollTo({ top: scroll.current, behavior: "instant" });
          trigger.current?.focus({ preventScroll: true });
        }}
      >
        <p className="t-meta text-signal">{project.kind}</p>
        <DialogTitle className="t-title leading-snug">{project.title}</DialogTitle>
        <DialogDescription className="t-body">{project.summary}</DialogDescription>
        {project.placeholder && (
          <p className="t-caption">Details pending — not a completed project preview.</p>
        )}
        <ol className="mt-2 space-y-4">
          {project.points.map((point, index) => (
            <li
              key={point}
              className="flex gap-4 border-t border-border pt-4 text-sm leading-relaxed"
            >
              <span className="t-meta text-signal">{String(index + 1).padStart(2, "0")}</span>
              <span>{point}</span>
            </li>
          ))}
        </ol>
      </DialogContent>
    </Dialog>
  );
}
