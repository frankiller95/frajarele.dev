import { site } from "@/config/site";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { HeroBackground } from "./hero-background";
import { Terminal } from "./terminal";

const buttonBase =
  "inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export async function Hero() {
  const locale = await getLocale();
  const { hero, terminal } = await getDictionary();

  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <HeroBackground />

      <div className="relative mx-auto grid max-w-page items-center gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5 text-sm text-muted">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {hero.badge}
          </span>

          <p className="mt-6 text-lg text-muted">
            {hero.greeting} {site.name}
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight font-bold tracking-tighter text-balance sm:text-5xl lg:text-6xl">
            {hero.titleStart}{" "}
            <span className="text-accent">{hero.titleHighlight}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{hero.description}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#experience"
              className={`${buttonBase} border-accent bg-accent text-ink hover:brightness-110`}
            >
              {hero.ctaPrimary}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonBase} border-line text-fg hover:border-accent`}
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </div>

        <Terminal
          key={locale}
          title={`${site.handle}@portfolio ~ zsh`}
          ariaLabel={terminal.ariaLabel}
          inputLabel={terminal.inputLabel}
          placeholder={terminal.placeholder}
          tryLabel={terminal.try}
          initialCommand={terminal.initialCommand}
          hint={terminal.hint}
          notFound={terminal.notFound}
          helpTitle={terminal.helpTitle}
          builtins={terminal.builtins}
          commands={terminal.commands}
        />
      </div>
    </section>
  );
}
