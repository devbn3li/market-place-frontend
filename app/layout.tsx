import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/context/language-context";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";
import { OrdersProvider } from "@/context/orders-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "Amanoon - Your Ultimate Marketplace",
  description: "Shop millions of products at great prices. Electronics, Fashion, Home & Garden, and more!",
  keywords: ["marketplace", "online shopping", "electronics", "fashion", "deals"],
  openGraph: {
    title: "Amanoon - Your Ultimate Marketplace",
    description: "Shop millions of products at great prices",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cairo.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <AuthProvider>
              <OrdersProvider>
                <CartProvider>
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </CartProvider>
              </OrdersProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
