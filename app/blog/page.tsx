"use client";

import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Clock,
  User,
  Tag,
  Search,
  ArrowRight,
  Heart,
  MessageCircle,
  TrendingUp,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: {
      en: "10 Tips for Smart Online Shopping in 2025",
      ar: "10 نصائح للتسوق الذكي عبر الإنترنت في 2025",
    },
    excerpt: {
      en: "Discover the best strategies to save money and find the best deals while shopping online. From price comparison tools to timing your purchases perfectly.",
      ar: "اكتشف أفضل الاستراتيجيات لتوفير المال والعثور على أفضل العروض أثناء التسوق عبر الإنترنت. من أدوات مقارنة الأسعار إلى توقيت مشترياتك بشكل مثالي.",
    },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    author: { en: "Sarah Ahmed", ar: "سارة أحمد" },
    date: "2024-12-20",
    readTime: 8,
    category: { en: "Shopping Tips", ar: "نصائح التسوق" },
    tags: [
      { en: "Shopping", ar: "تسوق" },
      { en: "Savings", ar: "توفير" },
    ],
    likes: 234,
    comments: 45,
    featured: true,
  },
  {
    id: 2,
    title: {
      en: "The Future of E-commerce: AI and Personalization",
      ar: "مستقبل التجارة الإلكترونية: الذكاء الاصطناعي والتخصيص",
    },
    excerpt: {
      en: "How artificial intelligence is revolutionizing the way we shop online and creating personalized experiences for every customer.",
      ar: "كيف يحدث الذكاء الاصطناعي ثورة في طريقة تسوقنا عبر الإنترنت ويخلق تجارب مخصصة لكل عميل.",
    },
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    author: { en: "Mohammed Ali", ar: "محمد علي" },
    date: "2024-12-15",
    readTime: 12,
    category: { en: "Technology", ar: "تكنولوجيا" },
    tags: [
      { en: "AI", ar: "ذكاء اصطناعي" },
      { en: "Future", ar: "المستقبل" },
    ],
    likes: 456,
    comments: 78,
    featured: true,
  },
  {
    id: 3,
    title: {
      en: "Sustainable Fashion: Making Eco-Friendly Choices",
      ar: "الأزياء المستدامة: اتخاذ خيارات صديقة للبيئة",
    },
    excerpt: {
      en: "Learn how to build a sustainable wardrobe without compromising on style. Tips for choosing eco-friendly brands and materials.",
      ar: "تعلم كيفية بناء خزانة ملابس مستدامة دون المساومة على الأناقة. نصائح لاختيار العلامات التجارية والمواد الصديقة للبيئة.",
    },
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800",
    author: { en: "Layla Hassan", ar: "ليلى حسن" },
    date: "2024-12-10",
    readTime: 6,
    category: { en: "Fashion", ar: "أزياء" },
    tags: [
      { en: "Sustainability", ar: "استدامة" },
      { en: "Fashion", ar: "أزياء" },
    ],
    likes: 189,
    comments: 32,
    featured: false,
  },
  {
    id: 4,
    title: {
      en: "Home Organization Hacks That Actually Work",
      ar: "حيل تنظيم المنزل التي تعمل فعلاً",
    },
    excerpt: {
      en: "Transform your living space with these proven organization techniques. From decluttering to smart storage solutions.",
      ar: "حوّل مساحة معيشتك مع تقنيات التنظيم المثبتة هذه. من التخلص من الفوضى إلى حلول التخزين الذكية.",
    },
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    author: { en: "Omar Khalid", ar: "عمر خالد" },
    date: "2024-12-05",
    readTime: 10,
    category: { en: "Home & Living", ar: "المنزل والمعيشة" },
    tags: [
      { en: "Organization", ar: "تنظيم" },
      { en: "Home", ar: "منزل" },
    ],
    likes: 312,
    comments: 56,
    featured: false,
  },
  {
    id: 5,
    title: {
      en: "Tech Gadgets Worth Your Money in 2025",
      ar: "أجهزة تقنية تستحق أموالك في 2025",
    },
    excerpt: {
      en: "A comprehensive guide to the best tech gadgets that offer real value. From smartphones to smart home devices.",
      ar: "دليل شامل لأفضل الأجهزة التقنية التي تقدم قيمة حقيقية. من الهواتف الذكية إلى أجهزة المنزل الذكي.",
    },
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
    author: { en: "Fatima Noor", ar: "فاطمة نور" },
    date: "2024-11-28",
    readTime: 15,
    category: { en: "Technology", ar: "تكنولوجيا" },
    tags: [
      { en: "Gadgets", ar: "أجهزة" },
      { en: "Tech", ar: "تقنية" },
    ],
    likes: 567,
    comments: 89,
    featured: false,
  },
  {
    id: 6,
    title: {
      en: "Healthy Eating on a Budget: Complete Guide",
      ar: "الأكل الصحي بميزانية محدودة: دليل شامل",
    },
    excerpt: {
      en: "Eating healthy doesn't have to be expensive. Learn meal planning strategies and smart grocery shopping tips.",
      ar: "الأكل الصحي لا يجب أن يكون مكلفاً. تعلم استراتيجيات تخطيط الوجبات ونصائح التسوق الذكية للبقالة.",
    },
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    author: { en: "Yusuf Ibrahim", ar: "يوسف إبراهيم" },
    date: "2024-11-20",
    readTime: 9,
    category: { en: "Lifestyle", ar: "نمط الحياة" },
    tags: [
      { en: "Health", ar: "صحة" },
      { en: "Food", ar: "طعام" },
    ],
    likes: 423,
    comments: 67,
    featured: false,
  },
];

