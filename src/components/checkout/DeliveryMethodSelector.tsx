import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DeliveryMethodSelectorProps {
  selected: string;
  onSelect: (method: string) => void;
}

const DeliveryMethodSelector = ({ selected, onSelect }: DeliveryMethodSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Delivery Method</h3>
      <RadioGroup value={selected} onValueChange={onSelect}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Dhaka City" id="dhaka" />
            <Label htmlFor="dhaka" className="flex flex-col">
              <span>Dhaka City</span>
              <span className="text-sm text-muted-foreground">৳60 (1-2 days)</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Outside Dhaka" id="outside" />
            <Label htmlFor="outside" className="flex flex-col">
              <span>Outside Dhaka</span>
              <span className="text-sm text-muted-foreground">৳120 (2-3 days)</span>
            </Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default DeliveryMethodSelector;