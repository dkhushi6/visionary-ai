import { NextRequest, NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import pool from "@/lib/pool";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";
import { sideBarDataExtraction } from "./sidebar-data-extraction";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Login first to get started" });
  }
  const userId = session.user.id;
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const chatId = formData.get("chatId") as string | null;
  const category = formData.get("category") as Category;

  if (!file) {
    return NextResponse.json({
      message: "file not extracted from from data error",
    });
  }
  if (!chatId) {
    return NextResponse.json({
      message: "chatId not extracted from from formData error",
    });
  }
  if (!category) {
    return NextResponse.json({
      message: "category not extracted from from formData error",
    });
  }
  console.log("ChatId form upload", chatId);
  // check if chat exists
  let oldChat = await prisma.chat.findFirst({
    where: {
      id: chatId,
      userId,
    },
  });
  if (!oldChat) {
    oldChat = await prisma.chat.create({
      data: {
        id: chatId,
        name: "random chat",
        userId,
        category,
      },
    });
  }

  // create loader
  const loader = new PDFLoader(file, {
    splitPages: false,
  });

  const docs = await loader.load();
  const texts = docs[0].pageContent;
  // splitter
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 60,
  });

  const chunk = await splitter.createDocuments([texts]);
  const text = chunk.map((doc) => doc.pageContent);
  //embedding
  const embeddings = await new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
  }).embedDocuments(text);
  //push in the db
  await Promise.all(
    chunk.map(async (doc, i) => {
      const embedding = embeddings[i];
      const query = ` INSERT INTO "document" ("userId","content" , "metadata","embedding","chatId" , "createdAt") VALUES($1,$2,$3::jsonb,$4::vector,$5,now())`;
      await pool.query(query, [
        userId,
        doc.pageContent,
        JSON.stringify(doc.metadata),
        JSON.stringify(embedding),
        chatId,
      ]);
    })
  );
  const sidebarData = await sideBarDataExtraction({
    category,
    text: text.join(" "),
  });
  await prisma.extractedData.create({
    data: { userId, chatId, category, data: sidebarData },
  });
  console.log("sideBar data saved in db");
  return NextResponse.json({
    message: "Process complete successfully",
  });
}
