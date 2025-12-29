"use client";

import Link from "next/link";
import { useLanguageStore, useCartStore } from "@/stores";
import { Button } from "@/components/ui/button";
import {
  Star,
  Heart,
  ShoppingCart,
  Sparkles,
  Clock,
  Filter,
  ChevronDown,
  Grid3X3,
  LayoutList,
  BadgeCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const newArrivals = [
  {
    id: 1,
    name: { en: "iPhone 15 Pro Max 256GB", ar: "آيفون 15 برو ماكس 256 جيجا" },
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
    price: 1199.99,
    originalPrice: 1299.99,
    rating: 4.9,
    reviews: 234,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "Just Arrived", ar: "وصل حديثاً" },
    isNew: true,
    daysAgo: 1,
  },
  {
    id: 2,
    name: { en: "Nike Air Max 2024 Limited Edition", ar: "نايك اير ماكس 2024 إصدار محدود" },
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    price: 189.99,
    originalPrice: 220.00,
    rating: 4.8,
    reviews: 156,
    category: { en: "Fashion", ar: "أزياء" },
    badge: { en: "Trending", ar: "رائج" },
    isNew: true,
    daysAgo: 2,
  },
  {
    id: 3,
    name: { en: "Sony WH-1000XM5 Headphones", ar: "سماعات سوني WH-1000XM5" },
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
    price: 349.99,
    originalPrice: 399.99,
    rating: 4.9,
    reviews: 892,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "Best Seller", ar: "الأكثر مبيعاً" },
    isNew: true,
    daysAgo: 3,
  },
  {
    id: 4,
    name: { en: "Samsung Galaxy Watch 6 Pro", ar: "ساعة سامسونج جالاكسي 6 برو" },
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
    price: 449.99,
    originalPrice: 499.99,
    rating: 4.7,
    reviews: 445,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "New", ar: "جديد" },
    isNew: true,
    daysAgo: 4,
  },
  {
    id: 5,
    name: { en: "Dyson V15 Detect Vacuum", ar: "مكنسة دايسون V15 ديتكت" },
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400",
    price: 749.99,
    originalPrice: 849.99,
    rating: 4.8,
    reviews: 567,
    category: { en: "Home", ar: "منزل" },
    badge: { en: "Premium", ar: "مميز" },
    isNew: true,
    daysAgo: 5,
  },
  {
    id: 6,
    name: { en: "Lululemon Align Leggings", ar: "ليغنز لولوليمون أليان" },
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400",
    price: 98.00,
    originalPrice: 118.00,
    rating: 4.9,
    reviews: 2341,
    category: { en: "Fashion", ar: "أزياء" },
    badge: { en: "Popular", ar: "شائع" },
    isNew: true,
    daysAgo: 5,
  },
  {
    id: 7,
    name: { en: "MacBook Air M3 15-inch", ar: "ماك بوك اير M3 15 بوصة" },
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    price: 1299.99,
    originalPrice: 1399.99,
    rating: 4.9,
    reviews: 123,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "Just Arrived", ar: "وصل حديثاً" },
    isNew: true,
    daysAgo: 1,
  },
  {
    id: 8,
    name: { en: "Gucci GG Marmont Bag", ar: "حقيبة غوتشي جي جي مارمونت" },
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
    price: 2350.00,
    originalPrice: 2500.00,
    rating: 4.8,
    reviews: 89,
    category: { en: "Fashion", ar: "أزياء" },
    badge: { en: "Luxury", ar: "فاخر" },
    isNew: true,
    daysAgo: 2,
  },
  {
    id: 9,
    name: { en: "PlayStation 5 Slim Console", ar: "بلايستيشن 5 سليم" },
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    price: 449.99,
    originalPrice: 499.99,
    rating: 4.9,
    reviews: 3456,
    category: { en: "Gaming", ar: "ألعاب" },
    badge: { en: "Hot", ar: "ساخن" },
    isNew: true,
    daysAgo: 3,
  },
  {
    id: 10,
    name: { en: "Nespresso Vertuo Next Coffee Machine", ar: "ماكينة قهوة نسبريسو فيرتو نكست" },
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400",
    price: 179.99,
    originalPrice: 219.99,
    rating: 4.7,
    reviews: 678,
    category: { en: "Home", ar: "منزل" },
    badge: { en: "New", ar: "جديد" },
    isNew: true,
    daysAgo: 4,
  },
  {
    id: 11,
    name: { en: "Ray-Ban Meta Smart Glasses", ar: "نظارات ري بان ميتا الذكية" },
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.6,
    reviews: 234,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "Innovative", ar: "مبتكر" },
    isNew: true,
    daysAgo: 6,
  },
  {
    id: 12,
    name: { en: "Adidas Ultraboost 24 Running Shoes", ar: "حذاء أديداس ألترابوست 24" },
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
    price: 189.99,
    originalPrice: 210.00,
    rating: 4.8,
    reviews: 567,
    category: { en: "Sports", ar: "رياضة" },
    badge: { en: "New", ar: "جديد" },
    isNew: true,
    daysAgo: 7,
  },
];

