"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { MovingButton } from "../ui/moving-border";
import { categoryConfig } from "./sidebar/category-config";

// 🎨 Styles for warning/error/default item types (lighter palette)
const itemStyles: Record<string, string> = {
  warning:
    "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  error: "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  default: "bg-gray-50 text-gray-800 dark:bg-neutral-800 dark:text-neutral-300",
};

type CategorySidebarProps = {
  category: string;
};

const CategorySidebar = ({ category }: CategorySidebarProps) => {
  const content = categoryConfig[category] || categoryConfig.default;
  const Icon = content.icon;

  useEffect(() => {
    console.log("categories from sideBar", category);
    console.log("content from sideBar", content);
  });
  return (
    <div
      className="h-screen p-6 bg-gradient-to-b from-white dark:from-neutral-900 shadow-xl overflow-y-auto"
      style={{ height: "calc(100vh - 69px)" }}
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div
          className="p-6 rounded-full shadow-2xl relative animate-pulse"
          style={{
            backgroundImage: content.gradient,
            boxShadow: `0 0 25px 5px ${content.gradient
              .split(",")[1]
              .replace(")", "")}`,
          }}
        >
          <Icon className="h-12 w-12 text-white drop-shadow-lg" />
          {/* Permanent Glow */}
          <div className="absolute inset-0 rounded-full bg-white/20 blur-xl"></div>
        </div>

        <h2
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text mt-6"
          style={{
            backgroundImage: content.gradient,
          }}
        >
          {content.title}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground max-w-xs">
          {category === "healthcare" &&
            "Stay healthy 🩺 — track risks & medical notes effortlessly."}
          {category === "business" &&
            "Crush your deadlines 📈 — never miss key insights."}
          {category === "legal" &&
            "Decode contracts ⚖️ — spot red flags before they bite."}
          {category === "education" &&
            "Learn smarter 📚 — turn notes into quizzes instantly."}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {content.sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-xl text-center font-semibold uppercase text-muted-foreground tracking-wide">
              {section.title}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {section.items.map((item, index) => {
                const type = typeof item === "object" ? item.type : "default";
                const text = typeof item === "string" ? item : item.text;

                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center justify-center gap-2 py-2 px-3 rounded-3xl transition-all",
                      itemStyles[type] || itemStyles.default
                    )}
                  >
                    {typeof item === "object" && (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">{text}</span>
                  </div>
                );
              })}
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
