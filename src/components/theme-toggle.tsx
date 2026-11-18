"use client";

import { useSyncExternalStore } from "react";
import {
  THEME_STORAGE_KEY,
  applyTheme,
  readAppliedTheme,
  type Theme,
} from "@/lib/theme";

// Subscribe to class changes on <html> so the button follows the applied theme.
// useSyncExternalStore uses the server snapshot while hydrating and then
// switches to the real one, so there is no hydration mismatch.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

export function ThemeToggle({
  toLightLabel,
  toDarkLabel,
}: {
  toLightLabel: string;
  toDarkLabel: string;
}) {
  const theme = useSyncExternalStore<Theme>(
    subscribe,
    readAppliedTheme,
    () => "light",
  );

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode): the choice just won't persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? toLightLabel : toDarkLabel}
      suppressHydrationWarning
      className="rounded-full border border-foreground/20 px-4 py-2 text-sm transition-colors hover:bg-foreground/10"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
