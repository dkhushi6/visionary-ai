import { z } from "zod";

export const HealthcareSchema = z.object({
  medicines: z
    .array(
      z.object({
        name: z.string().describe("Brand or generic name of the medicine"),
        dosage: z
          .string()
          .optional()
          .describe("Strength and frequency (e.g., 500mg twice daily)"),
        route: z
          .string()
          .optional()
          .describe("Route of administration (oral, IV, etc.)"),
        duration: z
          .string()
          .optional()
          .describe("How long the medicine should be taken"),
      })
    )
    .optional(),

  generics: z
    .array(
      z.object({
        brand: z.string(),
        activeIngredients: z.array(z.string()),
      })
    )
    .optional(),

  labValues: z
    .array(
      z.object({
        type: z.string().describe("Name of the test (e.g., Blood Sugar)"),
        value: z.string().describe("Measured value"),
        unit: z.string().optional(),
        normalRange: z.string().optional(),
      })
    )
    .optional(),

  vitals: z
    .array(
      z.object({
        type: z.string().describe("Vital type (BP, HR, etc.)"),
        value: z.string(),
        unit: z.string().optional(),
      })
    )
    .optional(),

  conditions: z
    .array(z.string().describe("Diagnosed medical conditions"))
    .optional(),
  symptoms: z
    .array(z.string().describe("Patient-reported symptoms"))
    .optional(),
  allergies: z.array(z.string().describe("Drug or food allergies")).optional(),
  instructions: z
    .array(z.string().describe("Doctor's notes or instructions"))
    .optional(),
  followUp: z.string().optional().describe("Next appointment or review date"),
});
