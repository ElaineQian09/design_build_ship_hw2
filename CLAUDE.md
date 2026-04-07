@AGENTS.md

# Interview Prep Hub

## Project Goal

Interview Prep Hub is a multi-page productivity tool that helps students and job seekers prepare for technical and behavioral interviews. It organizes questions by category, provides actionable tips, and offers interactive practice exercises — all in one clean, focused interface.

This is a student assignment (Assignment 2: Build Your Own Tool) built with Next.js, Tailwind CSS, and TypeScript. It should feel like a real, polished product — not a toy demo.

## Target Users

- College students preparing for internship and new-grad interviews
- Career switchers entering tech
- Job seekers brushing up before interview rounds

Users are motivated but time-constrained. The app should be scannable, low-friction, and immediately useful.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with TypeScript
- **Styling:** Tailwind CSS 4
- **Routing:** File-based routing under `src/app/`
- **Shared components:** `src/components/`
- **Deployment:** Vercel
- **Package manager:** npm

## Route Structure

| Route | Purpose |
|---|---|
| `/` | Landing page — hero section with value prop and card links to each section |
| `/questions` | Browsable list of interview questions, filterable by category (behavioral, technical, system design) |
| `/questions/[id]` | Individual question detail page with sample answer and tips |
| `/tips` | Curated interview tips organized by stage (before, during, after) |
| `/practice` | Interactive practice mode — timed prompts, self-rating, progress tracking |

## Core Features

### Questions Bank (`/questions`)
- Display questions in a card grid or list layout
- Filter/search by category: Behavioral, Technical, System Design
- Each question links to a detail page with:
  - The question text
  - A sample/model answer
  - Key tips for answering
  - Difficulty tag (Easy / Medium / Hard)
  - Category tag

### Tips Page (`/tips`)
- Organized into sections: Before the Interview, During the Interview, After the Interview
- Each tip is a concise, actionable card
- Tips can include do's and don'ts

### Practice Mode (`/practice`)
- User picks a category or goes random
- App presents a question with an optional timer
- User writes or mentally prepares their answer
- User self-rates their response (1-5 stars or confidence level)
- Track completed questions in local state (localStorage for persistence across sessions)

### Navigation
- Persistent top navbar on all pages (already in `src/components/Navbar.tsx`)
- Active route highlighting
- Mobile-responsive hamburger menu

## Data Model

All data is stored as static TypeScript arrays/objects in a `src/data/` directory. No database or API needed.

```typescript
// src/data/questions.ts
interface Question {
  id: string;
  title: string;           // Short display title
  question: string;        // Full question text
  category: "behavioral" | "technical" | "system-design";
  difficulty: "easy" | "medium" | "hard";
  sampleAnswer: string;
  tips: string[];
}

// src/data/tips.ts
interface Tip {
  id: string;
  title: string;
  body: string;
  stage: "before" | "during" | "after";
}

// Practice session state (localStorage)
interface PracticeSession {
  questionsCompleted: string[];   // question IDs
  ratings: Record<string, number>; // questionId -> 1-5 rating
}
```

## Visual Design Direction

- **Clean and minimal.** White/light gray backgrounds, generous whitespace, clear typography hierarchy.
- **Card-based layouts.** Questions, tips, and practice prompts each live in distinct, bordered cards with subtle hover shadows.
- **Color palette:** Neutral grays for background/text. One accent color (blue-600 / indigo-600) for interactive elements, links, and active states. Green for success/completed states. Yellow/amber for medium difficulty, red for hard.
- **Typography:** Use the Geist font (already configured). Headings are bold and large. Body text is relaxed line-height for readability.
- **Responsive:** Mobile-first. Single column on small screens, multi-column grid on md+ breakpoints.
- **No dark mode required** — light theme only is fine for this assignment.
- **Consistent spacing:** Use Tailwind's spacing scale consistently. Page containers use `max-w-5xl mx-auto px-6 py-16`.

## Technical Expectations

- All pages are server components by default. Only add `"use client"` where interactivity requires it (practice mode, filters, search).
- Use `Link` from `next/link` for all internal navigation — no `<a>` tags for internal routes.
- Keep components small and focused. Extract reusable pieces (e.g., `QuestionCard`, `TipCard`, `DifficultyBadge`, `CategoryBadge`) into `src/components/`.
- Use TypeScript strictly — no `any` types, define interfaces for all data shapes.
- Lint cleanly: `npm run lint` should pass with zero warnings.
- Build cleanly: `npm run build` should produce zero errors.
- Use `@/` import alias for all project imports.

## File Organization

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Navbar
│   ├── page.tsx                # Home page
│   ├── globals.css             # Tailwind base styles
│   ├── questions/
│   │   ├── page.tsx            # Questions list with filters
│   │   └── [id]/
│   │       └── page.tsx        # Question detail page
│   ├── tips/
│   │   └── page.tsx            # Tips organized by stage
│   └── practice/
│       └── page.tsx            # Interactive practice mode
├── components/
│   ├── Navbar.tsx              # Top navigation bar
│   ├── QuestionCard.tsx        # Card for question list
│   ├── TipCard.tsx             # Card for tips
│   ├── DifficultyBadge.tsx     # Easy/Medium/Hard badge
│   ├── CategoryBadge.tsx       # Behavioral/Technical/System Design badge
│   └── Timer.tsx               # Countdown timer for practice mode
└── data/
    ├── questions.ts            # Static question bank
    └── tips.ts                 # Static tips data
```

## Playwright MCP Verification Goals

When verifying with Playwright MCP, the following should be testable:

1. **Navigation:** Clicking each navbar link navigates to the correct page. All routes render without errors.
2. **Home page:** Three card links are visible and clickable. Each navigates to its respective section.
3. **Questions page:** Question cards render. Filtering by category shows only matching questions. Clicking a question navigates to its detail page.
4. **Question detail:** Displays question text, sample answer, tips list, and difficulty/category badges.
5. **Tips page:** Tips are grouped under Before / During / After headings. Each tip card displays a title and body.
6. **Practice mode:** A question prompt appears. Timer starts (if enabled). User can submit a self-rating. Completed state persists on page reload (localStorage).
7. **Responsive layout:** Pages render correctly at mobile (375px) and desktop (1280px) widths.
8. **No console errors:** All pages load without JavaScript errors in the browser console.
