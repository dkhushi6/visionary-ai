"use client";
import ChatHistory from "@/components/chat-history";
import { CategoriesCard } from "@/components/dashboard/categories-card";
import GetStarted from "@/components/dashboard/get-started";
import HeroSection from "@/components/dashboard/hero-section";
import { HowtoCards } from "@/components/dashboard/how-to-cards";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  if (!session?.user?.id) {
    return (
      <div>
        {" "}
        <HeroSection />
        <HowtoCards />
        <CategoriesCard />
        <GetStarted />
      </div>
    );
  }

  return (
    <div>
      <HeroSection />
      <ChatHistory />
      <HowtoCards />
      <CategoriesCard />
      <GetStarted />
    </div>
  );
};

export default Page;
