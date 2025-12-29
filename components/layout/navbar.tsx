"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingCart, User, Search, Globe, Moon, Sun, LogOut, ChevronDown, Heart } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguageStore, useCartStore, useAuthStore, useWishlistStore } from "@/stores";

const t = {
  home: { en: "Home", ar: "الرئيسية" },
  categories: { en: "Categories", ar: "الفئات" },
  deals: { en: "Deals", ar: "العروض" },
  newArrivals: { en: "New Arrivals", ar: "جديدنا" },
  bestSellers: { en: "Best Sellers", ar: "الأكثر مبيعاً" },
  searchPlaceholder: { en: "Search products...", ar: "ابحث عن منتجات..." },
  login: { en: "Login", ar: "تسجيل الدخول" },
  freeShipping: { en: "Free shipping on orders over $50", ar: "شحن مجاني للطلبات فوق 50$" },
  darkMode: { en: "Dark Mode", ar: "الوضع الداكن" },
  language: { en: "Language", ar: "اللغة" },
};

const navLinks = [
  { href: "/", label: t.home },
  { href: "/categories", label: t.categories },
  { href: "/deals", label: t.deals },
  { href: "/new-arrivals", label: t.newArrivals },
  { href: "/best-sellers", label: t.bestSellers },
];

export function Navbar() {
  const { language, toggleLanguage } = useLanguageStore();
  const { theme, setTheme } = useTheme();
  const totalItems = useCartStore((state) => state.totalItems);
  const wishlistItems = useWishlistStore((state) => state.items);
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-linear-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                {language === "ar" ? "اما" : "Ama"}
              </span>
              <span className="text-2xl font-bold bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                {language === "ar" ? "نون" : "noon"}
              </span>
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
              <Input
                type="search"
                placeholder={t.searchPlaceholder[language]}
                className={`w-full ${language === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"}`}
                dir={language === "ar" ? "rtl" : "ltr"}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label[language]}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="hidden sm:flex"
              title={language === "en" ? "العربية" : "English"}
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">Toggle language</span>
            </Button>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden sm:flex"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Wishlist */}
            <Link href="/wishlist" aria-label={language === "ar" ? "قائمة الرغبات" : "Wishlist"}>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-hidden="true"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                    {wishlistItems.length > 99 ? "99+" : wishlistItems.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart" aria-label={language === "ar" ? "سلة التسوق" : "Shopping cart"}>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-hidden="true"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-[10px] font-bold text-white flex items-center justify-center">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu / Login Button */}
            {isAuthenticated && user ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label={language === "ar" ? "قائمة المستخدم" : "User menu"}
                  aria-expanded={showUserMenu}
                >
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                    {user.firstName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium hidden md:block">
                    {user.firstName}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showUserMenu ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl shadow-lg border z-50 overflow-hidden">
                      <div className="p-3 border-b bg-muted/50">
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                        >
                          <User className="h-4 w-4" />
                          <span>{language === "ar" ? "حسابي" : "My Account"}</span>
                        </Link>
                        <Link
                          href="/orders"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span>{language === "ar" ? "طلباتي" : "My Orders"}</span>
                        </Link>
                      </div>
                      <div className="border-t py-2">
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="flex items-center gap-3 px-4 py-2 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{language === "ar" ? "تسجيل الخروج" : "Sign Out"}</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button variant="outline" className="hidden sm:flex gap-2">
                  <User className="h-4 w-4" />
                  <span>{t.login[language]}</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={language === "ar" ? "right" : "left"} className="w-[85vw] max-w-[320px] p-0 overflow-y-auto" dir={language === "ar" ? "rtl" : "ltr"}>
                <div className="flex flex-col gap-6 p-6 pt-12">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${language === "ar" ? "right-3" : "left-3"}`} />
                    <Input
                      type="search"
                      placeholder={t.searchPlaceholder[language]}
                      className={`w-full ${language === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"}`}
                      dir={language === "ar" ? "rtl" : "ltr"}
                    />
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium hover:text-orange-500 transition-colors"
                      >
                        {link.label[language]}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Actions */}
                  <div className="flex flex-col gap-3 pt-4 border-t">
                    {isAuthenticated && user ? (
                      <>
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                            {user.firstName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <Link href="/profile" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full gap-2">
                            <User className="h-4 w-4" />
                            <span>{language === "ar" ? "حسابي" : "My Account"}</span>
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          className="w-full gap-2"
                          onClick={() => {
                            logout();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{language === "ar" ? "تسجيل الخروج" : "Sign Out"}</span>
                        </Button>
                      </>
                    ) : (
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button className="w-full gap-2">
                          <User className="h-4 w-4" />
                          <span>{t.login[language]}</span>
                        </Button>
                      </Link>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {t.darkMode[language]}
                      </span>
                      <Button variant="ghost" size="icon" onClick={toggleTheme}>
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {t.language[language]}
                      </span>
                      <Button variant="ghost" size="sm" onClick={toggleLanguage}>
                        <Globe className={`h-4 w-4 ${language === "ar" ? "ml-2" : "mr-2"}`} />
                        {language === "en" ? "العربية" : "English"}
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
