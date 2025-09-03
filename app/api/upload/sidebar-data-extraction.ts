import { businessPrompt } from "@/lib/prompt/business";
import { educationPrompt } from "@/lib/prompt/education";
import { healthcarePrompt } from "@/lib/prompt/heathcare";
import { legalPrompt } from "@/lib/prompt/legal";
import { BusinessSchema } from "@/lib/sidebar-extraction-schema/business";
import { EducationSchema } from "@/lib/sidebar-extraction-schema/education";
import { HealthcareSchema } from "@/lib/sidebar-extraction-schema/healthcare";
import { LegalSchema } from "@/lib/sidebar-extraction-schema/legal";
import { openai } from "@ai-sdk/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { Category } from "@prisma/client";
import { generateObject } from "ai";
import { StructuredOutputParser } from "langchain/output_parsers";

type sideBarDataExtractionProps = {
  category: Category;
  text: string;
};
const extractionSchema = {
  healthcare: HealthcareSchema,
  legal: LegalSchema,
  business: BusinessSchema,
  education: EducationSchema,
};
const extractionPrompt = {
  healthcare: healthcarePrompt,
  legal: legalPrompt,
  business: businessPrompt,
  education: educationPrompt,
};
export const sideBarDataExtraction = ({
  category,
  text,
}: sideBarDataExtractionProps) => {
  const schemaCat = extractionSchema[category];
  //generate infrastructure for model
  const parser = StructuredOutputParser.fromZodSchema(schemaCat);
  console.log("parser", parser);
  const schemaPrompt = extractionPrompt[category];
  //for model to know the formate to return
  const prompt = new PromptTemplate({
    template: schemaPrompt,
    inputVariables: ["text"],
    partialVariables: { format_instructions: parser.getFormatInstructions() },
  });
  const result = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log("result", result);
};
