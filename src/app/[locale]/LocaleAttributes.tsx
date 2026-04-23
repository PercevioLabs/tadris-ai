"use client";

import { useEffect } from "react";

/**
 * Sets the `lang` and `dir` attributes on the root <html> element.
 * Used by the [locale] layout to override the root layout's defaults
 * since nested layouts cannot render <html> tags.
 */
export function LocaleAttributes({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
