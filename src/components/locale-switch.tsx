"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/locales";
import { buildLocaleSwitchHref } from "@/lib/locale-switch";

type LocaleSwitchProps = {
  locale: Locale;
  adminLabel: string;
};

const localeSwitchLabels: Record<Locale, Record<Locale, string>> = {
  en: {
    en: "English",
    zh: "Chinese"
  },
  zh: {
    en: "English",
    zh: "中文"
  }
};

export function LocaleSwitch({ locale, adminLabel }: LocaleSwitchProps) {
  const pathname = usePathname();
  const queryString = useSearchParams().toString();

  return (
    <div className="locale-switch">
      {(["en", "zh"] as const).map((targetLocale) => (
        <Link
          key={targetLocale}
          href={buildLocaleSwitchHref(pathname, queryString, targetLocale)}
          className={targetLocale === locale ? "active" : ""}
        >
          {localeSwitchLabels[locale][targetLocale]}
        </Link>
      ))}
      <Link
        href="/admin/login"
        className="admin-entry"
        aria-label={adminLabel}
        title={adminLabel}
      >
        {adminLabel}
      </Link>
    </div>
  );
}
