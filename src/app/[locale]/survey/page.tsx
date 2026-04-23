"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDictionary } from "../DictionaryProvider";
import { useFormatNumber } from "../formatters";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { Locale } from "@/i18n";

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
  options: { label: string; value: string }[];
  name: string;
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="grid grid-cols-1 gap-2">
    {options.map((opt) => (
      <label
        key={opt.value}
        className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
          value === opt.value
            ? "border-indigo-600 bg-indigo-50/50"
            : "border-outline-variant/50 hover:border-indigo-200 hover:bg-slate-50/50"
        }`}
      >
        <input
          type="radio"
          name={name}
          checked={value === opt.value}
          onChange={() => onChange(opt.value)}
          className="hidden"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            value === opt.value ? "border-indigo-600" : "border-outline-variant"
          }`}
        >
          {value === opt.value && (
            <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-score-pop" />
          )}
        </div>
        <span
          className={`text-sm font-medium ${value === opt.value ? "text-indigo-900" : "text-on-surface-variant"}`}
        >
          {opt.label}
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
  options: { label: string; value: string }[];
  values: string[];
  onChange: (vals: string[]) => void;
}) => (
  <div className="grid grid-cols-1 gap-2">
    {options.map((opt) => {
      const isChecked = values.includes(opt.value);
      return (
        <label
          key={opt.value}
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
                onChange(values.filter((v) => v !== opt.value));
              } else {
                onChange([...values, opt.value]);
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
            {opt.label}
          </span>
        </label>
      );
    })}
  </div>
);

const ScaleSelect = ({
  label,
  value,
  leftLabel,
  rightLabel,
  formatNumber,
  onChange,
}: {
  label: string;
  value: number;
  leftLabel: string;
  rightLabel: string;
  formatNumber: (n: number | string) => string;
  onChange: (val: number) => void;
}) => (
  <div className="space-y-3 pb-4 last:pb-0 border-b last:border-0 border-outline-variant/20">
    <div className="text-sm font-medium text-on-surface-variant">{label}</div>
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
          {formatNumber(num)}
        </button>
      ))}
    </div>
    <div className="flex justify-between max-w-sm px-1">
      <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-tighter">
        {leftLabel}
      </span>
      <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-tighter">
        {rightLabel}
      </span>
    </div>
  </div>
);

