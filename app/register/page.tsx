"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, User, ArrowRight, Phone, Loader2, AlertTriangle } from "lucide-react";
import { useLanguageStore, useAuthStore } from "@/stores";
import { toast } from "sonner";

// Demo Banner Component
const DemoBanner = ({ language }: { language: "en" | "ar" }) => (
  <div className="bg-amber-500/10 border-b border-amber-500/20">
    <div className="container mx-auto px-4 py-2">
      <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
        <AlertTriangle className="h-4 w-4 flex-shrink-0" />
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
  createAccount: { en: "Create Account", ar: "إنشاء حساب" },
  joinMillions: { en: "Join millions of happy shoppers", ar: "انضم لملايين المتسوقين السعداء" },
  firstName: { en: "First Name", ar: "الاسم الأول" },
  lastName: { en: "Last Name", ar: "اسم العائلة" },
  emailAddress: { en: "Email Address", ar: "البريد الإلكتروني" },
  phoneNumber: { en: "Phone Number", ar: "رقم الهاتف" },
  password: { en: "Password", ar: "كلمة المرور" },
  confirmPassword: { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
  register: { en: "Create Account", ar: "إنشاء حساب" },
  haveAccount: { en: "Already have an account?", ar: "لديك حساب بالفعل؟" },
  signIn: { en: "Sign In", ar: "تسجيل الدخول" },
  firstNamePlaceholder: { en: "Enter first name", ar: "أدخل الاسم الأول" },
  lastNamePlaceholder: { en: "Enter last name", ar: "أدخل اسم العائلة" },
  emailPlaceholder: { en: "Enter your email", ar: "أدخل بريدك الإلكتروني" },
  phonePlaceholder: { en: "Enter your phone number", ar: "أدخل رقم هاتفك" },
  createPasswordPlaceholder: { en: "Create a password", ar: "أنشئ كلمة مرور" },
  confirmPasswordPlaceholder: { en: "Confirm your password", ar: "أكد كلمة المرور" },
  passwordRequirements: { en: "Must be at least 8 characters", ar: "يجب أن تكون 8 أحرف على الأقل" },
  agreeToTerms: { en: "By creating an account, you agree to our", ar: "بإنشاء حساب، فإنك توافق على" },
  termsOfService: { en: "Terms of Service", ar: "شروط الخدمة" },
  and: { en: "and", ar: "و" },
  privacyPolicy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  createAccountBtn: { en: "Create Account", ar: "إنشاء حساب" },
  orSignUpWith: { en: "Or sign up with", ar: "أو سجل باستخدام" },
  alreadyHaveAccount: { en: "Already have an account?", ar: "لديك حساب بالفعل؟" },
};

export default function RegisterPage() {
  const { language } = useLanguageStore();
  const { register } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error(
        language === "ar"
          ? "كلمتا المرور غير متطابقتين"
          : "Passwords do not match"
      );
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      toast.error(
        language === "ar"
          ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
          : "Password must be at least 8 characters"
      );
      return;
    }

    setIsLoading(true);

    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    if (result.success) {
      toast.success(
        language === "ar"
          ? "تم إنشاء الحساب بنجاح!"
          : "Account created successfully!"
      );
      router.push("/profile");
    } else {
      toast.error(
        language === "ar"
          ? "البريد الإلكتروني مسجل بالفعل"
          : "Email already registered"
      );
    }

    setIsLoading(false);
  };

  return (
    <>
      <DemoBanner language={language} />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link href="/" className="inline-block mb-6">
              <span className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                {language === "ar" ? "امانون" : "Amanoon"}
              </span>
            </Link>
            <h2 className="text-2xl font-bold">{t.createAccount[language]}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.joinMillions[language]}
            </p>
          </div>

          {/* Register Form */}
          <div className="bg-card rounded-2xl shadow-lg border p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    {t.firstName[language]}
                  </label>
                  <div className="relative">
                    <User className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground`} />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder={t.firstNamePlaceholder[language]}
                      className={language === "ar" ? "pr-10" : "pl-10"}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    {t.lastName[language]}
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder={t.lastNamePlaceholder[language]}
                  />
                </div>
              </div>

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
                    placeholder={t.emailPlaceholder[language]}
                    className={language === "ar" ? "pr-10" : "pl-10"}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  {t.phoneNumber[language]}
                </label>
                <div className="relative">
                  <Phone className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground`} />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.phonePlaceholder[language]}
                    className={language === "ar" ? "pr-10" : "pl-10"}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  {t.password[language]}
                </label>
                <div className="relative">
                  <Lock className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground`} />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={t.createPasswordPlaceholder[language]}
                    className={language === "ar" ? "pr-10" : "pl-10"}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {t.passwordRequirements[language]}
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  {t.confirmPassword[language]}
                </label>
                <div className="relative">
                  <Lock className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground`} />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder={t.confirmPasswordPlaceholder[language]}
                    className={language === "ar" ? "pr-10" : "pl-10"}
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 mt-0.5 rounded border-gray-300"
                />
                <label htmlFor="terms" className={`${language === "ar" ? "mr-2" : "ml-2"} text-sm text-muted-foreground`}>
                  {t.agreeToTerms[language]}{" "}
                  <Link href="/terms" className="text-orange-500 hover:underline">
                    {t.termsOfService[language]}
                  </Link>{" "}
                  {t.and[language]}{" "}
                  <Link href="/privacy" className="text-orange-500 hover:underline">
                    {t.privacyPolicy[language]}
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={isLoading} className="w-full bg-orange-500 hover:bg-orange-600">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {language === "ar" ? "جاري إنشاء الحساب..." : "Creating account..."}
                  </>
                ) : (
                  <>
                    {t.createAccountBtn[language]}
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
                <span className="bg-card px-2 text-muted-foreground">{t.orSignUpWith[language]}</span>
              </div>
            </div>

            {/* Social Register */}
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

          {/* Login link */}
          <p className="text-center text-sm text-muted-foreground">
            {t.alreadyHaveAccount[language]}{" "}
            <Link href="/login" className="font-semibold text-orange-500 hover:underline">
              {t.signIn[language]}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
