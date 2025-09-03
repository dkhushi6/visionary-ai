"use client";
import { HealthcareSchema } from "@/lib/sidebar-extraction-schema/healthcare";
import { useEffect } from "react";
import z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type HealthcareData = z.infer<typeof HealthcareSchema>;

export const RenderHealthcare = ({
  sidebarData,
}: {
  sidebarData: HealthcareData;
}) => {
  useEffect(() => {
    console.log("sidedata from health", sidebarData);
  }, [sidebarData]);

  // ✅ helper: check if array exists and is not empty
  const hasItems = (arr?: any[]) => arr && arr.length > 0;

  return (
    <div className="space-y-6">
      {/* Medicines */}
      {hasItems(sidebarData?.medicines) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              💊 Medicines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {sidebarData.medicines!.map((m, i) => (
                <li
                  key={i}
                  className="p-2 rounded-lg bg-muted flex flex-col text-sm"
                >
                  <span className="font-medium">{m.name}</span>
                  <span className="text-muted-foreground">
                    {m.dosage && `${m.dosage} `}
                    {m.route && `(${m.route}) `}
                    {m.duration && `for ${m.duration}`}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Generics */}
      {hasItems(sidebarData?.generics) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">🧾 Generics</CardTitle>
          </CardHeader>
          <CardContent>
            {sidebarData.generics!.map((g, i) => (
              <div
                key={i}
                className="flex flex-wrap gap-2 items-center text-sm mb-2"
              >
                <Badge variant="outline">{g.brand}</Badge>
                <span className="text-muted-foreground">
                  {g.activeIngredients.join(", ")}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Lab Values */}
      {hasItems(sidebarData?.labValues) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              🧪 Lab Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {sidebarData.labValues!.map((l, i) => (
                <li
                  key={i}
                  className="p-2 rounded-lg border text-sm flex justify-between"
                >
                  <span>
                    <span className="font-medium">{l.type}</span>: {l.value}{" "}
                    {l.unit || ""}
                  </span>
                  {l.normalRange && (
                    <span className="text-xs text-muted-foreground">
                      Normal: {l.normalRange}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Vitals */}
      {hasItems(sidebarData?.vitals) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">❤️ Vitals</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sidebarData.vitals!.map((v, i) => (
              <Badge key={i} className="px-3 py-1">
                {v.type}: {v.value} {v.unit || ""}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Conditions */}
      {hasItems(sidebarData?.conditions) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              🩺 Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {sidebarData.conditions!.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Symptoms */}
      {hasItems(sidebarData?.symptoms) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">🤒 Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {sidebarData.symptoms!.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Allergies */}
      {hasItems(sidebarData?.allergies) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              ⚠️ Allergies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {sidebarData.allergies!.map((a, i) => (
                <Badge key={i} variant="destructive">
                  {a}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      {hasItems(sidebarData?.instructions) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              📋 Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {sidebarData.instructions!.map((ins, i) => (
                <li key={i}>{ins}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Follow Up */}
      {sidebarData?.followUp && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              📅 Follow-up
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{sidebarData.followUp}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
