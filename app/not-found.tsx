"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, ShoppingBag } from "lucide-react";
import { useLanguageStore } from "@/stores";

export default function NotFound() {
  const { language } = useLanguageStore();

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center px-4"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="text-center max-w-lg">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-black text-muted-foreground/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-2xl shadow-lg transform -rotate-6 animate-pulse">
              <span className="text-2xl font-bold">
                {language === "ar" ? "عذراً!" : "Oops!"}
              </span>
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {language === "ar"
            ? "الصفحة غير موجودة"
            : "Page Not Found"}
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          {language === "ar"
            ? "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها أو حذفها."
            : "Sorry, the page you're looking for doesn't exist or has been moved."}
        </p>

        {/* Illustration */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-orange-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold animate-bounce">
              ?
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600 gap-2 px-6 py-6 text-lg w-full sm:w-auto">
              <Home className="h-5 w-5" />
              {language === "ar" ? "الرئيسية" : "Go Home"}
            </Button>
          </Link>
          <Link href="/categories">
            <Button variant="outline" className="gap-2 px-6 py-6 text-lg w-full sm:w-auto">
              <Search className="h-5 w-5" />
              {language === "ar" ? "تصفح المنتجات" : "Browse Products"}
            </Button>
          </Link>
        </div>

        {/* Back Link */}
        <button
          onClick={() => window.history.back()}
          className="mt-6 text-muted-foreground hover:text-orange-500 transition-colors flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {language === "ar" ? "العودة للصفحة السابقة" : "Go back to previous page"}
        </button>

        {/* Help Text */}
        <p className="mt-8 text-sm text-muted-foreground">
          {language === "ar" ? (
            <>
              هل تحتاج مساعدة؟{" "}
              <Link href="/contact" className="text-orange-500 hover:underline">
                تواصل معنا
              </Link>
            </>
          ) : (
            <>
              Need help?{" "}
              <Link href="/contact" className="text-orange-500 hover:underline">
                Contact us
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
