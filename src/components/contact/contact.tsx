import { site } from "@/config/site";
import { getDictionary } from "@/i18n/get-dictionary";

const buttonBase =
  "inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export async function Contact() {
  const { contact } = await getDictionary();

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Soft glow rising from the bottom edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-page px-4 py-16 text-center lg:py-24">
        <p className="text-sm font-semibold text-accent">{contact.eyebrow}</p>
        <h2 className="mx-auto mt-4 max-w-5xl font-display text-balance text-4xl leading-tight font-bold tracking-tighter sm:text-5xl">
          {contact.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
          {contact.description}
        </p>

        <a
          href={`mailto:${site.email}`}
          aria-label={`${contact.emailLabel} ${site.email}`}
          className="mt-8 inline-block rounded-xl border border-line bg-panel px-5 py-3 font-mono text-sm break-all transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {site.email}
        </a>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonBase} border-accent bg-accent text-ink hover:brightness-110`}
          >
            {contact.linkedin}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonBase} border-line bg-panel text-fg hover:border-accent`}
          >
            {contact.github}
          </a>
          <a
            href={site.cv}
            download
            className={`${buttonBase} border-line bg-panel text-fg hover:border-accent`}
          >
            {contact.cv}
          </a>
        </div>
      </div>
    </section>
  );
}
