"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import Link from "next/link";
import { useLanguageStore } from "@/stores";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { language } = useLanguageStore();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center px-4"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="flex flex-col items-center justify-center text-center max-w-lg">
        {/* Error Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white animate-bounce">
            <Bug className="w-5 h-5" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {language === "ar" ? "حدث خطأ!" : "Something went wrong!"}
        </h1>
        <p className="text-muted-foreground mb-6 text-lg">
          {language === "ar"
            ? "عذراً، حدث خطأ غير متوقع. نحن نعمل على إصلاحه."
            : "Sorry, an unexpected error occurred. We're working on fixing it."}
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="w-full mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-left">
            <p className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-muted-foreground mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <Button
            onClick={reset}
            className="bg-orange-500 hover:bg-orange-600 gap-2 px-6 py-6 text-lg"
          >
            <RefreshCw className="h-5 w-5" />
            {language === "ar" ? "حاول مرة أخرى" : "Try Again"}
          </Button>
          <Link href="/">
            <Button variant="outline" className="gap-2 px-6 py-6 text-lg w-full">
              <Home className="h-5 w-5" />
              {language === "ar" ? "الرئيسية" : "Go Home"}
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-muted-foreground">
          {language === "ar" ? (
            <>
              إذا استمرت المشكلة،{" "}
              <Link href="/contact" className="text-orange-500 hover:underline">
                تواصل معنا
              </Link>
            </>
          ) : (
            <>
              If the problem persists,{" "}
              <Link href="/contact" className="text-orange-500 hover:underline">
                contact us
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
