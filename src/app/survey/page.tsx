"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// --- Types ---
type Section = 1 | 2 | 3 | 4 | 5;

// --- Components ---

const QuestionWrapper = ({
  title,
  subtitle,
  children,
  required = false,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  required?: boolean;
}) => (
  <div className="space-y-4 animate-slide-up-fade">
    <div className="space-y-1">
      <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
        {title}
        {required && <span className="text-error text-sm">*</span>}
      </h3>
      {subtitle && <p className="text-on-surface-variant text-sm leading-relaxed">{subtitle}</p>}
    </div>
    <div className="bg-white/40 backdrop-blur-sm border border-outline-variant/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      {children}
    </div>
  </div>
);

const RadioGroup = ({
  options,
  name,
  value,
  onChange,
}: {
  options: string[];
  name: string;
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="grid grid-cols-1 gap-2">
    {options.map((opt) => (
      <label
        key={opt}
        className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
          value === opt
            ? "border-indigo-600 bg-indigo-50/50"
            : "border-outline-variant/50 hover:border-indigo-200 hover:bg-slate-50/50"
        }`}
      >
        <input
          type="radio"
          name={name}
          checked={value === opt}
          onChange={() => onChange(opt)}
          className="hidden"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            value === opt ? "border-indigo-600" : "border-outline-variant"
          }`}
        >
          {value === opt && (
            <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-score-pop" />
          )}
        </div>
        <span
          className={`text-sm font-medium ${value === opt ? "text-indigo-900" : "text-on-surface-variant"}`}
        >
          {opt}
        </span>
      </label>
    ))}
  </div>
);

const CheckboxGroup = ({
  options,
  values,
  onChange,
}: {
  options: string[];
  values: string[];
  onChange: (vals: string[]) => void;
}) => (
  <div className="grid grid-cols-1 gap-2">
    {options.map((opt) => {
      const isChecked = values.includes(opt);
      return (
        <label
          key={opt}
          className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
            isChecked
              ? "border-indigo-600 bg-indigo-50/50"
              : "border-outline-variant/50 hover:border-indigo-200 hover:bg-slate-50/50"
          }`}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              if (isChecked) {
                onChange(values.filter((v) => v !== opt));
              } else {
                onChange([...values, opt]);
              }
            }}
            className="hidden"
          />
          <div
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
              isChecked ? "border-indigo-600 bg-indigo-600" : "border-outline-variant"
            }`}
          >
            {isChecked && (
              <span className="material-symbols-outlined text-white text-[16px] font-bold">
                check
              </span>
            )}
          </div>
          <span
            className={`text-sm font-medium ${isChecked ? "text-indigo-900" : "text-on-surface-variant"}`}
          >
            {opt}
          </span>
        </label>
      );
    })}
  </div>
);

