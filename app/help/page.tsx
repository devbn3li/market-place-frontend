"use client";

import { useLanguageStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Search,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  Shield,
  User,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const helpCategories = [
  {
    id: "orders",
    icon: Package,
    title: { en: "Orders & Shipping", ar: "الطلبات والشحن" },
    description: {
      en: "Track orders, shipping info, and delivery",
      ar: "تتبع الطلبات ومعلومات الشحن والتوصيل",
    },
    articles: 24,
    color: "bg-blue-500",
  },
  {
    id: "payments",
    icon: CreditCard,
    title: { en: "Payments & Billing", ar: "المدفوعات والفواتير" },
    description: {
      en: "Payment methods, invoices, and refunds",
      ar: "طرق الدفع والفواتير والمبالغ المستردة",
    },
    articles: 18,
    color: "bg-green-500",
  },
  {
    id: "delivery",
    icon: Truck,
    title: { en: "Delivery", ar: "التوصيل" },
    description: {
      en: "Delivery options, times, and locations",
      ar: "خيارات التوصيل والأوقات والمواقع",
    },
    articles: 15,
    color: "bg-orange-500",
  },
  {
    id: "returns",
    icon: RotateCcw,
    title: { en: "Returns & Refunds", ar: "الإرجاع والاسترداد" },
    description: {
      en: "Return policy, process, and refund status",
      ar: "سياسة الإرجاع والعملية وحالة الاسترداد",
    },
    articles: 12,
    color: "bg-purple-500",
  },
  {
    id: "account",
    icon: User,
    title: { en: "Account & Settings", ar: "الحساب والإعدادات" },
    description: {
      en: "Profile, password, and preferences",
      ar: "الملف الشخصي وكلمة المرور والتفضيلات",
    },
    articles: 20,
    color: "bg-pink-500",
  },
  {
    id: "security",
    icon: Shield,
    title: { en: "Security & Privacy", ar: "الأمان والخصوصية" },
    description: {
      en: "Account security and data protection",
      ar: "أمان الحساب وحماية البيانات",
    },
    articles: 10,
    color: "bg-red-500",
  },
];

const faqs = [
  {
    id: 1,
    question: {
      en: "How can I track my order?",
      ar: "كيف يمكنني تتبع طلبي؟",
    },
    answer: {
      en: "You can track your order by going to 'My Orders' in your account. Click on the order you want to track and you'll see real-time updates on your shipment's location and estimated delivery time.",
      ar: "يمكنك تتبع طلبك بالذهاب إلى 'طلباتي' في حسابك. انقر على الطلب الذي تريد تتبعه وسترى تحديثات فورية عن موقع شحنتك ووقت التوصيل المتوقع.",
    },
    category: "orders",
  },
  {
    id: 2,
    question: {
      en: "What payment methods do you accept?",
      ar: "ما هي طرق الدفع المقبولة؟",
    },
    answer: {
      en: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, Apple Pay, Google Pay, PayPal, and Cash on Delivery (COD) in select areas.",
      ar: "نقبل جميع بطاقات الائتمان الرئيسية (فيزا، ماستركارد، أمريكان إكسبريس)، بطاقات الخصم، أبل باي، جوجل باي، باي بال، والدفع عند الاستلام في مناطق محددة.",
    },
    category: "payments",
  },
  {
    id: 3,
    question: {
      en: "How long does delivery take?",
      ar: "كم يستغرق التوصيل؟",
    },
    answer: {
      en: "Standard delivery takes 3-5 business days. Express delivery is available for 1-2 business days. Same-day delivery is available in select cities for orders placed before 2 PM.",
      ar: "التوصيل العادي يستغرق 3-5 أيام عمل. التوصيل السريع متاح خلال 1-2 يوم عمل. التوصيل في نفس اليوم متاح في مدن محددة للطلبات قبل الساعة 2 مساءً.",
    },
    category: "delivery",
  },
  {
    id: 4,
    question: {
      en: "What is your return policy?",
      ar: "ما هي سياسة الإرجاع؟",
    },
    answer: {
      en: "You can return most items within 30 days of delivery for a full refund. Items must be unused and in original packaging. Some categories like electronics have a 14-day return window.",
      ar: "يمكنك إرجاع معظم المنتجات خلال 30 يوماً من التوصيل لاسترداد كامل المبلغ. يجب أن تكون المنتجات غير مستخدمة وفي عبوتها الأصلية. بعض الفئات مثل الإلكترونيات لها فترة إرجاع 14 يوماً.",
    },
    category: "returns",
  },
  {
    id: 5,
    question: {
      en: "How do I change my password?",
      ar: "كيف أغير كلمة المرور؟",
    },
    answer: {
      en: "Go to Account Settings > Security > Change Password. Enter your current password, then your new password twice. Click 'Save' to update your password.",
      ar: "اذهب إلى إعدادات الحساب > الأمان > تغيير كلمة المرور. أدخل كلمة المرور الحالية، ثم كلمة المرور الجديدة مرتين. انقر 'حفظ' لتحديث كلمة المرور.",
    },
    category: "account",
  },
  {
    id: 6,
    question: {
      en: "Is my personal information secure?",
      ar: "هل معلوماتي الشخصية آمنة؟",
    },
    answer: {
      en: "Yes, we use industry-standard encryption (SSL/TLS) to protect your data. We never share your personal information with third parties without your consent. Read our Privacy Policy for more details.",
      ar: "نعم، نستخدم تشفير بمعايير الصناعة (SSL/TLS) لحماية بياناتك. لا نشارك معلوماتك الشخصية مع أطراف ثالثة بدون موافقتك. اقرأ سياسة الخصوصية لمزيد من التفاصيل.",
    },
    category: "security",
  },
  {
    id: 7,
    question: {
      en: "How do I cancel an order?",
      ar: "كيف ألغي طلباً؟",
    },
    answer: {
      en: "You can cancel an order within 1 hour of placing it by going to 'My Orders' and clicking 'Cancel Order'. If the order has already been shipped, you'll need to wait for delivery and then initiate a return.",
      ar: "يمكنك إلغاء الطلب خلال ساعة واحدة من تقديمه بالذهاب إلى 'طلباتي' والنقر على 'إلغاء الطلب'. إذا تم شحن الطلب بالفعل، ستحتاج للانتظار حتى التوصيل ثم بدء عملية إرجاع.",
    },
    category: "orders",
  },
  {
    id: 8,
    question: {
      en: "Do you offer free shipping?",
      ar: "هل تقدمون شحن مجاني؟",
    },
    answer: {
      en: "Yes! We offer free standard shipping on orders over $50. Amanoon Prime members get free express shipping on all orders with no minimum purchase required.",
      ar: "نعم! نقدم شحن مجاني عادي على الطلبات فوق 50 دولار. أعضاء أمانون برايم يحصلون على شحن سريع مجاني على جميع الطلبات بدون حد أدنى للشراء.",
    },
    category: "delivery",
  },
];

const popularArticles = [
  {
    title: { en: "How to track your order", ar: "كيفية تتبع طلبك" },
    views: "15.2K",
  },
  {
    title: { en: "Return and refund process", ar: "عملية الإرجاع والاسترداد" },
    views: "12.8K",
  },
  {
    title: { en: "Payment methods guide", ar: "دليل طرق الدفع" },
    views: "10.5K",
  },
  {
    title: { en: "Update account information", ar: "تحديث معلومات الحساب" },
    views: "8.9K",
  },
  {
    title: { en: "Delivery time estimates", ar: "تقديرات وقت التوصيل" },
    views: "7.6K",
  },
];

export default function HelpPage() {
  const { language } = useLanguageStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div
      className="min-h-screen bg-muted/30"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="h-16 w-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === "ar" ? "مركز المساعدة" : "Help Center"}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            {language === "ar"
              ? "كيف يمكننا مساعدتك اليوم؟"
              : "How can we help you today?"}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder={
                language === "ar"
                  ? "ابحث عن إجابات، مثل 'كيف أتتبع طلبي'"
                  : "Search for answers, e.g. 'How to track my order'"
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 rtl:pl-4 rtl:pr-12 py-6 text-lg rounded-full shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-16 mb-12">
          <Link
            href="#"
            className="bg-card rounded-xl border p-4 text-center hover:shadow-lg transition-shadow"
          >
            <Package className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <span className="text-sm font-medium">
              {language === "ar" ? "تتبع الطلب" : "Track Order"}
            </span>
          </Link>
          <Link
            href="#"
            className="bg-card rounded-xl border p-4 text-center hover:shadow-lg transition-shadow"
          >
            <RotateCcw className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <span className="text-sm font-medium">
              {language === "ar" ? "بدء إرجاع" : "Start Return"}
            </span>
          </Link>
          <Link
            href="#"
            className="bg-card rounded-xl border p-4 text-center hover:shadow-lg transition-shadow"
          >
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <span className="text-sm font-medium">
              {language === "ar" ? "محادثة فورية" : "Live Chat"}
            </span>
          </Link>
          <Link
            href="#"
            className="bg-card rounded-xl border p-4 text-center hover:shadow-lg transition-shadow"
          >
            <Phone className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <span className="text-sm font-medium">
              {language === "ar" ? "اتصل بنا" : "Call Us"}
            </span>
          </Link>
        </div>

        {/* Help Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {language === "ar" ? "تصفح حسب الموضوع" : "Browse by Topic"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category) => (
              <Link
                key={category.id}
                href={`/help/${category.id}`}
                className="group bg-card rounded-xl border p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div
                  className={`${category.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                >
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-orange-500 transition-colors">
                  {category.title[language]}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {category.description[language]}
                </p>
                <span className="text-xs text-muted-foreground">
                  {category.articles} {language === "ar" ? "مقال" : "articles"}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-card rounded-xl border overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium pr-4">{faq.question[language]}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform ${expandedFaq === faq.id ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-5 pb-5 pt-0 text-muted-foreground">
                    {faq.answer[language]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Popular Articles */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-500" />
              {language === "ar" ? "المقالات الأكثر قراءة" : "Popular Articles"}
            </h3>
            <div className="space-y-3">
              {popularArticles.map((article, index) => (
                <Link
                  key={index}
                  href="#"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="text-sm">{article.title[language]}</span>
                  <span className="text-xs text-muted-foreground">
                    {article.views} {language === "ar" ? "مشاهدة" : "views"}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Order Status */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-orange-500" />
              {language === "ar" ? "تتبع طلبك السريع" : "Quick Order Tracking"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {language === "ar"
                ? "أدخل رقم الطلب للتتبع الفوري"
                : "Enter your order number for instant tracking"}
            </p>
            <div className="flex gap-2">
              <Input
                placeholder={
                  language === "ar" ? "رقم الطلب" : "Order number"
                }
                className="flex-1"
              />
              <Button className="bg-orange-500 hover:bg-orange-600">
                {language === "ar" ? "تتبع" : "Track"}
              </Button>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">
                    {language === "ar" ? "حالة الطلب #12345" : "Order #12345 Status"}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {language === "ar" ? "في الطريق - يصل اليوم" : "In transit - Arriving today"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Options */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {language === "ar" ? "هل تحتاج المزيد من المساعدة؟" : "Need More Help?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl border p-6 text-center">
              <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="font-bold mb-2">
                {language === "ar" ? "المحادثة الفورية" : "Live Chat"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === "ar"
                  ? "تحدث مع فريق الدعم الآن"
                  : "Chat with our support team now"}
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-green-500 mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {language === "ar" ? "متاح الآن" : "Available now"}
              </div>
              <Button className="w-full bg-green-500 hover:bg-green-600">
                {language === "ar" ? "ابدأ المحادثة" : "Start Chat"}
              </Button>
            </div>

            <div className="bg-card rounded-xl border p-6 text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="font-bold mb-2">
                {language === "ar" ? "اتصل بنا" : "Call Us"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === "ar"
                  ? "تحدث مع أحد ممثلينا"
                  : "Speak with one of our representatives"}
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
                <Clock className="h-3 w-3" />
                {language === "ar" ? "24/7 متاح" : "Available 24/7"}
              </div>
              <Button variant="outline" className="w-full">
                1-800-AMANOON
              </Button>
            </div>

            <div className="bg-card rounded-xl border p-6 text-center">
              <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-bold mb-2">
                {language === "ar" ? "أرسل بريد" : "Email Us"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === "ar"
                  ? "نرد خلال 24 ساعة"
                  : "We respond within 24 hours"}
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
                <AlertCircle className="h-3 w-3" />
                {language === "ar" ? "للاستفسارات غير العاجلة" : "For non-urgent inquiries"}
              </div>
              <Button variant="outline" className="w-full">
                support@amanoon.com
              </Button>
            </div>
          </div>
        </section>

        {/* Self Service Banner */}
        <section>
          <div className="bg-linear-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {language === "ar"
                ? "إدارة طلباتك بسهولة"
                : "Manage Your Orders Easily"}
            </h2>
            <p className="opacity-90 mb-6 max-w-xl mx-auto">
              {language === "ar"
                ? "سجل دخولك للوصول إلى طلباتك، تتبع الشحنات، وإدارة الإرجاع"
                : "Sign in to access your orders, track shipments, and manage returns"}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/login">
                <Button className="bg-white text-orange-500 hover:bg-white/90">
                  {language === "ar" ? "تسجيل الدخول" : "Sign In"}
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  {language === "ar" ? "طلباتي" : "My Orders"}
                  <ChevronRight className="h-4 w-4 mr-1 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
