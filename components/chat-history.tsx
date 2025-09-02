"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { categoryConfig } from "./chat/sidebar/category-config";
import { FileText, MessageSquare } from "lucide-react";

type DocumentProps = {
  id: string;
  title?: string;
  type?: string;
  content?: string | null;
  createdAt: string;
};

type MessageProps = {
  id: string;
  role: string;
  parts: any;
};

type ChatProps = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  document: DocumentProps[];
  message: MessageProps[];
};

// 🖼️ Background images for categories
const categoryBackgrounds: Record<string, string> = {
  healthcare: "https://csrbox.org/news/1608642211healthcare%20common.jpg",
  business:
    "https://cloudinary.hbs.edu/hbsit/image/upload/s--O0PXWnT3--/f_auto,c_fill,h_375,w_750,/v20200101/BDD0688FF02068E5C427B0954F8A2297.jpg",
  legal:
    "https://www.bennett.edu.in/wp-content/uploads/2024/07/The-Indian-Legal-System-Needs-Revamp.-An-Analysis.jpg",
  education:
    "https://www.voicesofruralindia.org/wp-content/uploads/2020/11/ylswjsy7stw-2048x1201.jpg",
  default: "https://csrbox.org/news/1608642211healthcare%20common.jpg",
};

const ChatHistory = () => {
  const [chats, setChats] = useState<ChatProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    const GetChatsByUser = async () => {
      const res = await axios.get("/api/fetch-chats");
      setChats(res.data.oldChats);
    };
    GetChatsByUser();
  }, []);

  if (!chats || chats.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600 dark:text-gray-400 text-lg">No chats yet</p>
        <Link
          href="/chat/new"
          className={buttonVariants({ variant: "default" })}
        >
          Start a New Chat
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto px-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Your Chat History
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review past conversations, documents, and insights at a glance
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {chats.map((chat) => {
          const categoryInfo =
            categoryConfig[chat.category] || categoryConfig.default;
          const Icon = categoryInfo.icon;
          const latestMessage = chat.message?.[0]?.parts?.content || "";
          const bgImage =
            categoryBackgrounds[chat.category] || categoryBackgrounds.default;

          return (
            <Card
              onClick={() => router.push(`/chat/${chat.id}`)}
              key={chat.id}
              className="relative p-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-[1.01] cursor-pointer border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col overflow-hidden"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{ backgroundImage: `url(${bgImage})` }}
              ></div>
              <div className="absolute inset-0 bg-white/80 dark:bg-black/70"></div>

              {/* Foreground Content */}
              <div className="relative flex flex-col h-full">
                {/* Chat Title & Category */}
                <div className="flex justify-between items-center">
                  <h2 className="mt-4 text-lg font-semibold truncate">Chat</h2>
                  <div
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-white font-medium text-sm w-fit"
                    style={{ backgroundImage: categoryInfo.gradient }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="capitalize">{chat.category}</span>
                  </div>
                </div>

                {/* Latest Message Preview */}
                {latestMessage && (
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    {latestMessage}
                  </p>
                )}

                {/* Single Document */}
                {chat.document && chat.document.length > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="truncate max-w-[150px]">
                      {chat.document[0].title || "Document"}
                    </span>
                    {chat.document.length > 1 && (
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        +{chat.document.length - 1} more
                      </span>
                    )}
                  </div>
                )}

                {/* Metadata */}
                <div className="mt-auto pt-4 flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400">
                  <span>{new Date(chat.createdAt).toLocaleDateString()}</span>
                  <span>
                    {new Date(chat.updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ChatHistory;
