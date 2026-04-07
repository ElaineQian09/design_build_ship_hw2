export interface Company {
  id: string;
  name: string;
  industry: string;
  color: string;
}

export const companies: Company[] = [
  { id: "amazon", name: "Amazon", industry: "Cloud & E-Commerce", color: "bg-orange-100 text-orange-700" },
  { id: "google", name: "Google", industry: "Search & AI", color: "bg-blue-100 text-blue-700" },
  { id: "meta", name: "Meta", industry: "Social & VR", color: "bg-sky-100 text-sky-700" },
  { id: "apple", name: "Apple", industry: "Hardware & Software", color: "bg-gray-100 text-gray-700" },
  { id: "microsoft", name: "Microsoft", industry: "Cloud & Enterprise", color: "bg-emerald-100 text-emerald-700" },
];
