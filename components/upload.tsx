"use client";
import React from "react";
import { Input } from "./ui/input";
import axios from "axios";

const UploadPage = ({ chatId }: { chatId: string }) => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("chatId", chatId);

    const res = await axios.post("/api/upload", formData);
    console.log(res.data);
  };
  return (
    <div>
      <Input type="file" onChange={handleUpload} />
    </div>
  );
};

export default UploadPage;
