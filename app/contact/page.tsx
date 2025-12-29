"use client";

import { useLanguage } from "@/context/language-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success(
      language === "ar"
        ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً."
        : "Message sent successfully! We'll get back to you soon."
    );

    // Reset form
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      titleEn: "Phone",
      titleAr: "الهاتف",
      valueEn: "+1 (800) 123-4567",
      valueAr: "+1 (800) 123-4567",
      descEn: "Mon-Fri 9am-6pm",
      descAr: "الإثنين-الجمعة 9ص-6م",
      color: "green",
    },
    {
      icon: Mail,
      titleEn: "Email",
      titleAr: "البريد الإلكتروني",
      valueEn: "support@amanoon.com",
      valueAr: "support@amanoon.com",
      descEn: "We reply within 24 hours",
      descAr: "نرد خلال 24 ساعة",
      color: "blue",
    },
    {
      icon: MapPin,
      titleEn: "Address",
      titleAr: "العنوان",
      valueEn: "123 Tahrir Street",
      valueAr: "123 شارع التحرير",
      descEn: "Cairo, Egypt",
      descAr: "القاهرة، مصر",
      color: "orange",
    },
    {
      icon: Clock,
      titleEn: "Working Hours",
      titleAr: "ساعات العمل",
      valueEn: "24/7 Support",
      valueAr: "دعم على مدار الساعة",
      descEn: "Always here to help",
      descAr: "دائماً هنا لمساعدتك",
      color: "purple",
    },
  ];

  const subjects = [
    { en: "General Inquiry", ar: "استفسار عام" },
    { en: "Order Issue", ar: "مشكلة في الطلب" },
    { en: "Return/Refund", ar: "إرجاع/استرداد" },
    { en: "Technical Support", ar: "دعم تقني" },
    { en: "Partnership", ar: "شراكة" },
    { en: "Feedback", ar: "ملاحظات" },
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; darkBg: string } } = {
      orange: { bg: "bg-orange-100", text: "text-orange-500", darkBg: "dark:bg-orange-500/20" },
      blue: { bg: "bg-blue-100", text: "text-blue-500", darkBg: "dark:bg-blue-500/20" },
      green: { bg: "bg-green-100", text: "text-green-500", darkBg: "dark:bg-green-500/20" },
      purple: { bg: "bg-purple-100", text: "text-purple-500", darkBg: "dark:bg-purple-500/20" },
    };
    return colors[color] || colors.orange;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Headphones className="h-16 w-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl font-bold mb-4">
            {language === "ar" ? "تواصل معنا" : "Contact Us"}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {language === "ar"
              ? "نحن هنا لمساعدتك! تواصل معنا وسنرد عليك في أقرب وقت ممكن"
              : "We're here to help! Get in touch with us and we'll respond as soon as possible"}
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, index) => {
            const colors = getColorClasses(info.color);
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow"
              >
                <div className={`inline-flex p-3 rounded-lg ${colors.bg} ${colors.darkBg} mb-4`}>
                  <info.icon className={`h-6 w-6 ${colors.text}`} />
                </div>
                <h3 className="font-semibold mb-1">
                  {language === "ar" ? info.titleAr : info.titleEn}
                </h3>
                <p className="font-medium text-foreground">
                  {language === "ar" ? info.valueAr : info.valueEn}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "ar" ? info.descAr : info.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-sm border">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                <MessageCircle className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {language === "ar" ? "أرسل لنا رسالة" : "Send us a Message"}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {language === "ar"
                    ? "املأ النموذج وسنتواصل معك قريباً"
                    : "Fill out the form and we'll get back to you soon"}
                </p>
              </div>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === "ar" ? "تم الإرسال بنجاح!" : "Successfully Sent!"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === "ar"
                    ? "شكراً لتواصلك معنا. سنرد عليك خلال 24 ساعة."
                    : "Thank you for contacting us. We'll respond within 24 hours."}
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                  {language === "ar" ? "إرسال رسالة أخرى" : "Send Another Message"}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === "ar" ? "الاسم الكامل" : "Full Name"} *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === "ar" ? "أدخل اسمك" : "Enter your name"}
                      className="py-5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === "ar" ? "البريد الإلكتروني" : "Email"} *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                      className="py-5"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === "ar" ? "رقم الهاتف" : "Phone Number"}
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={language === "ar" ? "أدخل رقم هاتفك" : "Enter your phone"}
                      className="py-5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === "ar" ? "الموضوع" : "Subject"} *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-11 px-3 rounded-md border bg-background text-foreground"
                    >
                      <option value="">
                        {language === "ar" ? "اختر الموضوع" : "Select a subject"}
                      </option>
                      {subjects.map((subject, i) => (
                        <option key={i} value={subject.en}>
                          {language === "ar" ? subject.ar : subject.en}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === "ar" ? "الرسالة" : "Message"} *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      language === "ar"
                        ? "اكتب رسالتك هنا..."
                        : "Write your message here..."
                    }
                    className="w-full px-3 py-3 rounded-md border bg-background text-foreground resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-orange-500 hover:bg-orange-600"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {language === "ar" ? "جاري الإرسال..." : "Sending..."}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      {language === "ar" ? "إرسال الرسالة" : "Send Message"}
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Right Side Info */}
          <div className="space-y-8">
            {/* Map */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-sm border">
              <div className="aspect-video bg-muted relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.6554668767387!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c5a6b2b5f9%3A0x5e3b7f9c7b5b0b0!2sCairo%2C%20Egypt!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {language === "ar"
                    ? "123 شارع التحرير، القاهرة، مصر"
                    : "123 Tahrir Street, Cairo, Egypt"}
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">
                  {language === "ar" ? "معلومات الشركة" : "Company Info"}
                </h3>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Amanoon LLC</span>
                </p>
                <p>
                  {language === "ar"
                    ? "رقم السجل التجاري: 123456789"
                    : "Commercial Registration: 123456789"}
                </p>
                <p>
                  {language === "ar"
                    ? "الرقم الضريبي: UAE-TAX-123456"
                    : "Tax Number: UAE-TAX-123456"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
