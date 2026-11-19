export const projectCategories = ["websites", "webapps", "apps"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectConfig = {
  /** Must match a key in `projects.items` of the dictionaries (which holds the text). */
  id: string;
  category: ProjectCategory;
  /** Screenshot in /public (e.g. "/images/projects/foo.jpg"). Without it a CSS placeholder is drawn. */
  image?: string;
  repo?: string;
  demo?: string;
};

/**
 * Non-translatable data of each project. Order = order in the gallery.
 * Titles, descriptions, badges and architecture text live in the dictionaries.
 *
 * Example with everything filled in:
 *   { id: "corporate-site", category: "websites", image: "/images/projects/corporate.jpg",
 *     repo: "https://github.com/you/repo", demo: "https://example.com" }
 */
export const projects: ProjectConfig[] = [
  { id: "corporate-site", category: "websites" },
  { id: "product-landing", category: "websites" },
  { id: "restaurant-site", category: "websites" },
  { id: "ats-platform", category: "webapps" },
  { id: "analytics-dashboard", category: "webapps" },
  { id: "inventory-system", category: "webapps" },
  { id: "booking-app", category: "apps" },
  { id: "fitness-app", category: "apps" },
  { id: "delivery-app", category: "apps" },
];
