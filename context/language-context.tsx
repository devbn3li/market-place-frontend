"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (translations: { en: string; ar: string }) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguageState(savedLanguage);
    }
    setMounted(true);
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (translations: { en: string; ar: string }) => {
    return translations[language];
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: "en", setLanguage, t, dir: "ltr" }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Translation dictionary
export const translations = {
  // Navbar
  freeShipping: { en: "🚚 Free shipping on orders over $50!", ar: "🚚 شحن مجاني للطلبات فوق 50 دولار!" },
  searchPlaceholder: { en: "Search for products...", ar: "ابحث عن المنتجات..." },
  login: { en: "Login", ar: "تسجيل الدخول" },
  darkMode: { en: "Dark Mode", ar: "الوضع الداكن" },
  language: { en: "Language", ar: "اللغة" },

  // Navigation
  home: { en: "Home", ar: "الرئيسية" },
  categories: { en: "Categories", ar: "الفئات" },
  deals: { en: "Deals", ar: "العروض" },
  newArrivals: { en: "New Arrivals", ar: "وصل حديثاً" },
  bestSellers: { en: "Best Sellers", ar: "الأكثر مبيعاً" },

  // Categories
  electronics: { en: "Electronics", ar: "الإلكترونيات" },
  fashion: { en: "Fashion", ar: "الأزياء" },
  homeGarden: { en: "Home & Garden", ar: "المنزل والحديقة" },
  sports: { en: "Sports", ar: "الرياضة" },
  beauty: { en: "Beauty", ar: "الجمال" },
  books: { en: "Books", ar: "الكتب" },
  toys: { en: "Toys", ar: "الألعاب" },
  automotive: { en: "Automotive", ar: "السيارات" },

  // Hero Section
  newYearSale: { en: "New Year Sale - Up to 70% OFF!", ar: "تخفيضات السنة الجديدة - خصم يصل إلى 70%!" },
  heroTitle: { en: "Shop Millions of Products at", ar: "تسوق ملايين المنتجات بـ" },
  unbeatablePrices: { en: "Unbeatable Prices", ar: "أسعار لا تُقاوم" },
  heroDescription: {
    en: "Discover amazing deals on electronics, fashion, home essentials, and more. Free shipping on orders over $50!",
    ar: "اكتشف عروضاً مذهلة على الإلكترونيات والأزياء ومستلزمات المنزل والمزيد. شحن مجاني للطلبات فوق 50 دولار!"
  },
  shopNow: { en: "Shop Now", ar: "تسوق الآن" },
  browseCategories: { en: "Browse Categories", ar: "تصفح الفئات" },

  // Sections
  shopByCategory: { en: "Shop by Category", ar: "تسوق حسب الفئة" },
  viewAll: { en: "View All", ar: "عرض الكل" },
  featuredProducts: { en: "Featured Products", ar: "المنتجات المميزة" },

  // Promotional Banners
  flashSale: { en: "Flash Sale", ar: "تخفيضات خاطفة" },
  electronicsDeal: { en: "Electronics Deal", ar: "عروض الإلكترونيات" },
  saveUpTo50: { en: "Save up to 50% on gadgets", ar: "وفر حتى 50% على الأجهزة" },
  trending: { en: "Trending", ar: "الأكثر رواجاً" },
  fashionWeek: { en: "Fashion Week", ar: "أسبوع الموضة" },
  newArrivalsDropped: { en: "New arrivals just dropped", ar: "وصلت تشكيلات جديدة" },
  discover: { en: "Discover", ar: "اكتشف" },
  specialOffer: { en: "Special Offer", ar: "عرض خاص" },
  freeShippingTitle: { en: "Free Shipping", ar: "شحن مجاني" },
  onOrdersOver50: { en: "On orders over $50", ar: "للطلبات فوق 50 دولار" },
  learnMore: { en: "Learn More", ar: "اعرف المزيد" },

  // Newsletter
  stayUpdated: { en: "Stay Updated", ar: "ابق على اطلاع" },
  newsletterDescription: {
    en: "Subscribe to our newsletter and get exclusive deals, new arrivals, and more!",
    ar: "اشترك في نشرتنا الإخبارية واحصل على عروض حصرية ووصول جديد والمزيد!"
  },
  enterYourEmail: { en: "Enter your email", ar: "أدخل بريدك الإلكتروني" },
  subscribe: { en: "Subscribe", ar: "اشترك" },

  // Login Page
  welcomeBack: { en: "Welcome back!", ar: "مرحباً بعودتك!" },
  signInToContinue: { en: "Sign in to your account to continue shopping", ar: "سجل دخولك لمتابعة التسوق" },
  emailAddress: { en: "Email address", ar: "البريد الإلكتروني" },
  enterYourEmailPlaceholder: { en: "Enter your email", ar: "أدخل بريدك الإلكتروني" },
  password: { en: "Password", ar: "كلمة المرور" },
  enterYourPassword: { en: "Enter your password", ar: "أدخل كلمة المرور" },
  forgotPassword: { en: "Forgot password?", ar: "نسيت كلمة المرور؟" },
  rememberMe: { en: "Remember me", ar: "تذكرني" },
  signIn: { en: "Sign in", ar: "تسجيل الدخول" },
  orContinueWith: { en: "Or continue with", ar: "أو تابع باستخدام" },
  dontHaveAccount: { en: "Don't have an account?", ar: "ليس لديك حساب؟" },
  signUpForFree: { en: "Sign up for free", ar: "سجل مجاناً" },

  // Register Page
  createAccount: { en: "Create an account", ar: "إنشاء حساب" },
  joinMillions: { en: "Join millions of shoppers on Amanoon", ar: "انضم لملايين المتسوقين على أمانون" },
  firstName: { en: "First name", ar: "الاسم الأول" },
  firstNamePlaceholder: { en: "John", ar: "أحمد" },
  lastName: { en: "Last name", ar: "اسم العائلة" },
  lastNamePlaceholder: { en: "Doe", ar: "محمد" },
  emailPlaceholder: { en: "john@example.com", ar: "ahmed@example.com" },
  phoneNumber: { en: "Phone number", ar: "رقم الهاتف" },
  phonePlaceholder: { en: "+1 (234) 567-8900", ar: "+20 (123) 456-7890" },
  createPasswordPlaceholder: { en: "Create a strong password", ar: "أنشئ كلمة مرور قوية" },
  createPassword: { en: "Create a strong password", ar: "أنشئ كلمة مرور قوية" },
  passwordRequirements: {
    en: "Must be at least 8 characters with a number and special character",
    ar: "يجب أن تكون 8 أحرف على الأقل مع رقم ورمز خاص"
  },
  confirmPassword: { en: "Confirm password", ar: "تأكيد كلمة المرور" },
  confirmPasswordPlaceholder: { en: "Confirm your password", ar: "أكد كلمة المرور" },
  confirmYourPassword: { en: "Confirm your password", ar: "أكد كلمة المرور" },
  agreeToTerms: { en: "I agree to the", ar: "أوافق على" },
  termsOfService: { en: "Terms of Service", ar: "شروط الخدمة" },
  and: { en: "and", ar: "و" },
  privacyPolicy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  createAccountBtn: { en: "Create account", ar: "إنشاء حساب" },
  orSignUpWith: { en: "Or sign up with", ar: "أو سجل باستخدام" },
  alreadyHaveAccount: { en: "Already have an account?", ar: "لديك حساب بالفعل؟" },

  // Footer
  company: { en: "Company", ar: "الشركة" },
  aboutUs: { en: "About Us", ar: "من نحن" },
  careers: { en: "Careers", ar: "الوظائف" },
  press: { en: "Press", ar: "الصحافة" },
  blog: { en: "Blog", ar: "المدونة" },
  helpSupport: { en: "Help & Support", ar: "المساعدة والدعم" },
  helpCenter: { en: "Help Center", ar: "مركز المساعدة" },
  shippingInfo: { en: "Shipping Info", ar: "معلومات الشحن" },
  returns: { en: "Returns", ar: "الإرجاع" },
  faq: { en: "FAQ", ar: "الأسئلة الشائعة" },
  legal: { en: "Legal", ar: "القانونية" },
  cookiePolicy: { en: "Cookie Policy", ar: "سياسة ملفات تعريف الارتباط" },
  sellOnAmanoon: { en: "Sell on Amanoon", ar: "البيع على أمانون" },
  startSelling: { en: "Start Selling", ar: "ابدأ البيع" },
  sellerCenter: { en: "Seller Center", ar: "مركز البائعين" },
  fulfillment: { en: "Fulfillment", ar: "التنفيذ" },
  securePayment: { en: "Secure Payment", ar: "دفع آمن" },
  secureCheckout: { en: "100% secure checkout", ar: "دفع آمن 100%" },
  support247: { en: "24/7 Support", ar: "دعم على مدار الساعة" },
  dedicatedSupport: { en: "Dedicated support", ar: "دعم مخصص" },
  easyReturns: { en: "Easy Returns", ar: "إرجاع سهل" },
  returnPolicy: { en: "30-day return policy", ar: "سياسة إرجاع 30 يوم" },
  footerDescription: {
    en: "Your one-stop shop for everything you need. Quality products, great prices, and exceptional service.",
    ar: "متجرك الشامل لكل ما تحتاجه. منتجات عالية الجودة، أسعار رائعة، وخدمة استثنائية."
  },
  subscribeNewsletter: { en: "Subscribe to our newsletter", ar: "اشترك في نشرتنا الإخبارية" },
  address: { en: "123 Market Street, NY 10001", ar: "123 شارع السوق، نيويورك 10001" },
  allRightsReserved: { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },

  // Products
  wirelessHeadphones: { en: "Wireless Bluetooth Headphones", ar: "سماعات بلوتوث لاسلكية" },
  smartWatch: { en: "Smart Watch Series X", ar: "ساعة ذكية سيريز X" },
  leatherBag: { en: "Premium Leather Bag", ar: "حقيبة جلدية فاخرة" },
  coffeeBeans: { en: "Organic Coffee Beans", ar: "حبوب قهوة عضوية" },
};
