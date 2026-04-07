export interface Question {
  id: string;
  title: string;
  company: string;
  category: "behavioral" | "technical" | "system-design" | "resume";
  difficulty: "easy" | "medium" | "hard";
  mastered: boolean;
  dateAdded: string;
}

export const questions: Question[] = [
  {
    id: "1",
    title: "Tell me about a time you led a project under a tight deadline.",
    company: "Amazon",
    category: "behavioral",
    difficulty: "medium",
    mastered: true,
    dateAdded: "2026-04-01",
  },
  {
    id: "2",
    title: "Design a URL shortener like bit.ly.",
    company: "Google",
    category: "system-design",
    difficulty: "hard",
    mastered: false,
    dateAdded: "2026-04-02",
  },
  {
    id: "3",
    title: "Reverse a linked list in-place.",
    company: "Meta",
    category: "technical",
    difficulty: "medium",
    mastered: true,
    dateAdded: "2026-04-02",
  },
  {
    id: "4",
    title: "Describe a conflict with a teammate and how you resolved it.",
    company: "Apple",
    category: "behavioral",
    difficulty: "easy",
    mastered: false,
    dateAdded: "2026-04-03",
  },
  {
    id: "5",
    title: "Implement an LRU cache.",
    company: "Amazon",
    category: "technical",
    difficulty: "hard",
    mastered: false,
    dateAdded: "2026-04-03",
  },
  {
    id: "6",
    title: "Design the backend for a chat application.",
    company: "Meta",
    category: "system-design",
    difficulty: "hard",
    mastered: false,
    dateAdded: "2026-04-04",
  },
  {
    id: "7",
    title: "What is your greatest strength and how does it help your team?",
    company: "Google",
    category: "behavioral",
    difficulty: "easy",
    mastered: true,
    dateAdded: "2026-04-05",
  },
  {
    id: "8",
    title: "Find the longest substring without repeating characters.",
    company: "Microsoft",
    category: "technical",
    difficulty: "medium",
    mastered: false,
    dateAdded: "2026-04-05",
  },
  {
    id: "9",
    title: "Design a notification system for a social media platform.",
    company: "Apple",
    category: "system-design",
    difficulty: "hard",
    mastered: false,
    dateAdded: "2026-04-06",
  },
  {
    id: "10",
    title: "Walk me through a time you failed and what you learned.",
    company: "Microsoft",
    category: "behavioral",
    difficulty: "medium",
    mastered: true,
    dateAdded: "2026-04-06",
  },
  {
    id: "11",
    title: "Walk me through your resume.",
    company: "Google",
    category: "resume",
    difficulty: "easy",
    mastered: false,
    dateAdded: "2026-04-06",
  },
  {
    id: "12",
    title: "Why did you leave your last role?",
    company: "Amazon",
    category: "resume",
    difficulty: "medium",
    mastered: false,
    dateAdded: "2026-04-07",
  },
  {
    id: "13",
    title: "Tell me about this gap in your employment history.",
    company: "Apple",
    category: "resume",
    difficulty: "hard",
    mastered: false,
    dateAdded: "2026-04-07",
  },
];
