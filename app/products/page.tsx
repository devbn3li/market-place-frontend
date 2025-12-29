"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguageStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  SlidersHorizontal,
  Star,
  Grid3x3,
  LayoutList,
  Package,
} from "lucide-react";
import { getAllProducts, toProducts } from "@/lib/products";

const t = {
  allProducts: { en: "All Products", ar: "جميع المنتجات" },
  searchPlaceholder: { en: "Search products...", ar: "ابحث عن منتجات..." },
  filters: { en: "Filters", ar: "التصفية" },
  sortBy: { en: "Sort By", ar: "ترتيب حسب" },
  category: { en: "Category", ar: "الفئة" },
  priceRange: { en: "Price Range", ar: "نطاق السعر" },
  rating: { en: "Rating", ar: "التقييم" },
  allCategories: { en: "All Categories", ar: "جميع الفئات" },
  electronics: { en: "Electronics", ar: "إلكترونيات" },
  fashion: { en: "Fashion", ar: "أزياء" },
  home: { en: "Home & Kitchen", ar: "المنزل والمطبخ" },
  sports: { en: "Sports & Outdoors", ar: "رياضة وهواء طلق" },
  furniture: { en: "Furniture", ar: "أثاث" },
  watches: { en: "Watches & Jewelry", ar: "ساعات ومجوهرات" },
  featured: { en: "Featured", ar: "مميز" },
  priceLowToHigh: { en: "Price: Low to High", ar: "السعر: من الأقل للأعلى" },
  priceHighToLow: { en: "Price: High to Low", ar: "السعر: من الأعلى للأقل" },
  topRated: { en: "Top Rated", ar: "الأعلى تقييماً" },
  newest: { en: "Newest", ar: "الأحدث" },
  showing: { en: "Showing", ar: "عرض" },
  of: { en: "of", ar: "من" },
  products: { en: "products", ar: "منتج" },
  noResults: { en: "No products found", ar: "لم يتم العثور على منتجات" },
  clearFilters: { en: "Clear Filters", ar: "مسح التصفية" },
  applyFilters: { en: "Apply Filters", ar: "تطبيق التصفية" },
  min: { en: "Min", ar: "الحد الأدنى" },
  max: { en: "Max", ar: "الحد الأقصى" },
  andUp: { en: "& Up", ar: "فأكثر" },
  inStock: { en: "In Stock", ar: "متوفر" },
  outOfStock: { en: "Out of Stock", ar: "غير متوفر" },
};

const categories = [
  { value: "all", label: t.allCategories },
  { value: "electronics", label: t.electronics },
  { value: "fashion", label: t.fashion },
  { value: "home", label: t.home },
  { value: "sports", label: t.sports },
  { value: "furniture", label: t.furniture },
  { value: "watches", label: t.watches },
];

const sortOptions = [
  { value: "featured", label: t.featured },
  { value: "price-asc", label: t.priceLowToHigh },
  { value: "price-desc", label: t.priceHighToLow },
  { value: "rating", label: t.topRated },
  { value: "newest", label: t.newest },
];

const ratingFilters = [
  { value: 4.5, label: "4.5" },
  { value: 4.0, label: "4.0" },
  { value: 3.5, label: "3.5" },
  { value: 3.0, label: "3.0" },
];

export default function ProductsPage() {
  const { language } = useLanguageStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get all products
  const allProductsBasic = getAllProducts();
  const allProducts = toProducts(allProductsBasic);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name[language].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category[language] === selectedCategory);
    }

    // Price filter
    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= Number(maxPrice));
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter((product) => product.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured (keep original order)
        break;
    }

    return filtered;
  }, [allProducts, searchQuery, selectedCategory, sortBy, minPrice, maxPrice, minRating, language]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("featured");
    setMinPrice("");
    setMaxPrice("");
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-muted/30" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">{t.allProducts[language]}</h1>

          {/* Search and View Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder[language]}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {t.filters[language]}
              </Button>

              <div className="flex gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="px-3"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="px-3"
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* All Filters - Horizontal */}
        <div className="bg-card rounded-xl border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-semibold mb-3">{t.category[language]}</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap font-medium transition-all ${selectedCategory === cat.value
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-muted hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-500"
                      }`}
                  >
                    {cat.label[language]}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-3">{t.priceRange[language]}</h3>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder={t.min[language]}
                  className="w-24"
                />
                <span className="self-center">-</span>
                <Input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder={t.max[language]}
                  className="w-24"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-semibold mb-3">{t.rating[language]}</h3>
              <div className="flex flex-wrap gap-2">
                {ratingFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setMinRating(filter.value)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all flex items-center gap-1 ${minRating === filter.value
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-muted hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-500"
                      }`}
                  >
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{filter.label}+</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <div className="self-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={clearFilters}
              >
                {t.clearFilters[language]}
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          {/* Results Bar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {t.showing[language]} {filteredProducts.length} {t.of[language]}{" "}
              {allProducts.length} {t.products[language]}
            </p>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border bg-card"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label[language]}
                </option>
              ))}
            </select>
          </div>

          {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="bg-card rounded-xl border p-12 text-center">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-bold mb-2">
                {t.noResults[language]}
              </h3>
              <p className="text-muted-foreground mb-6">
                {language === "ar"
                  ? "جرب تغيير معايير البحث أو التصفية"
                  : "Try adjusting your search or filters"}
              </p>
              <Button onClick={clearFilters}>{t.clearFilters[language]}</Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className={`group bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all ${viewMode === "list" ? "flex gap-4" : ""
                    }`}
                >
                  <div
                    className={`relative ${viewMode === "grid" ? "aspect-square" : "w-32 h-32"
                      }`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name[language]}
                      width={viewMode === "grid" ? 400 : 128}
                      height={viewMode === "grid" ? 400 : 128}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {product.badge && (
                      <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        {product.badge[language]}
                      </span>
                    )}
                  </div>
                  <div className={viewMode === "grid" ? "p-4" : "flex-1 py-2 pr-4"}>
                    <h3
                      className={`font-medium ${viewMode === "grid" ? "text-sm line-clamp-2" : "text-base"
                        } mb-2 group-hover:text-orange-500`}
                    >
                      {product.name[language]}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-orange-500">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
