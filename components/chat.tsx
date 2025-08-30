"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import axios from "axios";
import { useEffect, useState } from "react";
type ChatRouteProps = {
  oldChats: UIMessage[];
  chatId: string;
};
export default function ChatRoute({ chatId, oldChats }: ChatRouteProps) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { chatId },
    }),
    onFinish: async (message) => {
      if (!chatId) {
        console.log("chatId from usechat", chatId);

        return;
      } else {
        console.log("chatId from usechat", chatId);
        console.log("message from usechat", message.messages);
        const res = await axios.post("/api/save-chat", {
          messages: message.messages,
          chatId,
        });
        console.log(res.data);
      }
    },
  });
  useEffect(() => {
    if (!oldChats) {
      console.log("THIS IS A NEW CHAT");
      return;
    }
    if (oldChats.length > 0) {
      setMessages(oldChats);
      console.log("messages from setmessages", messages);
    }
  }, [oldChats, setMessages]);
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
