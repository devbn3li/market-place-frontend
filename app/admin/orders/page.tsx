"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/stores";
import {
  Search,
  ShoppingCart,
  Eye,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  User,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const translations = {
  ar: {
    orderManagement: "إدارة الطلبات",
    totalOrders: "إجمالي {count} طلب",
    searchPlaceholder: "بحث برقم الطلب أو اسم العميل...",
    all: "الكل",
    pending: "انتظار",
    processing: "تجهيز",
    shipped: "شحن",
    delivered: "توصيل",
    cancelled: "ملغي",
    totalOrdersStat: "إجمالي الطلبات",
    waitingOrders: "قيد الانتظار",
    processingOrders: "قيد التجهيز",
    shippedOrders: "تم الشحن",
    deliveredOrders: "تم التوصيل",
    totalRevenue: "إجمالي الإيرادات",
    orderNumber: "رقم الطلب",
    customer: "العميل",
    products: "المنتجات",
    total: "الإجمالي",
    status: "الحالة",
    date: "التاريخ",
    actions: "إجراءات",
    noOrders: "لا يوجد طلبات",
    product: "منتج",
    orderDetails: "تفاصيل الطلب",
    customerInfo: "معلومات العميل",
    shippingAddress: "عنوان الشحن",
    orderItems: "المنتجات",
    quantity: "الكمية",
    payment: "الدفع",
    paymentMethod: "طريقة الدفع",
    startProcessing: "بدء التجهيز",
    cancelOrder: "إلغاء الطلب",
    confirmShipping: "تأكيد الشحن",
    confirmDelivery: "تأكيد التوصيل",
    currency: "ر.س",
    statusPending: "قيد الانتظار",
    statusProcessing: "قيد التجهيز",
    statusShipped: "تم الشحن",
    statusDelivered: "تم التوصيل",
    statusCancelled: "ملغي",
  },
  en: {
    orderManagement: "Order Management",
    totalOrders: "Total {count} orders",
    searchPlaceholder: "Search by order number or customer name...",
    all: "All",
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
    totalOrdersStat: "Total Orders",
    waitingOrders: "Pending",
    processingOrders: "Processing",
    shippedOrders: "Shipped",
    deliveredOrders: "Delivered",
    totalRevenue: "Total Revenue",
    orderNumber: "Order Number",
    customer: "Customer",
    products: "Products",
    total: "Total",
    status: "Status",
    date: "Date",
    actions: "Actions",
    noOrders: "No orders found",
    product: "product",
    orderDetails: "Order Details",
    customerInfo: "Customer Information",
    shippingAddress: "Shipping Address",
    orderItems: "Products",
    quantity: "Quantity",
    payment: "Payment",
    paymentMethod: "Payment Method",
    startProcessing: "Start Processing",
    cancelOrder: "Cancel Order",
    confirmShipping: "Confirm Shipping",
    confirmDelivery: "Confirm Delivery",
    currency: "SAR",
    statusPending: "Pending",
    statusProcessing: "Processing",
    statusShipped: "Shipped",
    statusDelivered: "Delivered",
    statusCancelled: "Cancelled",
  },
};

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  shippingAddress: string;
  createdAt: string;
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-12345",
    customer: {
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "0501234567",
    },
    items: [
      { name: "سماعات لاسلكية", quantity: 1, price: 299 },
      { name: "شاحن سريع", quantity: 2, price: 79 },
    ],
    total: 457,
    status: "pending",
    paymentMethod: "بطاقة ائتمان",
    shippingAddress: "الرياض، حي النخيل، شارع الملك فهد",
    createdAt: "2024-01-15T10:30:00",
  },
  {
    id: "2",
    orderNumber: "ORD-12346",
    customer: {
      name: "سارة أحمد",
      email: "sara@example.com",
      phone: "0559876543",
    },
    items: [{ name: "ساعة ذكية", quantity: 1, price: 599 }],
    total: 599,
    status: "processing",
    paymentMethod: "الدفع عند الاستلام",
    shippingAddress: "جدة، حي الروضة، شارع التحلية",
    createdAt: "2024-01-15T09:15:00",
  },
  {
    id: "3",
    orderNumber: "ORD-12347",
    customer: {
      name: "محمد علي",
      email: "mohammad@example.com",
      phone: "0561112233",
    },
    items: [
      { name: "حذاء رياضي", quantity: 1, price: 450 },
      { name: "جوارب رياضية", quantity: 3, price: 35 },
    ],
    total: 555,
    status: "shipped",
    paymentMethod: "بطاقة ائتمان",
    shippingAddress: "الدمام، حي الفيصلية",
    createdAt: "2024-01-14T14:20:00",
  },
  {
    id: "4",
    orderNumber: "ORD-12348",
    customer: {
      name: "فاطمة خالد",
      email: "fatima@example.com",
      phone: "0544443333",
    },
    items: [{ name: "آلة صنع القهوة", quantity: 1, price: 899 }],
    total: 899,
    status: "delivered",
    paymentMethod: "Apple Pay",
    shippingAddress: "مكة المكرمة، حي العزيزية",
    createdAt: "2024-01-13T11:45:00",
  },
  {
    id: "5",
    orderNumber: "ORD-12349",
    customer: {
      name: "عبدالله سعيد",
      email: "abdullah@example.com",
      phone: "0533332222",
    },
    items: [{ name: "محفظة جلدية", quantity: 1, price: 199 }],
    total: 199,
    status: "cancelled",
    paymentMethod: "بطاقة ائتمان",
    shippingAddress: "المدينة المنورة، حي السلام",
    createdAt: "2024-01-12T16:00:00",
  },
];

