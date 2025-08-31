"use client";

import React from "react";
import { BarChart3, FileText, MessageSquare, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "../ui/glowing-effect";

const CategoriesCard = () => {
  const categories = [
    {
      title: "Healthcare",
      description: "Medical records, risk analysis, compliance",
      icon: <FileText />,
      hoverBg: "hover:bg-[#0EA5E9]/10",
      iconColor: "text-[#0EA5E9]",
      shadow: "shadow-[0_4px_15px_0_rgba(14,165,233,0.3)]",
      hoverShadow: "hover:shadow-[0_8px_25px_0_rgba(14,165,233,0.5)]",
    },
    {
      title: "Business",
      description: "Contracts, deadlines, project management",
      icon: <BarChart3 />,
      hoverBg: "hover:bg-[#F59E0B]/10",
      iconColor: "text-[#F59E0B]",
      shadow: "shadow-[0_4px_15px_0_rgba(245,158,11,0.3)]",
      hoverShadow: "hover:shadow-[0_8px_25px_0_rgba(245,158,11,0.5)]",
    },
    {
      title: "Finance",
      description: "Reports, budgets, expense tracking",
      icon: <MessageSquare />,
      hoverBg: "hover:bg-[#DC2626]/10",
      iconColor: "text-[#DC2626]",
      shadow: "shadow-[0_4px_15px_0_rgba(220,38,38,0.3)]",
      hoverShadow: "hover:shadow-[0_8px_25px_0_rgba(220,38,38,0.5)]",
    },
    {
      title: "Education",
      description: "Curricula, assessments, learning paths",
      icon: <Users />,
      hoverBg: "hover:bg-[#16A34A]/10",
      iconColor: "text-[#16A34A]",
      shadow: "shadow-[0_4px_15px_0_rgba(22,163,74,0.3)]",
      hoverShadow: "hover:shadow-[0_8px_25px_0_rgba(22,163,74,0.5)]",
    },
  ];

  const cardBase =
    "p-6 rounded-2xl text-center transition-transform transform hover:scale-105 relative cursor-pointer";

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Built for Every Industry
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Specialized AI solutions tailored to your field's unique needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-8xl mx-auto">
          {categories.map((cat, i) => (
            <div
              key={i}
              className={cn(cardBase, cat.hoverBg, cat.shadow, cat.hoverShadow)}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Glowing effect behind the card */}
              <GlowingEffect
                glow={true}
                disabled={false}
                className="absolute inset-0 rounded-2xl pointer-events-none"
                spread={25}
                blur={15}
              />

              {/* Icon */}
              <div
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 transition-colors duration-300",
                  cat.iconColor
                )}
              >
                {React.cloneElement(cat.icon, { className: "h-6 w-6" })}
              </div>

              {/* Text */}
              <h3 className="text-lg font-semibold mb-2">{cat.title}</h3>
              <p className="text-sm text-muted-foreground">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { CategoriesCard };
