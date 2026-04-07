import Link from "next/link";
import { questions } from "@/data/questions";
import { companies } from "@/data/companies";
import { checklistItems } from "@/data/checklist";

/* ---------- derived stats ---------- */
const totalQuestions = questions.length;
const masteredQuestions = questions.filter((q) => q.mastered).length;
const totalCompanies = companies.length;
const checklistDone = checklistItems.filter((c) => c.completed).length;
const checklistTotal = checklistItems.length;
const checklistPct = Math.round((checklistDone / checklistTotal) * 100);

const recentQuestions = [...questions]
  .sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
  .slice(0, 5);

/* ---------- helpers ---------- */
const difficultyStyle: Record<string, string> = {
  easy: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  hard: "bg-red-50 text-red-700",
};

const categoryStyle: Record<string, string> = {
  behavioral: "bg-purple-50 text-purple-700",
  technical: "bg-blue-50 text-blue-700",
  "system-design": "bg-pink-50 text-pink-700",
  resume: "bg-teal-50 text-teal-700",
};

/* ================================================== */

export default function Home() {
  return (
    <div className="space-y-10">
      {/* ---- Hero ---- */}
      <section>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Your Interview Dashboard
        </h1>
        <p className="mt-2 text-slate-500 max-w-lg">
          Track questions, research companies, and stay on top of your prep — all
          in one place.
        </p>
      </section>

      {/* ---- Stat Cards ---- */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Questions"
          value={totalQuestions}
          sub="in your bank"
          accent="bg-indigo-500"
        />
        <StatCard
          label="Mastered"
          value={masteredQuestions}
          sub={`of ${totalQuestions} questions`}
          accent="bg-emerald-500"
        />
        <StatCard
          label="Companies"
          value={totalCompanies}
          sub="being tracked"
          accent="bg-amber-500"
        />
        <StatCard
          label="Checklist"
          value={`${checklistPct}%`}
          sub={`${checklistDone} of ${checklistTotal} done`}
          accent="bg-rose-500"
        />
      </section>

      {/* ---- Middle Row: Recent Questions + Company Prep ---- */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Questions — spans 2 cols */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">
              Recent Questions
            </h2>
            <Link
              href="/questions"
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
            >
              View all &rarr;
            </Link>
          </div>

          <ul className="divide-y divide-slate-100">
            {recentQuestions.map((q) => (
              <li key={q.id} className="px-5 py-3 flex items-center gap-3">
                <span
                  className={`shrink-0 h-2 w-2 rounded-full ${
                    q.mastered ? "bg-emerald-400" : "bg-slate-300"
                  }`}
                />
                <span className="flex-1 text-sm text-slate-700 truncate">
                  {q.title}
                </span>
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${categoryStyle[q.category]}`}
                >
                  {q.category}
                </span>
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${difficultyStyle[q.difficulty]}`}
                >
                  {q.difficulty}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Prep */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">
              Company Prep
            </h2>
            <Link
              href="/companies"
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
            >
              View all &rarr;
            </Link>
          </div>

          <ul className="divide-y divide-slate-100">
            {companies.map((c) => {
              const count = questions.filter(
                (q) => q.company === c.name
              ).length;
              return (
                <li
                  key={c.id}
                  className="px-5 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold ${c.color}`}
                    >
                      {c.name[0]}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {c.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {c.industry}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">
                    {count} {count === 1 ? "question" : "questions"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---- Quick Actions ---- */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickAction
          href="/add-question"
          title="Add a Question"
          description="Log a new question from a real interview."
          iconBg="bg-indigo-100 text-indigo-600"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          }
        />
        <QuickAction
          href="/questions"
          title="Browse Questions"
          description="Filter and study your question bank."
          iconBg="bg-emerald-100 text-emerald-600"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          }
        />
        <QuickAction
          href="/checklist"
          title="Prep Checklist"
          description="Stay on track with your interview prep."
          iconBg="bg-amber-100 text-amber-600"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </section>
    </div>
  );
}

/* ---------- Sub-components ---------- */

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: number | string;
  sub: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${accent}`} />
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-400">{sub}</p>
    </div>
  );
}

function QuickAction({
  href,
  title,
  description,
  icon,
  iconBg,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
    >
      <span
        className={`shrink-0 flex items-center justify-center h-10 w-10 rounded-lg ${iconBg}`}
      >
        {icon}
      </span>
      <div>
        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      </div>
    </Link>
  );
}
