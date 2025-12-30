"use client";

import { useEffect, useState } from "react";
import { useAuthStore, useLanguageStore } from "@/stores";
import {
  Save,
  Globe,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Store,
  Mail,
  Phone,
  MapPin,
  Percent,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const translations = {
  ar: {
    platformSettings: "إعدادات المنصة",
    managePlatformSettings: "إدارة إعدادات المنصة العامة",
    saveChanges: "حفظ التغييرات",
    general: "عام",
    commerce: "التجارة",
    notifications: "الإشعارات",
    appearance: "المظهر",
    generalSettings: "الإعدادات العامة",
    siteNameEn: "اسم الموقع (English)",
    siteNameAr: "اسم الموقع (عربي)",
    email: "البريد الإلكتروني",
    phoneNumber: "رقم الهاتف",
    addressEn: "العنوان (English)",
    addressAr: "العنوان (عربي)",
    commerceSettings: "إعدادات التجارة",
    currency: "العملة",
    taxRate: "نسبة الضريبة (%)",
    freeShippingThreshold: "حد الشحن المجاني",
    freeShippingNote: "الطلبات أعلى من هذا المبلغ تحصل على شحن مجاني",
    defaultShippingFee: "رسوم الشحن الافتراضية",
    notificationSettings: "إعدادات الإشعارات",
    emailNotifications: "إشعارات البريد الإلكتروني",
    emailNotificationsDesc: "استلام الإشعارات عبر البريد الإلكتروني",
    orderNotifications: "إشعارات الطلبات",
    orderNotificationsDesc: "إشعارات عند ورود طلبات جديدة",
    sellerNotifications: "إشعارات البائعين",
    sellerNotificationsDesc: "إشعارات عند تقديم طلبات بائعين جدد",
    marketingEmails: "رسائل التسويق",
    marketingEmailsDesc: "استلام رسائل ترويجية وتسويقية",
    appearanceSettings: "إعدادات المظهر",
    primaryColor: "اللون الرئيسي",
    secondaryColor: "اللون الثانوي",
    darkMode: "الوضع الليلي",
    darkModeDesc: "تفعيل الوضع الليلي للوحة التحكم",
    colorPreview: "معاينة الألوان",
    primary: "رئيسي",
    secondary: "ثانوي",
    settingsSaved: "تم حفظ الإعدادات بنجاح",
    sarCurrency: "ريال سعودي (SAR)",
    usdCurrency: "دولار أمريكي (USD)",
    eurCurrency: "يورو (EUR)",
    aedCurrency: "درهم إماراتي (AED)",
  },
  en: {
    platformSettings: "Platform Settings",
    managePlatformSettings: "Manage general platform settings",
    saveChanges: "Save Changes",
    general: "General",
    commerce: "Commerce",
    notifications: "Notifications",
    appearance: "Appearance",
    generalSettings: "General Settings",
    siteNameEn: "Site Name (English)",
    siteNameAr: "Site Name (Arabic)",
    email: "Email",
    phoneNumber: "Phone Number",
    addressEn: "Address (English)",
    addressAr: "Address (Arabic)",
    commerceSettings: "Commerce Settings",
    currency: "Currency",
    taxRate: "Tax Rate (%)",
    freeShippingThreshold: "Free Shipping Threshold",
    freeShippingNote: "Orders above this amount get free shipping",
    defaultShippingFee: "Default Shipping Fee",
    notificationSettings: "Notification Settings",
    emailNotifications: "Email Notifications",
    emailNotificationsDesc: "Receive notifications via email",
    orderNotifications: "Order Notifications",
    orderNotificationsDesc: "Notifications when new orders are placed",
    sellerNotifications: "Seller Notifications",
    sellerNotificationsDesc: "Notifications when new seller applications are submitted",
    marketingEmails: "Marketing Emails",
    marketingEmailsDesc: "Receive promotional and marketing emails",
    appearanceSettings: "Appearance Settings",
    primaryColor: "Primary Color",
    secondaryColor: "Secondary Color",
    darkMode: "Dark Mode",
    darkModeDesc: "Enable dark mode for the dashboard",
    colorPreview: "Color Preview",
    primary: "Primary",
    secondary: "Secondary",
    settingsSaved: "Settings saved successfully",
    sarCurrency: "Saudi Riyal (SAR)",
    usdCurrency: "US Dollar (USD)",
    eurCurrency: "Euro (EUR)",
    aedCurrency: "UAE Dirham (AED)",
  },
};

interface PlatformSettings {
  general: {
    siteName: string;
    siteNameAr: string;
    email: string;
    phone: string;
    address: string;
    addressAr: string;
  };
  commerce: {
    currency: string;
    taxRate: number;
    freeShippingThreshold: number;
    defaultShippingFee: number;
  };
  notifications: {
    emailNotifications: boolean;
    orderNotifications: boolean;
    sellerNotifications: boolean;
    marketingEmails: boolean;
  };
  appearance: {
    primaryColor: string;
    accentColor: string;
    darkMode: boolean;
  };
}

const defaultSettings: PlatformSettings = {
  general: {
    siteName: "Amanoon",
    siteNameAr: "أمانون",
    email: "support@amanoon.com",
    phone: "+966 50 123 4567",
    address: "Riyadh, Saudi Arabia",
    addressAr: "الرياض، المملكة العربية السعودية",
  },
  commerce: {
    currency: "SAR",
    taxRate: 15,
    freeShippingThreshold: 200,
    defaultShippingFee: 25,
  },
  notifications: {
    emailNotifications: true,
    orderNotifications: true,
    sellerNotifications: true,
    marketingEmails: false,
  },
  appearance: {
    primaryColor: "#f97316",
    accentColor: "#ea580c",
    darkMode: false,
  },
};

export default function AdminSettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<PlatformSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState("general");
  const { language } = useLanguageStore();
  const t = translations[language];

  useEffect(() => {
    setMounted(true);
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("amanoon-platform-settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("amanoon-platform-settings", JSON.stringify(settings));
    toast.success(t.settingsSaved);
  };

  const tabs = [
    { id: "general", label: t.general, icon: Globe },
    { id: "commerce", label: t.commerce, icon: CreditCard },
    { id: "notifications", label: t.notifications, icon: Bell },
    { id: "appearance", label: t.appearance, icon: Palette },
  ];

  if (!mounted) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3"></div>
        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.platformSettings}</h1>
          <p className="text-gray-500 dark:text-gray-400">{t.managePlatformSettings}</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          {t.saveChanges}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 h-fit">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${language === 'ar' ? 'text-right' : 'text-left'} ${activeTab === tab.id
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-orange-500" />
                  {t.generalSettings}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.siteNameEn}
                  </label>
                  <div className="relative">
                    <Store className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
                    <Input
                      value={settings.general.siteName}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: {
                            ...settings.general,
                            siteName: e.target.value,
                          },
                        })
                      }
                      className={language === 'ar' ? 'pr-10' : 'pl-10'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.siteNameAr}
                  </label>
                  <div className="relative">
                    <Store className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
                    <Input
                      value={settings.general.siteNameAr}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: {
                            ...settings.general,
                            siteNameAr: e.target.value,
                          },
                        })
                      }
                      className={language === 'ar' ? 'pr-10' : 'pl-10'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.email}
                  </label>
                  <div className="relative">
                    <Mail className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
                    <Input
                      type="email"
                      value={settings.general.email}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: {
                            ...settings.general,
                            email: e.target.value,
                          },
                        })
                      }
                      className={language === 'ar' ? 'pr-10' : 'pl-10'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.phoneNumber}
                  </label>
                  <div className="relative">
                    <Phone className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
                    <Input
                      value={settings.general.phone}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: {
                            ...settings.general,
                            phone: e.target.value,
                          },
                        })
                      }
                      className={language === 'ar' ? 'pr-10' : 'pl-10'}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.addressEn}
                  </label>
                  <div className="relative">
                    <MapPin className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
                    <Input
                      value={settings.general.address}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: {
                            ...settings.general,
                            address: e.target.value,
                          },
                        })
                      }
                      className={language === 'ar' ? 'pr-10' : 'pl-10'}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.addressAr}
                  </label>
                  <div className="relative">
                    <MapPin className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
                    <Input
                      value={settings.general.addressAr}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: {
                            ...settings.general,
                            addressAr: e.target.value,
                          },
                        })
                      }
                      className={language === 'ar' ? 'pr-10' : 'pl-10'}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "commerce" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-orange-500" />
                  {t.commerceSettings}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.currency}
                  </label>
                  <select
                    value={settings.commerce.currency}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        commerce: {
                          ...settings.commerce,
                          currency: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                    <option value="SAR">{t.sarCurrency}</option>
                    <option value="USD">{t.usdCurrency}</option>
                    <option value="EUR">{t.eurCurrency}</option>
                    <option value="AED">{t.aedCurrency}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.taxRate}
                  </label>
                  <div className="relative">
                    <Percent className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
                    <Input
                      type="number"
                      value={settings.commerce.taxRate}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          commerce: {
                            ...settings.commerce,
                            taxRate: Number(e.target.value),
                          },
                        })
                      }
                      className={language === 'ar' ? 'pr-10' : 'pl-10'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.freeShippingThreshold}
                  </label>
                  <div className="relative">
                    <Package className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
                    <Input
                      type="number"
                      value={settings.commerce.freeShippingThreshold}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          commerce: {
                            ...settings.commerce,
                            freeShippingThreshold: Number(e.target.value),
                          },
                        })
                      }
                      className={language === 'ar' ? 'pr-10' : 'pl-10'}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {t.freeShippingNote}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.defaultShippingFee}
                  </label>
                  <div className="relative">
                    <Package className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
                    <Input
                      type="number"
                      value={settings.commerce.defaultShippingFee}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          commerce: {
                            ...settings.commerce,
                            defaultShippingFee: Number(e.target.value),
                          },
                        })
                      }
                      className={language === 'ar' ? 'pr-10' : 'pl-10'}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-500" />
                  {t.notificationSettings}
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: "emailNotifications",
                    label: t.emailNotifications,
                    description: t.emailNotificationsDesc,
                  },
                  {
                    key: "orderNotifications",
                    label: t.orderNotifications,
                    description: t.orderNotificationsDesc,
                  },
                  {
                    key: "sellerNotifications",
                    label: t.sellerNotifications,
                    description: t.sellerNotificationsDesc,
                  },
                  {
                    key: "marketingEmails",
                    label: t.marketingEmails,
                    description: t.marketingEmailsDesc,
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{item.label}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                    </div>
                    <button
                      onClick={() =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [item.key]:
                              !settings.notifications[
                              item.key as keyof typeof settings.notifications
                              ],
                          },
                        })
                      }
                      className={`relative w-12 h-6 rounded-full transition-colors ${settings.notifications[
                        item.key as keyof typeof settings.notifications
                      ]
                        ? "bg-orange-500"
                        : "bg-gray-300 dark:bg-gray-600"
                        }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.notifications[
                          item.key as keyof typeof settings.notifications
                        ]
                          ? (language === 'ar' ? "left-1" : "right-1")
                          : (language === 'ar' ? "left-7" : "right-7")
                          }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-orange-500" />
                  {t.appearanceSettings}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.primaryColor}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: {
                            ...settings.appearance,
                            primaryColor: e.target.value,
                          },
                        })
                      }
                      className="w-12 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-600 cursor-pointer"
                    />
                    <Input
                      value={settings.appearance.primaryColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: {
                            ...settings.appearance,
                            primaryColor: e.target.value,
                          },
                        })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.secondaryColor}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.appearance.accentColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: {
                            ...settings.appearance,
                            accentColor: e.target.value,
                          },
                        })
                      }
                      className="w-12 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-600 cursor-pointer"
                    />
                    <Input
                      value={settings.appearance.accentColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: {
                            ...settings.appearance,
                            accentColor: e.target.value,
                          },
                        })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{t.darkMode}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t.darkModeDesc}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setSettings({
                        ...settings,
                        appearance: {
                          ...settings.appearance,
                          darkMode: !settings.appearance.darkMode,
                        },
                      })
                    }
                    className={`relative w-12 h-6 rounded-full transition-colors ${settings.appearance.darkMode
                      ? "bg-orange-500"
                      : "bg-gray-300 dark:bg-gray-600"
                      }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.appearance.darkMode
                        ? (language === 'ar' ? "left-1" : "right-1")
                        : (language === 'ar' ? "left-7" : "right-7")
                        }`}
                    />
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="pt-6 border-t dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t.colorPreview}
                </h3>
                <div className="flex gap-4">
                  <div
                    className="w-24 h-24 rounded-xl flex items-center justify-center text-white font-medium shadow-lg"
                    style={{
                      backgroundColor: settings.appearance.primaryColor,
                    }}
                  >
                    {t.primary}
                  </div>
                  <div
                    className="w-24 h-24 rounded-xl flex items-center justify-center text-white font-medium shadow-lg"
                    style={{ backgroundColor: settings.appearance.accentColor }}
                  >
                    {t.secondary}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
