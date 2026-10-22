import { z } from "zod";

export const AnalysisSchema = z.object({
  matchScore: z
    .number()
    .describe("Overall fit between the CV and the job, from 0 to 100."),
  verdict: z
    .string()
    .describe("One short, punchy sentence summarising the fit, e.g. 'Strong frontend match, light on cloud experience.'"),
  summary: z
    .string()
    .describe("2-3 sentences explaining the score in plain language."),
  scoreBreakdown: z.object({
    skills: z.number().describe("0-100: technical and soft skills overlap."),
    experience: z.number().describe("0-100: relevance and seniority of experience."),
    keywords: z.number().describe("0-100: how well the CV uses the job's vocabulary (ATS friendliness)."),
    education: z.number().describe("0-100: education and certifications fit."),
  }),
  strengths: z
    .array(
      z.object({
        skill: z.string(),
        evidence: z.string().describe("Where in the CV this is shown, quoted or paraphrased briefly."),
      }),
    )
    .describe("3-6 requirements the candidate clearly meets."),
  gaps: z
    .array(
      z.object({
        skill: z.string(),
        importance: z.enum(["critical", "important", "nice-to-have"]),
        suggestion: z.string().describe("A concrete, honest way to close or address this gap."),
      }),
    )
    .describe("3-6 requirements that are missing or weakly shown, most important first."),
  missingKeywords: z
    .array(z.string())
    .describe("Exact terms from the job post that are absent from the CV, for ATS optimisation."),
  bulletRewrites: z
    .array(
      z.object({
        original: z.string().describe("A bullet or sentence copied from the CV."),
        improved: z.string().describe("A stronger rewrite tailored to this job. Never invent facts, numbers or employers."),
        why: z.string().describe("One short line on what changed."),
      }),
    )
    .describe("3-4 rewrites of the CV's weakest relevant bullets."),
  interviewQuestions: z
    .array(
      z.object({
        question: z.string(),
        tip: z.string().describe("How this candidate should approach the answer, using their own experience."),
      }),
    )
    .describe("4 likely interview questions for this role, targeted at this candidate's gaps."),
});

export type Analysis = z.infer<typeof AnalysisSchema>;

export type AnalyzeResponse =
  | { ok: true; demo: boolean; analysis: Analysis }
  | { ok: false; error: string };
