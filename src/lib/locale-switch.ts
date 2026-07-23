import type { Locale } from "@/lib/locales";

export function buildLocaleSwitchHref(
  pathname: string,
  queryString: string,
  targetLocale: Locale
) {
  const segments = pathname.split("/");

  if (segments[1] === "en" || segments[1] === "zh") {
    segments[1] = targetLocale;
  } else {
    segments.splice(1, 0, targetLocale);
  }

  const localizedPath = segments.join("/") || `/${targetLocale}`;
  return queryString ? `${localizedPath}?${queryString}` : localizedPath;
}
