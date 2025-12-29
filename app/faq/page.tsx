"use client";

import { useLanguageStore } from "@/stores";
import { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  Package,
  Truck,
  CreditCard,
  RotateCcw,
  Shield,
  User,
  MessageCircle,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface FAQ {
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

interface FAQCategory {
  icon: React.ElementType;
  titleEn: string;
  titleAr: string;
  color: string;
  faqs: FAQ[];
}

const faqCategories: FAQCategory[] = [
  {
    icon: Package,
    titleEn: "Orders & Products",
    titleAr: "الطلبات والمنتجات",
    color: "orange",
    faqs: [
      {
        questionEn: "How do I place an order?",
        questionAr: "كيف أقوم بتقديم طلب؟",
        answerEn: "Simply browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your order. Once confirmed, you'll receive an order confirmation email.",
        answerAr: "ببساطة تصفح منتجاتنا، أضف العناصر إلى سلة التسوق الخاصة بك، ثم انتقل إلى الدفع. ستحتاج إلى تقديم معلومات الشحن وتفاصيل الدفع لإكمال طلبك. بمجرد التأكيد، ستتلقى بريداً إلكترونياً لتأكيد الطلب.",
      },
      {
        questionEn: "Can I modify or cancel my order?",
        questionAr: "هل يمكنني تعديل أو إلغاء طلبي؟",
        answerEn: "You can modify or cancel your order within 1 hour of placing it, as long as it hasn't been shipped yet. Go to 'My Orders' in your account and select the order you wish to modify. If the order has already been shipped, you'll need to wait for delivery and then initiate a return.",
        answerAr: "يمكنك تعديل أو إلغاء طلبك خلال ساعة واحدة من تقديمه، طالما لم يتم شحنه بعد. انتقل إلى 'طلباتي' في حسابك واختر الطلب الذي ترغب في تعديله. إذا تم شحن الطلب بالفعل، ستحتاج إلى انتظار التسليم ثم بدء عملية الإرجاع.",
      },
      {
        questionEn: "How can I track my order?",
        questionAr: "كيف يمكنني تتبع طلبي؟",
        answerEn: "Once your order is shipped, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting 'My Orders'. Click on the specific order to see real-time tracking information.",
        answerAr: "بمجرد شحن طلبك، ستتلقى رقم تتبع عبر البريد الإلكتروني. يمكنك أيضاً تتبع طلبك عن طريق تسجيل الدخول إلى حسابك وزيارة 'طلباتي'. انقر على الطلب المحدد لرؤية معلومات التتبع في الوقت الفعلي.",
      },
      {
        questionEn: "What if I receive a damaged or wrong item?",
        questionAr: "ماذا لو استلمت منتجاً تالفاً أو خاطئاً؟",
        answerEn: "We apologize for any inconvenience! Please contact our customer service within 48 hours of delivery with photos of the damaged/wrong item. We'll arrange for a replacement or full refund immediately.",
        answerAr: "نعتذر عن أي إزعاج! يرجى الاتصال بخدمة العملاء لدينا خلال 48 ساعة من التسليم مع صور المنتج التالف/الخاطئ. سنقوم بترتيب استبدال أو استرداد كامل فوراً.",
      },
    ],
  },
  {
    icon: Truck,
    titleEn: "Shipping & Delivery",
    titleAr: "الشحن والتوصيل",
    color: "blue",
    faqs: [
      {
        questionEn: "What are the shipping options?",
        questionAr: "ما هي خيارات الشحن؟",
        answerEn: "We offer Standard Shipping (5-7 business days), Express Shipping (2-3 business days), and Same-Day Delivery (available in select cities). Shipping costs vary based on your location and the shipping method selected.",
        answerAr: "نقدم الشحن العادي (5-7 أيام عمل)، والشحن السريع (2-3 أيام عمل)، والتوصيل في نفس اليوم (متاح في مدن مختارة). تختلف تكاليف الشحن بناءً على موقعك وطريقة الشحن المحددة.",
      },
      {
        questionEn: "Do you offer free shipping?",
        questionAr: "هل تقدمون شحن مجاني؟",
        answerEn: "Yes! We offer free standard shipping on all orders over $50. During special promotions, we may offer free shipping on all orders regardless of the amount.",
        answerAr: "نعم! نقدم شحن عادي مجاني على جميع الطلبات التي تزيد عن 50 دولاراً. خلال العروض الخاصة، قد نقدم شحن مجاني على جميع الطلبات بغض النظر عن المبلغ.",
      },
      {
        questionEn: "Do you ship internationally?",
        questionAr: "هل تشحنون دولياً؟",
        answerEn: "Yes, we ship to most countries worldwide. International shipping times vary from 7-21 business days depending on your location. Additional customs fees may apply based on your country's regulations.",
        answerAr: "نعم، نشحن إلى معظم دول العالم. تختلف أوقات الشحن الدولي من 7-21 يوم عمل حسب موقعك. قد تُطبق رسوم جمركية إضافية بناءً على لوائح بلدك.",
      },
      {
        questionEn: "What if I'm not home during delivery?",
        questionAr: "ماذا لو لم أكن في المنزل وقت التوصيل؟",
        answerEn: "Our delivery partner will attempt delivery up to 3 times. If you're not available, they'll leave a notice with instructions for rescheduling or picking up from a nearby collection point.",
        answerAr: "سيحاول شريك التوصيل لدينا التسليم حتى 3 مرات. إذا لم تكن متاحاً، سيتركون إشعاراً مع تعليمات لإعادة الجدولة أو الاستلام من نقطة تجميع قريبة.",
      },
    ],
  },
  {
    icon: CreditCard,
    titleEn: "Payment",
    titleAr: "الدفع",
    color: "green",
    faqs: [
      {
        questionEn: "What payment methods do you accept?",
        questionAr: "ما هي طرق الدفع المقبولة؟",
        answerEn: "We accept all major credit and debit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and Cash on Delivery (available in select regions).",
        answerAr: "نقبل جميع بطاقات الائتمان والخصم الرئيسية (Visa، MasterCard، American Express)، و PayPal، و Apple Pay، و Google Pay، والدفع عند الاستلام (متاح في مناطق مختارة).",
      },
      {
        questionEn: "Is my payment information secure?",
        questionAr: "هل معلومات الدفع الخاصة بي آمنة؟",
        answerEn: "Absolutely! We use industry-standard SSL encryption and are PCI DSS compliant. Your payment information is never stored on our servers and is processed securely through our trusted payment partners.",
        answerAr: "بالتأكيد! نستخدم تشفير SSL المعياري في الصناعة ونمتثل لـ PCI DSS. لا يتم تخزين معلومات الدفع الخاصة بك أبداً على خوادمنا ويتم معالجتها بشكل آمن من خلال شركاء الدفع الموثوقين لدينا.",
      },
      {
        questionEn: "Can I pay in installments?",
        questionAr: "هل يمكنني الدفع بالتقسيط؟",
        answerEn: "Yes! We offer Buy Now, Pay Later options through our partners. You can split your payment into 4 interest-free installments on orders over $100.",
        answerAr: "نعم! نقدم خيارات اشترِ الآن وادفع لاحقاً من خلال شركائنا. يمكنك تقسيم دفعتك إلى 4 أقساط بدون فوائد على الطلبات التي تزيد عن 100 دولار.",
      },
      {
        questionEn: "When will I be charged for my order?",
        questionAr: "متى سيتم خصم المبلغ من حسابي؟",
        answerEn: "Your payment method will be charged immediately when you place your order. For pre-orders, you'll be charged when the item ships.",
        answerAr: "سيتم خصم المبلغ من طريقة الدفع الخاصة بك فوراً عند تقديم طلبك. للطلبات المسبقة، سيتم الخصم عند شحن المنتج.",
      },
    ],
  },
  {
    icon: RotateCcw,
    titleEn: "Returns & Refunds",
    titleAr: "الإرجاع والاسترداد",
    color: "purple",
    faqs: [
      {
        questionEn: "What is your return policy?",
        questionAr: "ما هي سياسة الإرجاع الخاصة بكم؟",
        answerEn: "We offer a 30-day return policy for most items. Products must be unused, in original packaging, and with all tags attached. Some categories like electronics have a 14-day return window.",
        answerAr: "نقدم سياسة إرجاع لمدة 30 يوماً لمعظم المنتجات. يجب أن تكون المنتجات غير مستخدمة، في عبوتها الأصلية، مع جميع العلامات مرفقة. بعض الفئات مثل الإلكترونيات لها فترة إرجاع 14 يوماً.",
      },
      {
        questionEn: "How do I initiate a return?",
        questionAr: "كيف أبدأ عملية الإرجاع؟",
        answerEn: "Log into your account, go to 'My Orders', select the item you wish to return, and click 'Return Item'. Follow the instructions to print your prepaid return label and drop off the package at the nearest courier point.",
        answerAr: "سجل الدخول إلى حسابك، انتقل إلى 'طلباتي'، اختر المنتج الذي ترغب في إرجاعه، وانقر على 'إرجاع المنتج'. اتبع التعليمات لطباعة ملصق الإرجاع المدفوع مسبقاً وتسليم الطرد في أقرب نقطة شحن.",
      },
      {
        questionEn: "How long does it take to receive my refund?",
        questionAr: "كم من الوقت يستغرق استلام المبلغ المسترد؟",
        answerEn: "Once we receive and inspect your return, refunds are processed within 3-5 business days. The refund will appear on your original payment method within 5-10 business days depending on your bank.",
        answerAr: "بمجرد استلامنا للإرجاع وفحصه، تتم معالجة المبالغ المستردة خلال 3-5 أيام عمل. سيظهر المبلغ المسترد في طريقة الدفع الأصلية خلال 5-10 أيام عمل حسب بنكك.",
      },
      {
        questionEn: "Are there any items that cannot be returned?",
        questionAr: "هل هناك منتجات لا يمكن إرجاعها؟",
        answerEn: "Yes, certain items cannot be returned for hygiene and safety reasons, including: personal care products, underwear, swimwear, earrings, and customized/personalized items. Food items and digital products are also non-returnable.",
        answerAr: "نعم، بعض المنتجات لا يمكن إرجاعها لأسباب النظافة والسلامة، بما في ذلك: منتجات العناية الشخصية، الملابس الداخلية، ملابس السباحة، الأقراط، والمنتجات المخصصة. المنتجات الغذائية والمنتجات الرقمية أيضاً غير قابلة للإرجاع.",
      },
    ],
  },
  {
    icon: User,
    titleEn: "Account",
    titleAr: "الحساب",
    color: "pink",
    faqs: [
      {
        questionEn: "How do I create an account?",
        questionAr: "كيف أنشئ حساباً؟",
        answerEn: "Click 'Sign Up' at the top of the page. You can register using your email address or sign up quickly using your Google, Facebook, or Apple account.",
        answerAr: "انقر على 'إنشاء حساب' في أعلى الصفحة. يمكنك التسجيل باستخدام عنوان بريدك الإلكتروني أو التسجيل بسرعة باستخدام حساب Google أو Facebook أو Apple.",
      },
      {
        questionEn: "I forgot my password. What should I do?",
        questionAr: "نسيت كلمة المرور. ماذا أفعل؟",
        answerEn: "Click 'Forgot Password' on the login page and enter your email address. We'll send you a link to reset your password. The link expires in 24 hours for security reasons.",
        answerAr: "انقر على 'نسيت كلمة المرور' في صفحة تسجيل الدخول وأدخل عنوان بريدك الإلكتروني. سنرسل لك رابطاً لإعادة تعيين كلمة المرور. تنتهي صلاحية الرابط خلال 24 ساعة لأسباب أمنية.",
      },
      {
        questionEn: "How do I update my account information?",
        questionAr: "كيف أحدث معلومات حسابي؟",
        answerEn: "Log into your account and click on 'Account Settings'. From there, you can update your personal information, addresses, payment methods, and notification preferences.",
        answerAr: "سجل الدخول إلى حسابك وانقر على 'إعدادات الحساب'. من هناك، يمكنك تحديث معلوماتك الشخصية والعناوين وطرق الدفع وتفضيلات الإشعارات.",
      },
      {
        questionEn: "How do I delete my account?",
        questionAr: "كيف أحذف حسابي؟",
        answerEn: "Go to Account Settings > Privacy > Delete Account. Please note that this action is permanent and will remove all your order history, wishlist, and saved information.",
        answerAr: "انتقل إلى إعدادات الحساب > الخصوصية > حذف الحساب. يرجى ملاحظة أن هذا الإجراء دائم وسيزيل جميع سجل طلباتك وقائمة الرغبات والمعلومات المحفوظة.",
      },
    ],
  },
  {
    icon: Shield,
    titleEn: "Security & Privacy",
    titleAr: "الأمان والخصوصية",
    color: "red",
    faqs: [
      {
        questionEn: "How do you protect my personal data?",
        questionAr: "كيف تحمون بياناتي الشخصية؟",
        answerEn: "We take data protection seriously. All data is encrypted using industry-standard protocols. We never sell your personal information to third parties. For more details, please read our Privacy Policy.",
        answerAr: "نأخذ حماية البيانات على محمل الجد. يتم تشفير جميع البيانات باستخدام بروتوكولات معيارية في الصناعة. لا نبيع معلوماتك الشخصية لأطراف ثالثة أبداً. لمزيد من التفاصيل، يرجى قراءة سياسة الخصوصية الخاصة بنا.",
      },
      {
        questionEn: "Is it safe to shop on Amanoon?",
        questionAr: "هل التسوق على أمانون آمن؟",
        answerEn: "Yes! Amanoon is a trusted marketplace with buyer protection. All transactions are encrypted, and we verify sellers before they can list products. Our buyer protection program covers you if something goes wrong.",
        answerAr: "نعم! أمانون سوق موثوق به مع حماية المشتري. جميع المعاملات مشفرة، ونتحقق من البائعين قبل أن يتمكنوا من عرض المنتجات. برنامج حماية المشتري لدينا يحميك إذا حدث خطأ ما.",
      },
      {
        questionEn: "How can I identify phishing attempts?",
        questionAr: "كيف يمكنني التعرف على محاولات التصيد؟",
        answerEn: "Amanoon will never ask for your password or full credit card details via email or phone. Always check that you're on our official website (look for the padlock icon and https://). Report suspicious emails to security@amanoon.com.",
        answerAr: "لن تطلب أمانون أبداً كلمة المرور أو تفاصيل بطاقة الائتمان الكاملة عبر البريد الإلكتروني أو الهاتف. تحقق دائماً من أنك على موقعنا الرسمي (ابحث عن أيقونة القفل و https://). أبلغ عن رسائل البريد الإلكتروني المشبوهة إلى security@amanoon.com.",
      },
    ],
  },
];

export default function FAQPage() {
  const { language } = useLanguageStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleItem = (categoryIndex: number, faqIndex: number) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.questionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.questionAr.includes(searchQuery) ||
          faq.answerEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answerAr.includes(searchQuery)
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  const displayCategories = activeCategory
    ? filteredCategories.filter((c) => c.titleEn === activeCategory)
    : filteredCategories;

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; darkBg: string } } = {
      orange: { bg: "bg-orange-100", text: "text-orange-500", darkBg: "dark:bg-orange-500/20" },
      blue: { bg: "bg-blue-100", text: "text-blue-500", darkBg: "dark:bg-blue-500/20" },
      green: { bg: "bg-green-100", text: "text-green-500", darkBg: "dark:bg-green-500/20" },
      purple: { bg: "bg-purple-100", text: "text-purple-500", darkBg: "dark:bg-purple-500/20" },
      pink: { bg: "bg-pink-100", text: "text-pink-500", darkBg: "dark:bg-pink-500/20" },
      red: { bg: "bg-red-100", text: "text-red-500", darkBg: "dark:bg-red-500/20" },
    };
    return colors[color] || colors.orange;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-orange-500 via-orange-400 to-yellow-500 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <HelpCircle className="h-16 w-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl font-bold mb-4">
            {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            {language === "ar"
              ? "ابحث عن إجابات لأسئلتك الشائعة حول التسوق والشحن والدفع والمزيد"
              : "Find answers to common questions about shopping, shipping, payments, and more"}
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={language === "ar" ? "ابحث عن سؤالك..." : "Search for your question..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg bg-white text-foreground rounded-xl border-0 shadow-lg"
            />
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-16 fill-background block">
            <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z" />
          </svg>
        </div>
      </div>

      {/* Category Pills */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === null
              ? "bg-orange-500 text-white"
              : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
          >
            {language === "ar" ? "الكل" : "All"}
          </button>
          {faqCategories.map((category) => {
            return (
              <button
                key={category.titleEn}
                onClick={() =>
                  setActiveCategory(activeCategory === category.titleEn ? null : category.titleEn)
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${activeCategory === category.titleEn
                  ? "bg-orange-500 text-white"
                  : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
              >
                <category.icon className="h-4 w-4" />
                {language === "ar" ? category.titleAr : category.titleEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {displayCategories.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {language === "ar" ? "لم يتم العثور على نتائج" : "No results found"}
              </h3>
              <p className="text-muted-foreground">
                {language === "ar"
                  ? "جرب كلمات بحث مختلفة أو تصفح الفئات"
                  : "Try different search terms or browse the categories"}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {displayCategories.map((category, categoryIndex) => {
                const colors = getColorClasses(category.color);
                return (
                  <div key={categoryIndex} className="bg-card rounded-2xl border shadow-sm overflow-hidden">
                    {/* Category Header */}
                    <div className={`p-6 ${colors.bg} ${colors.darkBg} border-b`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-3 bg-white dark:bg-background rounded-xl shadow-sm`}>
                          <category.icon className={`h-6 w-6 ${colors.text}`} />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">
                            {language === "ar" ? category.titleAr : category.titleEn}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {category.faqs.length}{" "}
                            {language === "ar" ? "أسئلة" : "questions"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* FAQs */}
                    <div className="divide-y">
                      {category.faqs.map((faq, faqIndex) => {
                        const isOpen = openItems[`${categoryIndex}-${faqIndex}`];
                        return (
                          <div key={faqIndex}>
                            <button
                              onClick={() => toggleItem(categoryIndex, faqIndex)}
                              className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left hover:bg-muted/50 transition-colors"
                            >
                              <span className="font-medium">
                                {language === "ar" ? faq.questionAr : faq.questionEn}
                              </span>
                              <ChevronDown
                                className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""
                                  }`}
                              />
                            </button>
                            {isOpen && (
                              <div className="px-6 pb-4">
                                <p className="text-muted-foreground leading-relaxed bg-muted/30 rounded-lg p-4">
                                  {language === "ar" ? faq.answerAr : faq.answerEn}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <MessageCircle className="h-12 w-12 mx-auto text-orange-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            {language === "ar" ? "لم تجد إجابتك؟" : "Didn't find your answer?"}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {language === "ar"
              ? "فريق خدمة العملاء لدينا متاح على مدار الساعة لمساعدتك"
              : "Our customer service team is available 24/7 to help you"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              {language === "ar" ? "اتصل بنا" : "Contact Us"}
            </a>
            <a
              href="mailto:support@amanoon.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border rounded-lg hover:bg-muted transition-colors"
            >
              {language === "ar" ? "أرسل بريداً إلكترونياً" : "Send an Email"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
