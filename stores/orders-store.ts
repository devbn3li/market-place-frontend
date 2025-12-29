import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OrderItem {
  id: number;
  name: { en: string; ar: string };
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    phone: string;
  };
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  userId?: string;
}

interface OrdersStore {
  orders: Order[];
  addOrder: (
    order: Omit<Order, "id" | "orderNumber" | "createdAt" | "status">
  ) => string;
  getOrdersByUser: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (orderData) => {
        const orderNumber = `AMN-${Date.now().toString().slice(-8)}`;
        const newOrder: Order = {
          ...orderData,
          id: crypto.randomUUID(),
          orderNumber,
          status: "pending",
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return orderNumber;
      },

      getOrdersByUser: (userId) => {
        return get().orders.filter((order) => order.userId === userId);
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        }));
      },
    }),
    {
      name: "amanoon-orders",
      skipHydration: true,
    }
  )
);
