import React from "react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";

const GetStarted = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Documents?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust AI PDF Insight Copilot for
            intelligent document analysis
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-2xl bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:scale-105"
            onClick={() => redirect("/chat/new")}
          >
            Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
