"use client";
import { BusinessSchema } from "@/lib/sidebar-extraction-schema/business";
import z from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type BusinessData = z.infer<typeof BusinessSchema>;

export const RenderBusiness = ({
  sidebarData,
}: {
  sidebarData: BusinessData;
}) => {
  const hasItems = (arr?: any[]) => arr && arr.length > 0;

  return (
    <div className="space-y-6">
      {/* Deadlines */}
      {hasItems(sidebarData?.deadlines) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              📅 Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {sidebarData.deadlines!.map((d, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center p-2 rounded-lg bg-muted"
                >
                  <span>{d.event}</span>
                  <Badge variant="outline">{d.date}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Financials */}
      {hasItems(sidebarData?.financials) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              💰 Financials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {sidebarData.financials!.map((f, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center p-2 border rounded-lg"
                >
                  <span className="font-medium">{f.metric}</span>
                  <span className="text-muted-foreground">{f.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* KPIs */}
      {hasItems(sidebarData?.kpis) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">📊 KPIs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sidebarData.kpis!.map((k, i) => (
              <Badge key={i} className="px-3 py-1">
                {k.name}: {k.value}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Budgets */}
      {hasItems(sidebarData?.budgets) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">📑 Budgets</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              {sidebarData.budgets!.map((b, i) => (
                <li key={i}>
                  <span className="font-medium">{b.category}</span>:{" "}
                  <span className="text-muted-foreground">{b.amount}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Invoices */}
      {hasItems(sidebarData?.invoices) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">🧾 Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {sidebarData.invoices!.map((inv, i) => (
                <li
                  key={i}
                  className="p-2 rounded-lg border bg-background flex flex-col"
                >
                  <span className="font-medium">#{inv.invoiceNumber}</span>
                  <span>Amount: {inv.amount}</span>
                  {inv.dueDate && (
                    <span className="text-muted-foreground">
                      Due: {inv.dueDate}
                    </span>
                  )}
                  {inv.status && (
                    <Badge
                      className="w-fit mt-1"
                      variant={
                        inv.status === "Paid" ? "outline" : "destructive"
                      }
                    >
                      {inv.status}
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Companies */}
      {hasItems(sidebarData?.companies) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              🏢 Companies
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sidebarData.companies!.map((c, i) => (
              <Badge key={i} variant="secondary">
                {c}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Contacts */}
      {hasItems(sidebarData?.contacts) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">👥 Contacts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sidebarData.contacts!.map((c, i) => (
              <Badge key={i}>{c}</Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Opportunities */}
      {hasItems(sidebarData?.opportunities) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              🚀 Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {sidebarData.opportunities!.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Risks */}
      {hasItems(sidebarData?.risks) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">⚠️ Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm space-y-1 text-red-600">
              {sidebarData.risks!.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Action Items */}
      {hasItems(sidebarData?.actionItems) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              ✅ Action Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {sidebarData.actionItems!.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
