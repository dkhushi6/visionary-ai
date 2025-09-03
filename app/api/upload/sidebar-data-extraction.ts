import { businessPrompt } from "@/lib/prompt/business";
import { educationPrompt } from "@/lib/prompt/education";
import { healthcarePrompt } from "@/lib/prompt/heathcare";
import { legalPrompt } from "@/lib/prompt/legal";
import { BusinessSchema } from "@/lib/sidebar-extraction-schema/business";
import { EducationSchema } from "@/lib/sidebar-extraction-schema/education";
import { HealthcareSchema } from "@/lib/sidebar-extraction-schema/healthcare";
import { LegalSchema } from "@/lib/sidebar-extraction-schema/legal";
import { openai } from "@ai-sdk/openai";
import { Category } from "@prisma/client";
import { generateObject } from "ai";

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

export const sideBarDataExtraction = async ({
  category,
  text,
}: sideBarDataExtractionProps) => {
  const schemaCat = extractionSchema[category];
  const schemaPrompt = extractionPrompt[category];

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: schemaCat,
    prompt: `${schemaPrompt}\n\nInput text:\n${text}`,
  });
  //no need to invoke and pass the message again
  console.log(object);
  return object;
};
