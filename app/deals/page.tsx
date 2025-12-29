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

// Flash deals with countdown
const flashDeals = [
  {
    id: 1,
    name: { en: "Wireless Bluetooth Earbuds Pro", ar: "سماعات بلوتوث لاسلكية برو" },
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
    originalPrice: 199.99,
    salePrice: 79.99,
    discount: 60,
    rating: 4.8,
    reviews: 2340,
    sold: 1850,
    stock: 50,
  },
  {
    id: 2,
    name: { en: "Smart Watch Series 8", ar: "ساعة ذكية سيريز 8" },
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
    originalPrice: 399.99,
    salePrice: 199.99,
    discount: 50,
    rating: 4.9,
    reviews: 5670,
    sold: 3200,
    stock: 25,
  },
  {
    id: 3,
    name: { en: "4K Ultra HD Action Camera", ar: "كاميرا أكشن 4K فائقة الدقة" },
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    originalPrice: 299.99,
    salePrice: 149.99,
    discount: 50,
    rating: 4.7,
    reviews: 1890,
    sold: 980,
    stock: 35,
  },
  {
    id: 4,
    name: { en: "Noise Cancelling Headphones", ar: "سماعات عازلة للضوضاء" },
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    originalPrice: 349.99,
    salePrice: 139.99,
    discount: 60,
    rating: 4.8,
    reviews: 3450,
    sold: 2100,
    stock: 40,
  },
];

// Daily deals
const dailyDeals = [
  {
    id: 5,
    name: { en: "Premium Leather Wallet", ar: "محفظة جلد فاخرة" },
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
    originalPrice: 89.99,
    salePrice: 39.99,
    discount: 55,
    rating: 4.6,
    reviews: 890,
  },
  {
    id: 6,
    name: { en: "Portable Bluetooth Speaker", ar: "سماعة بلوتوث محمولة" },
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    originalPrice: 129.99,
    salePrice: 59.99,
    discount: 54,
    rating: 4.7,
    reviews: 2100,
  },
  {
    id: 7,
    name: { en: "Mechanical Gaming Keyboard", ar: "كيبورد ألعاب ميكانيكي" },
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
    originalPrice: 159.99,
    salePrice: 79.99,
    discount: 50,
    rating: 4.8,
    reviews: 1560,
  },
  {
    id: 8,
    name: { en: "Fitness Tracker Band", ar: "سوار تتبع اللياقة" },
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
    originalPrice: 79.99,
    salePrice: 29.99,
    discount: 63,
    rating: 4.5,
    reviews: 3200,
  },
  {
    id: 9,
    name: { en: "Wireless Charging Pad", ar: "قاعدة شحن لاسلكية" },
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=400",
    originalPrice: 49.99,
    salePrice: 19.99,
    discount: 60,
    rating: 4.4,
    reviews: 780,
  },
  {
    id: 10,
    name: { en: "USB-C Hub Multiport Adapter", ar: "محول USB-C متعدد المنافذ" },
    image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400",
    originalPrice: 69.99,
    salePrice: 34.99,
    discount: 50,
    rating: 4.6,
    reviews: 1230,
  },
  {
    id: 11,
    name: { en: "Ergonomic Mouse Wireless", ar: "ماوس لاسلكي مريح" },
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    originalPrice: 59.99,
    salePrice: 24.99,
    discount: 58,
    rating: 4.5,
    reviews: 2340,
  },
  {
    id: 12,
    name: { en: "LED Desk Lamp Smart", ar: "مصباح مكتب LED ذكي" },
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    originalPrice: 89.99,
    salePrice: 44.99,
    discount: 50,
    rating: 4.7,
    reviews: 560,
  },
];

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
