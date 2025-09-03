"use client";
import { UIMessage } from "ai";
import React, { useState } from "react";
import ChatNavbar from "./chat-nav";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Category } from "@prisma/client";
type ChatInterfaceProps = {
  messages: UIMessage[];
  sendMessage: (message: { text: string }) => void;
  category: Category | null;
};
const categoryColors: Record<string, string> = {
  healthcare: "#FCA5A5", // Light Red (Tailwind red-300)
  business: "#93C5FD", // Light Blue (Tailwind blue-300)
  legal: "#C4A484", // light brownish / tan
  education: "#86EFAC",
};

const ChatInterface = ({
  messages,
  sendMessage,
  category,
}: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const userColor = categoryColors[category!] || "#0EA5E9";

  return (
    <div>
      <ChatNavbar userColor={userColor} category={category} />
      <div className="flex flex-col w-full max-w-5xl py-8 mx-auto stretch ">
        <div className="flex-1 overflow-y-auto px-4 py-6 max-w-5xl mx-auto w-full space-y-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] whitespace-pre-wrap shadow ${
                  message.role === "user"
                    ? `text-white rounded-br-none`
                    : "bg-gray-200 dark:bg-zinc-800 text-black dark:text-white rounded-bl-none"
                }`}
                style={{
                  backgroundColor:
                    message.role === "user" ? userColor + "cc" : undefined,
                }}
              >
                {message.parts.map((part, i) =>
                  part.type === "text" ? (
                    <div key={`${message.id}-${i}`}>{part.text}</div>
                  ) : null
                )}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({ text: input });
            setInput("");
          }}
        >
          <input
            className={` bottom-0 w-full fixed max-w-5xl rounded-3xl py-3 px-4 my-10 border border-muted shadow-xl outline-none transition-all duration-300 dark:bg-zinc-900`}
            value={input}
            placeholder="Say something..."
            onChange={(e) => setInput(e.currentTarget.value)}
            style={{
              boxShadow: input
                ? `0 0 40px 12px ${userColor}dd` // 🚀 Strong glow when typing
                : `0 0 20px 6px ${userColor}88`, // ✨ Softer glow when idle
            }}
          />
        </form>
      </div>
    </div>
  );
};

export { ChatInterface };
