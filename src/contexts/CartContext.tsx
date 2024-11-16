import { createContext, useContext, useState, useEffect } from "react";
import { Cart, CartItem } from "@/types/cart";

interface CartContextType {
  cart: Cart | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>({
    _id: "mock-cart-id",
    items: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0);
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      if (!prevCart) return null;
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item._id === newItem._id
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return { ...prevCart, items: updatedItems };
      }

      return {
        ...prevCart,
        items: [...prevCart.items, newItem],
      };
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      if (!prevCart) return null;
      return {
        ...prevCart,
        items: prevCart.items.filter((item) => item._id !== itemId),
      };
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCart((prevCart) => {
      if (!prevCart) return null;
      return {
        ...prevCart,
        items: prevCart.items.map((item) =>
          item._id === itemId ? { ...item, quantity } : item
        ),
      };
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};