"use client";

import { useState, useEffect } from "react";

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

  function VelocityComparison() {
    const [state, setState] = useState<"syncing" | "processing" | "ready">("syncing");

    useEffect(() => {
      let t1: NodeJS.Timeout, t2: NodeJS.Timeout, tReset: NodeJS.Timeout;
      
      const cycle = () => {
        setState("syncing");
        t1 = setTimeout(() => setState("processing"), 1200);
        t2 = setTimeout(() => setState("ready"), 2500);
        tReset = setTimeout(() => cycle(), 8000);
      };
      
      cycle();
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(tReset); };
    }, []);

    const scrollRows = [
      ["Abdullah Al-Qahtani", "61/80", "78/100", "B+"],
      ["Sara Al-Mutairi", "74/80", "92/100", "A"],
      ["Fahad Bin Salman", "48/80", "64/100", "C"],
      ["Noura Al-Zahrani", "68/80", "85/100", "A-"],
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-indigo-100 shadow-2xl max-w-5xl mx-auto md:h-[480px]">
        {/* ══ LEFT: The Old Way ══ */}
        <div className="bg-[#F1F5F9] border-b md:border-b-0 md:border-r border-indigo-100 relative overflow-hidden">
          <div className="p-4 sm:p-6 h-full flex flex-col relative z-10 w-full max-w-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-0.5">
                  The Old Way
                </p>
                <p className="text-2xl sm:text-3xl font-black text-slate-400 font-headline leading-none">
                  5 Hours
                </p>
              </div>
              <span className="bg-slate-200 text-slate-500 px-2.5 py-1 rounded text-[9px] font-bold tracking-wide flex-shrink-0">
                LEGACY
              </span>
            </div>

            <div className="relative flex-1 min-h-[300px] bg-white rounded-xl border border-slate-200 overflow-hidden shadow-inner grayscale opacity-80">
              {/* 2 identical copies → translateY(-50%) loops seamlessly */}
              <div className="animate-scroll-infinite">
                {[0, 1].map((copy) => (
                  <div key={copy} className="p-3 space-y-3">
                    <div className="border border-slate-200 rounded overflow-hidden text-[8px]">
                      <div className="bg-slate-100 grid grid-cols-4 font-bold text-slate-500 border-b border-slate-200">
                        {["Student Name", "Midterm", "Final Exam", "Grade"].map((h) => (
                          <div key={h} className="p-1 px-1.5 border-r border-slate-200 last:border-0">{h}</div>
                        ))}
                      </div>
                      {scrollRows.map((row, i) => (
                        <div key={i} className="grid grid-cols-4 border-b border-slate-100 last:border-0">
                          <div className="p-1 px-1.5 border-r border-slate-100 max-w-[70px] truncate">{row[0]}</div>
                          <div className="p-1 px-1.5 border-r border-slate-100">{row[1]}</div>
                          <div className="p-1 px-1.5 border-r border-slate-100">{row[2]}</div>
                          <div className="p-1 px-1.5 border-r border-slate-100">{row[3]}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="h-4 bg-slate-100 rounded text-[7px] font-bold flex items-center px-2 text-slate-400 uppercase">
                        Section 3 · CLO Analysis (manually entered)
                      </div>
                      <div className="p-2 border border-slate-100 rounded bg-slate-50 space-y-1.5">
                        <div className="flex gap-1.5 mb-1">
                          <div className="h-2 w-full bg-slate-200 rounded"></div>
                        </div>
                        <div className="flex gap-1.5 mb-1">
                          <div className="h-2 w-5/6 bg-slate-100 rounded"></div>
                        </div>
                        <div className="flex gap-1.5 mb-1">
                          <div className="h-2 w-4/6 bg-slate-100 rounded"></div>
                        </div>
                        <div className="h-7 w-full bg-white border border-slate-200 rounded flex items-center px-2 text-[7px] text-slate-300 italic">
                          Type improvement plan here…
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 pb-2">
                        {["CLO 1", "CLO 2", "CLO 3"].map((l) => (
                          <div key={l} className="bg-slate-50 border border-slate-100 rounded p-1.5">
                            <p className="text-[7px] font-bold text-slate-400 mb-1">{l}</p>
                            <div className="h-1 w-full bg-slate-200 rounded mb-1"></div>
                            <div className="h-1 w-2/3 bg-slate-100 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 pb-4">
                      {[
                        "Exporting Excel manually",
                        "Calculating CLO % by hand",
                        "Writing improvement plans",
                      ].map((t) => (
                        <div key={t} className="flex items-center gap-1.5 text-[7.5px] text-slate-400">
                          <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0"></span>
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/80 to-transparent pointer-events-none"></div>
            </div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>
        </div>

        {/* ══ RIGHT: The Tadris Way ══ */}
        <div className="bg-white flex flex-col relative">
          {/* subtle loading gradient overlay */}
          <div className={`absolute inset-0 bg-indigo-50/50 z-20 pointer-events-none transition-opacity duration-1000 ${state === 'syncing' ? 'opacity-100' : 'opacity-0'}`}></div>

          <div className="p-4 sm:p-6 flex-1 flex flex-col w-full max-w-full relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest mb-0.5 transition-colors">
                  The Tadris Way
                </p>
                <p className="text-2xl sm:text-3xl font-black text-indigo-600 font-headline leading-none">
                  45 Seconds
                </p>
              </div>
              <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 px-2.5 py-1 rounded text-[9px] font-bold tracking-wide flex-shrink-0">
                AI POWERED
              </span>
            </div>

            <div className="flex-1 bg-indigo-50/40 rounded-xl border border-indigo-100 p-3 flex flex-col pt-3 min-h-[300px]">
              <div className="flex flex-col gap-2.5 overflow-hidden">
                <div className="flex items-center justify-between bg-white rounded border border-indigo-100/50 px-2.5 py-1.5 shadow-sm">
                  <div className={`flex items-center gap-1.5 text-[9px] font-bold transition-colors ${state === 'syncing' ? 'text-indigo-400' : 'text-indigo-700'}`}>
                    {state === 'syncing' ? (
                      <span className="material-symbols-outlined text-[12px] animate-spin text-indigo-400">sync</span>
                    ) : (
                      <span className="material-symbols-outlined text-[12px] text-indigo-500" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    )}
                    {state === 'syncing' ? 'Pulling data from Canvas LMS...' : (state === 'processing' ? 'Generating Report...' : 'TP-153 Ready · BIOL 302')}
                  </div>
                  {/* Visual processing indicator */}
                  <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden flex-shrink-0">
                    {state !== 'ready' && <div className="h-full bg-indigo-400 w-1/2 rounded-full animate-bounce-x"></div>}
                    {state === 'ready' && <div className="h-full bg-indigo-500 w-full rounded-full transition-all duration-300"></div>}
                  </div>
                </div>

                {/* CLO bars */}
                <div className="bg-white rounded-lg border border-indigo-100 p-2.5 shadow-sm">
                  <p className="text-[8px] font-bold text-indigo-600 uppercase tracking-wider mb-2">
                    CLO Mapping
                  </p>
                  <div className="space-y-1.5">
                    {[
                      {
                        label: "CLO 1 · Design",
                        pct: "82%",
                        textCls: "text-indigo-600",
                        bgCls: "bg-indigo-500",
                        w: "82%",
                        delay: "0ms"
                      },
                      {
                        label: "CLO 2 · Research",
                        pct: "75%",
                        textCls: "text-indigo-600",
                        bgCls: "bg-indigo-400",
                        w: "75%",
                        delay: "150ms"
                      },
                      {
                        label: "CLO 3 · Comm.",
                        pct: "91%",
                        textCls: "text-indigo-600",
                        bgCls: "bg-indigo-600",
                        w: "91%",
                        delay: "300ms"
                      },
                    ].map(({ label, pct, textCls, bgCls, w, delay }) => (
                      <div key={label}>
                        <div className="flex justify-between text-[8px] font-medium text-slate-700 mb-0.5">
                          <span>{label}</span>
                          <span className={`font-bold transition-opacity duration-500 ${state === 'syncing' ? 'opacity-0' : 'opacity-100'} ${textCls}`}>{pct}</span>
                        </div>
                        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${bgCls} transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
                            style={{ 
                              width: state === "syncing" ? "0%" : w,
                              transitionDelay: state === "syncing" ? "0ms" : delay
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart + Alert */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-white rounded-lg border border-indigo-100 p-2 shadow-sm">
                    <p className="text-[8px] font-bold text-slate-600 mb-1.5">Grades</p>
                    <div className="flex items-end gap-0.5 h-7">
                      {[
                        { h: "15%", bg: "bg-indigo-200" },
                        { h: "45%", bg: "bg-indigo-300" },
                        { h: "80%", bg: "bg-indigo-600" },
                        { h: "60%", bg: "bg-indigo-400" },
                        { h: "30%", bg: "bg-indigo-200" },
                      ].map((col, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t-[1px] ${col.bg} transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
                          style={{ 
                            height: state === "syncing" ? "0%" : col.h, 
                            transitionDelay: state === "syncing" ? "0ms" : `${200 + i * 100}ms` 
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between text-[6px] text-slate-400 font-bold mt-1 pt-0.5 border-t border-slate-100">
                      <span>F</span><span>C</span><span>B</span><span>A</span><span>A+</span>
                    </div>
                  </div>
                  
                  <div className={`bg-indigo-50 rounded-lg border border-indigo-100 p-2 shadow-sm flex flex-col justify-center transition-all duration-700 ease-out ${state === 'syncing' ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'} delay-[600ms]`}>
                    <span
                      className="material-symbols-outlined text-indigo-500 text-[12px] mb-0.5"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      lightbulb
                    </span>
                    <p className="text-[8px] font-bold text-indigo-700 mb-0.5">CLO 2 Insight</p>
                    <p className="text-[7.5px] leading-snug text-indigo-800">
                      Targeting research methodology closes gap.
                    </p>
                  </div>
                </div>

                {/* AI Improvement plan */}
                <div className={`bg-primary-gradient text-white rounded-lg p-2.5 shadow-sm shadow-indigo-200/50 transition-all duration-700 ${state === 'syncing' ? 'opacity-40 grayscale blur-sm scale-[0.98]' : 'opacity-100 grayscale-0 blur-0 scale-100'}`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`material-symbols-outlined text-indigo-200 text-[10px] ${state === 'processing' ? 'animate-pulse' : ''}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_awesome
                    </span>
                    <p className="text-[8px] font-bold uppercase tracking-wider text-indigo-100">
                      AI Plan
                    </p>
                  </div>
                  <div className="text-[8px] leading-tight text-indigo-50 min-h-[20px]">
                    {(state === "processing" || state === "ready") ? (
                      <Typewriter 
                        key={state} 
                        text="Add peer-review in Week 10 for research methodology. Align rubric with PLO-2 to fix the CLO 2 achievement gap." 
                        speed={15} 
                      />
                    ) : (
                      <div className="flex gap-1 pt-1 opacity-50">
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature badges */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["NCAAA Compliant", "LMS Auto-Sync", "Instant CLO Mapping", "AI Action Plans"].map(
                (l, i) => (
                  <span
                    key={l}
                    className={`px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[8.5px] font-bold whitespace-nowrap transition-all duration-500 ease-out ${state === 'syncing' ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
                    style={{ transitionDelay: state === 'syncing' ? '0ms' : `${800 + i * 100}ms` }}
                  >
                    {l}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    );
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
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 lg:py-32">
          <div className="text-center mb-10 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline mb-4">
              The Administrative Burden is Real
            </h2>
            <div className="w-16 h-1 bg-primary-gradient mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-outline-variant/30 transition-all hover:shadow-lg hover:border-indigo-100">
              <span className="material-symbols-outlined text-indigo-500 text-4xl mb-4">timer</span>
              <h3 className="font-headline font-bold text-lg sm:text-xl mb-3">20+ Hours Grading</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">
                Professors spend nearly half their working week grading assignments instead of
                engaging with students.
              </p>
            </div>
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-outline-variant/30 transition-all hover:shadow-lg hover:border-indigo-100">
              <span className="material-symbols-outlined text-indigo-500 text-4xl mb-4">
                description
              </span>
              <h3 className="font-headline font-bold text-lg sm:text-xl mb-3">Report Fatigue</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">
                Manually drafting TP-153 and TP-154 compliance reports takes days of tedious
                cross-referencing data.
              </p>
            </div>
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-outline-variant/30 transition-all hover:shadow-lg hover:border-indigo-100 sm:col-span-2 lg:col-span-1">
              <span className="material-symbols-outlined text-indigo-500 text-4xl mb-4">
                feedback
              </span>
              <h3 className="font-headline font-bold text-lg sm:text-xl mb-3">Delayed Feedback</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">
                The administrative backlog means students often wait weeks for meaningful guidance
                on their work.
              </p>
            </div>
          </div>
          <div className="mt-10 sm:mt-14 text-center">
            <a
              href="#waitlist"
              className="bg-primary-gradient text-white px-5 py-2 sm:px-8 sm:py-3 rounded-full font-bold text-xs sm:text-sm shadow-xl shadow-indigo-500/10 hover:opacity-90 transition-all inline-flex items-center gap-2"
            >
              Get Early Access{" "}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </section>

        {/* ── Features (Bento Grid) ── */}
        <section id="features" className="bg-surface py-14 sm:py-20 lg:py-32 relative">
          <div className="absolute inset-0 bg-indigo-50/30 -skew-y-2 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
            <div className="mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline mb-3 sm:mb-4">
                Powerful Features for Modern Faculty
              </h2>
              <p className="text-on-surface-variant text-base sm:text-lg">
                Intelligent automation that understands academic context.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
              <div className="sm:col-span-2 lg:col-span-8 bg-indigo-900 text-white p-7 sm:p-10 rounded-2xl flex flex-col justify-end relative overflow-hidden group min-h-[260px] sm:min-h-[300px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Collaboration"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKjOymSH2QeyEUyEWaGWyoiC1D6c6JRqeXnQCjyBvn0utgxch_bYkiiAmau0o42A3u0ES9VCU8cBtmtATu078Pna2SUiJj7Q-XIVy48_ynUjh-KUE1jN57LtlSOJADlGvM8iSR8Mbqi2Tt07BXbwBKYv4JOs5aodHyZ_l-KhYQZRKn3N_1UPpuMf6gCtEXPeYOGHMc0L0gxgwDbz3VAni4BZyvRLi55nXS4O5TG4hLttYCcvjE_XflBo5aS3uZtar00OCo3LfRu2Ai"
                />
                <div className="relative z-10">
                  <span
                    className="material-symbols-outlined text-3xl sm:text-4xl mb-3 sm:mb-4 text-indigo-400"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    draw
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-headline mb-3 sm:mb-4">
                    Automated Grading &amp; Feedback
                  </h3>
                  <p className="text-indigo-100/90 text-sm sm:text-base max-w-lg">
                    Advanced LLMs provide preliminary scoring and personalized feedback based on
                    your specific rubrics, ready for your final approval.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white border border-outline-variant/50 p-7 sm:p-10 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <span className="material-symbols-outlined text-indigo-600 text-4xl mb-4">
                    auto_stories
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-headline mb-3 sm:mb-4">
                    AI Lesson Plans
                  </h3>
                  <p className="text-on-surface-variant text-sm sm:text-base">
                    Generate complete syllabus-aligned weekly modules, including reading lists and
                    quiz questions, in seconds.
                  </p>
                </div>
                <div className="mt-6 sm:mt-8 bg-surface-container p-4 rounded-xl text-xs font-mono text-indigo-600 border border-indigo-100">
                  &gt; Generating module 4... <br />
                  &gt; Syllabus alignment: 98.4%
                </div>
              </div>

              <div className="lg:col-span-5 bg-tertiary-container text-white p-7 sm:p-10 rounded-2xl flex flex-col justify-between shadow-xl shadow-purple-500/10">
                <span className="material-symbols-outlined text-white text-4xl mb-4">
                  analytics
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-headline mb-3 sm:mb-4">
                    Auto NCAAA Reports
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base">
                    Instantly aggregate course performance data into compliant TP-153 and TP-154
                    formats with one click.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 bg-indigo-50 border border-indigo-100 p-7 sm:p-10 rounded-2xl relative overflow-hidden">
                <div className="max-w-md">
                  <span className="material-symbols-outlined text-4xl mb-4 text-indigo-600">
                    search_insights
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-headline mb-3 sm:mb-4 text-indigo-950">
                    Research Summarization
                  </h3>
                  <p className="text-indigo-900/70 text-sm sm:text-base">
                    Keep up with thousands of journals. Our AI digests new research in your field
                    and summarizes the findings into actionable teaching insights.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-16 text-center">
              <a
                href="#waitlist"
                className="bg-primary-gradient text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-xl shadow-indigo-500/10 hover:opacity-90 transition-all inline-flex items-center gap-2 min-h-[48px]"
              >
                Join the Future of Teaching{" "}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
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
          className="bg-indigo-50/30 py-10 sm:py-16 lg:py-20 border-y border-indigo-100/50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline mb-4">
                Experience the Velocity
              </h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-bold shadow-sm mb-4">
                <span className="material-symbols-outlined text-lg">upload_file</span>
                Upload course data → AI generates complete NCAAA report instantly
              </div>
              <p className="max-w-2xl mx-auto text-on-surface-variant text-sm sm:text-base">
                Stop wasting weeks on accreditation paperwork. Transform your raw LMS data into
                structured, compliant course reports in under a minute.
              </p>
            </div>

            <VelocityComparison />
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
