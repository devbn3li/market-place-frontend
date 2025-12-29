"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguageStore, useAuthStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Package,
  DollarSign,
  Tag,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Loader2,
  Store,
  TrendingUp,
  Shield,
  Users,
  Camera,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToastAlert } from "@/hooks/use-toast-alert";

const t = {
  sellOnAmanoon: { en: "Sell on Amanoon", ar: "بيع على امانون" },
  startSellingToday: {
    en: "Start selling today and reach millions of customers",
    ar: "ابدأ البيع اليوم واوصل لملايين العملاء",
  },
  listYourProduct: { en: "List Your Product", ar: "أضف منتجك" },
  productName: { en: "Product Name", ar: "اسم المنتج" },
  productNamePlaceholder: { en: "Enter product name", ar: "أدخل اسم المنتج" },
  category: { en: "Category", ar: "الفئة" },
  selectCategory: { en: "Select a category", ar: "اختر فئة" },
  price: { en: "Price", ar: "السعر" },
  pricePlaceholder: { en: "0.00", ar: "0.00" },
  originalPrice: { en: "Original Price (optional)", ar: "السعر الأصلي (اختياري)" },
  description: { en: "Description", ar: "الوصف" },
  descriptionPlaceholder: {
    en: "Describe your product in detail...",
    ar: "اوصف منتجك بالتفصيل...",
  },
  productImages: { en: "Product Images", ar: "صور المنتج" },
  uploadImages: { en: "Upload Images", ar: "رفع الصور" },
  dragAndDrop: {
    en: "Drag and drop images here or click to browse",
    ar: "اسحب وأفلت الصور هنا أو اضغط للاختيار",
  },
  maxImages: { en: "Maximum 5 images, JPG or PNG", ar: "بحد أقصى 5 صور، JPG أو PNG" },
  condition: { en: "Condition", ar: "الحالة" },
  conditionNew: { en: "New", ar: "جديد" },
  conditionUsed: { en: "Used - Like New", ar: "مستعمل - كالجديد" },
  conditionGood: { en: "Used - Good", ar: "مستعمل - جيد" },
  quantity: { en: "Quantity Available", ar: "الكمية المتاحة" },
  submitListing: { en: "Submit Listing", ar: "إرسال الإعلان" },
  submitting: { en: "Submitting...", ar: "جاري الإرسال..." },
  loginToSell: { en: "Login to start selling", ar: "سجل دخول لبدء البيع" },
  whySellWithUs: { en: "Why Sell With Us?", ar: "لماذا تبيع معنا؟" },
  millionsOfCustomers: { en: "Millions of Customers", ar: "ملايين العملاء" },
  millionsDesc: {
    en: "Reach a massive audience of active shoppers",
    ar: "اوصل لجمهور ضخم من المتسوقين النشطين",
  },
  securePayments: { en: "Secure Payments", ar: "دفع آمن" },
  secureDesc: {
    en: "Get paid securely and on time, every time",
    ar: "احصل على أموالك بأمان وفي الوقت المحدد",
  },
  easyToUse: { en: "Easy to Use", ar: "سهل الاستخدام" },
  easyDesc: {
    en: "List products in minutes with our simple tools",
    ar: "أضف منتجاتك في دقائق بأدواتنا البسيطة",
  },
  growYourBusiness: { en: "Grow Your Business", ar: "نمّي تجارتك" },
  growDesc: {
    en: "Analytics and insights to boost your sales",
    ar: "تحليلات ورؤى لزيادة مبيعاتك",
  },
  successMessage: {
    en: "Product listed successfully! We'll review it shortly.",
    ar: "تم إضافة المنتج بنجاح! سنراجعه قريباً.",
  },
  demoNotice: {
    en: "Demo Mode - Listings are not actually published",
    ar: "وضع العرض - الإعلانات لا تُنشر فعلياً",
  },
};

const categories = [
  { value: "electronics", en: "Electronics", ar: "إلكترونيات" },
  { value: "fashion", en: "Fashion", ar: "أزياء" },
  { value: "home-garden", en: "Home & Garden", ar: "المنزل والحديقة" },
  { value: "sports", en: "Sports & Outdoors", ar: "رياضة" },
  { value: "beauty", en: "Beauty & Health", ar: "جمال وصحة" },
  { value: "toys", en: "Toys & Games", ar: "ألعاب" },
  { value: "books", en: "Books & Media", ar: "كتب وميديا" },
  { value: "automotive", en: "Automotive", ar: "سيارات" },
];

