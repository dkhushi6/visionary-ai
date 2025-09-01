"use client";
import { UIMessage } from "ai";
import React, { useState } from "react";
import ChatNavbar from "./chat-nav";
type ChatInterfaceProps = {
  messages: UIMessage[];
  sendMessage: (message: { text: string }) => void;
  category: string;
};
const categoryColors: Record<string, string> = {
  healthcare: "#DC2626", // Red
  business: "#2563EB", // Blue
  legal: "#F59E0B", // Amber
  education: "#16A34A", // Green
};

const ChatInterface = ({
  messages,
  sendMessage,
  category,
}: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const userColor = categoryColors[category] || "#0EA5E9";

  return (
    <div>
      <ChatNavbar userColor={userColor} />
      <div className="flex flex-col w-full max-w-5xl py-8 mx-auto stretch">
        <div className="flex flex-col space-y-5">
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
            className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-5xl rounded-3xl py-3 px-4 mb-10 border border-muted  shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </form>
      </div>
    </div>
  );
};

export { ChatInterface };
