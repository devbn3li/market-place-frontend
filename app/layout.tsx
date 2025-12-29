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
    default: "Amanoon - E-commerce Demo | Portfolio Project",
    template: "%s | Amanoon Demo",
  },
  description:
    "Amanoon is a demonstration e-commerce marketplace built with Next.js. This is a portfolio/demo project showcasing modern web development - no real transactions occur.",
  keywords: [
    "demo",
    "portfolio",
    "e-commerce demo",
    "Next.js project",
    "web development",
    "marketplace demo",
  ],
  authors: [{ name: "Developer Portfolio" }],
  creator: "Portfolio Project",
  publisher: "Demo Site",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Amanoon - E-commerce Demo Site",
    description:
      "A demonstration e-commerce marketplace. This is a portfolio project - no real transactions.",
    type: "website",
    siteName: "Amanoon Demo",
  },
  twitter: {
    card: "summary_large_image",
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
