import React from "react";
import { FileText, MessageCircle, Upload } from "lucide-react";

const steps = [
  {
    title: "Upload Document",
    desc: "Drag and drop your PDF or browse to select",
    icon: <Upload className="h-8 w-8" />,
    bg: "bg-[#E9F2F8] dark:bg-[#6472ef34]",
    border: "border-[#414FC5]/40",
    shadow: "shadow-[0_4px_15px_0_rgba(65,79,197,0.3)]",
    hoverShadow: "hover:shadow-[0_8px_25px_0_rgba(65,79,197,0.5)]",
    iconColor: "text-[#414FC5]",
  },
  {
    title: "Choose Category",
    desc: "Select your domain for specialized analysis",
    icon: <FileText className="h-8 w-8" />,
    bg: "bg-[#EAF4F3] dark:bg-[#38ace25c]",
    border: "border-[#1B91C7]/40",
    shadow: "shadow-[0_4px_15px_0_rgba(27,145,199,0.3)]",
    hoverShadow: "hover:shadow-[0_8px_25px_0_rgba(27,145,199,0.5)]",
    iconColor: "text-[#1B91C7]",
  },
  {
    title: "Get Insights",
    desc: "Chat with AI and extract key information",
    icon: <MessageCircle className="h-8 w-8" />,
    bg: "bg-[#FEEBC8] dark:bg-[#feebc822]",
    border: "border-[#D97706]/40",
    shadow: "shadow-[0_4px_15px_0_rgba(217,119,6,0.3)]",
    hoverShadow: "hover:shadow-[0_8px_25px_0_rgba(217,119,6,0.5)]",
    iconColor: "text-[#D97706]",
  },
];

const HowtoCards = () => {
  const baseCard = "p-8 text-center rounded-2xl transition-shadow";

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to unlock intelligent insights from your
            documents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`${baseCard} border ${step.border} ${step.shadow} ${step.hoverShadow} ${step.bg}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${step.bg} ${step.iconColor}`}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { HowtoCards };
