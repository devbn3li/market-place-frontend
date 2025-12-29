"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import {
  Star,
  Heart,
  ShoppingCart,
  Trophy,
  TrendingUp,
  Filter,
  ChevronDown,
  Grid3X3,
  LayoutList,
  Flame,
  Award,
  Crown,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const bestSellers = [
  {
    id: 1,
    name: { en: "Apple AirPods Pro 2nd Gen", ar: "سماعات أبل إيربودز برو الجيل الثاني" },
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400",
    price: 249.99,
    originalPrice: 279.99,
    rating: 4.9,
    reviews: 12543,
    soldCount: 45000,
    category: { en: "Electronics", ar: "إلكترونيات" },
    rank: 1,
    badge: { en: "#1 Best Seller", ar: "الأكثر مبيعاً #1" },
  },
  {
    id: 2,
    name: { en: "Samsung Galaxy S24 Ultra", ar: "سامسونج جالاكسي S24 ألترا" },
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
    price: 1199.99,
    originalPrice: 1299.99,
    rating: 4.8,
    reviews: 8932,
    soldCount: 38000,
    category: { en: "Electronics", ar: "إلكترونيات" },
    rank: 2,
    badge: { en: "Top Rated", ar: "الأعلى تقييماً" },
  },
  {
    id: 3,
    name: { en: "Nike Air Jordan 1 Retro High", ar: "نايك اير جوردن 1 ريترو هاي" },
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400",
    price: 180.00,
    originalPrice: 200.00,
    rating: 4.9,
    reviews: 15678,
    soldCount: 52000,
    category: { en: "Fashion", ar: "أزياء" },
    rank: 3,
    badge: { en: "Fan Favorite", ar: "المفضل" },
  },
  {
    id: 4,
    name: { en: "Sony PlayStation 5 Console", ar: "سوني بلايستيشن 5" },
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    price: 499.99,
    originalPrice: 549.99,
    rating: 4.9,
    reviews: 23456,
    soldCount: 67000,
    category: { en: "Gaming", ar: "ألعاب" },
    rank: 4,
    badge: { en: "Most Popular", ar: "الأكثر شعبية" },
  },
  {
    id: 5,
    name: { en: "Dyson Airwrap Complete", ar: "دايسون إيرراب كومبليت" },
    image: "https://images.unsplash.com/photo-1522338242042-2d1c40e10e15?w=400",
    price: 599.99,
    originalPrice: 649.99,
    rating: 4.7,
    reviews: 9876,
    soldCount: 28000,
    category: { en: "Beauty", ar: "جمال" },
    rank: 5,
    badge: { en: "Trending", ar: "رائج" },
  },
  {
    id: 6,
    name: { en: "Apple Watch Series 9", ar: "ساعة أبل الإصدار 9" },
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400",
    price: 399.99,
    originalPrice: 449.99,
    rating: 4.8,
    reviews: 11234,
    soldCount: 41000,
    category: { en: "Electronics", ar: "إلكترونيات" },
    rank: 6,
    badge: { en: "Editor's Choice", ar: "اختيار المحررين" },
  },
  {
    id: 7,
    name: { en: "Lego Star Wars Millennium Falcon", ar: "ليغو ستار وورز ميلينيوم فالكون" },
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400",
    price: 849.99,
    originalPrice: 899.99,
    rating: 4.9,
    reviews: 5678,
    soldCount: 15000,
    category: { en: "Toys", ar: "ألعاب أطفال" },
    rank: 7,
    badge: { en: "Collector's Item", ar: "للمقتنيين" },
  },
  {
    id: 8,
    name: { en: "Instant Pot Duo 7-in-1", ar: "إنستانت بوت ديو 7 في 1" },
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviews: 34567,
    soldCount: 89000,
    category: { en: "Home", ar: "منزل" },
    rank: 8,
    badge: { en: "Kitchen Essential", ar: "أساسي للمطبخ" },
  },
  {
    id: 9,
    name: { en: "Nintendo Switch OLED", ar: "نينتندو سويتش OLED" },
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400",
    price: 349.99,
    originalPrice: 379.99,
    rating: 4.8,
    reviews: 19876,
    soldCount: 56000,
    category: { en: "Gaming", ar: "ألعاب" },
    rank: 9,
    badge: { en: "Best for Gaming", ar: "الأفضل للألعاب" },
  },
  {
    id: 10,
    name: { en: "The North Face Nuptse Jacket", ar: "جاكيت ذا نورث فيس نوبتسي" },
    image: "https://images.unsplash.com/photo-1544923246-77307dd628b7?w=400",
    price: 320.00,
    originalPrice: 380.00,
    rating: 4.8,
    reviews: 7654,
    soldCount: 23000,
    category: { en: "Fashion", ar: "أزياء" },
    rank: 10,
    badge: { en: "Winter Essential", ar: "أساسي للشتاء" },
  },
  {
    id: 11,
    name: { en: "Kindle Paperwhite 11th Gen", ar: "كيندل بيبر وايت الجيل 11" },
    image: "https://images.unsplash.com/photo-1592434134753-a70baf7979d5?w=400",
    price: 139.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviews: 28765,
    soldCount: 72000,
    category: { en: "Electronics", ar: "إلكترونيات" },
    rank: 11,
    badge: { en: "Book Lover's Pick", ar: "خيار محبي الكتب" },
  },
  {
    id: 12,
    name: { en: "Yeti Rambler 30oz Tumbler", ar: "كوب يتي رامبلر 30 أونصة" },
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    price: 38.00,
    originalPrice: 45.00,
    rating: 4.9,
    reviews: 45678,
    soldCount: 120000,
    category: { en: "Home", ar: "منزل" },
    rank: 12,
    badge: { en: "Customer Favorite", ar: "المفضل للعملاء" },
  },
];

