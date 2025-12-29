import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: { en: string; ar: string };
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  category?: { en: string; ar: string };
}

export interface AppliedCoupon {
  code: string;
  discount: number; // percentage (e.g., 10 for 10%)
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  // Coupon
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  getDiscount: () => number;
}

// Valid coupon codes
const validCoupons: Record<string, number> = {
  amanoon10: 10,
  amanoon20: 20,
  save15: 15,
  welcome5: 5,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      appliedCoupon: null,

      addToCart: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          let newItems: CartItem[];

          if (existingItem) {
            newItems = state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
          } else {
            newItems = [...state.items, { ...item, quantity: 1 }];
          }

          return {
            items: newItems,
            totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: newItems.reduce(
              (sum, i) => sum + i.price * i.quantity,
              0
            ),
          };
        });
      },

      removeFromCart: (id) => {
        set((state) => {
          const newItems = state.items.filter((i) => i.id !== id);
          return {
            items: newItems,
            totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: newItems.reduce(
              (sum, i) => sum + i.price * i.quantity,
              0
            ),
          };
        });
      },

      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            const newItems = state.items.filter((i) => i.id !== id);
            return {
              items: newItems,
              totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
              totalPrice: newItems.reduce(
                (sum, i) => sum + i.price * i.quantity,
                0
              ),
            };
          }

          const newItems = state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          );
          return {
            items: newItems,
            totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: newItems.reduce(
              (sum, i) => sum + i.price * i.quantity,
              0
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0, appliedCoupon: null });
      },

      applyCoupon: (code: string) => {
        const discount = validCoupons[code.toLowerCase()];
        if (discount) {
          set({ appliedCoupon: { code: code.toLowerCase(), discount } });
          return true;
        }
        return false;
      },

      removeCoupon: () => {
        set({ appliedCoupon: null });
      },

      getDiscount: () => {
        const state = get();
        if (state.appliedCoupon) {
          return state.totalPrice * (state.appliedCoupon.discount / 100);
        }
        return 0;
      },
    }),
    {
      name: "amanoon-cart",
      skipHydration: true,
    }
  )
);
