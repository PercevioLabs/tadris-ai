"use client";

import { useState, useEffect, useRef } from "react";

const CapabilityExplorer = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const capabilities = [
    {
      id: "lecture",
      navTitle: "Session Processing",
      outcome: "Upload last week's lecture",
      description:
        "Get a study guide, flashcards, a quiz, and a mind map — ready to share with students.",
      icon: "auto_mode",
      color: "blue",
    },
    {
      id: "exams",
      navTitle: "Assessment Builder",
      outcome: "Build a full exam from your course material",
      description:
        "Every question mapped to your CLOs, across every format you need — automatically.",
      icon: "fact_check",
      color: "emerald",
    },
    {
      id: "grading",
      navTitle: "Essay Grading",
      outcome: "Grade 80 essays in 2 hours instead of 20",
      description:
        "The AI drafts the feedback; you review and send. Reclaim your weekends with automated rubric mapping.",
      icon: "reviews",
      color: "indigo",
    },
    {
      id: "assistant",
      navTitle: "AI Teaching Assistant",
      outcome: "24/7 Support for Every Student",
      description:
        "Students get answers at any hour. You see what they're struggling with in your dashboard.",
      icon: "support_agent",
      color: "amber",
    },
    {
      id: "planner",
      navTitle: "Lesson Planner",
      outcome: "Type your topic and learning objective",
      description:
        "Get a complete lesson plan in seconds, built on what actually works for similar courses.",
      icon: "architecture",
      color: "rose",
    },
    {
      id: "slides",
      navTitle: "Slide Deck Generator",
      outcome: "Turn any document into a presentation",
      description:
        "Choose your tone, set your language, add speaker notes — done in seconds.",
      icon: "present_to_all",
      color: "cyan",
    },
    {
      id: "collaborative",
      navTitle: "Collaborative Intelligence",
      outcome: "See what top instructors are doing",
      description:
        "Observe best practices in your subject area and adapt proven strategies for your own class.",
      icon: "hub",
      color: "violet",
    },
    {
      id: "labs",
      navTitle: "Lab Builder",
      outcome: "Create a fully structured lab exercise",
      description:
        "Problem statements, instructions, hints, solution guides, and rubrics — in minutes.",
      icon: "science",
      color: "orange",
    },
    {
      id: "pedagogy",
      navTitle: "Pedagogy Recommender",
      outcome: "Not sure how to teach a complex topic?",
      description:
        "Get evidence-based delivery suggestions based on how similar instructors approached it.",
      icon: "tips_and_updates",
      color: "fuchsia",
    },
    {
      id: "ncaaa",
      navTitle: "NCAAA Report Assistant",
      outcome: "TP-153 & TP-154 drafts in 5 minutes",
      description:
        "Upload your grades and get a complete accreditation report draft — including the action plan.",
      icon: "assignment_turned_in",
      color: "purple",
    },
  ];

  const handleSwitch = (idx: number) => {
    if (idx === activeIdx) return;
    setIsTransitioning(true);

    // Wait for the exit animation to almost complete (assuming duration-500)
    setTimeout(() => {
      setActiveIdx(idx);

      // Brief pause to ensure state change is processed before starting enter animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 350);
  };

  const nextIdx = (activeIdx + 1) % capabilities.length;
  const prevIdx = (activeIdx - 1 + capabilities.length) % capabilities.length;

  // Auto-play Logic
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleSwitch(nextIdx);
    }, 4500);
    return () => clearInterval(interval);
  }, [activeIdx, isPaused, nextIdx]);

  const current = capabilities[activeIdx];

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
      {/* Sidebar Navigation */}
      <div className="w-full lg:w-[320px] lg:sticky lg:top-32 space-y-1">
        <div className="mb-4 px-4 py-2 border-b border-indigo-100 flex items-center justify-between">
          <span className="text-[10px] font-bold text-indigo-900/40 uppercase tracking-widest">
            Outcome Index
          </span>
          <span className="text-[10px] font-mono text-indigo-400">
            {activeIdx + 1} / {capabilities.length}
          </span>
        </div>
        <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-1 scrollbar-hide no-scrollbar">
          {capabilities.map((cap, idx) => (
            <button
              key={cap.id}
              onClick={() => handleSwitch(idx)}
              className={`flex-shrink-0 group relative w-full text-left px-5 py-4 rounded-xl transition-all duration-300 flex items-center gap-4 ${
                activeIdx === idx
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "text-on-surface-variant hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  activeIdx === idx ? "text-white" : "text-indigo-400"
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {cap.icon}
              </span>
              <span className="font-bold text-sm tracking-tight whitespace-nowrap lg:whitespace-normal leading-tight">
                {cap.navTitle}
              </span>
              {activeIdx === idx && (
                <div className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Viewport */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex-1 w-full relative min-h-[500px]"
      >
        <div
          className={`w-full bg-white/60 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-2xl shadow-indigo-500/5 transition-all duration-500 flex flex-col justify-between h-full group hover:bg-white/80 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative z-10">
            {/* Pause indicator (subtle) */}
            {/* {isPaused && (
              <div className="absolute -top-4 -right-4 bg-indigo-600 text-white text-[8px] font-bold px-2 py-1 rounded-full animate-pulse shadow-lg z-50">
                AUTOPLAY PAUSED
              </div>
            )} */}
            <div className="flex items-start justify-between mb-10">
              <div
                className={`w-16 h-16 rounded-2xl bg-${current.color}-50 flex items-center justify-center text-${current.color}-600 transition-transform group-hover:scale-110 duration-500 shadow-sm`}
              >
                <span
                  className="material-symbols-outlined text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {current.icon}
                </span>
              </div>

              {/* Navigation Chevrons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSwitch(prevIdx)}
                  className="w-10 h-10 rounded-full border border-indigo-100 flex items-center justify-center text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all active:scale-95"
                  aria-label="Previous Outcome"
                >
                  <span className="material-symbols-outlined text-lg">chevron_left</span>
                </button>
                <button
                  onClick={() => handleSwitch(nextIdx)}
                  className="w-10 h-10 rounded-full border border-indigo-100 flex items-center justify-center text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all active:scale-95"
                  aria-label="Next Outcome"
                >
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="mb-8">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest text-${current.color}-600/60 mb-4 block`}
              >
                Capability: {current.navTitle}
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline text-on-surface leading-[1.1] tracking-tight mb-8">
                {current.outcome}
              </h3>
              <p className="text-on-surface-variant text-lg sm:text-xl leading-relaxed max-w-2xl">
                {current.description}
              </p>
            </div>
          </div>

          <div className="mt-12 relative">
            <div className="mt-12 flex items-center gap-6">
              <a
                href="#waitlist"
                className="bg-primary-gradient text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all"
              >
                Get Early Access
              </a>
              <div className="flex items-center gap-2 text-on-surface-variant font-medium text-sm">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                Verified for Saudi Higher Ed
              </div>
            </div>
          </div>

          {/* Background Decorative Shape */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-${current.color}-50/30 to-transparent pointer-events-none -z-10 rounded-r-[2.5rem]`}
          />
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  // Close drawer when resized to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function Typewriter({ text, speed = 40 }: { text: string; speed?: number }) {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
      if (index < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + text[index]);
          setIndex((prev) => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    }, [index, text, speed]);

    return <span>{displayedText}</span>;
  }

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Compare", href: "#compare" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <div className="bg-surface text-on-surface font-body hero-glow min-h-screen">
      {/* ── TopNavBar ── */}
      <nav className="fixed top-0 w-full z-50 bg-glass transition-all border-b border-outline-variant/30">
        <div className="flex justify-between items-center px-4 sm:px-8 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-headline tracking-tight hover:opacity-80 transition-opacity"
          >
            Tadris AI
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

          {/* Desktop CTA */}
          <a
            href="#waitlist"
            className="hidden md:inline-flex bg-primary-gradient text-white px-6 py-2.5 rounded-full font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-indigo-500/10"
          >
            Get Early Access
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
      </nav>

      {/* ── Mobile Drawer (always mounted, CSS transition) ── */}
      {/* Backdrop */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      {/* Sidebar panel */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-50">
          <a
            href="#"
            onClick={closeMenu}
            className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-headline hover:opacity-80 transition-opacity"
          >
            Tadris AI
          </a>
          <button
            onClick={closeMenu}
            className="flex items-center justify-center w-9 h-9 rounded-xl text-on-surface-variant hover:bg-indigo-50 transition-colors"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {/* Links */}
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
        </nav>
        {/* CTA */}
        <div className="px-4 pb-8">
          <a
            href="#waitlist"
            onClick={closeMenu}
            className="block bg-primary-gradient text-white text-center py-3 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-500/20 hover:opacity-90 transition-opacity"
          >
            Get Early Access
          </a>
        </div>
      </div>

      <main className="pt-20">
        {/* ── Hero Section ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 lg:py-24 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center relative">
          <div className="lg:w-1/2 space-y-6 lg:space-y-8 z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wide uppercase border border-indigo-100">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              The AI Co-Pilot Built for Saudi Higher Education
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline leading-[1.1] tracking-tight text-on-surface">
              Give Your Faculty{" "}
              <span className="text-transparent bg-clip-text bg-primary-gradient">10+ Hours</span>{" "}
              Back Every Week
            </h1>
            <p className="text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed mx-auto lg:mx-0">
              Your AI teaching companion that automates grading, generates NCAAA-compliant reports,
              and plans lessons in seconds — while you stay fully in control.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1">
              <a
                href="#waitlist"
                className="bg-primary-gradient text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] hover:shadow-indigo-600/40 transition-all text-center flex items-center justify-center"
              >
                Get Early Access
              </a>
              <a
                href="#how-it-works"
                className="bg-white text-indigo-600 border border-indigo-100 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">play_circle</span>
                Watch Demo
              </a>
            </div>
          </div>

          {/* ── Hero Product Mockup ── */}
          <div className="lg:w-1/2 relative w-full flex justify-center items-center py-8 mt-4 lg:mt-0">
            {/* Ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 sm:w-80 sm:h-80 bg-indigo-400/10 blur-3xl rounded-full" />
            </div>

            {/* Floating badge — top left */}
            <div className="absolute -left-2 sm:-left-4 top-4 z-20 badge-slide-left bg-white border border-indigo-100 rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-xl shadow-indigo-500/10 flex items-center gap-2 sm:gap-2.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping-ring flex-shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-on-surface leading-none">28 Papers</div>
                <div className="text-[9px] text-on-surface-variant mt-0.5">Being graded now</div>
              </div>
            </div>

            {/* Floating badge — bottom right */}
            <div className="absolute -right-2 sm:-right-4 bottom-8 z-20 badge-slide-right bg-primary-gradient rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-xl shadow-indigo-500/20 flex items-center gap-2 sm:gap-2.5 text-white">
              <span
                className="material-symbols-outlined text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
              <div>
                <div className="text-[10px] font-bold leading-none">TP-153 Ready</div>
                <div className="text-[9px] opacity-80 mt-0.5">NCAAA Compliant</div>
              </div>
            </div>

            {/* Main app window card */}
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] z-10 animate-float">
              {/* macOS chrome */}
              <div className="bg-surface-container-highest rounded-t-2xl px-4 py-3 flex items-center gap-2 border border-outline-variant/20 border-b-0">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
                <div className="flex-1 mx-4">
                  <div className="bg-white/60 rounded-md px-3 py-1 text-[10px] text-on-surface-variant text-center font-mono">
                    tadris.ai / grade / biol-302
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="bg-white rounded-b-2xl shadow-2xl shadow-indigo-500/10 border border-outline-variant/20 border-t-0 overflow-hidden">
                {/* Submission row */}
                <div className="px-5 pt-5 pb-4 flex items-center justify-between border-b border-outline-variant/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      SA
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="text-xs font-semibold text-on-surface">Sara Al-Mutairi</div>
                        <span className="text-[7px] px-1.5 py-px rounded-full bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 uppercase tracking-tight">
                          AI Draft
                        </span>
                      </div>
                      <div className="text-[10px] text-on-surface-variant">
                        BIOL 302 · Research Essay · Week 8
                      </div>
                    </div>
                  </div>
                  <div className="hero-score text-right" style={{ animationDelay: "0.5s" }}>
                    <div className="text-[8px] font-bold text-indigo-500/80 tracking-widest uppercase mb-1">
                      AI Suggested Grade
                    </div>
                    <div className="flex items-baseline justify-end gap-1">
                      <div className="text-2xl font-extrabold font-headline text-transparent bg-clip-text bg-primary-gradient leading-none">
                        A+
                      </div>
                      <div className="text-[10px] text-indigo-500 font-semibold">97/100</div>
                    </div>
                  </div>
                </div>

                {/* Rubric bars */}
                <div className="px-5 py-4 space-y-3">
                  <div className="flex items-center gap-3 row-1">
                    <span className="text-[10px] text-on-surface-variant w-28 flex-shrink-0">
                      Critical Thinking
                    </span>
                    <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className="bar-94 h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400"
                        style={{ width: "96%" }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-on-surface w-7 text-right">
                      96%
                    </span>
                  </div>
                  <div className="flex items-center gap-3 row-2">
                    <span className="text-[10px] text-on-surface-variant w-28 flex-shrink-0">
                      Evidence Quality
                    </span>
                    <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className="bar-94 h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ width: "98%" }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-on-surface w-7 text-right">
                      98%
                    </span>
                  </div>
                  <div className="flex items-center gap-3 row-3">
                    <span className="text-[10px] text-on-surface-variant w-28 flex-shrink-0">
                      Citation Format
                    </span>
                    <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className="bar-78 h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-500"
                        style={{ width: "97%" }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-on-surface w-7 text-right">
                      97%
                    </span>
                  </div>
                </div>

                {/* AI Feedback */}
                <div className="mx-5 mb-5 rounded-xl bg-indigo-50 border border-indigo-100/60 p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span
                      className="material-symbols-outlined text-indigo-500 text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_awesome
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-600">
                      AI Feedback
                    </span>
                    <div className="ml-auto flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-indigo-400 animate-dot-1" />
                      <div className="w-1 h-1 rounded-full bg-indigo-400 animate-dot-2" />
                      <div className="w-1 h-1 rounded-full bg-indigo-400 animate-dot-3" />
                    </div>
                  </div>
                  <p className="text-[10px] text-indigo-900/75 leading-relaxed line-clamp-2 h-8">
                    <Typewriter text="Exceptional thesis and mastery of evidence. Analysis of Al-Zahrani (2026) is insightful. Citations are perfect." />
                    <span className="animate-caret font-bold text-indigo-500 ml-px">|</span>
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-primary-gradient text-white text-[10px] font-bold py-1.5 rounded-lg hover:opacity-90 transition-all">
                      Approve &amp; Send
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-indigo-100 text-[10px] font-semibold text-indigo-600 hover:bg-indigo-50/80 transition-all">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Social Proof ── */}
        <section className="bg-indigo-50/40 py-10 sm:py-14 border-y border-indigo-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-24 opacity-80">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl sm:text-4xl text-indigo-600">
                school
              </span>
              <span className="font-headline font-bold text-base sm:text-xl tracking-tight text-on-surface">
                Built for Higher Education
              </span>
            </div>
            <div className="flex items-center gap-3 sm:border-l sm:border-indigo-200/50 sm:pl-12 md:pl-24">
              <span className="material-symbols-outlined text-3xl sm:text-4xl text-indigo-600">
                verified_user
              </span>
              <span className="font-headline font-bold text-base sm:text-xl tracking-tight uppercase text-on-surface">
                NCAAA Compliance Standards
              </span>
            </div>
          </div>
        </section>

        {/* ── Problem Section ── */}
        <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-100/40 blur-[100px] rounded-full animate-pulse-soft" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100/30 blur-[100px] rounded-full animate-pulse-soft [animation-delay:1s]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-16 lg:mb-24">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold tracking-widest uppercase border border-indigo-100 mb-4">
                The Reality
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline mb-6 tracking-tight text-on-surface">
                The Administrative Burden is Real
              </h2>
              <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Academic excellence is often buried under hours of manual documentation and routine
                grading. Reclaim your time for what matters most: your students.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Scenario 1 */}
              <div className="group relative p-8 sm:p-10 rounded-[2rem] bg-white/60 backdrop-blur-md border border-indigo-100/50 hover:border-indigo-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-50 rounded-full blur-2xl group-hover:bg-indigo-100 transition-colors" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <span
                      className="material-symbols-outlined text-indigo-600 text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      history_toggle_off
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-headline mb-4 text-on-surface leading-tight">
                    The Sunday Night <br />
                    Grading Mountain
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">
                    Sunday night, 11:30 PM. 80+ research essays left for BIOL-302. You want to give
                    meaningful feedback, but the deadline is tomorrow morning and the exhaustion is
                    setting in.
                  </p>
                </div>
              </div>

              {/* Scenario 2 */}
              <div className="group relative p-8 sm:p-10 rounded-[2rem] bg-white/60 backdrop-blur-md border border-indigo-100/50 hover:border-indigo-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-50 rounded-full blur-2xl group-hover:bg-purple-100 transition-colors" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <span
                      className="material-symbols-outlined text-purple-600 text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      pending_actions
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-headline mb-4 text-on-surface leading-tight">
                    The Accreditation <br />
                    Shadow
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">
                    Final grades are in. While your colleagues are already on break, you&apos;re
                    still trapped in the office with TP-153 and TP-154 reports, manually mapping
                    every CLO for NCAAA compliance.
                  </p>
                </div>
              </div>

              {/* Scenario 3 */}
              <div className="group relative p-8 sm:p-10 rounded-[2rem] bg-white/60 backdrop-blur-md border border-indigo-100/50 hover:border-indigo-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-pink-50 rounded-full blur-2xl group-hover:bg-pink-100 transition-colors" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <span
                      className="material-symbols-outlined text-pink-600 text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      chat_error
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-headline mb-4 text-on-surface leading-tight">
                    The Feedback <br />
                    Black Hole
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">
                    Your students submitted their projects last Monday. They need your guidance to
                    succeed on the final exam, but your calendar is packed with administrative
                    meetings until next week.
                  </p>
                </div>
              </div>

              {/* Scenario 4 */}
              <div className="group relative p-8 sm:p-10 rounded-[2rem] bg-white/60 backdrop-blur-md border border-indigo-100/50 hover:border-indigo-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-amber-50 rounded-full blur-2xl group-hover:bg-amber-100 transition-colors" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <span
                      className="material-symbols-outlined text-amber-600 text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      video_stable
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-headline mb-4 text-on-surface leading-tight">
                    The Hidden <br />
                    Academic Vault
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">
                    You recorded a brilliant 60-minute lecture. Now it&apos;s a dormant 2GB file in
                    LMS. No transcripts, no summaries, and no easy way for your students to search
                    or interact with your insights.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all group"
              >
                Ready to focus on what matters?
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </section>
        {/* ── Features (The Interactive Capability Explorer) ── */}
        <section
          id="features"
          className="bg-surface py-24 sm:py-32 lg:py-48 relative overflow-hidden"
        >
          {/* Spatial background elements */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-indigo-50/30 blur-[120px] rounded-full" />
            <div className="absolute bottom-[10%] right-[5%] w-[35%] h-[35%] bg-purple-50/25 blur-[100px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
            <div className="mb-20 sm:mb-28 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/80 text-indigo-600 text-[10px] font-bold tracking-widest uppercase border border-indigo-100/50 mb-6 font-mono">
                System Capabilities v2.0
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold font-headline tracking-tighter text-on-surface leading-[0.95] mb-8">
                Outcomes Over Features.
              </h2>
              <p className="text-on-surface-variant text-lg sm:text-xl max-w-2xl leading-relaxed">
                Interact with our core workflows to see how we transform the academic burden into
                teaching momentum.
              </p>
            </div>

            <CapabilityExplorer />
          </div>
        </section>

        {/* ── Differentiators ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 lg:py-32">
          <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
            <div className="md:w-1/3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline leading-tight">
                Why Choose Tadris AI?
              </h2>
              <p className="mt-4 sm:mt-6 text-on-surface-variant leading-relaxed text-sm sm:text-base">
                Unlike generic AI tools, Tadris is purpose-built for the strict ethical, privacy,
                and accreditation standards of Saudi higher education.
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-10 lg:gap-x-12 gap-y-10 lg:gap-y-16">
              <div>
                <h4 className="font-bold font-headline text-base sm:text-lg mb-2 text-indigo-600 flex items-center gap-2">
                  <span className="material-symbols-outlined">person_check</span> Teacher in control
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  The AI drafts, but the Professor confirms. No autonomous grades are ever finalized
                  without manual override.
                </p>
              </div>
              <div>
                <h4 className="font-bold font-headline text-base sm:text-lg mb-2 text-indigo-600 flex items-center gap-2">
                  <span className="material-symbols-outlined">visibility</span> Transparent outputs
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Every AI-generated statement is cited back to your course materials or provided
                  student submissions.
                </p>
              </div>
              <div>
                <h4 className="font-bold font-headline text-base sm:text-lg mb-2 text-indigo-600 flex items-center gap-2">
                  <span className="material-symbols-outlined">security</span> Hallucination
                  mitigation
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Custom RAG architecture ensures the AI stays within the bounds of your provided
                  context and data.
                </p>
              </div>
              <div>
                <h4 className="font-bold font-headline text-base sm:text-lg mb-2 text-indigo-600 flex items-center gap-2">
                  <span className="material-symbols-outlined">lock</span> Data privacy
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Enterprise-grade encryption. Student data is never used to train global models.
                  GDPR and NCAAA aligned.
                </p>
              </div>
              <div>
                <h4 className="font-bold font-headline text-base sm:text-lg mb-2 text-indigo-600 flex items-center gap-2">
                  <span className="material-symbols-outlined">edit_note</span> Easy to customize
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Every AI generation is fully editable. Refine feedback, adjust rubric weights, and
                  tailor lesson plans before they go live.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Demo / How It Works ── */}
        <section
          id="how-it-works"
          className="bg-indigo-50/50 py-14 sm:py-20 lg:py-32 border-y border-indigo-100/30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline mb-4">
                Experience the Velocity
              </h2>
              <p className="text-on-surface-variant text-sm sm:text-base">
                NCAAA TP-153 Course Report Drafting
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-indigo-100 shadow-2xl">
              <div className="bg-white p-7 sm:p-12">
                <div className="text-on-surface-variant font-bold text-xs uppercase tracking-widest mb-4 sm:mb-6">
                  The Old Way
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-headline mb-6 sm:mb-8">
                  5 Hours of Manual Entry
                </h3>
                <ul className="space-y-4 sm:space-y-6">
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-outline flex-shrink-0">
                      close
                    </span>
                    <span className="text-on-surface-variant text-sm sm:text-base">
                      Exporting grades from multiple Excel sheets
                    </span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-outline flex-shrink-0">
                      close
                    </span>
                    <span className="text-on-surface-variant text-sm sm:text-base">
                      Manually calculating CLO achievement percentages
                    </span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-outline flex-shrink-0">
                      close
                    </span>
                    <span className="text-on-surface-variant text-sm sm:text-base">
                      Writing qualitative improvement plans from scratch
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-primary-gradient text-white p-7 sm:p-12 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 p-8 opacity-10">
                  <span className="material-symbols-outlined text-[200px]">bolt</span>
                </div>
                <div className="text-indigo-100 font-bold text-xs uppercase tracking-widest mb-4 sm:mb-6">
                  The Tadris Way
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-headline mb-6 sm:mb-8">
                  Generated in 45 Seconds
                </h3>
                <ul className="space-y-4 sm:space-y-6">
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-indigo-200 flex-shrink-0">
                      check_circle
                    </span>
                    <span className="text-white text-sm sm:text-base">
                      Direct LMS integration pulls all student data automatically
                    </span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-indigo-200 flex-shrink-0">
                      check_circle
                    </span>
                    <span className="text-white text-sm sm:text-base">
                      Real-time CLO mapping with visualized performance gaps
                    </span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-indigo-200 flex-shrink-0">
                      check_circle
                    </span>
                    <span className="text-white text-sm sm:text-base">
                      AI-suggested corrective actions based on historical data
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Benefits Section ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
            {/* Image — hidden on mobile to reduce clutter */}
            <div className="relative hidden md:block">
              <div className="absolute -inset-4 bg-primary-gradient blur-3xl opacity-10 rounded-full"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Happy Faculty"
                className="rounded-2xl shadow-2xl relative z-10 w-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB89TpsLkNbT8dFDyBJKBThMY2-dJREL9BO1_CKUFslKrkrUbYRi9W7C7OD4w4fuukrnO7Sl675r9Uu5-KKtcOcjD0GXnRJb4K3n7gyBKBz8Nypn9OZUuUl1_qKJtN0zlwafTG-UXEJyEtQr4-8JqDh3aMtdlaDAG-5Lz-Pbig5X8xGmzhHY4FGtW3v6MFDrO7fsfKRrfUzRW9R9SRNPTgHX6yMfAFBZVDbRdzrE9qIXZ8rlY4VNH3b9Bfidkx231TistKMKhzhEQWG"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline mb-6 sm:mb-8 leading-tight">
                Elevate Your Academic Impact
              </h2>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex gap-4">
                  <div className="bg-indigo-100 p-3 h-fit rounded-xl flex-shrink-0">
                    <span className="material-symbols-outlined text-indigo-600">schedule</span>
                  </div>
                  <div>
                    <h4 className="font-bold font-headline text-base sm:text-xl mb-1 text-on-surface">
                      Save 10+ Hours Weekly
                    </h4>
                    <p className="text-on-surface-variant text-sm sm:text-base">
                      Automate the most time-consuming administrative tasks without sacrificing
                      quality.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-indigo-100 p-3 h-fit rounded-xl flex-shrink-0">
                    <span className="material-symbols-outlined text-indigo-600">bolt</span>
                  </div>
                  <div>
                    <h4 className="font-bold font-headline text-base sm:text-xl mb-1 text-on-surface">
                      Faster Feedback Cycles
                    </h4>
                    <p className="text-on-surface-variant text-sm sm:text-base">
                      Students learn better with timely interventions. Give feedback in hours, not
                      weeks.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-indigo-100 p-3 h-fit rounded-xl flex-shrink-0">
                    <span className="material-symbols-outlined text-indigo-600">
                      psychology_alt
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold font-headline text-base sm:text-xl mb-1 text-on-surface">
                      Reduced Cognitive Burden
                    </h4>
                    <p className="text-on-surface-variant text-sm sm:text-base">
                      Prevent burnout by letting AI handle the routine formatting and data entry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Comparison Table ── */}
        <section
          id="compare"
          className="bg-indigo-50/40 py-14 sm:py-20 lg:py-32 border-t border-indigo-100/30"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline">
                How We Compare
              </h2>
              <p className="text-on-surface-variant mt-3 sm:mt-4 text-sm sm:text-base">
                See how Tadris AI stacks up against the tools you may already know.
              </p>
            </div>
            {/* Horizontally scrollable on mobile */}
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-indigo-100 min-w-[560px]">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-indigo-50 border-b border-indigo-100">
                      <th className="p-4 sm:p-6 font-headline font-bold text-on-surface text-sm sm:text-base">
                        Feature
                      </th>
                      <th className="p-4 sm:p-6 font-headline font-bold text-indigo-600 text-sm sm:text-base">
                        Tadris AI
                      </th>
                      <th className="p-4 sm:p-6 font-headline font-medium text-on-surface-variant text-sm sm:text-base">
                        NotebookLLM
                      </th>
                      <th className="p-4 sm:p-6 font-headline font-medium text-on-surface-variant text-sm sm:text-base">
                        Google Classroom
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-50">
                    <tr>
                      <td className="p-4 sm:p-6 font-medium text-on-surface text-sm sm:text-base">
                        NCAAA Compliance Reporting
                      </td>
                      <td className="p-4 sm:p-6">
                        <span className="material-symbols-outlined text-indigo-600">
                          check_circle
                        </span>
                      </td>
                      <td className="p-4 sm:p-6">
                        <span className="material-symbols-outlined text-outline/30">remove</span>
                      </td>
                      <td className="p-4 sm:p-6">
                        <span className="material-symbols-outlined text-outline/30">remove</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-6 font-medium text-on-surface text-sm sm:text-base">
                        Rubric-Based Grading
                      </td>
                      <td className="p-4 sm:p-6">
                        <span className="material-symbols-outlined text-indigo-600">
                          check_circle
                        </span>
                      </td>
                      <td className="p-4 sm:p-6">
                        <span className="material-symbols-outlined text-on-surface-variant/40">
                          circle
                        </span>
                      </td>
                      <td className="p-4 sm:p-6">
                        <span className="material-symbols-outlined text-on-surface-variant/40">
                          circle
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-6 font-medium text-on-surface text-sm sm:text-base">
                        Research Summarization
                      </td>
                      <td className="p-4 sm:p-6">
                        <span className="material-symbols-outlined text-indigo-600">
                          check_circle
                        </span>
                      </td>
                      <td className="p-4 sm:p-6">
                        <span className="material-symbols-outlined text-indigo-600">
                          check_circle
                        </span>
                      </td>
                      <td className="p-4 sm:p-6">
                        <span className="material-symbols-outlined text-outline/30">remove</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-6 font-medium text-on-surface text-sm sm:text-base">
                        LMS Deep Integration
                      </td>
                      <td className="p-4 sm:p-6">
                        <span className="material-symbols-outlined text-indigo-600">
                          check_circle
                        </span>
                      </td>
                      <td className="p-4 sm:p-6">
                        <span className="material-symbols-outlined text-outline/30">remove</span>
                      </td>
                      <td className="p-4 sm:p-6">
                        <span className="material-symbols-outlined text-indigo-600">
                          check_circle
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-6 font-medium text-on-surface text-sm sm:text-base">
                        AI Lesson Plan Generation
                      </td>
                      <td className="p-4 sm:p-6">
                        <span className="material-symbols-outlined text-indigo-600">
                          check_circle
                        </span>
                      </td>
                      <td className="p-4 sm:p-6">
                        <span className="material-symbols-outlined text-outline/30">remove</span>
                      </td>
                      <td className="p-4 sm:p-6">
                        <span className="material-symbols-outlined text-outline/30">remove</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-8 sm:mt-12 text-center">
              <a
                href="#waitlist"
                className="bg-primary-gradient text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-xl shadow-indigo-500/10 hover:opacity-90 transition-all inline-flex items-center gap-2 min-h-[48px]"
              >
                Start Saving Time Today{" "}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section
          id="testimonials"
          className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 lg:py-32"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline text-center mb-10 sm:mb-16 lg:mb-20">
            Voices from the Faculty
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-indigo-100 shadow-sm relative">
              <div className="absolute top-4 right-8 opacity-5">
                <span className="material-symbols-outlined text-6xl text-indigo-600">
                  format_quote
                </span>
              </div>
              <p className="text-base sm:text-lg italic text-on-surface mb-6 sm:mb-8 leading-relaxed">
                &quot;Tadris AI has fundamentally changed my workflow. The NCAAA reporting tool
                alone saves me two full days of work every semester. It&apos;s the first AI tool
                that actually understands the nuances of academic compliance.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-200 flex-shrink-0">
                  DR
                </div>
                <div>
                  <div className="font-bold font-headline text-on-surface text-sm sm:text-base">
                    Dr. Ahmed Al-Zahrani
                  </div>
                  <div className="text-xs sm:text-sm text-on-surface-variant">
                    Assistant Professor of Computer Science
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-indigo-100 shadow-sm relative">
              <div className="absolute top-4 right-8 opacity-5">
                <span className="material-symbols-outlined text-6xl text-indigo-600">
                  format_quote
                </span>
              </div>
              <p className="text-base sm:text-lg italic text-on-surface mb-6 sm:mb-8 leading-relaxed">
                &quot;As an adjunct juggling multiple courses, the automated grading assistant is a
                lifesaver. It provides a great first pass that helps me focus my attention on the
                students who need it most.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-200 flex-shrink-0">
                  MS
                </div>
                <div>
                  <div className="font-bold font-headline text-on-surface text-sm sm:text-base">
                    Maria Santos
                  </div>
                  <div className="text-xs sm:text-sm text-on-surface-variant">
                    Adjunct Professor, Humanities
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final Signup / Waitlist ── */}
        <section id="waitlist" className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 lg:py-32">
          <div className="bg-primary-gradient rounded-2xl sm:rounded-3xl p-7 sm:p-12 text-white flex flex-col lg:flex-row gap-8 sm:gap-12 items-center shadow-2xl shadow-indigo-500/30">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline mb-4 sm:mb-6 leading-tight">
                Ready to Focus on What Matters?
              </h2>
              <p className="text-indigo-100 text-sm sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                Join 500+ faculty members already using Tadris AI to reclaim their time. Early
                access members get 50% off for life.
              </p>
            </div>
            <div className="lg:w-1/2 w-full bg-glass p-6 sm:p-8 rounded-xl sm:rounded-2xl text-on-surface border border-white/40">
              <form className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-indigo-950 mb-2">
                    University Email
                  </label>
                  <input
                    className="w-full bg-white border border-outline-variant/50 rounded-xl px-4 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-sm sm:text-base min-h-[48px]"
                    placeholder="dr.smith@university.edu"
                    type="email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-indigo-950 mb-2">
                    Primary Role
                  </label>
                  <select className="w-full bg-white border border-outline-variant/50 rounded-xl px-4 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-sm sm:text-base min-h-[48px]">
                    <option>Professor</option>
                    <option>Assistant Professor</option>
                    <option>Adjunct</option>
                    <option>Researcher</option>
                    <option>Department Head</option>
                    <option>Dean / Administrator</option>
                  </select>
                </div>
                <button
                  className="w-full bg-primary-gradient text-white py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:shadow-lg transition-all active:scale-[0.98]"
                  type="submit"
                >
                  Join the Waitlist
                </button>
              </form>
              <p className="text-center text-xs text-on-surface-variant mt-4 sm:mt-6">
                Enterprise-grade security. GDPR &amp; NCAAA compliant.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-indigo-100">
        <div className="flex flex-col items-center md:flex-row md:justify-between max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-8 gap-6 sm:gap-8 text-center md:text-left">
          <div>
            <a
              href="#"
              className="inline-block text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-headline mb-1 sm:mb-2 hover:opacity-80 transition-opacity"
            >
              Tadris AI
            </a>
            <div className="text-xs tracking-wide text-on-surface-variant">
              &copy; 2026 Tadris AI. Empathetic AI for Educators.
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs tracking-wide font-medium text-on-surface-variant">
            <a className="hover:text-indigo-600 transition-all" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-indigo-600 transition-all" href="#">
              Terms of Service
            </a>
            <a className="hover:text-indigo-600 transition-all" href="#">
              Cookie Policy
            </a>
            <a className="hover:text-indigo-600 transition-all" href="#">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
