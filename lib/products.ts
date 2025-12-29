import { faker } from "@faker-js/faker";

export interface Product {
  id: number;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  category: { en: string; ar: string };
  badge?: { en: string; ar: string };
  soldCount?: number;
  rank?: number;
  daysAgo?: number;
  inStock: boolean;
  stockCount: number;
}

const categoryTranslations: Record<string, string> = {
  Electronics: "إلكترونيات",
  Computers: "كمبيوتر",
  Games: "ألعاب",
  Garden: "حديقة",
  Home: "منزل",
  Grocery: "بقالة",
  Beauty: "جمال",
  Toys: "ألعاب أطفال",
  Kids: "أطفال",
  Baby: "أطفال",
  Clothing: "ملابس",
  Shoes: "أحذية",
  Jewelery: "مجوهرات",
  Sports: "رياضة",
  Outdoors: "خارجي",
  Automotive: "سيارات",
  Industrial: "صناعي",
  Movies: "أفلام",
  Music: "موسيقى",
  Books: "كتب",
  Health: "صحة",
  Tools: "أدوات",
};

const badgesEn = [
  "Best Seller",
  "New",
  "Hot",
  "Trending",
  "Popular",
  "Top Rated",
  "Limited",
  "Sale",
  "Premium",
  "Exclusive",
];

const badgesAr = [
  "الأكثر مبيعاً",
  "جديد",
  "ساخن",
  "رائج",
  "شائع",
  "الأعلى تقييماً",
  "محدود",
  "تخفيض",
  "مميز",
  "حصري",
];

const productImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400",
  "https://images.unsplash.com/photo-1491553895911-0055uj6j?w=400",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400",
  "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
  "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
  "https://images.unsplash.com/photo-1585155770913-5bca6d4d2900?w=400",
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
  "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400",
];

// Arabic product name generator
const arabicAdjectives = [
  "رائع",
  "ممتاز",
  "فاخر",
  "أنيق",
  "عصري",
  "مميز",
  "احترافي",
  "ذكي",
  "متين",
  "خفيف",
];

const arabicMaterials = [
  "جلد",
  "قطن",
  "معدن",
  "بلاستيك",
  "خشب",
  "زجاج",
  "سيليكون",
  "ألمنيوم",
  "ستانلس ستيل",
  "نايلون",
];

const arabicProducts = [
  "هاتف",
  "ساعة",
  "حقيبة",
  "نظارات",
  "سماعات",
  "حذاء",
  "قميص",
  "كاميرا",
  "لابتوب",
  "تابلت",
];

export function generateProduct(id: number): Product {
  const categoryEn = faker.commerce.department();
  const categoryAr = categoryTranslations[categoryEn] || "منتجات";

  const productNameEn = faker.commerce.productName();
  const arabicAdj =
    arabicAdjectives[Math.floor(Math.random() * arabicAdjectives.length)];
  const arabicMat =
    arabicMaterials[Math.floor(Math.random() * arabicMaterials.length)];
  const arabicProd =
    arabicProducts[Math.floor(Math.random() * arabicProducts.length)];
  const productNameAr = `${arabicProd} ${arabicAdj} من ${arabicMat}`;

  const price = parseFloat(faker.commerce.price({ min: 10, max: 500 }));
  const discount = Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 5 : 0;
  const originalPrice =
    discount > 0 ? Math.round(price * (1 + discount / 100)) : price;

  const badgeIndex = Math.floor(Math.random() * badgesEn.length);

  return {
    id,
    name: {
      en: productNameEn,
      ar: productNameAr,
    },
    description: {
      en: faker.commerce.productDescription(),
      ar: `منتج ${arabicAdj} بجودة عالية، مصنوع من أفضل المواد. مناسب للاستخدام اليومي.`,
    },
    image: productImages[id % productImages.length],
    price,
    originalPrice,
    rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
    reviews: Math.floor(Math.random() * 5000) + 10,
    category: {
      en: categoryEn,
      ar: categoryAr,
    },
    badge:
      Math.random() > 0.3
        ? {
            en: badgesEn[badgeIndex],
            ar: badgesAr[badgeIndex],
          }
        : undefined,
    soldCount: Math.floor(Math.random() * 50000) + 100,
    rank: id,
    daysAgo: Math.floor(Math.random() * 14) + 1,
    inStock: Math.random() > 0.1,
    stockCount: Math.floor(Math.random() * 100) + 1,
  };
}

