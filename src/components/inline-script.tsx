"use client";

/**
 * Inline <script> that doesn't trigger React's "script tag in a component"
 * warning when the tree renders on the client (e.g. switching locale re-renders
 * the root layout). On the server it's a real script and runs while the HTML is
 * parsed; on the client it becomes inert `text/plain`.
 * See: Next docs > "Preventing flash before hydration".
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
