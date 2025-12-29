"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/stores";

const t = {
  company: { en: "Company", ar: "الشركة" },
  aboutUs: { en: "About Us", ar: "من نحن" },
  careers: { en: "Careers", ar: "الوظائف" },
  press: { en: "Press", ar: "الصحافة" },
  blog: { en: "Blog", ar: "المدونة" },
  customerService: { en: "Customer Service", ar: "خدمة العملاء" },
  help: { en: "Help Center", ar: "مركز المساعدة" },
  contactUs: { en: "Contact Us", ar: "اتصل بنا" },
  faq: { en: "FAQ", ar: "الأسئلة الشائعة" },
  shipping: { en: "Shipping Info", ar: "معلومات الشحن" },
  legal: { en: "Legal", ar: "قانوني" },
  privacy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  terms: { en: "Terms of Service", ar: "شروط الخدمة" },
  cookies: { en: "Cookies Policy", ar: "سياسة ملفات تعريف الارتباط" },
  newsletter: { en: "Newsletter", ar: "النشرة الإخبارية" },
  subscribe: { en: "Subscribe", ar: "اشترك" },
  emailPlaceholder: { en: "Enter your email", ar: "أدخل بريدك الإلكتروني" },
  newsletterDesc: { en: "Subscribe to our newsletter for exclusive deals and updates!", ar: "اشترك في نشرتنا للحصول على عروض حصرية وتحديثات!" },
  allRightsReserved: { en: "All rights reserved", ar: "جميع الحقوق محفوظة" },
  followUs: { en: "Follow Us", ar: "تابعنا" },
  freeShipping: { en: "Free Shipping", ar: "شحن مجاني" },
  freeShippingDesc: { en: "On orders over $50", ar: "للطلبات فوق 50$" },
  securePayment: { en: "Secure Payment", ar: "دفع آمن" },
  securePaymentDesc: { en: "100% secure payment", ar: "دفع آمن 100%" },
  support: { en: "24/7 Support", ar: "دعم على مدار الساعة" },
  supportDesc: { en: "We're here to help", ar: "نحن هنا للمساعدة" },
  returns: { en: "Easy Returns", ar: "إرجاع سهل" },
  returnsDesc: { en: "30-day return policy", ar: "سياسة إرجاع 30 يوم" },
  helpSupport: { en: "Help & Support", ar: "المساعدة والدعم" },
  helpCenter: { en: "Help Center", ar: "مركز المساعدة" },
  shippingInfo: { en: "Shipping Info", ar: "معلومات الشحن" },
  termsOfService: { en: "Terms of Service", ar: "شروط الخدمة" },
  privacyPolicy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  cookiePolicy: { en: "Cookies Policy", ar: "سياسة ملفات تعريف الارتباط" },
  sellOnAmanoon: { en: "Sell on Amanoon", ar: "البيع على أمانون" },
  startSelling: { en: "Start Selling", ar: "ابدأ البيع" },
  sellerCenter: { en: "Seller Center", ar: "مركز البائع" },
  fulfillment: { en: "Fulfillment", ar: "التوصيل" },
  freeShippingTitle: { en: "Free Shipping", ar: "شحن مجاني" },
  onOrdersOver50: { en: "On orders over $50", ar: "للطلبات فوق 50$" },
  secureCheckout: { en: "100% Secure Checkout", ar: "دفع آمن 100%" },
  support247: { en: "24/7 Support", ar: "دعم على مدار الساعة" },
  dedicatedSupport: { en: "We're here to help", ar: "نحن هنا للمساعدة" },
  easyReturns: { en: "Easy Returns", ar: "إرجاع سهل" },
  returnPolicy: { en: "30-day return policy", ar: "سياسة إرجاع 30 يوم" },
  footerDescription: { en: "Your one-stop shop for everything you need. Quality products, great prices, fast delivery.", ar: "متجرك الشامل لكل ما تحتاجه. منتجات عالية الجودة، أسعار رائعة، توصيل سريع." },
  subscribeNewsletter: { en: "Subscribe to Newsletter", ar: "اشترك في النشرة الإخبارية" },
  enterYourEmail: { en: "Enter your email", ar: "أدخل بريدك الإلكتروني" },
  address: { en: "123 Market Street, Tech City", ar: "123 شارع السوق، مدينة التقنية" },
};

const footerLinks = {
  company: {
    title: t.company,
    links: [
      { href: "/about", label: t.aboutUs },
      { href: "/careers", label: t.careers },
      { href: "/press", label: t.press },
      { href: "/blog", label: t.blog },
    ],
  },
  help: {
    title: t.helpSupport,
    links: [
      { href: "/help", label: t.helpCenter },
      { href: "/shipping", label: t.shippingInfo },
      { href: "/returns", label: t.returns },
      { href: "/faq", label: t.faq },
    ],
  },
  legal: {
    title: t.legal,
    links: [
      { href: "/terms", label: t.termsOfService },
      { href: "/privacy", label: t.privacyPolicy },
      { href: "/cookies", label: t.cookiePolicy },
    ],
  },
  seller: {
    title: t.sellOnAmanoon,
    links: [
      { href: "/sell", label: t.startSelling },
      { href: "/seller-center", label: t.sellerCenter },
      { href: "/fulfillment", label: t.fulfillment },
    ],
  },
};

const features = [
  {
    icon: Truck,
    title: t.freeShippingTitle,
    description: t.onOrdersOver50,
  },
  {
    icon: ShieldCheck,
    title: t.securePayment,
    description: t.secureCheckout,
  },
  {
    icon: Headphones,
    title: t.support247,
    description: t.dedicatedSupport,
  },
  {
    icon: CreditCard,
    title: t.easyReturns,
    description: t.returnPolicy,
  },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "Youtube" },
];

export function Footer() {
  const { language } = useLanguageStore();
  return (
    <footer className="bg-muted/50 border-t">
      {/* Features Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="shrink-0 w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-orange-500" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    {feature.title[language]}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {feature.description[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                {language === "ar" ? "امانون" : "Amanoon"}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {t.footerDescription[language]}
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">
                {t.subscribeNewsletter[language]}
              </h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t.enterYourEmail[language]}
                  className="flex-1"
                />
                <Button className="bg-orange-500 hover:bg-orange-600">
                  {t.subscribe[language]}
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.values(footerLinks).map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title[language]}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-orange-500 transition-colors"
                    >
                      {link.label[language]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
            <a href="mailto:support@amanoon.com" className="flex items-center gap-2 hover:text-orange-500">
              <Mail className="h-4 w-4" />
              support@amanoon.com
            </a>
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-orange-500">
              <Phone className="h-4 w-4" />
              +1 (234) 567-890
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {t.address[language]}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-muted/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} {language === "ar" ? "امانون" : "Amanoon"}.{" "}
              {t.allRightsReserved[language]}
            </p>
            <div className="flex items-center gap-4">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/200px-MasterCard_Logo.svg.png"
                alt="Mastercard"
                width={60}
                height={24}
                className="h-6 object-contain"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                alt="Visa"
                width={60}
                height={24}
                className="h-6 object-contain"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png"
                alt="PayPal"
                width={60}
                height={24}
                className="h-6 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
