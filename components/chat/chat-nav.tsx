"use client";
import React from "react";
import { Bot } from "lucide-react";

const ChatNavbar = ({ userColor }: { userColor: string }) => {
  return (
    <header className="w-full sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-4">
        {/* Icon */}
        <div
          className="p-3 text-white rounded-2xl shadow"
          style={{ backgroundColor: userColor }}
        >
          {" "}
          <Bot size={28} />
        </div>

        {/* Text */}
        <div>
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">
            AI Assistant
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Chat with AI and get your questions solved instantly
          </p>
        </div>
      </div>
    </header>
  );
};

export default ChatNavbar;
