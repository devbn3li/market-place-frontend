import { getAllProducts } from "@/lib/products";

export async function GET() {
  // Get all products
  const products = getAllProducts();

  // Base URL
  const baseUrl = "https://amanoon.vercel.app";

  // Generate dynamic URLs for products
  const productUrls = products.map((product) => ({
    loc: `${baseUrl}/product/${product.id}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 0.8,
  }));

  // Categories
  const categories = [
    "electronics",
    "fashion",
    "home",
    "sports",
    "furniture",
    "watches",
  ];

  const categoryUrls = categories.map((category) => ({
    loc: `${baseUrl}/categories/${category}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 0.8,
  }));

  // Combine all URLs
  const allUrls = [...productUrls, ...categoryUrls];

  // Generate XML manually for App Router
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate",
    },
  });
}
