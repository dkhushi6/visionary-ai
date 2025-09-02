import React from "react";
import { Button } from "../ui/button";
import { FileText } from "lucide-react";
type AnalysisButtonProps = {
  handleUpload: () => void;
  selectedFile: File | null;
  selectedCategory: string;
  isUploading: boolean;
};
const AnalysisButton = ({
  handleUpload,
  selectedFile,
  selectedCategory,
  isUploading,
}: AnalysisButtonProps) => {
  return (
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
  );
};

export default AnalysisButton;
