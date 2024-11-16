export const mockProducts = [
  {
    _id: "1",
    name: "Luxury Sofa",
    description: "Modern 3-seater sofa with premium fabric",
    basePrice: 1299.99,
    images: ["/placeholder.svg"],
    category: { _id: "c1", name: "Living Room" },
    variations: [
      {
        name: "Color",
        options: [
          { value: "Beige", priceModifier: 0, quantity: 5 },
          { value: "Gray", priceModifier: 100, quantity: 3 }
        ]
      }
    ]
  },
  {
    _id: "2",
    name: "Dining Table",
    description: "Solid wood dining table",
    basePrice: 899.99,
    images: ["/placeholder.svg"],
    category: { _id: "c2", name: "Dining" }
  },
  {
    _id: "3",
    name: "Bed Frame",
    description: "Queen size bed frame with headboard",
    basePrice: 799.99,
    images: ["/placeholder.svg"],
    category: { _id: "c3", name: "Bedroom" }
  },
  {
    _id: "4",
    name: "Table Lamp",
    description: "Modern ceramic table lamp",
    basePrice: 129.99,
    images: ["/placeholder.svg"],
    category: { _id: "c4", name: "Accessories" }
  }
];

export const mockCategories = [
  { _id: "c1", name: "Living Room" },
  { _id: "c2", name: "Dining" },
  { _id: "c3", name: "Bedroom" },
  { _id: "c4", name: "Accessories" }
];