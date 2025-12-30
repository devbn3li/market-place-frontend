"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore, useLanguageStore } from "@/stores";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Globe,
  Moon,
  Sun,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const sidebarLinks = [
  {
    href: "/admin",
    icon: LayoutDashboard,
    labelAr: "لوحة التحكم",
    labelEn: "Dashboard",
  },
  {
    href: "/admin/users",
    icon: Users,
    labelAr: "المستخدمين",
    labelEn: "Users",
  },
  {
    href: "/admin/sellers",
    icon: Store,
    labelAr: "البائعين",
    labelEn: "Sellers",
  },
  {
    href: "/admin/products",
    icon: Package,
    labelAr: "المنتجات",
    labelEn: "Products",
  },
  {
    href: "/admin/orders",
    icon: ShoppingCart,
    labelAr: "الطلبات",
    labelEn: "Orders",
  },
  {
    href: "/admin/settings",
    icon: Settings,
    labelAr: "الإعدادات",
    labelEn: "Settings",
  },
];

// Searchable items for admin
const searchableItems = [
  { href: "/admin", labelAr: "لوحة التحكم", labelEn: "Dashboard", keywordsAr: "رئيسية احصائيات", keywordsEn: "home stats overview" },
  { href: "/admin/users", labelAr: "المستخدمين", labelEn: "Users", keywordsAr: "عملاء مستخدم حساب", keywordsEn: "customers accounts members" },
  { href: "/admin/sellers", labelAr: "البائعين", labelEn: "Sellers", keywordsAr: "متجر تاجر بائع", keywordsEn: "vendors merchants stores" },
  { href: "/admin/products", labelAr: "المنتجات", labelEn: "Products", keywordsAr: "سلع منتج مخزون", keywordsEn: "items inventory goods" },
  { href: "/admin/orders", labelAr: "الطلبات", labelEn: "Orders", keywordsAr: "طلب شراء مبيعات", keywordsEn: "purchases sales transactions" },
  { href: "/admin/settings", labelAr: "الإعدادات", labelEn: "Settings", keywordsAr: "تكوين خيارات", keywordsEn: "configuration options preferences" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { language, toggleLanguage } = useLanguageStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const isRTL = language === "ar";

  // Filter search results
  const searchResults = searchQuery.trim()
    ? searchableItems.filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.labelAr.includes(searchQuery) ||
        item.labelEn.toLowerCase().includes(query) ||
        item.keywordsAr.includes(searchQuery) ||
        item.keywordsEn.toLowerCase().includes(query)
      );
    })
    : [];

  const handleSearchSelect = (href: string) => {
    router.push(href);
    setSearchQuery("");
    setSearchOpen(false);
  };

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "order" as const,
      titleAr: "طلب جديد",
      titleEn: "New Order",
      messageAr: "تم استلام طلب جديد #12345",
      messageEn: "New order #12345 received",
      time: "5 min",
      read: false,
    },
    {
      id: 2,
      type: "seller" as const,
      titleAr: "بائع جديد",
      titleEn: "New Seller",
      messageAr: "طلب انضمام بائع جديد بانتظار الموافقة",
      messageEn: "New seller application awaiting approval",
      time: "15 min",
      read: false,
    },
    {
      id: 3,
      type: "alert" as const,
      titleAr: "تنبيه مخزون",
      titleEn: "Stock Alert",
      messageAr: "5 منتجات على وشك النفاذ",
      messageEn: "5 products are running low on stock",
      time: "1 hr",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: "order" | "seller" | "alert") => {
    switch (type) {
      case "order":
        return <ShoppingCart className="w-4 h-4 text-green-500" />;
      case "seller":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case "alert":
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const t = {
    unauthorized: { ar: "غير مصرح", en: "Unauthorized" },
    mustBeAdmin: {
      ar: "يجب أن تكون مسؤولاً للوصول لهذه الصفحة",
      en: "You must be an admin to access this page",
    },
    login: { ar: "تسجيل الدخول", en: "Login" },
    controlPanel: { ar: "لوحة التحكم", en: "Control Panel" },
    logout: { ar: "تسجيل الخروج", en: "Sign Out" },
    backToSite: { ar: "العودة للموقع", en: "Back to Site" },
    search: { ar: "بحث...", en: "Search..." },
    notifications: { ar: "الإشعارات", en: "Notifications" },
    markAllRead: { ar: "تحديد الكل كمقروء", en: "Mark all as read" },
    noNotifications: { ar: "لا توجد إشعارات", en: "No notifications" },
    viewAll: { ar: "عرض الكل", en: "View All" },
  };

  useEffect(() => {
    setMounted(true);
    useAuthStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (mounted) {
      // Check if user is admin
      if (!isAuthenticated || user?.accountType !== "admin") {
        router.push("/login");
      }
    }
  }, [mounted, isAuthenticated, user, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.accountType !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {t.unauthorized[language]}
          </h1>
          <p className="text-gray-600 dark:text-white/60 mb-4">
            {t.mustBeAdmin[language]}
          </p>
          <Link href="/login">
            <Button>{t.login[language]}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-3 border-b dark:border-white/15">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Amanoon" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-800 dark:text-white">Amanoon</h1>
            <p className="text-xs text-gray-500 dark:text-white/60">{t.controlPanel[language]}</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                ? "bg-orange-500 text-white shadow-md"
                : "text-gray-600 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{language === "ar" ? link.labelAr : link.labelEn}</span>
            </Link>
          );
        })}
      </nav>

      {/* Theme & Language Toggles */}
      <div className="px-4 py-3 border-t dark:border-white/15 flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleLanguage}
          className="flex-1"
          title={language === "ar" ? "English" : "العربية"}
        >
          <Globe className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex-1"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>

      {/* User Info & Logout */}
      <div className="p-4 border-t dark:border-white/15">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 bg-gray-200 dark:bg-black/80 rounded-full flex items-center justify-center">
            <span className="text-gray-600 dark:text-white/80 font-semibold">
              {user?.firstName?.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-800 dark:text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 dark:text-white/60 truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          {t.logout[language]}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black" dir={isRTL ? "rtl" : "ltr"}>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:fixed lg:inset-y-0 ${isRTL ? "lg:right-0 lg:border-l" : "lg:left-0 lg:border-r"} lg:flex lg:w-72 lg:flex-col bg-white dark:bg-black shadow-sm`}>
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white dark:bg-black border-b dark:border-white/15 px-4 py-3 flex items-center justify-between">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side={isRTL ? "right" : "left"} className="w-72 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>

        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Amanoon" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-gray-800 dark:text-white">{t.controlPanel[language]}</span>
        </Link>

        {/* Notifications Button - Mobile */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className={`absolute -top-1 ${isRTL ? "-right-1" : "-left-1"} w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center`}>
                {unreadCount}
              </span>
            )}
          </Button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setNotificationsOpen(false)}
              />
              <div className={`absolute top-full ${isRTL ? 'left-0' : 'right-0'} mt-2 w-80 bg-white dark:bg-black rounded-xl shadow-xl border dark:border-white/15 z-50 overflow-hidden`}>
                <div className="flex items-center justify-between p-4 border-b dark:border-white/15">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{t.notifications[language]}</h3>
                  <button className="text-xs text-orange-500 hover:text-orange-600">{t.markAllRead[language]}</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer border-b dark:border-white/15 last:border-b-0 ${!notification.read ? 'bg-orange-50/50 dark:bg-orange-900/10' : ''}`}
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-black/80 flex items-center justify-center shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-800 dark:text-white">
                            {language === 'ar' ? notification.titleAr : notification.titleEn}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-white/60 mt-0.5">
                            {language === 'ar' ? notification.messageAr : notification.messageEn}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-2"></div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500 dark:text-white/60">
                      {t.noNotifications[language]}
                    </div>
                  )}
                </div>
                <div className="p-3 border-t dark:border-white/15">
                  <Button variant="ghost" className="w-full text-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20">
                    {t.viewAll[language]}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className={isRTL ? "lg:mr-72" : "lg:ml-72"}>
        {/* Top Bar - Desktop */}
        <header className="hidden lg:flex items-center justify-between bg-white dark:bg-black border-b dark:border-white/15 px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-gray-200"
            >
              {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <span className="text-sm">{t.backToSite[language]}</span>
            </Link>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-600"></div>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
              {sidebarLinks.find((l) => l.href === pathname)?.[isRTL ? "labelAr" : "labelEn"] ||
                t.controlPanel[language]}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Box */}
            <div className="relative">
              <Search className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10`} />
              <Input
                placeholder={t.search[language]}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                className={`${isRTL ? "pr-10" : "pl-10"} w-64 bg-gray-50 dark:bg-black/80 border-gray-200 dark:border-white/20`}
              />

              {/* Search Results Dropdown */}
              {searchOpen && searchQuery.trim() && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setSearchOpen(false)}
                  />
                  <div className={`absolute top-full ${isRTL ? 'left-0' : 'right-0'} mt-2 w-72 bg-white dark:bg-black rounded-xl shadow-xl border dark:border-white/15 z-50 overflow-hidden`}>
                    {searchResults.length > 0 ? (
                      <div className="py-2">
                        {searchResults.map((item) => (
                          <button
                            key={item.href}
                            onClick={() => handleSearchSelect(item.href)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors text-start"
                          >
                            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                              <Search className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 dark:text-white">
                                {language === 'ar' ? item.labelAr : item.labelEn}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-white/50">
                                {item.href}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-gray-500 dark:text-white/50">
                        {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Notifications Button - Desktop */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className={`absolute -top-1 ${isRTL ? "-right-1" : "-left-1"} w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center`}>
                    {unreadCount}
                  </span>
                )}
              </Button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotificationsOpen(false)}
                  />
                  <div className={`absolute top-full ${isRTL ? 'left-0' : 'right-0'} mt-2 w-80 bg-white dark:bg-black rounded-xl shadow-xl border dark:border-white/15 z-50 overflow-hidden`}>
                    <div className="flex items-center justify-between p-4 border-b dark:border-white/15">
                      <h3 className="font-semibold text-gray-800 dark:text-white">{t.notifications[language]}</h3>
                      <button className="text-xs text-orange-500 hover:text-orange-600">{t.markAllRead[language]}</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer border-b dark:border-white/15 last:border-b-0 ${!notification.read ? 'bg-orange-50/50 dark:bg-orange-900/10' : ''}`}
                          >
                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-black/80 flex items-center justify-center shrink-0">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-gray-800 dark:text-white">
                                {language === 'ar' ? notification.titleAr : notification.titleEn}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-white/60 mt-0.5">
                                {language === 'ar' ? notification.messageAr : notification.messageEn}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-2"></div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-500 dark:text-white/60">
                          {t.noNotifications[language]}
                        </div>
                      )}
                    </div>
                    <div className="p-3 border-t dark:border-white/15">
                      <Button variant="ghost" className="w-full text-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20">
                        {t.viewAll[language]}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}


