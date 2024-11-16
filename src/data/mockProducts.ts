export const mockProducts = [
  {
    _id: "1",
    name: "Luxury Sofa",
    description: `
      <h2>Premium Comfort Meets Elegance</h2>
      <p>Experience unparalleled comfort with our signature luxury sofa. Crafted with the finest materials and attention to detail, this piece becomes the centerpiece of any living space.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Premium fabric upholstery</li>
        <li>Ergonomic design for maximum comfort</li>
        <li>Solid hardwood frame</li>
        <li>High-resilience foam cushioning</li>
      </ul>
      
      <h3>Dimensions</h3>
      <p>Width: 220cm<br>Depth: 95cm<br>Height: 85cm</p>
      
      <h3>Care Instructions</h3>
      <p>Professional cleaning recommended. Vacuum regularly and avoid direct sunlight to maintain fabric quality.</p>
    `,
    basePrice: 1299.99,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    category: { _id: "c1", name: "Living Room" },
    variations: [
      {
        name: "Color",
        options: [
          { value: "Beige", priceModifier: 0, quantity: 5 },
          { value: "Gray", priceModifier: 100, quantity: 3 },
          { value: "Navy", priceModifier: 150, quantity: 2 }
        ]
      },
      {
        name: "Material",
        options: [
          { value: "Premium Fabric", priceModifier: 0, quantity: 5 },
          { value: "Velvet", priceModifier: 200, quantity: 3 },
          { value: "Leather", priceModifier: 500, quantity: 2 }
        ]
      }
    ],
    reviews: [
      {
        rating: 5,
        comment: "Absolutely stunning piece of furniture. The quality is exceptional and it's even more comfortable than I expected.",
        author: "Sarah M.",
        date: "2024-01-15"
      },
      {
        rating: 4,
        comment: "Beautiful sofa, great quality. Delivery was smooth and professional.",
        author: "James P.",
        date: "2024-01-10"
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

export const mockCartItems = [
  {
    _id: "cart-item-1",
    product: mockProducts[0],
    variations: {
      Color: "Beige",
      Material: "Premium Fabric"
    },
    quantity: 2
  },
  {
    _id: "cart-item-2",
    product: mockProducts[1],
    variations: {},
    quantity: 1
  }
];
