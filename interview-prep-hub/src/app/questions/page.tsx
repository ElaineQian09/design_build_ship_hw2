"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { questions } from "@/data/questions";

const categories = ["all", "behavioral", "technical", "resume", "system-design"] as const;

const categoryLabel: Record<string, string> = {
  all: "All",
  behavioral: "Behavioral",
  technical: "Technical",
  resume: "Resume",
  "system-design": "System Design",
};

const categoryStyle: Record<string, string> = {
  behavioral: "bg-purple-50 text-purple-700 border-purple-200",
  technical: "bg-blue-50 text-blue-700 border-blue-200",
  "system-design": "bg-pink-50 text-pink-700 border-pink-200",
  resume: "bg-teal-50 text-teal-700 border-teal-200",
};

const difficultyStyle: Record<string, string> = {
  easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  hard: "bg-red-50 text-red-700 border-red-200",
};

const categoryIcon: Record<string, string> = {
  behavioral: "💬",
  technical: "💻",
  "system-design": "🏗️",
  resume: "📄",
};

export default function QuestionsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.company.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || q.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const counts: Record<string, number> = {
    all: questions.length,
    behavioral: questions.filter((q) => q.category === "behavioral").length,
    technical: questions.filter((q) => q.category === "technical").length,
    resume: questions.filter((q) => q.category === "resume").length,
    "system-design": questions.filter((q) => q.category === "system-design").length,
  };

  return (
    <div>
      <PageHeader
        title="Question Bank"
        description="Browse and filter interview questions by category, difficulty, and company."
      />

      {/* Search */}
      <div className="relative mb-6">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by question or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition-all ${
              activeCategory === cat
                ? "border-indigo-300 bg-indigo-50 text-indigo-700 shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {categoryLabel[cat]}
            <span
              className={`ml-1 inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-semibold leading-none ${
                activeCategory === cat
                  ? "bg-indigo-200/60 text-indigo-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {counts[cat]}
            </span>
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-xs text-slate-400 mb-4">
        Showing {filtered.length} {filtered.length === 1 ? "question" : "questions"}
        {activeCategory !== "all" && ` in ${categoryLabel[activeCategory]}`}
        {search && ` matching "${search}"`}
      </p>

      {/* Question Cards */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-sm text-slate-400">
            No questions found. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filtered.map((q) => (
            <Link
              key={q.id}
              href={`/questions/${q.id}`}
              className="group relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Category Icon */}
                <span className="shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-slate-50 text-lg">
                  {categoryIcon[q.category]}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {q.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Category Badge */}
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${categoryStyle[q.category]}`}
                    >
                      {q.category === "system-design" ? "System Design" : q.category.charAt(0).toUpperCase() + q.category.slice(1)}
                    </span>

                    {/* Difficulty Badge */}
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${difficultyStyle[q.difficulty]}`}
                    >
                      {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
                    </span>

                    {/* Company */}
                    <span className="inline-flex items-center text-[11px] text-slate-400">
                      {q.company}
                    </span>

                    {/* Mastered Status */}
                    <span
                      className={`ml-auto inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${
                        q.mastered
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-slate-50 text-slate-400 border border-slate-200"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          q.mastered ? "bg-emerald-500" : "bg-slate-300"
                        }`}
                      />
                      {q.mastered ? "Mastered" : "Not started"}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <svg
                  className="shrink-0 h-4 w-4 text-slate-300 group-hover:text-indigo-400 transition-colors mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
