"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLanguageStore, useAuthStore, useOrdersStore, useCartStore, Order } from "@/stores";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Package,
  ArrowLeft,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  MapPin,
  CreditCard,
  Phone,
  User,
  Copy,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

const t = {
  orderDetails: { en: "Order Details", ar: "تفاصيل الطلب" },
  orderNumber: { en: "Order Number", ar: "رقم الطلب" },
  orderDate: { en: "Order Date", ar: "تاريخ الطلب" },
  orderStatus: { en: "Status", ar: "الحالة" },
  orderNotFound: { en: "Order not found", ar: "الطلب غير موجود" },
  orderNotFoundDesc: { en: "The order you're looking for doesn't exist or has been removed", ar: "الطلب الذي تبحث عنه غير موجود أو تمت إزالته" },
  backToOrders: { en: "Back to Orders", ar: "العودة للطلبات" },
  shippingAddress: { en: "Shipping Address", ar: "عنوان الشحن" },
  paymentMethod: { en: "Payment Method", ar: "طريقة الدفع" },
  orderSummary: { en: "Order Summary", ar: "ملخص الطلب" },
  subtotal: { en: "Subtotal", ar: "المجموع الفرعي" },
  shipping: { en: "Shipping", ar: "الشحن" },
  tax: { en: "Tax", ar: "الضريبة" },
  total: { en: "Total", ar: "الإجمالي" },
  items: { en: "Items", ar: "المنتجات" },
  quantity: { en: "Qty", ar: "الكمية" },
  buyAgain: { en: "Buy Again", ar: "اشترِ مرة أخرى" },
  trackOrder: { en: "Track Order", ar: "تتبع الطلب" },
  cancelOrder: { en: "Cancel Order", ar: "إلغاء الطلب" },
  copyOrderNumber: { en: "Copy order number", ar: "نسخ رقم الطلب" },
  copied: { en: "Copied!", ar: "تم النسخ!" },
  orderTimeline: { en: "Order Timeline", ar: "الجدول الزمني للطلب" },
  pending: { en: "Order Placed", ar: "تم تقديم الطلب" },
  processing: { en: "Processing", ar: "قيد المعالجة" },
  shipped: { en: "Shipped", ar: "تم الشحن" },
  delivered: { en: "Delivered", ar: "تم التوصيل" },
  cancelled: { en: "Cancelled", ar: "ملغي" },
  free: { en: "Free", ar: "مجاني" },
  cashOnDelivery: { en: "Cash on Delivery", ar: "الدفع عند الاستلام" },
  productsAddedToCart: { en: "Products added to cart", ar: "تمت إضافة المنتجات للسلة" },
  orderCancelled: { en: "Order cancelled", ar: "تم إلغاء الطلب" },
  egp: { en: "EGP", ar: "ج.م" },
  viewProduct: { en: "View Product", ar: "عرض المنتج" },
  needHelp: { en: "Need Help?", ar: "تحتاج مساعدة؟" },
  contactSupport: { en: "Contact Support", ar: "تواصل مع الدعم" },
};