const categories = [
  { id: "all", name: { en: "All", ar: "الكل" } },
  { id: "electronics", name: { en: "Electronics", ar: "إلكترونيات" } },
  { id: "fashion", name: { en: "Fashion", ar: "أزياء" } },
  { id: "home", name: { en: "Home", ar: "منزل" } },
  { id: "gaming", name: { en: "Gaming", ar: "ألعاب" } },
  { id: "beauty", name: { en: "Beauty", ar: "جمال" } },
  { id: "toys", name: { en: "Toys", ar: "ألعاب أطفال" } },
];

export default function BestSellersPage() {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("best-selling");

  const handleAddToCart = (product: typeof bestSellers[0], e: React.MouseEvent) => {
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

  const filteredProducts = bestSellers.filter((product) => {
    if (selectedCategory === "all") return true;
    return product.category.en.toLowerCase() === selectedCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "best-selling":
        return a.rank - b.rank;
      case "most-reviewed":
        return b.reviews - a.reviews;
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

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Award className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return null;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-amber-500";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-400";
    if (rank === 3) return "bg-gradient-to-r from-amber-500 to-amber-600";
    return "bg-orange-500";
  };

  return (
    <div
      className="min-h-screen bg-muted/30"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {language === "ar" ? "الأكثر مبيعاً" : "Best Sellers"}
            </h1>
          </div>
          <p className="text-xl opacity-90 max-w-2xl">
            {language === "ar"
              ? "اكتشف المنتجات الأكثر شعبية التي يحبها عملاؤنا"
              : "Discover the most popular products our customers love"}
          </p>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Flame className="h-5 w-5" />
              <span className="text-sm font-medium">
                {language === "ar"
                  ? "يتم التحديث كل ساعة"
                  : "Updated hourly"}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">
                {language === "ar"
                  ? "+500K منتج تم بيعه"
                  : "500K+ products sold"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Banner */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bestSellers.slice(0, 3).map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className={`relative rounded-xl p-6 text-white overflow-hidden group ${getRankBg(
                index + 1
              )}`}
            >
              <div className="absolute top-4 left-4 flex items-center gap-2">
                {getRankIcon(index + 1)}
                <span className="text-2xl font-bold">#{index + 1}</span>
              </div>
              <div className="flex items-center gap-4 mt-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name[language]}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-bold line-clamp-2">{product.name[language]}</h3>
                  <p className="text-sm opacity-90">
                    {product.soldCount.toLocaleString()}{" "}
                    {language === "ar" ? "تم بيعه" : "sold"}
                  </p>
                  <p className="text-lg font-bold mt-1">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
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
                  <option value="best-selling">
                    {language === "ar" ? "الأكثر مبيعاً" : "Best Selling"}
                  </option>
                  <option value="most-reviewed">
                    {language === "ar" ? "الأكثر تقييماً" : "Most Reviewed"}
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
                  {/* Rank Badge */}
                  <span
                    className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${getRankBg(
                      product.rank
                    )}`}
                  >
                    {product.rank <= 3 && getRankIcon(product.rank)}
                    #{product.rank}
                  </span>
                  {/* Sold Count */}
                  <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    {product.soldCount >= 1000
                      ? `${(product.soldCount / 1000).toFixed(0)}K`
                      : product.soldCount}
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
                  <span
                    className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${getRankBg(
                      product.rank
                    )}`}
                  >
                    {product.rank <= 3 && getRankIcon(product.rank)}
                    #{product.rank}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">
                        {product.category[language]}
                      </span>
                      <span className="text-xs bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded-full flex items-center gap-1">
                        <Flame className="h-3 w-3" />
                        {product.soldCount.toLocaleString()}{" "}
                        {language === "ar" ? "تم بيعه" : "sold"}
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
                    <span className="inline-block text-xs bg-muted px-2 py-1 rounded">
                      {product.badge[language]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
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

      {/* Why Best Sellers Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            {language === "ar"
              ? "لماذا تختار الأكثر مبيعاً؟"
              : "Why Choose Best Sellers?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">
                {language === "ar" ? "موثوقة ومجربة" : "Trusted & Tested"}
              </h3>
              <p className="opacity-90 text-sm">
                {language === "ar"
                  ? "منتجات حصلت على آلاف التقييمات الإيجابية"
                  : "Products with thousands of positive reviews"}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">
                {language === "ar" ? "الأكثر شعبية" : "Most Popular"}
              </h3>
              <p className="opacity-90 text-sm">
                {language === "ar"
                  ? "المنتجات التي يختارها الملايين من العملاء"
                  : "Products chosen by millions of customers"}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">
                {language === "ar" ? "جودة مضمونة" : "Quality Guaranteed"}
              </h3>
              <p className="opacity-90 text-sm">
                {language === "ar"
                  ? "ضمان استرجاع الأموال خلال 30 يوم"
                  : "30-day money-back guarantee"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
