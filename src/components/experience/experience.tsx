import { getDictionary } from "@/i18n/get-dictionary";

export async function Experience() {
  const { experience } = await getDictionary();

  return (
    <section id="experience" className="border-b border-line">
      <div className="mx-auto max-w-page px-4 py-16 lg:py-24">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-accent">{experience.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-bold tracking-tighter sm:text-5xl">
            {experience.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{experience.subtitle}</p>

          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {experience.sectors.map((sector) => (
              <li
                key={sector}
                className="rounded-full border border-line bg-panel px-3 py-1 font-mono text-xs"
              >
                {sector}
              </li>
            ))}
          </ul>
        </header>

        {/*
          Timeline. Mobile: single column with the line on the left.
          Desktop: line in the center, cards alternate left/right.
        */}
        <ol className="relative mt-14 space-y-5 pl-10 lg:pl-0">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-0 left-2 w-px bg-linear-to-b from-accent via-line to-transparent lg:left-1/2"
          />

          {experience.items.map((item, index) => {
            const isCurrent = index === 0;
            const onLeft = index % 2 === 0;

            return (
              <li
                key={item.company}
                className={
                  "relative lg:w-1/2 " +
                  (onLeft ? "lg:pr-12" : "lg:ml-auto lg:pl-12")
                }
              >
                {/* Marker on the line */}
                <span
                  aria-hidden="true"
                  className={
                    "absolute top-7 -left-10 size-4 rounded-full border-2 border-accent " +
                    (onLeft ? "lg:-right-2 lg:left-auto" : "lg:-left-2") +
                    (isCurrent
                      ? " bg-accent shadow-[0_0_0_5px_color-mix(in_oklab,var(--accent)_25%,transparent)]"
                      : " bg-ink")
                  }
                />

                <article className="rounded-xl border border-line bg-panel p-5 transition-colors hover:border-accent/50">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-xl font-bold tracking-tight">
                      {item.company}
                    </h3>
                    <p className="font-mono text-xs text-accent">
                      {isCurrent && (
                        <span className="sr-only">{experience.current}: </span>
                      )}
                      {item.period}
                    </p>
                  </div>

                  <p className="mt-2 text-sm font-semibold">{item.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <li
                        key={tag.label}
                        className={
                          "rounded-md border px-2 py-0.5 font-mono text-[11px] " +
                          (tag.highlight
                            ? "border-accent/50 bg-accent/10 text-accent"
                            : "border-line text-muted")
                        }
                      >
                        {tag.label}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