export default function SellPage() {
  const { language } = useLanguageStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const toastAlert = useToastAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    description: "",
    condition: "new",
    quantity: "1",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      if (images.length + newImages.length >= 5) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages((prev) => [...prev, e.target!.result as string].slice(0, 5));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toastAlert.error(
        language === "ar" ? "يجب تسجيل الدخول أولاً" : "Please login first"
      );
      router.push("/login");
      return;
    }

    if (!formData.name || !formData.category || !formData.price) {
      toastAlert.error(
        language === "ar"
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill all required fields"
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
    toastAlert.success(t.successMessage[language]);
  };

  if (isSuccess) {
    return (
      <div
        className="min-h-screen bg-muted/30 flex items-center justify-center"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="bg-card rounded-2xl border p-8 max-w-md w-full mx-4 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {language === "ar" ? "تم بنجاح!" : "Success!"}
          </h1>
          <p className="text-muted-foreground mb-6">{t.successMessage[language]}</p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  name: "",
                  category: "",
                  price: "",
                  originalPrice: "",
                  description: "",
                  condition: "new",
                  quantity: "1",
                });
                setImages([]);
              }}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              {language === "ar" ? "إضافة منتج آخر" : "List Another Product"}
            </Button>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                {language === "ar" ? "العودة للرئيسية" : "Back to Home"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Demo Notice */}
      <div className="bg-amber-500/10 border-b border-amber-500/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p className="text-xs sm:text-sm text-center">{t.demoNotice[language]}</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-linear-to-br from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <Store className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t.sellOnAmanoon[language]}
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              {t.startSellingToday[language]}
            </p>
          </div>
        </div>
      </div>

      {/* Why Sell With Us */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-xl font-bold text-center mb-10">
            {t.whySellWithUs[language]}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: t.millionsOfCustomers,
                desc: t.millionsDesc,
              },
              {
                icon: Shield,
                title: t.securePayments,
                desc: t.secureDesc,
              },
              {
                icon: Package,
                title: t.easyToUse,
                desc: t.easyDesc,
              },
              {
                icon: TrendingUp,
                title: t.growYourBusiness,
                desc: t.growDesc,
              },
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-orange-500" />
                </div>
                <h3 className="font-semibold text-sm mb-2">{item.title[language]}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          {!isAuthenticated ? (
            <div className="bg-card rounded-2xl border p-8 text-center">
              <Store className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-bold mb-2">{t.loginToSell[language]}</h2>
              <p className="text-muted-foreground mb-6">
                {language === "ar"
                  ? "يجب تسجيل الدخول لإضافة منتجات للبيع"
                  : "You need to be logged in to list products for sale"}
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/login">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    {language === "ar" ? "تسجيل الدخول" : "Login"}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline">
                    {language === "ar" ? "إنشاء حساب" : "Create Account"}
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl border p-6 md:p-8">
              <h2 className="text-xl font-bold mb-8">{t.listYourProduct[language]}</h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Product Name */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    {t.productName[language]} *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder={t.productNamePlaceholder[language]}
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {t.category[language]} *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm"
                    required
                  >
                    <option value="">{t.selectCategory[language]}</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat[language]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      {t.price[language]} *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder={t.pricePlaceholder[language]}
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium">
                      {t.originalPrice[language]}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.originalPrice}
                        onChange={(e) =>
                          setFormData({ ...formData, originalPrice: e.target.value })
                        }
                        placeholder={t.pricePlaceholder[language]}
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>

                {/* Condition & Quantity */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">{t.condition[language]}</label>
                    <select
                      value={formData.condition}
                      onChange={(e) =>
                        setFormData({ ...formData, condition: e.target.value })
                      }
                      className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="new">{t.conditionNew[language]}</option>
                      <option value="like-new">{t.conditionUsed[language]}</option>
                      <option value="good">{t.conditionGood[language]}</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium">{t.quantity[language]}</label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {t.description[language]}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder={t.descriptionPlaceholder[language]}
                    rows={5}
                    className="w-full px-4 py-3 rounded-md border border-input bg-background text-sm resize-none"
                  />
                </div>

                {/* Images */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    {t.productImages[language]}
                  </label>

                  {/* Image Preview */}
                  {images.length > 0 && (
                    <div className="flex gap-2 flex-wrap mb-3">
                      {images.map((img, i) => (
                        <div key={i} className="relative group">
                          <Image
                            src={img}
                            alt={`Product ${i + 1}`}
                            width={80}
                            height={80}
                            className="w-20 h-20 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Area */}
                  {images.length < 5 && (
                    <label className="block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-orange-500 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Camera className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {t.dragAndDrop[language]}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {t.maxImages[language]} ({images.length}/5)
                      </p>
                    </label>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        {t.submitting[language]}
                      </>
                    ) : (
                      <>
                        {t.submitListing[language]}
                        <ArrowRight
                          className={`h-5 w-5 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`}
                        />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
