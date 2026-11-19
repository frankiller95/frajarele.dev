import { certifications } from "@/config/certifications";
import { getDictionary } from "@/i18n/get-dictionary";

export async function Certifications() {
  const { certifications: dict } = await getDictionary();
  const descriptions: Record<string, string | undefined> = dict.items;

  return (
    <section id="certifications" className="border-b border-line">
      <div className="mx-auto max-w-page px-4 py-16 lg:py-24">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-accent">{dict.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-bold tracking-tighter sm:text-5xl">
            {dict.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{dict.subtitle}</p>
        </header>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <li key={cert.id} className="flex">
              <article className="flex w-full flex-col rounded-xl border border-line bg-panel p-5 transition-colors hover:border-accent/50">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-9 place-items-center rounded-lg bg-accent/15 font-mono text-xs font-semibold text-accent"
                  >
                    {cert.initials}
                  </span>
                  <p className="text-sm text-muted">{cert.issuer}</p>
                </div>

                <h3 className="mt-4 font-display text-lg leading-snug font-bold tracking-tight">
                  {cert.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {descriptions[cert.id]}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-xs">
                  <span className="text-muted">{cert.date}</span>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-accent transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      {dict.view}
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-16 text-center">
          <h3 className="text-sm font-semibold text-accent">
            {dict.educationEyebrow}
          </h3>
          <ul className="mt-5 flex flex-wrap justify-center gap-3">
            {dict.education.map((item) => (
              <li
                key={item.title}
                className="max-w-sm rounded-xl border border-line bg-panel px-5 py-3 text-left"
              >
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {item.institution} · {item.period}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
