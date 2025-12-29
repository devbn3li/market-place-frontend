"use client";

import { useLanguage } from "@/context/language-context";
import { Cookie, Settings, BarChart3, Target, Shield, ToggleLeft, HelpCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CookiesPage() {
  const { language } = useLanguage();
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    preferences: true,
  });

  const cookieTypes = [
    {
      icon: Shield,
      key: "essential",
      titleEn: "Essential Cookies",
      titleAr: "ملفات تعريف الارتباط الأساسية",
      descEn: "These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you such as setting your privacy preferences, logging in, or filling in forms.",
      descAr: "هذه الملفات ضرورية لعمل الموقع ولا يمكن إيقافها. عادة ما يتم تعيينها فقط استجابة للإجراءات التي تقوم بها مثل تعيين تفضيلات الخصوصية أو تسجيل الدخول أو ملء النماذج.",
      required: true,
      examples: {
        en: ["Session management", "Authentication", "Security tokens", "Shopping cart"],
        ar: ["إدارة الجلسة", "المصادقة", "رموز الأمان", "عربة التسوق"],
      },
    },
    {
      icon: BarChart3,
      key: "analytics",
      titleEn: "Analytics Cookies",
      titleAr: "ملفات تعريف الارتباط التحليلية",
      descEn: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.",
      descAr: "تتيح لنا هذه الملفات حساب الزيارات ومصادر حركة المرور حتى نتمكن من قياس أداء موقعنا وتحسينه. تساعدنا في معرفة الصفحات الأكثر والأقل شعبية ورؤية كيفية تنقل الزوار في الموقع.",
      required: false,
      examples: {
        en: ["Google Analytics", "Page views tracking", "User behavior", "Performance metrics"],
        ar: ["Google Analytics", "تتبع مشاهدات الصفحة", "سلوك المستخدم", "مقاييس الأداء"],
      },
    },
    {
      icon: Target,
      key: "marketing",
      titleEn: "Marketing Cookies",
      titleAr: "ملفات تعريف الارتباط التسويقية",
      descEn: "These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant advertisements on other sites. They do not store directly personal information.",
      descAr: "قد يتم تعيين هذه الملفات من خلال موقعنا بواسطة شركائنا في الإعلان. قد تُستخدم لبناء ملف تعريف لاهتماماتك وعرض إعلانات ذات صلة على مواقع أخرى. لا تخزن معلومات شخصية مباشرة.",
      required: false,
      examples: {
        en: ["Targeted advertising", "Social media sharing", "Remarketing", "Ad performance"],
        ar: ["الإعلانات المستهدفة", "مشاركة وسائل التواصل", "إعادة التسويق", "أداء الإعلانات"],
      },
    },
    {
      icon: Settings,
      key: "preferences",
      titleEn: "Preference Cookies",
      titleAr: "ملفات تعريف الارتباط للتفضيلات",
      descEn: "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.",
      descAr: "تمكن هذه الملفات الموقع من توفير وظائف محسنة وتخصيص. قد يتم تعيينها من قبلنا أو من قبل مزودي الخدمات الخارجيين الذين أضفنا خدماتهم إلى صفحاتنا.",
      required: false,
      examples: {
        en: ["Language settings", "Theme preferences", "Location data", "Personalization"],
        ar: ["إعدادات اللغة", "تفضيلات المظهر", "بيانات الموقع", "التخصيص"],
      },
    },
  ];

  const handleToggle = (key: string) => {
    if (key === "essential") return; // Cannot disable essential cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const savePreferences = () => {
    // Here you would save to localStorage or send to server
    console.log("Saving preferences:", preferences);
    alert(language === "ar" ? "تم حفظ تفضيلاتك!" : "Your preferences have been saved!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Cookie className="h-16 w-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl font-bold mb-4">
            {language === "ar" ? "سياسة ملفات تعريف الارتباط" : "Cookie Policy"}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {language === "ar"
              ? "تعرف على كيفية استخدامنا لملفات تعريف الارتباط وكيفية إدارة تفضيلاتك"
              : "Learn how we use cookies and how to manage your preferences"}
          </p>
          <p className="text-sm opacity-75 mt-4">
            {language === "ar" ? "آخر تحديث: ديسمبر 2025" : "Last updated: December 2025"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* What are Cookies */}
          <div className="bg-card rounded-xl p-6 shadow-sm border mb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-lg shrink-0">
                <HelpCircle className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">
                  {language === "ar" ? "ما هي ملفات تعريف الارتباط؟" : "What are Cookies?"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "ar"
                    ? "ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة موقع ويب. تُستخدم على نطاق واسع لجعل المواقع تعمل بشكل أكثر كفاءة، وكذلك لتوفير معلومات لأصحاب الموقع. تساعدنا ملفات تعريف الارتباط على تحسين تجربتك وتقديم محتوى مخصص."
                    : "Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to website owners. Cookies help us improve your experience and deliver personalized content."}
                </p>
              </div>
            </div>
          </div>

          {/* Cookie Preferences */}
          <div className="bg-card rounded-xl p-6 shadow-sm border mb-8">
            <div className="flex items-center gap-3 mb-6">
              <ToggleLeft className="h-6 w-6 text-purple-500" />
              <h2 className="text-xl font-semibold">
                {language === "ar" ? "إدارة تفضيلاتك" : "Manage Your Preferences"}
              </h2>
            </div>
            <p className="text-muted-foreground mb-6">
              {language === "ar"
                ? "يمكنك تخصيص إعدادات ملفات تعريف الارتباط أدناه. ملفات تعريف الارتباط الأساسية مطلوبة لعمل الموقع."
                : "You can customize your cookie settings below. Essential cookies are required for the site to function."}
            </p>

            <div className="space-y-4">
              {cookieTypes.map((cookie) => (
                <div
                  key={cookie.key}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <cookie.icon className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">
                        {language === "ar" ? cookie.titleAr : cookie.titleEn}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {cookie.required
                          ? language === "ar"
                            ? "مطلوب"
                            : "Required"
                          : language === "ar"
                            ? "اختياري"
                            : "Optional"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle(cookie.key)}
                    disabled={cookie.required}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences[cookie.key as keyof typeof preferences]
                        ? "bg-purple-500"
                        : "bg-gray-300 dark:bg-gray-600"
                      } ${cookie.required ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences[cookie.key as keyof typeof preferences]
                          ? "translate-x-6"
                          : "translate-x-1"
                        }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <Button
              onClick={savePreferences}
              className="w-full mt-6 bg-purple-500 hover:bg-purple-600"
            >
              {language === "ar" ? "حفظ التفضيلات" : "Save Preferences"}
            </Button>
          </div>

          {/* Cookie Types Detail */}
          <h2 className="text-2xl font-bold mb-6">
            {language === "ar" ? "أنواع ملفات تعريف الارتباط" : "Types of Cookies We Use"}
          </h2>

          <div className="space-y-6">
            {cookieTypes.map((cookie, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-lg shrink-0">
                    <cookie.icon className="h-6 w-6 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-semibold">
                        {language === "ar" ? cookie.titleAr : cookie.titleEn}
                      </h3>
                      {cookie.required && (
                        <span className="text-xs bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full">
                          {language === "ar" ? "مطلوب" : "Required"}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {language === "ar" ? cookie.descAr : cookie.descEn}
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm font-medium mb-2">
                        {language === "ar" ? "أمثلة:" : "Examples:"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(language === "ar" ? cookie.examples.ar : cookie.examples.en).map(
                          (example, i) => (
                            <span
                              key={i}
                              className="text-xs bg-background px-2 py-1 rounded border"
                            >
                              {example}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How to Control Cookies */}
          <div className="mt-8 bg-card rounded-xl p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">
              {language === "ar" ? "كيفية التحكم في ملفات تعريف الارتباط" : "How to Control Cookies"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {language === "ar"
                ? "يمكنك التحكم في ملفات تعريف الارتباط وإدارتها من خلال إعدادات المتصفح. يرجى ملاحظة أن حذف ملفات تعريف الارتباط أو تعطيلها قد يؤثر على وظائف موقعنا."
                : "You can control and manage cookies through your browser settings. Please note that deleting or disabling cookies may affect the functionality of our website."}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Chrome", "Firefox", "Safari", "Edge"].map((browser) => (
                <div
                  key={browser}
                  className="text-center p-3 bg-muted/50 rounded-lg text-sm font-medium"
                >
                  {browser}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="mt-8 bg-card rounded-xl p-6 shadow-sm border">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-lg shrink-0">
                <Mail className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">
                  {language === "ar" ? "اتصل بنا" : "Contact Us"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === "ar"
                    ? "إذا كانت لديك أي أسئلة حول استخدامنا لملفات تعريف الارتباط، يرجى الاتصال بنا على cookies@amanoon.com"
                    : "If you have any questions about our use of cookies, please contact us at cookies@amanoon.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 p-6 bg-muted/50 rounded-xl text-center">
            <p className="text-sm text-muted-foreground">
              {language === "ar"
                ? "قد نقوم بتحديث سياسة ملفات تعريف الارتباط هذه من وقت لآخر. سنخطرك بأي تغييرات عن طريق نشر السياسة الجديدة على هذه الصفحة."
                : "We may update this cookie policy from time to time. We will notify you of any changes by posting the new policy on this page."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
