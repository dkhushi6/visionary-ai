"use client";

import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { CheckCircle } from "lucide-react";

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    // If a file is already uploaded, ignore further uploads
    if (files.length > 0) return;

    setFiles(newFiles);
    onChange && onChange(newFiles);
  };

  const handleClick = () => {
    // Prevent opening file dialog if already uploaded
    if (files.length > 0) return;
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: files.length > 0 ? 1 : 1.01 }}
        className="group/file relative flex flex-col items-center justify-center p-10 w-full border-2 border-dashed border-muted-foreground/40 rounded-xl cursor-pointer hover:border-primary hover:bg-muted/30 transition-all"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept=".pdf"
          disabled={files.length > 0} // disable after upload
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        {/* Upload state */}
        {!files.length ? (
          <div className="flex flex-col items-center text-center">
            {isDragActive ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-neutral-600 dark:text-neutral-300 flex flex-col items-center"
              >
                Drop your file
                <IconUpload className="h-6 w-6 mt-2" />
              </motion.p>
            ) : (
              <>
                <IconUpload className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">
                  Drop your PDF here or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports files up to 50MB
                </p>
              </>
            )}
          </div>
        ) : (
          /* File Preview */
          <motion.div
            layout
            className="flex items-center space-x-4 p-6 w-full max-w-2xl rounded-xl bg-white dark:bg-neutral-900 shadow-lg"
          >
            <CheckCircle className="h-10 w-10 text-green-500 flex-shrink-0" />
            <div className="flex-1 text-left">
              <p className="text-lg font-medium truncate">{files[0].name}</p>
              <p className="text-sm text-muted-foreground">
                {(files[0].size / 1024 / 1024).toFixed(2)} MB
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {files[0].type || "Unknown file type"}
              </p>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-neutral-500 dark:text-neutral-400"
            >
              Modified {new Date(files[0].lastModified).toLocaleDateString()}
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
