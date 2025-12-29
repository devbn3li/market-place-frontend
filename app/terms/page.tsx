"use client";

import { useLanguage } from "@/context/language-context";
import { FileText, Scale, ShieldCheck, AlertTriangle, Users, CreditCard, Package, MessageSquare } from "lucide-react";

export default function TermsPage() {
  const { language } = useLanguage();

  const sections = [
    {
      icon: Scale,
      titleEn: "Acceptance of Terms",
      titleAr: "قبول الشروط",
      contentEn: "By accessing and using Amanoon, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. These terms apply to all visitors, users, and others who access or use the service.",
      contentAr: "من خلال الوصول إلى أمانون واستخدامه، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية. إذا كنت لا توافق على الالتزام بما سبق، يرجى عدم استخدام هذه الخدمة. تنطبق هذه الشروط على جميع الزوار والمستخدمين وغيرهم ممن يصلون إلى الخدمة أو يستخدمونها.",
    },
    {
      icon: Users,
      titleEn: "User Accounts",
      titleAr: "حسابات المستخدمين",
      contentEn: "When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities that occur under your account. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.",
      contentAr: "عند إنشاء حساب معنا، يجب عليك تقديم معلومات دقيقة وكاملة وحديثة. أنت مسؤول عن حماية كلمة المرور وعن جميع الأنشطة التي تحدث تحت حسابك. يجب عليك إخطارنا فوراً عند علمك بأي خرق أمني أو استخدام غير مصرح به لحسابك.",
    },
    {
      icon: Package,
      titleEn: "Products and Orders",
      titleAr: "المنتجات والطلبات",
      contentEn: "All products displayed on Amanoon are subject to availability. We reserve the right to discontinue any product at any time. Prices for products are subject to change without notice. We reserve the right to refuse any order you place with us. We may limit or cancel quantities purchased per person, per household, or per order.",
      contentAr: "جميع المنتجات المعروضة على أمانون تخضع للتوفر. نحتفظ بالحق في إيقاف أي منتج في أي وقت. أسعار المنتجات قابلة للتغيير دون إشعار. نحتفظ بالحق في رفض أي طلب تقدمه لنا. قد نقوم بتحديد أو إلغاء الكميات المشتراة لكل شخص أو لكل أسرة أو لكل طلب.",
    },
    {
      icon: CreditCard,
      titleEn: "Payment Terms",
      titleAr: "شروط الدفع",
      contentEn: "We accept various payment methods including credit cards, debit cards, and other electronic payment methods. All payments are processed securely through our payment partners. You agree to provide current, complete, and accurate purchase and account information for all purchases made on our platform.",
      contentAr: "نقبل طرق دفع متنوعة بما في ذلك بطاقات الائتمان وبطاقات الخصم وطرق الدفع الإلكترونية الأخرى. تتم معالجة جميع المدفوعات بشكل آمن من خلال شركاء الدفع لدينا. أنت توافق على تقديم معلومات شراء وحساب حالية وكاملة ودقيقة لجميع المشتريات التي تتم على منصتنا.",
    },
    {
      icon: ShieldCheck,
      titleEn: "Intellectual Property",
      titleAr: "الملكية الفكرية",
      contentEn: "The service and its original content, features, and functionality are and will remain the exclusive property of Amanoon. The service is protected by copyright, trademark, and other laws. Our trademarks may not be used in connection with any product or service without prior written consent.",
      contentAr: "الخدمة ومحتواها الأصلي وميزاتها ووظائفها هي وستظل الملكية الحصرية لأمانون. الخدمة محمية بموجب حقوق النشر والعلامات التجارية والقوانين الأخرى. لا يجوز استخدام علاماتنا التجارية فيما يتعلق بأي منتج أو خدمة دون موافقة كتابية مسبقة.",
    },
    {
      icon: AlertTriangle,
      titleEn: "Limitation of Liability",
      titleAr: "تحديد المسؤولية",
      contentEn: "In no event shall Amanoon, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
      contentAr: "لن تكون أمانون أو مديروها أو موظفوها أو شركاؤها أو وكلاؤها أو مورديها أو الشركات التابعة لها مسؤولة بأي حال من الأحوال عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية، بما في ذلك على سبيل المثال لا الحصر خسارة الأرباح أو البيانات أو الاستخدام أو السمعة التجارية أو الخسائر غير الملموسة الأخرى.",
    },
    {
      icon: MessageSquare,
      titleEn: "Contact Us",
      titleAr: "اتصل بنا",
      contentEn: "If you have any questions about these Terms, please contact us at legal@amanoon.com or through our customer service center. We are committed to resolving any disputes amicably and in accordance with applicable laws.",
      contentAr: "إذا كانت لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا على legal@amanoon.com أو من خلال مركز خدمة العملاء لدينا. نحن ملتزمون بحل أي نزاعات بشكل ودي ووفقاً للقوانين المعمول بها.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <FileText className="h-16 w-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl font-bold mb-4">
            {language === "ar" ? "الشروط والأحكام" : "Terms of Service"}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {language === "ar"
              ? "يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا"
              : "Please read these terms carefully before using our services"}
          </p>
          <p className="text-sm opacity-75 mt-4">
            {language === "ar" ? "آخر تحديث: ديسمبر 2025" : "Last updated: December 2025"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-card rounded-xl p-6 shadow-sm border mb-8">
            <p className="text-muted-foreground leading-relaxed">
              {language === "ar"
                ? "مرحباً بك في أمانون. تحكم هذه الشروط والأحكام استخدامك لموقعنا الإلكتروني وخدماتنا. من خلال الوصول إلى منصتنا أو استخدامها، فإنك توافق على الالتزام بهذه الشروط. إذا كنت لا توافق على أي جزء من الشروط، فلا يجوز لك الوصول إلى الخدمة."
                : "Welcome to Amanoon. These terms and conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service."}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 dark:bg-orange-500/20 rounded-lg shrink-0">
                    <section.icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-3">
                      {index + 1}. {language === "ar" ? section.titleAr : section.titleEn}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {language === "ar" ? section.contentAr : section.contentEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 p-6 bg-muted/50 rounded-xl text-center">
            <p className="text-sm text-muted-foreground">
              {language === "ar"
                ? "باستخدامك لأمانون، فإنك توافق على هذه الشروط والأحكام. نحتفظ بالحق في تعديل هذه الشروط في أي وقت."
                : "By using Amanoon, you agree to these terms and conditions. We reserve the right to modify these terms at any time."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
