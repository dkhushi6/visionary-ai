"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  FileCheck,
  Heart,
  BarChart3,
  Scale,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { MovingButton } from "../ui/moving-border";

interface CategorySidebarProps {
  category: string;
}

const CategorySidebar = ({ category }: CategorySidebarProps) => {
  const getCategoryContent = () => {
    switch (category) {
      case "healthcare":
        return {
          title: "Medical Insights",
          icon: <Heart />,
          gradient: "linear-gradient(to right, #DC2626, #F87171)", // red shades
          sections: [
            {
              title: "Medical Terms",
              items: [
                "Hypertension",
                "Diabetes",
                "Cardiovascular",
                "Medication",
              ],
            },
            {
              title: "Risk Alerts",
              items: [
                { text: "Drug Interaction", type: "warning" },
                { text: "Allergy Note", type: "error" },
              ],
            },
          ],
        };
      case "business":
        return {
          title: "Business Insights",
          icon: <BarChart3 />,
          gradient: "linear-gradient(to right, #2563EB, #60A5FA)", // blue shades
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
        };
      case "legal":
        return {
          title: "Legal Analysis",
          icon: <Scale />,
          gradient: "linear-gradient(to right, #F59E0B, #FCD34D)", // amber shades
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
        };
      case "education":
        return {
          title: "Learning Insights",
          icon: <GraduationCap />,
          gradient: "linear-gradient(to right, #16A34A, #4ADE80)", // green shades
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
        };
      default:
        return {
          title: "Insights",
          icon: <FileCheck />,
          gradient: "linear-gradient(to right, #7C3AED, #C084FC)", // purple shades
          sections: [],
        };
    }
  };

  const content = getCategoryContent();

  return (
    <div
      className="h-screen p-6 bg-gradient-to-b from-white dark:from-neutral-900 shadow-xl overflow-y-auto"
      style={{ height: "calc(100vh - 69px)" }}
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <MovingButton
          borderRadius="50%"
          containerClassName="w-24 h-24 p-0"
          borderClassName="h-12 w-12"
          className="bg-transparent border shadow-none"
          duration={5000}
        >
          {React.cloneElement(content.icon, {
            className: "h-12 w-12",
            style: { color: "currentColor" },
          })}
        </MovingButton>

        <h2
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text mt-4"
          style={{
            backgroundImage: content.gradient,
          }}
        >
          {content.title}
        </h2>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {content.sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-xl text-center font-semibold uppercase text-muted-foreground tracking-wide">
              {section.title}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-center gap-2 py-2 px-3 rounded-3xl transition-all",
                    typeof item === "object"
                      ? item.type === "warning"
                        ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400"
                        : item.type === "error"
                        ? "bg-red-50 text-red-600 dark:bg-red-900 dark:text-red-400"
                        : "bg-gray-100 dark:bg-neutral-700"
                      : "bg-gray-100 dark:bg-neutral-700"
                  )}
                >
                  {typeof item === "object" && (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">
                    {typeof item === "string" ? item : item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {category === "education" && (
          <Button className="w-full mt-6 bg-education hover:bg-education/90 text-lg py-3 font-semibold">
            Start Practice Quiz
          </Button>
        )}
      </div>
    </div>
  );
};

export default CategorySidebar;
