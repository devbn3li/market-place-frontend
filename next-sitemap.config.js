/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://amanoon.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ["/seller-center", "/fulfillment", "/server-sitemap.xml", "/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/seller-center", "/fulfillment", "/api"],
      },
    ],
    additionalSitemaps: ["https://amanoon.vercel.app/server-sitemap.xml"],
  },
  transform: async (config, path) => {
    // Custom priority for different pages
    let priority = 0.7;
    let changefreq = "weekly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path.startsWith("/products")) {
      priority = 0.9;
      changefreq = "daily";
    } else if (path.startsWith("/product/")) {
      priority = 0.8;
      changefreq = "daily";
    } else if (path.startsWith("/categories/")) {
      priority = 0.8;
      changefreq = "daily";
    } else if (path === "/sell" || path === "/contact" || path === "/about") {
      priority = 0.6;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
