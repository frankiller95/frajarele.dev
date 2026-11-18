"use client";

import { useLayoutEffect } from "react";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { EmotionRegistry } from "./emotion-registry";
import {
  THEME_STORAGE_KEY,
  applyTheme,
  readAppliedTheme,
  type Theme,
} from "@/lib/theme";

// Tailwind owns the global reset (preflight), so Chakra's is disabled to avoid
// both fighting over the same base styles. Chakra is used for complex widgets.
const system = createSystem(defaultConfig, { preflight: false });

export function Provider({ children }: { children: React.ReactNode }) {
  // The inline <head> script sets the theme before paint. In dev, React's
  // Strict Mode remount resets <html> classes to the ones declared in JSX, so
  // re-apply the stored theme before paint. No-op in production.
  useLayoutEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    applyTheme(saved ?? readAppliedTheme());
  }, []);

  return (
    <EmotionRegistry>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </EmotionRegistry>
  );
}
