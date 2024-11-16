import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface VariationOption {
  value: string;
  priceModifier: number;
  quantity: number;
}

interface Variation {
  name: string;
  options: VariationOption[];
}

interface ProductVariationsProps {
  variations: Variation[];
  selectedVariations: Record<string, string>;
  onVariationChange: (variationName: string, value: string) => void;
}

export const ProductVariations = ({
  variations,
  selectedVariations,
  onVariationChange,
}: ProductVariationsProps) => {
  return (
    <div className="space-y-4">
      {variations.map((variation) => (
        <Card key={variation.name} className="p-4">
          <h3 className="text-sm font-medium mb-3">{variation.name}</h3>
          <RadioGroup
            value={selectedVariations[variation.name]}
            onValueChange={(value) => onVariationChange(variation.name, value)}
          >
            <div className="flex flex-col space-y-2">
              {variation.options.map((option) => (
                <div key={option.value}>
                  <RadioGroupItem
                    value={option.value}
                    id={`${variation.name}-${option.value}`}
                    className="peer hidden"
                  />
                  <Label
                    htmlFor={`${variation.name}-${option.value}`}
                    className="flex items-center justify-between px-3 py-2 border rounded-md cursor-pointer transition-all hover:border-luxury-gold peer-data-[state=checked]:border-luxury-gold peer-data-[state=checked]:bg-luxury-cream"
                  >
                    <span>{option.value}</span>
                    {option.priceModifier > 0 && (
                      <span className="text-sm text-muted-foreground">
                        +${option.priceModifier}
                      </span>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </Card>
      ))}
    </div>
  );
};