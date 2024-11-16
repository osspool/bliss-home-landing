export interface ProductVariationOption {
  value: string;
  priceModifier: number;
  _id?: string;
  images?: string[];
}

export interface ProductVariation {
  name: string;
  options: ProductVariationOption[];
  quantity?: number;
}

export interface CartProduct {
  _id: string;
  name: string;
  basePrice: number;
  images: string[];
  variations?: ProductVariation[];
}

export interface CartItem {
  product: CartProduct;
  variations: Record<string, string>;
  quantity: number;
  _id: string;
}

export interface Cart {
  _id: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}