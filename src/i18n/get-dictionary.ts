import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import type es from "./dictionaries/es.json";
import { hasLocale, type Locale } from "./config";

// Spanish is the source of truth for the dictionary shape; `en` must match it.
export type Dictionary = typeof es;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("./dictionaries/es.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

/** Locale in the current URL (`/[lang]/...`). */
export const getLocale = async (): Promise<Locale> => {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
};

/** Dictionary for the locale in the current URL (`/[lang]/...`). */
export const getDictionary = async (): Promise<Dictionary> => {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale]();
};

/** Dictionary for an explicit locale (e.g. inside generateMetadata). */
export const getDictionaryFor = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
