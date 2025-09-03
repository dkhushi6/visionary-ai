import { Category } from "@prisma/client";

import React from "react";
type HeaderSideBarProps = {
  category: Category | null;
  content: 
};
const SidebarHeader = ({ category }: HeaderSideBarProps) => {
  return (
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
  );
};

export default SidebarHeader;
