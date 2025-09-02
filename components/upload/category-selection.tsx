import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
type CategorySelectionProps = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};
const categories = [
  { value: "healthcare", label: "Healthcare" },
  { value: "business", label: "Business" },
  { value: "legal", label: "Legal" },
  { value: "education", label: "Education" },
];
const CategorySelection = ({
  selectedCategory,
  setSelectedCategory,
}: CategorySelectionProps) => {
  return (
    <div className="mb-8">
      <Label className="text-lg font-semibold mb-4 block">
        Choose Category
      </Label>

      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-full h-14 text-lg rounded-xl">
          <SelectValue placeholder="Select the document category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem
              key={category.value}
              value={category.value}
              className="text-lg py-3"
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelection;
