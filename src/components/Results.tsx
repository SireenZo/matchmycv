"use client";

import { useState } from "react";
import type { Analysis } from "@/lib/schema";
import ScoreRing, { scoreBg } from "./ScoreRing";

const IMPORTANCE_STYLES = {
  critical: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  important: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  "nice-to-have": "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
} as const;

function Card({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <span aria-hidden>{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="rounded-md px-2 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-500/10"
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}

export default function Results({ analysis, demo }: { analysis: Analysis; demo: boolean }) {
  const breakdown = [
    { label: "Skills", value: analysis.scoreBreakdown.skills },
    { label: "Experience", value: analysis.scoreBreakdown.experience },
    { label: "Keywords (ATS)", value: analysis.scoreBreakdown.keywords },
    { label: "Education", value: analysis.scoreBreakdown.education },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      {demo && (
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-800 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200">
          <strong>Demo mode:</strong> you&apos;re seeing a sample analysis. Add an <code>ANTHROPIC_API_KEY</code> to analyse your own CV.
        </div>
      )}

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
          <ScoreRing score={analysis.matchScore} />
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-xl font-semibold leading-snug">{analysis.verdict}</p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{analysis.summary}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {breakdown.map((b) => (
                <div key={b.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">{b.label}</span>
                    <span className="font-medium tabular-nums">{b.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${scoreBg(b.value)}`}
                      style={{ width: `${b.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Your strengths" icon="✅">
          <ul className="space-y-3">
            {analysis.strengths.map((s) => (
              <li key={s.skill}>
                <p className="font-medium">{s.skill}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{s.evidence}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Gaps to close" icon="🎯">
          <ul className="space-y-3">
            {analysis.gaps.map((g) => (
              <li key={g.skill}>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{g.skill}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${IMPORTANCE_STYLES[g.importance]}`}>
                    {g.importance}
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{g.suggestion}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {analysis.missingKeywords.length > 0 && (
        <Card title="Missing keywords" icon="🔑">
          <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
            Many companies filter CVs with ATS software. Add these terms where they honestly apply to you.
          </p>
          <div className="flex flex-wrap gap-2">
            {analysis.missingKeywords.map((k) => (
              <span
                key={k}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              >
                {k}
              </span>
            ))}
          </div>
        </Card>
      )}

      <Card title="Stronger CV bullets" icon="✍️">
        <div className="space-y-4">
          {analysis.bulletRewrites.map((b, i) => (
            <div key={i} className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/60">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">Before</p>
                <p className="text-sm text-zinc-600 line-through decoration-zinc-300 dark:text-zinc-400 dark:decoration-zinc-600">
                  {b.original}
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">After</p>
                  <CopyButton text={b.improved} />
                </div>
                <p className="text-sm">{b.improved}</p>
                <p className="mt-2 text-xs text-zinc-500">{b.why}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Interview prep" icon="💬">
        <ol className="space-y-4">
          {analysis.interviewQuestions.map((q, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                {i + 1}
              </span>
              <div>
                <p className="font-medium">{q.question}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">💡 {q.tip}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
