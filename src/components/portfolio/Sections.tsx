import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  CalendarDays,
  Cpu,
  Eye,
  EyeOff,
  FileText,
  FolderOpen,
  GraduationCap,
  Lightbulb,
  Mail,
  Megaphone,
  Phone,
  Target,
  TrendingUp,
  Trophy,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  CONTENT,
  PERSON,
  type Mode,
  type SectionId,
} from "@/lib/portfolio-data";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { ProjectPreview } from "./ProjectPreview";
import { ExperienceDetails } from "./ExperienceDetails";
import { scrollToSection, usePortfolio } from "./state";
import tarangPhoto from "@/assets/tarang-team.jpeg";
import siepEbikePhoto from "@/assets/siep-ebike-team.jpeg";
import yessAudiencePhoto from "@/assets/yess-2024-audience.jpg";
import yessTeamPhoto from "@/assets/yess-2024-technical-team.jpg";
import ksumSelfiePhoto from "@/assets/ksum-iedc-team-selfie.jpg";
import ksumCohortPhoto from "@/assets/ksum-iedc-cohort-jul-2025.jpg";

const CONTENT_ICONS: Record<SectionId, LucideIcon> = {
  about: UserRound,
  education: GraduationCap,
  experience: BriefcaseBusiness,
  goals: Target,
  reflections: Lightbulb,
  development: TrendingUp,
  clubs: UsersRound,
  projects: FolderOpen,
  skills: Lightbulb,
  certifications: Award,
  achievements: Trophy,
  contact: Mail,
};

function contentsIcon(id: SectionId, selected: Mode): LucideIcon {
  if (id === "projects" && selected === "mgmt") return Megaphone;
  if (id === "skills" && selected === "eng") return Cpu;
  if (id === "skills" && selected === "mgmt") return Target;
  return CONTENT_ICONS[id];
}

