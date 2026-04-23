"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, Locale } from "@/i18n";

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();

  // Helper to generate the path for the other locale
  const getLocalizedPath = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex items-center gap-1 border border-outline-variant/30 rounded-full px-2 py-1 bg-white/50 backdrop-blur-sm shadow-sm">
      {locales.map((locale) => {
        const isActive = currentLocale === locale;
        return (
          <Link
            key={locale}
            href={getLocalizedPath(locale)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              isActive
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-on-surface-variant hover:bg-indigo-50 hover:text-indigo-600"
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
