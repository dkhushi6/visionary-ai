"use client";
import React from "react";
import { redirect } from "next/navigation";
import { WavyBackground } from "../ui/wavy-background";

const HeroSection = () => {
  return (
    <section
      className="h-screen relative  flex items-center py-20 px-4 overflow-hidden"
      style={{ height: "calc(100vh - 69px)" }}
    >
      {/* Text content */}
      <div className="container mx-auto text-center ">
        <div className="relative z-10">
          {" "}
          <h1 className="text-5xl md:text-7xl font-bold mb-10 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Visionary AI PDF Copilot
          </h1>
          <p className="text-xl md:text-2xl  mb-4 max-w-3xl mx-auto">
            Upload any PDF. Get AI-powered insights tailored to your domain.
          </p>
        </div>
        <div className="absolute inset-0 -z-10">
          <WavyBackground />
        </div>
        <p className="text-lg  mb-8 max-w-2xl mx-auto">
          Healthcare, Business, Legal, or Education — choose your field and let
          AI extract what matters most.
        </p>
        <button
          className="relative inline-flex h-18 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-3 focus:ring-offset-slate-50"
          onClick={() => redirect("/chat/new")}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-slate-950 bg-white px-10 py-1 text-2xl dark:text-white text-slate-950 backdrop-blur-3xl">
            Try Now
          </span>
        </button>
      </div>

      {/* Background placed after text */}
    </section>
  );
};

export default HeroSection;
