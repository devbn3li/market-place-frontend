"use client";

import { useLanguageStore } from "@/stores";
import {
  Truck,
  Package,
  Clock,
  MapPin,
  Globe,
  Shield,
  Calculator,
  HelpCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const shippingMethods = [
  {
    id: "standard",
    icon: Truck,
    nameEn: "Standard Shipping",
    nameAr: "الشحن العادي",
    descEn: "Delivery within 5-7 business days",
    descAr: "التوصيل خلال 5-7 أيام عمل",
    priceEn: "$4.99",
    priceAr: "4.99$",
    freeAboveEn: "Free on orders over $50",
    freeAboveAr: "مجاني للطلبات فوق 50$",
  },
  {
    id: "express",
    icon: Clock,
    nameEn: "Express Shipping",
    nameAr: "الشحن السريع",
    descEn: "Delivery within 2-3 business days",
    descAr: "التوصيل خلال 2-3 أيام عمل",
    priceEn: "$9.99",
    priceAr: "9.99$",
    freeAboveEn: "Free on orders over $100",
    freeAboveAr: "مجاني للطلبات فوق 100$",
  },
  {
    id: "overnight",
    icon: Package,
    nameEn: "Overnight Shipping",
    nameAr: "الشحن الليلي",
    descEn: "Next business day delivery",
    descAr: "التوصيل في يوم العمل التالي",
    priceEn: "$19.99",
    priceAr: "19.99$",
    freeAboveEn: "Free on orders over $200",
    freeAboveAr: "مجاني للطلبات فوق 200$",
  },
];

const deliveryZones = [
  {
    icon: MapPin,
    zoneEn: "Local (Same City)",
    zoneAr: "محلي (نفس المدينة)",
    timeEn: "1-2 business days",
    timeAr: "1-2 يوم عمل",
    standardEn: "$2.99",
    standardAr: "2.99$",
  },
  {
    icon: Globe,
    zoneEn: "Domestic (Nationwide)",
    zoneAr: "داخلي (على مستوى الدولة)",
    timeEn: "3-7 business days",
    timeAr: "3-7 أيام عمل",
    standardEn: "$4.99 - $9.99",
    standardAr: "4.99$ - 9.99$",
  },
  {
    icon: Globe,
    zoneEn: "International",
    zoneAr: "دولي",
    timeEn: "7-21 business days",
    timeAr: "7-21 يوم عمل",
    standardEn: "$14.99 - $39.99",
    standardAr: "14.99$ - 39.99$",
  },
];

const shippingPolicies = [
  {
    icon: CheckCircle,
    titleEn: "Order Processing",
    titleAr: "معالجة الطلب",
    contentEn:
      "Orders are processed within 1-2 business days. Orders placed after 2 PM or on weekends will be processed the next business day.",
    contentAr:
      "تتم معالجة الطلبات خلال 1-2 يوم عمل. الطلبات المقدمة بعد الساعة 2 مساءً أو في عطلات نهاية الأسبوع ستتم معالجتها في يوم العمل التالي.",
  },
  {
    icon: Package,
    titleEn: "Package Tracking",
    titleAr: "تتبع الشحنة",
    contentEn:
      "Once your order ships, you'll receive an email with tracking information. You can also track your package in your account under 'My Orders'.",
    contentAr:
      "بمجرد شحن طلبك، ستتلقى بريدًا إلكترونيًا يحتوي على معلومات التتبع. يمكنك أيضًا تتبع شحنتك في حسابك ضمن 'طلباتي'.",
  },
  {
    icon: Shield,
    titleEn: "Shipping Insurance",
    titleAr: "تأمين الشحن",
    contentEn:
      "All packages are insured against loss or damage during transit. If your package arrives damaged, please contact us within 48 hours.",
    contentAr:
      "جميع الطرود مؤمنة ضد الفقدان أو التلف أثناء النقل. إذا وصلت شحنتك تالفة، يرجى الاتصال بنا خلال 48 ساعة.",
  },
  {
    icon: AlertCircle,
    titleEn: "Delivery Issues",
    titleAr: "مشاكل التوصيل",
    contentEn:
      "If you experience any delivery issues, please contact our customer service team. We'll work with the carrier to resolve the issue promptly.",
    contentAr:
      "إذا واجهت أي مشاكل في التوصيل، يرجى الاتصال بفريق خدمة العملاء. سنعمل مع شركة الشحن لحل المشكلة بسرعة.",
  },
];

const faqs = [
  {
    questionEn: "How do I know when my order will arrive?",
    questionAr: "كيف أعرف متى سيصل طلبي؟",
    answerEn:
      "Once your order ships, you'll receive an email with an estimated delivery date and tracking number. You can track your package anytime using this number.",
    answerAr:
      "بمجرد شحن طلبك، ستتلقى بريدًا إلكترونيًا يحتوي على تاريخ التوصيل المتوقع ورقم التتبع. يمكنك تتبع شحنتك في أي وقت باستخدام هذا الرقم.",
  },
  {
    questionEn: "Can I change my shipping address after placing an order?",
    questionAr: "هل يمكنني تغيير عنوان الشحن بعد تقديم الطلب؟",
    answerEn:
      "Address changes can be made within 1 hour of placing your order. After that, please contact customer service as the order may already be in processing.",
    answerAr:
      "يمكن إجراء تغييرات على العنوان خلال ساعة واحدة من تقديم الطلب. بعد ذلك، يرجى الاتصال بخدمة العملاء حيث قد يكون الطلب قيد المعالجة بالفعل.",
  },
  {
    questionEn: "Do you ship internationally?",
    questionAr: "هل تشحنون دوليًا؟",
    answerEn:
      "Yes! We ship to over 100 countries worldwide. International shipping rates and delivery times vary by location.",
    answerAr:
      "نعم! نشحن إلى أكثر من 100 دولة حول العالم. تختلف أسعار الشحن الدولي وأوقات التوصيل حسب الموقع.",
  },
  {
    questionEn: "What happens if I'm not home during delivery?",
    questionAr: "ماذا يحدث إذا لم أكن في المنزل أثناء التوصيل؟",
    answerEn:
      "The carrier will typically leave a delivery notice and attempt redelivery. You may also be able to redirect your package to a pickup location.",
    answerAr:
      "عادةً ما تترك شركة الشحن إشعار تسليم وتحاول إعادة التوصيل. قد تتمكن أيضًا من إعادة توجيه شحنتك إلى موقع استلام.",
  },
];

export default function ShippingPage() {
  const { language } = useLanguageStore();

  return (
    <div
      className="min-h-screen bg-muted/30"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <div className="bg-linear-to-r from-orange-500 via-yellow-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Truck className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold">
              {language === "ar" ? "معلومات الشحن" : "Shipping Information"}
            </h1>
          </div>
          <p className="text-lg text-white/90 max-w-2xl">
            {language === "ar"
              ? "تعرف على خيارات الشحن والتوصيل المتاحة لك. نحرص على توصيل طلباتك بأمان وسرعة."
              : "Learn about our shipping and delivery options. We ensure your orders arrive safely and quickly."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Shipping Methods */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Package className="h-6 w-6 text-orange-500" />
            {language === "ar" ? "طرق الشحن" : "Shipping Methods"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {shippingMethods.map((method) => (
              <div
                key={method.id}
                className="bg-card rounded-2xl border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <method.icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {language === "ar" ? method.nameAr : method.nameEn}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? method.descAr : method.descEn}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">
                      {language === "ar" ? "السعر" : "Price"}
                    </span>
                    <span className="font-bold text-lg text-orange-500">
                      {language === "ar" ? method.priceAr : method.priceEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>
                      {language === "ar"
                        ? method.freeAboveAr
                        : method.freeAboveEn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Delivery Zones */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <MapPin className="h-6 w-6 text-orange-500" />
            {language === "ar" ? "مناطق التوصيل" : "Delivery Zones"}
          </h2>
          <div className="bg-card rounded-2xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-start p-4 font-semibold">
                      {language === "ar" ? "المنطقة" : "Zone"}
                    </th>
                    <th className="text-start p-4 font-semibold">
                      {language === "ar" ? "وقت التوصيل" : "Delivery Time"}
                    </th>
                    <th className="text-start p-4 font-semibold">
                      {language === "ar" ? "الشحن العادي" : "Standard Shipping"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryZones.map((zone, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <zone.icon className="h-5 w-5 text-orange-500" />
                          <span className="font-medium">
                            {language === "ar" ? zone.zoneAr : zone.zoneEn}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {language === "ar" ? zone.timeAr : zone.timeEn}
                      </td>
                      <td className="p-4 font-semibold text-orange-500">
                        {language === "ar" ? zone.standardAr : zone.standardEn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Shipping Policies */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Shield className="h-6 w-6 text-orange-500" />
            {language === "ar" ? "سياسات الشحن" : "Shipping Policies"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {shippingPolicies.map((policy, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                    <policy.icon className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">
                      {language === "ar" ? policy.titleAr : policy.titleEn}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {language === "ar" ? policy.contentAr : policy.contentEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping Calculator Promo */}
        <section className="mb-16">
          <div className="bg-linear-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/20 rounded-xl">
                  <Calculator className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">
                    {language === "ar"
                      ? "احسب تكلفة الشحن"
                      : "Calculate Shipping Cost"}
                  </h3>
                  <p className="text-white/90">
                    {language === "ar"
                      ? "أضف منتجات إلى سلتك لمعرفة تكلفة الشحن الدقيقة"
                      : "Add products to your cart to see exact shipping costs"}
                  </p>
                </div>
              </div>
              <Link href="/categories">
                <Button
                  size="lg"
                  className="bg-white text-orange-500 hover:bg-white/90"
                >
                  {language === "ar" ? "تسوق الآن" : "Shop Now"}
                </Button>
              </Link>
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

        {/* Contact Section */}
        <section>
          <div className="bg-card rounded-2xl border p-8 text-center">
            <HelpCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">
              {language === "ar"
                ? "هل لديك أسئلة أخرى؟"
                : "Have More Questions?"}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              {language === "ar"
                ? "فريق خدمة العملاء لدينا متاح على مدار الساعة للإجابة على استفساراتك"
                : "Our customer service team is available 24/7 to answer your questions"}
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
