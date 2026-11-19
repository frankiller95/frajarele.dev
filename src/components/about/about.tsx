import Image from "next/image";
import { getDictionary } from "@/i18n/get-dictionary";

export async function About() {
  const { about } = await getDictionary();

  return (
    <section id="about" className="border-b border-line">
      <div className="mx-auto grid max-w-page items-center gap-12 px-4 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-24">
        <figure className="relative mx-auto w-full max-w-sm lg:max-w-none lg:px-6">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-panel shadow-[14px_14px_0_0_color-mix(in_oklab,var(--accent)_35%,transparent)]">
            <Image
              src="/images/profile.jpg"
              alt={about.photoAlt}
              fill
              sizes="(min-width: 1024px) 400px, 90vw"
              className="object-cover"
            />
            <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-line bg-ink/80 px-3 py-1.5 font-mono text-xs backdrop-blur">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-accent"
              />
              {about.badge}
            </figcaption>
          </div>
        </figure>

        <div>
          <p className="text-sm font-semibold text-accent">{about.eyebrow}</p>
          <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight font-bold tracking-tighter text-balance sm:text-4xl lg:text-5xl">
            {about.titleStart}{" "}
            <span className="text-accent">{about.titleHighlight}</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted">{about.description}</p>

          <ol className="relative mt-8 space-y-6">
            {/* Vertical line through the bullets. */}
            <span
              aria-hidden="true"
              className="absolute top-3 bottom-2 left-[5px] w-px bg-line"
            />
            {about.steps.map((step) => (
              <li key={step.title} className="relative pl-8">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 left-0 size-[11px] rounded-full border-2 border-accent bg-ink"
                />
                <h3 className="font-display text-base font-bold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
