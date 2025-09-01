import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Calendar,
  FileCheck,
  BookOpen,
  BarChart3,
  Scale,
  GraduationCap,
  Heart,
} from "lucide-react";

interface CategorySidebarProps {
  category: string;
}

const CategorySidebar = ({ category }: CategorySidebarProps) => {
  const getCategoryContent = () => {
    switch (category) {
      case "healthcare":
        return {
          title: "Medical Insights",
          icon: <Heart className="h-5 w-5" />,
          color: "healthcare",
          sections: [
            {
              title: "Medical Terms",
              items: [
                "Hypertension",
                "Diabetes",
                "Cardiovascular",
                "Medication",
              ],
            },
            {
              title: "Risk Alerts",
              items: [
                { text: "Drug Interaction", type: "warning" },
                { text: "Allergy Note", type: "error" },
              ],
            },
          ],
        };

      case "business":
        return {
          title: "Business Insights",
          icon: <BarChart3 className="h-5 w-5" />,
          color: "business",
          sections: [
            {
              title: "Key Deadlines",
              items: [
                "Q4 Report - Dec 31",
                "Budget Review - Jan 15",
                "Board Meeting - Feb 1",
              ],
            },
            {
              title: "Financial Metrics",
              items: ["Revenue: $2.4M", "Growth: +15%", "Expenses: $1.8M"],
            },
          ],
        };

      case "legal":
        return {
          title: "Legal Analysis",
          icon: <Scale className="h-5 w-5" />,
          color: "legal",
          sections: [
            {
              title: "Key Clauses",
              items: [
                "Termination Clause",
                "Liability Limits",
                "Penalty Terms",
                "Auto-renewal",
              ],
            },
            {
              title: "Red Flags",
              items: [
                { text: "Unlimited Liability", type: "error" },
                { text: "Auto-renewal", type: "warning" },
              ],
            },
          ],
        };

      case "education":
        return {
          title: "Learning Insights",
          icon: <GraduationCap className="h-5 w-5" />,
          color: "education",
          sections: [
            {
              title: "Key Concepts",
              items: [
                "Machine Learning",
                "Neural Networks",
                "Deep Learning",
                "AI Ethics",
              ],
            },
            {
              title: "Practice Quiz",
              items: ["5 questions ready", "Estimated time: 10 min"],
            },
          ],
        };

      default:
        return {
          title: "Insights",
          icon: <FileCheck className="h-5 w-5" />,
          color: "primary",
          sections: [],
        };
    }
  };

  const content = getCategoryContent();

  return (
    <Card className="h-full p-4">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {content.icon}
          <h2 className="font-semibold">{content.title}</h2>
        </div>
        <div className="h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
      </div>

      <div className="space-y-6">
        {content.sections.map((section, index) => (
          <div key={index} className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              {section.title}
            </h3>
            <div className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  {typeof item === "string" ? (
                    <Badge variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ) : (
                    <div className="flex items-center gap-2">
                      {item.type === "warning" && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                      {item.type === "error" && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-sm">{item.text}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {category === "education" && (
          <div className="pt-4 border-t">
            <Button className="w-full bg-education hover:bg-education/90">
              Start Practice Quiz
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CategorySidebar;