const categories = [
  { id: "all", name: { en: "All Posts", ar: "جميع المقالات" }, count: 24 },
  { id: "shopping", name: { en: "Shopping Tips", ar: "نصائح التسوق" }, count: 8 },
  { id: "technology", name: { en: "Technology", ar: "تكنولوجيا" }, count: 6 },
  { id: "fashion", name: { en: "Fashion", ar: "أزياء" }, count: 5 },
  { id: "home", name: { en: "Home & Living", ar: "المنزل والمعيشة" }, count: 3 },
  { id: "lifestyle", name: { en: "Lifestyle", ar: "نمط الحياة" }, count: 2 },
];

const popularTags = [
  { en: "Shopping", ar: "تسوق" },
  { en: "Deals", ar: "عروض" },
  { en: "Fashion", ar: "أزياء" },
  { en: "Tech", ar: "تقنية" },
  { en: "Home", ar: "منزل" },
  { en: "Tips", ar: "نصائح" },
  { en: "Reviews", ar: "مراجعات" },
  { en: "Trends", ar: "اتجاهات" },
];

export default function BlogPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

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
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {language === "ar" ? "المدونة" : "Blog"}
            </h1>
          </div>
          <p className="text-xl opacity-90 max-w-2xl mb-8">
            {language === "ar"
              ? "نصائح، أخبار، ومقالات لمساعدتك في الحصول على أفضل تجربة تسوق"
              : "Tips, news, and articles to help you get the best shopping experience"}
          </p>

          {/* Search Bar */}
          <div className="max-w-xl relative">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder={
                language === "ar"
                  ? "ابحث في المقالات..."
                  : "Search articles..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rtl:pl-4 rtl:pr-10 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
            <TrendingUp className="h-6 w-6 text-orange-500" />
            {language === "ar" ? "مقالات مميزة" : "Featured Articles"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group relative rounded-2xl overflow-hidden h-80"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="inline-block bg-orange-500 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {post.category[language]}
                  </span>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                    {post.title[language]}
                  </h3>
                  <p className="text-sm opacity-80 line-clamp-2 mb-3">
                    {post.excerpt[language]}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author[language]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} {language === "ar" ? "دقيقة" : "min read"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">
              {language === "ar" ? "أحدث المقالات" : "Latest Articles"}
            </h2>

            <div className="space-y-6">
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all flex flex-col sm:flex-row"
                >
                  <div className="sm:w-64 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title[language]}
                      className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-5 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded-full">
                        {post.category[language]}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-orange-500 transition-colors">
                      {post.title[language]}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {post.excerpt[language]}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author[language]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime} {language === "ar" ? "د" : "min"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                {language === "ar" ? "تحميل المزيد" : "Load More"}
                <ArrowRight className="h-4 w-4 mr-2 rtl:rotate-180" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <div className="bg-card rounded-xl border p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5 text-orange-500" />
                {language === "ar" ? "التصنيفات" : "Categories"}
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${selectedCategory === cat.id
                        ? "bg-orange-500 text-white"
                        : "hover:bg-muted"
                      }`}
                  >
                    <span>{cat.name[language]}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === cat.id
                          ? "bg-white/20"
                          : "bg-muted"
                        }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-card rounded-xl border p-6">
              <h3 className="font-bold text-lg mb-4">
                {language === "ar" ? "الوسوم الشائعة" : "Popular Tags"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-orange-500 hover:text-white cursor-pointer transition-colors"
                  >
                    #{tag[language]}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">
                {language === "ar"
                  ? "اشترك في نشرتنا البريدية"
                  : "Subscribe to our Newsletter"}
              </h3>
              <p className="text-sm opacity-90 mb-4">
                {language === "ar"
                  ? "احصل على أحدث المقالات والعروض مباشرة في بريدك"
                  : "Get the latest articles and deals directly in your inbox"}
              </p>
              <Input
                type="email"
                placeholder={
                  language === "ar" ? "بريدك الإلكتروني" : "Your email"
                }
                className="mb-3 bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
              <Button className="w-full bg-white text-orange-500 hover:bg-white/90">
                {language === "ar" ? "اشترك الآن" : "Subscribe Now"}
              </Button>
            </div>

            {/* Social Share */}
            <div className="bg-card rounded-xl border p-6">
              <h3 className="font-bold text-lg mb-4">
                {language === "ar" ? "تابعنا" : "Follow Us"}
              </h3>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
