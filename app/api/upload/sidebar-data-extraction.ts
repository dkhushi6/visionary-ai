import { BusinessSchema } from "@/lib/sidebar-extraction-schema/business";
import { EducationSchema } from "@/lib/sidebar-extraction-schema/education";
import { HealthcareSchema } from "@/lib/sidebar-extraction-schema/healthcare";
import { LegalSchema } from "@/lib/sidebar-extraction-schema/legal";
import { Category } from "@prisma/client";
import { StructuredOutputParser } from "langchain/output_parsers";

type sideBarDataExtractionProps = {
  category: Category;
  texts: String;
};
const extractionSchema = {
  healthcare: HealthcareSchema,
  legal: LegalSchema,
  business: BusinessSchema,
  education: EducationSchema,
};
export const sideBarDataExtraction = ({
  category,
  texts,
}: sideBarDataExtractionProps) => {
  const schemaPrompt = extractionSchema[category];

  const parser = StructuredOutputParser.fromZodSchema(schemaPrompt);
};
