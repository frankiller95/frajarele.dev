"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

/** Same path in another locale: `/es/foo` -> `/en/foo`. */
function pathFor(pathname: string, locale: Locale) {
  return pathname.replace(/^\/[^/]+/, `/${locale}`);
}

export function LanguageSwitch({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center rounded-full border border-line bg-panel p-1 text-xs font-semibold"
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={pathFor(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            scroll={false}
            aria-current={active ? "true" : undefined}
            className={
              "rounded-full px-3 py-1 uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
              (active
                ? "bg-accent text-ink"
                : "text-muted hover:text-fg")
            }
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
