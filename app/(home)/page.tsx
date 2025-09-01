"use client";
import ChatHistory from "@/components/chat-history";
import { CategoriesCard } from "@/components/dashboard/categories-card";
import GetStarted from "@/components/dashboard/get-started";
import HeroSection from "@/components/dashboard/hero-section";
import { HowtoCards } from "@/components/dashboard/how-to-cards";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

const page = () => {
  const { data: session } = useSession();
  if (!session?.user?.id) {
    return (
      <div className="flex-1 self-center justify-center items-center flex flex-col ">
        <p>login first </p>{" "}
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>
          Login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <HeroSection />
      <HowtoCards />
      <CategoriesCard />
      <GetStarted />
      <ChatHistory />
    </div>
  );
};

export default page;
