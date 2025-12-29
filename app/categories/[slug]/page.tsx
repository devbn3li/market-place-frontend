"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguageStore, useCartStore, useWishlistStore } from "@/stores";
import { Button } from "@/components/ui/button";
import {
  Star,
  Heart,
  ShoppingCart,
  Filter,
  ChevronDown,
  Grid3X3,
  LayoutList,
  ArrowLeft,
  SlidersHorizontal,
  Smartphone,
  Shirt,
  Home,
  Dumbbell,
  Sparkles,
  BookOpen,
  Gamepad2,
  Car,
  Watch,
  Laptop,
  Headphones,
  Camera,
  Sofa,
  Flower2,
  Baby,
  PawPrint,
  Utensils,
  Pill,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { generateProductsForCategory } from "@/lib/products";

// Category data
const categoriesData: Record<
  string,
  {
    name: { en: string; ar: string };
    description: { en: string; ar: string };
    icon: typeof Smartphone;
    color: string;
    bgColor: string;
  }
> = {
  electronics: {
    name: { en: "Electronics", ar: "الإلكترونيات" },
    description: {
      en: "Phones, Laptops, Tablets & More",
      ar: "هواتف، لابتوب، تابلت والمزيد",
    },
    icon: Smartphone,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500",
  },
  fashion: {
    name: { en: "Fashion", ar: "الأزياء" },
    description: {
      en: "Clothing, Shoes & Accessories",
      ar: "ملابس، أحذية وإكسسوارات",
    },
    icon: Shirt,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-500",
  },
  "home-garden": {
    name: { en: "Home & Garden", ar: "المنزل والحديقة" },
    description: { en: "Furniture, Decor & Outdoor", ar: "أثاث، ديكور وحدائق" },
    icon: Home,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500",
  },
  sports: {
    name: { en: "Sports & Fitness", ar: "الرياضة واللياقة" },
    description: {
      en: "Equipment, Clothing & Accessories",
      ar: "معدات، ملابس وإكسسوارات رياضية",
    },
    icon: Dumbbell,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500",
  },
  beauty: {
    name: { en: "Beauty & Health", ar: "الجمال والصحة" },
    description: {
      en: "Skincare, Makeup & Wellness",
      ar: "العناية بالبشرة، مكياج وصحة",
    },
    icon: Sparkles,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500",
  },
  books: {
    name: { en: "Books & Stationery", ar: "الكتب والقرطاسية" },
    description: {
      en: "Books, Office & School Supplies",
      ar: "كتب، مستلزمات مكتبية ومدرسية",
    },
    icon: BookOpen,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-500",
  },
  toys: {
    name: { en: "Toys & Games", ar: "الألعاب" },
    description: {
      en: "Kids Toys, Board Games & More",
      ar: "ألعاب أطفال، ألعاب لوحية والمزيد",
    },
    icon: Gamepad2,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-500",
  },
  automotive: {
    name: { en: "Automotive", ar: "السيارات" },
    description: {
      en: "Parts, Accessories & Tools",
      ar: "قطع غيار، إكسسوارات وأدوات",
    },
    icon: Car,
    color: "from-slate-500 to-slate-600",
    bgColor: "bg-slate-500",
  },
  watches: {
    name: { en: "Watches & Jewelry", ar: "الساعات والمجوهرات" },
    description: {
      en: "Luxury Watches & Fine Jewelry",
      ar: "ساعات فاخرة ومجوهرات راقية",
    },
    icon: Watch,
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-500",
  },
  computers: {
    name: { en: "Computers & Laptops", ar: "الكمبيوتر واللابتوب" },
    description: {
      en: "PCs, Laptops & Components",
      ar: "أجهزة كمبيوتر، لابتوب وقطع",
    },
    icon: Laptop,
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-500",
  },
  audio: {
    name: { en: "Audio & Music", ar: "الصوتيات والموسيقى" },
    description: {
      en: "Headphones, Speakers & Instruments",
      ar: "سماعات، مكبرات صوت وآلات موسيقية",
    },
    icon: Headphones,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-500",
  },
  cameras: {
    name: { en: "Cameras & Photography", ar: "الكاميرات والتصوير" },
    description: {
      en: "Cameras, Lenses & Accessories",
      ar: "كاميرات، عدسات وإكسسوارات",
    },
    icon: Camera,
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-500",
  },
  furniture: {
    name: { en: "Furniture", ar: "الأثاث" },
    description: {
      en: "Living Room, Bedroom & Office",
      ar: "غرفة معيشة، نوم ومكتب",
    },
    icon: Sofa,
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-500",
  },
  garden: {
    name: { en: "Garden & Outdoor", ar: "الحديقة والخارج" },
    description: {
      en: "Plants, Tools & Outdoor Furniture",
      ar: "نباتات، أدوات وأثاث خارجي",
    },
    icon: Flower2,
    color: "from-lime-500 to-lime-600",
    bgColor: "bg-lime-500",
  },
  baby: {
    name: { en: "Baby & Kids", ar: "الأطفال والرضع" },
    description: {
      en: "Clothing, Toys & Essentials",
      ar: "ملابس، ألعاب ومستلزمات",
    },
    icon: Baby,
    color: "from-sky-500 to-sky-600",
    bgColor: "bg-sky-500",
  },
  pets: {
    name: { en: "Pet Supplies", ar: "مستلزمات الحيوانات" },
    description: {
      en: "Food, Toys & Accessories",
      ar: "طعام، ألعاب وإكسسوارات",
    },
    icon: PawPrint,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-500",
  },
  grocery: {
    name: { en: "Grocery & Food", ar: "البقالة والطعام" },
    description: {
      en: "Fresh, Packaged & Beverages",
      ar: "طازج، معلب ومشروبات",
    },
    icon: Utensils,
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-500",
  },
  pharmacy: {
    name: { en: "Pharmacy & Health", ar: "الصيدلية والصحة" },
    description: {
      en: "Medicines, Vitamins & Personal Care",
      ar: "أدوية، فيتامينات وعناية شخصية",
    },
    icon: Pill,
    color: "from-red-400 to-pink-500",
    bgColor: "bg-red-500",
  },
};

const sortOptions = [
  { id: "featured", name: { en: "Featured", ar: "المميزة" } },
  { id: "newest", name: { en: "Newest", ar: "الأحدث" } },
  { id: "price-low", name: { en: "Price: Low to High", ar: "السعر: من الأقل" } },
  { id: "price-high", name: { en: "Price: High to Low", ar: "السعر: من الأعلى" } },
  { id: "rating", name: { en: "Highest Rated", ar: "الأعلى تقييماً" } },
];

const priceRanges = [
  { id: "all", name: { en: "All Prices", ar: "كل الأسعار" }, min: 0, max: Infinity },
  { id: "under50", name: { en: "Under $50", ar: "أقل من 50$" }, min: 0, max: 50 },
  { id: "50-100", name: { en: "$50 - $100", ar: "50$ - 100$" }, min: 50, max: 100 },
  { id: "100-200", name: { en: "$100 - $200", ar: "100$ - 200$" }, min: 100, max: 200 },
  { id: "over200", name: { en: "Over $200", ar: "أكثر من 200$" }, min: 200, max: Infinity },
];

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug as string;
  const { language } = useLanguageStore();
  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const category = categoriesData[categorySlug];
  // Use products from JSON data
  const products = generateProductsForCategory(categorySlug);

  // Filter and sort products
  const selectedPriceRange = priceRanges.find((r) => r.id === priceRange);
  const filteredProducts = products.filter((product) => {
    if (!selectedPriceRange) return true;
    return (
      product.price >= selectedPriceRange.min &&
      product.price <= selectedPriceRange.max
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const handleAddToCart = (
    product: (typeof products)[0],
    e: React.MouseEvent
  ) => {
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
    toast.success(language === "ar" ? "تمت الإضافة للسلة" : "Added to cart", {
      description: product.name[language],
    });
  };

  const handleWishlistToggle = (
    product: (typeof products)[0],
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
      rating: product.rating,
      reviews: product.reviews,
    });
    const inWishlist = isInWishlist(product.id);
    toast.success(
      inWishlist
        ? language === "ar"
          ? "تم إزالة المنتج من قائمة الرغبات"
          : "Removed from wishlist"
        : language === "ar"
          ? "تمت إضافة المنتج لقائمة الرغبات"
          : "Added to wishlist"
    );
  };

  if (!category) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-muted-foreground mb-6">
            {language === "ar" ? "الفئة غير موجودة" : "Category not found"}
          </p>
          <Link href="/categories">
            <Button className="bg-orange-500 hover:bg-orange-600">
              {language === "ar" ? "تصفح الفئات" : "Browse Categories"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <div
      className="min-h-screen bg-muted/30"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <div
        className={`bg-gradient-to-r ${category.color} text-white py-12`}
      >
        <div className="container mx-auto px-4">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === "ar" ? "جميع الفئات" : "All Categories"}
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-xl">
              <Icon className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{category.name[language]}</h1>
              <p className="text-lg opacity-90 mt-1">
                {category.description[language]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Bar */}
        <div className="bg-card rounded-xl border p-4 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Left Side - Filters */}
            <div className="flex items-center gap-4 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {language === "ar" ? "الفلاتر" : "Filters"}
              </Button>

              {/* Price Range - Desktop */}
              <div className="hidden md:flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                {priceRanges.map((range) => (
                  <Button
                    key={range.id}
                    variant={priceRange === range.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPriceRange(range.id)}
                    className={
                      priceRange === range.id
                        ? "bg-orange-500 hover:bg-orange-600"
                        : ""
                    }
                  >
                    {range.name[language]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Right Side - Sort & View */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-background border rounded-lg px-4 py-2 pr-10 text-sm cursor-pointer"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name[language]}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
              </div>

              {/* View Mode */}
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-muted"
                    }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-muted"
                    }`}
                >
                  <LayoutList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mt-4 pt-4 border-t">
              <p className="text-sm font-medium mb-2">
                {language === "ar" ? "نطاق السعر" : "Price Range"}
              </p>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range) => (
                  <Button
                    key={range.id}
                    variant={priceRange === range.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPriceRange(range.id)}
                    className={
                      priceRange === range.id
                        ? "bg-orange-500 hover:bg-orange-600"
                        : ""
                    }
                  >
                    {range.name[language]}
                  </Button>
                ))}
              </div>
            </div>
          )}
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
                  {/* Discount Badge */}
                  {product.originalPrice > product.price && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                        100
                      )}
                      %
                    </span>
                  )}
                  {/* Wishlist */}
                  <button
                    onClick={(e) => handleWishlistToggle(product, e)}
                    className={`absolute top-2 right-2 p-2 rounded-full transition-all shadow-md ${isInWishlist(product.id)
                      ? "bg-red-500 text-white opacity-100"
                      : "bg-white/90 hover:bg-red-500 hover:text-white opacity-0 group-hover:opacity-100"
                      }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""
                        }`}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors">
                    {product.name[language]}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
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
                  {product.originalPrice > product.price && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                        100
                      )}
                      %
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-500 transition-colors">
                      {product.name[language]}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {product.rating}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews.toLocaleString()}{" "}
                        {language === "ar" ? "تقييم" : "reviews"})
                      </span>
                    </div>
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
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => handleWishlistToggle(product, e)}
                        className={
                          isInWishlist(product.id)
                            ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
                            : ""
                        }
                      >
                        <Heart
                          className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""
                            }`}
                        />
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
    </div>
  );
}
