import z from "zod";
export const BusinessSchema = z.object({
  deadlines: z
    .array(
      z.object({
        event: z.string(),
        date: z.string(),
      })
    )
    .optional(),

  financials: z
    .array(
      z.object({
        metric: z.string().describe("e.g., Revenue, Profit, Expenses"),
        value: z.string(),
      })
    )
    .optional(),

  kpis: z
    .array(
      z.object({
        name: z.string().describe("KPI name"),
        value: z.string().describe("KPI value"),
      })
    )
    .optional(),

  budgets: z
    .array(
      z.object({
        category: z.string(),
        amount: z.string(),
      })
    )
    .optional(),

  invoices: z
    .array(
      z.object({
        invoiceNumber: z.string(),
        amount: z.string(),
        dueDate: z.string().optional(),
        status: z.string().optional(),
      })
    )
    .optional(),

  companies: z.array(z.string().describe("Company or client names")).optional(),
  contacts: z
    .array(z.string().describe("Stakeholders or responsible persons"))
    .optional(),
  opportunities: z.array(z.string()).optional(),
  risks: z.array(z.string()).optional(),
  actionItems: z.array(z.string()).optional(),
});
