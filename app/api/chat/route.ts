import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { OpenAIEmbeddings } from "@langchain/openai";
import pool from "@/lib/pool";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Login first" });
  }
  const body = await req.json();

  const userId = session.user.id;
  const { messages }: { messages: UIMessage[] } = body;
  const { chatId } = body;
  if (!chatId) {
    return NextResponse.json({ message: "Login first" });
  }

  let prompt = "";
  //old number of messages array as res is yet to be saved
  const lastMsg = messages[messages.length - 1];
  if (lastMsg?.parts[0].type === "text" && "text" in lastMsg.parts[0]) {
    prompt = lastMsg.parts[0].text;
  }
  const embeddings = await new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
  }).embedQuery(prompt);
  const joinEmbed = `[${embeddings.join(",")}]`;

  const results = await pool.query(
    `SELECT content 
   FROM "document" 
   WHERE "userId" = $1 AND "chatId" = $2
   ORDER BY embedding <-> $3 
   LIMIT 5`,
    [userId, chatId, joinEmbed]
  );

  //answe of the embedding that maches from db
  const context = results.rows.map((r) => r.content).join("\n\n");
  const modelMessages = convertToModelMessages(messages);

  const result = streamText({
    model: openai("gpt-4o"),
    messages: modelMessages,
    system: `You are an expert assistant. Use the following context to answer the user's question as clearly and concisely as possible.

If the context does not contain the answer, say so honestly. Do not make up information.

Keep the answer short, relevant, and helpful.

Context:
${context}`,
  });

  return result.toUIMessageStreamResponse();
}
