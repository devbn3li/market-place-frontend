"use client";

import { useEffect } from "react";
import { useCartStore } from "./cart-store";
import { useWishlistStore } from "./wishlist-store";
import { useLanguageStore } from "./language-store";
import { useAuthStore } from "./auth-store";
import { useOrdersStore } from "./orders-store";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Rehydrate all stores on client side
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
    useLanguageStore.persist.rehydrate();
    useAuthStore.persist.rehydrate();
    useOrdersStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