const LikertGrid = ({
  taskHeader,
  tasks,
  options,
  values,
  onChange,
}: {
  taskHeader: string;
  tasks: { label: string; value: string }[];
  options: { label: string; value: string }[];
  values: Record<string, string>;
  onChange: (task: string, val: string) => void;
}) => (
  <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
    <table className="w-full min-w-[500px]">
      <thead>
        <tr>
          <th className="text-start py-4 text-[11px] font-semibold text-indigo-900/60 uppercase tracking-widest bg-slate-50/50 px-4 rounded-s-xl">
            {taskHeader}
          </th>
          {options.map((opt) => (
            <th
              key={opt.value}
              className="text-center py-4 text-[11px] font-semibold text-indigo-900/60 uppercase tracking-widest bg-slate-50/50 px-2 last:rounded-e-xl"
            >
              {opt.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr
            key={task.value}
            className="border-b border-outline-variant/20 last:border-0 hover:bg-slate-50/30 transition-colors"
          >
            <td className="py-4 px-4 text-sm font-medium text-on-surface-variant">{task.label}</td>
            {options.map((opt) => (
              <td key={opt.value} className="py-4 text-center">
                <button
                  onClick={() => onChange(task.value, opt.value)}
                  className={`w-6 h-6 rounded-full border-2 mx-auto flex items-center justify-center transition-all ${
                    values[task.value] === opt.value
                      ? "border-indigo-600 bg-indigo-600 shadow-md shadow-indigo-100"
                      : "border-outline-variant hover:border-indigo-300"
                  }`}
                >
                  {values[task.value] === opt.value && <div className="w-2 h-2 bg-white rounded-full" />}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const WorkloadRangeSelector = ({
  ranges,
  value,
  onChange,
}: {
  ranges: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
}) => {


  return (
    <div className="flex flex-wrap gap-2">
      {ranges.map((range) => {
        const isActive = value === range.value;
        return (
          <button
            key={range.value}
            onClick={() => onChange(range.value)}
            className={`
              flex-1 min-w-[50px] px-3 py-2 rounded-xl text-xs font-bold transition-all border
              ${
                isActive
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 scale-[1.05]"
                  : "bg-white text-on-surface-variant border-outline-variant/30 hover:border-indigo-200 hover:bg-slate-50"
              }
            `}
          >
            {range.label}
          </button>
        );
      })}
    </div>
  );
};

// --- Main Page Component ---

export default function SurveyPage() {
  const params = useParams();
  const t = useDictionary();
  const formatNumber = useFormatNumber();
  
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
      "Converting lecture notes or recordings into study materials": 0,
      "Course documentation and institutional reporting": 0,
    } as Record<string, number>,
    aiRolePreference: {
      "Creating assessments (quizzes, exams, assignments)": "",
      "Teaching preparation (lesson plans, slides, activities)": "",
      "Grading and providing feedback to students": "",
      "Responding to student queries (email, office hours)": "",
      "Converting lecture notes or recordings into study materials": "",
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
        setSubmitError(
          result.message || "We encountered an issue saving your response. Please try again.",
        );
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
              {t.survey.completion.title}
            </h1>
            <p className="text-on-surface-variant leading-relaxed">
              {formData.isTeaching === "No"
                ? t.survey.completion.msgNotTeaching
                : formData.followUp === "Yes"
                  ? t.survey.completion.msgFollowUp
                  : t.survey.completion.msgStandard}
            </p>
          </div>
          <Link
            href={`/${params.locale}`}
            className="inline-block bg-primary-gradient text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all"
          >
            {t.survey.completion.returnHome}
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
            href={`/${params.locale}`}
            className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-headline tracking-tight"
          >
            Tadris AI
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-[10px] font-bold text-indigo-900/40 uppercase tracking-widest">
              {t.survey.sectionOf.replace("{step}", step.toString())}
            </div>
            <div className="w-32 h-2 bg-indigo-50 rounded-full overflow-hidden border border-indigo-100/50">
              <div
                className="h-full bg-primary-gradient transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="ms-3 sm:ms-4">
              <LanguageSwitcher currentLocale={params.locale as Locale} />
            </div>
          </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="max-w-3xl mx-auto px-6 pt-32 space-y-12">
        {/* --- Hero Intro --- */}
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold tracking-widest uppercase border border-indigo-100">
            {t.survey.headerBadge}
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold font-headline leading-tight tracking-tight text-on-surface">
            {t.survey.title1} <br />
            <span className="text-transparent bg-clip-text bg-primary-gradient">
              {t.survey.title2}
            </span>
          </h1>
          <div className="bg-white/60 p-6 rounded-3xl border border-white shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <span className="material-symbols-outlined text-[20px]">timer</span>
              {t.survey.duration}
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t.survey.description}
            </p>
            <div className="pt-2 border-t border-indigo-100/50 flex items-center gap-2 text-xs text-on-surface-variant font-medium">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              {t.survey.anonymityBadge}
            </div>
          </div>
        </header>

        <section className="animate-slide-up-fade">
          <div className="bg-white/40 backdrop-blur-md border border-outline-variant/30 rounded-[2rem] p-8 space-y-6">
            <p className="text-on-surface-variant text-[13px] leading-relaxed italic bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100/50">
              <span className="font-bold text-indigo-600 not-italic">{t.survey.anonymityPrefix}</span>{" "}
              {t.survey.anonymityNote}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">
                  {t.survey.basicInfo.nameLabel}
                </label>
                <input
                  type="text"
                  placeholder={t.survey.basicInfo.namePlaceholder}
                  className="w-full bg-white/80 border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-all placeholder:text-on-surface-variant/30"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">
                  {t.survey.basicInfo.emailLabel}
                </label>
                <input
                  type="email"
                  placeholder={t.survey.basicInfo.emailPlaceholder}
                  className="w-full bg-white/80 border border-outline-variant/50 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-all placeholder:text-on-surface-variant/30"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">
                {t.survey.basicInfo.institutionLabel}
              </label>
              <input
                type="text"
                placeholder={t.survey.basicInfo.institutionPlaceholder}
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
              {formatNumber(1)}
            </div>
            <h2 className="text-2xl font-bold font-headline text-on-surface">{t.survey.sections.s1}</h2>
          </div>

          <QuestionWrapper
            title={t.survey.questions.q1}
            required
          >
            <RadioGroup
              name="isTeaching"
              options={[
                { label: t.survey.yes, value: "Yes" },
                { label: t.survey.no, value: "No" },
              ]}
              value={formData.isTeaching}
              onChange={(v) => {
                updateField("isTeaching", v);
                if (v === "No") {
                  setSubmitted(true);
                  handleSubmit({ ...formData, isTeaching: v });
                }
              }}
            />
          </QuestionWrapper>

          <QuestionWrapper title={t.survey.questions.q2}>
            <RadioGroup
              name="subject"
              options={[
                { label: t.survey.options.subj1, value: "Arabic Language & Literature" },
                { label: t.survey.options.subj2, value: "Computer Science / IT" },
                { label: t.survey.options.subj3, value: "Engineering" },
                { label: t.survey.options.subj4, value: "English Language" },
                { label: t.survey.options.subj5, value: "Natural Sciences (Biology, Chemistry, Physics)" },
                { label: t.survey.options.subj6, value: "Business / Management" },
                { label: t.survey.other, value: "Other" },
              ]}
              value={formData.subject}
              onChange={(v) => updateField("subject", v)}
            />
            {formData.subject === "Other" && (
              <div className="mt-4 animate-slide-up-fade">
                <input
                  type="text"
                  placeholder={t.survey.questions.q2Placeholder}
                  className="w-full bg-white/80 border border-indigo-200 rounded-xl px-4 py-3 text-sm outline-none shadow-inner"
                  value={formData.subjectOther}
                  onChange={(e) => updateField("subjectOther", e.target.value)}
                />
              </div>
            )}
          </QuestionWrapper>

          <QuestionWrapper title={t.survey.questions.q3}>
            <RadioGroup
              name="coursesPerSemester"
              options={[
                { label: t.survey.options.courses1, value: "1" },
                { label: t.survey.options.courses2, value: "2" },
                { label: t.survey.options.courses3, value: "3" },
                { label: t.survey.options.courses4, value: "4" },
                { label: t.survey.options.courses5, value: "5 or more" },
              ]}
              value={formData.coursesPerSemester}
              onChange={(v) => updateField("coursesPerSemester", v)}
            />
          </QuestionWrapper>

          <QuestionWrapper title={t.survey.questions.q4}>
            <RadioGroup
              name="classSize"
              options={[
                { label: t.survey.options.size1, value: "Fewer than 20 students" },
                { label: t.survey.options.size2, value: "20–40 students" },
                { label: t.survey.options.size3, value: "41–80 students" },
                { label: t.survey.options.size4, value: "More than 80 students" },
              ]}
              value={formData.classSize}
              onChange={(v) => updateField("classSize", v)}
            />
          </QuestionWrapper>

          <QuestionWrapper title={t.survey.questions.q5}>
            <RadioGroup
              name="experience"
              options={[
                { label: t.survey.options.exp1, value: "Less than 2 years" },
                { label: t.survey.options.exp2, value: "2–5 years" },
                { label: t.survey.options.exp3, value: "6–10 years" },
                { label: t.survey.options.exp4, value: "More than 10 years" },
              ]}
              value={formData.experience}
              onChange={(v) => updateField("experience", v)}
            />
          </QuestionWrapper>

          <button
            onClick={() => setStep(2)}
            disabled={!formData.isTeaching}
            className="w-full bg-primary-gradient text-white py-4 rounded-full font-bold text-lg shadow-xl shadow-indigo-600/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 group"
          >
            {t.survey.continue} {formatNumber(2)}<span className="material-symbols-outlined rtl:-scale-x-100 transition-transform">arrow_forward</span>
          </button>
        </section>

        {/* --- Section 2: Your Workload --- */}
        <section className={`space-y-8 ${step !== 2 ? "hidden" : ""}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              {formatNumber(2)}
            </div>
            <h2 className="text-2xl font-bold font-headline text-on-surface">{t.survey.sections.s2}</h2>
          </div>

          <QuestionWrapper
            title={t.survey.questions.q6}
            subtitle={t.survey.questions.roughEstimates}
          >
            <div className="space-y-2">
              {Object.keys(formData.workloadHours).map((activity) => (
                <div
                  key={activity}
                  className="space-y-3 p-4 rounded-2xl border border-outline-variant/20 bg-transparent"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-on-surface-variant leading-tight">
                      {activity === "Teaching preparation (lesson plans, slides, activities)" ? t.survey.options.task_prep :
                       activity === "Creating assessments (quizzes, exams, assignments)" ? t.survey.options.task_assess :
                       activity === "Grading and providing feedback to students" ? t.survey.options.task_grade :
                       activity === "Responding to student queries (email, office hours)" ? t.survey.options.task_query :
                       activity === "Course documentation and institutional reporting" ? t.survey.options.task_doc : activity}
                    </span>
                    <span className="text-[10px] font-bold text-indigo-600/50 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-md">
                      {t.survey.questions.hrsWk}
                    </span>
                  </div>
                  <WorkloadRangeSelector
                    ranges={[
                      { label: formatNumber("0"), value: "0" },
                      { label: `${formatNumber("1")}-${formatNumber("2")}`, value: "1-2" },
                      { label: `${formatNumber("3")}-${formatNumber("5")}`, value: "3-5" },
                      { label: `${formatNumber("6")}-${formatNumber("10")}`, value: "6-10" },
                      { label: `${formatNumber("11")}-${formatNumber("15")}`, value: "11-15" },
                      { label: `${formatNumber("16")}-${formatNumber("20")}`, value: "16-20" },
                      { label: `${formatNumber("20")}+`, value: "20+" },
                    ]}
                    value={formData.workloadHours[activity as keyof typeof formData.workloadHours]}
                    onChange={(v) => updateWorkloadHours(activity, v)}
                  />
                </div>
              ))}
            </div>
          </QuestionWrapper>

          <QuestionWrapper
            title={t.survey.questions.q7}
            subtitle={t.survey.questions.selectUpTo3}
          >
            <CheckboxGroup
              options={[
                { label: t.survey.options.task_prep, value: "Teaching preparation (lesson plans, slides, activities)" },
                { label: t.survey.options.task_assess, value: "Creating assessments (quizzes, exams, assignments)" },
                { label: t.survey.options.task_grade, value: "Grading and providing feedback to students" },
                { label: t.survey.options.task_query, value: "Responding to student queries (email, office hours)" },
                { label: t.survey.options.task_doc, value: "Course documentation and institutional reporting" },
              ]}
              values={formData.burdensomeActivities}
              onChange={(v) => {
                if (v.length <= 3) updateField("burdensomeActivities", v);
              }}
            />
          </QuestionWrapper>

          <QuestionWrapper title={t.survey.questions.q8}>
            <RadioGroup
              name="heaviestWorkload"
              options={[
                { label: t.survey.options.wl1, value: "Start of semester (setup, planning, registration)" },
                { label: t.survey.options.wl2, value: "Mid-semester (exams, assignments)" },
                { label: t.survey.options.wl3, value: "End of semester (final exams, reports, grade submission)" },
                { label: t.survey.options.wl4, value: "Consistently throughout the semester" },
              ]}
              value={formData.heaviestWorkload}
              onChange={(v) => updateField("heaviestWorkload", v)}
            />
          </QuestionWrapper>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 bg-white border border-indigo-100 text-indigo-600 py-4 rounded-full font-bold transition-all hover:bg-slate-50 flex items-center justify-center gap-2 group"
            >
              <span className="material-symbols-outlined rtl:-scale-x-100 transition-transform">arrow_back</span>
              {t.survey.back}
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-[2] bg-primary-gradient text-white py-4 rounded-full font-bold shadow-xl shadow-indigo-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
            >
              {t.survey.continue} {formatNumber(3)}<span className="material-symbols-outlined rtl:-scale-x-100 transition-transform">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* --- Section 3: Tools --- */}
        <section className={`space-y-8 ${step !== 3 ? "hidden" : ""}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              {formatNumber(3)}
            </div>
            <h2 className="text-2xl font-bold font-headline text-on-surface">{t.survey.sections.s3}</h2>
          </div>

          <QuestionWrapper
            title={t.survey.questions.q9}
            subtitle={t.survey.questions.selectAll}
          >
            <CheckboxGroup
              options={[
                { label: t.survey.options.tool1, value: "LMS (Blackboard, Moodle, Canvas, etc.)" },
                { label: t.survey.options.tool2, value: "Microsoft Word / Google Docs" },
                { label: t.survey.options.tool3, value: "Microsoft PowerPoint / Google Slides" },
                { label: t.survey.options.tool4, value: "Microsoft Excel / Google Sheets" },
                { label: t.survey.options.tool5, value: "Email only" },
                { label: t.survey.other, value: "Other" },
              ]}
              values={formData.currentTools}
              onChange={(v) => updateField("currentTools", v)}
            />
            {formData.currentTools.includes("Other") && (
              <div className="mt-4 animate-slide-up-fade">
                <input
                  type="text"
                  placeholder={t.survey.questions.toolsPlaceholder}
                  className="w-full bg-white/80 border border-indigo-200 rounded-xl px-4 py-3 text-sm outline-none"
                  value={formData.toolsOther}
                  onChange={(e) => updateField("toolsOther", e.target.value)}
                />
              </div>
            )}
          </QuestionWrapper>

          <QuestionWrapper
            title={t.survey.questions.q10}
            subtitle={t.survey.questions.selectAll}
          >
            <CheckboxGroup
              options={[
                { label: t.survey.options.aiTool1, value: "ChatGPT" },
                { label: t.survey.options.aiTool2, value: "Google Gemini" },
                { label: t.survey.options.aiTool3, value: "Microsoft Copilot" },
                { label: t.survey.options.aiTool4, value: "Grammarly or similar AI writing tools" },
                { label: t.survey.options.aiTool_other, value: "Other AI tool" },
                { label: t.survey.options.aiTool_none, value: "I do not use any AI tools" },
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
                  placeholder={t.survey.questions.aiToolsPlaceholder}
                  className="w-full bg-white/80 border border-indigo-200 rounded-xl px-4 py-3 text-sm outline-none"
                  value={formData.aiToolsOther}
                  onChange={(e) => updateField("aiToolsOther", e.target.value)}
                />
              </div>
            )}
          </QuestionWrapper>

          <QuestionWrapper title={t.survey.questions.q11}>
            <RadioGroup
              name="aiFrequency"
              options={[
                { label: t.survey.options.aiFreq1, value: "I have never tried AI tools" },
                { label: t.survey.options.aiFreq2, value: "I tried once or twice but stopped" },
                { label: t.survey.options.aiFreq3, value: "Occasionally (a few times a month)" },
                { label: t.survey.options.aiFreq4, value: "Regularly (weekly)" },
                { label: t.survey.options.aiFreq5, value: "Daily" },
              ]}
              value={formData.aiFrequency}
              onChange={(v) => updateField("aiFrequency", v)}
            />
          </QuestionWrapper>

          {!formData.aiTools.includes("I do not use any AI tools") &&
            formData.aiFrequency !== "I have never tried AI tools" && (
              <QuestionWrapper
                title={t.survey.questions.q12}
                subtitle={t.survey.questions.selectAll}
              >
                <CheckboxGroup
                  options={[
                    { label: t.survey.options.task_prep, value: "Teaching preparation (lesson plans, slides, activities)" },
                    { label: t.survey.options.task_assess, value: "Creating assessments (quizzes, exams, assignments)" },
                    { label: t.survey.options.aiUse1, value: "Summarizing or simplifying material" },
                    { label: t.survey.options.aiUse2, value: "Writing or editing documents" },
                    { label: t.survey.options.task_grade, value: "Grading and providing feedback to students" },
                    { label: t.survey.options.task_query, value: "Responding to student queries (email, office hours)" },
                    { label: t.survey.other, value: "Other" },
                  ]}
                  values={formData.aiUseCases}
                  onChange={(v) => updateField("aiUseCases", v)}
                />
                {formData.aiUseCases.includes("Other") && (
                  <div className="mt-4 animate-slide-up-fade">
                    <input
                      type="text"
                      placeholder={t.survey.questions.aiUsePlaceholder}
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
              className="flex-1 bg-white border border-indigo-100 text-indigo-600 py-4 rounded-full font-bold transition-all hover:bg-slate-50 flex items-center justify-center gap-2 group"
            >
              <span className="material-symbols-outlined rtl:-scale-x-100 transition-transform">arrow_back</span>
              {t.survey.back}
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-[2] bg-primary-gradient text-white py-4 rounded-full font-bold shadow-xl shadow-indigo-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
            >
              {t.survey.continue} {formatNumber(4)}<span className="material-symbols-outlined rtl:-scale-x-100 transition-transform">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* --- Section 4: Attitude --- */}
        <section className={`space-y-8 ${step !== 4 ? "hidden" : ""}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              {formatNumber(4)}
            </div>
            <h2 className="text-2xl font-bold font-headline text-on-surface">
              {t.survey.sections.s4}
            </h2>
          </div>

          <QuestionWrapper
            title={t.survey.questions.q13}
            subtitle={`1 = ${t.survey.questions.notComfortable} · 5 = ${t.survey.questions.veryComfortable}`}
          >
            <div className="space-y-6">
              {Object.keys(formData.comfortLevels).map((task) => (
                <ScaleSelect
                  key={task}
                  label={
                    task === "Teaching preparation (lesson plans, slides, activities)" ? t.survey.options.task_prep :
                    task === "Creating assessments (quizzes, exams, assignments)" ? t.survey.options.task_assess :
                    task === "Grading and providing feedback to students" ? t.survey.options.task_grade :
                    task === "Responding to student queries (email, office hours)" ? t.survey.options.task_query :
                    task === "Converting lecture notes or recordings into study materials" ? t.survey.options.task_notes_long :
                    task === "Course documentation and institutional reporting" ? t.survey.options.task_doc : task
                  }
                  value={formData.comfortLevels[task]}
                  leftLabel={t.survey.questions.notComfortable}
                  rightLabel={t.survey.questions.veryComfortable}
                  formatNumber={formatNumber}
                  onChange={(val) => updateComfort(task, val)}
                />
              ))}
            </div>
          </QuestionWrapper>

          <QuestionWrapper title={t.survey.questions.q14}>
            <LikertGrid
              taskHeader={t.survey.tableHeaders.task}
              tasks={[
                { label: t.survey.options.task_assess, value: "Creating assessments (quizzes, exams, assignments)" },
                { label: t.survey.options.task_prep, value: "Teaching preparation (lesson plans, slides, activities)" },
                { label: t.survey.options.task_grade, value: "Grading and providing feedback to students" },
                { label: t.survey.options.task_query, value: "Responding to student queries (email, office hours)" },
                { label: t.survey.options.task_notes_long, value: "Converting lecture notes or recordings into study materials" },
                { label: t.survey.options.task_doc, value: "Course documentation and institutional reporting" },
              ]}
              options={[
                { label: t.survey.yes, value: "Yes" },
                { label: t.survey.no, value: "No" },
                { label: t.survey.notSure, value: "Not sure" },
              ]}
              values={formData.aiRolePreference}
              onChange={(task, val) => updateAiRole(task, val)}
            />
          </QuestionWrapper>

          <QuestionWrapper title={t.survey.questions.q15}>
            <CheckboxGroup
              options={[
                { label: t.survey.options.concern1, value: "Output quality may not be accurate enough" },
                { label: t.survey.options.concern2, value: "Poor support for non-english language" },
                { label: t.survey.options.concern3, value: "Privacy and data security concerns" },
                { label: t.survey.options.concern4, value: "I don't trust AI-generated output for official use" },
                { label: t.survey.options.concern5, value: "Reviewing and correcting AI output takes too much time" },
                { label: t.survey.options.concern6, value: "Outputs may not align with academic standards" },
                { label: t.survey.options.concern7, value: "I have no specific concerns" },
                { label: t.survey.other, value: "Other" },
              ]}
              values={formData.aiConcerns}
              onChange={(v) => updateField("aiConcerns", v)}
            />
            {formData.aiConcerns.includes("Other") && (
              <div className="mt-4 animate-slide-up-fade">
                <input
                  type="text"
                  placeholder={t.survey.questions.concernsPlaceholder}
                  className="w-full bg-white/80 border border-indigo-200 rounded-xl px-4 py-3 text-sm outline-none"
                  value={formData.aiConcernsOther}
                  onChange={(e) => updateField("aiConcernsOther", e.target.value)}
                />
              </div>
            )}
          </QuestionWrapper>

          <QuestionWrapper title={t.survey.questions.q16}>
            <CheckboxGroup
              options={[
                { label: t.survey.options.req1, value: "I must be able to review and edit all outputs" },
                { label: t.survey.options.req2, value: "The final academic decision must always remain with me" },
                { label: t.survey.options.req3, value: "My data must be kept private" },
                { label: t.survey.options.req4, value: "I need to understand how the AI reached its output" },
                { label: t.survey.options.req5, value: "Outputs must follow official academic standards" },
                { label: t.survey.options.req6, value: "The tool must support more languages other than English" },
                { label: t.survey.other, value: "Other" },
              ]}
              values={formData.aiRequirements}
              onChange={(v) => updateField("aiRequirements", v)}
            />
            {formData.aiRequirements.includes("Other") && (
              <div className="mt-4 animate-slide-up-fade">
                <input
                  type="text"
                  placeholder={t.survey.questions.reqsPlaceholder}
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
              className="flex-1 bg-white border border-indigo-100 text-indigo-600 py-4 rounded-full font-bold transition-all hover:bg-slate-50 flex items-center justify-center gap-2 group"
            >
              <span className="material-symbols-outlined rtl:-scale-x-100 transition-transform">arrow_back</span>
              {t.survey.back}
            </button>
            <button
              onClick={() => setStep(5)}
              className="flex-[2] bg-primary-gradient text-white py-4 rounded-full font-bold shadow-xl shadow-indigo-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
            >
              {t.survey.continue} {formatNumber(5)}
              <span className="material-symbols-outlined rtl:-scale-x-100 transition-transform">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* --- Section 5: Follow-up --- */}
        <section className={`space-y-8 ${step !== 5 ? "hidden" : ""}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              {formatNumber(5)}
            </div>
            <h2 className="text-2xl font-bold font-headline text-on-surface">{t.survey.sections.s5}</h2>
          </div>

          <QuestionWrapper title={t.survey.questions.q17}>
            <RadioGroup
              name="followUp"
              options={[
                { label: t.survey.yes, value: "Yes" },
                { label: t.survey.no, value: "No" },
              ]}
              value={formData.followUp}
              onChange={(v) => updateField("followUp", v)}
            />
            {formData.followUp === "Yes" && (
              <div className="mt-6 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-4 animate-slide-up-fade">
                <p className="text-xs font-bold text-indigo-900/60 uppercase tracking-widest">
                  {t.survey.questions.q18}
                </p>
                <input
                  type="text"
                  placeholder={t.survey.questions.contactPlaceholder}
                  className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-3 text-sm outline-none shadow-sm focus:border-indigo-500"
                  value={formData.followUpContact}
                  onChange={(e) => updateField("followUpContact", e.target.value)}
                />
              </div>
            )}
            {formData.followUp === "No" && (
              <div className="mt-4 p-4 bg-slate-50/50 rounded-xl border border-slate-100 animate-slide-up-fade">
                <p className="text-sm text-on-surface-variant italic">
                  {t.survey.completion.msgStandard}
                </p>
              </div>
            )}
          </QuestionWrapper>

          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-4 shadow-2xl shadow-indigo-200 overflow-hidden relative">
            <h3 className="text-xl font-bold font-headline">{t.survey.completion.readyToSubmit || "Ready to submit?"}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.survey.description}
            </p>

            {submitError && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-start gap-3 animate-slide-up-fade">
                <span className="material-symbols-outlined text-red-400 text-[20px]">error</span>
                <p className="text-red-200 text-xs font-medium leading-relaxed">{submitError}</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 group"
              >
                <span className="material-symbols-outlined rtl:-scale-x-100 transition-transform">arrow_back</span>
                {t.survey.back}
              </button>
              <button
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
                className="flex-[2] bg-primary-gradient text-white py-4 rounded-full font-bold shadow-xl shadow-indigo-600/40 hover:scale-[1.05] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100 group"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">{t.survey.submitting}</span>
                ) : (
                  <>
                    {t.survey.submit}
                    <span className="material-symbols-outlined rtl:-scale-x-100 transition-transform">send</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="max-w-4xl mx-auto px-6 py-12 text-center border-t border-outline-variant/30">
        <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em]" dir="ltr">
          &copy; {new Date().getFullYear()} {t.survey.copyright}
        </p>
      </footer>
    </div>
  );
}
