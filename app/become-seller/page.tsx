"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguageStore, useAuthStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Store,
  ArrowLeft,
  Building2,
  FileText,
  CheckCircle,
  Loader2,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

const t = {
  becomeSeller: { en: "Become a Seller", ar: "كن بائعاً" },
  startSelling: { en: "Start selling on Amanoon", ar: "ابدأ البيع على أمانون" },
  whySell: { en: "Why Sell on Amanoon?", ar: "لماذا تبيع على أمانون؟" },
  benefit1Title: { en: "Millions of Customers", ar: "ملايين العملاء" },
  benefit1Desc: { en: "Reach customers across Egypt and the Middle East", ar: "وصل لعملاء في مصر والشرق الأوسط" },
  benefit2Title: { en: "Easy to Start", ar: "سهولة البدء" },
  benefit2Desc: { en: "Set up your store in minutes", ar: "أنشئ متجرك في دقائق" },
  benefit3Title: { en: "Competitive Fees", ar: "رسوم تنافسية" },
  benefit3Desc: { en: "Low commission rates on sales", ar: "عمولات منخفضة على المبيعات" },
  benefit4Title: { en: "Fast Payouts", ar: "دفعات سريعة" },
  benefit4Desc: { en: "Get paid weekly directly to your account", ar: "احصل على أموالك أسبوعياً" },
  storeInfo: { en: "Store Information", ar: "معلومات المتجر" },
  storeName: { en: "Store Name (English)", ar: "اسم المتجر (بالإنجليزية)" },
  storeNameAr: { en: "Store Name (Arabic)", ar: "اسم المتجر (بالعربية)" },
  storeDescription: { en: "Store Description (English)", ar: "وصف المتجر (بالإنجليزية)" },
  storeDescriptionAr: { en: "Store Description (Arabic)", ar: "وصف المتجر (بالعربية)" },
  businessType: { en: "Business Type", ar: "نوع النشاط التجاري" },
  individual: { en: "Individual", ar: "فردي" },
  company: { en: "Company", ar: "شركة" },
  submitApplication: { en: "Submit Application", ar: "إرسال الطلب" },
  submitting: { en: "Submitting...", ar: "جاري الإرسال..." },
  applicationSubmitted: { en: "Application Submitted!", ar: "تم إرسال الطلب!" },
  applicationSubmittedDesc: { en: "We'll review your application and get back to you soon", ar: "سنراجع طلبك ونرد عليك قريباً" },
  backToSettings: { en: "Back to Settings", ar: "العودة للإعدادات" },
  storeNamePlaceholder: { en: "Enter your store name", ar: "أدخل اسم متجرك" },
  storeDescPlaceholder: { en: "Describe what you sell", ar: "صف ما تبيعه" },
  alreadySeller: { en: "You're already a seller!", ar: "أنت بائع بالفعل!" },
  goToSellerCenter: { en: "Go to Seller Center", ar: "اذهب إلى مركز البائعين" },
  pendingApplication: { en: "Application Under Review", ar: "الطلب قيد المراجعة" },
  pendingDesc: { en: "Your seller application is being reviewed. We'll notify you once it's approved.", ar: "طلبك للبيع قيد المراجعة. سنعلمك فور الموافقة عليه." },
  agreeToTerms: { en: "By submitting, you agree to our", ar: "بالإرسال، أنت توافق على" },
  sellerTerms: { en: "Seller Terms & Conditions", ar: "شروط وأحكام البائعين" },
};

const benefits = [
  {
    icon: Users,
    titleKey: "benefit1Title" as const,
    descKey: "benefit1Desc" as const,
  },
  {
    icon: Package,
    titleKey: "benefit2Title" as const,
    descKey: "benefit2Desc" as const,
  },
  {
    icon: DollarSign,
    titleKey: "benefit3Title" as const,
    descKey: "benefit3Desc" as const,
  },
  {
    icon: TrendingUp,
    titleKey: "benefit4Title" as const,
    descKey: "benefit4Desc" as const,
  },
];

