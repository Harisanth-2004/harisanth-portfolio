import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CONTENT, PERSON, type Mode, type SectionId } from "@/lib/portfolio-data";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { ProjectPreview } from "./ProjectPreview";
import { ExperienceDetails } from "./ExperienceDetails";
import { scrollToSection, usePortfolio } from "./state";
import tarangPhoto from "@/assets/tarang-team.jpeg";

function CircuitMark({ variant }: { variant: number }) {
  const paths = [
    ["M2 27H25V9H52V22H91", "M52 9V2H75", "M25 27V36H43"],
    ["M2 9H39V27H67V14H91", "M39 27V36H19", "M67 14V2H81"],
    ["M2 20H22V7H48V30H91", "M22 20V36H43", "M48 7V2H68"],
  ][variant % 3] ?? [];
  return (
    <svg aria-hidden="true" viewBox="0 0 94 38" className="section-circuit" fill="none">
      {paths.map((path) => (
        <path key={path} d={path} />
      ))}
      <circle cx={variant % 2 ? 39 : 25} cy={variant % 2 ? 27 : 27} r="2.5" />
      <circle cx={variant % 2 ? 67 : 52} cy={variant % 2 ? 14 : 22} r="2.5" />
    </svg>
  );
}

function StrategyMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 94 38" className="section-strategy" fill="none">
      <path d="M3 27C17 27 18 9 34 9s18 20 32 20S83 12 91 12" />
      <circle cx="3" cy="27" r="2.5" />
      <circle cx="34" cy="9" r="3.5" />
      <circle cx="66" cy="29" r="2.5" />
      <circle cx="91" cy="12" r="2.5" />
    </svg>
  );
}

function Section({
  id,
  number,
  title,
  children,
}: {
  id: SectionId;
  number: string;
  title: string;
  children: ReactNode;
}) {
  const { mode } = usePortfolio();
  const variant = Number(number) || 0;
  return (
    <section id={id} className="portfolio-section border-t border-border">
      <div className={`section-top ${mode === "eng" ? "section-top-engineering" : "section-top-management"}`} data-reveal>
        <span className="t-meta pt-2 text-signal">{number} /</span>
        <h2 data-section-title tabIndex={-1} className="t-section outline-none">
          {title}
          <span className="text-signal">.</span>
        </h2>
        {mode === "eng" && <CircuitMark variant={variant} />}
        {mode === "mgmt" && <StrategyMark />}
      </div>
      {children}
    </section>
  );
}

