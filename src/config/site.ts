export const site = {
  name: "Francisco Javier Restrepo",
  /** Logo mark shown in the header. */
  initials: "FJR",
  /** Used in the terminal prompt: `fjr@portfolio ~ zsh`. */
  handle: "fjr",
  email: "Frank95299@gmail.com",
  linkedin: "https://www.linkedin.com/in/francisco-lenis/",
  github: "https://github.com/frankiller95",
  /** CV served from `public/`. */
  cv: "/cv/Francisco_Restrepo_CV.pdf",
  /** Copyright year shown in the footer. */
  year: 2026,
} as const;

/**
 * Header navigation. Keys map to `dict.nav[key]`; `id` is the section anchor
 * (`#id`) it scrolls to.
 */
export const navItems = [
  { key: "experience", id: "experience" },
  { key: "projects", id: "projects" },
  { key: "architecture", id: "architecture" },
  { key: "contact", id: "contact" },
] as const;
