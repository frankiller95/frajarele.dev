"use client";

import { useId, useState } from "react";
import type { ProjectCategory } from "@/config/projects";
import { ProjectThumb } from "./project-thumb";

export type ProjectView = {
  id: string;
  category: ProjectCategory;
  image?: string;
  repo?: string;
  demo?: string;
  title: string;
  description: string;
  badges: string[];
  architecture: string;
  stack: string;
};

export type ProjectLabels = {
  architecture: string;
  stack: string;
  showArchitecture: string;
  hideArchitecture: string;
  repo: string;
  demo: string;
};

const linkClass =
  "text-sm font-semibold text-accent transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export function ProjectCard({
  project,
  labels,
  ref,
}: {
  project: ProjectView;
  labels: ProjectLabels;
  ref?: React.Ref<HTMLElement>;
}) {
  const panelId = useId();
  const [open, setOpen] = useState(false);

  return (
    <article
      ref={ref}
      className="flex flex-col overflow-hidden rounded-xl border border-line bg-panel transition-colors hover:border-accent/50"
    >
      {/* Preview. The architecture panel shows on hover/focus (desktop) or via the toggle (touch/keyboard). */}
      <div className="group/media relative aspect-[16/10] overflow-hidden border-b border-line bg-panel-2">
        <ProjectThumb
          category={project.category}
          image={project.image}
          alt={project.title}
        />
        <div
          id={panelId}
          className={
            "absolute inset-0 flex flex-col justify-center bg-ink/95 p-4 text-xs backdrop-blur-sm transition-opacity duration-200 group-hover/media:opacity-100 " +
            (open ? "opacity-100" : "opacity-0")
          }
        >
          <dl className="space-y-2 rounded-lg border border-accent/40 bg-panel p-3 leading-relaxed">
            <div className="grid grid-cols-[5.5rem_1fr] gap-2">
              <dt className="font-semibold text-accent">{labels.architecture}</dt>
              <dd>{project.architecture}</dd>
            </div>
            <div className="grid grid-cols-[5.5rem_1fr] gap-2">
              <dt className="font-semibold text-accent">{labels.stack}</dt>
              <dd>{project.stack}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <ul className="flex flex-wrap gap-1.5">
          {project.badges.map((badge, i) => (
            <li
              key={badge}
              className={
                "rounded-md px-2 py-0.5 font-mono text-[11px] " +
                (i === 0
                  ? "bg-accent/15 text-accent"
                  : "bg-panel-2 text-muted")
              }
            >
              {badge}
            </li>
          ))}
        </ul>

        <h3 className="mt-3 font-display text-xl font-bold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className={`${linkClass} cursor-pointer`}
          >
            {open ? labels.hideArchitecture : labels.showArchitecture}
          </button>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {labels.repo}
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {labels.demo}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
