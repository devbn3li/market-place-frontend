"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Percent, Zap } from "lucide-react";
import { useLanguage, translations as t } from "@/context/language-context";

const categories = [
  { name: t.electronics, emoji: "📱", href: "/categories/electronics", color: "bg-blue-500" },
  { name: t.fashion, emoji: "👗", href: "/categories/fashion", color: "bg-pink-500" },
  { name: t.homeGarden, emoji: "🏠", href: "/categories/home", color: "bg-green-500" },
  { name: t.sports, emoji: "⚽", href: "/categories/sports", color: "bg-orange-500" },
  { name: t.beauty, emoji: "💄", href: "/categories/beauty", color: "bg-purple-500" },
  { name: t.books, emoji: "📚", href: "/categories/books", color: "bg-yellow-500" },
  { name: t.toys, emoji: "🎮", href: "/categories/toys", color: "bg-red-500" },
  { name: t.automotive, emoji: "🚗", href: "/categories/automotive", color: "bg-gray-500" },
];

const featuredProducts = [
  {
    id: 1,
    name: t.wirelessHeadphones,
    price: 79.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    rating: 4.5,
    reviews: 1234,
  },
  {
    id: 2,
    name: t.smartWatch,
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 856,
  },
  {
    id: 3,
    name: t.leatherBag,
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 423,
  },
  {
    id: 4,
    name: t.coffeeBeans,
    price: 24.99,
    originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
    rating: 4.9,
    reviews: 2156,
  },
];

export default function Home() {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <Sparkles className="h-4 w-4" />
                <span>{t.newYearSale[language]}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {t.heroTitle[language]}{" "}
                <span className="text-yellow-200">{t.unbeatablePrices[language]}</span>
              </h1>
              <p className="text-lg text-white/90 max-w-lg">
                {t.heroDescription[language]}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/deals">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90">
                    {t.shopNow[language]}
                    <ArrowRight className={`${language === "ar" ? "mr-2 rotate-180" : "ml-2"} h-5 w-5`} />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    {t.browseCategories[language]}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=600&h=500&fit=crop"
                alt="Shopping"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-16 fill-background block">
            <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z" />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{t.shopByCategory[language]}</h2>
          <Link href="/categories" className="text-orange-500 hover:underline flex items-center gap-1">
            {t.viewAll[language]} <ArrowRight className={`h-4 w-4 ${language === "ar" ? "rotate-180" : ""}`} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group flex flex-col items-center p-4 rounded-xl bg-card hover:shadow-lg transition-all duration-300 border"
            >
              <div className={`w-14 h-14 ${category.color} rounded-full flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                {category.emoji}
              </div>
              <span className="text-sm font-medium text-center">{category.name[language]}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5" />
              <span className="text-sm font-medium">{t.flashSale[language]}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{t.electronicsDeal[language]}</h3>
            <p className="text-sm text-white/80 mb-4">{t.saveUpTo50[language]}</p>
            <Button size="sm" className="bg-white text-blue-600 hover:bg-white/90">
              {t.shopNow[language]}
            </Button>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">{t.trending[language]}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{t.fashionWeek[language]}</h3>
            <p className="text-sm text-white/80 mb-4">{t.newArrivalsDropped[language]}</p>
            <Button size="sm" className="bg-white text-pink-600 hover:bg-white/90">
              {t.discover[language]}
            </Button>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="h-5 w-5" />
              <span className="text-sm font-medium">{t.specialOffer[language]}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{t.freeShippingTitle[language]}</h3>
            <p className="text-sm text-white/80 mb-4">{t.onOrdersOver50[language]}</p>
            <Button size="sm" className="bg-white text-green-600 hover:bg-white/90">
              {t.learnMore[language]}
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{t.featuredProducts[language]}</h2>
          <Link href="/products" className="text-orange-500 hover:underline flex items-center gap-1">
            {t.viewAll[language]} <ArrowRight className={`h-4 w-4 ${language === "ar" ? "rotate-180" : ""}`} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group bg-card rounded-xl border overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute top-2 ${language === "ar" ? "right-2" : "left-2"} bg-red-500 text-white text-xs font-bold px-2 py-1 rounded`}>
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                  {product.name[language]}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-yellow-400 text-xs">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-orange-500">${product.price}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.stayUpdated[language]}</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {t.newsletterDescription[language]}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder={t.enterYourEmail[language]}
              className="flex-1 px-4 py-3 rounded-lg border bg-background"
            />
            <Button className="bg-orange-500 hover:bg-orange-600">{t.subscribe[language]}</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
