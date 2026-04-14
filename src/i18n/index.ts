import { translations, type Locale, type TranslationKey } from "./translations";

const DEFAULT_LOCALE: Locale = "es";

export function getCurrentLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");

  if (lang === "en" || lang === "es") {
    return lang;
  }

  return DEFAULT_LOCALE;
}

export function t(key: string): string {
  const locale = getCurrentLocale();
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

export function getTranslation(locale: Locale): TranslationKey {
  return translations[locale];
}

export function getLocaleUrl(newLocale: Locale): string {
  if (typeof window === "undefined") return "/";
  
  const url = new URL(window.location.href);
  url.searchParams.set("lang", newLocale.toString());
  return url.toString();
}

export { DEFAULT_LOCALE };
export type { Locale, TranslationKey };