"use client";

import { useState } from "react";
import { useLanguageStore, useAuthStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToastAlert } from "@/hooks/use-toast-alert";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  Search,
  Eye,
  Calendar,
  PackageCheck,
  PackageX,
  Box,
  Printer,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const t = {
  fulfillment: { en: "Fulfillment Center", ar: "مركز التنفيذ" },
  ordersToFulfill: { en: "Orders to Fulfill", ar: "الطلبات المطلوب تنفيذها" },
  pending: { en: "Pending", ar: "قيد الانتظار" },
  processing: { en: "Processing", ar: "قيد المعالجة" },
  readyToShip: { en: "Ready to Ship", ar: "جاهز للشحن" },
  shipped: { en: "Shipped", ar: "تم الشحن" },
  delivered: { en: "Delivered", ar: "تم التوصيل" },
  cancelled: { en: "Cancelled", ar: "ملغى" },
  orderNumber: { en: "Order Number", ar: "رقم الطلب" },
  customer: { en: "Customer", ar: "العميل" },
  items: { en: "Items", ar: "المنتجات" },
  total: { en: "Total", ar: "الإجمالي" },
  status: { en: "Status", ar: "الحالة" },
  actions: { en: "Actions", ar: "الإجراءات" },
  shippingAddress: { en: "Shipping Address", ar: "عنوان الشحن" },
  trackingNumber: { en: "Tracking Number", ar: "رقم التتبع" },
  carrier: { en: "Carrier", ar: "شركة الشحن" },
  estimatedDelivery: { en: "Estimated Delivery", ar: "التسليم المتوقع" },
  orderDate: { en: "Order Date", ar: "تاريخ الطلب" },
  viewDetails: { en: "View Details", ar: "عرض التفاصيل" },
  markAsShipped: { en: "Mark as Shipped", ar: "تحديد كمشحون" },
  markAsDelivered: { en: "Mark as Delivered", ar: "تحديد كمستلم" },
  printLabel: { en: "Print Label", ar: "طباعة الملصق" },
  searchOrders: { en: "Search orders...", ar: "بحث عن طلبات..." },
  filterByStatus: { en: "Filter by Status", ar: "تصفية حسب الحالة" },
  allOrders: { en: "All Orders", ar: "جميع الطلبات" },
  noOrders: { en: "No orders found", ar: "لا توجد طلبات" },
  loginRequired: {
    en: "Please login to access Fulfillment Center",
    ar: "يرجى تسجيل الدخول للوصول لمركز التنفيذ",
  },
  overview: { en: "Overview", ar: "نظرة عامة" },
  totalOrders: { en: "Total Orders", ar: "إجمالي الطلبات" },
  pendingFulfillment: { en: "Pending Fulfillment", ar: "في انتظار التنفيذ" },
  inTransit: { en: "In Transit", ar: "قيد الشحن" },
  completedToday: { en: "Completed Today", ar: "تم إنجازها اليوم" },
  contactInfo: { en: "Contact Info", ar: "معلومات الاتصال" },
  product: { en: "Product", ar: "المنتج" },
  quantity: { en: "Quantity", ar: "الكمية" },
  price: { en: "Price", ar: "السعر" },
};

// Mock data
const mockOrders = [
  {
    id: "AMN-12345678",
    customer: "John Doe",
    customerAr: "جون دو",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    date: "2025-12-28",
    items: 3,
    total: 599.97,
    status: "pending" as "pending" | "processing" | "readyToShip" | "shipped" | "delivered" | "cancelled",
    address: "123 Main St, New York, NY 10001, USA",
    addressAr: "123 شارع الرئيسي، نيويورك، NY 10001، الولايات المتحدة",
    products: [
      {
        name: "Premium Wireless Headphones",
        nameAr: "سماعات لاسلكية فاخرة",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
        quantity: 2,
        price: 299.99,
      },
    ],
  },
  {
    id: "AMN-12345677",
    customer: "Sarah Smith",
    customerAr: "سارة سميث",
    email: "sarah@example.com",
    phone: "+1 234 567 8901",
    date: "2025-12-27",
    items: 1,
    total: 399.99,
    status: "readyToShip" as "pending" | "processing" | "readyToShip" | "shipped" | "delivered" | "cancelled",
    address: "456 Oak Ave, Los Angeles, CA 90001, USA",
    addressAr: "456 شارع البلوط، لوس أنجلوس، CA 90001، الولايات المتحدة",
    trackingNumber: "TRK123456789",
    carrier: "FedEx",
    products: [
      {
        name: "Smart Watch Pro",
        nameAr: "ساعة ذكية برو",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
        quantity: 1,
        price: 399.99,
      },
    ],
  },
  {
    id: "AMN-12345676",
    customer: "Ahmed Ali",
    customerAr: "أحمد علي",
    email: "ahmed@example.com",
    phone: "+20 123 456 7890",
    date: "2025-12-27",
    items: 2,
    total: 159.98,
    status: "shipped" as "pending" | "processing" | "readyToShip" | "shipped" | "delivered" | "cancelled",
    address: "789 Palm St, Cairo, Egypt",
    addressAr: "789 شارع النخيل، القاهرة، مصر",
    trackingNumber: "TRK987654321",
    carrier: "DHL",
    estimatedDelivery: "2025-12-30",
    products: [
      {
        name: "Laptop Stand Aluminum",
        nameAr: "حامل لابتوب ألومنيوم",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop",
        quantity: 2,
        price: 79.99,
      },
    ],
  },
  {
    id: "AMN-12345675",
    customer: "Emma Wilson",
    customerAr: "إيما ويلسون",
    email: "emma@example.com",
    phone: "+44 20 1234 5678",
    date: "2025-12-26",
    items: 1,
    total: 149.99,
    status: "delivered" as "pending" | "processing" | "readyToShip" | "shipped" | "delivered" | "cancelled",
    address: "321 Thames St, London, UK",
    addressAr: "321 شارع التايمز، لندن، المملكة المتحدة",
    trackingNumber: "TRK456789123",
    carrier: "Royal Mail",
    products: [
      {
        name: "Wireless Mouse",
        nameAr: "ماوس لاسلكي",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop",
        quantity: 1,
        price: 149.99,
      },
    ],
  },
];

