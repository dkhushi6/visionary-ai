import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "login first" });
  }
  const userId = session.user.id;
  const body = await req.json();
  const { chatId, category } = body;
  if (!chatId || !category) {
    return NextResponse.json({ message: "chatId or category not found" });
  }
  const sidebarData = await prisma.extractedData.findFirst({
    where: { chatId, userId, category },
  });
  if (!sidebarData) {
    return NextResponse.json({ message: " sidebarData not found" });
  }
  return NextResponse.json({
    sidebarData,
    message: "sidebarData fetched successfully",
  });
}
