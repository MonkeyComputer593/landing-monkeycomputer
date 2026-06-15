import { translations, type Locale, type TranslationKey } from "./translations";

const DEFAULT_LOCALE: Locale = "es";

/** Get the current locale from the URL (client-side only) */
export function getCurrentLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");

  if (lang === "en" || lang === "es") {
    return lang;
  }

  return DEFAULT_LOCALE;
}

/** Get locale from Astro URL (server-side) */
export function getLocaleFromUrl(url: URL): Locale {
  const lang = url.searchParams.get("lang");
  if (lang === "en" || lang === "es") return lang;
  return DEFAULT_LOCALE;
}

/** Look up a nested translation key by dot notation (works server-side) */
export function getText(locale: Locale, key: string): string {
  const keys = key.split(".");
  let result: unknown = translations[locale];

  for (const k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  return typeof result === "string" ? result : key;
}

/** Get the full translation object for a locale */
export function getTranslation(locale: Locale): TranslationKey {
  return translations[locale];
}

/** Build a URL with a new locale (client-side) */
export function getLocaleUrl(newLocale: Locale): string {
  if (typeof window === "undefined") return "/";

  const url = new URL(window.location.href);
  url.searchParams.set("lang", newLocale.toString());
  return url.toString();
}

export { DEFAULT_LOCALE };
export type { Locale, TranslationKey };