const getStatusColor = (status: string) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30",
    processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30",
    readyToShip: "bg-purple-100 text-purple-700 dark:bg-purple-900/30",
    shipped: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30",
    delivered: "bg-green-100 text-green-700 dark:bg-green-900/30",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30",
  };
  return colors[status as keyof typeof colors] || colors.pending;
};

const getStatusText = (status: string, language: "en" | "ar") => {
  const statusMap: { [key: string]: { en: string; ar: string } } = {
    pending: t.pending,
    processing: t.processing,
    readyToShip: t.readyToShip,
    shipped: t.shipped,
    delivered: t.delivered,
    cancelled: t.cancelled,
  };
  return statusMap[status]?.[language] || status;
};

export default function FulfillmentPage() {
  const { language } = useLanguageStore();
  const { isAuthenticated, user } = useAuthStore();
  const toastAlert = useToastAlert();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [orders, setOrders] = useState(mockOrders);

  const updateOrderStatus = (orderId: string, newStatus: "pending" | "processing" | "readyToShip" | "shipped" | "delivered" | "cancelled") => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleStartProcessing = (orderId: string) => {
    updateOrderStatus(orderId, "processing");
    toastAlert.success(
      language === "ar" ? "تم بدء التجهيز" : "Processing Started",
      language === "ar"
        ? `الطلب ${orderId} الآن قيد التجهيز`
        : `Order ${orderId} is now being processed`
    );
  };

  const handleMarkAsShipped = (orderId: string) => {
    const trackingNumber = `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
            ...order,
            status: "shipped" as const,
            trackingNumber,
            carrier: "FedEx",
            estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
          }
          : order
      )
    );
    toastAlert.success(
      language === "ar" ? "تم الشحن بنجاح" : "Shipped Successfully",
      language === "ar"
        ? `رقم التتبع: ${trackingNumber}`
        : `Tracking number: ${trackingNumber}`
    );
  };

  const handleMarkAsDelivered = (orderId: string) => {
    toastAlert.confirm(
      language === "ar"
        ? "هل أنت متأكد من تسليم هذا الطلب؟"
        : "Are you sure this order has been delivered?",
      () => {
        updateOrderStatus(orderId, "delivered");
        toastAlert.success(
          language === "ar" ? "تم التسليم" : "Delivered",
          language === "ar"
            ? `الطلب ${orderId} تم تسليمه بنجاح`
            : `Order ${orderId} has been delivered successfully`
        );
      },
      undefined,
      language === "ar" ? "تأكيد" : "Confirm",
      language === "ar" ? "إلغاء" : "Cancel"
    );
  };

  const handlePrintLabel = (orderId: string) => {
    toastAlert.info(
      language === "ar" ? "جاري الطباعة" : "Printing",
      language === "ar"
        ? `جاري طباعة ملصق الشحن للطلب ${orderId}`
        : `Printing shipping label for order ${orderId}`
    );
  };

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen bg-muted/30 flex items-center justify-center"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="bg-card rounded-2xl border p-8 max-w-md w-full mx-4 text-center">
          <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-bold mb-2">{t.loginRequired[language]}</h2>
          <p className="text-muted-foreground mb-6">
            {language === "ar"
              ? "يجب أن يكون لديك حساب للوصول لمركز التنفيذ"
              : "You need an account to access the Fulfillment Center"}
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/login">
              <Button className="bg-orange-500 hover:bg-orange-600">
                {language === "ar" ? "تسجيل الدخول" : "Login"}
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline">
                {language === "ar" ? "إنشاء حساب" : "Create Account"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.customerAr && order.customerAr.includes(searchQuery));
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending" || o.status === "processing" || o.status === "readyToShip").length,
    inTransit: orders.filter((o) => o.status === "shipped").length,
    completedToday: orders.filter((o) => o.status === "delivered").length,
  };

  return (
    <div className="min-h-screen bg-muted/30" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Package className="h-6 w-6 text-orange-500" />
                {t.fulfillment[language]}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {language === "ar" ? `مرحباً، ${user?.firstName}` : `Welcome, ${user?.firstName}`}
              </p>
            </div>
            <Link href="/seller-center">
              <Button variant="outline">
                {language === "ar" ? "مركز البائع" : "Seller Center"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: t.totalOrders,
              value: stats.total,
              icon: Package,
              color: "text-blue-500",
              bgColor: "bg-blue-100 dark:bg-blue-900/30",
            },
            {
              label: t.pendingFulfillment,
              value: stats.pending,
              icon: Clock,
              color: "text-yellow-500",
              bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
            },
            {
              label: t.inTransit,
              value: stats.inTransit,
              icon: Truck,
              color: "text-purple-500",
              bgColor: "bg-purple-100 dark:bg-purple-900/30",
            },
            {
              label: t.completedToday,
              value: stats.completedToday,
              icon: CheckCircle2,
              color: "text-green-500",
              bgColor: "bg-green-100 dark:bg-green-900/30",
            },
          ].map((stat, i) => (
            <div key={i} className="bg-card rounded-xl border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label[language]}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="bg-card rounded-xl border p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchOrders[language]}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border bg-background"
              >
                <option value="all">{t.allOrders[language]}</option>
                <option value="pending">{t.pending[language]}</option>
                <option value="processing">{t.processing[language]}</option>
                <option value="readyToShip">{t.readyToShip[language]}</option>
                <option value="shipped">{t.shipped[language]}</option>
                <option value="delivered">{t.delivered[language]}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-card rounded-xl border p-12 text-center">
              <PackageX className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-bold mb-2">{t.noOrders[language]}</h3>
              <p className="text-muted-foreground">
                {language === "ar"
                  ? "لم يتم العثور على طلبات تطابق البحث"
                  : "No orders found matching your search"}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-card rounded-xl border overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg">{order.id}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status, language)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {order.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Box className="h-4 w-4" />
                          {order.items} {language === "ar" ? "منتجات" : "items"}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-500">${order.total}</p>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium mb-2">{t.customer[language]}</p>
                      <p className="font-medium">
                        {language === "ar" && order.customerAr ? order.customerAr : order.customer}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Mail className="h-3 w-3" />
                        {order.email}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {order.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">{t.shippingAddress[language]}</p>
                      <p className="text-sm text-muted-foreground flex items-start gap-1">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{language === "ar" && order.addressAr ? order.addressAr : order.address}</span>
                      </p>
                    </div>
                  </div>

                  {/* Tracking Info */}
                  {order.trackingNumber && (
                    <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            {t.trackingNumber[language]}
                          </p>
                          <p className="font-mono font-bold text-sm">{order.trackingNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">{t.carrier[language]}</p>
                          <p className="font-medium text-sm">{order.carrier}</p>
                        </div>
                        {order.estimatedDelivery && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">
                              {t.estimatedDelivery[language]}
                            </p>
                            <p className="font-medium text-sm">{order.estimatedDelivery}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Products */}
                  <div className="space-y-2 mb-4">
                    {order.products.map((product, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {language === "ar" ? product.nameAr : product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t.quantity[language]}: {product.quantity} × ${product.price}
                          </p>
                        </div>
                        <p className="font-bold">${(product.quantity * product.price).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/orders/${order.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        {t.viewDetails[language]}
                      </Button>
                    </Link>
                    {order.status === "pending" && (
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 gap-2"
                        onClick={() => handleStartProcessing(order.id)}
                      >
                        <PackageCheck className="h-4 w-4" />
                        {language === "ar" ? "بدء التجهيز" : "Start Processing"}
                      </Button>
                    )}
                    {(order.status === "processing" || order.status === "readyToShip") && (
                      <>
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600 gap-2"
                          onClick={() => handleMarkAsShipped(order.id)}
                        >
                          <Truck className="h-4 w-4" />
                          {t.markAsShipped[language]}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => handlePrintLabel(order.id)}
                        >
                          <Printer className="h-4 w-4" />
                          {t.printLabel[language]}
                        </Button>
                      </>
                    )}
                    {order.status === "shipped" && (
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 gap-2"
                        onClick={() => handleMarkAsDelivered(order.id)}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {t.markAsDelivered[language]}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