export function generateProducts(
  count: number,
  startId: number = 1
): Product[] {
  return Array.from({ length: count }, (_, i) => generateProduct(startId + i));
}

// Pre-generated products for SSR compatibility
export const bestSellerProducts: Product[] = [
  {
    id: 1,
    name: { en: "Wireless Bluetooth Headphones", ar: "سماعات بلوتوث لاسلكية" },
    description: {
      en: "Premium noise-cancelling headphones",
      ar: "سماعات عازلة للضوضاء بجودة عالية",
    },
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 12453,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "#1 Best Seller", ar: "الأكثر مبيعاً #1" },
    soldCount: 45000,
    rank: 1,
    inStock: true,
    stockCount: 50,
  },
  {
    id: 2,
    name: { en: "Smart Fitness Watch", ar: "ساعة ذكية للياقة" },
    description: {
      en: "Track your health and fitness",
      ar: "تتبع صحتك ولياقتك البدنية",
    },
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.7,
    reviews: 8932,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "Top Rated", ar: "الأعلى تقييماً" },
    soldCount: 38000,
    rank: 2,
    inStock: true,
    stockCount: 35,
  },
  {
    id: 3,
    name: { en: "Premium Leather Backpack", ar: "حقيبة ظهر جلد فاخرة" },
    description: {
      en: "Stylish and durable backpack",
      ar: "حقيبة أنيقة ومتينة",
    },
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.9,
    reviews: 5621,
    category: { en: "Fashion", ar: "أزياء" },
    badge: { en: "Popular", ar: "شائع" },
    soldCount: 32000,
    rank: 3,
    inStock: true,
    stockCount: 80,
  },
  {
    id: 4,
    name: {
      en: "Portable Power Bank 20000mAh",
      ar: "بطارية متنقلة 20000 مللي أمبير",
    },
    description: {
      en: "Fast charging power bank",
      ar: "شاحن متنقل سريع الشحن",
    },
    image: "https://images.unsplash.com/photo-1585155770913-5bca6d4d2900?w=400",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.6,
    reviews: 15234,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "Hot", ar: "ساخن" },
    soldCount: 67000,
    rank: 4,
    inStock: true,
    stockCount: 120,
  },
  {
    id: 5,
    name: { en: "Running Shoes Pro", ar: "حذاء رياضي للجري" },
    description: { en: "Comfortable running shoes", ar: "حذاء جري مريح" },
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviews: 7845,
    category: { en: "Sports", ar: "رياضة" },
    badge: { en: "Trending", ar: "رائج" },
    soldCount: 28000,
    rank: 5,
    inStock: true,
    stockCount: 45,
  },
  {
    id: 6,
    name: {
      en: "Wireless Mechanical Keyboard",
      ar: "لوحة مفاتيح ميكانيكية لاسلكية",
    },
    description: {
      en: "RGB gaming keyboard",
      ar: "لوحة مفاتيح للألعاب مع إضاءة",
    },
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviews: 4523,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "Premium", ar: "مميز" },
    soldCount: 19000,
    rank: 6,
    inStock: true,
    stockCount: 30,
  },
  {
    id: 7,
    name: { en: "Stainless Steel Water Bottle", ar: "زجاجة مياه ستانلس ستيل" },
    description: {
      en: "Insulated water bottle",
      ar: "زجاجة مياه معزولة حرارياً",
    },
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.9,
    reviews: 23456,
    category: { en: "Home", ar: "منزل" },
    badge: { en: "Best Value", ar: "أفضل قيمة" },
    soldCount: 89000,
    rank: 7,
    inStock: true,
    stockCount: 200,
  },
  {
    id: 8,
    name: { en: "Wireless Earbuds Pro", ar: "سماعات أذن لاسلكية برو" },
    description: { en: "True wireless earbuds", ar: "سماعات لاسلكية بالكامل" },
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 11234,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "New", ar: "جديد" },
    soldCount: 35000,
    rank: 8,
    inStock: true,
    stockCount: 60,
  },
  {
    id: 9,
    name: { en: "Yoga Mat Premium", ar: "سجادة يوغا فاخرة" },
    description: { en: "Non-slip yoga mat", ar: "سجادة يوغا مانعة للانزلاق" },
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
    price: 39.99,
    originalPrice: 54.99,
    rating: 4.7,
    reviews: 6789,
    category: { en: "Sports", ar: "رياضة" },
    badge: { en: "Popular", ar: "شائع" },
    soldCount: 42000,
    rank: 9,
    inStock: true,
    stockCount: 150,
  },
  {
    id: 10,
    name: {
      en: "Smart LED Light Bulbs (4-Pack)",
      ar: "مصابيح LED ذكية (4 قطع)",
    },
    description: {
      en: "WiFi-enabled smart bulbs",
      ar: "مصابيح ذكية متصلة بالواي فاي",
    },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    price: 44.99,
    originalPrice: 59.99,
    rating: 4.6,
    reviews: 8901,
    category: { en: "Home", ar: "منزل" },
    badge: { en: "Smart Home", ar: "منزل ذكي" },
    soldCount: 56000,
    rank: 10,
    inStock: true,
    stockCount: 90,
  },
  {
    id: 11,
    name: { en: "Professional Camera Lens", ar: "عدسة كاميرا احترافية" },
    description: { en: "50mm prime lens", ar: "عدسة 50 مم" },
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400",
    price: 449.99,
    originalPrice: 549.99,
    rating: 4.9,
    reviews: 2345,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "Pro", ar: "احترافي" },
    soldCount: 8000,
    rank: 11,
    inStock: true,
    stockCount: 15,
  },
  {
    id: 12,
    name: { en: "Organic Green Tea Set", ar: "طقم شاي أخضر عضوي" },
    description: {
      en: "Premium organic tea collection",
      ar: "مجموعة شاي عضوي فاخر",
    },
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 3456,
    category: { en: "Grocery", ar: "بقالة" },
    badge: { en: "Organic", ar: "عضوي" },
    soldCount: 25000,
    rank: 12,
    inStock: true,
    stockCount: 180,
  },
];

