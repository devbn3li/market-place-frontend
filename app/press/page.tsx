"use client";

import { useLanguageStore } from "@/stores";
import { Button } from "@/components/ui/button";
import {
  Newspaper,
  Download,
  ExternalLink,
  Mail,
  Calendar,
  Building2,
  Image as ImageIcon,
  FileText,
  Video,
  Mic,
  Quote,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const pressReleases = [
  {
    id: 1,
    title: {
      en: "Amanoon Reaches 10 Million Active Users Milestone",
      ar: "أمانون تصل إلى 10 مليون مستخدم نشط",
    },
    date: "2024-12-15",
    category: { en: "Company News", ar: "أخبار الشركة" },
    excerpt: {
      en: "Amanoon celebrates reaching 10 million active users across the Middle East region, marking a significant milestone in our growth journey.",
      ar: "تحتفل أمانون بوصولها إلى 10 مليون مستخدم نشط في منطقة الشرق الأوسط، مما يمثل علامة فارقة في مسيرة نمونا.",
    },
  },
  {
    id: 2,
    title: {
      en: "Amanoon Launches Same-Day Delivery in 5 New Cities",
      ar: "أمانون تطلق خدمة التوصيل في نفس اليوم في 5 مدن جديدة",
    },
    date: "2024-11-28",
    category: { en: "Service Update", ar: "تحديث الخدمة" },
    excerpt: {
      en: "Expanding our commitment to fast delivery, Amanoon now offers same-day delivery service in Riyadh, Jeddah, Dubai, Abu Dhabi, and Cairo.",
      ar: "توسيعاً لالتزامنا بالتوصيل السريع، تقدم أمانون الآن خدمة التوصيل في نفس اليوم في الرياض وجدة ودبي وأبوظبي والقاهرة.",
    },
  },
  {
    id: 3,
    title: {
      en: "Amanoon Partners with 500+ Local Brands",
      ar: "أمانون تشارك مع أكثر من 500 علامة تجارية محلية",
    },
    date: "2024-11-10",
    category: { en: "Partnership", ar: "شراكة" },
    excerpt: {
      en: "Supporting local businesses, Amanoon announces partnerships with over 500 local brands to bring authentic regional products to customers.",
      ar: "دعماً للأعمال المحلية، تعلن أمانون عن شراكات مع أكثر من 500 علامة تجارية محلية لتقديم منتجات إقليمية أصيلة للعملاء.",
    },
  },
  {
    id: 4,
    title: {
      en: "Amanoon Introduces AI-Powered Shopping Assistant",
      ar: "أمانون تقدم مساعد التسوق المدعوم بالذكاء الاصطناعي",
    },
    date: "2024-10-20",
    category: { en: "Technology", ar: "تكنولوجيا" },
    excerpt: {
      en: "Revolutionizing online shopping experience with our new AI assistant that helps customers find exactly what they need.",
      ar: "ثورة في تجربة التسوق عبر الإنترنت مع مساعدنا الجديد بالذكاء الاصطناعي الذي يساعد العملاء في العثور على ما يحتاجونه بالضبط.",
    },
  },
  {
    id: 5,
    title: {
      en: "Amanoon Commits to Carbon-Neutral Delivery by 2026",
      ar: "أمانون تلتزم بتوصيل محايد للكربون بحلول 2026",
    },
    date: "2024-09-15",
    category: { en: "Sustainability", ar: "الاستدامة" },
    excerpt: {
      en: "As part of our environmental commitment, Amanoon pledges to achieve carbon-neutral delivery operations by 2026.",
      ar: "كجزء من التزامنا البيئي، تتعهد أمانون بتحقيق عمليات توصيل محايدة للكربون بحلول عام 2026.",
    },
  },
];

const mediaCoverage = [
  {
    id: 1,
    source: "TechCrunch",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/TechCrunch_logo.svg",
    title: {
      en: "Amanoon: The Rising Star of Middle East E-commerce",
      ar: "أمانون: النجم الصاعد للتجارة الإلكترونية في الشرق الأوسط",
    },
    date: "2024-12-01",
    link: "#",
  },
  {
    id: 2,
    source: "Forbes Middle East",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Forbes_logo.svg",
    title: {
      en: "How Amanoon is Reshaping Online Shopping",
      ar: "كيف تعيد أمانون تشكيل التسوق عبر الإنترنت",
    },
    date: "2024-11-15",
    link: "#",
  },
  {
    id: 3,
    source: "Bloomberg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/New_Bloomberg_Logo.svg",
    title: {
      en: "Amanoon Reports Record Growth in Q3 2024",
      ar: "أمانون تسجل نمواً قياسياً في الربع الثالث 2024",
    },
    date: "2024-10-28",
    link: "#",
  },
  {
    id: 4,
    source: "Arab News",
    logo: "https://www.arabnews.com/sites/default/files/an_logo.png",
    title: {
      en: "Amanoon Creates 5,000 New Jobs in the Region",
      ar: "أمانون توفر 5000 وظيفة جديدة في المنطقة",
    },
    date: "2024-10-10",
    link: "#",
  },
];

const companyStats = [
  { value: "10M+", label: { en: "Active Users", ar: "مستخدم نشط" } },
  { value: "50K+", label: { en: "Products", ar: "منتج" } },
  { value: "15+", label: { en: "Countries", ar: "دولة" } },
  { value: "5K+", label: { en: "Employees", ar: "موظف" } },
];

export default function PressPage() {
  const { language } = useLanguageStore();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="min-h-screen bg-muted/30"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {language === "ar" ? "الأخبار والإعلام" : "Press & Media"}
            </h1>
          </div>
          <p className="text-xl opacity-90 max-w-2xl">
            {language === "ar"
              ? "أحدث الأخبار والبيانات الصحفية والموارد الإعلامية من أمانون"
              : "Latest news, press releases, and media resources from Amanoon"}
          </p>
        </div>
      </div>

      {/* Company Stats */}
      <div className="container mx-auto px-4 -mt-10">
        <div className="bg-card rounded-xl border shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-orange-500">
                  {stat.value}
                </p>
                <p className="text-muted-foreground mt-1">
                  {stat.label[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Press Releases Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-orange-500" />
              {language === "ar" ? "البيانات الصحفية" : "Press Releases"}
            </h2>
            <Button variant="outline">
              {language === "ar" ? "عرض الكل" : "View All"}
              <ArrowRight className="h-4 w-4 mr-2 rtl:rotate-180" />
            </Button>
          </div>

          <div className="space-y-4">
            {pressReleases.map((release) => (
              <div
                key={release.id}
                className="bg-card rounded-xl border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded-full">
                        {release.category[language]}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(release.date)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 hover:text-orange-500 transition-colors cursor-pointer">
                      {release.title[language]}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {release.excerpt[language]}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      {language === "ar" ? "اقرأ المزيد" : "Read More"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Media Coverage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
            <Mic className="h-6 w-6 text-orange-500" />
            {language === "ar" ? "التغطية الإعلامية" : "Media Coverage"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mediaCoverage.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="bg-card rounded-xl border p-6 hover:shadow-lg transition-all hover:-translate-y-1 flex items-start gap-4"
              >
                <div className="w-20 h-12 bg-muted rounded flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-muted-foreground">
                    {item.source}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">
                    {item.source} • {formatDate(item.date)}
                  </p>
                  <h3 className="font-medium hover:text-orange-500 transition-colors">
                    {item.title[language]}
                  </h3>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* Brand Resources Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
            <ImageIcon className="h-6 w-6 text-orange-500" />
            {language === "ar" ? "موارد العلامة التجارية" : "Brand Resources"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl border p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-semibold mb-2">
                {language === "ar" ? "الشعارات" : "Logos"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === "ar"
                  ? "تحميل شعارات أمانون بجميع الصيغ"
                  : "Download Amanoon logos in all formats"}
              </p>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                {language === "ar" ? "تحميل" : "Download"}
              </Button>
            </div>

            <div className="bg-card rounded-xl border p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-semibold mb-2">
                {language === "ar" ? "دليل العلامة التجارية" : "Brand Guidelines"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === "ar"
                  ? "إرشادات استخدام العلامة التجارية"
                  : "Guidelines for using our brand"}
              </p>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                {language === "ar" ? "تحميل" : "Download"}
              </Button>
            </div>

            <div className="bg-card rounded-xl border p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-semibold mb-2">
                {language === "ar" ? "مكتبة الوسائط" : "Media Library"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === "ar"
                  ? "صور وفيديوهات للاستخدام الإعلامي"
                  : "Photos and videos for media use"}
              </p>
              <Button variant="outline" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                {language === "ar" ? "عرض" : "View"}
              </Button>
            </div>
          </div>
        </section>

        {/* Executive Quote */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white">
            <Quote className="h-12 w-12 opacity-50 mb-4" />
            <blockquote className="text-xl md:text-2xl font-medium mb-6 max-w-3xl">
              {language === "ar"
                ? "نحن ملتزمون بتقديم تجربة تسوق استثنائية لعملائنا في جميع أنحاء المنطقة، مع دعم الأعمال المحلية والحفاظ على البيئة."
                : "We are committed to delivering an exceptional shopping experience to our customers across the region, while supporting local businesses and preserving the environment."}
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <Building2 className="h-7 w-7" />
              </div>
              <div>
                <p className="font-bold">
                  {language === "ar" ? "أحمد محمد" : "Ahmed Mohammed"}
                </p>
                <p className="text-sm opacity-90">
                  {language === "ar"
                    ? "الرئيس التنفيذي، أمانون"
                    : "CEO, Amanoon"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Press Contact */}
        <section>
          <div className="bg-card rounded-xl border p-8 text-center">
            <Mail className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              {language === "ar" ? "تواصل معنا" : "Press Contact"}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              {language === "ar"
                ? "للاستفسارات الإعلامية والمقابلات، يرجى التواصل مع فريق العلاقات الإعلامية"
                : "For media inquiries and interviews, please contact our media relations team"}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Mail className="h-4 w-4 mr-2" />
                press@amanoon.com
              </Button>
              <Button variant="outline">
                {language === "ar" ? "نموذج الاستفسار" : "Inquiry Form"}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