export default function BecomeSellerPage() {
  const { language } = useLanguageStore();
  const { user, isAuthenticated, isLoading: authLoading, applyToBecomeSeller } = useAuthStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "",
    storeNameAr: "",
    storeDescription: "",
    storeDescriptionAr: "",
    businessType: "individual",
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Check if user is already a seller
  if (user?.accountType === "seller") {
    return (
      <div className="min-h-screen bg-muted/30 py-12" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-card rounded-xl border p-12">
            <CheckCircle className="h-20 w-20 mx-auto text-green-500 mb-6" />
            <h1 className="text-2xl font-bold mb-4">{t.alreadySeller[language]}</h1>
            <Link href="/seller-center">
              <Button className="bg-orange-500 hover:bg-orange-600">
                {t.goToSellerCenter[language]}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Check if application is pending
  if (user?.sellerInfo?.status === "pending") {
    return (
      <div className="min-h-screen bg-muted/30 py-12" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-card rounded-xl border p-12">
            <Clock className="h-20 w-20 mx-auto text-yellow-500 mb-6" />
            <h1 className="text-2xl font-bold mb-4">{t.pendingApplication[language]}</h1>
            <p className="text-muted-foreground mb-6">{t.pendingDesc[language]}</p>
            <Link href="/settings">
              <Button variant="outline">
                {t.backToSettings[language]}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = applyToBecomeSeller({
      storeName: formData.storeName,
      storeNameAr: formData.storeNameAr,
      storeDescription: formData.storeDescription,
      storeDescriptionAr: formData.storeDescriptionAr,
      businessType: formData.businessType,
    });

    if (result.success) {
      setSubmitted(true);
      toast.success(
        language === "ar" ? "تم إرسال طلبك بنجاح!" : "Application submitted successfully!"
      );
    }

    setIsLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-muted/30 py-12" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-card rounded-xl border p-12">
            <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">{t.applicationSubmitted[language]}</h1>
            <p className="text-muted-foreground mb-8">{t.applicationSubmittedDesc[language]}</p>
            <Link href="/settings">
              <Button className="bg-orange-500 hover:bg-orange-600">
                {t.backToSettings[language]}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/settings"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className={`h-4 w-4 ${language === "ar" ? "ml-2 rotate-180" : "mr-2"}`} />
            {t.backToSettings[language]}
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <Store className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t.becomeSeller[language]}</h1>
              <p className="text-muted-foreground">{t.startSelling[language]}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Benefits */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl p-6 text-white sticky top-8">
              <h2 className="text-xl font-bold mb-6">{t.whySell[language]}</h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold">{t[benefit.titleKey][language]}</h3>
                        <p className="text-sm text-white/80">{t[benefit.descKey][language]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border p-6">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-bold">{t.storeInfo[language]}</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Store Name English */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.storeName[language]} *
                  </label>
                  <div className="relative">
                    <Store className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground`} />
                    <Input
                      value={formData.storeName}
                      onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                      placeholder={t.storeNamePlaceholder[language]}
                      className={language === "ar" ? "pr-10" : "pl-10"}
                      required
                    />
                  </div>
                </div>

                {/* Store Name Arabic */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.storeNameAr[language]} *
                  </label>
                  <div className="relative">
                    <Store className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground`} />
                    <Input
                      value={formData.storeNameAr}
                      onChange={(e) => setFormData({ ...formData, storeNameAr: e.target.value })}
                      placeholder={t.storeNamePlaceholder[language]}
                      className={language === "ar" ? "pr-10" : "pl-10"}
                      dir="rtl"
                      required
                    />
                  </div>
                </div>

                {/* Store Description English */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.storeDescription[language]} *
                  </label>
                  <textarea
                    value={formData.storeDescription}
                    onChange={(e) => setFormData({ ...formData, storeDescription: e.target.value })}
                    placeholder={t.storeDescPlaceholder[language]}
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  />
                </div>

                {/* Store Description Arabic */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.storeDescriptionAr[language]} *
                  </label>
                  <textarea
                    value={formData.storeDescriptionAr}
                    onChange={(e) => setFormData({ ...formData, storeDescriptionAr: e.target.value })}
                    placeholder={t.storeDescPlaceholder[language]}
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    dir="rtl"
                    required
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    {t.businessType[language]} *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, businessType: "individual" })}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${formData.businessType === "individual"
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                          : "border-muted hover:border-orange-200"
                        }`}
                    >
                      <Store className={`h-8 w-8 mx-auto mb-2 ${formData.businessType === "individual" ? "text-orange-500" : "text-muted-foreground"}`} />
                      <p className="font-bold">{t.individual[language]}</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, businessType: "company" })}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${formData.businessType === "company"
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                          : "border-muted hover:border-orange-200"
                        }`}
                    >
                      <Building2 className={`h-8 w-8 mx-auto mb-2 ${formData.businessType === "company" ? "text-orange-500" : "text-muted-foreground"}`} />
                      <p className="font-bold">{t.company[language]}</p>
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 mt-0.5 rounded border-gray-300 accent-orange-500"
                  />
                  <label htmlFor="terms" className={`${language === "ar" ? "mr-2" : "ml-2"} text-sm text-muted-foreground`}>
                    {t.agreeToTerms[language]}{" "}
                    <Link href="/seller-terms" className="text-orange-500 hover:underline">
                      {t.sellerTerms[language]}
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      {t.submitting[language]}
                    </>
                  ) : (
                    t.submitApplication[language]
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
