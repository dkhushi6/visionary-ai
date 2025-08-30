import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
//fetch messages of particular chat

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "login first" });
  }
  const userId = session.user.id;
  const body = await req.json();
  const { chatId } = body;
  if (!chatId) {
    return NextResponse.json({ message: "chatId not found" });
  }

  const messages = await prisma.message.findMany({
    where: { chatId, userId },
  });

  if (!messages) {
    return NextResponse.json({ message: "chat not found" });
  }
  return NextResponse.json({ message: "chat found successfully!", messages });
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "login first" });
  }
  const userId = session.user.id;

  const oldChats = await prisma.chat.findMany({ where: { userId } });
  if (!oldChats) {
    return NextResponse.json({ message: "chat not found" });
  }
  return NextResponse.json({ message: "chat found successfully!", oldChats });
}
