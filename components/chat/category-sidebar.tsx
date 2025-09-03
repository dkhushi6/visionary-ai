"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { categoryConfig } from "./sidebar/category-config";
import { Category } from "@prisma/client";
import axios from "axios";
import { RenderHealthcare } from "./sidebar/render-category/healthcare";
import { RenderBusiness } from "./sidebar/render-category/business";
import { RenderLegal } from "./sidebar/render-category/legal";
import { RenderEducation } from "./sidebar/render-category/education";

const itemStyles: Record<string, string> = {
  warning:
    "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  error: "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  default: "bg-gray-50 text-gray-800 dark:bg-neutral-800 dark:text-neutral-300",
};

type CategorySidebarProps = {
  category: Category | null;
  chatId: string;
};

const CategorySidebar = ({ category, chatId }: CategorySidebarProps) => {
  const content = categoryConfig[category!] || categoryConfig.default;
  const Icon = content.icon;

  const [sidebarData, setSidebarData] = useState<any>(null);

  useEffect(() => {
    const fetchSideBarData = async () => {
      const res = await axios.post("/api/category-fetch", {
        category,
        chatId,
      });
      console.log(res.data.sidebarData.data);
      setSidebarData(res.data.sidebarData.data);
    };
    fetchSideBarData();
  }, [category, chatId]);

  if (sidebarData) {
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
        </div>

        {/* Render based on category */}
        {category === "healthcare" && (
          <RenderHealthcare sidebarData={sidebarData} />
        )}
        {category === "business" && (
          <RenderBusiness sidebarData={sidebarData} />
        )}
        {category === "education" && (
          <RenderEducation sidebarData={sidebarData} />
        )}
        {category === "legal" && <RenderLegal sidebarData={sidebarData} />}
      </div>
    );
  }
};

export default CategorySidebar;
