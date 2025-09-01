"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, FileText, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChatRoute from "../chat";
import { UIMessage } from "ai";
import axios from "axios";

interface FileUploadSectionProps {
  chatId: string;
  oldChats: UIMessage[];
}

const categories = [
  { value: "healthcare", label: "🩺 Healthcare" },
  { value: "business", label: "📊 Business" },
  { value: "legal", label: "⚖️ Legal" },
  { value: "education", label: "📚 Education" },
];

const FileUploadSection = ({ chatId, oldChats }: FileUploadSectionProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file?.type === "application/pdf") {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("chatId", chatId);

      const res = await axios.post("/api/upload", formData);
      console.log(res.data);
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedCategory) return;
    setIsUploading(true);

    // Simulate analysis/upload
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsUploading(false);
    setShowChat(true);
  };

  if (showChat) {
    // return <ChatRoute chatId={chatId} oldChats={oldChats} />;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Upload Your Document
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your file and select the appropriate category for specialized
            AI analysis
          </p>
        </div>

        {/* File Upload */}
        {/* <FileUpload onChange={(files) => setSelectedFile(files[0])} /> */}

        {/* Category Selection */}
        <div className="mb-8">
          <Label className="text-lg font-semibold mb-4 block">
            Choose Category
          </Label>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full h-14 text-lg rounded-xl">
              <SelectValue placeholder="Select the document category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  key={category.value}
                  value={category.value}
                  className="text-lg py-3"
                >
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Upload Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleUpload}
            disabled={!selectedFile || !selectedCategory || isUploading}
            className="text-lg px-8 py-6 rounded-2xl bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing Document...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-5 w-5" />
                Start Analysis
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadSection;
