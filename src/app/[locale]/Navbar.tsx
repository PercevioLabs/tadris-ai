"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDictionary } from "./DictionaryProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Locale } from "@/i18n";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const params = useParams();
  const locale = params.locale as Locale;
  const t = useDictionary();

  const openMenu = () => {
    setMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = [
    { label: t.nav.howItWorks, href: "#how-it-works" },
    { label: t.nav.features, href: "#features" },
    { label: t.nav.theImpact, href: "#the-impact" },
    { label: t.nav.compare, href: "#compare" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-glass transition-all border-b border-outline-variant/30">
        <div className="flex justify-between items-center px-4 sm:px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a
              href="#"
              className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-headline tracking-tight hover:opacity-80 transition-opacity"
            >
              {t.nav.brand}
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8 font-medium text-sm">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  className="text-on-surface-variant hover:text-indigo-600 transition-colors"
                  href={l.href}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LanguageSwitcher currentLocale={locale} />
            </div>

            {/* Desktop CTA */}
            <a
              href="#waitlist"
              className="hidden md:inline-flex bg-primary-gradient text-white px-6 py-2.5 rounded-full font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-indigo-500/10"
            >
              {t.nav.joinWaitlist}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={openMenu}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-on-surface-variant hover:bg-indigo-50 transition-colors"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`fixed inset-y-0 end-0 z-[70] w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-50">
          <a
            href="#"
            onClick={closeMenu}
            className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-headline hover:opacity-80 transition-opacity"
          >
            {t.nav.brand}
          </a>
          <button
            onClick={closeMenu}
            className="flex items-center justify-center w-9 h-9 rounded-xl text-on-surface-variant hover:bg-indigo-50 transition-colors"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:text-indigo-600 hover:bg-indigo-50/70 font-medium transition-all"
            >
              {l.label}
            </a>
          ))}
          <div className="px-4 py-4">
             <LanguageSwitcher currentLocale={locale} />
          </div>
        </nav>
        <div className="px-4 pb-8">
          <a
            href="#waitlist"
            onClick={closeMenu}
            className="block bg-primary-gradient text-white text-center py-3 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-500/20 hover:opacity-90 transition-opacity"
          >
            {t.nav.joinWaitlist}
          </a>
        </div>
      </div>
    </>
  );
}
