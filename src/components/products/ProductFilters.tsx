import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTags = searchParams.getAll("tags");
  const selectedCategory = searchParams.get("category");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories");
      return response.json();
    },
  });

  const commonTags = ["summer", "casual", "unisex", "luxury", "trending"];

  const handleCategoryChange = (categoryId: string) => {
    setSearchParams(prev => {
      if (categoryId === selectedCategory) {
        prev.delete("category");
      } else {
        prev.set("category", categoryId);
      }
      prev.set("page", "1");
      return prev;
    });
  };

  const handleTagChange = (tag: string) => {
    setSearchParams(prev => {
      const tags = prev.getAll("tags");
      if (tags.includes(tag)) {
        const newTags = tags.filter(t => t !== tag);
        prev.delete("tags");
        newTags.forEach(t => prev.append("tags", t));
      } else {
        prev.append("tags", tag);
      }
      prev.set("page", "1");
      return prev;
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="font-serif text-lg mb-4">Categories</h3>
          <div className="space-y-3">
            {categories?.map((category: any) => (
              <div key={category._id} className="flex items-center space-x-2">
                <Checkbox
                  id={category._id}
                  checked={category._id === selectedCategory}
                  onCheckedChange={() => handleCategoryChange(category._id)}
                />
                <Label htmlFor={category._id}>{category.name}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg mb-4">Tags</h3>
          <div className="space-y-3">
            {commonTags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => handleTagChange(tag)}
                />
                <Label htmlFor={tag} className="capitalize">{tag}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductFilters;