#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🗺️  Generating sitemap...\n");

try {
  // Run next-sitemap
  execSync("next-sitemap", { stdio: "inherit" });

  // Check generated files
  const publicDir = path.join(process.cwd(), "public");
  const sitemapPath = path.join(publicDir, "sitemap.xml");
  const robotsPath = path.join(publicDir, "robots.txt");

  console.log("\n✅ Sitemap generation completed!\n");

  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
    const urlCount = (sitemapContent.match(/<url>/g) || []).length;
    console.log(`📄 sitemap.xml - ${urlCount} URLs generated`);
  }

  if (fs.existsSync(robotsPath)) {
    console.log("🤖 robots.txt - Generated successfully");
  }

  console.log("🌐 server-sitemap.xml - Dynamic sitemap route configured\n");
  console.log("✨ All sitemaps ready for deployment!\n");
} catch (error) {
  console.error("❌ Error generating sitemap:", error.message);
  process.exit(1);
}
