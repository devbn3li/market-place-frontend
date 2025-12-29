"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";
import { useOrders, Order } from "@/context/orders-context";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Package,
  ArrowLeft,
  ShoppingBag,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default function OrdersPage() {
  const { language } = useLanguage();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { orders } = useOrders();
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const userOrders = user ? orders.filter(order => order.userId === user.id) : [];

  const getStatusConfig = (status: Order["status"]) => {
    const configs = {
      pending: {
        labelEn: "Pending",
        labelAr: "قيد الانتظار",
        icon: Clock,
        color: "text-yellow-500",
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
      },
      processing: {
        labelEn: "Processing",
        labelAr: "قيد المعالجة",
        icon: RefreshCw,
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-900/30",
      },
      shipped: {
        labelEn: "Shipped",
        labelAr: "تم الشحن",
        icon: Truck,
        color: "text-purple-500",
        bg: "bg-purple-100 dark:bg-purple-900/30",
      },
      delivered: {
        labelEn: "Delivered",
        labelAr: "تم التوصيل",
        icon: CheckCircle,
        color: "text-green-500",
        bg: "bg-green-100 dark:bg-green-900/30",
      },
      cancelled: {
        labelEn: "Cancelled",
        labelAr: "ملغي",
        icon: XCircle,
        color: "text-red-500",
        bg: "bg-red-100 dark:bg-red-900/30",
      },
    };
    return configs[status];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBuyAgain = (order: Order) => {
    order.items.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
      });
    });
    toast.success(
      language === "ar"
        ? "تمت إضافة المنتجات للسلة"
        : "Products added to cart"
    );
    router.push("/cart");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/30" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-500 text-white py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {language === "ar" ? "العودة للحساب" : "Back to Account"}
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl">
              <Package className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {language === "ar" ? "طلباتي" : "My Orders"}
              </h1>
              <p className="text-white/80">
                {language === "ar"
                  ? `${userOrders.length} طلب`
                  : `${userOrders.length} order${userOrders.length !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {userOrders.length === 0 ? (
          /* Empty State */
          <div className="bg-card rounded-2xl border p-12 text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {language === "ar" ? "لا توجد طلبات" : "No orders yet"}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {language === "ar"
                ? "لم تقم بأي عملية شراء بعد. تصفح منتجاتنا وابدأ التسوق الآن!"
                : "You haven't made any purchases yet. Browse our products and start shopping!"}
            </p>
            <Link href="/categories">
              <Button className="bg-orange-500 hover:bg-orange-600">
                {language === "ar" ? "تصفح المنتجات" : "Browse Products"}
              </Button>
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-4">
            {userOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div key={order.id} className="bg-card rounded-xl border overflow-hidden">
                  {/* Order Header */}
                  <div className="p-4 bg-muted/50 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {language === "ar" ? "رقم الطلب" : "Order Number"}
                        </p>
                        <p className="font-bold text-orange-500">#{order.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {language === "ar" ? "تاريخ الطلب" : "Order Date"}
                        </p>
                        <p className="font-medium">{formatDate(order.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {language === "ar" ? "الإجمالي" : "Total"}
                        </p>
                        <p className="font-bold">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                      <StatusIcon className="h-4 w-4" />
                      {language === "ar" ? statusConfig.labelAr : statusConfig.labelEn}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4">
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image}
                              alt={item.name[language]}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium line-clamp-1">{item.name[language]}</p>
                            <p className="text-sm text-muted-foreground">
                              {language === "ar" ? "الكمية:" : "Qty:"} {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="font-bold text-orange-500">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address */}
                    <div className="mt-4 pt-4 border-t flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">
                          {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                        </p>
                        <p className="text-muted-foreground">
                          {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-4 border-t flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBuyAgain(order)}
                        className="gap-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                        {language === "ar" ? "شراء مرة أخرى" : "Buy Again"}
                      </Button>
                      <Link href={`/orders/${order.id}`}>
                        <Button variant="ghost" size="sm" className="gap-2">
                          {language === "ar" ? "تفاصيل الطلب" : "Order Details"}
                          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
