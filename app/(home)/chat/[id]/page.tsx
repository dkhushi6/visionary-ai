"use client";

import FileUploadSection from "@/components/uploadDashboard";
import { UIMessage } from "ai";
import axios from "axios";
import { ObjectId } from "bson";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [oldChats, setOldChats] = useState<UIMessage[]>([]);

  const [chatId, setChatId] = useState("");
  const { data: session } = useSession();
  const params = useParams();
  const id = params?.id as string | undefined;
  useEffect(() => {
    if (!id || id === "new") {
      const idg = new ObjectId().toHexString();
      console.log("id generated", idg);
      setChatId(idg);
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", `/chat/${idg}`);
      }
    } else {
      setChatId(id);
    }
  }, [id]);
  const handleReload = async ({ id }: { id: string }) => {
    const res = await axios.post("/api/fetch-chats", { chatId: id });
    console.log("current chat messages:", res.data.messages);
    setOldChats(res.data.messages);
  };
  useEffect(() => {
    if (id && id !== "new") {
      handleReload({ id });
    }
  }, []);
  if (!chatId) {
    return <p>Loading...</p>;
  }
  if (chatId) {
    return (
      <div>
        <FileUploadSection chatId={chatId} oldChats={oldChats} />
        {/* <ChatRoute chatId={chatId} oldChats={oldChats} /> */}
      </div>
    );
  }
};

export default page;
