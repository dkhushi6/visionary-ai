"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChatInterface } from "./chat/chat-interface";
import CategorySidebar from "./chat/category-sidebar";
type ChatRouteProps = {
  oldChats: UIMessage[];
  chatId: string;
  category: string;
};
export default function ChatRoute({
  chatId,
  oldChats,
  category,
}: ChatRouteProps) {
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
    <div className="flex ">
      <div className="w-1/3 ">
        <CategorySidebar category={category} />
      </div>
      <div className="w-2/3">
        <ChatInterface
          sendMessage={sendMessage}
          messages={messages}
          category={category}
        />
      </div>
    </div>
  );
}
