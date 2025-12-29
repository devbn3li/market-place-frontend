"use client";

import { useState } from "react";
import { useLanguageStore, useAuthStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Package,
  DollarSign,
  ShoppingCart,
  Eye,
  Star,
  BarChart3,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Store,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const t = {
  sellerCenter: { en: "Seller Center", ar: "مركز البائع" },
  dashboard: { en: "Dashboard", ar: "لوحة التحكم" },
  products: { en: "Products", ar: "المنتجات" },
  orders: { en: "Orders", ar: "الطلبات" },
  analytics: { en: "Analytics", ar: "التحليلات" },
  settings: { en: "Settings", ar: "الإعدادات" },
  overview: { en: "Overview", ar: "نظرة عامة" },
  totalRevenue: { en: "Total Revenue", ar: "إجمالي الإيرادات" },
  totalSales: { en: "Total Sales", ar: "إجمالي المبيعات" },
  totalProducts: { en: "Total Products", ar: "إجمالي المنتجات" },
  totalViews: { en: "Total Views", ar: "إجمالي المشاهدات" },
  recentOrders: { en: "Recent Orders", ar: "الطلبات الأخيرة" },
  topProducts: { en: "Top Selling Products", ar: "المنتجات الأكثر مبيعاً" },
  addProduct: { en: "Add Product", ar: "إضافة منتج" },
  searchProducts: { en: "Search products...", ar: "بحث عن منتجات..." },
  noProducts: { en: "No products yet", ar: "لا توجد منتجات بعد" },
  startSelling: {
    en: "Start by adding your first product",
    ar: "ابدأ بإضافة أول منتج لك",
  },
  loginRequired: {
    en: "Please login to access Seller Center",
    ar: "يرجى تسجيل الدخول للوصول لمركز البائع",
  },
  product: { en: "Product", ar: "المنتج" },
  price: { en: "Price", ar: "السعر" },
  stock: { en: "Stock", ar: "المخزون" },
  sales: { en: "Sales", ar: "المبيعات" },
  status: { en: "Status", ar: "الحالة" },
  actions: { en: "Actions", ar: "الإجراءات" },
  active: { en: "Active", ar: "نشط" },
  draft: { en: "Draft", ar: "مسودة" },
  outOfStock: { en: "Out of Stock", ar: "نفذ من المخزون" },
  edit: { en: "Edit", ar: "تعديل" },
  delete: { en: "Delete", ar: "حذف" },
  thisMonth: { en: "This Month", ar: "هذا الشهر" },
  vsLastMonth: { en: "vs last month", ar: "مقارنة بالشهر الماضي" },
  customer: { en: "Customer", ar: "العميل" },
  date: { en: "Date", ar: "التاريخ" },
  amount: { en: "Amount", ar: "المبلغ" },
  orderStatus: { en: "Order Status", ar: "حالة الطلب" },
  pending: { en: "Pending", ar: "قيد الانتظار" },
  processing: { en: "Processing", ar: "قيد المعالجة" },
  shipped: { en: "Shipped", ar: "تم الشحن" },
  delivered: { en: "Delivered", ar: "تم التوصيل" },
  rating: { en: "Rating", ar: "التقييم" },
  views: { en: "Views", ar: "المشاهدات" },
};

// Mock data
const mockStats = {
  revenue: 12450.5,
  revenueChange: 12.5,
  sales: 145,
  salesChange: 8.2,
  products: 24,
  productsChange: 3,
  views: 8924,
  viewsChange: -2.4,
};

const mockProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    nameAr: "سماعات لاسلكية فاخرة",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    price: 299.99,
    stock: 45,
    sales: 89,
    status: "active",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    nameAr: "ساعة ذكية برو",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
    price: 399.99,
    stock: 0,
    sales: 156,
    status: "out-of-stock",
  },
  {
    id: 3,
    name: "Laptop Stand Aluminum",
    nameAr: "حامل لابتوب ألومنيوم",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop",
    price: 79.99,
    stock: 120,
    sales: 67,
    status: "active",
  },
];

const mockOrders = [
  {
    id: "AMN-12345678",
    customer: "John Doe",
    date: "2025-12-28",
    amount: 299.99,
    status: "delivered" as const,
  },
  {
    id: "AMN-12345677",
    customer: "Sarah Smith",
    date: "2025-12-27",
    amount: 399.99,
    status: "shipped" as const,
  },
  {
    id: "AMN-12345676",
    customer: "Ahmed Ali",
    customerAr: "أحمد علي",
    date: "2025-12-27",
    amount: 79.99,
    status: "processing" as const,
  },
];

const getStatusText = (status: string, language: "en" | "ar") => {
  const statusMap: { [key: string]: { en: string; ar: string } } = {
    delivered: t.delivered,
    shipped: t.shipped,
    processing: t.processing,
    pending: t.pending,
  };
  return statusMap[status]?.[language] || status;
};

