"use client";

import ChatRoute from "@/components/chat";
import Spinner from "@/components/spinner";
import FileUploadSection from "@/components/uploadDashboard";
import { Category } from "@prisma/client";
import { UIMessage } from "ai";
import axios from "axios";
import { ObjectId } from "bson";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [oldChats, setOldChats] = useState<UIMessage[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [newChat, setNewChat] = useState(false);
  const [chatId, setChatId] = useState("");

  const params = useParams();
  const id = params?.id as string | undefined;

  useEffect(() => {
    if (!id || id === "new") {
      handleNewChat();
    } else {
      setChatId(id);
    }
  }, [id]);

  const handleNewChat = () => {
    const idg = new ObjectId().toHexString();
    console.log("id generated", idg);
    setChatId(idg);
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", `/chat/${idg}`);
    }
    setNewChat(true);
    setLoading(false);
  };

  useEffect(() => {
    if (id && id !== "new") {
      const handleReload = async () => {
        try {
          setLoading(true);
          const res = await axios.post("/api/fetch-chats", { chatId: id });
          console.log("current chat category:", res.data.category);
          setCategory(res.data.category.category);
          setOldChats(res.data.messages);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false); // ✅ fix: stop loading
        }
      };
      handleReload();
    }
  }, [id]);

  // still loading → show loader
  if (!chatId || loading) {
    return <Spinner />;
  }

  if (category) {
    return (
      <ChatRoute chatId={chatId} oldChats={oldChats} category={category} />
    );
  }

  if (newChat) {
    return <FileUploadSection chatId={chatId} />;
  }

  return <p>Something went wrong</p>;
};

export default Page;
