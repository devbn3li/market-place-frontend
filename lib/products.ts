// Product Types
export interface ProductBasic {
  id: number;
  slug: string;
  name: { en: string; ar: string };
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  badge: { en: string; ar: string } | null;
}

export interface ProductDetail extends ProductBasic {
  description: { en: string; ar: string };
  images: string[];
  brand: string;
  sku: string;
  stockCount: number;
  features: { en: string[]; ar: string[] };
  specifications: Record<string, string>;
  colors: Array<{ name: { en: string; ar: string }; hex: string }>;
  sizes?: string[];
  warranty: { en: string; ar: string };
  returnPolicy: { en: string; ar: string };
  tags: string[];
}

// Legacy Product type for compatibility
export interface Product {
  id: number;
  slug?: string;
  name: { en: string; ar: string };
  description?: { en: string; ar: string };
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  category: { en: string; ar: string };
  badge?: { en: string; ar: string } | null;
  soldCount?: number;
  rank?: number;
  daysAgo?: number;
  inStock: boolean;
  stockCount?: number;
}

// Import JSON data
import productsListData from "@/data/products-list.json";
import productsDetailsData from "@/data/products-details.json";

// Category name mapping
const categoryNames: Record<string, { en: string; ar: string }> = {
  electronics: { en: "Electronics", ar: "إلكترونيات" },
  computers: { en: "Computers", ar: "كمبيوتر" },
  audio: { en: "Audio", ar: "صوتيات" },
  cameras: { en: "Cameras", ar: "كاميرات" },
  fashion: { en: "Fashion", ar: "أزياء" },
  "home-garden": { en: "Home & Garden", ar: "المنزل والحديقة" },
  home: { en: "Home", ar: "منزل" },
  sports: { en: "Sports", ar: "رياضة" },
  beauty: { en: "Beauty", ar: "جمال" },
  toys: { en: "Toys & Games", ar: "ألعاب" },
  games: { en: "Games", ar: "ألعاب" },
  automotive: { en: "Automotive", ar: "سيارات" },
  pets: { en: "Pets", ar: "حيوانات أليفة" },
  baby: { en: "Baby", ar: "أطفال" },
  watches: { en: "Watches & Jewelry", ar: "ساعات ومجوهرات" },
  furniture: { en: "Furniture", ar: "أثاث" },
  books: { en: "Books", ar: "كتب" },
  grocery: { en: "Grocery", ar: "بقالة" },
  health: { en: "Health", ar: "صحة" },
  gaming: { en: "Gaming", ar: "ألعاب فيديو" },
};

// Get category display name
export function getCategoryName(categorySlug: string): {
  en: string;
  ar: string;
} {
  return categoryNames[categorySlug] || { en: categorySlug, ar: categorySlug };
}

// Get all products (basic info)
export function getAllProducts(): ProductBasic[] {
  return productsListData.products as ProductBasic[];
}

// Get product by ID (basic info)
export function getProductById(id: number): ProductBasic | undefined {
  return (productsListData.products as ProductBasic[]).find((p) => p.id === id);
}

// Get product by slug (basic info)
export function getProductBySlug(slug: string): ProductBasic | undefined {
  return (productsListData.products as ProductBasic[]).find(
    (p) => p.slug === slug
  );
}

// Get product details by ID
export function getProductDetails(id: number): ProductDetail | undefined {
  const details = productsDetailsData.products as unknown as Record<
    string,
    ProductDetail
  >;
  return details[id.toString()];
}

// Get products by category
export function getProductsByCategory(categorySlug: string): ProductBasic[] {
  return (productsListData.products as ProductBasic[]).filter(
    (p) => p.category === categorySlug
  );
}

// Get featured products (products with badges)
export function getFeaturedProducts(limit: number = 8): ProductBasic[] {
  return (productsListData.products as ProductBasic[])
    .filter((p) => p.badge !== null)
    .slice(0, limit);
}

// Get best sellers (by reviews count as popularity indicator)
export function getBestSellers(limit: number = 12): Product[] {
  return (productsListData.products as ProductBasic[])
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, limit)
    .map((p, index) => ({
      ...p,
      category: getCategoryName(p.category),
      soldCount: Math.floor(p.reviews * 2.5),
      rank: index + 1,
      stockCount: Math.floor(Math.random() * 100) + 10,
    }));
}

// Get new arrivals (products with "New" or "Just Arrived" badges)
export function getNewArrivals(limit: number = 12): Product[] {
  const newProducts = (productsListData.products as ProductBasic[]).filter(
    (p) =>
      p.badge?.en === "New" ||
      p.badge?.en === "Just Arrived" ||
      p.badge?.en === "Hot"
  );

  const otherProducts = (productsListData.products as ProductBasic[])
    .filter((p) => !newProducts.includes(p))
    .slice(0, limit - newProducts.length);

  return [...newProducts, ...otherProducts].slice(0, limit).map((p) => ({
    ...p,
    category: getCategoryName(p.category),
    daysAgo: Math.floor(Math.random() * 7) + 1,
    isNew: true,
    stockCount: Math.floor(Math.random() * 100) + 10,
  }));
}

// Get deals/discounted products
export function getDeals(limit: number = 12): ProductBasic[] {
  return (productsListData.products as ProductBasic[])
    .filter((p) => p.originalPrice > p.price)
    .sort((a, b) => {
      const discountA = (a.originalPrice - a.price) / a.originalPrice;
      const discountB = (b.originalPrice - b.price) / b.originalPrice;
      return discountB - discountA;
    })
    .slice(0, limit);
}

// Search products
export function searchProducts(query: string): ProductBasic[] {
  const lowerQuery = query.toLowerCase();
  return (productsListData.products as ProductBasic[]).filter(
    (p) =>
      p.name.en.toLowerCase().includes(lowerQuery) ||
      p.name.ar.includes(query) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
}

// Get related products
export function getRelatedProducts(
  productId: number,
  limit: number = 4
): ProductBasic[] {
  const product = getProductById(productId);
  if (!product) return [];

  return (productsListData.products as ProductBasic[])
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}

// Convert basic product to legacy Product format
export function toProduct(basic: ProductBasic): Product {
  return {
    ...basic,
    category: getCategoryName(basic.category),
    stockCount: Math.floor(Math.random() * 100) + 10,
  };
}

// Convert array of basic products to legacy Product format
export function toProducts(basics: ProductBasic[]): Product[] {
  return basics.map(toProduct);
}

// Generate products for category pages
export function generateProductsForCategory(categorySlug: string): Product[] {
  const categoryProducts = getProductsByCategory(categorySlug);

  if (categoryProducts.length > 0) {
    return toProducts(categoryProducts);
  }

  return toProducts(getAllProducts().slice(0, 12));
}

// Legacy exports for backward compatibility - now using JSON data
export const bestSellerProducts: Product[] = getBestSellers(20);
export const newArrivalProducts: Product[] = getNewArrivals(20);
export const allProducts: Product[] = [
  ...bestSellerProducts,
  ...newArrivalProducts,
];
