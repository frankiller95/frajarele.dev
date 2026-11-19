import { projectCategories, projects as projectConfig } from "@/config/projects";
import { getDictionary } from "@/i18n/get-dictionary";
import type { ProjectView } from "./project-card";
import { ProjectsGallery } from "./projects-gallery";

export async function Projects() {
  const { projects } = await getDictionary();

  // Config (category, image, links) + translated text, joined by id.
  const items = projectConfig.flatMap<ProjectView>((config) => {
    const text = (projects.items as Record<string, (typeof projects.items)["corporate-site"]>)[
      config.id
    ];
    return text ? [{ ...config, ...text }] : [];
  });

  const filters = [
    { id: "all" as const, label: projects.filters.all },
    ...projectCategories.map((id) => ({ id, label: projects.filters[id] })),
  ];

  return (
    <section id="projects" className="border-b border-line">
      <div className="mx-auto max-w-page px-4 py-16 lg:py-24">
        <header className="mx-auto mb-8 max-w-2xl text-center">
          <p className="text-sm font-semibold text-accent">{projects.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-bold tracking-tighter sm:text-5xl">
            {projects.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{projects.subtitle}</p>
        </header>

        <ProjectsGallery
          projects={items}
          filters={filters}
          filtersLabel={projects.filtersLabel}
          showing={projects.showing}
          labels={{
            architecture: projects.architecture,
            stack: projects.stack,
            showArchitecture: projects.showArchitecture,
            hideArchitecture: projects.hideArchitecture,
            repo: projects.repo,
            demo: projects.demo,
          }}
        />
      </div>
    </section>
  );
}