export const newArrivalProducts: Product[] = [
  {
    id: 101,
    name: { en: "iPhone 15 Pro Max 256GB", ar: "آيفون 15 برو ماكس 256 جيجا" },
    description: { en: "Latest Apple smartphone", ar: "أحدث هاتف من أبل" },
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
    price: 1199.99,
    originalPrice: 1299.99,
    rating: 4.9,
    reviews: 234,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "Just Arrived", ar: "وصل حديثاً" },
    daysAgo: 1,
    inStock: true,
    stockCount: 25,
  },
  {
    id: 102,
    name: { en: "MacBook Air M3 15-inch", ar: "ماك بوك اير M3 15 بوصة" },
    description: {
      en: "Powerful and lightweight laptop",
      ar: "لابتوب قوي وخفيف الوزن",
    },
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    price: 1299.99,
    originalPrice: 1399.99,
    rating: 4.9,
    reviews: 123,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "New", ar: "جديد" },
    daysAgo: 2,
    inStock: true,
    stockCount: 20,
  },
  {
    id: 103,
    name: { en: "Sony WH-1000XM5 Headphones", ar: "سماعات سوني WH-1000XM5" },
    description: {
      en: "Industry-leading noise cancellation",
      ar: "أفضل عزل للضوضاء",
    },
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
    price: 349.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 456,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "Trending", ar: "رائج" },
    daysAgo: 3,
    inStock: true,
    stockCount: 40,
  },
  {
    id: 104,
    name: {
      en: "Samsung Galaxy Watch 6 Pro",
      ar: "ساعة سامسونج جالاكسي 6 برو",
    },
    description: { en: "Advanced smartwatch", ar: "ساعة ذكية متطورة" },
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
    price: 449.99,
    originalPrice: 499.99,
    rating: 4.7,
    reviews: 345,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "Hot", ar: "ساخن" },
    daysAgo: 3,
    inStock: true,
    stockCount: 35,
  },
  {
    id: 105,
    name: { en: "Nike Air Max 2024", ar: "نايك اير ماكس 2024" },
    description: { en: "Latest Nike sneakers", ar: "أحدث أحذية نايك" },
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
    price: 189.99,
    originalPrice: 219.99,
    rating: 4.8,
    reviews: 567,
    category: { en: "Fashion", ar: "أزياء" },
    badge: { en: "Limited", ar: "محدود" },
    daysAgo: 4,
    inStock: true,
    stockCount: 30,
  },
  {
    id: 106,
    name: { en: "PlayStation 5 Slim", ar: "بلايستيشن 5 سليم" },
    description: {
      en: "Next-gen gaming console",
      ar: "جهاز ألعاب الجيل الجديد",
    },
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    price: 449.99,
    originalPrice: 499.99,
    rating: 4.9,
    reviews: 789,
    category: { en: "Games", ar: "ألعاب" },
    badge: { en: "New", ar: "جديد" },
    daysAgo: 5,
    inStock: true,
    stockCount: 15,
  },
  {
    id: 107,
    name: { en: "Dyson V15 Vacuum", ar: "مكنسة دايسون V15" },
    description: { en: "Powerful cordless vacuum", ar: "مكنسة لاسلكية قوية" },
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400",
    price: 749.99,
    originalPrice: 849.99,
    rating: 4.8,
    reviews: 234,
    category: { en: "Home", ar: "منزل" },
    badge: { en: "Premium", ar: "مميز" },
    daysAgo: 5,
    inStock: true,
    stockCount: 20,
  },
  {
    id: 108,
    name: { en: "Ray-Ban Meta Smart Glasses", ar: "نظارات ري بان ميتا الذكية" },
    description: {
      en: "Smart glasses with camera",
      ar: "نظارات ذكية مع كاميرا",
    },
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.6,
    reviews: 123,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "Innovative", ar: "مبتكر" },
    daysAgo: 6,
    inStock: true,
    stockCount: 25,
  },
  {
    id: 109,
    name: { en: "Kindle Paperwhite 2024", ar: "كيندل بيبر وايت 2024" },
    description: {
      en: "E-reader with warm light",
      ar: "قارئ إلكتروني بإضاءة دافئة",
    },
    image: "https://images.unsplash.com/photo-1592434134753-a70baf7979d5?w=400",
    price: 149.99,
    originalPrice: 169.99,
    rating: 4.8,
    reviews: 345,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "New", ar: "جديد" },
    daysAgo: 7,
    inStock: true,
    stockCount: 50,
  },
  {
    id: 110,
    name: { en: "Adidas Ultraboost 24", ar: "أديداس ألترابوست 24" },
    description: { en: "Premium running shoes", ar: "حذاء جري فاخر" },
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
    price: 189.99,
    originalPrice: 210.0,
    rating: 4.7,
    reviews: 234,
    category: { en: "Sports", ar: "رياضة" },
    badge: { en: "Popular", ar: "شائع" },
    daysAgo: 7,
    inStock: true,
    stockCount: 40,
  },
  {
    id: 111,
    name: { en: "Apple Watch Series 9", ar: "ساعة أبل الإصدار 9" },
    description: {
      en: "Most advanced Apple Watch",
      ar: "ساعة أبل الأكثر تطوراً",
    },
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400",
    price: 399.99,
    originalPrice: 449.99,
    rating: 4.9,
    reviews: 567,
    category: { en: "Electronics", ar: "إلكترونيات" },
    badge: { en: "Just Arrived", ar: "وصل حديثاً" },
    daysAgo: 2,
    inStock: true,
    stockCount: 30,
  },
  {
    id: 112,
    name: { en: "Lululemon Yoga Set", ar: "طقم يوغا لولوليمون" },
    description: { en: "Premium yoga wear", ar: "ملابس يوغا فاخرة" },
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400",
    price: 128.0,
    originalPrice: 158.0,
    rating: 4.8,
    reviews: 890,
    category: { en: "Sports", ar: "رياضة" },
    badge: { en: "Trending", ar: "رائج" },
    daysAgo: 4,
    inStock: true,
    stockCount: 60,
  },
];
