"use client";

import { useParams } from "next/navigation";
import { Locale } from "@/i18n";

/**
 * Formats a number according to the current locale.
 * Uses Arabic-Indic numerals for 'ar' and Western Arabic numerals for 'en'.
 */
export function useFormatNumber() {
  const params = useParams();
  const locale = (params.locale as Locale) || "en";

  const formatter = new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    useGrouping: true,
  });

  return (num: number | string) => {
    const value = typeof num === "string" ? parseFloat(num) : num;
    if (isNaN(value)) return String(num);
    return formatter.format(value);
  };
}
