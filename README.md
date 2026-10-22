# MatchMyCV: AI CV ↔ Job Matcher

> See how well your CV matches a job **before you apply**.
>
> **Live demo:** https://matchmycv-jade.vercel.app

Paste a job description and your CV (or upload a PDF). In under a minute, MatchMyCV gives you:

- **Match score (0–100)** with a breakdown for skills, experience, ATS keywords and education
- **Strengths**: the requirements you already meet, with evidence from your CV
- **Gaps to close**: what's missing, ranked by importance, with concrete next steps
- **Missing ATS keywords**: exact terms from the job post that your CV doesn't use
- **Stronger CV bullets**: before/after rewrites tailored to the role (no invented facts)
- **Interview prep**: likely questions aimed at your weak spots, with answer tips

![screenshot](docs/screenshot.png)

## Tech stack

| Layer | Tech |
| --- | --- |
| Frontend | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| Backend | Next.js Route Handler (`/api/analyze`) |
| AI | Claude (Anthropic API) with **structured outputs** validated by a Zod schema |
| Files | Native PDF understanding: CVs are sent as PDF documents, with no parsing library |

## How it works

1. The browser sends the CV (text or PDF) and job description to `/api/analyze`.
2. The server validates input (size and type limits) and calls Claude with a recruiter-style system prompt.
3. The response is constrained to a **typed JSON schema** (`src/lib/schema.ts`), so the UI always gets well-formed data. No fragile regex parsing.
4. Scores are clamped and the result is rendered as an animated report.

Design decisions:
- **Honesty guardrails:** the prompt forbids inventing metrics or experience in rewrites.
- **Prompt-injection aware:** CV/job text is treated as untrusted data.
- **Demo mode:** with no API key, the app returns a realistic sample so anyone can try the UI.
- **Privacy:** nothing is stored; the CV only goes to the model for analysis.

## Run locally

```bash
npm install
cp .env.example .env.local   # add your ANTHROPIC_API_KEY (optional — demo mode works without it)
npm run dev
```

Open http://localhost:3000 and click **Try with a sample**.

## Deploy

Push to GitHub, import the repo on [Vercel](https://vercel.com/new), and add `ANTHROPIC_API_KEY` as an environment variable.

## Roadmap

- [ ] Arabic and French interface
- [ ] Export the report as PDF
- [ ] Generate a tailored cover letter
- [ ] Compare one CV against several jobs

---

Built by **[Sireen Alzoughbi](https://github.com/SireenZo)**, Computer Science @ Lebanese International University.