function CircuitMark({ variant }: { variant: number }) {
  const paths =
    [
      ["M2 27H25V9H52V22H91", "M52 9V2H75", "M25 27V36H43"],
      ["M2 9H39V27H67V14H91", "M39 27V36H19", "M67 14V2H81"],
      ["M2 20H22V7H48V30H91", "M22 20V36H43", "M48 7V2H68"],
    ][variant % 3] ?? [];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 94 38"
      className="section-circuit"
      fill="none"
    >
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
    <svg
      aria-hidden="true"
      viewBox="0 0 94 38"
      className="section-strategy"
      fill="none"
    >
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
      <div
        className={`section-top ${mode === "eng" ? "section-top-engineering" : "section-top-management"}`}
        data-reveal
      >
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
  const internshipReflection = c.experience.find((item) => item.reflection);
  const root = useRef<HTMLDivElement>(null);
  // Independent disclosure state survives identity changes.
  const [expanded, setExpanded] = useState<Record<Mode, string[]>>({
    eng: [],
    mgmt: [],
  });
  const [openCredentials, setOpenCredentials] = useState<
    Record<Mode, string[]>
  >({ eng: [], mgmt: [] });
  const [openReports, setOpenReports] = useState<Record<Mode, string[]>>({
    eng: [],
    mgmt: [],
  });

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
          gsap.utils
            .toArray<HTMLElement>("[data-reveal]")
            .forEach((element) => {
              if (element.getBoundingClientRect().top < window.innerHeight)
                return;
              gsap.fromTo(
                element,
                { y: 8 },
                {
                  y: 0,
                  duration: 0.24,
                  ease: "power2.out",
                  clearProps: "transform",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 96%",
                    once: true,
                  },
                },
              );
            });
        }, root);
        return () => context.revert();
      },
    );
    return () => media.revert();
  }, [mode, ready]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [mode, expanded]);

  // Keep the introductory cover distinct: a portfolio is revealed only after
  // the visitor chooses B.Tech or PGDM.
  if (mode === "neutral") return null;

  const contentLinks: [string, string, SectionId][] = [
    ["01", "Introduction", "about"],
    ["02", "Educational Background", "education"],
    ["03", "Skills", "skills"],
    ["04", "Projects and achievements", "projects"],
  ];
  if (selected === "mgmt") {
    contentLinks.push(
      ["05", "Career Goals", "goals"],
      ["06", "Personal Reflections", "reflections"],
      ["07", "Future Development Plan", "development"],
    );
  } else {
    contentLinks.push(["05", "Achievements", "achievements"]);
  }
  contentLinks.push(
    [selected === "mgmt" ? "08" : "06", "Experience", "experience"],
    [selected === "mgmt" ? "09" : "07", "Club activities", "clubs"],
    [selected === "mgmt" ? "10" : "08", "Certifications", "certifications"],
    ...(selected === "mgmt"
      ? [["11", "Campus life", "achievements"] as [string, string, SectionId]]
      : []),
    [selected === "mgmt" ? "12" : "09", "Contact", "contact"],
  );

  return (
    <div ref={root} className="portfolio-content">
      <div className="contents-sheet border-t border-border py-12 sm:py-16">
        <div className="flex items-center justify-between gap-4">
          <span className="t-meta text-muted-foreground">
            Selected perspective / {c.label}
          </span>
          <Button
            variant="ghost"
            className="h-11 rounded-none px-0 text-xs"
            onClick={() => scrollToSection("about")}
          >
            Begin <ArrowDown />
          </Button>
        </div>
        <h2 className="contents-title font-grotesk font-semibold">CONTENTS</h2>
        <nav aria-label="Contents" className="contents-links">
          {contentLinks
            .filter(([, , id]) => id !== "projects" || c.projects.length > 0)
            .map(([number, title, id]) => {
              const Icon = contentsIcon(id, selected);
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="contents-link group"
                  aria-label={`${number}. ${title}`}
                >
                  <span className="contents-index">{number}.</span>
                  <Icon
                    className="contents-icon"
                    size={18}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <span className="contents-label">{title}</span>
                  <ArrowUpRight
                    className="contents-page"
                    size={14}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
        </nav>
      </div>
      <Section id="about" number="01" title="Introduction">
        <div className="about-grid" data-reveal>
          <p className="t-lede max-w-[40ch]">{c.about.lede}</p>
          <div className="space-y-6">
            {c.about.body.map((p) => (
              <p key={p} className="t-body text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>
        <p className="t-meta mt-12 text-muted-foreground">
          {PERSON.location} <span className="mx-3 text-signal">↗</span> {c.code}
        </p>
      </Section>
      <Section id="education" number="02" title="Educational Background">
        <div>
          {c.education.map((item, i) => (
            <article
              key={item.degree}
              data-reveal
              className="education-row border border-border bg-surface/40 px-5 py-6 sm:px-6 sm:py-8"
            >
              <span className="t-meta text-muted-foreground">
                {item.period}
              </span>
              <div>
                <h3 className="t-title max-w-[32ch]">{item.degree}</h3>
                <p className="t-body mt-3 text-muted-foreground">
                  {item.institution}
                </p>
                {item.note && <p className="t-caption mt-2">{item.note}</p>}
              </div>
              <span className="t-meta hidden text-signal sm:block">
                {String(i + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
      </Section>
      <Section
        id="experience"
        number="03"
        title={
          selected === "eng"
            ? "Industrial internships"
            : "Professional experience"
        }
      >
        <Accordion
          type="multiple"
          value={expanded[selected]}
          onValueChange={(value) =>
            setExpanded((prev) => ({ ...prev, [selected]: value }))
          }
          className="experience-list grid gap-3"
        >
          {c.experience.map((item) => (
            <AccordionItem
              key={`${selected}-${item.id}`}
              value={item.id}
              className="experience-card"
            >
              <AccordionTrigger className="experience-trigger gap-5 py-7 hover:no-underline">
                <span className="experience-summary flex-1">
                  <span className="t-meta text-muted-foreground">
                    {item.date}
                  </span>
                  <span>
                    <span className="t-title block">{item.title}</span>
                    <span className="mt-2 block text-sm text-signal">
                      {item.org}
                    </span>
                    <span className="t-body mt-3 block font-normal text-muted-foreground">
                      {item.summary}
                    </span>
                  </span>
                </span>
              </AccordionTrigger>
              <ExperienceDetails open={expanded[selected].includes(item.id)}>
                {item.location && (
                  <p className="t-meta mb-5 text-muted-foreground">
                    {item.location}
                  </p>
                )}
                <ul className="space-y-3">
                  {item.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-4 text-sm leading-relaxed"
                    >
                      <span className="text-signal" aria-hidden>
                        —
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </ExperienceDetails>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
      <Section id="clubs" number="04" title="Club activities">
        <div className="club-grid grid gap-3 md:grid-cols-2">
          {c.clubs.map((activity, index) => (
            <article
              key={activity.club}
              className="club-card border border-border bg-surface/40 p-5 sm:p-6"
              data-reveal
            >
              <p className="t-meta text-signal">
                {String(index + 1).padStart(2, "0")} / {activity.period}
              </p>
              <h3 className="t-title mt-5">{activity.role}</h3>
              <p className="mt-2 text-sm text-signal">{activity.club}</p>
              <p className="t-body mt-4 text-muted-foreground">
                {activity.summary}
              </p>
            </article>
          ))}
        </div>
        {selected === "eng" && (
          <figure
            className="tarang-feature ksum-feature mt-8 grid overflow-hidden border border-border bg-surface/50 md:grid-cols-[1.45fr_.55fr]"
            data-reveal
          >
            <div className="ksum-gallery overflow-hidden">
              <img
                src={ksumSelfiePhoto}
                alt="IEDC MITS team on an invited innovation tour at Kerala Startup Mission, Calicut"
                width={1280}
                height={960}
                loading="lazy"
                decoding="async"
              />
              <img
                src={ksumCohortPhoto}
                alt="Student group at Kerala Startup Mission, Kochi, during a visit connected to IEEE CORE"
                width={1280}
                height={848}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="tarang-caption flex flex-col justify-between gap-10 p-5 sm:p-7 lg:p-8">
              <span className="t-meta text-signal">
                Field note / IEDC MITS · IEEE
              </span>
              <div>
                <h3 className="font-grotesk text-3xl font-semibold tracking-tight sm:text-4xl">
                  Innovation tours<span className="text-signal">.</span>
                </h3>
                <p className="t-body mt-3 text-muted-foreground">
                  An invited IEDC MITS innovation tour at KSUM Calicut, and a
                  separate KSUM Kochi visit connected with CORE, organised by
                  IEEE.
                </p>
              </div>
              <p className="t-meta border-t border-border pt-4 text-muted-foreground">
                KSUM Calicut <span className="mx-2 text-signal">/</span> KSUM
                Kochi
              </p>
            </figcaption>
          </figure>
        )}
      </Section>
      {c.projects.length > 0 && (
        <Section id="projects" number="05" title="Projects and achievements">
          {c.projects.map((project, i) => (
            <article
              key={project.id}
              className="project-row grid gap-8 border border-border bg-surface/40 p-5 sm:p-7 md:grid-cols-[1fr_1.3fr]"
              data-reveal
            >
              <div>
                <p className="t-meta mb-6 text-signal">
                  P / {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="t-title max-w-[26ch]">{project.title}</h3>
                <p className="t-meta mt-4 text-muted-foreground">
                  {project.kind}
                </p>
                {project.report ? (
                  <div className="mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      aria-expanded={openReports[selected].includes(project.id)}
                      aria-controls={`project-report-${project.id}`}
                      onClick={() =>
                        setOpenReports((previous) => ({
                          ...previous,
                          [selected]: previous[selected].includes(project.id)
                            ? previous[selected].filter(
                                (id) => id !== project.id,
                              )
                            : [...previous[selected], project.id],
                        }))
                      }
                      className="min-h-11 rounded-none"
                    >
                      <FileText size={15} aria-hidden="true" />
                      {openReports[selected].includes(project.id)
                        ? "Hide report"
                        : "View report"}
                    </Button>
                    {openReports[selected].includes(project.id) && (
                      <div
                        id={`project-report-${project.id}`}
                        className="project-report-panel mt-5"
                      >
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                          <span className="t-meta text-muted-foreground">
                            Project report · 84 pages
                          </span>
                          <a
                            href={project.report}
                            target="_blank"
                            rel="noreferrer"
                            className="link-u inline-flex min-h-11 items-center gap-1 text-sm"
                          >
                            Open in a new tab
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </a>
                        </div>
                        <iframe
                          src={`${project.report}#toolbar=1&navpanes=0`}
                          title={`Project report: ${project.title}`}
                          className="project-report-frame"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                ) : project.status ? (
                  <p className="t-caption mt-6 border-l border-signal pl-4">
                    {project.status}
                  </p>
                ) : (
                  <ProjectPreview project={project} />
                )}
              </div>
              <div>
                <p className="t-body text-muted-foreground">
                  {project.summary}
                </p>
                {project.points.length > 0 && (
                  <ol className="mt-6 space-y-3">
                    {project.points.map((point, n) => (
                      <li
                        key={point}
                        className="flex gap-4 border-t border-border pt-3 text-sm"
                      >
                        <span className="t-meta text-signal">
                          {String(n + 1).padStart(2, "0")}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </article>
          ))}
        </Section>
      )}
      <Section id="skills" number="06" title="Skills">
        <div className="grid gap-x-12 md:grid-cols-2">
          {c.skills.map((group, i) => (
            <article
              key={group.group}
              className="border-t border-border py-8"
              data-reveal
            >
              <p className="t-meta mb-5 text-signal">
                {String(i + 1).padStart(2, "0")} / {group.group}
              </p>
              <ul className="space-y-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="font-display text-xl leading-relaxed"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
      <Section id="certifications" number="07" title="Certifications">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="t-meta text-muted-foreground">
            {c.code} / {String(c.certifications.length).padStart(2, "0")}{" "}
            certifications
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
        <div id="credentials-list" className="credentials-list">
          {c.certifications.map((cert, index) => {
            const isOpen = openCredentials[selected].includes(cert.name);
            const imageId = `credential-image-${selected}-${index}`;
            return (
              <article key={cert.name} className="credential-row">
                <span className="credential-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="t-title">{cert.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {cert.issuer}
                  </p>
                </div>
                <div className="credential-meta">
                  {cert.issued && <span>{cert.issued}</span>}
                  {cert.note && <span>{cert.note}</span>}
                  {cert.image ? (
                    <Button
                      type="button"
                      variant="outline"
                      aria-expanded={isOpen}
                      aria-controls={imageId}
                      onClick={() =>
                        setOpenCredentials((previous) => ({
                          ...previous,
                          [selected]: isOpen
                            ? previous[selected].filter(
                                (name) => name !== cert.name,
                              )
                            : [...previous[selected], cert.name],
                        }))
                      }
                      className="credential-toggle min-h-10 rounded-none"
                    >
                      {isOpen ? (
                        <EyeOff size={14} aria-hidden="true" />
                      ) : (
                        <Eye size={14} aria-hidden="true" />
                      )}
                      {isOpen ? "Hide credential" : "Show credential"}
                    </Button>
                  ) : null}
                </div>
                {cert.image && (
                  <div
                    id={imageId}
                    className="credential-image-wrap"
                    hidden={!isOpen}
                  >
                    {isOpen && (
                      <img
                        src={cert.image}
                        alt={`${cert.name} certificate issued by ${cert.issuer}`}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </Section>
      <Section
        id="achievements"
        number="08"
        title={selected === "mgmt" ? "Campus & community" : "A few milestones"}
      >
        {selected === "eng" && (
          <figure
            className="tarang-feature yess-feature mb-8 grid overflow-hidden border border-border bg-surface/50 md:grid-cols-[1.45fr_.55fr]"
            data-reveal
          >
            <div className="yess-gallery overflow-hidden">
              <img
                src={yessAudiencePhoto}
                alt="YESS 2024 participants gathered at the IEEE Kerala Section summit"
                width={1280}
                height={850}
                loading="lazy"
                decoding="async"
              />
              <img
                src={yessTeamPhoto}
                alt="Technical team members at YESS 2024"
                width={800}
                height={1200}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="tarang-caption flex flex-col justify-between gap-10 p-5 sm:p-7 lg:p-8">
              <span className="t-meta text-signal">
                Field note / IEEE Kerala Section
              </span>
              <div>
                <h3 className="font-grotesk text-3xl font-semibold tracking-tight sm:text-4xl">
                  YESS 2024<span className="text-signal">.</span>
                </h3>
                <p className="t-body mt-3 text-muted-foreground">
                  I led the technical team for the summit, which welcomed more
                  than 4,000 participants.
                </p>
              </div>
              <p className="t-meta border-t border-border pt-4 text-muted-foreground">
                MITS <span className="mx-2 text-signal">/</span> IEEE Kerala
                Section
              </p>
            </figcaption>
          </figure>
        )}
        {selected === "mgmt" && (
          <figure
            className="tarang-feature mb-8 grid overflow-hidden border border-border bg-surface/50 md:grid-cols-[1.45fr_.55fr]"
            data-reveal
          >
            <div className="tarang-gallery overflow-hidden">
              <img
                src={tarangPhoto}
                alt="Harisanth and fellow participants in front of the Tarang mural"
                width={960}
                height={1280}
                loading="lazy"
                decoding="async"
              />
              <img
                src="/images/tarang-gravity-sorter.jpeg"
                alt="The gravity-sorter prototype built by the team for Tarang"
                width={1280}
                height={1280}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="tarang-caption flex flex-col justify-between gap-10 p-5 sm:p-7 lg:p-8">
              <span className="t-meta text-signal">Field note / PGDM</span>
              <div>
                <h3 className="font-grotesk text-3xl font-semibold tracking-tight sm:text-4xl">
                  Tarang<span className="text-signal">.</span>
                </h3>
                <p className="t-body mt-3 text-muted-foreground">
                  Participated in Tarang’s Best Management Team category.
                </p>
              </div>
              <p className="t-meta border-t border-border pt-4 text-muted-foreground">
                Kattangal, Kerala <span className="mx-2 text-signal">/</span> 09
                Oct 2026
              </p>
              <Accordion type="single" collapsible className="border-t border-border">
                <AccordionItem value="tarang-reflection" className="border-0">
                  <AccordionTrigger className="min-h-11 py-3 text-sm hover:no-underline">
                    Read reflection
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pb-4 text-sm leading-relaxed text-muted-foreground">
                    <p>
                      Tarang had several rounds. The first was a marketing quiz,
                      which went well. In the second, we had to build something
                      creative from a small kit of coloured paper, plastic
                      covers, paper cups, a pencil, tape, glue, ice-cream sticks
                      and a blade.
                    </p>
                    <p>
                      We made a gravity sorter intended to send objects of
                      different masses along separate paths. We imagined
                      adapting it for a low-cost rainwater system: channel water
                      one way and wet leaves another. I liked that the idea
                      started with a practical problem rather than with how the
                      model would look on a table.
                    </p>
                    <p>
                      We were eliminated after that round. It stung because I
                      thought the build challenge suited us. The quiz tested
                      what we already knew; this round asked us to make
                      something from the materials in front of us. We ran out
                      of time to make the sorter work consistently and had not
                      tested it enough to claim reliability. Next time I’ll make
                      a rough working version early, test the core mechanism
                      before adding detail, and keep the pitch concise.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </figcaption>
          </figure>
        )}
        {selected === "eng" && (
          <figure
            className="tarang-feature siep-feature mb-8 grid overflow-hidden border border-border bg-surface/50 md:grid-cols-[1.45fr_.55fr]"
            data-reveal
          >
            <div className="tarang-photo siep-photo overflow-hidden">
              <img
                src={siepEbikePhoto}
                alt="Students with their e-bike at the SIEP competition at Galgotias University, Noida"
                width={960}
                height={1280}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="tarang-caption flex flex-col justify-between gap-10 p-5 sm:p-7 lg:p-8">
              <span className="t-meta text-signal">Field note / B.Tech</span>
              <div>
                <h3 className="font-grotesk text-3xl font-semibold tracking-tight sm:text-4xl">
                  SIEP E-Bike Competition<span className="text-signal">.</span>
                </h3>
                <p className="t-body mt-3 text-muted-foreground">
                  Team and e-bike at the competition.
                </p>
              </div>
              <p className="t-meta border-t border-border pt-4 text-muted-foreground">
                Galgotias University <span className="mx-2 text-signal">/</span>{" "}
                Noida
              </p>
            </figcaption>
          </figure>
        )}
        <div className="milestones-grid grid gap-x-10 md:grid-cols-2">
          {c.achievements.map((item) => (
            <article
              key={item.label}
              className="milestone-card border border-border bg-surface/40 p-5 sm:p-6"
              data-reveal
            >
              {item.image && (
                <img
                  className="milestone-image"
                  src={item.image}
                  alt="B.Tech project team receiving the Prakalp Best Departmental Project award"
                  width={4032}
                  height={3024}
                  loading="lazy"
                  decoding="async"
                />
              )}
              {item.value !== undefined && (
                <p className="milestone-value font-display text-signal">
                  {item.prefix}
                  {item.value.toLocaleString("en-US")}
                  {item.suffix}
                </p>
              )}
              <h3 className="mt-5 text-base font-medium">{item.label}</h3>
              <p className="t-body mt-3 text-muted-foreground">
                {item.context}
              </p>
            </article>
          ))}
        </div>
      </Section>
      {selected === "mgmt" && c.careerGoals && (
        <Section id="goals" number="09" title="Career goals">
          <div className="career-goals-grid">
            <article className="career-goal-panel" data-reveal>
              <header className="career-goal-heading">
                <CalendarDays size={20} strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <h3 className="t-title">Short-term goals</h3>
                  <p className="t-meta mt-1 text-muted-foreground">1–3 years</p>
                </div>
              </header>
              <ol className="career-goal-list">
                {c.careerGoals.shortTerm.map((goal, index) => (
                  <li key={goal}>
                    <span className="t-meta text-signal">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ol>
            </article>
            <article className="career-goal-panel" data-reveal>
              <header className="career-goal-heading">
                <Target size={20} strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <h3 className="t-title">Long-term goals</h3>
                  <p className="t-meta mt-1 text-muted-foreground">5–10 years</p>
                </div>
              </header>
              <ol className="career-goal-list">
                {c.careerGoals.longTerm.map((goal, index) => (
                  <li key={goal}>
                    <span className="t-meta text-signal">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </Section>
      )}
      {selected === "mgmt" && internshipReflection?.reflection && (
        <Section
          id="reflections"
          number="10"
          title="Personal Reflections"
        >
          <div className="internship-reflection" data-reveal>
            <div className="internship-reflection-photo">
              {internshipReflection.reflectionPhoto && (
                <img
                  src={internshipReflection.reflectionPhoto}
                  alt="Harisanth with the internship cohort and faculty at the final pre-PGDM presentation"
                  width={1600}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
            <div>
              <div className="reflection-stages">
                {(
                  [
                    internshipReflection.reflection.reporting,
                    internshipReflection.reflection.responding,
                    internshipReflection.reflection.relating,
                    internshipReflection.reflection.reasoning,
                    internshipReflection.reflection.reconstructing,
                  ] as const
                ).map((text) => (
                  <p className="reflection-stage text-sm leading-relaxed" key={text}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}
      {selected === "mgmt" && c.futureDevelopment && (
        <Section
          id="development"
          number="11"
          title="Future Development Plan"
        >
          <p className="t-body mb-7 max-w-[66ch] text-muted-foreground">
            Priorities for the next stage of the PGDM and work-integrated
            experience. I will add outcomes as they become concrete and
            appropriate to share.
          </p>
          <ol className="development-plan">
            {c.futureDevelopment.map((plan, index) => (
              <li key={plan} data-reveal>
                <span className="t-meta text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed sm:text-base">{plan}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}
      <Section
        id="contact"
        number={selected === "mgmt" ? "12" : "09"}
        title="Let’s connect"
      >
        <div data-reveal>
          <p className="t-lede max-w-[34ch]">
            Engineering, management, and the interesting space in between.
          </p>
          <div className="mt-10">
            <p className="t-meta mb-3 text-muted-foreground">Find me</p>
            <div className="flex flex-col items-start gap-2">
              <a
                href={`https://${PERSON.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-u inline-flex min-h-11 items-center gap-2 text-sm"
              >
                LinkedIn <ArrowUpRight className="size-4" />
              </a>
              <a
                href={`mailto:${PERSON.email}`}
                className="link-u inline-flex min-h-11 items-center gap-2 text-sm"
              >
                <Mail className="size-4" aria-hidden="true" /> {PERSON.email}
              </a>
              <a
                href={`tel:${PERSON.phone.replaceAll(" ", "")}`}
                className="link-u inline-flex min-h-11 items-center gap-2 text-sm"
              >
                <Phone className="size-4" aria-hidden="true" /> {PERSON.phone}
              </a>
            </div>
            <p className="t-caption mt-3">{PERSON.location}</p>
          </div>
        </div>
      </Section>
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border pb-24 pt-8 lg:pb-8">
        <p className="t-meta text-muted-foreground">
          B Harisanth Krishna / {c.code}
        </p>
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

