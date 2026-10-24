import { useLayoutEffect, useRef, type ReactNode } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { gsap } from "@/lib/motion";

/** Keep Radix semantics while animating from the actual interrupted height. */
export function ExperienceDetails({ open, children }: { open: boolean; children: ReactNode }) {
  const region = useRef<HTMLDivElement>(null);
  const initial = useRef(true);
  useLayoutEffect(() => {
    const element = region.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        gsap.killTweensOf(element);
        const height = element.hidden ? 0 : element.getBoundingClientRect().height;
        element.hidden = false;
        if (context.conditions?.["reduce"] || initial.current) {
          gsap.set(element, { height: open ? "auto" : 0, opacity: open ? 1 : 0 });
          element.hidden = !open;
        } else {
          gsap.fromTo(
            element,
            { height },
            {
              height: open ? "auto" : 0,
              opacity: open ? 1 : 0,
              duration: 0.2,
              ease: "power2.out",
              overwrite: true,
              onComplete: () => {
                if (open) gsap.set(element, { height: "auto" });
                element.hidden = !open;
              },
            },
          );
        }
        initial.current = false;
        // Do not revert height on interruption: the next tween starts here.
        return () => {
          gsap.killTweensOf(element);
        };
      },
    );
    return () => media.kill(false);
  }, [open]);
  return (
    <AccordionPrimitive.Content forceMount asChild>
      <div
        ref={region}
        inert={!open}
        aria-hidden={!open}
        className="experience-region overflow-hidden text-sm"
      >
        <div className="experience-details pb-8">{children}</div>
      </div>
    </AccordionPrimitive.Content>
  );
}

