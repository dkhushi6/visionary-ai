import z from "zod";

export const EducationSchema = z.object({
  glossary: z
    .array(
      z.object({
        term: z.string(),
        definition: z.string(),
      })
    )
    .optional(),

  concepts: z.array(z.string().describe("Core ideas or principles")).optional(),

  dataPoints: z
    .array(
      z.object({
        type: z.string().describe("Type of data (date, formula, statistic)"),
        value: z.string(),
      })
    )
    .optional(),

  learningObjectives: z.array(z.string()).optional(),

  quiz: z
    .array(
      z.object({
        question: z.string(),
        options: z.array(z.string()),
        answer: z.string(),
      })
    )
    .optional(),

  examples: z.array(z.string()).optional(),
  caseStudies: z.array(z.string()).optional(),
  references: z.array(z.string()).optional(),
  authors: z.array(z.string()).optional(),
});
