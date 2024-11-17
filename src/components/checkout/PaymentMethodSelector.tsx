import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PaymentMethodSelectorProps {
  selected: "cod" | "bkash";
  onSelect: (method: "cod" | "bkash") => void;
}

const PaymentMethodSelector = ({ selected, onSelect }: PaymentMethodSelectorProps) => {
  return (
    <RadioGroup value={selected} onValueChange={onSelect}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cod" id="cod" />
          <Label htmlFor="cod" className="flex flex-col">
            <span>Cash on Delivery</span>
            <span className="text-sm text-muted-foreground">Pay when you receive</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bkash" id="bkash" />
          <Label htmlFor="bkash" className="flex flex-col">
            <span>bKash</span>
            <span className="text-sm text-muted-foreground">Pay via bKash mobile banking</span>
          </Label>
        </div>
      </div>
    </RadioGroup>
  );
};

export default PaymentMethodSelector;