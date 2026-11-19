import { getDictionary } from "@/i18n/get-dictionary";

/** Dot sizes (px) for the "growing" markers of the second pattern. */
const DOT_SIZES = [6, 10, 14, 18, 22];

export async function Architecture() {
  const { architecture } = await getDictionary();

  return (
    <section id="architecture" className="border-b border-line">
      <div className="mx-auto max-w-page px-4 py-16 lg:py-24">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-accent">{architecture.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-bold tracking-tighter sm:text-5xl">
            {architecture.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{architecture.subtitle}</p>
        </header>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {architecture.patterns.map((pattern, patternIndex) => (
            <article
              key={pattern.title}
              className="rounded-2xl border border-line bg-panel p-6"
            >
              <p className="text-sm font-semibold text-accent">{pattern.eyebrow}</p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                {pattern.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {pattern.description}
              </p>

              <ol className="mt-5 space-y-2.5">
                {pattern.steps.map((step, i) => (
                  <li
                    key={step.label}
                    className={
                      "flex items-center gap-4 rounded-xl border bg-ink px-4 py-3 " +
                      (step.highlight ? "border-accent" : "border-line")
                    }
                  >
                    {/* First pattern: step numbers. Second: dots that grow with each step. */}
                    <span
                      aria-hidden="true"
                      className="grid size-6 shrink-0 place-items-center"
                    >
                      {patternIndex === 0 ? (
                        <span className="font-mono text-xs text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      ) : (
                        <span
                          className="rounded-full bg-accent"
                          style={{ width: DOT_SIZES[i], height: DOT_SIZES[i] }}
                        />
                      )}
                    </span>
                    <span className="text-sm font-semibold">{step.label}</span>
                    <span className="ml-auto text-right font-mono text-xs text-muted">
                      {step.note}
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <h3 className="sr-only">{architecture.stackLabel}</h3>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {architecture.stack.map((group) => (
            <section
              key={group.title}
              className="rounded-xl border border-line bg-panel p-5"
            >
              <h4 className="text-sm font-semibold text-accent">{group.title}</h4>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-panel-2 px-3 py-1.5 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
