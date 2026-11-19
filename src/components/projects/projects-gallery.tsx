"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { ProjectCategory } from "@/config/projects";
import {
  ProjectCard,
  type ProjectLabels,
  type ProjectView,
} from "./project-card";

type Filter = "all" | ProjectCategory;

const EXIT_MS = 180;
const MOVE_MS = 340;

export function ProjectsGallery({
  projects,
  filters,
  filtersLabel,
  showing,
  labels,
}: {
  projects: ProjectView[];
  /** Filter buttons, in display order (the first one is "all"). */
  filters: { id: Filter; label: string }[];
  filtersLabel: string;
  /** `{count}` is replaced with the number of visible projects. */
  showing: string;
  labels: ProjectLabels;
}) {
  // `selected` drives the buttons right away; `active` drives which cards are
  // mounted and only changes after the exit animation finishes.
  const [selected, setSelected] = useState<Filter>("all");
  const [active, setActive] = useState<Filter>("all");

  const cards = useRef(new Map<string, HTMLElement>());
  const firstRects = useRef(new Map<string, DOMRect>());
  const animateNext = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const matches = (project: ProjectView, filter: Filter) =>
    filter === "all" || project.category === filter;
  const visible = projects.filter((p) => matches(p, active));

  function select(next: Filter) {
    if (next === selected) return;
    clearTimeout(timer.current);
    setSelected(next);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setActive(next);
      return;
    }

    // Reset any animation still running from a previous click.
    cards.current.forEach((el) => el.getAnimations().forEach((a) => a.cancel()));

    // FLIP "First": where every card is right now.
    firstRects.current = new Map(
      [...cards.current].map(([id, el]) => [id, el.getBoundingClientRect()]),
    );
    animateNext.current = true;

    // Cards that won't be in the new set fade out first.
    const leaving = projects.filter(
      (p) => matches(p, active) && !matches(p, next),
    );
    leaving.forEach((p) =>
      cards.current.get(p.id)?.animate(
        [
          { opacity: 1, transform: "scale(1)" },
          { opacity: 0, transform: "scale(0.94)" },
        ],
        { duration: EXIT_MS, easing: "ease-in", fill: "forwards" },
      ),
    );

    timer.current = setTimeout(
      () => setActive(next),
      leaving.length ? EXIT_MS : 0,
    );
  }

  // FLIP "Last/Invert/Play": slide the cards that stay to their new spot and
  // fade in the ones that appear.
  useLayoutEffect(() => {
    if (!animateNext.current) return;
    animateNext.current = false;

    let entering = 0;
    cards.current.forEach((el, id) => {
      const first = firstRects.current.get(id);
      if (first) {
        const last = el.getBoundingClientRect();
        const dx = first.left - last.left;
        const dy = first.top - last.top;
        if (dx || dy) {
          el.animate(
            [
              { transform: `translate(${dx}px, ${dy}px)` },
              { transform: "translate(0, 0)" },
            ],
            { duration: MOVE_MS, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
          );
        }
      } else {
        el.animate(
          [
            { opacity: 0, transform: "translateY(12px) scale(0.96)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          {
            duration: MOVE_MS,
            delay: entering++ * 50,
            easing: "ease-out",
            fill: "backwards",
          },
        );
      }
    });
    firstRects.current = new Map();
  }, [active]);

  return (
    <div>
      <div
        role="group"
        aria-label={filtersLabel}
        className="flex flex-wrap justify-center gap-2"
      >
        {filters.map((filter) => {
          const pressed = filter.id === selected;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={pressed}
              onClick={() => select(filter.id)}
              className={
                "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
                (pressed
                  ? "border-accent bg-accent text-ink"
                  : "border-line bg-panel text-muted hover:border-accent hover:text-fg")
              }
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {showing.replace("{count}", String(visible.length))}
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            labels={labels}
            ref={(el) => {
              if (el) cards.current.set(project.id, el);
              else cards.current.delete(project.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
