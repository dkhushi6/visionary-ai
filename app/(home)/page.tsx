import Chat from "@/components/chat";
import UploadPage from "@/components/upload";
import React from "react";

const page = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center mt-20">
      <UploadPage />
      <Chat />
    </div>
  );
};

export default page;
