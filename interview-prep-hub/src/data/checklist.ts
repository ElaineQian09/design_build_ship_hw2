export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export const checklistItems: ChecklistItem[] = [
  { id: "1", label: "Update resume with recent projects", completed: true },
  { id: "2", label: "Practice STAR method for behavioral questions", completed: true },
  { id: "3", label: "Review top 20 LeetCode problems", completed: false },
  { id: "4", label: "Prepare 3 questions to ask the interviewer", completed: true },
  { id: "5", label: "Research target companies", completed: false },
  { id: "6", label: "Mock interview with a friend", completed: false },
  { id: "7", label: "Review system design fundamentals", completed: false },
  { id: "8", label: "Prepare personal pitch (60-second intro)", completed: true },
];
