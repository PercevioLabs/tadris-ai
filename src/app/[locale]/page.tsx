"use client";

import { useState, useEffect } from "react";
import { useDictionary } from "./DictionaryProvider";
import { useFormatNumber } from "./formatters";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const CapabilityExplorer = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const t = useDictionary();
  const fn = useFormatNumber();

  const capabilities = [
    {
      id: "lecture",
      navTitle: t.capabilities.lecture.navTitle,
      outcome: t.capabilities.lecture.outcome,
      description: t.capabilities.lecture.description,
      icon: "auto_mode",
      color: "blue",
    },
    {
      id: "exams",
      navTitle: t.capabilities.exams.navTitle,
      outcome: t.capabilities.exams.outcome,
      description: t.capabilities.exams.description,
      icon: "fact_check",
      color: "emerald",
    },
    {
      id: "grading",
      navTitle: t.capabilities.grading.navTitle,
      outcome: t.capabilities.grading.outcome,
      description: t.capabilities.grading.description,
      icon: "reviews",
      color: "indigo",
    },
    {
      id: "assistant",
      navTitle: t.capabilities.assistant.navTitle,
      outcome: t.capabilities.assistant.outcome,
      description: t.capabilities.assistant.description,
      icon: "support_agent",
      color: "amber",
    },
    {
      id: "planner",
      navTitle: t.capabilities.planner.navTitle,
      outcome: t.capabilities.planner.outcome,
      description: t.capabilities.planner.description,
      icon: "architecture",
      color: "rose",
    },
    {
      id: "slides",
      navTitle: t.capabilities.slides.navTitle,
      outcome: t.capabilities.slides.outcome,
      description: t.capabilities.slides.description,
      icon: "present_to_all",
      color: "cyan",
    },
    {
      id: "collaborative",
      navTitle: t.capabilities.collaborative.navTitle,
      outcome: t.capabilities.collaborative.outcome,
      description: t.capabilities.collaborative.description,
      icon: "hub",
      color: "violet",
    },
    {
      id: "labs",
      navTitle: t.capabilities.labs.navTitle,
      outcome: t.capabilities.labs.outcome,
      description: t.capabilities.labs.description,
      icon: "science",
      color: "orange",
    },
    {
      id: "pedagogy",
      navTitle: t.capabilities.pedagogy.navTitle,
      outcome: t.capabilities.pedagogy.outcome,
      description: t.capabilities.pedagogy.description,
      icon: "tips_and_updates",
      color: "fuchsia",
    },
    {
      id: "ncaaa",
      navTitle: t.capabilities.ncaaa.navTitle,
      outcome: t.capabilities.ncaaa.outcome,
      description: t.capabilities.ncaaa.description,
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
      <div className="w-full lg:w-[320px] lg:sticky lg:top-32 space-y-1 hidden sm:block">
        <div className="mb-4 px-4 py-2 border-b border-indigo-100 flex items-center justify-between">
          <span className="text-[10px] font-bold text-indigo-900/40 uppercase tracking-widest">
            Outcome Index
          </span>
          <span className="text-[10px] font-mono text-indigo-400">
            {fn(activeIdx + 1)} / {fn(capabilities.length)}
          </span>
        </div>
        <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-1 scrollbar-hide no-scrollbar">
          {capabilities.map((cap, idx) => (
            <button
              key={cap.id}
              onClick={() => handleSwitch(idx)}
              className={`flex-shrink-0 group relative w-full text-start px-5 py-4 rounded-xl transition-all duration-300 flex items-center gap-4 ${
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
                <div className="absolute end-4 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" />
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

              {/* Navigation Chevrons (Desktop Only) */}
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => handleSwitch(prevIdx)}
                  className="w-10 h-10 rounded-full border border-indigo-100 flex items-center justify-center text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all active:scale-95 flip-rtl"
                  aria-label="Previous Outcome"
                >
                  <span className="material-symbols-outlined text-lg rtl:rotate-180">
                    chevron_left
                  </span>
                </button>
                <button
                  onClick={() => handleSwitch(nextIdx)}
                  className="w-10 h-10 rounded-full border border-indigo-100 flex items-center justify-center text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all active:scale-95 flip-rtl"
                  aria-label="Next Outcome"
                >
                  <span className="material-symbols-outlined text-lg rtl:rotate-180">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>

            <div className={`mb-8 text-start`}>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest text-${current.color}-600/60 mb-4 block`}
              >
                {t.capabilities.label}: {current.navTitle}
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline text-on-surface leading-[1.1] tracking-tight mb-8">
                {current.outcome}
              </h3>
              <p className="text-on-surface-variant text-lg sm:text-xl leading-relaxed max-w-2xl">
                {current.description}
              </p>
            </div>
          </div>

          <div className="mt-12 relative lg:mt-12">
            <div className="flex sm:flex-row flex-col items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a
                  href="#waitlist"
                  className="bg-primary-gradient text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all"
                >
                  {t.nav.joinWaitlist}
                </a>
                <div className="flex items-center gap-2 text-on-surface-variant font-medium text-sm">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  {t.features.badgeSaudi}
                </div>
              </div>

              {/* Navigation Chevrons (Mobile Only) */}
              <div className="lg:hidden flex items-center justify-between w-full sm:w-auto pt-6 border-t border-indigo-50 sm:border-t-0 sm:pt-0">
                <div className="text-xs font-mono text-indigo-400">
                  {fn(activeIdx + 1)} / {fn(capabilities.length)}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleSwitch(prevIdx)}
                    className="w-12 h-12 rounded-full border border-indigo-100 flex items-center justify-center text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all active:scale-95"
                    aria-label="Previous Outcome"
                  >
                    <span className="material-symbols-outlined text-xl rtl:rotate-180">
                      chevron_left
                    </span>
                  </button>
                  <button
                    onClick={() => handleSwitch(nextIdx)}
                    className="w-12 h-12 rounded-full border border-indigo-100 flex items-center justify-center text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all active:scale-95"
                    aria-label="Next Outcome"
                  >
                    <span className="material-symbols-outlined text-xl rtl:rotate-180">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Background Decorative Shape */}
          <div
            className={`absolute top-0 end-0 w-1/2 h-full bg-gradient-to-l rtl:bg-gradient-to-r from-${current.color}-50/30 to-transparent pointer-events-none -z-10 rounded-e-[2.5rem]`}
          />
        </div>
      </div>
    </div>
  );
};


export default function Page() {
  const t = useDictionary();
  const fn = useFormatNumber();

  const roleOptions = [
    { value: "Professor (Full / Associate / Assistant)", label: t.waitlist.role1 },
    { value: "Lecturer", label: t.waitlist.role2 },
    { value: "Course Coordinator", label: t.waitlist.role3 },
    { value: "Department Head", label: t.waitlist.role4 },
    { value: "Dean / Vice Dean of Academic Affairs", label: t.waitlist.role5 },
  ];

  // Waitlist Form State
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roleOptions[0].value);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(t.waitlist.successDefault);
        setEmail("");
      } else {
        setStatus("error");
        if (res.status === 409) {
          setMessage(t.waitlist.errorAlreadyExists);
        } else {
          setMessage(data.message || t.waitlist.errorDefault);
        }
      }
    } catch (err) {
      console.error("Waitlist Error:", err);
      setStatus("error");
      setMessage(t.waitlist.errorDefault);
    }
  };

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

  return (
    <div className="bg-surface text-on-surface font-body hero-glow min-h-screen">
      <Navbar />

      <main className="pt-20">
        {/* ── Hero Section ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 lg:py-24 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center relative">
          <div className="lg:w-1/2 space-y-6 lg:space-y-8 z-10 text-center lg:text-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wide uppercase border border-indigo-100">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              {t.hero.badge}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline leading-[1.1] tracking-tight text-on-surface">
              {t.hero.titlePart1}{" "}
              <span className="text-transparent bg-clip-text bg-primary-gradient">
                {t.hero.titleHighlight}
              </span>{" "}
              {t.hero.titlePart2}
            </h1>
            <p className="text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed mx-auto lg:mx-0 lg:text-start">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1">
              <a
                href="#waitlist"
                className="bg-primary-gradient text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] hover:shadow-indigo-600/40 transition-all text-center flex items-center justify-center"
              >
                {t.hero.cta}
              </a>
              {/* <a
                href="#the-impact"
                className="bg-white text-indigo-600 border border-indigo-100 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-xl">speed</span>
                See the Impact
              </a> */}
            </div>
          </div>

          {/* ── Hero Product Mockup ── */}
          <div className="lg:w-1/2 relative w-full flex justify-center items-center py-8 mt-4 lg:mt-0">
            {/* Ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 sm:w-80 sm:h-80 bg-indigo-400/10 blur-3xl rounded-full" />
            </div>

            {/* Floating badge — top left */}
            <div className="absolute -left-2 sm:-left-4 top-4 z-20 badge-slide-left bg-white border border-emerald-100 rounded-full px-3 py-1.5 shadow-xl shadow-emerald-500/10 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <div className="text-[11px] font-bold text-on-surface leading-none">
                {t.hero.floatingBadgeLeft}
              </div>
            </div>

            {/* Floating badge — bottom right */}
            <div className="absolute -right-2 sm:-right-4 bottom-6 z-20 badge-slide-right bg-primary-gradient rounded-full px-3 py-1.5 shadow-xl shadow-indigo-500/20 flex items-center gap-2 text-white">
              <span
                className="material-symbols-outlined text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <div className="text-[11px] font-bold leading-none">{t.hero.floatingBadgeRight}</div>
            </div>

            {/* Main app window card */}
            <div className="relative w-full max-w-[440px] lg:max-w-[500px] 2xl:max-w-[580px] z-10 animate-float border border-outline-variant/80 rounded-2xl">
              {/* macOS chrome */}
              <div className="bg-surface-container-highest rounded-t-2xl px-4 py-3 flex items-center gap-2 border border-outline-variant/20 border-b-0">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
                <div className="flex-1 mx-4">
                  <div className="bg-white/60 rounded-md px-3 py-1 text-[11px] text-on-surface-variant text-center font-mono">
                    {t.hero.mockup.url}
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="bg-[#f7f7fc] p-3 rounded-b-2xl">
                <div className="bg-white rounded-xl border border-outline-variant/80 overflow-hidden">
                  {/* Top Row */}
                  <div className="px-5 py-3 flex items-center justify-between border-b border-outline-variant/10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                        SA
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-on-surface">
                            {t.hero.mockup.studentName}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 uppercase tracking-tight">
                            {t.hero.mockup.aiDraft}
                          </span>
                        </div>
                        <div className="text-[11px] text-on-surface-variant">
                          {t.hero.mockup.courseInfo}
                        </div>
                      </div>
                    </div>
                    <div className="text-end hero-score" style={{ animationDelay: "0.5s" }}>
                      <div className="text-[32px] font-extrabold font-headline text-transparent bg-clip-text bg-primary-gradient leading-none">
                        {fn(15)}
                      </div>
                      <div className="text-[9px] font-bold text-indigo-500/50 uppercase tracking-widest mt-1">
                        {t.hero.mockup.questionsLabel}
                      </div>
                    </div>
                  </div>

                  {/* Questions Container */}
                  <div className="px-5 py-1 space-y-3">
                    {/* Q1 */}
                    <div className="space-y-2 bg-[#fafafa] p-2 rounded-lg border border-slate-200/50">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-bold uppercase tracking-tight">
                            {t.hero.mockup.mcqLabel}
                          </span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold uppercase tracking-tight">
                            {t.hero.mockup.mediumLabel}
                          </span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant font-medium">
                          {t.hero.mockup.qPrefix}
                          {fn(1)} {t.hero.mockup.of} {fn(15)}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-on-surface leading-snug">
                        {t.hero.mockup.q1Question}
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {t.hero.mockup.q1Options.map((opt) => (
                          <div
                            key={opt}
                            className={`flex items-center gap-2 px-3 ${
                              opt === t.hero.mockup.q1Options[1]
                                ? "border-indigo-200"
                                : "border-outline-variant/30"
                            }`}
                          >
                            <div
                              className={`w-3 h-3 rounded-full flex items-center justify-center ${
                                opt === t.hero.mockup.q1Options[1]
                                  ? "bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.4)]"
                                  : "border border-outline-variant"
                              }`}
                            />
                            <span
                              className={`text-[10px] ${
                                opt === t.hero.mockup.q1Options[1]
                                  ? "text-indigo-900 font-bold"
                                  : "text-on-surface-variant font-medium"
                              }`}
                            >
                              {opt}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Q2 */}
                    <div className="space-y-2 bg-[#fafafa] p-2 rounded-lg border border-slate-200/50">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-bold uppercase tracking-tight">
                            {t.hero.mockup.shortAnswerLabel}
                          </span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold uppercase tracking-tight">
                            {t.hero.mockup.hardLabel}
                          </span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant font-medium">
                          {t.hero.mockup.qPrefix}
                          {fn(2)} {t.hero.mockup.of} {fn(15)}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-on-surface leading-snug">
                        {t.hero.mockup.q2Question}
                      </div>
                      <div className="px-3 py-2 rounded-md border border-dashed border-outline-variant/90 text-[11px] text-on-surface-variant italic">
                        {t.hero.mockup.studentAnswerPlaceholder}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-5 pb-5 pt-1 flex gap-3">
                    <button className="flex-1 bg-primary-gradient text-white text-[11px] font-bold py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 hover:scale-[1.02] transition-all">
                      {t.nav.joinWaitlist}
                    </button>
                    <button className="px-4 py-2.5 rounded-xl border border-indigo-100 text-[11px] font-bold text-indigo-600 hover:bg-indigo-50/50 transition-all">
                      {t.hero.mockup.editLabel}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Social Proof ── */}
        <section className="bg-indigo-50/40 py-10 sm:py-14 border-y border-indigo-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 md:gap-24 opacity-80">
            {/* Badge 1 */}
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl sm:text-4xl text-indigo-600">
                school
              </span>
              <span className="font-headline font-bold text-base sm:text-xl tracking-tight text-on-surface">
                {t.socialProof.badge1}
              </span>
            </div>

            {/* Divider (Desktop Only) */}
            <div className="hidden sm:block w-px h-8 bg-indigo-200/50" />

            {/* Badge 2 */}
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl sm:text-4xl text-indigo-600">
                translate
              </span>
              <span className="font-headline font-bold text-base sm:text-xl tracking-tight text-on-surface">
                {t.socialProof.badge2}
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
                {t.problem.sectionLabel}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline mb-6 tracking-tight text-on-surface">
                {t.problem.title}
              </h2>
              <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                {t.problem.subtitle}
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
                    {t.problem.scenario1Title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">
                    {t.problem.scenario1Text}
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
                    {t.problem.scenario2Title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">
                    {t.problem.scenario2Text}
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
                    {t.problem.scenario3Title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">
                    {t.problem.scenario3Text}
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
                    You recorded a great lecture last week. It&apos;s sitting in a folder, doing
                    nothing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section
          id="how-it-works"
          className="py-20 sm:py-28 lg:py-36 bg-surface relative overflow-hidden"
        >
          {/* Subtle background flow */}
          <div className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-indigo-50/20 blur-[120px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-16 sm:mb-24">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline mb-6 tracking-tight">
                {t.howItWorks.title}
              </h2>
              <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                {t.howItWorks.subtitle}
              </p>
            </div>

            <div className="relative">
              {/* Desktop Connecting Line */}
              <div className="hidden md:block absolute top-[110px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent z-0" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 relative z-10">
                {/* Step 1 */}
                <div className="group text-center">
                  <div className="relative mx-auto mb-10 w-24 h-24 rounded-3xl bg-white border border-indigo-100 flex items-center justify-center shadow-xl shadow-indigo-500/5 group-hover:scale-105 transition-all duration-500">
                    <div className="absolute -top-3 -start-3 w-10 h-10 rounded-xl bg-primary-gradient text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {t.howItWorks.step1Num}
                    </div>
                    <span
                      className="material-symbols-outlined text-indigo-600 text-4xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      cloud_upload
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-headline mb-4 text-on-surface tracking-tight">
                    {t.howItWorks.step1Title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base px-2">
                    {t.howItWorks.step1Text}
                  </p>
                </div>

                {/* Step 2 */}
                <div className="group text-center">
                  <div className="relative mx-auto mb-10 w-24 h-24 rounded-3xl bg-white border border-indigo-100 flex items-center justify-center shadow-xl shadow-indigo-500/5 group-hover:scale-105 transition-all duration-500">
                    <div className="absolute -top-3 -start-3 w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {t.howItWorks.step2Num}
                    </div>
                    <span
                      className="material-symbols-outlined text-purple-600 text-4xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_awesome_motion
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-headline mb-4 text-on-surface tracking-tight">
                    {t.howItWorks.step2Title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base px-2">
                    {t.howItWorks.step2Text}
                  </p>
                </div>

                {/* Step 3 */}
                <div className="group text-center">
                  <div className="relative mx-auto mb-10 w-24 h-24 rounded-3xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shadow-xl shadow-indigo-600/10 group-hover:scale-105 transition-all duration-500 ring-4 ring-indigo-500/5">
                    <div className="absolute -top-3 -start-3 w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {t.howItWorks.step3Num}
                    </div>
                    <span
                      className="material-symbols-outlined text-indigo-700 text-4xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      fact_check
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-headline mb-4 text-on-surface tracking-tight">
                    {t.howItWorks.step3Title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base px-2">
                    {t.howItWorks.step3Text}
                  </p>
                </div>
              </div>

              {/* Integrated Trust Marker */}
              <div className="mt-16 sm:mt-24 text-center">
                <div className="inline-flex items-center gap-2 text-indigo-600/70 font-bold text-sm tracking-tight border-t border-indigo-100/50 pt-8 px-12">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                  {t.howItWorks.trustMarker}
                </div>
              </div>
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
            <div className="mb-20 sm:mb-28 text-center lg:text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/80 text-indigo-600 text-[10px] font-bold tracking-widest uppercase border border-indigo-100/50 mb-6 font-mono">
                {t.features.sectionLabel}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline tracking-tighter text-on-surface leading-[0.95] mb-8">
                {t.features.title}
              </h2>
              <p className="text-on-surface-variant text-lg sm:text-xl max-w-2xl leading-relaxed">
                {t.features.subtitle}
              </p>
            </div>

            <CapabilityExplorer />
          </div>
        </section>

        {/* ── Differentiators ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 lg:py-32">
          <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
            <div className="md:w-1/3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight leading-tight">
                {t.differentiators.title}
              </h2>
              <p className="mt-4 sm:mt-6 text-on-surface-variant leading-relaxed text-sm sm:text-base">
                {t.differentiators.subtitle}
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-10 lg:gap-x-12 gap-y-10 lg:gap-y-16">
              <div>
                <h4 className="font-bold font-headline text-base sm:text-lg mb-2 text-indigo-600 flex items-center gap-2">
                  <span className="material-symbols-outlined">person_check</span>{" "}
                  {t.differentiators.teacherControlTitle}
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {t.differentiators.teacherControlText}
                </p>
              </div>
              <div>
                <h4 className="font-bold font-headline text-base sm:text-lg mb-2 text-indigo-600 flex items-center gap-2">
                  <span className="material-symbols-outlined">visibility</span>{" "}
                  {t.differentiators.transparentOutputsTitle}
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {t.differentiators.transparentOutputsText}
                </p>
              </div>
              <div>
                <h4 className="font-bold font-headline text-base sm:text-lg mb-2 text-indigo-600 flex items-center gap-2">
                  <span className="material-symbols-outlined">security</span>{" "}
                  {t.differentiators.groundedTitle}
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {t.differentiators.groundedText}
                </p>
              </div>
              <div>
                <h4 className="font-bold font-headline text-base sm:text-lg mb-2 text-indigo-600 flex items-center gap-2">
                  <span className="material-symbols-outlined">lock</span>{" "}
                  {t.differentiators.dataPrivacyTitle}
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {t.differentiators.dataPrivacyText}
                </p>
              </div>
              <div>
                <h4 className="font-bold font-headline text-base sm:text-lg mb-2 text-indigo-600 flex items-center gap-2">
                  <span className="material-symbols-outlined">edit_note</span>{" "}
                  {t.differentiators.customizableTitle}
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {t.differentiators.customizableText}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Impact Section ── */}
        <section
          id="the-impact"
          className="bg-indigo-50/50 py-14 sm:py-20 lg:py-32 border-y border-indigo-100/30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline mb-4 tracking-tight">
                {t.impact.title}
              </h2>
              <p className="text-on-surface-variant text-sm sm:text-base">{t.impact.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-indigo-100 shadow-2xl">
              <div className="bg-white p-7 sm:p-12">
                <div className="text-on-surface-variant font-bold text-xs uppercase tracking-widest mb-4 sm:mb-6">
                  {t.impact.oldWay}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-headline mb-6 sm:mb-8">
                  {t.impact.oldTitle}
                </h3>
                <ul className="space-y-4 sm:space-y-6">
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-outline flex-shrink-0">
                      close
                    </span>
                    <span className="text-on-surface-variant text-sm sm:text-base">
                      {t.impact.old1}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-outline flex-shrink-0">
                      close
                    </span>
                    <span className="text-on-surface-variant text-sm sm:text-base">
                      {t.impact.old2}
                    </span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-outline flex-shrink-0">
                      close
                    </span>
                    <span className="text-on-surface-variant text-sm sm:text-base">
                      {t.impact.old3}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-primary-gradient text-white p-7 sm:p-12 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 p-8 opacity-10">
                  <span className="material-symbols-outlined text-[200px]">bolt</span>
                </div>
                <div className="text-indigo-100 font-bold text-xs uppercase tracking-widest mb-4 sm:mb-6">
                  {t.impact.newWay}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-headline mb-6 sm:mb-8">
                  {t.impact.newTitle}
                </h3>
                <ul className="space-y-4 sm:space-y-6">
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-indigo-200 flex-shrink-0">
                      check_circle
                    </span>
                    <span className="text-white text-sm sm:text-base">{t.impact.new1}</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-indigo-200 flex-shrink-0">
                      check_circle
                    </span>
                    <span className="text-white text-sm sm:text-base">{t.impact.new2}</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-indigo-200 flex-shrink-0">
                      check_circle
                    </span>
                    <span className="text-white text-sm sm:text-base">{t.impact.new3}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Benefits Section (Redesigned without image) ── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32 lg:py-48 relative overflow-hidden text-center">
          {/* Background Decorative elements to fill space since image is removed */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/20 blur-[120px] rounded-full -z-10" />

          <div className="max-w-3xl mx-auto mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline leading-[1.1] tracking-tight text-on-surface mb-6">
              {t.benefits.title}
            </h2>
            <p className="text-on-surface-variant text-lg sm:text-xl leading-relaxed">
              {t.benefits.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {/* Benefit Card 1 */}
            <div className="group p-8 sm:p-10 rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl shadow-indigo-500/5 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 text-left">
              <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-indigo-600 text-3xl">schedule</span>
              </div>
              <h4 className="font-bold font-headline text-2xl mb-4 text-on-surface">
                {t.benefits.b1Title}
              </h4>
              <p className="text-on-surface-variant leading-relaxed">{t.benefits.b1Text}</p>
            </div>

            {/* Benefit Card 2 */}
            <div className="group p-8 sm:p-10 rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl shadow-indigo-500/5 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 text-left">
              <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-purple-600 text-3xl">bolt</span>
              </div>
              <h4 className="font-bold font-headline text-2xl mb-4 text-on-surface">
                {t.benefits.b2Title}
              </h4>
              <p className="text-on-surface-variant leading-relaxed">{t.benefits.b2Text}</p>
            </div>

            {/* Benefit Card 3 */}
            <div className="group p-8 sm:p-10 rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl shadow-indigo-500/5 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 text-left">
              <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-amber-600 text-3xl">
                  psychology_alt
                </span>
              </div>
              <h4 className="font-bold font-headline text-2xl mb-4 text-on-surface">
                {t.benefits.b3Title}
              </h4>
              <p className="text-on-surface-variant leading-relaxed">{t.benefits.b3Text}</p>
            </div>
          </div>
        </section>

        {/* ── Comparison Table ── */}
        <section
          id="compare"
          className="bg-surface py-14 sm:py-20 lg:py-32 border-t border-indigo-100/30"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight">
                {t.comparison.title}
              </h2>
              <p className="text-on-surface-variant mt-3 sm:mt-4 text-sm sm:text-base">
                {t.comparison.subtitle}
              </p>
            </div>
            {/* Horizontally scrollable on mobile */}
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-indigo-100 min-w-[560px]">
                <table className="w-full text-start">
                  <thead>
                    <tr className="bg-indigo-50 border-b border-indigo-100">
                      <th className="p-4 sm:p-6 font-headline font-bold text-on-surface text-sm sm:text-base text-start">
                        {t.comparison.headerFeature}
                      </th>
                      <th className="p-4 sm:p-6 font-headline font-bold text-indigo-600 text-sm sm:text-base">
                        {t.comparison.headerTadris}
                      </th>
                      <th className="p-4 sm:p-6 font-headline font-medium text-on-surface-variant text-sm sm:text-base">
                        {t.comparison.headerNotebook}
                      </th>
                      <th className="p-4 sm:p-6 font-headline font-medium text-on-surface-variant text-sm sm:text-base">
                        {t.comparison.headerClassroom}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-50">
                    {/* Row 1: NCAAA */}
                    <tr>
                      <td className="p-4 sm:p-6 font-medium text-on-surface text-sm sm:text-base text-start">
                        {t.comparison.f1}
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
                    {/* Row 2: Arabic */}
                    <tr>
                      <td className="p-4 sm:p-6 font-medium text-on-surface text-sm sm:text-base text-start">
                        {t.comparison.f2}
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
                    {/* Row 3: CLO/PLO */}
                    <tr>
                      <td className="p-4 sm:p-6 font-medium text-on-surface text-sm sm:text-base text-start">
                        {t.comparison.f3}
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
                    {/* Row 4: Essay grading */}
                    <tr>
                      <td className="p-4 sm:p-6 font-medium text-on-surface text-sm sm:text-base text-start">
                        {t.comparison.f4}
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
                    {/* Row 5: Session recordings */}
                    <tr>
                      <td className="p-4 sm:p-6 font-medium text-on-surface text-sm sm:text-base text-start">
                        {t.comparison.f5}
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
                        <span className="material-symbols-outlined text-outline/30">remove</span>
                      </td>
                    </tr>
                    {/* Row 6: PDPL */}
                    <tr>
                      <td className="p-4 sm:p-6 font-medium text-on-surface text-sm sm:text-base text-start">
                        {t.comparison.f6}
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
                    {/* Row 7: Human in the loop */}
                    <tr>
                      <td className="p-4 sm:p-6 font-medium text-on-surface text-sm sm:text-base text-start">
                        {t.comparison.f7}
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
                    {/* Row 8: Peer benchmarking */}
                    <tr>
                      <td className="p-4 sm:p-6 font-medium text-on-surface text-sm sm:text-base text-start">
                        {t.comparison.f8}
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
                {t.nav.joinWaitlist}{" "}
                <span className="material-symbols-outlined text-sm rtl:-scale-x-100">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </section>

        <section
          id="waitlist"
          className="bg-indigo-50/40 border-t border-indigo-100/30 py-14 sm:py-20 lg:py-32"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="bg-primary-gradient rounded-2xl sm:rounded-3xl p-7 sm:p-12 text-white flex flex-col lg:flex-row gap-8 sm:gap-12 items-center shadow-2xl shadow-indigo-500/30">
              <div className="lg:w-1/2 text-center lg:text-start">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-headline mb-6 leading-tight tracking-tight">
                  {t.waitlist.title}
                </h2>
                <p className="text-indigo-100 text-sm sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {t.waitlist.subtitle}
                </p>
              </div>
              <div className="lg:w-1/2 w-full bg-glass p-6 sm:p-8 rounded-xl sm:rounded-2xl text-on-surface border border-white/40">
                <form onSubmit={handleWaitlistSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-indigo-950 mb-2">
                      {t.waitlist.emailLabel}
                    </label>
                    <input
                      required
                      className="w-full bg-white border border-outline-variant/50 rounded-xl px-4 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-sm sm:text-base min-h-[48px]"
                      placeholder={t.waitlist.emailPlaceholder}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-indigo-950 mb-2">
                      {t.waitlist.roleLabel}
                    </label>
                    <select
                      className="w-full bg-white border border-outline-variant/50 rounded-xl px-4 py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-sm sm:text-base min-h-[48px]"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      disabled={status === "loading"}
                    >
                      {roleOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className={`w-full text-white py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                      status === "loading"
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-primary-gradient hover:shadow-lg"
                    }`}
                    type="submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t.waitlist.submitting}
                      </>
                    ) : (
                      t.waitlist.submitButton
                    )}
                  </button>

                  {message && (
                    <div
                      className={`p-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${
                        status === "success"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : "bg-rose-50 text-rose-700 border border-rose-100"
                      }`}
                    >
                      {message}
                    </div>
                  )}
                </form>
                <p className="text-center text-xs text-on-surface-variant mt-4 sm:mt-6">
                  {t.waitlist.trustFooter}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