type FilterStatus = "all" | "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export default function AdminOrdersPage() {
  const [mounted, setMounted] = useState(false);
  const [orders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { language } = useLanguageStore();
  const t = translations[language];

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.includes(searchQuery) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || order.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: Order["status"]) => {
    const styles = {
      pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
      processing: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
      shipped: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
      delivered: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
      cancelled: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    };

    const labels = {
      pending: t.statusPending,
      processing: t.statusProcessing,
      shipped: t.statusShipped,
      delivered: t.statusDelivered,
      cancelled: t.statusCancelled,
    };

    const icons = {
      pending: Clock,
      processing: Package,
      shipped: Truck,
      delivered: CheckCircle,
      cancelled: XCircle,
    };

    const Icon = icons[status];

    return (
      <span
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        <Icon className="w-3 h-3" />
        {labels[status]}
      </span>
    );
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    totalRevenue: orders
      .filter((o) => o.status !== "cancelled")
      .reduce((acc, o) => acc + o.total, 0),
  };

  if (!mounted) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3"></div>
        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.orderManagement}</h1>
          <p className="text-gray-500 dark:text-gray-400">{t.totalOrders.replace("{count}", orders.length.toString())}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t.totalOrdersStat}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t.waitingOrders}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.processing}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t.processingOrders}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.shipped}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t.shippedOrders}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.delivered}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t.deliveredOrders}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {stats.totalRevenue.toLocaleString()} {t.currency}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t.totalRevenue}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
            <Input
              placeholder={t.searchPlaceholder}
              className={language === 'ar' ? 'pr-10' : 'pl-10'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(
              [
                "all",
                "pending",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
              ] as FilterStatus[]
            ).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
              >
                {status === "all"
                  ? t.all
                  : status === "pending"
                    ? t.pending
                    : status === "processing"
                      ? t.processing
                      : status === "shipped"
                        ? t.shipped
                        : status === "delivered"
                          ? t.delivered
                          : t.cancelled}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
              <tr>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.orderNumber}
                </th>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.customer}
                </th>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.products}
                </th>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.total}
                </th>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.status}
                </th>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.date}
                </th>
                <th className="text-center py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500 dark:text-gray-400">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    {t.noOrders}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-800 dark:text-white">
                        {order.orderNumber}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {order.customer.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {order.customer.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-600 dark:text-gray-300">
                        {order.items.length} {t.product}
                        {language === 'ar' && order.items.length > 1 ? "ات" : language === 'en' && order.items.length > 1 ? "s" : ""}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-800 dark:text-white">
                        {order.total} {t.currency}
                      </p>
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(order.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(order.createdAt).toLocaleDateString(language === 'ar' ? "ar-SA" : "en-US")}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent side={language === 'ar' ? "left" : "right"} className="w-full sm:max-w-lg">
                          <SheetHeader>
                            <SheetTitle>{t.orderDetails}</SheetTitle>
                          </SheetHeader>
                          {selectedOrder && (
                            <div className="mt-6 space-y-6 overflow-y-auto max-h-[calc(100vh-150px)]">
                              {/* Order Header */}
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold dark:text-white">
                                    {selectedOrder.orderNumber}
                                  </h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(
                                      selectedOrder.createdAt
                                    ).toLocaleString(language === 'ar' ? "ar-SA" : "en-US")}
                                  </p>
                                </div>
                                {getStatusBadge(selectedOrder.status)}
                              </div>

                              {/* Customer Info */}
                              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl space-y-3">
                                <h4 className="font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  {t.customerInfo}
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <p className="text-gray-800 dark:text-white">
                                    {selectedOrder.customer.name}
                                  </p>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    {selectedOrder.customer.email}
                                  </p>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    {selectedOrder.customer.phone}
                                  </p>
                                </div>
                              </div>

                              {/* Shipping Address */}
                              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl space-y-3">
                                <h4 className="font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {t.shippingAddress}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {selectedOrder.shippingAddress}
                                </p>
                              </div>

                              {/* Order Items */}
                              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl space-y-3">
                                <h4 className="font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                  <Package className="w-4 h-4" />
                                  {t.orderItems}
                                </h4>
                                <div className="space-y-3">
                                  {selectedOrder.items.map((item, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg"
                                    >
                                      <div>
                                        <p className="font-medium text-gray-800 dark:text-white">
                                          {item.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                          {t.quantity}: {item.quantity}
                                        </p>
                                      </div>
                                      <p className="font-medium text-gray-800 dark:text-white">
                                        {item.price * item.quantity} {t.currency}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Payment */}
                              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl space-y-3">
                                <h4 className="font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                  <DollarSign className="w-4 h-4" />
                                  {t.payment}
                                </h4>
                                <div className="flex items-center justify-between">
                                  <p className="text-gray-600 dark:text-gray-300">{t.paymentMethod}</p>
                                  <p className="font-medium text-gray-800 dark:text-white">
                                    {selectedOrder.paymentMethod}
                                  </p>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t dark:border-gray-600">
                                  <p className="font-semibold text-gray-800 dark:text-white">
                                    {t.total}
                                  </p>
                                  <p className="font-bold text-lg text-orange-600 dark:text-orange-400">
                                    {selectedOrder.total} {t.currency}
                                  </p>
                                </div>
                              </div>

                              {/* Actions */}
                              {selectedOrder.status === "pending" && (
                                <div className="flex gap-3">
                                  <Button className="flex-1 gap-2">
                                    <Package className="w-4 h-4" />
                                    {t.startProcessing}
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    className="flex-1 gap-2"
                                  >
                                    <XCircle className="w-4 h-4" />
                                    {t.cancelOrder}
                                  </Button>
                                </div>
                              )}
                              {selectedOrder.status === "processing" && (
                                <Button className="w-full gap-2">
                                  <Truck className="w-4 h-4" />
                                  {t.confirmShipping}
                                </Button>
                              )}
                              {selectedOrder.status === "shipped" && (
                                <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                                  <CheckCircle className="w-4 h-4" />
                                  {t.confirmDelivery}
                                </Button>
                              )}
                            </div>
                          )}
                        </SheetContent>
                      </Sheet>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
