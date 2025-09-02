import {
  Stethoscope,
  LineChart,
  Gavel,
  BookOpenCheck,
  FileBadge,
} from "lucide-react";

type CategorySection = {
  title: string;
  items: SectionItem[];
};
type CategoryConfig = {
  title: string;
  icon: React.ElementType;
  gradient: string;
  sections: CategorySection[];
};

type SectionItem =
  | string
  | { text: string; type: "warning" | "error" | string };

export const categoryConfig: Record<string, CategoryConfig> = {
  healthcare: {
    title: "Medical Insights",
    icon: Stethoscope, // 🩺 feels more "healthcare" than Heart
    gradient: "linear-gradient(to right, #FCA5A5, #F87171)",
    sections: [
      {
        title: "Medical Terms",
        items: ["Hypertension", "Diabetes", "Cardiovascular", "Medication"],
      },
      {
        title: "Risk Alerts",
        items: [
          { text: "Drug Interaction", type: "warning" },
          { text: "Allergy Note", type: "error" },
        ],
      },
    ],
  },
  business: {
    title: "Business Insights",
    icon: LineChart, // 📈 more professional than BarChart
    gradient: "linear-gradient(to right, #93C5FD, #60A5FA)",
    sections: [
      {
        title: "Key Deadlines",
        items: [
          "Q4 Report - Dec 31",
          "Budget Review - Jan 15",
          "Board Meeting - Feb 1",
        ],
      },
      {
        title: "Financial Metrics",
        items: ["Revenue: $2.4M", "Growth: +15%", "Expenses: $1.8M"],
      },
    ],
  },
  legal: {
    title: "Legal Analysis",
    icon: Gavel, // ⚖️ much clearer than Scale for legal docs
    gradient: "linear-gradient(to right, #C4A484, #A68B6C)",
    sections: [
      {
        title: "Key Clauses",
        items: [
          "Termination Clause",
          "Liability Limits",
          "Penalty Terms",
          "Auto-renewal",
        ],
      },
      {
        title: "Red Flags",
        items: [
          { text: "Unlimited Liability", type: "error" },
          { text: "Auto-renewal", type: "warning" },
        ],
      },
    ],
  },
  education: {
    title: "Learning Insights",
    icon: BookOpenCheck, // 📖 smarter + engaging than GraduationCap
    gradient: "linear-gradient(to right, #86EFAC, #4ADE80)",
    sections: [
      {
        title: "Key Concepts",
        items: [
          "Machine Learning",
          "Neural Networks",
          "Deep Learning",
          "AI Ethics",
        ],
      },
      {
        title: "Practice Quiz",
        items: ["5 questions ready", "Estimated time: 10 min"],
      },
    ],
  },
  default: {
    title: "Insights",
    icon: FileBadge, // 📑 cleaner & cooler than FileCheck
    gradient: "linear-gradient(to right, #7C3AED, #C084FC)",
    sections: [],
  },
};
