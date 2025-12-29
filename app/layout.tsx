import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";
import { StoreProvider } from "@/stores";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Amanoon - Shop Smart, Live Better | Online Shopping Marketplace",
    template: "%s | Amanoon",
  },
  description:
    "Discover millions of products at unbeatable prices on Amanoon. Shop electronics, fashion, home & garden, sports and more with free shipping on orders over $50. Fast delivery, secure payment, 24/7 customer support.",
  keywords: [
    "online shopping",
    "e-commerce",
    "electronics",
    "fashion",
    "home decor",
    "sports equipment",
    "free shipping",
    "marketplace",
    "online store",
    "best deals",
    "discount shopping",
  ],
  authors: [{ name: "Amanoon Team" }],
  creator: "Amanoon",
  publisher: "Amanoon Marketplace",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Amanoon - Shop Smart, Live Better",
    description:
      "Your one-stop online marketplace for electronics, fashion, home goods and more. Free shipping, secure checkout, and 24/7 support.",
    type: "website",
    siteName: "Amanoon",
    locale: "en_US",
    alternateLocale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amanoon - Shop Smart, Live Better",
    description: "Discover millions of products at unbeatable prices with fast delivery.",
  },
  alternates: {
    canonical: "https://amanoon.vercel.app",
  },
  verification: {
    google: "your-google-verification-code",
  },
    title: "Amanoon - E-commerce Demo",
    description: "Portfolio demo project showcasing e-commerce development",
  },
  manifest: "/manifest.json",
  other: {
    "demo-site": "true",
    "portfolio-project": "true",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
        <meta name="application-name" content="Amanoon Demo" />
        <meta name="apple-mobile-web-app-title" content="Amanoon Demo" />
        <meta name="format-detection" content="telephone=no" />
        {/* Demo site indicator for crawlers */}
        <meta name="classification" content="Demo/Portfolio" />
        <meta name="category" content="Demo Website" />
      </head>
      <body
        className={`${inter.variable} ${cairo.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster position="top-center" richColors />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
