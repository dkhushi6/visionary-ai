"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { categoryConfig } from "./chat/sidebar/category-config";
import { FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { message } from "@prisma/client";

type DocumentProps = {
  id: string;
  title?: string;
  type?: string;
  content?: string | null;
  createdAt: string;
};

type ChatProps = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  document: DocumentProps[];
  message: message;
};

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
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Your Chat History
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Review past conversations, documents, and insights at a glance
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {chats.map((chat) => {
          const categoryInfo =
            categoryConfig[chat.category] || categoryConfig.default;
          const Icon = categoryInfo.icon;
          const bgImage =
            categoryBackgrounds[chat.category] || categoryBackgrounds.default;

          return (
            <Card
              onClick={() => router.push(`/chat/${chat.id}`)}
              key={chat.id}
              className="relative w-[400px] mx-auto rounded-2xl shadow-md overflow-hidden cursor-pointer group border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col justify-between"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${bgImage})` }}
              ></div>
              <div className="absolute inset-0 bg-white/80 dark:bg-black/70"></div>

              {/* Foreground Content */}
              <div className="relative p-6 flex flex-col h-full justify-between">
                {/* Chat Title */}
                <h2 className="text-lg font-semibold truncate flex gap-2 items-center">
                  <FileText className="h-5 w-5 shrink-0" />
                  <span className="truncate max-w-[200px]">
                    {chat.document[0]?.title || "Untitled Document"}
                  </span>
                </h2>

                {/* Bottom row: category + updated */}
                <div className="mt-6 flex items-center justify-between gap-8">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Updated{" "}
                    {formatDistanceToNow(new Date(chat.updatedAt), {
                      addSuffix: true,
                    })}
                  </span>
                  <div
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-white font-medium text-xs w-fit shadow"
                    style={{ backgroundImage: categoryInfo.gradient }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="capitalize">{chat.category}</span>
                  </div>
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
