"use client";
import { EducationSchema } from "@/lib/sidebar-extraction-schema/education";
import z from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type EducationData = z.infer<typeof EducationSchema>;

export const RenderEducation = ({
  sidebarData,
}: {
  sidebarData: EducationData;
}) => {
  const hasItems = <T,>(arr?: T[]): arr is T[] =>
    Array.isArray(arr) && arr.length > 0;

  return (
    <div className="space-y-6">
      {/* Glossary */}
      {hasItems(sidebarData?.glossary) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">📖 Glossary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {sidebarData.glossary!.map((g, i) => (
                <li key={i} className="p-2 rounded bg-muted">
                  <span className="font-medium">{g.term}</span>:{" "}
                  <span className="text-muted-foreground">{g.definition}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Concepts */}
      {hasItems(sidebarData?.concepts) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">💡 Concepts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sidebarData.concepts!.map((c, i) => (
              <Badge key={i} variant="secondary">
                {c}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Data Points */}
      {hasItems(sidebarData?.dataPoints) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              📊 Data Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {sidebarData.dataPoints!.map((d, i) => (
                <li key={i} className="p-2 border rounded bg-background">
                  <span className="font-medium">{d.type}:</span>{" "}
                  <span className="text-muted-foreground">{d.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Learning Objectives */}
      {hasItems(sidebarData?.learningObjectives) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              🎯 Learning Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {sidebarData.learningObjectives!.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Quiz */}
      {/* {hasItems(sidebarData?.quiz) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">📝 Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            {sidebarData.quiz!.map((q, i) => (
              <div key={i} className="mb-4 p-3 border rounded-lg bg-muted/40">
                <p className="font-medium">{q.question}</p>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  {q.options.map((opt, j) => (
                    <li key={j}>{opt}</li>
                  ))}
                </ul>
                <p className="text-green-600 font-medium mt-2">
                  ✅ Answer: {q.answer}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )} */}

      {/* Examples */}
      {hasItems(sidebarData?.examples) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">📌 Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {sidebarData.examples!.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Case Studies */}
      {hasItems(sidebarData?.caseStudies) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              📚 Case Studies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {sidebarData.caseStudies!.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* References */}
      {hasItems(sidebarData?.references) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              🔗 References
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {sidebarData.references!.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Authors */}
      {hasItems(sidebarData?.authors) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">✍️ Authors</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sidebarData.authors!.map((a, i) => (
              <Badge key={i} variant="outline">
                {a}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