const ScaleSelect = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
}) => (
  <div className="space-y-3 pb-4 last:pb-0 border-b last:border-0 border-outline-variant/20">
    <div className="text-sm font-bold text-on-surface">{label}</div>
    <div className="flex justify-between items-center gap-2 max-w-sm">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          onClick={() => onChange(num)}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center font-bold transition-all ${
            value === num
              ? "border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110"
              : "border-outline-variant text-on-surface-variant hover:border-indigo-300"
          }`}
        >
          {num}
        </button>
      ))}
    </div>
    <div className="flex justify-between max-w-sm px-1">
      <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-tighter">
        Not comfortable
      </span>
      <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-tighter">
        Very comfortable
      </span>
    </div>
  </div>
);

const LikertGrid = ({
  tasks,
  options,
  values,
  onChange,
}: {
  tasks: string[];
  options: string[];
  values: Record<string, string>;
  onChange: (task: string, val: string) => void;
}) => (
  <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
    <table className="w-full min-w-[500px]">
      <thead>
        <tr>
          <th className="text-left py-4 text-[11px] font-bold text-indigo-900/40 uppercase tracking-widest bg-slate-50/50 px-4 rounded-l-xl">
            Task
          </th>
          {options.map((opt) => (
            <th
              key={opt}
              className="text-center py-4 text-[11px] font-bold text-indigo-900/40 uppercase tracking-widest bg-slate-50/50 px-2 last:rounded-r-xl"
            >
              {opt}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr
            key={task}
            className="border-b border-outline-variant/20 last:border-0 hover:bg-slate-50/30 transition-colors"
          >
            <td className="py-4 px-4 text-sm font-bold text-on-surface">{task}</td>
            {options.map((opt) => (
              <td key={opt} className="py-4 text-center">
                <button
                  onClick={() => onChange(task, opt)}
                  className={`w-6 h-6 rounded-full border-2 mx-auto flex items-center justify-center transition-all ${
                    values[task] === opt
                      ? "border-indigo-600 bg-indigo-600 shadow-md shadow-indigo-100"
                      : "border-outline-variant hover:border-indigo-300"
                  }`}
                >
                  {values[task] === opt && <div className="w-2 h-2 bg-white rounded-full" />}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Main Page Component ---

export default function SurveyPage() {
  const [step, setStep] = useState<Section>(1);
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    email: "",
    institution: "",

    // Section 1
    isTeaching: "",
    subject: "",
    subjectOther: "",
    coursesPerSemester: "",
    classSize: "",
    experience: "",

    // Section 2
    workloadHours: {
      "Teaching preparation (lesson plans, slides, activities)": "",
      "Creating assessments (quizzes, exams, assignments)": "",
      "Grading and providing feedback to students": "",
      "Responding to student queries (email, office hours)": "",
      "Course documentation and institutional reporting": "",
    },
    burdensomeActivities: [] as string[],
    heaviestWorkload: "",

    // Section 3
    currentTools: [] as string[],
    toolsOther: "",
    aiTools: [] as string[],
    aiToolsOther: "",
    aiFrequency: "",
    aiUseCases: [] as string[],
    aiUseCasesOther: "",

    // Section 4
    comfortLevels: {
      "Creating assessments (quizzes, exams, assignments)": 0,
      "Teaching preparation (lesson plans, slides, activities)": 0,
      "Grading and providing feedback to students": 0,
      "Responding to student queries (email, office hours)": 0,
      "Converting notes into study materials": 0,
      "Course documentation and institutional reporting": 0,
    } as Record<string, number>,
    aiRolePreference: {
      "Creating assessments (quizzes, exams, assignments)": "",
      "Teaching preparation (lesson plans, slides, activities)": "",
      "Grading and providing feedback to students": "",
      "Responding to student queries (email, office hours)": "",
      "Converting notes into study materials": "",
      "Course documentation and institutional reporting": "",
    } as Record<string, string>,
    aiConcerns: [] as string[],
    aiConcernsOther: "",
    aiRequirements: [] as string[],
    aiRequirementsOther: "",

    // Section 5
    followUp: "",
    followUpContact: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (currentData = formData) => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(result.message || "We encountered an issue saving your response. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError("Something went wrong on our end. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateWorkloadHours = (activity: string, hours: string) => {
    setFormData((prev) => ({
      ...prev,
      workloadHours: { ...prev.workloadHours, [activity]: hours },
    }));
  };

  const updateComfort = (task: string, val: number) => {
    setFormData((prev) => ({
      ...prev,
      comfortLevels: { ...prev.comfortLevels, [task]: val },
    }));
  };

  const updateAiRole = (task: string, val: string) => {
    setFormData((prev) => ({
      ...prev,
      aiRolePreference: { ...prev.aiRolePreference, [task]: val },
    }));
  };

  const progress = (step / 5) * 100;

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6 hero-glow font-body">
        <div className="max-w-md w-full bg-white/70 backdrop-blur-xl border border-white p-12 rounded-[2.5rem] shadow-2xl text-center space-y-8 animate-score-pop">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
            <span
              className="material-symbols-outlined text-5xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold font-headline text-on-surface tracking-tight">
              Thank You!
            </h1>
            <p className="text-on-surface-variant leading-relaxed">
              {formData.isTeaching === "No"
                ? "Thank you for letting us know! Currently, this research is tailored specifically for active university faculty members. We appreciate your interest in Tadris AI."
                : "Your feedback is very helpful to us. We appreciate you taking the time to share your academic experience."}
            </p>
          </div>
          <Link
            href="/"
            className="inline-block bg-primary-gradient text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body hero-glow pb-20">
      {/* --- Sticky Navbar --- */}
      <nav className="fixed top-0 w-full z-50 bg-glass border-b border-outline-variant/30 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-headline tracking-tight"
          >
            Tadris AI
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-[10px] font-bold text-indigo-900/40 uppercase tracking-widest">
              Section {step} of 5
            </div>
            <div className="w-32 h-2 bg-indigo-50 rounded-full overflow-hidden border border-indigo-100/50">
              <div
                className="h-full bg-primary-gradient transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="max-w-3xl mx-auto px-6 pt-32 space-y-12">
        {/* --- Hero Intro --- */}
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold tracking-widest uppercase border border-indigo-100">
            Faculty Experience Survey
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold font-headline leading-tight tracking-tight text-on-surface">
            AI Teacher Companion <br />
            <span className="text-transparent bg-clip-text bg-primary-gradient">
              Shape the Future.
            </span>
          </h1>
          <div className="bg-white/60 p-6 rounded-3xl border border-white shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <span className="material-symbols-outlined text-[20px]">timer</span>
              Estimated duration: 5–7 minutes
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              This survey is part of research to understand how university faculty spend their time
              and where AI tools could meaningfully reduce their workload. Your responses will
              directly shape which features we prioritize building first.
            </p>
            <div className="pt-2 border-t border-indigo-100/50 flex items-center gap-2 text-xs text-on-surface-variant font-medium">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              Anonymous submission supported.
            </div>
          </div>
        </header>

        <section className="animate-slide-up-fade">
          <div className="bg-white/40 backdrop-blur-md border border-outline-variant/30 rounded-[2rem] p-8 space-y-6">
            <p className="text-on-surface-variant text-[13px] leading-relaxed italic bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100/50">
              <span className="font-bold text-indigo-600 not-italic">Anonymity:</span> Your responses
              can be submitted anonymously. If you are willing to be contacted for a follow-up
              interview, you may provide your details below — otherwise leave blank and proceed.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-white/80 border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-all placeholder:text-on-surface-variant/30"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@institution.edu"
                  className="w-full bg-white/80 border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-all placeholder:text-on-surface-variant/30"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">
                Institution
              </label>
              <input
                type="text"
                placeholder="University name"
                className="w-full bg-white/80 border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-all placeholder:text-on-surface-variant/30"
                value={formData.institution}
                onChange={(e) => updateField("institution", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* --- Section Divider --- */}
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-100 to-transparent" />

        {/* --- Section 1: About You --- */}
        <section className={`space-y-8 ${step !== 1 ? "hidden" : ""}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
            <h2 className="text-2xl font-bold font-headline text-on-surface">About You</h2>
          </div>

          <QuestionWrapper
            title="Q1. Are you currently teaching or lecturing students at a university?"
            required
          >
            <RadioGroup
              name="isTeaching"
              options={["Yes", "No"]}
              value={formData.isTeaching}
              onChange={(v) => {
                updateField("isTeaching", v);
                if (v === "No") {
                  // For "No", show successful submission screen immediately (optimistic)
                  // while recording the data in the background
                  setSubmitted(true);
                  handleSubmit({ ...formData, isTeaching: v });
                }
              }}
            />
          </QuestionWrapper>

          <QuestionWrapper title="Q2. What is your primary teaching subject?">
            <RadioGroup
              name="subject"
              options={[
                "Arabic Language & Literature",
                "Computer Science / IT",
                "Engineering",
                "English Language",
                "Natural Sciences (Biology, Chemistry, Physics)",
                "Business / Management",
                "Other",
              ]}
              value={formData.subject}
              onChange={(v) => updateField("subject", v)}
            />
            {formData.subject === "Other" && (
              <div className="mt-4 animate-slide-up-fade">
                <input
                  type="text"
                  placeholder="Please specify your subject"
                  className="w-full bg-white/80 border border-indigo-200 rounded-xl px-4 py-3 text-sm outline-none shadow-inner"
                  value={formData.subjectOther}
                  onChange={(e) => updateField("subjectOther", e.target.value)}
                />
              </div>
            )}
          </QuestionWrapper>

          <QuestionWrapper title="Q3. How many courses do you typically teach per semester?">
            <RadioGroup
              name="coursesPerSemester"
              options={["1", "2", "3", "4", "5 or more"]}
              value={formData.coursesPerSemester}
              onChange={(v) => updateField("coursesPerSemester", v)}
            />
          </QuestionWrapper>

          <QuestionWrapper title="Q4. What is your average class size?">
            <RadioGroup
              name="classSize"
              options={[
                "Fewer than 20 students",
                "20–40 students",
                "41–80 students",
                "More than 80 students",
              ]}
              value={formData.classSize}
              onChange={(v) => updateField("classSize", v)}
            />
          </QuestionWrapper>

          <QuestionWrapper title="Q5. How many years of experience do you have lecturing at university level?">
            <RadioGroup
              name="experience"
              options={["Less than 2 years", "2–5 years", "6–10 years", "More than 10 years"]}
              value={formData.experience}
              onChange={(v) => updateField("experience", v)}
            />
          </QuestionWrapper>

          <button
            onClick={() => setStep(2)}
            disabled={!formData.isTeaching}
            className="w-full bg-primary-gradient text-white py-4 rounded-full font-bold text-lg shadow-xl shadow-indigo-600/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
          >
            Continue to Section 2<span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </section>

        {/* --- Section 2: Your Workload --- */}
        <section className={`space-y-8 ${step !== 2 ? "hidden" : ""}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              2
            </div>
            <h2 className="text-2xl font-bold font-headline text-on-surface">Your Workload</h2>
          </div>

          <QuestionWrapper
            title="Q6. Approximately how many hours per week do you spend on each of the following activities?"
            subtitle="Rough estimates are fine."
          >
            <div className="space-y-4">
              {Object.keys(formData.workloadHours).map((activity) => (
                <div
                  key={activity}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-outline-variant/30 bg-slate-50/50"
                >
                  <span className="text-sm font-bold text-on-surface">{activity}</span>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-24 bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm text-right pr-14 focus:border-indigo-500 outline-none transition-all"
                      value={
                        formData.workloadHours[activity as keyof typeof formData.workloadHours]
                      }
                      onChange={(e) => updateWorkloadHours(activity, e.target.value)}
                    />
                    <span className="absolute right-3 text-[10px] font-bold text-on-surface-variant/40 uppercase">
                      Hrs/Wk
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </QuestionWrapper>

          <QuestionWrapper
            title="Q7. Which of the above activities do you find MOST time-consuming or burdensome?"
            subtitle="Select up to 3."
          >
            <CheckboxGroup
              options={[
                "Teaching preparation (lesson plans, slides, activities)",
                "Creating assessments (quizzes, exams, assignments)",
                "Grading and providing feedback to students",
                "Responding to student queries (email, office hours)",
                "Course documentation and institutional reporting",
              ]}
              values={formData.burdensomeActivities}
              onChange={(v) => {
                if (v.length <= 3) updateField("burdensomeActivities", v);
              }}
            />
          </QuestionWrapper>

          <QuestionWrapper title="Q8. When during the semester does your workload feel heaviest?">
            <RadioGroup
              name="heaviestWorkload"
              options={[
                "Start of semester (setup, planning, registration)",
                "Mid-semester (exams, assignments)",
                "End of semester (final exams, reports, grade submission)",
                "Consistently throughout the semester",
              ]}
              value={formData.heaviestWorkload}
              onChange={(v) => updateField("heaviestWorkload", v)}
            />
          </QuestionWrapper>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 bg-white border border-indigo-100 text-indigo-600 py-4 rounded-full font-bold transition-all hover:bg-slate-50 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-[2] bg-primary-gradient text-white py-4 rounded-full font-bold shadow-xl shadow-indigo-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              Continue to Section 3<span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* --- Section 3: Tools --- */}
        <section className={`space-y-8 ${step !== 3 ? "hidden" : ""}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              3
            </div>
            <h2 className="text-2xl font-bold font-headline text-on-surface">Tools & AI Usage</h2>
          </div>

          <QuestionWrapper
            title="Q9. Which general tools do you currently use for teaching and course management?"
            subtitle="Select all that apply."
          >
            <CheckboxGroup
              options={[
                "LMS (Blackboard, Moodle, Canvas, etc.)",
                "Microsoft Word / Google Docs",
                "Microsoft PowerPoint / Google Slides",
                "Microsoft Excel / Google Sheets",
                "Email only",
                "Other",
              ]}
              values={formData.currentTools}
              onChange={(v) => updateField("currentTools", v)}
            />
            {formData.currentTools.includes("Other") && (
              <div className="mt-4 animate-slide-up-fade">
                <input
                  type="text"
                  placeholder="Specify other tools"
                  className="w-full bg-white/80 border border-indigo-200 rounded-xl px-4 py-3 text-sm outline-none"
                  value={formData.toolsOther}
                  onChange={(e) => updateField("toolsOther", e.target.value)}
                />
              </div>
            )}
          </QuestionWrapper>

          <QuestionWrapper
            title="Q10. Which AI tools have you tried or currently use for teaching purposes?"
            subtitle="Select all that apply."
          >
            <CheckboxGroup
              options={[
                "ChatGPT",
                "Google Gemini",
                "Microsoft Copilot",
                "Grammarly or similar AI writing tools",
                "Other AI tool",
                "I do not use any AI tools",
              ]}
              values={formData.aiTools}
              onChange={(v) => {
                if (v.includes("I do not use any AI tools")) {
                  updateField("aiTools", ["I do not use any AI tools"]);
                } else {
                  updateField("aiTools", v);
                }
              }}
            />
            {formData.aiTools.includes("Other AI tool") && (
              <div className="mt-4 animate-slide-up-fade">
                <input
                  type="text"
                  placeholder="Specify other AI tools"
                  className="w-full bg-white/80 border border-indigo-200 rounded-xl px-4 py-3 text-sm outline-none"
                  value={formData.aiToolsOther}
                  onChange={(e) => updateField("aiToolsOther", e.target.value)}
                />
              </div>
            )}
          </QuestionWrapper>

          <QuestionWrapper title="Q11. How often do you use AI tools for teaching-related work?">
            <RadioGroup
              name="aiFrequency"
              options={[
                "I have never tried AI tools",
                "I tried once or twice but stopped",
                "Occasionally (a few times a month)",
                "Regularly (weekly)",
                "Daily",
              ]}
              value={formData.aiFrequency}
              onChange={(v) => updateField("aiFrequency", v)}
            />
          </QuestionWrapper>

          {!formData.aiTools.includes("I do not use any AI tools") &&
            formData.aiFrequency !== "I have never tried AI tools" && (
              <QuestionWrapper
                title="Q12. What do you mainly use AI tools for?"
                subtitle="Select all that apply."
              >
                <CheckboxGroup
                  options={[
                    "Teaching preparation (lesson plans, slides, activities)",
                    "Creating assessments (quizzes, exams, assignments)",
                    "Summarizing or simplifying material",
                    "Writing or editing documents",
                    "Grading and providing feedback to students",
                    "Responding to student queries (email, office hours)",
                    "Other",
                  ]}
                  values={formData.aiUseCases}
                  onChange={(v) => updateField("aiUseCases", v)}
                />
                {formData.aiUseCases.includes("Other") && (
                  <div className="mt-4 animate-slide-up-fade">
                    <input
                      type="text"
                      placeholder="Specify other use cases"
                      className="w-full bg-white/80 border border-indigo-200 rounded-xl px-4 py-3 text-sm outline-none"
                      value={formData.aiUseCasesOther}
                      onChange={(e) => updateField("aiUseCasesOther", e.target.value)}
                    />
                  </div>
                )}
              </QuestionWrapper>
            )}

          <div className="flex gap-4">
            <button
              onClick={() => setStep(2)}
              className="flex-1 bg-white border border-indigo-100 text-indigo-600 py-4 rounded-full font-bold transition-all hover:bg-slate-50 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-[2] bg-primary-gradient text-white py-4 rounded-full font-bold shadow-xl shadow-indigo-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              Continue to Section 4<span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* --- Section 4: Attitude --- */}
        <section className={`space-y-8 ${step !== 4 ? "hidden" : ""}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              4
            </div>
            <h2 className="text-2xl font-bold font-headline text-on-surface">
              Your Attitude Towards AI
            </h2>
          </div>

          <QuestionWrapper
            title="Q13. How comfortable would you be using AI for each of the following tasks?"
            subtitle="1 = Not comfortable at all · 5 = Very comfortable"
          >
            <div className="space-y-6">
              {Object.keys(formData.comfortLevels).map((task) => (
                <ScaleSelect
                  key={task}
                  label={task}
                  value={formData.comfortLevels[task]}
                  onChange={(val) => updateComfort(task, val)}
                />
              ))}
            </div>
          </QuestionWrapper>

          <QuestionWrapper title="Q14. For each task, do you think AI should play a role in it?">
            <LikertGrid
              tasks={[
                "Creating assessments (quizzes, exams, assignments)",
                "Teaching preparation (lesson plans, slides, activities)",
                "Grading and providing feedback to students",
                "Responding to student queries (email, office hours)",
                "Converting lecture notes or recordings into study materials",
                "Course documentation and institutional reporting",
              ]}
              options={["Yes", "No", "Not sure"]}
              values={formData.aiRolePreference}
              onChange={(task, val) => updateAiRole(task, val)}
            />
          </QuestionWrapper>

          <QuestionWrapper title="Q15. What are your biggest concerns about using AI tools for teaching?">
            <CheckboxGroup
              options={[
                "Output quality may not be accurate enough",
                "Poor support for non-english language",
                "Privacy and data security concerns",
                "I don't trust AI-generated output for official use",
                "Reviewing and correcting AI output takes too much time",
                "Outputs may not align with academic standards",
                "I have no specific concerns",
                "Other",
              ]}
              values={formData.aiConcerns}
              onChange={(v) => updateField("aiConcerns", v)}
            />
            {formData.aiConcerns.includes("Other") && (
              <div className="mt-4 animate-slide-up-fade">
                <input
                  type="text"
                  placeholder="Specify other concerns"
                  className="w-full bg-white/80 border border-indigo-200 rounded-xl px-4 py-3 text-sm outline-none"
                  value={formData.aiConcernsOther}
                  onChange={(e) => updateField("aiConcernsOther", e.target.value)}
                />
              </div>
            )}
          </QuestionWrapper>

          <QuestionWrapper title="Q16. For you to confidently use an AI teaching tool, which would need to be true?">
            <CheckboxGroup
              options={[
                "I must be able to review and edit all outputs",
                "The final academic decision must always remain with me",
                "My data must be kept private",
                "I need to understand how the AI reached its output",
                "Outputs must follow official academic standards",
                "The tool must support more languages other than English",
                "Other",
              ]}
              values={formData.aiRequirements}
              onChange={(v) => updateField("aiRequirements", v)}
            />
            {formData.aiRequirements.includes("Other") && (
              <div className="mt-4 animate-slide-up-fade">
                <input
                  type="text"
                  placeholder="Specify other requirements"
                  className="w-full bg-white/80 border border-indigo-200 rounded-xl px-4 py-3 text-sm outline-none"
                  value={formData.aiRequirementsOther}
                  onChange={(e) => updateField("aiRequirementsOther", e.target.value)}
                />
              </div>
            )}
          </QuestionWrapper>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(3)}
              className="flex-1 bg-white border border-indigo-100 text-indigo-600 py-4 rounded-full font-bold transition-all hover:bg-slate-50 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back
            </button>
            <button
              onClick={() => setStep(5)}
              className="flex-[2] bg-primary-gradient text-white py-4 rounded-full font-bold shadow-xl shadow-indigo-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              Final Section
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* --- Section 5: Follow-up --- */}
        <section className={`space-y-8 ${step !== 5 ? "hidden" : ""}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              5
            </div>
            <h2 className="text-2xl font-bold font-headline text-on-surface">Follow-Up</h2>
          </div>

          <QuestionWrapper title="Q17. Would you be willing to join a 30-minute follow-up interview to share more about your teaching experience?">
            <RadioGroup
              name="followUp"
              options={["Yes", "No"]}
              value={formData.followUp}
              onChange={(v) => updateField("followUp", v)}
            />
            {formData.followUp === "Yes" && (
              <div className="mt-6 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-4 animate-slide-up-fade">
                <p className="text-xs font-bold text-indigo-900/60 uppercase tracking-widest">
                  Please provide contact details if not added above:
                </p>
                <input
                  type="text"
                  placeholder="Email or Phone number"
                  className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-3 text-sm outline-none shadow-sm focus:border-indigo-500"
                  value={formData.followUpContact}
                  onChange={(e) => updateField("followUpContact", e.target.value)}
                />
              </div>
            )}
            {formData.followUp === "No" && (
              <div className="mt-4 p-4 bg-slate-50/50 rounded-xl border border-slate-100 animate-slide-up-fade">
                <p className="text-sm text-on-surface-variant italic">
                  That&apos;s perfectly fine! We appreciate you sharing your thoughts with us today.
                </p>
              </div>
            )}
          </QuestionWrapper>

          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-4 shadow-2xl shadow-indigo-200 overflow-hidden relative">
            <h3 className="text-xl font-bold font-headline">Ready to submit?</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              By clicking submit, your responses will be used to help us build tools that truly
              support educators. Thank you for your contribution to the future of teaching.
            </p>

            {submitError && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-start gap-3 animate-slide-up-fade">
                <span className="material-symbols-outlined text-red-400 text-[20px]">
                  error
                </span>
                <p className="text-red-200 text-xs font-medium leading-relaxed">
                  {submitError}
                </p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Review
              </button>
              <button
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
                className="flex-[2] bg-primary-gradient text-white py-4 rounded-full font-bold shadow-xl shadow-indigo-600/40 hover:scale-[1.05] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Submitting...</span>
                ) : (
                  <>
                    Submit Survey
                    <span className="material-symbols-outlined">send</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="max-w-4xl mx-auto px-6 py-12 text-center border-t border-outline-variant/30">
        <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Tadris AI &middot; Empowering Educators
        </p>
      </footer>
    </div>
  );
}
