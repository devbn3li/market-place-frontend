"use client";

import { useEffect, useState } from "react";
import { useAuthStore, useLanguageStore } from "@/stores";
import {
  Users,
  Store,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface StatCard {
  titleAr: string;
  titleEn: string;
  value: string | number;
  change: number;
  changeLabelAr: string;
  changeLabelEn: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  iconBgDark: string;
}

interface RecentActivity {
  id: string;
  type: "order" | "user" | "seller" | "product";
  messageAr: string;
  messageEn: string;
  timeAr: string;
  timeEn: string;
  status: "success" | "warning" | "error" | "info";
}

export default function AdminDashboard() {
  const { getAllUsers } = useAuthStore();
  const { language } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    pendingSellers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const t = {
    welcome: { ar: "مرحباً بك في لوحة التحكم! 👋", en: "Welcome to the Dashboard! 👋" },
    overview: { ar: "إليك نظرة عامة على أداء منصتك اليوم", en: "Here's an overview of your platform's performance today" },
    recentActivity: { ar: "النشاط الأخير", en: "Recent Activity" },
    quickActions: { ar: "إجراءات سريعة", en: "Quick Actions" },
    reviewSellers: { ar: "مراجعة طلبات البائعين", en: "Review Seller Applications" },
    manageUsers: { ar: "إدارة المستخدمين", en: "Manage Users" },
    manageProducts: { ar: "إدارة المنتجات", en: "Manage Products" },
    viewOrders: { ar: "عرض الطلبات", en: "View Orders" },
    salesStats: { ar: "إحصائيات المبيعات", en: "Sales Statistics" },
    userDistribution: { ar: "توزيع المستخدمين", en: "User Distribution" },
    salesChart: { ar: "رسم بياني للمبيعات", en: "Sales Chart" },
    usersChart: { ar: "رسم بياني للمستخدمين", en: "Users Chart" },
    currency: { ar: "ر.س", en: "SAR" },
  };

  useEffect(() => {
    setMounted(true);
    useAuthStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (mounted) {
      const users = getAllUsers();
      const sellers = users.filter((u) => u.accountType === "seller");
      const pendingSellers = users.filter(
        (u) => u.sellerInfo?.status === "pending"
      );

      setStats({
        totalUsers: users.length,
        totalSellers: sellers.length,
        pendingSellers: pendingSellers.length,
        totalProducts: 156, // Mock data
        totalOrders: 1234, // Mock data
        totalRevenue: 125600, // Mock data
      });
    }
  }, [mounted, getAllUsers]);

  const statCards: StatCard[] = [
    {
      titleAr: "إجمالي المستخدمين",
      titleEn: "Total Users",
      value: stats.totalUsers,
      change: 12.5,
      changeLabelAr: "من الشهر الماضي",
      changeLabelEn: "from last month",
      icon: Users,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      iconBgDark: "dark:bg-blue-900/30",
    },
    {
      titleAr: "البائعين النشطين",
      titleEn: "Active Sellers",
      value: stats.totalSellers,
      change: 8.2,
      changeLabelAr: "من الشهر الماضي",
      changeLabelEn: "from last month",
      icon: Store,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      iconBgDark: "dark:bg-green-900/30",
    },
    {
      titleAr: "طلبات البائعين المعلقة",
      titleEn: "Pending Seller Requests",
      value: stats.pendingSellers,
      change: -5,
      changeLabelAr: "من الشهر الماضي",
      changeLabelEn: "from last month",
      icon: Clock,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      iconBgDark: "dark:bg-orange-900/30",
    },
    {
      titleAr: "إجمالي المنتجات",
      titleEn: "Total Products",
      value: stats.totalProducts,
      change: 15.3,
      changeLabelAr: "من الشهر الماضي",
      changeLabelEn: "from last month",
      icon: Package,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      iconBgDark: "dark:bg-purple-900/30",
    },
    {
      titleAr: "إجمالي الطلبات",
      titleEn: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      change: 22.4,
      changeLabelAr: "من الشهر الماضي",
      changeLabelEn: "from last month",
      icon: ShoppingCart,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-100",
      iconBgDark: "dark:bg-indigo-900/30",
    },
    {
      titleAr: "إجمالي الإيرادات",
      titleEn: "Total Revenue",
      value: `${stats.totalRevenue.toLocaleString()} ${t.currency[language]}`,
      change: 18.7,
      changeLabelAr: "من الشهر الماضي",
      changeLabelEn: "from last month",
      icon: DollarSign,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
      iconBgDark: "dark:bg-emerald-900/30",
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      type: "seller",
      messageAr: "طلب بائع جديد من أحمد محمد",
      messageEn: "New seller request from Ahmed Mohamed",
      timeAr: "منذ 5 دقائق",
      timeEn: "5 minutes ago",
      status: "warning",
    },
    {
      id: "2",
      type: "order",
      messageAr: "طلب جديد #12345 بقيمة 599 ر.س",
      messageEn: "New order #12345 worth 599 SAR",
      timeAr: "منذ 15 دقيقة",
      timeEn: "15 minutes ago",
      status: "success",
    },
    {
      id: "3",
      type: "user",
      messageAr: "مستخدم جديد سجل في المنصة",
      messageEn: "New user registered on the platform",
      timeAr: "منذ 30 دقيقة",
      timeEn: "30 minutes ago",
      status: "info",
    },
    {
      id: "4",
      type: "product",
      messageAr: "منتج جديد أضافه البائع Store XYZ",
      messageEn: "New product added by seller Store XYZ",
      timeAr: "منذ ساعة",
      timeEn: "1 hour ago",
      status: "info",
    },
    {
      id: "5",
      type: "seller",
      messageAr: "تم رفض طلب البائع - وثائق غير مكتملة",
      messageEn: "Seller request rejected - incomplete documents",
      timeAr: "منذ ساعتين",
      timeEn: "2 hours ago",
      status: "error",
    },
  ];

  const getStatusIcon = (status: RecentActivity["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  if (!mounted) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">{t.welcome[language]}</h1>
        <p className="text-orange-100">
          {t.overview[language]}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {language === "ar" ? stat.titleAr : stat.titleEn}
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.iconBg} ${stat.iconBgDark}`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {stat.change > 0 ? (
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+{stat.change}%</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600 text-sm">
                  <ArrowDownRight className="w-4 h-4" />
                  <span>{stat.change}%</span>
                </div>
              )}
              <span className="text-xs text-gray-400">
                {language === "ar" ? stat.changeLabelAr : stat.changeLabelEn}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {t.recentActivity[language]}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {getStatusIcon(activity.status)}
                  <div className="flex-1">
                    <p className="text-gray-800 dark:text-gray-200">
                      {language === "ar" ? activity.messageAr : activity.messageEn}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {language === "ar" ? activity.timeAr : activity.timeEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {t.quickActions[language]}
            </h2>
          </div>
          <div className="p-6 space-y-3">
            <Link href="/admin/sellers" className="block">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12"
              >
                <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded">
                  <Store className="w-4 h-4 text-orange-600" />
                </div>
                <span>{t.reviewSellers[language]}</span>
                {stats.pendingSellers > 0 && (
                  <span className={`${language === "ar" ? "mr-auto" : "ml-auto"} bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full`}>
                    {stats.pendingSellers}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/admin/users" className="block">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12"
              >
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <span>{t.manageUsers[language]}</span>
              </Button>
            </Link>
            <Link href="/admin/products" className="block">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12"
              >
                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded">
                  <Package className="w-4 h-4 text-purple-600" />
                </div>
                <span>{t.manageProducts[language]}</span>
              </Button>
            </Link>
            <Link href="/admin/orders" className="block">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12"
              >
                <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded">
                  <ShoppingCart className="w-4 h-4 text-indigo-600" />
                </div>
                <span>{t.viewOrders[language]}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Charts Section (Placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {t.salesStats[language]}
          </h2>
          <div className="h-64 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <TrendingUp className="w-12 h-12 mx-auto mb-2" />
              <p>{t.salesChart[language]}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {t.userDistribution[language]}
          </h2>
          <div className="h-64 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-2" />
              <p>{t.usersChart[language]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
