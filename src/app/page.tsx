"use client";

import { useEffect, useRef, useState } from "react";
import Results from "@/components/Results";
import type { Analysis, AnalyzeResponse } from "@/lib/schema";
import { SAMPLE_CV, SAMPLE_JOB } from "@/lib/samples";

type CvMode = "paste" | "upload";

const LOADING_STEPS = [
  "Reading your CV…",
  "Understanding the job requirements…",
  "Matching skills and experience…",
  "Rewriting your bullets…",
  "Preparing interview questions…",
];

const fieldClass =
  "w-full rounded-xl border border-zinc-200 bg-white p-4 text-sm leading-relaxed outline-none transition placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20";

export default function Home() {
  const [cvMode, setCvMode] = useState<CvMode>("paste");
  const [cvText, setCvText] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jobText, setJobText] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ analysis: Analysis; demo: boolean } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading) return;
    setStep(0);
    const id = setInterval(() => setStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1)), 2500);
    return () => clearInterval(id);
  }, [loading]);

  useEffect(() => {
    if (result) resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [result]);

  const hasCv = cvMode === "paste" ? cvText.trim().length > 0 : cvFile !== null;
  const canSubmit = hasCv && jobText.trim().length > 0 && !loading;

  function fillSample() {
    setCvMode("paste");
    setCvText(SAMPLE_CV);
    setJobText(SAMPLE_JOB);
    setError(null);
  }

  async function analyze(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const body = new FormData();
    body.set("jobText", jobText);
    if (cvMode === "paste") body.set("cvText", cvText);
    else if (cvFile) body.set("cvFile", cvFile);

    try {
      const res = await fetch("/api/analyze", { method: "POST", body });
      const data: AnalyzeResponse = await res.json();
      if (data.ok) setResult({ analysis: data.analysis, demo: data.demo });
      else setError(data.error);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/70 via-white to-white dark:from-indigo-950/30 dark:via-zinc-950 dark:to-zinc-950">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">M</span>
          MatchMyCV
        </div>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          GitHub ↗
        </a>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <section className="py-10 text-center sm:py-16">
          <p className="mb-4 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
            AI-powered · Free · Private
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            See how well your CV matches the job, <span className="text-indigo-600 dark:text-indigo-400">before you apply.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Paste a job post and your CV. Get a match score, the skills you&apos;re missing, ATS keywords, rewritten
            bullets and tailored interview questions in under a minute.
          </p>
        </section>

        <form onSubmit={analyze} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="cv" className="font-medium">Your CV</label>
                <div className="flex rounded-lg bg-zinc-100 p-0.5 text-xs dark:bg-zinc-800" role="tablist">
                  {(["paste", "upload"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      role="tab"
                      aria-selected={cvMode === m}
                      onClick={() => setCvMode(m)}
                      className={`rounded-md px-3 py-1 font-medium transition ${
                        cvMode === m ? "bg-white shadow-sm dark:bg-zinc-700" : "text-zinc-500"
                      }`}
                    >
                      {m === "paste" ? "Paste text" : "Upload PDF"}
                    </button>
                  ))}
                </div>
              </div>
              {cvMode === "paste" ? (
                <textarea
                  id="cv"
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  placeholder="Paste your CV here…"
                  className={`${fieldClass} h-80 resize-none`}
                />
              ) : (
                <label
                  htmlFor="cv"
                  className={`${fieldClass} flex h-80 cursor-pointer flex-col items-center justify-center gap-2 border-dashed text-center`}
                >
                  <span className="text-3xl" aria-hidden>📄</span>
                  <span className="font-medium">{cvFile ? cvFile.name : "Click to upload your CV"}</span>
                  <span className="text-xs text-zinc-500">PDF, up to 5 MB</span>
                  <input
                    id="cv"
                    type="file"
                    accept="application/pdf"
                    className="sr-only"
                    onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              )}
            </div>

            <div>
              <label htmlFor="job" className="mb-2 block font-medium">Job description</label>
              <textarea
                id="job"
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder="Paste the job post from LinkedIn, a company site…"
                className={`${fieldClass} h-80 resize-none`}
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading ? "Analysing…" : "Analyse my match →"}
            </button>
            <button
              type="button"
              onClick={fillSample}
              disabled={loading}
              className="w-full rounded-xl px-6 py-3 font-medium text-zinc-600 transition hover:bg-zinc-100 sm:w-auto dark:text-zinc-400 dark:hover:bg-zinc-900"
            >
              Try with a sample
            </button>
          </div>
          <p className="text-center text-xs text-zinc-500">Your CV is sent only to the AI for analysis and is never stored.</p>
        </form>

        <div ref={resultsRef} className="scroll-mt-6 pt-12">
          {loading && (
            <div className="flex flex-col items-center gap-4 py-12" aria-live="polite">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
              <p className="text-zinc-600 dark:text-zinc-400">{LOADING_STEPS[step]}</p>
            </div>
          )}
          {error && (
            <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
              {error}
            </div>
          )}
          {result && <Results analysis={result.analysis} demo={result.demo} />}
        </div>
      </main>

      <footer className="border-t border-zinc-200 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800">
        Built with Next.js, TypeScript, Tailwind CSS and Claude.
      </footer>
    </div>
  );
}
