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

  const isRTL = language === "ar";

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
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.accountType !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {t.unauthorized[language]}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
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
      <div className="p-6 border-b dark:border-gray-700">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-800 dark:text-white">Amanoon</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t.controlPanel[language]}</p>
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
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{language === "ar" ? link.labelAr : link.labelEn}</span>
            </Link>
          );
        })}
      </nav>

      {/* Theme & Language Toggles */}
      <div className="px-4 py-3 border-t dark:border-gray-700 flex items-center gap-2">
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
      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-gray-600 dark:text-gray-300 font-semibold">
              {user?.firstName?.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-800 dark:text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir={isRTL ? "rtl" : "ltr"}>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:fixed lg:inset-y-0 ${isRTL ? "lg:right-0 lg:border-l" : "lg:left-0 lg:border-r"} lg:flex lg:w-72 lg:flex-col bg-white dark:bg-gray-800 shadow-sm`}>
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 py-3 flex items-center justify-between">
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
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <span className="font-bold text-gray-800 dark:text-white">{t.controlPanel[language]}</span>
        </Link>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className={`absolute -top-1 ${isRTL ? "-right-1" : "-left-1"} w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center`}>
            3
          </span>
        </Button>
      </div>

      {/* Main Content */}
      <main className={isRTL ? "lg:mr-72" : "lg:ml-72"}>
        {/* Top Bar - Desktop */}
        <header className="hidden lg:flex items-center justify-between bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
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
            <div className="relative">
              <Search className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
              <Input
                placeholder={t.search[language]}
                className={`${isRTL ? "pr-10" : "pl-10"} w-64 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600`}
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className={`absolute -top-1 ${isRTL ? "-right-1" : "-left-1"} w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center`}>
                3
              </span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}
