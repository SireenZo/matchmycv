import type { Analysis } from "./schema";

export const SAMPLE_CV = `Lina Haddad, Junior Software Engineer, Beirut, Lebanon

EDUCATION
B.S. Computer Science, Lebanese International University, 2025. GPA 3.6/4.0

EXPERIENCE
Software Engineering Intern, Cedar Tech (Jun 2024 – Sep 2024)
- Worked on the company website using React.
- Fixed bugs in the admin dashboard.
- Helped the team with code reviews and testing.

Freelance Web Developer (2023 – present)
- Built websites for small businesses in Beirut.
- Made a booking system for a local clinic with Node.js and MongoDB.

PROJECTS
- Campus Marketplace: a web app where LIU students buy and sell used books (React, Firebase).
- Weather CLI in Python.

SKILLS
JavaScript, React, HTML, CSS, Node.js, MongoDB, Python, Git, Firebase
Languages: Arabic (native), English (fluent), French (intermediate)`;

export const SAMPLE_JOB = `Frontend Engineer (React / TypeScript), Remote, MENA

We're a fast-growing fintech building payment tools for SMEs across the Middle East.

Requirements
- 1–3 years of experience building production web apps with React
- Strong TypeScript skills
- Experience with Next.js and server-side rendering
- Comfortable writing unit and integration tests (Jest, React Testing Library)
- Familiarity with REST APIs and state management (Redux, Zustand or React Query)
- Understanding of web performance and accessibility (WCAG)
- Excellent communication in English; Arabic is a plus

Nice to have
- Tailwind CSS
- CI/CD (GitHub Actions)
- Experience in fintech or payments`;

export const SAMPLE_ANALYSIS: Analysis = {
  matchScore: 68,
  verdict: "Solid React foundation. Add TypeScript, testing and Next.js evidence to become a top candidate.",
  summary:
    "Lina has real React experience across an internship, freelance work and a shipped student project, plus the bilingual Arabic/English profile this MENA role values. The CV doesn't show TypeScript, Next.js or automated testing, and the bullets describe tasks rather than results, which hurts both recruiters and ATS filters.",
  scoreBreakdown: { skills: 64, experience: 70, keywords: 52, education: 88 },
  strengths: [
    { skill: "React", evidence: "Used at Cedar Tech internship and in the Campus Marketplace project." },
    { skill: "REST APIs / backend awareness", evidence: "Built a Node.js + MongoDB booking system for a clinic." },
    { skill: "Arabic & English", evidence: "Arabic (native), English (fluent): matches the 'Arabic is a plus' requirement." },
    { skill: "Code review culture", evidence: "Helped the team with code reviews and testing during the internship." },
    { skill: "Relevant degree", evidence: "B.S. Computer Science, LIU, GPA 3.6." },
  ],
  gaps: [
    {
      skill: "TypeScript",
      importance: "critical",
      suggestion: "Migrate Campus Marketplace to TypeScript and say so on the CV. It's a weekend of work and directly answers a top requirement.",
    },
    {
      skill: "Next.js / SSR",
      importance: "critical",
      suggestion: "Build or port one project to Next.js (App Router) and deploy it on Vercel with a live link.",
    },
    {
      skill: "Automated testing (Jest, RTL)",
      importance: "important",
      suggestion: "Add a test suite to one project and mention coverage, e.g. '40+ unit tests with Jest & React Testing Library'.",
    },
    {
      skill: "State management",
      importance: "important",
      suggestion: "If you used Context, Redux or React Query anywhere, name it explicitly. Recruiters can't infer it.",
    },
    {
      skill: "Accessibility & performance",
      importance: "nice-to-have",
      suggestion: "Run Lighthouse on a project, fix issues, and cite the before/after score.",
    },
  ],
  missingKeywords: ["TypeScript", "Next.js", "Jest", "React Testing Library", "Redux", "React Query", "WCAG", "Tailwind CSS", "GitHub Actions", "CI/CD", "fintech"],
  bulletRewrites: [
    {
      original: "Worked on the company website using React.",
      improved: "Built and shipped reusable React components for Cedar Tech's public website, collaborating with designers through a Git-based review workflow.",
      why: "Starts with a strong verb and shows ownership and teamwork instead of 'worked on'.",
    },
    {
      original: "Fixed bugs in the admin dashboard.",
      improved: "Diagnosed and resolved UI and data bugs in the internal admin dashboard, improving reliability for the operations team.",
      why: "Shows problem-solving and who benefited. Add a number (e.g. bugs closed) if you have one.",
    },
    {
      original: "Made a booking system for a local clinic with Node.js and MongoDB.",
      improved: "Designed and delivered an end-to-end appointment booking system (Node.js REST API + MongoDB) used daily by a Beirut clinic's staff and patients.",
      why: "Highlights REST APIs (a job keyword) and real-world usage.",
    },
  ],
  interviewQuestions: [
    {
      question: "How have you used TypeScript, and how would you type a React component's props and state?",
      tip: "Be honest about your level, then show you've closed the gap: mention the project you migrated and one thing types caught for you.",
    },
    {
      question: "What's the difference between client-side and server-side rendering, and when would you choose each in Next.js?",
      tip: "Use the Campus Marketplace as an example: which pages benefit from SSR (SEO for listings) and which don't.",
    },
    {
      question: "Walk us through how you'd test a payment form component.",
      tip: "Cover validation, error states, and mocking the API call with React Testing Library.",
    },
    {
      question: "Tell us about a bug that was hard to find. How did you approach it?",
      tip: "Pick one from the admin dashboard and use the STAR format: situation, task, action, result.",
    },
  ],
};
