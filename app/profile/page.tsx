"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguageStore, useAuthStore } from "@/stores";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Bell,
  Shield,
} from "lucide-react";

export default function ProfilePage() {
  const { language } = useLanguageStore();
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  const router = useRouter();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Load profile photo from localStorage
  useEffect(() => {
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
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

  const menuItems = [
    {
      icon: Package,
      titleEn: "My Orders",
      titleAr: "طلباتي",
      descEn: "Track, return, or buy again",
      descAr: "تتبع، إرجاع، أو شراء مرة أخرى",
      href: "/orders",
      color: "orange",
    },
    {
      icon: Heart,
      titleEn: "Wishlist",
      titleAr: "قائمة الرغبات",
      descEn: "Your favorite items",
      descAr: "منتجاتك المفضلة",
      href: "/wishlist",
      color: "red",
    },
    {
      icon: MapPin,
      titleEn: "Addresses",
      titleAr: "العناوين",
      descEn: "Manage delivery addresses",
      descAr: "إدارة عناوين التوصيل",
      href: "/addresses",
      color: "blue",
    },
    {
      icon: CreditCard,
      titleEn: "Payment Methods",
      titleAr: "طرق الدفع",
      descEn: "Manage saved cards",
      descAr: "إدارة البطاقات المحفوظة",
      href: "/payment-methods",
      color: "green",
    },
    {
      icon: Bell,
      titleEn: "Notifications",
      titleAr: "الإشعارات",
      descEn: "Manage your notifications",
      descAr: "إدارة إشعاراتك",
      href: "/notifications",
      color: "purple",
    },
    {
      icon: Shield,
      titleEn: "Security",
      titleAr: "الأمان",
      descEn: "Password & security settings",
      descAr: "إعدادات كلمة المرور والأمان",
      href: "/security",
      color: "yellow",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; darkBg: string } } = {
      orange: { bg: "bg-orange-100", text: "text-orange-500", darkBg: "dark:bg-orange-500/20" },
      red: { bg: "bg-red-100", text: "text-red-500", darkBg: "dark:bg-red-500/20" },
      blue: { bg: "bg-blue-100", text: "text-blue-500", darkBg: "dark:bg-blue-500/20" },
      green: { bg: "bg-green-100", text: "text-green-500", darkBg: "dark:bg-green-500/20" },
      purple: { bg: "bg-purple-100", text: "text-purple-500", darkBg: "dark:bg-purple-500/20" },
      yellow: { bg: "bg-yellow-100", text: "text-yellow-600", darkBg: "dark:bg-yellow-500/20" },
    };
    return colors[color] || colors.orange;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-linear-to-br from-orange-500 via-orange-400 to-yellow-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold overflow-hidden">
              {profilePhoto ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  {user.firstName.charAt(0).toUpperCase()}
                  {user.lastName.charAt(0).toUpperCase()}
                </>
              )}
            </div>

            {/* User Info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">
                {language === "ar" ? "مرحباً" : "Hello"}, {user.firstName}!
              </h1>
              <p className="text-white/90 mt-1">{user.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-3 text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {language === "ar" ? "عضو منذ" : "Member since"} {formatDate(user.createdAt)}
                </span>
              </div>
            </div>

            {/* Settings Button */}
            <div className="md:ml-auto">
              <Link href="/settings">
                <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Settings className="h-4 w-4 mr-2" />
                  {language === "ar" ? "الإعدادات" : "Settings"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - User Details */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-orange-500" />
                {language === "ar" ? "معلومات الحساب" : "Account Information"}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {language === "ar" ? "الاسم الكامل" : "Full Name"}
                    </p>
                    <p className="font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {language === "ar" ? "البريد الإلكتروني" : "Email"}
                    </p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {language === "ar" ? "رقم الهاتف" : "Phone"}
                    </p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full mt-6 text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {language === "ar" ? "تسجيل الخروج" : "Sign Out"}
              </Button>
            </div>
          </div>

          {/* Right Column - Menu Items */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              {menuItems.map((item, index) => {
                const colors = getColorClasses(item.color);
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="bg-card rounded-xl p-5 shadow-sm border hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${colors.bg} ${colors.darkBg}`}>
                        <item.icon className={`h-6 w-6 ${colors.text}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold group-hover:text-orange-500 transition-colors">
                          {language === "ar" ? item.titleAr : item.titleEn}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === "ar" ? item.descAr : item.descEn}
                        </p>
                      </div>
                      <ChevronRight className={`h-5 w-5 text-muted-foreground group-hover:text-orange-500 transition-colors ${language === "ar" ? "rotate-180" : ""}`} />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Recent Orders Preview */}
            <div className="mt-8 bg-card rounded-2xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-orange-500" />
                  {language === "ar" ? "الطلبات الأخيرة" : "Recent Orders"}
                </h2>
                <Link href="/orders" className="text-orange-500 text-sm hover:underline">
                  {language === "ar" ? "عرض الكل" : "View All"}
                </Link>
              </div>
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>
                  {language === "ar"
                    ? "لا توجد طلبات حتى الآن"
                    : "No orders yet"}
                </p>
                <Link href="/">
                  <Button className="mt-4 bg-orange-500 hover:bg-orange-600">
                    {language === "ar" ? "ابدأ التسوق" : "Start Shopping"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
