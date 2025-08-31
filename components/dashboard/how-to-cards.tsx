import React from "react";
import { FileText, MessageCircle, Upload } from "lucide-react";

const HowtoCards = () => {
  const baseCardClasses =
    "p-8 text-center rounded-2xl transition-transform transform hover:scale-105";

  return (
    <section className="py-16 px-4 ">
      <div className="container mx-auto max-w-8xl">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to unlock intelligent insights from your
            documents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Step 1 */}
          <div
            className={`${baseCardClasses} border border-[#414FC5]/40 shadow-[0_4px_15px_0_rgba(65,79,197,0.3)] hover:shadow-[0_8px_25px_0_rgba(65,79,197,0.5)]`}
            style={{ animationDelay: "0s" }}
          >
            <div className="w-16 h-16 dark:bg-[#6472ef34] bg-[#E9F2F8] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-[#414FC5]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Document</h3>
            <p className="text-muted-foreground">
              Drag and drop your PDF or browse to select
            </p>
          </div>

          {/* Step 2 */}
          <div
            className={`${baseCardClasses} border border-[#1B91C7]/40 shadow-[0_4px_15px_0_rgba(27,145,199,0.3)] hover:shadow-[0_8px_25px_0_rgba(27,145,199,0.5)]`}
            style={{ animationDelay: "0.1s" }}
          >
            <div className="w-16 h-16 dark:bg-[#38ace25c] bg-[#EAF4F3] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-[#1B91C7]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Category</h3>
            <p className="text-muted-foreground">
              Select your domain for specialized analysis
            </p>
          </div>

          {/* Step 3 */}
          <div
            className={`${baseCardClasses} border border-[#D97706]/40 shadow-[0_4px_15px_0_rgba(217,119,6,0.3)] hover:shadow-[0_8px_25px_0_rgba(217,119,6,0.5)]`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-16 h-16 bg-[#FEEBC8] dark:bg-[#feebc822] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-[#D97706]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
            <p className="text-muted-foreground">
              Chat with AI and extract key information
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HowtoCards };
