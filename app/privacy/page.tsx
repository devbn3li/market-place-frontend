"use client";

import { useLanguage } from "@/context/language-context";
import { Shield, Eye, Database, Share2, Lock, Clock, Globe, Mail } from "lucide-react";

export default function PrivacyPage() {
  const { language } = useLanguage();

  const sections = [
    {
      icon: Database,
      titleEn: "Information We Collect",
      titleAr: "المعلومات التي نجمعها",
      contentEn: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, phone number, shipping address, payment information, and any other information you choose to provide.",
      contentAr: "نجمع المعلومات التي تقدمها لنا مباشرة، مثل عند إنشاء حساب أو إجراء عملية شراء أو الاتصال بنا للحصول على الدعم. يشمل ذلك اسمك وعنوان بريدك الإلكتروني ورقم هاتفك وعنوان الشحن ومعلومات الدفع وأي معلومات أخرى تختار تقديمها.",
      items: {
        en: ["Personal identification information", "Contact details", "Payment and billing data", "Order history", "Device and browser information"],
        ar: ["معلومات التعريف الشخصية", "تفاصيل الاتصال", "بيانات الدفع والفواتير", "سجل الطلبات", "معلومات الجهاز والمتصفح"],
      },
    },
    {
      icon: Eye,
      titleEn: "How We Use Your Information",
      titleAr: "كيف نستخدم معلوماتك",
      contentEn: "We use the information we collect to provide, maintain, and improve our services, to process transactions and send related information, and to send you technical notices, updates, security alerts, and support messages.",
      contentAr: "نستخدم المعلومات التي نجمعها لتقديم خدماتنا وصيانتها وتحسينها، ولمعالجة المعاملات وإرسال المعلومات ذات الصلة، ولإرسال الإشعارات الفنية والتحديثات وتنبيهات الأمان ورسائل الدعم.",
      items: {
        en: ["Process and fulfill orders", "Personalize your experience", "Improve our services", "Send promotional communications", "Prevent fraud and abuse"],
        ar: ["معالجة الطلبات وتنفيذها", "تخصيص تجربتك", "تحسين خدماتنا", "إرسال اتصالات ترويجية", "منع الاحتيال وإساءة الاستخدام"],
      },
    },
    {
      icon: Share2,
      titleEn: "Information Sharing",
      titleAr: "مشاركة المعلومات",
      contentEn: "We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this policy. We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you.",
      contentAr: "نحن لا نبيع أو نتاجر أو ننقل معلوماتك الشخصية إلى أطراف خارجية إلا كما هو موضح في هذه السياسة. قد نشارك معلوماتك مع أطراف ثالثة موثوقة تساعدنا في تشغيل موقعنا أو إدارة أعمالنا أو خدمتك.",
      items: {
        en: ["Payment processors", "Shipping partners", "Analytics providers", "Marketing services", "Legal requirements"],
        ar: ["معالجات الدفع", "شركاء الشحن", "مزودي التحليلات", "خدمات التسويق", "المتطلبات القانونية"],
      },
    },
    {
      icon: Lock,
      titleEn: "Data Security",
      titleAr: "أمان البيانات",
      contentEn: "We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights.",
      contentAr: "ننفذ مجموعة متنوعة من التدابير الأمنية للحفاظ على سلامة معلوماتك الشخصية. معلوماتك الشخصية محفوظة خلف شبكات آمنة ولا يمكن الوصول إليها إلا من قبل عدد محدود من الأشخاص الذين لديهم حقوق وصول خاصة.",
      items: {
        en: ["SSL encryption", "Secure payment processing", "Regular security audits", "Access controls", "Data backup systems"],
        ar: ["تشفير SSL", "معالجة دفع آمنة", "تدقيقات أمنية منتظمة", "ضوابط الوصول", "أنظمة النسخ الاحتياطي للبيانات"],
      },
    },
    {
      icon: Clock,
      titleEn: "Data Retention",
      titleAr: "الاحتفاظ بالبيانات",
      contentEn: "We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. The retention period may vary depending on the context of the services we provide.",
      contentAr: "نحتفظ بمعلوماتك الشخصية طالما كان ذلك ضرورياً لتحقيق الأغراض التي جُمعت من أجلها، بما في ذلك تلبية أي متطلبات قانونية أو محاسبية أو إعداد التقارير. قد تختلف فترة الاحتفاظ حسب سياق الخدمات التي نقدمها.",
    },
    {
      icon: Globe,
      titleEn: "Your Rights",
      titleAr: "حقوقك",
      contentEn: "You have the right to access, correct, or delete your personal information at any time. You can also opt out of receiving marketing communications from us. To exercise these rights, please contact us using the information provided below.",
      contentAr: "لديك الحق في الوصول إلى معلوماتك الشخصية أو تصحيحها أو حذفها في أي وقت. يمكنك أيضاً إلغاء الاشتراك في تلقي الاتصالات التسويقية منا. لممارسة هذه الحقوق، يرجى الاتصال بنا باستخدام المعلومات المقدمة أدناه.",
      items: {
        en: ["Access your data", "Request corrections", "Delete your account", "Export your data", "Opt-out of marketing"],
        ar: ["الوصول إلى بياناتك", "طلب التصحيحات", "حذف حسابك", "تصدير بياناتك", "إلغاء الاشتراك في التسويق"],
      },
    },
    {
      icon: Mail,
      titleEn: "Contact Us",
      titleAr: "اتصل بنا",
      contentEn: "If you have any questions about this Privacy Policy, please contact us at privacy@amanoon.com. We are committed to working with you to obtain a fair resolution of any complaint or concern about privacy.",
      contentAr: "إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على privacy@amanoon.com. نحن ملتزمون بالعمل معك للحصول على حل عادل لأي شكوى أو قلق بشأن الخصوصية.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl font-bold mb-4">
            {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {language === "ar"
              ? "خصوصيتك مهمة بالنسبة لنا. تعرف على كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك"
              : "Your privacy is important to us. Learn how we collect, use, and protect your information"}
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
                ? "في أمانون، نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية. توضح سياسة الخصوصية هذه أنواع المعلومات التي قد نجمعها منك أو التي قد تقدمها عند زيارة موقعنا أو استخدام خدماتنا، وممارساتنا لجمع هذه المعلومات واستخدامها والحفاظ عليها وحمايتها والكشف عنها."
                : "At Amanoon, we respect your privacy and are committed to protecting your personal information. This privacy policy explains the types of information we may collect from you or that you may provide when you visit our website or use our services, and our practices for collecting, using, maintaining, protecting, and disclosing that information."}
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
                  <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-lg shrink-0">
                    <section.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-3">
                      {index + 1}. {language === "ar" ? section.titleAr : section.titleEn}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {language === "ar" ? section.contentAr : section.contentEn}
                    </p>
                    {section.items && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(language === "ar" ? section.items.ar : section.items.en).map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 p-6 bg-muted/50 rounded-xl text-center">
            <p className="text-sm text-muted-foreground">
              {language === "ar"
                ? "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات عن طريق نشر السياسة الجديدة على هذه الصفحة."
                : "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
