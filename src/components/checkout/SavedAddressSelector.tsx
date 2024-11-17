import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

interface Address {
  label: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface SavedAddressSelectorProps {
  addresses: Address[];
  selectedAddressIndex: number | null;
  onSelectAddress: (index: number) => void;
  onAddNewAddress: () => void;
}

const SavedAddressSelector = ({
  addresses,
  selectedAddressIndex,
  onSelectAddress,
  onAddNewAddress,
}: SavedAddressSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Select Delivery Address</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddNewAddress}
          className="flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Add New Address
        </Button>
      </div>

      {addresses.length > 0 ? (
        <RadioGroup
          value={selectedAddressIndex?.toString()}
          onValueChange={(value) => onSelectAddress(parseInt(value))}
        >
          <div className="grid grid-cols-1 gap-4">
            {addresses.map((address, index) => (
              <div
                key={index}
                className="flex items-start space-x-2 border rounded-lg p-4"
              >
                <RadioGroupItem value={index.toString()} id={`address-${index}`} />
                <Label htmlFor={`address-${index}`} className="flex-grow cursor-pointer">
                  <div className="space-y-1">
                    <p className="font-medium">{address.label}</p>
                    <p className="text-sm text-muted-foreground">{address.addressLine1}</p>
                    {address.addressLine2 && (
                      <p className="text-sm text-muted-foreground">{address.addressLine2}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {address.city}, {address.postalCode}
                    </p>
                    <p className="text-sm text-muted-foreground">{address.phone}</p>
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      ) : (
        <p className="text-sm text-muted-foreground">No saved addresses found.</p>
      )}
    </div>
  );
};

export default SavedAddressSelector;