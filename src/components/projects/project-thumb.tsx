import Image from "next/image";
import type { ProjectCategory } from "@/config/projects";

/**
 * Project preview. Uses the real screenshot when there is one; otherwise draws
 * a CSS placeholder that hints at the kind of project (site / web app / mobile app).
 */
export function ProjectThumb({
  category,
  image,
  alt,
}: {
  category: ProjectCategory;
  image?: string;
  alt: string;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
        className="object-cover object-top"
      />
    );
  }

  return (
    <div aria-hidden="true" className="absolute inset-0 grid place-items-center p-5">
      {category === "websites" && <SitePlaceholder />}
      {category === "webapps" && <WebAppPlaceholder />}
      {category === "apps" && <AppPlaceholder />}
    </div>
  );
}

const frame = "overflow-hidden rounded-lg border border-line bg-panel";

function Dots() {
  return (
    <div className="flex items-center gap-1 border-b border-line bg-panel-2 px-2 py-1.5">
      <span className="size-1.5 rounded-full bg-line" />
      <span className="size-1.5 rounded-full bg-line" />
      <span className="size-1.5 rounded-full bg-line" />
    </div>
  );
}

function SitePlaceholder() {
  return (
    <div className={`${frame} w-full max-w-[17rem]`}>
      <Dots />
      <div className="space-y-2 p-3">
        <div className="h-2 w-2/3 rounded bg-fg/70" />
        <div className="h-2 w-1/2 rounded bg-fg/70" />
        <div className="h-1.5 w-5/6 rounded bg-line" />
        <div className="h-4 w-14 rounded bg-accent" />
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          <div className="h-8 rounded bg-accent/20" />
          <div className="h-8 rounded bg-accent/20" />
          <div className="h-8 rounded bg-accent/20" />
        </div>
      </div>
    </div>
  );
}

function WebAppPlaceholder() {
  return (
    <div className={`${frame} w-full max-w-[17rem]`}>
      <Dots />
      <div className="grid grid-cols-[3rem_1fr]">
        <div className="space-y-1.5 border-r border-line p-2">
          <div className="h-1.5 rounded bg-accent" />
          <div className="h-1.5 rounded bg-line" />
          <div className="h-1.5 rounded bg-line" />
          <div className="h-1.5 rounded bg-line" />
        </div>
        <div className="space-y-2 p-2.5">
          <div className="flex h-9 items-end gap-1">
            {[40, 70, 50, 90, 60, 80].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-accent/60"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="h-1.5 rounded bg-line" />
          <div className="h-1.5 w-4/5 rounded bg-line" />
          <div className="h-1.5 w-3/5 rounded bg-line" />
        </div>
      </div>
    </div>
  );
}

function AppPlaceholder() {
  return (
    <div className="w-24 overflow-hidden rounded-2xl border-2 border-line bg-panel">
      <div className="mx-auto mt-1.5 h-1 w-8 rounded-full bg-line" />
      <div className="space-y-1.5 p-2.5">
        <div className="h-2 w-2/3 rounded bg-fg/70" />
        <div className="h-9 rounded-lg bg-accent/25" />
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-accent" />
          <span className="h-1.5 flex-1 rounded bg-line" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-line" />
          <span className="h-1.5 flex-1 rounded bg-line" />
        </div>
        <div className="h-4 rounded-md bg-accent" />
      </div>
    </div>
  );
}
