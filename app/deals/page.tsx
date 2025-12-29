"use client";

import Link from "next/link";
import { useLanguageStore } from "@/stores";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Zap,
  Percent,
  Star,
  Heart,
  TrendingUp,
  Gift,
  Timer,
  Flame,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getDeals } from "@/lib/products";

// Get deals from JSON data
const dealsProducts = getDeals(12);

// Flash deals (first 4)
const flashDeals = dealsProducts.slice(0, 4).map((p, i) => ({
  id: p.id,
  name: p.name,
  image: p.image,
  originalPrice: p.originalPrice,
  salePrice: p.price,
  discount: Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100),
  rating: p.rating,
  reviews: p.reviews,
  sold: 1000 + i * 500,
  stock: 50 - i * 10,
}));

// Daily deals (remaining)
const dailyDeals = dealsProducts.slice(4).map((p) => ({
  id: p.id,
  name: p.name,
  image: p.image,
  originalPrice: p.originalPrice,
  salePrice: p.price,
  discount: Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100),
  rating: p.rating,
  reviews: p.reviews,
}));

// Category deals
const categoryDeals = [
  {
    id: "electronics",
    name: { en: "Electronics", ar: "الإلكترونيات" },
    discount: "Up to 70% OFF",
    discountAr: "خصم يصل إلى 70%",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    color: "from-blue-600 to-cyan-500",
  },
  {
    id: "fashion",
    name: { en: "Fashion", ar: "الأزياء" },
    discount: "Up to 60% OFF",
    discountAr: "خصم يصل إلى 60%",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
    color: "from-pink-600 to-rose-500",
  },
  {
    id: "home",
    name: { en: "Home & Living", ar: "المنزل والمعيشة" },
    discount: "Up to 50% OFF",
    discountAr: "خصم يصل إلى 50%",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    color: "from-green-600 to-emerald-500",
  },
  {
    id: "beauty",
    name: { en: "Beauty", ar: "الجمال" },
    discount: "Up to 55% OFF",
    discountAr: "خصم يصل إلى 55%",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    color: "from-purple-600 to-pink-500",
  },
];

export default function DealsPage() {
  const { language } = useLanguageStore();
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 32,
    seconds: 45,
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="min-h-screen bg-muted/30"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-8 w-8" />
            <h1 className="text-4xl font-bold">
              {language === "ar" ? "العروض والتخفيضات" : "Deals & Offers"}
            </h1>
          </div>
          <p className="text-lg opacity-90">
            {language === "ar"
              ? "اكتشف أفضل العروض والخصومات الحصرية"
              : "Discover the best deals and exclusive discounts"}
          </p>
        </div>
      </div>

      {/* Flash Deals Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 text-white">
              <Flame className="h-8 w-8 animate-pulse" />
              <div>
                <h2 className="text-2xl font-bold">
                  {language === "ar" ? "عروض خاطفة" : "Flash Deals"}
                </h2>
                <p className="text-sm opacity-90">
                  {language === "ar"
                    ? "أسرع! الكمية محدودة"
                    : "Hurry! Limited stock available"}
                </p>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur rounded-xl px-4 py-2">
              <Timer className="h-5 w-5 text-white" />
              <span className="text-white font-medium">
                {language === "ar" ? "ينتهي في:" : "Ends in:"}
              </span>
              <div className="flex gap-1">
                <span className="bg-white text-red-600 font-bold px-2 py-1 rounded">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-white font-bold">:</span>
                <span className="bg-white text-red-600 font-bold px-2 py-1 rounded">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-white font-bold">:</span>
                <span className="bg-white text-red-600 font-bold px-2 py-1 rounded">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Flash Deals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {flashDeals.map((deal) => (
              <Link
                key={deal.id}
                href={`/product/${deal.id}`}
                className="bg-white dark:bg-card rounded-xl overflow-hidden group hover:shadow-xl transition-all"
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={deal.image}
                    alt={deal.name[language]}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{deal.discount}%
                  </span>
                  <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors">
                    {deal.name[language]}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{deal.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({deal.reviews.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">
                      ${deal.salePrice}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${deal.originalPrice}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>
                        {language === "ar" ? "تم البيع:" : "Sold:"} {deal.sold}
                      </span>
                      <span>
                        {language === "ar" ? "متبقي:" : "Left:"} {deal.stock}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{
                          width: `${(deal.sold / (deal.sold + deal.stock)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Category Deals */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Percent className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold">
              {language === "ar" ? "عروض حسب الفئة" : "Deals by Category"}
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryDeals.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}?deals=true`}
                className="relative rounded-2xl overflow-hidden group h-48"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name[language]}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-70`}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                  <h3 className="text-xl font-bold mb-1">
                    {cat.name[language]}
                  </h3>
                  <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                    {language === "ar" ? cat.discountAr : cat.discount}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Daily Deals */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Gift className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold">
                {language === "ar" ? "عروض اليوم" : "Daily Deals"}
              </h2>
            </div>
            <Link
              href="/deals/all"
              className="text-orange-500 hover:underline font-medium"
            >
              {language === "ar" ? "عرض الكل" : "View All"}
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {dailyDeals.map((deal) => (
              <Link
                key={deal.id}
                href={`/product/${deal.id}`}
                className="bg-card rounded-xl overflow-hidden border group hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={deal.image}
                    alt={deal.name[language]}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{deal.discount}%
                  </span>
                  <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors">
                    {deal.name[language]}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{deal.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({deal.reviews.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-orange-500">
                      ${deal.salePrice}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${deal.originalPrice}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Promo Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-2xl p-8 text-white text-center">
          <TrendingUp className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">
            {language === "ar"
              ? "لا تفوت العروض الحصرية!"
              : "Don't Miss Exclusive Offers!"}
          </h2>
          <p className="mb-6 opacity-90 max-w-2xl mx-auto">
            {language === "ar"
              ? "سجل للحصول على إشعارات فورية عند توفر عروض جديدة وخصومات حصرية لأعضائنا"
              : "Sign up for instant notifications when new deals drop and exclusive member-only discounts"}
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-white/90"
          >
            <Clock className="h-5 w-5 mr-2" />
            {language === "ar" ? "فعّل الإشعارات" : "Enable Notifications"}
          </Button>
        </div>
      </div>
    </div>
  );
}
