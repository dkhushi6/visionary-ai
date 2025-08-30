"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
type ChatProps = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
const ChatHistory = () => {
  const [chats, setChats] = useState<ChatProps[]>([]);
  const router = useRouter();
  useEffect(() => {
    const GetChatsByUser = async () => {
      const res = await axios.get("/api/fetch-chats");
      console.log(res.data);
      setChats(res.data.oldChats);
    };
    GetChatsByUser();
  }, []);
  if (!chats) {
    return (
      <div className="flex-1 self-center justify-center items-center flex">
        <p>No chats </p>{" "}
        <Link
          href="/chat/new"
          className={buttonVariants({ variant: "outline" })}
        >
          New chats
        </Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6  gap-4">
      {chats.map((chat) => (
        <Card
          onClick={() => {
            router.push(`/chat/${chat.id}`);
          }}
          key={chat.id}
          className="p-4 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-105"
        >
          <h2 className="text-lg font-semibold">
            {chat.name || "Untitled Chat"}
          </h2>
          <p className="text-sm text-gray-500">User: {chat.userId}</p>
          <div className="mt-2 text-sm text-gray-700">
            {chat.name || "No text"}
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Created: {new Date(chat.createdAt).toLocaleString()}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ChatHistory;
