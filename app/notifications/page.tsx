"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguageStore, useAuthStore } from "@/stores";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Package,
  Truck,
  Tag,
  CreditCard,
  Gift,
  AlertCircle,
  CheckCircle,
  Trash2,
  Check,
  Settings,
  BellOff,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface Notification {
  id: string;
  type: "order" | "shipping" | "promo" | "payment" | "gift" | "alert" | "success";
  titleEn: string;
  titleAr: string;
  messageEn: string;
  messageAr: string;
  time: string;
  read: boolean;
  link?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "shipping",
    titleEn: "Your order is on the way!",
    titleAr: "طلبك في الطريق!",
    messageEn: "Order #AMN-2024-1234 has been shipped and will arrive in 2-3 days.",
    messageAr: "تم شحن الطلب #AMN-2024-1234 وسيصل خلال 2-3 أيام.",
    time: "2 hours ago",
    read: false,
    link: "/orders",
  },
  {
    id: "2",
    type: "promo",
    titleEn: "Flash Sale Alert! 🔥",
    titleAr: "تنبيه تخفيضات خاطفة! 🔥",
    messageEn: "Up to 70% off on electronics. Limited time only!",
    messageAr: "خصم يصل إلى 70% على الإلكترونيات. لفترة محدودة فقط!",
    time: "5 hours ago",
    read: false,
    link: "/deals",
  },
  {
    id: "3",
    type: "order",
    titleEn: "Order Confirmed",
    titleAr: "تم تأكيد الطلب",
    messageEn: "Your order #AMN-2024-1233 has been confirmed and is being processed.",
    messageAr: "تم تأكيد طلبك #AMN-2024-1233 وجاري معالجته.",
    time: "1 day ago",
    read: true,
    link: "/orders",
  },
  {
    id: "4",
    type: "success",
    titleEn: "Payment Successful",
    titleAr: "تم الدفع بنجاح",
    messageEn: "Your payment of $149.99 has been processed successfully.",
    messageAr: "تمت معالجة دفعتك بقيمة 149.99$ بنجاح.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "5",
    type: "gift",
    titleEn: "You've earned a reward! 🎁",
    titleAr: "لقد ربحت مكافأة! 🎁",
    messageEn: "You've earned 500 points! Redeem them on your next purchase.",
    messageAr: "لقد ربحت 500 نقطة! استبدلها في مشترياتك القادمة.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "6",
    type: "shipping",
    titleEn: "Order Delivered",
    titleAr: "تم توصيل الطلب",
    messageEn: "Your order #AMN-2024-1230 has been delivered. Enjoy your purchase!",
    messageAr: "تم توصيل طلبك #AMN-2024-1230. استمتع بمشترياتك!",
    time: "3 days ago",
    read: true,
    link: "/orders",
  },
  {
    id: "7",
    type: "alert",
    titleEn: "Price Drop Alert",
    titleAr: "تنبيه انخفاض السعر",
    messageEn: "An item in your wishlist is now on sale!",
    messageAr: "منتج في قائمة رغباتك الآن معروض للبيع!",
    time: "4 days ago",
    read: true,
    link: "/wishlist",
  },
  {
    id: "8",
    type: "promo",
    titleEn: "New Year Special Offer",
    titleAr: "عرض السنة الجديدة الخاص",
    messageEn: "Use code NEWYEAR25 for 25% off your next order!",
    messageAr: "استخدم كود NEWYEAR25 للحصول على خصم 25% على طلبك القادم!",
    time: "5 days ago",
    read: true,
    link: "/deals",
  },
];

const notificationIcons = {
  order: Package,
  shipping: Truck,
  promo: Tag,
  payment: CreditCard,
  gift: Gift,
  alert: AlertCircle,
  success: CheckCircle,
};

const notificationColors = {
  order: "bg-blue-100 dark:bg-blue-900/30 text-blue-500",
  shipping: "bg-purple-100 dark:bg-purple-900/30 text-purple-500",
  promo: "bg-orange-100 dark:bg-orange-900/30 text-orange-500",
  payment: "bg-green-100 dark:bg-green-900/30 text-green-500",
  gift: "bg-pink-100 dark:bg-pink-900/30 text-pink-500",
  alert: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600",
  success: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500",
};

export default function NotificationsPage() {
  const { language } = useLanguageStore();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications = filter === "unread"
    ? notifications.filter((n) => !n.read)
    : notifications;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div
      className="min-h-screen bg-muted/30"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === "ar" ? "العودة للحساب" : "Back to Account"}
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Bell className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {language === "ar" ? "الإشعارات" : "Notifications"}
              </h1>
              <p className="text-white/90">
                {language === "ar"
                  ? `لديك ${unreadCount} إشعار${unreadCount !== 1 ? "ات" : ""} غير مقروء${unreadCount !== 1 ? "ة" : ""}`
                  : `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="bg-card rounded-xl border p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Filters */}
            <div className="flex items-center gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className={filter === "all" ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                {language === "ar" ? "الكل" : "All"}
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {notifications.length}
                </span>
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("unread")}
                className={filter === "unread" ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                {language === "ar" ? "غير مقروء" : "Unread"}
                {unreadCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  <Check className="h-4 w-4 mr-2" />
                  {language === "ar" ? "تحديد الكل كمقروء" : "Mark all as read"}
                </Button>
              )}
              {notifications.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearAll} className="text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  {language === "ar" ? "مسح الكل" : "Clear all"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const Icon = notificationIcons[notification.type];
              const colorClass = notificationColors[notification.type];

              return (
                <div
                  key={notification.id}
                  className={`bg-card rounded-xl border p-4 transition-all hover:shadow-md ${!notification.read ? "border-l-4 border-l-orange-500" : ""
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                            {language === "ar" ? notification.titleAr : notification.titleEn}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {language === "ar" ? notification.messageAr : notification.messageEn}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                            {notification.link && (
                              <Link
                                href={notification.link}
                                className="text-xs text-orange-500 hover:underline"
                              >
                                {language === "ar" ? "عرض التفاصيل" : "View details"}
                              </Link>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => markAsRead(notification.id)}
                              title={language === "ar" ? "تحديد كمقروء" : "Mark as read"}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-red-500"
                            onClick={() => deleteNotification(notification.id)}
                            title={language === "ar" ? "حذف" : "Delete"}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-card rounded-2xl border p-12 text-center">
            <BellOff className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h2 className="text-xl font-bold mb-2">
              {language === "ar" ? "لا توجد إشعارات" : "No Notifications"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {filter === "unread"
                ? language === "ar"
                  ? "ليس لديك إشعارات غير مقروءة"
                  : "You have no unread notifications"
                : language === "ar"
                  ? "ستظهر إشعاراتك هنا"
                  : "Your notifications will appear here"}
            </p>
            <Link href="/categories">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <ShoppingBag className="h-4 w-4 mr-2" />
                {language === "ar" ? "تسوق الآن" : "Start Shopping"}
              </Button>
            </Link>
          </div>
        )}

        {/* Notification Settings */}
        <div className="mt-8 bg-card rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <Settings className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {language === "ar" ? "إعدادات الإشعارات" : "Notification Settings"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === "ar"
                    ? "تحكم في أنواع الإشعارات التي تتلقاها"
                    : "Control which notifications you receive"}
                </p>
              </div>
            </div>
            <Button variant="outline">
              {language === "ar" ? "إدارة" : "Manage"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
