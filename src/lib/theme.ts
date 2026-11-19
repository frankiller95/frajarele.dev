export const THEME_STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

/**
 * Runs synchronously while the HTML is parsed (inline in <head>), before first
 * paint, so there is no flash. The design is dark-first: dark unless the user
 * explicitly saved "light". Sets `.dark`/`.light` on <html>, which Tailwind
 * (`dark:`) and Chakra both read.
 */
export const themeScript = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var d=s!=="light";var r=document.documentElement;r.classList.add(d?"dark":"light");r.classList.remove(d?"light":"dark");r.style.colorScheme=d?"dark":"light"}catch(e){}})()`;

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
}

/** Theme currently applied to <html>, falling back to the system preference. */
export function readAppliedTheme(): Theme {
  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.classList.contains("light")) return "light";
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
