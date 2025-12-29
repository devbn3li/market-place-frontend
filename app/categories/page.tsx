"use client";

import Link from "next/link";
import { useLanguageStore } from "@/stores";
import {
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
  Pill
} from "lucide-react";

const categories = [
  {
    id: "electronics",
    name: { en: "Electronics", ar: "الإلكترونيات" },
    description: { en: "Phones, Laptops, Tablets & More", ar: "هواتف، لابتوب، تابلت والمزيد" },
    icon: Smartphone,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    items: 15420,
  },
  {
    id: "fashion",
    name: { en: "Fashion", ar: "الأزياء" },
    description: { en: "Clothing, Shoes & Accessories", ar: "ملابس، أحذية وإكسسوارات" },
    icon: Shirt,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-950/30",
    items: 28350,
  },
  {
    id: "home-garden",
    name: { en: "Home & Garden", ar: "المنزل والحديقة" },
    description: { en: "Furniture, Decor & Outdoor", ar: "أثاث، ديكور وحدائق" },
    icon: Home,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    items: 12890,
  },
  {
    id: "sports",
    name: { en: "Sports & Fitness", ar: "الرياضة واللياقة" },
    description: { en: "Equipment, Clothing & Accessories", ar: "معدات، ملابس وإكسسوارات رياضية" },
    icon: Dumbbell,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    items: 8760,
  },
  {
    id: "beauty",
    name: { en: "Beauty & Health", ar: "الجمال والصحة" },
    description: { en: "Skincare, Makeup & Wellness", ar: "العناية بالبشرة، مكياج وصحة" },
    icon: Sparkles,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    items: 19240,
  },
  {
    id: "books",
    name: { en: "Books & Stationery", ar: "الكتب والقرطاسية" },
    description: { en: "Books, Office & School Supplies", ar: "كتب، مستلزمات مكتبية ومدرسية" },
    icon: BookOpen,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    items: 45670,
  },
  {
    id: "toys",
    name: { en: "Toys & Games", ar: "الألعاب" },
    description: { en: "Kids Toys, Board Games & More", ar: "ألعاب أطفال، ألعاب لوحية والمزيد" },
    icon: Gamepad2,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    items: 11230,
  },
  {
    id: "automotive",
    name: { en: "Automotive", ar: "السيارات" },
    description: { en: "Parts, Accessories & Tools", ar: "قطع غيار، إكسسوارات وأدوات" },
    icon: Car,
    color: "from-slate-500 to-slate-600",
    bgColor: "bg-slate-50 dark:bg-slate-950/30",
    items: 6540,
  },
  {
    id: "watches",
    name: { en: "Watches & Jewelry", ar: "الساعات والمجوهرات" },
    description: { en: "Luxury Watches & Fine Jewelry", ar: "ساعات فاخرة ومجوهرات راقية" },
    icon: Watch,
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    items: 7890,
  },
  {
    id: "computers",
    name: { en: "Computers & Laptops", ar: "الكمبيوتر واللابتوب" },
    description: { en: "PCs, Laptops & Components", ar: "أجهزة كمبيوتر، لابتوب وقطع" },
    icon: Laptop,
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    items: 9870,
  },
  {
    id: "audio",
    name: { en: "Audio & Music", ar: "الصوتيات والموسيقى" },
    description: { en: "Headphones, Speakers & Instruments", ar: "سماعات، مكبرات صوت وآلات موسيقية" },
    icon: Headphones,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    items: 5430,
  },
  {
    id: "cameras",
    name: { en: "Cameras & Photography", ar: "الكاميرات والتصوير" },
    description: { en: "Cameras, Lenses & Accessories", ar: "كاميرات، عدسات وإكسسوارات" },
    icon: Camera,
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    items: 4320,
  },
  {
    id: "furniture",
    name: { en: "Furniture", ar: "الأثاث" },
    description: { en: "Living Room, Bedroom & Office", ar: "غرفة معيشة، نوم ومكتب" },
    icon: Sofa,
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50 dark:bg-teal-950/30",
    items: 8760,
  },
  {
    id: "garden",
    name: { en: "Garden & Outdoor", ar: "الحديقة والخارج" },
    description: { en: "Plants, Tools & Outdoor Furniture", ar: "نباتات، أدوات وأثاث خارجي" },
    icon: Flower2,
    color: "from-lime-500 to-lime-600",
    bgColor: "bg-lime-50 dark:bg-lime-950/30",
    items: 3210,
  },
  {
    id: "baby",
    name: { en: "Baby & Kids", ar: "الأطفال والرضع" },
    description: { en: "Clothing, Toys & Essentials", ar: "ملابس، ألعاب ومستلزمات" },
    icon: Baby,
    color: "from-sky-500 to-sky-600",
    bgColor: "bg-sky-50 dark:bg-sky-950/30",
    items: 14560,
  },
  {
    id: "pets",
    name: { en: "Pet Supplies", ar: "مستلزمات الحيوانات" },
    description: { en: "Food, Toys & Accessories", ar: "طعام، ألعاب وإكسسوارات" },
    icon: PawPrint,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    items: 6780,
  },
  {
    id: "grocery",
    name: { en: "Grocery & Food", ar: "البقالة والطعام" },
    description: { en: "Fresh, Packaged & Beverages", ar: "طازج، معلب ومشروبات" },
    icon: Utensils,
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    items: 23450,
  },
  {
    id: "pharmacy",
    name: { en: "Pharmacy & Health", ar: "الصيدلية والصحة" },
    description: { en: "Medicines, Vitamins & Personal Care", ar: "أدوية، فيتامينات وعناية شخصية" },
    icon: Pill,
    color: "from-red-400 to-pink-500",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    items: 8920,
  },
];

export default function CategoriesPage() {
  const { language } = useLanguageStore();

  return (
    <div className="min-h-screen bg-muted/30" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">
            {language === "ar" ? "تصفح الفئات" : "Browse Categories"}
          </h1>
          <p className="text-lg opacity-90">
            {language === "ar"
              ? "اكتشف ملايين المنتجات في جميع الفئات"
              : "Discover millions of products across all categories"}
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className={`group ${category.bgColor} rounded-2xl p-6 border hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-linear-to-br ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-orange-500 transition-colors">
                      {category.name[language]}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {category.description[language]}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {category.items.toLocaleString()} {language === "ar" ? "منتج" : "products"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Featured Categories Banner */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {language === "ar" ? "عروض حصرية على جميع الفئات" : "Exclusive Deals on All Categories"}
              </h2>
              <p className="opacity-90">
                {language === "ar"
                  ? "وفر حتى 70% على منتجات مختارة. العرض لفترة محدودة!"
                  : "Save up to 70% on selected items. Limited time offer!"}
              </p>
            </div>
            <Link
              href="/deals"
              className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors whitespace-nowrap"
            >
              {language === "ar" ? "تصفح العروض" : "Browse Deals"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