const categories = [
  { id: "all", name: { en: "All", ar: "الكل" } },
  { id: "electronics", name: { en: "Electronics", ar: "إلكترونيات" } },
  { id: "fashion", name: { en: "Fashion", ar: "أزياء" } },
  { id: "home", name: { en: "Home", ar: "منزل" } },
  { id: "sports", name: { en: "Sports", ar: "رياضة" } },
  { id: "gaming", name: { en: "Gaming", ar: "ألعاب" } },
];

export default function NewArrivalsPage() {
  const { language } = useLanguageStore();
  const { addToCart } = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  const handleAddToCart = (product: typeof newArrivals[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
    });
    toast.success(
      language === "ar" ? "تمت الإضافة للسلة" : "Added to cart",
      {
        description: product.name[language],
      }
    );
  };

  const filteredProducts = newArrivals.filter((product) => {
    if (selectedCategory === "all") return true;
    return product.category.en.toLowerCase() === selectedCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return a.daysAgo - b.daysAgo;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div
      className="min-h-screen bg-muted/30"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-teal-500 to-cyan-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {language === "ar" ? "وصل حديثاً" : "New Arrivals"}
            </h1>
          </div>
          <p className="text-xl opacity-90 max-w-2xl">
            {language === "ar"
              ? "اكتشف أحدث المنتجات التي وصلت للتو إلى متجرنا"
              : "Discover the latest products that just landed in our store"}
          </p>
          <div className="flex items-center gap-2 mt-6 text-sm">
            <Clock className="h-4 w-4" />
            <span>
              {language === "ar"
                ? "يتم تحديث المنتجات يومياً"
                : "Products updated daily"}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Bar */}
        <div className="bg-card rounded-xl border p-4 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-5 w-5 text-muted-foreground" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.id
                    ? "bg-orange-500 text-white"
                    : "bg-muted hover:bg-muted/80"
                    }`}
                >
                  {cat.name[language]}
                </button>
              ))}
            </div>

            {/* Sort & View */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {language === "ar" ? "ترتيب:" : "Sort:"}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-muted px-3 py-2 rounded-lg text-sm"
                >
                  <option value="newest">
                    {language === "ar" ? "الأحدث" : "Newest"}
                  </option>
                  <option value="price-low">
                    {language === "ar" ? "السعر: من الأقل" : "Price: Low to High"}
                  </option>
                  <option value="price-high">
                    {language === "ar" ? "السعر: من الأعلى" : "Price: High to Low"}
                  </option>
                  <option value="rating">
                    {language === "ar" ? "التقييم" : "Rating"}
                  </option>
                </select>
              </div>

              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-background shadow" : ""
                    }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-background shadow" : ""
                    }`}
                >
                  <LayoutList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {language === "ar"
              ? `عرض ${sortedProducts.length} منتج`
              : `Showing ${sortedProducts.length} products`}
          </p>
        </div>

        {/* Products Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sortedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-card rounded-xl border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name[language]}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  {/* Badge */}
                  <span className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {product.badge[language]}
                  </span>
                  {/* Days Ago */}
                  <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                    {product.daysAgo === 1
                      ? language === "ar"
                        ? "اليوم"
                        : "Today"
                      : language === "ar"
                        ? `منذ ${product.daysAgo} أيام`
                        : `${product.daysAgo} days ago`}
                  </span>
                  {/* Wishlist */}
                  <button className="absolute bottom-2 right-2 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4">
                  <span className="text-xs text-muted-foreground">
                    {product.category[language]}
                  </span>
                  <h3 className="font-medium text-sm line-clamp-2 mt-1 mb-2 group-hover:text-orange-500 transition-colors">
                    {product.name[language]}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-orange-500">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all flex"
              >
                <div className="relative w-48 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {product.badge[language]}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">
                        {product.category[language]}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {product.daysAgo === 1
                          ? language === "ar"
                            ? "اليوم"
                            : "Today"
                          : language === "ar"
                            ? `منذ ${product.daysAgo} أيام`
                            : `${product.daysAgo} days ago`}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-500 transition-colors">
                      {product.name[language]}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews.toLocaleString()}{" "}
                        {language === "ar" ? "تقييم" : "reviews"})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-orange-500">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {language === "ar" ? "أضف للسلة" : "Add to Cart"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <ChevronDown className="h-5 w-5 mr-2" />
            {language === "ar" ? "تحميل المزيد" : "Load More"}
          </Button>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-green-600 to-teal-500 text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <BadgeCheck className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            {language === "ar"
              ? "كن أول من يعرف عن المنتجات الجديدة"
              : "Be the First to Know About New Products"}
          </h2>
          <p className="opacity-90 mb-6 max-w-xl mx-auto">
            {language === "ar"
              ? "اشترك في إشعاراتنا واحصل على تنبيهات فورية عند وصول منتجات جديدة"
              : "Subscribe to our notifications and get instant alerts when new products arrive"}
          </p>
          <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={
                language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"
              }
              className="flex-1 px-4 py-3 rounded-lg text-black"
            />
            <Button className="bg-white text-green-600 hover:bg-white/90 px-6 py-3">
              {language === "ar" ? "اشترك" : "Subscribe"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
