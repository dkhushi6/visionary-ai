"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

import ChatRoute from "./chat";
import axios from "axios";
import { MotionFileUpload } from "./upload/file-upload";
import AnalysisButton from "./upload/analysis";
import CategorySelection from "./upload/category-selection";
import { Category } from "@prisma/client";

interface FileUploadSectionProps {
  chatId: string;
}

const FileUploadSection = ({ chatId }: FileUploadSectionProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [isUploading, setIsUploading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleFileChange = (files: File[]) => {
    const file = files[0];
    if (file?.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Only PDF files are allowed");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedCategory) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("chatId", chatId);
    formData.append("category", selectedCategory.toString()); // ✅ FIX

    const res = await axios.post("/api/upload", formData);
    console.log(res.data.sidebarData);

    setIsUploading(false);
    setShowChat(true);
  };

  if (showChat) {
    return <ChatRoute chatId={chatId} category={selectedCategory!} />;
  }

  return (
    <div
      className="h-screen bg-background flex items-center"
      style={{ height: "calc(100vh - 69px)" }}
    >
      <div className="container mx-auto max-w-4xl">
        <Card className="p-8 shadow-xl rounded-2xl border border-muted">
          {/*Upload moving  */}
          <MotionFileUpload handleFileChange={handleFileChange} />
          {/* Category Selection */}
          <CategorySelection
            selectedCategory={selectedCategory!}
            setSelectedCategory={setSelectedCategory}
          />{" "}
          {/* Upload Button */}
          <AnalysisButton
            handleUpload={handleUpload}
            selectedCategory={selectedCategory!}
            isUploading={isUploading}
            selectedFile={selectedFile}
          />
        </Card>
      </div>
    </div>
  );
};

export default FileUploadSection;
