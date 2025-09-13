"use client";
import { LegalSchema } from "@/lib/sidebar-extraction-schema/legal";
import z from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type LegalData = z.infer<typeof LegalSchema>;

export const RenderLegal = ({ sidebarData }: { sidebarData: LegalData }) => {
  const hasItems = <T,>(arr?: T[]): arr is T[] =>
    Array.isArray(arr) && arr.length > 0;

  return (
    <div className="space-y-6">
      {/* Parties */}
      {hasItems(sidebarData?.parties) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">👥 Parties</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sidebarData.parties!.map((p, i) => (
              <Badge key={i} variant="secondary">
                {p}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Clauses */}
      {hasItems(sidebarData?.clauses) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">📄 Clauses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {sidebarData.clauses!.map((c, i) => (
                <li key={i} className="p-2 border rounded-lg bg-muted">
                  <span className="font-medium">{c.type}:</span>{" "}
                  <span className="text-muted-foreground">{c.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Obligations */}
      {hasItems(sidebarData?.obligations) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              📌 Obligations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {sidebarData.obligations!.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Rights */}
      {hasItems(sidebarData?.rights) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">⚖️ Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {sidebarData.rights!.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Durations */}
      {hasItems(sidebarData?.durations) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">⏳ Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {sidebarData.durations!.map((d, i) => (
                <li key={i} className="p-2 bg-muted rounded-lg">
                  {d.startDate && <div>Start: {d.startDate}</div>}
                  {d.endDate && <div>End: {d.endDate}</div>}
                  {d.renewalTerms && (
                    <div className="text-muted-foreground">
                      Renewal: {d.renewalTerms}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Red Flags */}
      {hasItems(sidebarData?.redFlags) && (
        <Card className="border-red-500">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-red-600">
              ⚠️ Red Flags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm text-red-700">
              {sidebarData.redFlags!.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Jurisdiction & Governing Law */}
      {(sidebarData?.jurisdiction || sidebarData?.governingLaw) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              📍 Jurisdiction
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            {sidebarData.jurisdiction && (
              <div>
                <span className="font-medium">Jurisdiction:</span>{" "}
                {sidebarData.jurisdiction}
              </div>
            )}
            {sidebarData.governingLaw && (
              <div>
                <span className="font-medium">Governing Law:</span>{" "}
                {sidebarData.governingLaw}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Signatories */}
      {hasItems(sidebarData?.signatories) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              ✍️ Signatories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {sidebarData.signatories!.map((s, i) => (
                <li
                  key={i}
                  className="p-2 rounded-lg border bg-background flex flex-col"
                >
                  <span className="font-medium">{s.name}</span>
                  {s.role && <span>Role: {s.role}</span>}
                  {s.date && (
                    <span className="text-muted-foreground">
                      Date: {s.date}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Payment Terms */}
      {hasItems(sidebarData?.paymentTerms) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              💵 Payment Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {sidebarData.paymentTerms!.map((p, i) => (
                <li key={i} className="p-2 border rounded-lg bg-muted">
                  <span className="font-medium">Amount:</span> {p.amount}
                  {p.schedule && <div>Schedule: {p.schedule}</div>}
                  {p.penalties && (
                    <div className="text-red-600">Penalties: {p.penalties}</div>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
