"use client";

import { useLanguageStore } from "@/stores";
import {
  RotateCcw,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  CreditCard,
  Truck,
  FileText,
  HelpCircle,
  ArrowRight,
  Shield,
  Banknote,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const returnSteps = [
  {
    step: 1,
    icon: FileText,
    titleEn: "Initiate Return",
    titleAr: "بدء الإرجاع",
    descEn: "Log into your account and go to 'My Orders'. Select the item you want to return and click 'Return Item'.",
    descAr: "سجل الدخول إلى حسابك واذهب إلى 'طلباتي'. اختر المنتج الذي تريد إرجاعه وانقر على 'إرجاع المنتج'.",
  },
  {
    step: 2,
    icon: Package,
    titleEn: "Pack Your Item",
    titleAr: "تغليف المنتج",
    descEn: "Pack the item securely in its original packaging with all tags and accessories included.",
    descAr: "قم بتغليف المنتج بشكل آمن في عبوته الأصلية مع جميع البطاقات والملحقات.",
  },
  {
    step: 3,
    icon: Truck,
    titleEn: "Ship It Back",
    titleAr: "شحن المنتج",
    descEn: "Use the prepaid shipping label provided or drop off at a designated location.",
    descAr: "استخدم ملصق الشحن المدفوع مسبقًا أو قم بتسليمه في موقع محدد.",
  },
  {
    step: 4,
    icon: CreditCard,
    titleEn: "Get Refunded",
    titleAr: "استرداد المبلغ",
    descEn: "Once we receive and inspect your return, we'll process your refund within 5-7 business days.",
    descAr: "بمجرد استلام وفحص المرتجع، سنقوم بمعالجة استرداد المبلغ خلال 5-7 أيام عمل.",
  },
];

const returnPolicies = [
  {
    icon: Clock,
    titleEn: "30-Day Return Window",
    titleAr: "فترة إرجاع 30 يومًا",
    contentEn: "Most items can be returned within 30 days of delivery. Items must be unused, in original packaging, and with all tags attached.",
    contentAr: "يمكن إرجاع معظم المنتجات خلال 30 يومًا من التوصيل. يجب أن تكون المنتجات غير مستخدمة، في عبوتها الأصلية، مع جميع البطاقات مرفقة.",
  },
  {
    icon: Shield,
    titleEn: "Quality Guarantee",
    titleAr: "ضمان الجودة",
    contentEn: "If you receive a defective or damaged item, we'll cover return shipping costs and provide a full refund or replacement.",
    contentAr: "إذا استلمت منتجًا معيبًا أو تالفًا، سنتحمل تكاليف شحن الإرجاع ونقدم استردادًا كاملاً أو استبدالًا.",
  },
  {
    icon: Banknote,
    titleEn: "Refund Methods",
    titleAr: "طرق الاسترداد",
    contentEn: "Refunds are processed to your original payment method. Store credit option is also available for faster processing.",
    contentAr: "يتم معالجة المبالغ المستردة إلى طريقة الدفع الأصلية. خيار رصيد المتجر متاح أيضًا للمعالجة الأسرع.",
  },
  {
    icon: Truck,
    titleEn: "Free Return Shipping",
    titleAr: "شحن إرجاع مجاني",
    contentEn: "Enjoy free return shipping on all orders. Simply use the prepaid label included with your order or print one from your account.",
    contentAr: "استمتع بشحن إرجاع مجاني على جميع الطلبات. ببساطة استخدم الملصق المدفوع مسبقًا المرفق أو اطبع واحدًا من حسابك.",
  },
];

const eligibleItems = [
  { en: "Clothing & Apparel (unworn, tags attached)", ar: "الملابس (غير ملبوسة، مع البطاقات)" },
  { en: "Electronics (unopened, sealed)", ar: "الإلكترونيات (غير مفتوحة، مختومة)" },
  { en: "Home & Garden items", ar: "منتجات المنزل والحديقة" },
  { en: "Sports & Outdoor equipment", ar: "معدات الرياضة والخارجية" },
  { en: "Toys & Games (unopened)", ar: "الألعاب (غير مفتوحة)" },
  { en: "Books & Media", ar: "الكتب والوسائط" },
];

const nonEligibleItems = [
  { en: "Personalized or custom-made items", ar: "المنتجات المخصصة أو المصنوعة حسب الطلب" },
  { en: "Intimate apparel & swimwear", ar: "الملابس الداخلية وملابس السباحة" },
  { en: "Beauty products (opened/used)", ar: "منتجات التجميل (مفتوحة/مستخدمة)" },
  { en: "Perishable goods & food items", ar: "البضائع القابلة للتلف والأطعمة" },
  { en: "Downloadable software & digital products", ar: "البرامج القابلة للتنزيل والمنتجات الرقمية" },
  { en: "Gift cards & vouchers", ar: "بطاقات الهدايا والقسائم" },
];

const faqs = [
  {
    questionEn: "How long do I have to return an item?",
    questionAr: "كم من الوقت لدي لإرجاع منتج؟",
    answerEn: "You have 30 days from the delivery date to initiate a return for most items. Some categories like electronics may have different return windows.",
    answerAr: "لديك 30 يومًا من تاريخ التوصيل لبدء إرجاع معظم المنتجات. بعض الفئات مثل الإلكترونيات قد يكون لها فترات إرجاع مختلفة.",
  },
  {
    questionEn: "When will I receive my refund?",
    questionAr: "متى سأستلم المبلغ المسترد؟",
    answerEn: "Refunds are typically processed within 5-7 business days after we receive your return. It may take an additional 3-5 days for the refund to appear on your statement.",
    answerAr: "عادةً ما تتم معالجة المبالغ المستردة خلال 5-7 أيام عمل بعد استلام المرتجع. قد يستغرق الأمر 3-5 أيام إضافية لظهور المبلغ في كشف حسابك.",
  },
  {
    questionEn: "Can I exchange an item instead of returning it?",
    questionAr: "هل يمكنني استبدال منتج بدلاً من إرجاعه؟",
    answerEn: "Yes! You can request an exchange for a different size or color. If the item is in stock, we'll ship the replacement as soon as we receive your return.",
    answerAr: "نعم! يمكنك طلب استبدال بمقاس أو لون مختلف. إذا كان المنتج متوفرًا، سنشحن البديل بمجرد استلام المرتجع.",
  },
  {
    questionEn: "What if my item arrived damaged?",
    questionAr: "ماذا لو وصل المنتج تالفًا؟",
    answerEn: "Please contact us within 48 hours of delivery with photos of the damage. We'll arrange a free return and send a replacement or full refund immediately.",
    answerAr: "يرجى الاتصال بنا خلال 48 ساعة من التوصيل مع صور للتلف. سنرتب إرجاعًا مجانيًا ونرسل بديلاً أو استردادًا كاملاً فورًا.",
  },
  {
    questionEn: "Do I need the original receipt?",
    questionAr: "هل أحتاج إلى الإيصال الأصلي؟",
    answerEn: "No, you don't need a physical receipt. We can look up your order using your email address or order number from your account.",
    answerAr: "لا، لا تحتاج إلى إيصال ورقي. يمكننا البحث عن طلبك باستخدام بريدك الإلكتروني أو رقم الطلب من حسابك.",
  },
];

export default function ReturnsPage() {
  const { language } = useLanguageStore();

  return (
    <div
      className="min-h-screen bg-muted/30"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <RotateCcw className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold">
              {language === "ar" ? "الإرجاع والاستبدال" : "Returns & Exchanges"}
            </h1>
          </div>
          <p className="text-lg text-white/90 max-w-2xl">
            {language === "ar"
              ? "نريدك أن تكون سعيدًا بمشترياتك. إذا لم تكن راضيًا، نجعل عملية الإرجاع سهلة ومجانية."
              : "We want you to be happy with your purchase. If you're not satisfied, we make returns easy and free."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* How to Return */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {language === "ar" ? "كيفية إرجاع منتج" : "How to Return an Item"}
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {returnSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-card rounded-2xl border p-6 text-center h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-7 w-7 text-orange-500" />
                  </div>
                  <h3 className="font-bold mb-2">
                    {language === "ar" ? step.titleAr : step.titleEn}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? step.descAr : step.descEn}
                  </p>
                </div>
                {index < returnSteps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-orange-300 h-6 w-6" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Return Policies */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Shield className="h-6 w-6 text-orange-500" />
            {language === "ar" ? "سياسات الإرجاع" : "Return Policies"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {returnPolicies.map((policy, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                    <policy.icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-lg">
                      {language === "ar" ? policy.titleAr : policy.titleEn}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {language === "ar" ? policy.contentAr : policy.contentEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Eligible & Non-Eligible Items */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Eligible */}
            <div className="bg-card rounded-2xl border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="font-bold text-lg">
                  {language === "ar" ? "منتجات قابلة للإرجاع" : "Eligible for Return"}
                </h3>
              </div>
              <ul className="space-y-3">
                {eligibleItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                    <span className="text-muted-foreground">
                      {language === "ar" ? item.ar : item.en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-Eligible */}
            <div className="bg-card rounded-2xl border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-bold text-lg">
                  {language === "ar" ? "منتجات غير قابلة للإرجاع" : "Non-Returnable Items"}
                </h3>
              </div>
              <ul className="space-y-3">
                {nonEligibleItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                    <span className="text-muted-foreground">
                      {language === "ar" ? item.ar : item.en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="mb-16">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2">
                  {language === "ar" ? "ملاحظة مهمة" : "Important Notice"}
                </h3>
                <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                  {language === "ar"
                    ? "يجب إرجاع المنتجات في حالتها الأصلية مع جميع البطاقات والملحقات. المنتجات التي تظهر عليها علامات استخدام أو تلف أو تعديل قد لا تكون مؤهلة للاسترداد الكامل. يرجى الاحتفاظ بإيصال الشحن حتى تتم معالجة إرجاعك بالكامل."
                    : "Items must be returned in their original condition with all tags and accessories. Products showing signs of use, damage, or alteration may not be eligible for a full refund. Please keep your shipping receipt until your return is fully processed."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-orange-500" />
            {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold mb-3 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center text-sm shrink-0">
                    {index + 1}
                  </span>
                  {language === "ar" ? faq.questionAr : faq.questionEn}
                </h3>
                <p className="text-muted-foreground leading-relaxed mr-9 ml-9">
                  {language === "ar" ? faq.answerAr : faq.answerEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Start Return CTA */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white text-center">
            <RotateCcw className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">
              {language === "ar" ? "جاهز لبدء الإرجاع؟" : "Ready to Start a Return?"}
            </h2>
            <p className="text-white/90 mb-6 max-w-lg mx-auto">
              {language === "ar"
                ? "سجل الدخول إلى حسابك للوصول إلى طلباتك وبدء عملية الإرجاع"
                : "Log in to your account to access your orders and start the return process"}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/orders">
                <Button size="lg" className="bg-white text-orange-500 hover:bg-white/90">
                  {language === "ar" ? "عرض طلباتي" : "View My Orders"}
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  {language === "ar" ? "تسجيل الدخول" : "Sign In"}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div className="bg-card rounded-2xl border p-8 text-center">
            <HelpCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">
              {language === "ar" ? "تحتاج مساعدة؟" : "Need Help?"}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              {language === "ar"
                ? "فريق خدمة العملاء لدينا متاح للمساعدة في أي أسئلة حول الإرجاع أو الاستبدال"
                : "Our customer service team is available to help with any questions about returns or exchanges"}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  {language === "ar" ? "اتصل بنا" : "Contact Us"}
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="outline">
                  {language === "ar" ? "مركز المساعدة" : "Help Center"}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
