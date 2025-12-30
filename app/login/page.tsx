"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, ArrowRight, Loader2, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { useLanguageStore, useAuthStore } from "@/stores";
import { toast } from "sonner";

// Demo Banner Component
const DemoBanner = ({ language }: { language: "en" | "ar" }) => (
  <div className="bg-amber-500/10 border-b border-amber-500/20">
    <div className="container mx-auto px-4 py-2">
      <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <p className="text-xs sm:text-sm text-center">
          {language === "ar"
            ? " موقع عرض توضيحي - لا يتم تخزين أي بيانات حقيقية"
            : " Demo Site - No real data is stored"}
        </p>
      </div>
    </div>
  </div>
);

const t = {
  welcomeBack: { en: "Welcome Back", ar: "مرحباً بعودتك" },
  signInToContinue: { en: "Sign in to continue shopping", ar: "سجل الدخول لمتابعة التسوق" },
  emailAddress: { en: "Email Address", ar: "البريد الإلكتروني" },
  enterYourEmailPlaceholder: { en: "Enter your email", ar: "أدخل بريدك الإلكتروني" },
  password: { en: "Password", ar: "كلمة المرور" },
  enterYourPasswordPlaceholder: { en: "Enter your password", ar: "أدخل كلمة المرور" },
  enterYourPassword: { en: "Enter your password", ar: "أدخل كلمة المرور" },
  forgotPassword: { en: "Forgot password?", ar: "نسيت كلمة المرور؟" },
  signIn: { en: "Sign In", ar: "تسجيل الدخول" },
  noAccount: { en: "Don't have an account?", ar: "ليس لديك حساب؟" },
  createAccount: { en: "Create Account", ar: "إنشاء حساب" },
  orContinueWith: { en: "Or continue with", ar: "أو تابع مع" },
  rememberMe: { en: "Remember me", ar: "تذكرني" },
  dontHaveAccount: { en: "Don't have an account?", ar: "ليس لديك حساب؟" },
  signUpForFree: { en: "Sign up for free", ar: "سجل مجاناً" },
};

export default function LoginPage() {
  const { language } = useLanguageStore();
  const { login } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Load saved email on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("amanoon-remembered-email");
      if (savedEmail) {
        setFormData((prev) => ({ ...prev, email: savedEmail }));
        setRememberMe(true);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Save or remove email based on remember me
      if (rememberMe) {
        localStorage.setItem("amanoon-remembered-email", formData.email);
      } else {
        localStorage.removeItem("amanoon-remembered-email");
      }
      toast.success(language === "ar" ? "تم تسجيل الدخول بنجاح!" : "Login successful!");
      router.push("/profile");
    } else {
      toast.error(
        language === "ar"
          ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
          : "Invalid email or password"
      );
    }

    setIsLoading(false);
  };

  return (
    <>
      <DemoBanner language={language} />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link href="/" className="inline-block mb-6">
              <span className="text-4xl font-bold bg-linear-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                {language === "ar" ? "امانون" : "Amanoon"}
              </span>
            </Link>
            <h2 className="text-2xl font-bold">{t.welcomeBack[language]}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.signInToContinue[language]}
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-card rounded-2xl shadow-lg border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t.emailAddress[language]}
                </label>
                <div className="relative">
                  <Mail className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground`} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.enterYourEmailPlaceholder[language]}
                    className={language === "ar" ? "pr-10" : "pl-10"}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    {t.password[language]}
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-orange-500 hover:underline"
                  >
                    {t.forgotPassword[language]}
                  </Link>
                </div>
                <div className="relative">
                  <Lock className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground`} />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={t.enterYourPassword[language]}
                    className={language === "ar" ? "pr-10 pl-10" : "pl-10 pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${language === "ar" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors`}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 accent-orange-500"
                />
                <label htmlFor="remember-me" className={`${language === "ar" ? "mr-2" : "ml-2"} text-sm text-muted-foreground cursor-pointer`}>
                  {t.rememberMe[language]}
                </label>
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={isLoading} className="w-full bg-orange-500 hover:bg-orange-600">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {language === "ar" ? "جاري تسجيل الدخول..." : "Signing in..."}
                  </>
                ) : (
                  <>
                    {t.signIn[language]}
                    <ArrowRight className={`${language === "ar" ? "mr-2 rotate-180" : "ml-2"} h-4 w-4`} />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">{t.orContinueWith[language]}</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <svg className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"}`} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <svg className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-muted-foreground">
            {t.dontHaveAccount[language]}{" "}
            <Link href="/register" className="font-semibold text-orange-500 hover:underline">
              {t.signUpForFree[language]}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
