import { navItems, site } from "@/config/site";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { LanguageSwitch } from "./language-switch";

const navLinkClass =
  "text-sm text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export async function Header() {
  const locale = await getLocale();
  const dict = await getDictionary();

  const links = navItems.map((item) => ({
    href: `#${item.id}`,
    label: dict.nav[item.key],
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-page grid-cols-[1fr_auto] items-center gap-4 px-4 md:grid-cols-[1fr_auto_1fr]">
        {/* Back to the top of the page (the hero is `#top`). */}
        <a
          href="#top"
          className="flex items-center gap-3 justify-self-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg bg-accent font-display text-[11px] font-bold tracking-tight text-ink"
          >
            {site.initials}
          </span>
          <span className="hidden font-display text-base font-bold tracking-tight sm:inline">
            {site.name}
          </span>
          <span className="sr-only sm:hidden">{site.name}</span>
        </a>

        <nav aria-label={dict.nav.label} className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          {/* Mobile menu: native <details>, no JS needed. */}
          <details className="group relative md:hidden">
            <summary className="flex cursor-pointer list-none items-center rounded-full border border-line bg-panel px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-fg [&::-webkit-details-marker]:hidden">
              {dict.nav.menu}
            </summary>
            <nav
              aria-label={dict.nav.label}
              className="absolute right-0 mt-2 flex w-44 flex-col gap-1 rounded-xl border border-line bg-panel p-2 shadow-xl"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-panel-2 hover:text-fg"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </details>

          <LanguageSwitch current={locale} label={dict.language.label} />
        </div>
      </div>
    </header>
  );
}
