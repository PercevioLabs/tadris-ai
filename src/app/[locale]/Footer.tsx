"use client";

import { useDictionary } from "./DictionaryProvider";

export function Footer() {
  const t = useDictionary();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-indigo-100">
      <div className="flex flex-col items-center md:flex-row md:justify-between max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-8 gap-6 sm:gap-8 text-center md:text-start">
        <div>
          <a
            href="#"
            className="inline-block text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-headline mb-1 sm:mb-2 hover:opacity-80 transition-opacity"
          >
            {t.footer.brand}
          </a>
          <div className="text-xs tracking-wide text-on-surface-variant">
            &copy; {currentYear} {t.footer.brand}. {t.footer.tagline}.
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs tracking-wide font-medium text-on-surface-variant">
          <a className="hover:text-indigo-600 transition-all font-bold text-indigo-600" href="/survey">
            {t.footer.survey}
          </a>
          <a className="hover:text-indigo-600 transition-all" href="#">
            {t.footer.privacy}
          </a>
          <a className="hover:text-indigo-600 transition-all" href="#">
            {t.footer.terms}
          </a>
          <a className="hover:text-indigo-600 transition-all" href="#">
            {t.footer.cookies}
          </a>
          <a className="hover:text-indigo-600 transition-all" href="#">
            {t.footer.contact}
          </a>
        </div>
      </div>
    </footer>
  );
}
