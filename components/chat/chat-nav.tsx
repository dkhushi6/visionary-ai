"use client";
import React from "react";
import { Bot } from "lucide-react";
import { useSession } from "next-auth/react";
import { Category } from "@prisma/client";
type ChatNavbarProps = {
  userColor: string;
  category: Category | null;
};
const ChatNavbar = ({ userColor, category }: ChatNavbarProps) => {
  const wittyLines: Record<string, string> = {
    healthcare:
      "Looks like you brought me your medical mysteries 🩺 — let’s decode them before WebMD scares you.",
    business:
      "Another business doc? 📊 Don’t worry, I’ll crunch the jargon so you don’t have to.",
    legal:
      "Ah, legal stuff ⚖️ — let’s untangle the fine print before it untangles you.",
    education:
      "Studying again? 📚 I’ll break it down so it’s smarter (and faster) than your notes.",
    default:
      "Got docs? I’ll analyze them, answer your questions, and throw in some wisdom too. 😉",
  };
  const { data: session } = useSession();
  const wittyText = wittyLines[category || "default"];

  return (
    <header className="w-full sticky top-0 z-50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        {/* Icon with glow */}
        <div className="relative">
          <div
            className="p-3 text-white rounded-2xl shadow-md relative z-10"
            style={{ backgroundColor: userColor }}
          >
            <Bot size={26} />
          </div>
          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-2xl blur-xl opacity-50"
            style={{ backgroundColor: userColor }}
          />
          {/* Active pulse */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          </span>
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-zinc-800 dark:text-white tracking-tight">
            hi , {session?.user?.name}
          </h1>
          <p className="text-[15px] text-zinc-500 dark:text-zinc-400 leading-snug">
            {wittyText}
          </p>
        </div>
      </div>
    </header>
  );
};

export default ChatNavbar;