export function Sections() {
  const { mode, ready } = usePortfolio();
  const selected: Mode = mode === "mgmt" ? "mgmt" : "eng";
  const c = CONTENT[selected];
  const root = useRef<HTMLDivElement>(null);
  // Independent disclosure state survives identity changes.
  const [expanded, setExpanded] = useState<Record<Mode, string[]>>({ eng: [], mgmt: [] });

  useEffect(() => {
    if (!ready || !root.current) return;
    const media = gsap.matchMedia();
    media.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      () => {
        if (prefersReducedMotion()) return;
        const context = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
            if (element.getBoundingClientRect().top < window.innerHeight) return;
            gsap.fromTo(
              element,
              { y: 8 },
              {
                y: 0,
                duration: 0.24,
                ease: "power2.out",
                clearProps: "transform",
                scrollTrigger: { trigger: element, start: "top 96%", once: true },
              },
            );
          });
        }, root);
        return () => context.revert();
      },
    );
    return () => media.revert();
  }, [ready]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [mode, expanded]);

  return (
    <div ref={root} className="portfolio-content">
      <div className="contents-sheet border-t border-border py-12 sm:py-16">
        <div className="flex items-center justify-between gap-4">
          <span className="t-meta text-muted-foreground">Selected perspective / {c.label}</span>
          <Button variant="ghost" className="h-11 rounded-none px-0 text-xs" onClick={() => scrollToSection("about")}>
            Begin <ArrowDown />
          </Button>
        </div>
        <h2 className="contents-title font-grotesk font-semibold">CONTENTS</h2>
        <nav aria-label="Contents" className="contents-links">
          {([
            ["01", "About me", "about"], ["02", "Career timeline", "experience"],
            ["03", "Education", "education"], ["04", "Selected work", "projects"],
            ["05", "What I bring", "skills"], ["06", "Credentials", "certifications"],
            ["07", "Achievements", "achievements"], ["08", "Contact", "contact"],
          ] as const).map(([number, title, id]) => (
            <button key={id} onClick={() => scrollToSection(id)} className="contents-link group">
              <span>{number}.</span><span>{title}</span><span className="contents-page">↘</span>
            </button>
          ))}
        </nav>
      </div>
      <Section id="about" number="01" title="About me">
        <div className="about-grid" data-reveal>
          <p className="t-lede max-w-[40ch]">{c.about.lede}</p>
          <div className="space-y-6">
            {c.about.body.map((p) => (
              <p key={p} className="t-body text-muted-foreground">
                {p}
              </p>
            ))}
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-6">
              {c.about.facts.map((fact) => (
                <div key={fact.k}>
                  <dt className="t-meta mb-2 text-muted-foreground">{fact.k}</dt>
                  <dd className="text-sm">{fact.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <p className="t-meta mt-12 text-muted-foreground">
          {PERSON.location} <span className="mx-3 text-signal">↗</span> {c.code}
        </p>
      </Section>
      <Section id="education" number="02" title="The foundation">
        <div>
          {c.education.map((item, i) => (
            <article
              key={item.degree}
              data-reveal
              className="education-row border border-border bg-surface/40 px-5 py-6 sm:px-6 sm:py-8"
            >
              <span className="t-meta text-muted-foreground">{item.period}</span>
              <div>
                <h3 className="t-title max-w-[32ch]">{item.degree}</h3>
                <p className="t-body mt-3 text-muted-foreground">{item.institution}</p>
                {item.note && <p className="t-caption mt-2">{item.note}</p>}
              </div>
              <span className="t-meta hidden text-signal sm:block">
                {String(i + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
      </Section>
      <Section id="experience" number="03" title="In practice">
        <Accordion
          type="multiple"
          value={expanded[selected]}
          onValueChange={(value) => setExpanded((prev) => ({ ...prev, [selected]: value }))}
          className="experience-list grid gap-3"
        >
          {c.experience.map((item) => (
            <AccordionItem key={`${selected}-${item.id}`} value={item.id} className="experience-card">
              <AccordionTrigger className="experience-trigger gap-5 py-7 hover:no-underline">
                <span className="experience-summary flex-1">
                  <span className="t-meta text-muted-foreground">{item.date}</span>
                  <span>
                    <span className="t-title block">{item.title}</span>
                    <span className="mt-2 block text-sm text-signal">{item.org}</span>
                    <span className="t-body mt-3 block font-normal text-muted-foreground">
                      {item.summary}
                    </span>
                  </span>
                </span>
              </AccordionTrigger>
              <ExperienceDetails open={expanded[selected].includes(item.id)}>
                {item.location && (
                  <p className="t-meta mb-5 text-muted-foreground">{item.location}</p>
                )}
                <ul className="space-y-3">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex gap-4 text-sm leading-relaxed">
                      <span className="text-signal" aria-hidden>
                        —
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                {item.reflection && (
                  <p className="t-body mt-6 border-l border-signal pl-5 italic text-muted-foreground">
                    {item.reflection}
                  </p>
                )}
              </ExperienceDetails>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
      <Section id="projects" number="04" title="Selected work">
        {c.projects.map((project, i) => (
          <article
            key={project.id}
            className="project-row grid gap-8 border border-border bg-surface/40 p-5 sm:p-7 md:grid-cols-[1fr_1.3fr]"
            data-reveal
          >
            <div>
              <p className="t-meta mb-6 text-signal">P / {String(i + 1).padStart(2, "0")}</p>
              <h3 className="t-title max-w-[26ch]">{project.title}</h3>
              <p className="t-meta mt-4 text-muted-foreground">{project.kind}</p>
              <ProjectPreview project={project} />
            </div>
            <div>
              <p className="t-body text-muted-foreground">{project.summary}</p>
              <ol className="mt-6 space-y-3">
                {project.points.map((point, n) => (
                  <li key={point} className="flex gap-4 border-t border-border pt-3 text-sm">
                    <span className="t-meta text-signal">{String(n + 1).padStart(2, "0")}</span>
                    {point}
                  </li>
                ))}
              </ol>
            </div>
          </article>
        ))}
      </Section>
      <Section id="skills" number="05" title="The toolkit">
        <div className="grid gap-x-12 md:grid-cols-2">
          {c.skills.map((group, i) => (
            <article key={group.group} className="border-t border-border py-8" data-reveal>
              <p className="t-meta mb-5 text-signal">
                {String(i + 1).padStart(2, "0")} / {group.group}
              </p>
              <ul className="space-y-2">
                {group.items.map((skill) => (
                  <li key={skill} className="font-display text-xl leading-relaxed">
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
      <Section id="certifications" number="06" title="Credentials">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="t-meta text-muted-foreground">
            {c.code} / {String(c.certifications.length).padStart(2, "0")} credentials
          </p>
          <a
            href={`https://${PERSON.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="link-u inline-flex min-h-11 items-center gap-1 text-sm"
          >
            LinkedIn profile <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        <div className="credentials-list">
        {c.certifications.map((cert, index) => (
          <article
            key={cert.name}
            className="credential-row"
            data-reveal
          >
            <span className="credential-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="t-title">{cert.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{cert.issuer}</p>
            </div>
            <div className="credential-meta">
              {cert.issued && <span>{cert.issued}</span>}
              {cert.note && <span>{cert.note}</span>}
            </div>
          </article>
        ))}
        </div>
      </Section>
      <Section id="achievements" number="07" title="A few milestones">
        {selected === "mgmt" && (
          <figure className="tarang-feature mb-8 grid overflow-hidden border border-border bg-surface/50 md:grid-cols-[1.45fr_.55fr]" data-reveal>
            <div className="tarang-photo overflow-hidden">
              <img
                src={tarangPhoto}
                alt="Harisanth and fellow participants in front of the Tarang mural"
                width={960}
                height={1280}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="tarang-caption flex flex-col justify-between gap-10 p-5 sm:p-7 lg:p-8">
              <span className="t-meta text-signal">Field note / PGDM</span>
              <div>
                <h3 className="font-grotesk text-3xl font-semibold tracking-tight sm:text-4xl">Tarang<span className="text-signal">.</span></h3>
                <p className="t-body mt-3 text-muted-foreground">A moment from the event.</p>
              </div>
              <p className="t-meta border-t border-border pt-4 text-muted-foreground">Kattangal, Kerala <span className="mx-2 text-signal">/</span> 09 Oct 2026</p>
            </figcaption>
          </figure>
        )}
        <div className="milestones-grid grid gap-x-10 md:grid-cols-2">
          {c.achievements.map((item) => (
            <article key={item.label} className="milestone-card border border-border bg-surface/40 p-5 sm:p-6" data-reveal>
              {item.value !== undefined && (
                <p className="milestone-value font-display text-signal">
                  {item.prefix}
                  {item.value.toLocaleString("en-US")}
                  {item.suffix}
                </p>
              )}
              <h3 className="mt-5 text-base font-medium">{item.label}</h3>
              <p className="t-body mt-3 text-muted-foreground">{item.context}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section id="contact" number="08" title="Let’s connect">
        <div data-reveal>
          <p className="t-lede max-w-[34ch]">
            Engineering, management, and the interesting space in between.
          </p>
          <a
            href={`mailto:${PERSON.email}`}
            className="contact-email link-u mt-10 inline-flex max-w-full flex-wrap items-center gap-3 font-display text-signal"
          >
            {PERSON.email}
            <ArrowUpRight className="size-6 shrink-0" />
          </a>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="t-meta mb-3 text-muted-foreground">Find me</p>
              <a
                href={`https://${PERSON.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-u inline-flex min-h-11 items-center gap-2 text-sm"
              >
                LinkedIn <ArrowUpRight className="size-4" />
              </a>
              <p className="t-caption mt-3">{PERSON.location}</p>
            </div>
            <div>
              <p className="t-meta mb-3 text-muted-foreground">Call</p>
              {PERSON.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replaceAll(" ", "")}`}
                  className="block min-h-11 text-sm"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border pb-24 pt-8 lg:pb-8">
        <p className="t-meta text-muted-foreground">B Harisanth Krishna / {c.code}</p>
        <Button
          variant="ghost"
          className="h-11 rounded-none px-0"
          onClick={() => scrollToSection("hero")}
        >
          Back to top <ArrowUpRight />
        </Button>
      </footer>
    </div>
  );
}

