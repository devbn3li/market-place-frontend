"use client";

import { useState } from "react";
import { useLanguageStore, useAuthStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Lock, Smartphone, Eye, EyeOff, Key, CheckCircle2, AlertCircle } from "lucide-react";
import { useToastAlert } from "@/hooks/use-toast-alert";

const t = {
  security: { en: "Security Settings", ar: "إعدادات الأمان" },
  passwordSection: { en: "Password", ar: "كلمة المرور" },
  changePassword: { en: "Change Password", ar: "تغيير كلمة المرور" },
  currentPassword: { en: "Current Password", ar: "كلمة المرور الحالية" },
  newPassword: { en: "New Password", ar: "كلمة المرور الجديدة" },
  confirmPassword: { en: "Confirm New Password", ar: "تأكيد كلمة المرور" },
  updatePassword: { en: "Update Password", ar: "تحديث كلمة المرور" },
  twoFactorAuth: { en: "Two-Factor Authentication", ar: "المصادقة الثنائية" },
  twoFactorDesc: { en: "Add an extra layer of security to your account", ar: "أضف طبقة إضافية من الأمان لحسابك" },
  enable: { en: "Enable", ar: "تفعيل" },
  disable: { en: "Disable", ar: "تعطيل" },
  enabled: { en: "Enabled", ar: "مُفعّل" },
  loginActivity: { en: "Recent Login Activity", ar: "نشاط تسجيل الدخول الأخير" },
  noActivity: { en: "No recent activity", ar: "لا يوجد نشاط حديث" },
  device: { en: "Device", ar: "الجهاز" },
  location: { en: "Location", ar: "الموقع" },
  time: { en: "Time", ar: "الوقت" },
  current: { en: "Current Session", ar: "الجلسة الحالية" },
  securityTips: { en: "Security Tips", ar: "نصائح الأمان" },
  tip1: { en: "Use a strong, unique password", ar: "استخدم كلمة مرور قوية وفريدة" },
  tip2: { en: "Enable two-factor authentication", ar: "فعّل المصادقة الثنائية" },
  tip3: { en: "Don't share your password with anyone", ar: "لا تشارك كلمة المرور مع أي شخص" },
  tip4: { en: "Review login activity regularly", ar: "راجع نشاط تسجيل الدخول بانتظام" },
  passwordRequirements: { en: "Password Requirements", ar: "متطلبات كلمة المرور" },
  minLength: { en: "At least 8 characters", ar: "8 أحرف على الأقل" },
  uppercase: { en: "One uppercase letter", ar: "حرف كبير واحد" },
  lowercase: { en: "One lowercase letter", ar: "حرف صغير واحد" },
  number: { en: "One number", ar: "رقم واحد" },
  special: { en: "One special character", ar: "رمز خاص واحد" },
};

const loginHistory = [
  {
    device: "Chrome on Windows",
    deviceAr: "كروم على ويندوز",
    location: "Cairo, Egypt",
    locationAr: "القاهرة، مصر",
    time: "2 hours ago",
    timeAr: "منذ ساعتين",
    current: true,
  },
  {
    device: "Safari on iPhone",
    deviceAr: "سفاري على آيفون",
    location: "Alexandria, Egypt",
    locationAr: "الإسكندرية، مصر",
    time: "Yesterday",
    timeAr: "أمس",
    current: false,
  },
  {
    device: "Firefox on Mac",
    deviceAr: "فايرفوكس على ماك",
    location: "Giza, Egypt",
    locationAr: "الجيزة، مصر",
    time: "3 days ago",
    timeAr: "منذ 3 أيام",
    current: false,
  },
];

export default function SecurityPage() {
  const { language } = useLanguageStore();
  const { user } = useAuthStore();
  const toastAlert = useToastAlert();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const validatePassword = (password: string) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const passwordValidation = validatePassword(newPassword);
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toastAlert.error(
        language === "ar" ? "يرجى ملء جميع الحقول" : "Please fill all fields"
      );
      return;
    }

    if (!isPasswordValid) {
      toastAlert.error(
        language === "ar" ? "كلمة المرور لا تستوفي المتطلبات" : "Password doesn't meet requirements"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toastAlert.error(
        language === "ar" ? "كلمات المرور غير متطابقة" : "Passwords don't match"
      );
      return;
    }

    // Simulate password update
    toastAlert.success(
      language === "ar" ? "تم تحديث كلمة المرور بنجاح" : "Password updated successfully"
    );
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toastAlert.success(
      twoFactorEnabled
        ? language === "ar"
          ? "تم تعطيل المصادقة الثنائية"
          : "Two-factor authentication disabled"
        : language === "ar"
          ? "تم تفعيل المصادقة الثنائية"
          : "Two-factor authentication enabled"
    );
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <Shield className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t.security[language]}</h1>
              <p className="text-muted-foreground">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Change Password Section */}
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-bold">{t.passwordSection[language]}</h2>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.currentPassword[language]}
                </label>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.newPassword[language]}
                </label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password Requirements */}
                {newPassword && (
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-2">{t.passwordRequirements[language]}</p>
                    <div className="space-y-1">
                      <div className={`flex items-center gap-2 text-sm ${passwordValidation.length ? "text-green-600" : "text-muted-foreground"}`}>
                        {passwordValidation.length ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                        <span>{t.minLength[language]}</span>
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${passwordValidation.uppercase ? "text-green-600" : "text-muted-foreground"}`}>
                        {passwordValidation.uppercase ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                        <span>{t.uppercase[language]}</span>
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${passwordValidation.lowercase ? "text-green-600" : "text-muted-foreground"}`}>
                        {passwordValidation.lowercase ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                        <span>{t.lowercase[language]}</span>
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${passwordValidation.number ? "text-green-600" : "text-muted-foreground"}`}>
                        {passwordValidation.number ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                        <span>{t.number[language]}</span>
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${passwordValidation.special ? "text-green-600" : "text-muted-foreground"}`}>
                        {passwordValidation.special ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                        <span>{t.special[language]}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.confirmPassword[language]}
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                {t.updatePassword[language]}
              </Button>
            </form>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold">{t.twoFactorAuth[language]}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.twoFactorDesc[language]}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleToggle2FA}
                variant={twoFactorEnabled ? "destructive" : "default"}
                className={!twoFactorEnabled ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                {twoFactorEnabled ? t.disable[language] : t.enable[language]}
              </Button>
            </div>
            {twoFactorEnabled && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">{t.enabled[language]}</span>
              </div>
            )}
          </div>

          {/* Login Activity */}
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Key className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-bold">{t.loginActivity[language]}</h2>
            </div>

            <div className="space-y-4">
              {loginHistory.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {language === "ar" ? activity.deviceAr : activity.device}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {language === "ar" ? activity.locationAr : activity.location} •{" "}
                        {language === "ar" ? activity.timeAr : activity.time}
                      </p>
                    </div>
                  </div>
                  {activity.current && (
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                      {t.current[language]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Security Tips */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="font-bold mb-4">{t.securityTips[language]}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">{t.tip1[language]}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">{t.tip2[language]}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">{t.tip3[language]}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">{t.tip4[language]}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
