"use client";

import Link from "next/link";
import { useLanguageStore } from "@/stores";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Lightbulb,
  Rocket,
  Heart,
  Github,
  Linkedin,
  Globe,
  ShoppingBag,
  Sparkles,
  Users,
  Target,
  Zap,
} from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguageStore();

  return (
    <div
      className="min-h-screen bg-muted/30"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-6">
            <Code2 className="h-5 w-5" />
            <span className="font-medium">
              {language === "ar" ? "مشروع تجريبي" : "Demo Project"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === "ar" ? "عن أمانون" : "About Amanoon"}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {language === "ar"
              ? "اكتشف قصة هذا المشروع التجريبي المستوحى من عمالقة التجارة الإلكترونية"
              : "Discover the story behind this demo project inspired by e-commerce giants"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Project Info */}
        <div className="max-w-4xl mx-auto">
          {/* What is Amanoon */}
          <div className="bg-card rounded-2xl border p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">
                {language === "ar" ? "ما هو أمانون؟" : "What is Amanoon?"}
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                {language === "ar" ? (
                  <>
                    <span className="text-foreground font-semibold">أمانون</span> هو مشروع تجريبي (Demo) لمتجر إلكتروني حديث، تم بناؤه لعرض مهارات تطوير الواجهات الأمامية باستخدام أحدث التقنيات.
                  </>
                ) : (
                  <>
                    <span className="text-foreground font-semibold">Amanoon</span> is a demo e-commerce project built to showcase modern frontend development skills using the latest technologies.
                  </>
                )}
              </p>
              <p>
                {language === "ar"
                  ? "هذا المشروع ليس متجراً حقيقياً ولا يقوم بأي عمليات بيع أو شراء فعلية. إنه مجرد عرض توضيحي لكيفية بناء واجهة متجر إلكتروني احترافي."
                  : "This project is not a real store and does not perform any actual buying or selling operations. It's simply a demonstration of how to build a professional e-commerce interface."}
              </p>
            </div>
          </div>

          {/* Name Origin */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 rounded-2xl border p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">
                {language === "ar" ? "من أين جاء الاسم؟" : "Where did the name come from?"}
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                {language === "ar"
                  ? "اسم \"أمانون\" مستوحى من دمج اسمي أكبر متجرين إلكترونيين في المنطقة:"
                  : 'The name "Amanoon" is inspired by combining the names of two major e-commerce platforms:'}
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white dark:bg-card rounded-xl p-6 border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-16 h-12 bg-[#232F3E] rounded-lg flex items-center justify-center p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                        alt="Amazon Logo"
                        className="h-full w-full object-contain brightness-0 invert"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Amazon</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === "ar" ? "أمازون" : "Amazon"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar"
                      ? "أكبر متجر إلكتروني في العالم، معروف بتنوع المنتجات والشحن السريع"
                      : "The world's largest online store, known for product variety and fast shipping"}
                  </p>
                </div>
                <div className="bg-white dark:bg-card rounded-xl p-6 border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-16 h-12 bg-[#FEEE00] rounded-lg flex items-center justify-center p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Noon_Website_Logo.svg/2560px-Noon_Website_Logo.svg.png"
                        alt="Noon Logo"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Noon</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === "ar" ? "نون" : "Noon"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar"
                      ? "منصة التجارة الإلكترونية الرائدة في الشرق الأوسط"
                      : "The leading e-commerce platform in the Middle East"}
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-card rounded-xl p-6 border mt-6 text-center">
                <p className="text-lg mb-2">
                  <span className="font-bold text-[#FF9900]">Amazon</span>
                  <span className="text-muted-foreground mx-2">+</span>
                  <span className="font-bold text-[#FEEE00] dark:text-yellow-400">noon</span>
                  <span className="text-muted-foreground mx-2">=</span>
                  <span className="font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent text-xl">
                    {language === "ar" ? "أمانون" : "Amanoon"}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "ar"
                    ? "دمج إبداعي يجمع بين قوة وإلهام المنصتين"
                    : "A creative combination inspired by both platforms"}
                </p>
              </div>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="bg-card rounded-2xl border p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                <Rocket className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">
                {language === "ar" ? "التقنيات المستخدمة" : "Technologies Used"}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Next.js 15", color: "bg-black dark:bg-white dark:text-black" },
                { name: "React 19", color: "bg-cyan-500" },
                { name: "TypeScript", color: "bg-blue-600" },
                { name: "Tailwind CSS", color: "bg-sky-500" },
                { name: "shadcn/ui", color: "bg-zinc-800 dark:bg-zinc-200 dark:text-black" },
                { name: "Lucide Icons", color: "bg-orange-500" },
                { name: "next-themes", color: "bg-purple-600" },
                { name: "localStorage", color: "bg-green-600" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className={`${tech.color} text-white text-center py-3 px-4 rounded-xl font-medium text-sm`}
                >
                  {tech.name}
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-card rounded-2xl border p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <Zap className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">
                {language === "ar" ? "مميزات المشروع" : "Project Features"}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  icon: Globe,
                  title: { en: "Bilingual Support", ar: "دعم ثنائي اللغة" },
                  desc: { en: "Full Arabic & English support with RTL", ar: "دعم كامل للعربية والإنجليزية مع RTL" },
                },
                {
                  icon: Sparkles,
                  title: { en: "Dark Mode", ar: "الوضع الداكن" },
                  desc: { en: "Beautiful dark and light themes", ar: "ثيمات داكنة وفاتحة جميلة" },
                },
                {
                  icon: ShoppingBag,
                  title: { en: "E-commerce UI", ar: "واجهة تجارة إلكترونية" },
                  desc: { en: "Complete shopping experience design", ar: "تصميم تجربة تسوق كاملة" },
                },
                {
                  icon: Rocket,
                  title: { en: "Modern Stack", ar: "تقنيات حديثة" },
                  desc: { en: "Built with latest technologies", ar: "مبني بأحدث التقنيات" },
                },
                {
                  icon: Users,
                  title: { en: "Responsive Design", ar: "تصميم متجاوب" },
                  desc: { en: "Works on all devices", ar: "يعمل على جميع الأجهزة" },
                },
                {
                  icon: Target,
                  title: { en: "Clean Code", ar: "كود نظيف" },
                  desc: { en: "Well-structured & maintainable", ar: "منظم وقابل للصيانة" },
                },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                  <feature.icon className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{feature.title[language]}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc[language]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2">
              {language === "ar" ? "⚠️ تنويه مهم" : "⚠️ Important Disclaimer"}
            </h3>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              {language === "ar"
                ? "هذا المشروع هو عمل تجريبي لأغراض تعليمية وعرض المهارات فقط. جميع المنتجات والأسعار والعروض المعروضة هي وهمية وليست حقيقية. لا يمكن إجراء أي عمليات شراء فعلية من خلال هذا الموقع."
                : "This project is a demo for educational and portfolio purposes only. All products, prices, and offers displayed are fictional and not real. No actual purchases can be made through this website."}
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              {language === "ar"
                ? "أعجبك المشروع؟ تواصل معي!"
                : "Like this project? Get in touch!"}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="lg" asChild>
                <Link href="https://github.com/devbn3li" target="_blank">
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="https://linkedin.com/in/devbn3li" target="_blank">
                  <Linkedin className="h-5 w-5 mr-2" />
                  LinkedIn
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <Heart className="h-8 w-8 mx-auto mb-4" />
          <p className="text-lg">
            {language === "ar"
              ? "صُنع بكل ❤️ لعرض مهارات تطوير الويب"
              : "Made with ❤️ to showcase web development skills"}
          </p>
        </div>
      </div>
    </div>
  );
}
