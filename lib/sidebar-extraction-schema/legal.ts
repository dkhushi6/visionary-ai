import z from "zod";
export const LegalSchema = z.object({
  parties: z
    .array(z.string().describe("Names of individuals or companies involved"))
    .optional(),

  clauses: z
    .array(
      z.object({
        type: z
          .string()
          .describe("Type of clause (Termination, Confidentiality, etc.)"),
        text: z.string().describe("Full text of the clause"),
      })
    )
    .optional(),

  obligations: z.array(z.string().describe("Duties of parties")).optional(),
  rights: z
    .array(z.string().describe("Rights or entitlements of parties"))
    .optional(),

  durations: z
    .array(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        renewalTerms: z.string().optional(),
      })
    )
    .optional(),

  redFlags: z
    .array(z.string().describe("Risky keywords like Auto-renewal, Penalty"))
    .optional(),
  jurisdiction: z.string().optional(),
  governingLaw: z.string().optional(),

  signatories: z
    .array(
      z.object({
        name: z.string(),
        role: z.string().optional(),
        date: z.string().optional(),
      })
    )
    .optional(),

  paymentTerms: z
    .array(
      z.object({
        amount: z.string(),
        schedule: z.string().optional(),
        penalties: z.string().optional(),
      })
    )
    .optional(),
});