export default function OrderDetailsPage() {
  const { language } = useLanguageStore();
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const { getOrderById, updateOrderStatus } = useOrdersStore();
  const { addToCart } = useCartStore();
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!authLoading && orderId) {
      const foundOrder = getOrderById(orderId);
      setOrder(foundOrder);
      setIsLoading(false);
    }
  }, [authLoading, isAuthenticated, orderId, getOrderById, router]);

  const getStatusConfig = (status: Order["status"]) => {
    const configs = {
      pending: {
        labelEn: "Order Placed",
        labelAr: "تم تقديم الطلب",
        icon: Clock,
        color: "text-yellow-500",
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        borderColor: "border-yellow-500",
      },
      processing: {
        labelEn: "Processing",
        labelAr: "قيد المعالجة",
        icon: RefreshCw,
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-900/30",
        borderColor: "border-blue-500",
      },
      shipped: {
        labelEn: "Shipped",
        labelAr: "تم الشحن",
        icon: Truck,
        color: "text-purple-500",
        bg: "bg-purple-100 dark:bg-purple-900/30",
        borderColor: "border-purple-500",
      },
      delivered: {
        labelEn: "Delivered",
        labelAr: "تم التوصيل",
        icon: CheckCircle,
        color: "text-green-500",
        bg: "bg-green-100 dark:bg-green-900/30",
        borderColor: "border-green-500",
      },
      cancelled: {
        labelEn: "Cancelled",
        labelAr: "ملغي",
        icon: XCircle,
        color: "text-red-500",
        bg: "bg-red-100 dark:bg-red-900/30",
        borderColor: "border-red-500",
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCopyOrderNumber = () => {
    if (order) {
      navigator.clipboard.writeText(order.orderNumber);
      toast.success(t.copied[language]);
    }
  };

  const handleBuyAgain = () => {
    if (order) {
      order.items.forEach((item) => {
        addToCart({
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
        });
      });
      toast.success(t.productsAddedToCart[language]);
      router.push("/cart");
    }
  };

  const handleCancelOrder = () => {
    if (order && (order.status === "pending" || order.status === "processing")) {
      updateOrderStatus(order.id, "cancelled");
      setOrder({ ...order, status: "cancelled" });
      toast.success(t.orderCancelled[language]);
    }
  };

  const getTimelineSteps = () => {
    const steps = [
      { key: "pending", label: t.pending[language], icon: Clock },
      { key: "processing", label: t.processing[language], icon: RefreshCw },
      { key: "shipped", label: t.shipped[language], icon: Truck },
      { key: "delivered", label: t.delivered[language], icon: CheckCircle },
    ];

    if (order?.status === "cancelled") {
      return [
        { key: "pending", label: t.pending[language], icon: Clock },
        { key: "cancelled", label: t.cancelled[language], icon: XCircle },
      ];
    }

    return steps;
  };

  const getStepStatus = (stepKey: string) => {
    if (!order) return "upcoming";

    const statusOrder = ["pending", "processing", "shipped", "delivered"];
    const currentIndex = statusOrder.indexOf(order.status);
    const stepIndex = statusOrder.indexOf(stepKey);

    if (order.status === "cancelled") {
      if (stepKey === "cancelled") return "current";
      if (stepKey === "pending") return "completed";
      return "upcoming";
    }

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-muted/30 py-12" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-16">
            <Package className="h-24 w-24 mx-auto text-muted-foreground/50 mb-6" />
            <h1 className="text-2xl font-bold mb-2">{t.orderNotFound[language]}</h1>
            <p className="text-muted-foreground mb-6">{t.orderNotFoundDesc[language]}</p>
            <Link href="/orders">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <ArrowLeft className={`h-4 w-4 ${language === "ar" ? "ml-2 rotate-180" : "mr-2"}`} />
                {t.backToOrders[language]}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-muted/30 py-8" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/orders"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className={`h-4 w-4 ${language === "ar" ? "ml-2 rotate-180" : "mr-2"}`} />
            {t.backToOrders[language]}
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{t.orderDetails[language]}</h1>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-muted-foreground">
                  {t.orderNumber[language]}: <span className="font-mono font-bold text-foreground">{order.orderNumber}</span>
                </p>
                <button
                  onClick={handleCopyOrderNumber}
                  className="p-1 hover:bg-muted rounded"
                  title={t.copyOrderNumber[language]}
                >
                  <Copy className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bg}`}>
              <StatusIcon className={`h-5 w-5 ${statusConfig.color}`} />
              <span className={`font-medium ${statusConfig.color}`}>
                {language === "ar" ? statusConfig.labelAr : statusConfig.labelEn}
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Timeline */}
            <div className="bg-card rounded-xl border p-6">
              <h2 className="text-lg font-bold mb-6">{t.orderTimeline[language]}</h2>
              <div className="relative">
                <div className="flex justify-between">
                  {getTimelineSteps().map((step, index) => {
                    const StepIcon = step.icon;
                    const status = getStepStatus(step.key);
                    const isCompleted = status === "completed";
                    const isCurrent = status === "current";
                    const isCancelled = step.key === "cancelled";

                    return (
                      <div key={step.key} className="flex flex-col items-center relative z-10">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${isCompleted
                            ? "bg-green-500 border-green-500 text-white"
                            : isCurrent
                              ? isCancelled
                                ? "bg-red-500 border-red-500 text-white"
                                : "bg-orange-500 border-orange-500 text-white"
                              : "bg-muted border-muted-foreground/30 text-muted-foreground"
                            }`}
                        >
                          <StepIcon className="h-5 w-5" />
                        </div>
                        <p
                          className={`mt-2 text-sm font-medium text-center ${isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                            }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
                {/* Progress Line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted-foreground/20 z-0" style={{ width: "100%", transform: "translateX(0)" }}>
                  <div
                    className={`h-full transition-all ${order.status === "cancelled" ? "bg-red-500" : "bg-green-500"}`}
                    style={{
                      width:
                        order.status === "cancelled"
                          ? "25%"
                          : order.status === "pending"
                            ? "0%"
                            : order.status === "processing"
                              ? "33%"
                              : order.status === "shipped"
                                ? "66%"
                                : "100%",
                    }}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6 text-center">
                {t.orderDate[language]}: {formatDate(order.createdAt)}
              </p>
            </div>

            {/* Order Items */}
            <div className="bg-card rounded-xl border p-6">
              <h2 className="text-lg font-bold mb-4">{t.items[language]} ({order.items.length})</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/50"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0">
                      <Image
                        src={item.image}
                        alt={language === "ar" ? item.name.ar : item.name.en}
                        fill
                        className="object-contain p-2"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">
                        {language === "ar" ? item.name.ar : item.name.en}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t.quantity[language]}: {item.quantity}
                      </p>
                      <p className="font-bold text-orange-500">
                        {item.price.toLocaleString()} {t.egp[language]}
                      </p>
                    </div>
                    <Link href={`/product/${item.id}`}>
                      <Button variant="outline" size="sm">
                        {t.viewProduct[language]}
                        <ChevronRight className={`h-4 w-4 ${language === "ar" ? "mr-1 rotate-180" : "ml-1"}`} />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-card rounded-xl border p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-bold">{t.shippingAddress[language]}</h2>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</span>
                </div>
                <p className="text-muted-foreground pl-6">
                  {order.shippingAddress.address}
                </p>
                <p className="text-muted-foreground pl-6">
                  {order.shippingAddress.city}, {order.shippingAddress.country} {order.shippingAddress.postalCode}
                </p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span dir="ltr">{order.shippingAddress.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-card rounded-xl border p-6">
              <h2 className="text-lg font-bold mb-4">{t.orderSummary[language]}</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.subtotal[language]}</span>
                  <span>{order.subtotal.toLocaleString()} {t.egp[language]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.shipping[language]}</span>
                  <span className={order.shipping === 0 ? "text-green-500" : ""}>
                    {order.shipping === 0 ? t.free[language] : `${order.shipping.toLocaleString()} ${t.egp[language]}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.tax[language]}</span>
                  <span>{order.tax.toLocaleString()} {t.egp[language]}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t.total[language]}</span>
                    <span className="text-orange-500">{order.total.toLocaleString()} {t.egp[language]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card rounded-xl border p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-bold">{t.paymentMethod[language]}</h2>
              </div>
              <p className="text-muted-foreground">{t.cashOnDelivery[language]}</p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleBuyAgain}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                <ShoppingBag className={`h-4 w-4 ${language === "ar" ? "ml-2" : "mr-2"}`} />
                {t.buyAgain[language]}
              </Button>

              {(order.status === "pending" || order.status === "processing") && (
                <Button
                  variant="outline"
                  onClick={handleCancelOrder}
                  className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <XCircle className={`h-4 w-4 ${language === "ar" ? "ml-2" : "mr-2"}`} />
                  {t.cancelOrder[language]}
                </Button>
              )}
            </div>

            {/* Need Help */}
            <div className="bg-muted/50 rounded-xl p-6 text-center">
              <p className="font-medium mb-2">{t.needHelp[language]}</p>
              <Link href="/help">
                <Button variant="link" className="text-orange-500">
                  {t.contactSupport[language]}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
