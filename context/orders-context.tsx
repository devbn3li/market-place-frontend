"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "orderNumber" | "createdAt" | "status">) => string;
  getOrdersByUser: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

const ORDERS_KEY = "amanoon_orders";

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load orders from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedOrders = localStorage.getItem(ORDERS_KEY);
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch {
        setOrders([]);
      }
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
  }, [orders, mounted]);

  // Generate order number
  const generateOrderNumber = () => {
    return `AMN-${Date.now().toString().slice(-8)}`;
  };

  // Add new order
  const addOrder = (orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "status">): string => {
    const newOrder: Order = {
      ...orderData,
      id: crypto.randomUUID(),
      orderNumber: generateOrderNumber(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder.orderNumber;
  };

  // Get orders by user
  const getOrdersByUser = (userId: string): Order[] => {
    return orders.filter(order => order.userId === userId);
  };

  // Get order by ID
  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  // Update order status
  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        getOrdersByUser,
        getOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}