export default function SellerCenterPage() {
  const { language } = useLanguageStore();
  const { isAuthenticated, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders">("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen bg-muted/30 flex items-center justify-center"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="bg-card rounded-2xl border p-8 max-w-md w-full mx-4 text-center">
          <Store className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-bold mb-2">{t.loginRequired[language]}</h2>
          <p className="text-muted-foreground mb-6">
            {language === "ar"
              ? "يجب أن يكون لديك حساب للوصول لمركز البائع"
              : "You need an account to access the Seller Center"}
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

  return (
    <div className="min-h-screen bg-muted/30" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Store className="h-6 w-6 text-orange-500" />
                {t.sellerCenter[language]}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {language === "ar" ? `مرحباً، ${user?.firstName}` : `Welcome, ${user?.firstName}`}
              </p>
            </div>
            <Link href="/sell">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                {t.addProduct[language]}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            {[
              { id: "dashboard", label: t.dashboard, icon: BarChart3 },
              { id: "products", label: t.products, icon: Package },
              { id: "orders", label: t.orders, icon: ShoppingCart },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "dashboard" | "products" | "orders")}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors ${activeTab === tab.id
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="font-medium">{tab.label[language]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: t.totalRevenue,
                  value: `$${mockStats.revenue.toLocaleString()}`,
                  change: mockStats.revenueChange,
                  icon: DollarSign,
                  color: "text-green-500",
                  bgColor: "bg-green-100 dark:bg-green-900/30",
                },
                {
                  label: t.totalSales,
                  value: mockStats.sales,
                  change: mockStats.salesChange,
                  icon: ShoppingCart,
                  color: "text-blue-500",
                  bgColor: "bg-blue-100 dark:bg-blue-900/30",
                },
                {
                  label: t.totalProducts,
                  value: mockStats.products,
                  change: mockStats.productsChange,
                  icon: Package,
                  color: "text-purple-500",
                  bgColor: "bg-purple-100 dark:bg-purple-900/30",
                },
                {
                  label: t.totalViews,
                  value: mockStats.views.toLocaleString(),
                  change: mockStats.viewsChange,
                  icon: Eye,
                  color: "text-orange-500",
                  bgColor: "bg-orange-100 dark:bg-orange-900/30",
                },
              ].map((stat, i) => (
                <div key={i} className="bg-card rounded-xl border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm font-medium ${stat.change >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                    >
                      {stat.change >= 0 ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      {Math.abs(stat.change)}%
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label[language]}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t.thisMonth[language]}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-card rounded-xl border p-6">
                <h3 className="text-lg font-bold mb-4">{t.recentOrders[language]}</h3>
                <div className="space-y-3">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {language === "ar" && order.customerAr ? order.customerAr : order.customer}
                        </p>
                        <p className="text-xs text-muted-foreground">{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">${order.amount}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${order.status === "delivered"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30"
                            : order.status === "shipped"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30"
                            }`}
                        >
                          {getStatusText(order.status, language)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-card rounded-xl border p-6">
                <h3 className="text-lg font-bold mb-4">{t.topProducts[language]}</h3>
                <div className="space-y-3">
                  {mockProducts.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {language === "ar" ? product.nameAr : product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.sales} {t.sales[language].toLowerCase()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">${product.price}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                          4.8
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Search & Filters */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchProducts[language]}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                {language === "ar" ? "تصفية" : "Filter"}
              </Button>
            </div>

            {/* Products Table */}
            {mockProducts.length === 0 ? (
              <div className="bg-card rounded-xl border p-12 text-center">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-bold mb-2">{t.noProducts[language]}</h3>
                <p className="text-muted-foreground mb-6">{t.startSelling[language]}</p>
                <Link href="/sell">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    {t.addProduct[language]}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="bg-card rounded-xl border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium text-sm">{t.product[language]}</th>
                        <th className="text-left p-4 font-medium text-sm">{t.price[language]}</th>
                        <th className="text-left p-4 font-medium text-sm">{t.stock[language]}</th>
                        <th className="text-left p-4 font-medium text-sm">{t.sales[language]}</th>
                        <th className="text-left p-4 font-medium text-sm">{t.status[language]}</th>
                        <th className="text-left p-4 font-medium text-sm">{t.actions[language]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockProducts.map((product) => (
                        <tr key={product.id} className="border-t">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-medium text-sm">
                                  {language === "ar" ? product.nameAr : product.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-bold">${product.price}</span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`${product.stock === 0 ? "text-red-500" : "text-muted-foreground"
                                }`}
                            >
                              {product.stock}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="text-muted-foreground">{product.sales}</span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${product.status === "active"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30"
                                }`}
                            >
                              {product.status === "active" ? t.active[language] : t.outOfStock[language]}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="bg-card rounded-xl border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-sm">{language === "ar" ? "رقم الطلب" : "Order ID"}</th>
                      <th className="text-left p-4 font-medium text-sm">{t.customer[language]}</th>
                      <th className="text-left p-4 font-medium text-sm">{t.date[language]}</th>
                      <th className="text-left p-4 font-medium text-sm">{t.amount[language]}</th>
                      <th className="text-left p-4 font-medium text-sm">{t.orderStatus[language]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="border-t">
                        <td className="p-4">
                          <span className="font-mono text-sm">{order.id}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-medium">
                            {language === "ar" && order.customerAr ? order.customerAr : order.customer}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-muted-foreground">{order.date}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold">${order.amount}</span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-medium ${order.status === "delivered"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30"
                              : order.status === "shipped"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30"
                              }`}
                          >
                            {getStatusText(order.status, language)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
