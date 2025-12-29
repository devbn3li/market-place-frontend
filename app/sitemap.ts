import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://market-place-frontend-tawny.vercel.app";

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/categories",
    "/deals",
    "/best-sellers",
    "/new-arrivals",
    "/contact",
    "/faq",
    "/help",
    "/shipping",
    "/returns",
    "/privacy",
    "/terms",
    "/cookies",
    "/careers",
    "/press",
    "/blog",
    "/login",
    "/register",
  ];

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Category pages
  const categories = [
    "electronics",
    "fashion",
    "home-garden",
    "sports",
    "beauty",
    "toys",
    "books",
    "automotive",
  ];

  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/categories/${category}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  // Product pages (1-30)
  const productRoutes = Array.from({ length: 30 }, (_, i) => ({
    url: `${baseUrl}/product/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
