import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { mockCategories } from "@/data/mockProducts";

const ProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 2000;

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

  const handlePriceChange = (value: number[]) => {
    setSearchParams(prev => {
      prev.set("minPrice", value[0].toString());
      prev.set("maxPrice", value[1].toString());
      prev.set("page", "1");
      return prev;
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="font-serif text-lg mb-4">Categories</h3>
          <RadioGroup
            value={selectedCategory || ""}
            onValueChange={handleCategoryChange}
            className="space-y-3"
          >
            {mockCategories.map((category) => (
              <div key={category._id} className="flex items-center space-x-2">
                <RadioGroupItem value={category._id} id={category._id} />
                <Label htmlFor={category._id}>{category.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <h3 className="font-serif text-lg mb-4">Price Range</h3>
          <div className="space-y-4">
            <Slider
              defaultValue={[minPrice, maxPrice]}
              max={2000}
              step={50}
              onValueChange={handlePriceChange}
              className="mt-6"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductFilters;