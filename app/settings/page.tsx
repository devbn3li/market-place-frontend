"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useLanguageStore, useAuthStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Settings,
  User,
  Globe,
  Moon,
  Sun,
  Bell,
  Mail,
  MapPin,
  CreditCard,
  Package,
  ChevronRight,
  Store,
  Clock,
  CheckCircle,
  XCircle,
  Camera,
  X,
  ZoomIn,
  ZoomOut,
  Move,
} from "lucide-react";
import { useToastAlert } from "@/hooks/use-toast-alert";
import Link from "next/link";

const t = {
  settings: { en: "Settings", ar: "الإعدادات" },
  accountSettings: { en: "Account Settings", ar: "إعدادات الحساب" },
  personalInfo: { en: "Personal Information", ar: "المعلومات الشخصية" },
  profilePhoto: { en: "Profile Photo", ar: "صورة الملف الشخصي" },
  changePhoto: { en: "Change Photo", ar: "تغيير الصورة" },
  cropImage: { en: "Crop Image", ar: "قص الصورة" },
  dragToMove: { en: "Drag to move, scroll to zoom", ar: "اسحب للتحريك، مرر للتكبير" },
  apply: { en: "Apply", ar: "تطبيق" },
  cancel: { en: "Cancel", ar: "إلغاء" },
  uploadPhoto: { en: "Upload a photo", ar: "ارفع صورة" },
  photoUpdated: { en: "Profile photo updated", ar: "تم تحديث صورة الملف الشخصي" },
  fullName: { en: "Full Name", ar: "الاسم الكامل" },
  email: { en: "Email Address", ar: "البريد الإلكتروني" },
  phone: { en: "Phone Number", ar: "رقم الهاتف" },
  saveChanges: { en: "Save Changes", ar: "حفظ التغييرات" },
  preferences: { en: "Preferences", ar: "التفضيلات" },
  language: { en: "Language", ar: "اللغة" },
  english: { en: "English", ar: "الإنجليزية" },
  arabic: { en: "Arabic", ar: "العربية" },
  theme: { en: "Theme", ar: "المظهر" },
  light: { en: "Light", ar: "فاتح" },
  dark: { en: "Dark", ar: "داكن" },
  system: { en: "System", ar: "النظام" },
  notifications: { en: "Notification Settings", ar: "إعدادات الإشعارات" },
  emailNotifications: { en: "Email Notifications", ar: "إشعارات البريد الإلكتروني" },
  orderUpdates: { en: "Order Updates", ar: "تحديثات الطلبات" },
  promotions: { en: "Promotions & Offers", ar: "العروض والترويجات" },
  newsletter: { en: "Newsletter", ar: "النشرة الإخبارية" },
  pushNotifications: { en: "Push Notifications", ar: "الإشعارات الفورية" },
  quickLinks: { en: "Quick Links", ar: "روابط سريعة" },
  addresses: { en: "Addresses", ar: "العناوين" },
  paymentMethods: { en: "Payment Methods", ar: "طرق الدفع" },
  orderHistory: { en: "Order History", ar: "سجل الطلبات" },
  security: { en: "Security", ar: "الأمان" },
  manageAddresses: { en: "Manage your shipping addresses", ar: "إدارة عناوين الشحن" },
  managePayments: { en: "Manage payment methods", ar: "إدارة طرق الدفع" },
  viewOrders: { en: "View your order history", ar: "عرض سجل طلباتك" },
  manageSecurity: { en: "Password & security settings", ar: "إعدادات كلمة المرور والأمان" },
  privacySettings: { en: "Privacy Settings", ar: "إعدادات الخصوصية" },
  dataSharing: { en: "Data Sharing", ar: "مشاركة البيانات" },
  activityTracking: { en: "Activity Tracking", ar: "تتبع النشاط" },
  personalizedAds: { en: "Personalized Ads", ar: "الإعلانات المخصصة" },
  allowDataSharing: { en: "Allow data sharing with partners", ar: "السماح بمشاركة البيانات مع الشركاء" },
  allowTracking: { en: "Allow activity tracking", ar: "السماح بتتبع النشاط" },
  allowAds: { en: "Show personalized ads", ar: "عرض إعلانات مخصصة" },
  becomeSeller: { en: "Become a Seller", ar: "كن بائعاً" },
  becomeSellerDesc: { en: "Start selling your products on Amanoon", ar: "ابدأ ببيع منتجاتك على أمانون" },
  applyNow: { en: "Apply Now", ar: "قدم الآن" },
  sellerBenefits: { en: "Reach millions of customers and grow your business", ar: "وصل لملايين العملاء ونمِّ عملك" },
  applicationPending: { en: "Application Pending", ar: "الطلب قيد المراجعة" },
  applicationPendingDesc: { en: "Your seller application is being reviewed", ar: "طلبك للبيع قيد المراجعة" },
  applicationApproved: { en: "Seller Account Active", ar: "حساب البائع نشط" },
  goToSellerCenter: { en: "Go to Seller Center", ar: "اذهب إلى مركز البائعين" },
  applicationRejected: { en: "Application Rejected", ar: "تم رفض الطلب" },
  reapply: { en: "Reapply", ar: "أعد التقديم" },
};

const quickLinks = [
  {
    icon: MapPin,
    titleEn: "Addresses",
    titleAr: "العناوين",
    descEn: "Manage your shipping addresses",
    descAr: "إدارة عناوين الشحن",
    href: "/addresses",
    color: "blue",
  },
  {
    icon: CreditCard,
    titleEn: "Payment Methods",
    titleAr: "طرق الدفع",
    descEn: "Manage payment methods",
    descAr: "إدارة طرق الدفع",
    href: "/payment-methods",
    color: "green",
  },
  {
    icon: Package,
    titleEn: "Order History",
    titleAr: "سجل الطلبات",
    descEn: "View your order history",
    descAr: "عرض سجل طلباتك",
    href: "/orders",
    color: "purple",
  },
  {
    icon: Settings,
    titleEn: "Security",
    titleAr: "الأمان",
    descEn: "Password & security settings",
    descAr: "إعدادات كلمة المرور والأمان",
    href: "/security",
    color: "orange",
  },
];

export default function SettingsPage() {
  const { language, setLanguage } = useLanguageStore();
  const { user } = useAuthStore();
  const toastAlert = useToastAlert();

  const [fullName, setFullName] = useState(
    user ? `${user.firstName} ${user.lastName}` : "Ahmed Mohamed"
  );
  const [email, setEmail] = useState(user?.email || "ahmed@example.com");
  const [phone, setPhone] = useState("+20 1234567890");
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark" | "system">("system");

  // Notification preferences
  const [emailNotifs, setEmailNotifs] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
  });
  const [pushNotifs, setPushNotifs] = useState(true);

  // Privacy preferences
  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    activityTracking: true,
    personalizedAds: true,
  });

  // Profile photo states
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load saved profile photo from localStorage
  useEffect(() => {
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, []);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgSrc = event.target?.result as string;
        // Load image to get dimensions
        const img = new Image();
        img.onload = () => {
          setImageDimensions({ width: img.width, height: img.height });
          setTempImage(imgSrc);
          setCropPosition({ x: 0, y: 0 });
          setZoom(1);
          setShowCropper(true);
        };
        img.src = imgSrc;
      };
      reader.readAsDataURL(file);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - cropPosition.x, y: e.clientY - cropPosition.y });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Calculate limits based on image aspect ratio
    // Allow more movement for tall/wide images
    const containerSize = 300; // Approximate container size
    const aspectRatio = imageDimensions.width / imageDimensions.height || 1;
    
    let limitX, limitY;
    if (aspectRatio > 1) {
      // Wide image - allow more horizontal movement
      limitX = (containerSize * (aspectRatio - 1) / 2 + 50) * zoom;
      limitY = 50 * zoom;
    } else {
      // Tall image - allow more vertical movement
      limitX = 50 * zoom;
      limitY = (containerSize * (1/aspectRatio - 1) / 2 + 50) * zoom;
    }
    
    setCropPosition({
      x: Math.max(-limitX, Math.min(limitX, newX)),
      y: Math.max(-limitY, Math.min(limitY, newY)),
    });
  }, [isDragging, dragStart, zoom, imageDimensions]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(1, Math.min(3, prev + delta)));
  };

  const handleCropApply = () => {
    if (!tempImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const size = 200; // Output size
      canvas.width = size;
      canvas.height = size;

      // Calculate crop area
      const cropSize = Math.min(img.width, img.height) / zoom;
      const centerX = img.width / 2 - (cropPosition.x / zoom) * (img.width / 200);
      const centerY = img.height / 2 - (cropPosition.y / zoom) * (img.height / 200);
      const sx = centerX - cropSize / 2;
      const sy = centerY - cropSize / 2;

      ctx.drawImage(img, sx, sy, cropSize, cropSize, 0, 0, size, size);

      const croppedImage = canvas.toDataURL('image/jpeg', 0.9);
      setProfilePhoto(croppedImage);
      localStorage.setItem('profilePhoto', croppedImage);
      setShowCropper(false);
      setTempImage(null);
      toastAlert.success(t.photoUpdated[language]);
    };
    img.src = tempImage;
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setTempImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    toastAlert.success(
      language === "ar" ? "تم حفظ التغييرات بنجاح" : "Changes saved successfully"
    );
  };

  const handleLanguageChange = (newLang: "en" | "ar") => {
    setLanguage(newLang);
    toastAlert.success(
      newLang === "ar" ? "تم تغيير اللغة إلى العربية" : "Language changed to English"
    );
  };

  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    setSelectedTheme(theme);
    toastAlert.success(
      language === "ar" ? "تم تغيير المظهر" : "Theme changed"
    );
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <Settings className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t.settings[language]}</h1>
              <p className="text-muted-foreground">{user?.email || "user@example.com"}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-card rounded-xl border p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-bold">{t.personalInfo[language]}</h2>
              </div>

              <form onSubmit={handleSavePersonalInfo} className="space-y-4">
                {/* Profile Photo */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    {t.profilePhoto[language]}
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center overflow-hidden border-2 border-orange-200 dark:border-orange-800">
                        {profilePhoto ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={profilePhoto}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-orange-500">
                            {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                            {user?.lastName?.charAt(0).toUpperCase() || ''}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <Camera className="h-6 w-6 text-white" />
                      </button>
                    </div>
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        {t.changePhoto[language]}
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, PNG - {language === "ar" ? "الحد الأقصى 5MB" : "Max 5MB"}
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.fullName[language]}
                  </label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.fullName[language]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.email[language]}
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.email[language]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.phone[language]}
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.phone[language]}
                  />
                </div>

                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                  {t.saveChanges[language]}
                </Button>
              </form>
            </div>

            {/* Preferences */}
            <div className="bg-card rounded-xl border p-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-bold">{t.preferences[language]}</h2>
              </div>

              <div className="space-y-6">
                {/* Language */}
                <div>
                  <label className="block text-sm font-medium mb-3">{t.language[language]}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleLanguageChange("en")}
                      className={`p-3 rounded-lg border-2 transition-all ${language === "en"
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                        : "border-muted hover:border-orange-200"
                        }`}
                    >
                      <p className="font-medium">{t.english[language]}</p>
                    </button>
                    <button
                      onClick={() => handleLanguageChange("ar")}
                      className={`p-3 rounded-lg border-2 transition-all ${language === "ar"
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                        : "border-muted hover:border-orange-200"
                        }`}
                    >
                      <p className="font-medium">{t.arabic[language]}</p>
                    </button>
                  </div>
                </div>

                {/* Theme */}
                <div>
                  <label className="block text-sm font-medium mb-3">{t.theme[language]}</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleThemeChange("light")}
                      className={`p-3 rounded-lg border-2 transition-all ${selectedTheme === "light"
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                        : "border-muted hover:border-orange-200"
                        }`}
                    >
                      <Sun className="h-5 w-5 mx-auto mb-1" />
                      <p className="text-sm font-medium">{t.light[language]}</p>
                    </button>
                    <button
                      onClick={() => handleThemeChange("dark")}
                      className={`p-3 rounded-lg border-2 transition-all ${selectedTheme === "dark"
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                        : "border-muted hover:border-orange-200"
                        }`}
                    >
                      <Moon className="h-5 w-5 mx-auto mb-1" />
                      <p className="text-sm font-medium">{t.dark[language]}</p>
                    </button>
                    <button
                      onClick={() => handleThemeChange("system")}
                      className={`p-3 rounded-lg border-2 transition-all ${selectedTheme === "system"
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                        : "border-muted hover:border-orange-200"
                        }`}
                    >
                      <Settings className="h-5 w-5 mx-auto mb-1" />
                      <p className="text-sm font-medium">{t.system[language]}</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-card rounded-xl border p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-bold">{t.notifications[language]}</h2>
              </div>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">{t.emailNotifications[language]}</h3>
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted">
                      <span className="text-sm">{t.orderUpdates[language]}</span>
                      <input
                        type="checkbox"
                        checked={emailNotifs.orderUpdates}
                        onChange={(e) =>
                          setEmailNotifs({ ...emailNotifs, orderUpdates: e.target.checked })
                        }
                        className="w-4 h-4 accent-orange-500 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted">
                      <span className="text-sm">{t.promotions[language]}</span>
                      <input
                        type="checkbox"
                        checked={emailNotifs.promotions}
                        onChange={(e) =>
                          setEmailNotifs({ ...emailNotifs, promotions: e.target.checked })
                        }
                        className="w-4 h-4 accent-orange-500 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted">
                      <span className="text-sm">{t.newsletter[language]}</span>
                      <input
                        type="checkbox"
                        checked={emailNotifs.newsletter}
                        onChange={(e) =>
                          setEmailNotifs({ ...emailNotifs, newsletter: e.target.checked })
                        }
                        className="w-4 h-4 accent-orange-500 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                {/* Push Notifications */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">{t.pushNotifications[language]}</h3>
                  </div>
                  <label className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted">
                    <span className="text-sm">{t.pushNotifications[language]}</span>
                    <input
                      type="checkbox"
                      checked={pushNotifs}
                      onChange={(e) => setPushNotifs(e.target.checked)}
                      className="w-4 h-4 accent-orange-500 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-card rounded-xl border p-6">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-bold">{t.privacySettings[language]}</h2>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted">
                  <div>
                    <p className="text-sm font-medium">{t.dataSharing[language]}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t.allowDataSharing[language]}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacy.dataSharing}
                    onChange={(e) =>
                      setPrivacy({ ...privacy, dataSharing: e.target.checked })
                    }
                    className="w-4 h-4 accent-orange-500 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted">
                  <div>
                    <p className="text-sm font-medium">{t.activityTracking[language]}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t.allowTracking[language]}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacy.activityTracking}
                    onChange={(e) =>
                      setPrivacy({ ...privacy, activityTracking: e.target.checked })
                    }
                    className="w-4 h-4 accent-orange-500 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted">
                  <div>
                    <p className="text-sm font-medium">{t.personalizedAds[language]}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t.allowAds[language]}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacy.personalizedAds}
                    onChange={(e) =>
                      setPrivacy({ ...privacy, personalizedAds: e.target.checked })
                    }
                    className="w-4 h-4 accent-orange-500 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar - Quick Links */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border p-6">
              <h3 className="font-bold mb-4">{t.quickLinks[language]}</h3>
              <div className="space-y-2">
                {quickLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={index}
                      href={link.href}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${link.color === "blue"
                            ? "bg-blue-100 dark:bg-blue-900/20"
                            : link.color === "green"
                              ? "bg-green-100 dark:bg-green-900/20"
                              : link.color === "purple"
                                ? "bg-purple-100 dark:bg-purple-900/20"
                                : "bg-orange-100 dark:bg-orange-900/20"
                            }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${link.color === "blue"
                              ? "text-blue-500"
                              : link.color === "green"
                                ? "text-green-500"
                                : link.color === "purple"
                                  ? "text-purple-500"
                                  : "text-orange-500"
                              }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {language === "ar" ? link.titleAr : link.titleEn}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {language === "ar" ? link.descAr : link.descEn}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Become a Seller Section */}
            {user?.accountType !== "seller" && (
              <div className="bg-linear-to-br from-orange-500 to-yellow-500 rounded-xl p-6 text-white">
                {!user?.sellerInfo || user.sellerInfo.status === "none" ? (
                  <>
                    <Store className="h-10 w-10 mb-4" />
                    <h3 className="font-bold text-lg mb-2">{t.becomeSeller[language]}</h3>
                    <p className="text-sm text-white/90 mb-4">
                      {t.sellerBenefits[language]}
                    </p>
                    <Link href="/become-seller">
                      <Button className="w-full bg-white text-orange-500 hover:bg-white/90">
                        {t.applyNow[language]}
                        <ChevronRight className={`h-4 w-4 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />
                      </Button>
                    </Link>
                  </>
                ) : user.sellerInfo.status === "pending" ? (
                  <div className="text-center">
                    <Clock className="h-10 w-10 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">{t.applicationPending[language]}</h3>
                    <p className="text-sm text-white/90">
                      {t.applicationPendingDesc[language]}
                    </p>
                  </div>
                ) : user.sellerInfo.status === "rejected" ? (
                  <>
                    <XCircle className="h-10 w-10 mb-4" />
                    <h3 className="font-bold text-lg mb-2">{t.applicationRejected[language]}</h3>
                    <Link href="/become-seller">
                      <Button className="w-full bg-white text-orange-500 hover:bg-white/90 mt-4">
                        {t.reapply[language]}
                      </Button>
                    </Link>
                  </>
                ) : null}
              </div>
            )}

            {user?.accountType === "seller" && (
              <div className="bg-linear-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white">
                <CheckCircle className="h-10 w-10 mb-4" />
                <h3 className="font-bold text-lg mb-2">{t.applicationApproved[language]}</h3>
                <Link href="/seller-center">
                  <Button className="w-full bg-white text-green-600 hover:bg-white/90 mt-4">
                    {t.goToSellerCenter[language]}
                    <ChevronRight className={`h-4 w-4 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Cropper Modal */}
      {showCropper && tempImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-lg">{t.cropImage[language]}</h3>
              <button
                onClick={handleCropCancel}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Crop Area */}
            <div
              ref={containerRef}
              className="relative bg-black aspect-square overflow-hidden cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                setIsDragging(true);
                setDragStart({ x: touch.clientX - cropPosition.x, y: touch.clientY - cropPosition.y });
              }}
              onTouchMove={(e) => {
                if (!isDragging) return;
                const touch = e.touches[0];
                const newX = touch.clientX - dragStart.x;
                const newY = touch.clientY - dragStart.y;
                
                const containerSize = 300;
                const aspectRatio = imageDimensions.width / imageDimensions.height || 1;
                
                let limitX, limitY;
                if (aspectRatio > 1) {
                  limitX = (containerSize * (aspectRatio - 1) / 2 + 50) * zoom;
                  limitY = 50 * zoom;
                } else {
                  limitX = 50 * zoom;
                  limitY = (containerSize * (1/aspectRatio - 1) / 2 + 50) * zoom;
                }
                
                setCropPosition({
                  x: Math.max(-limitX, Math.min(limitX, newX)),
                  y: Math.max(-limitY, Math.min(limitY, newY)),
                });
              }}
              onTouchEnd={() => setIsDragging(false)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imageRef}
                src={tempImage}
                alt="Crop preview"
                className="absolute top-1/2 left-1/2 max-w-none pointer-events-none select-none"
                style={{
                  transform: `translate(-50%, -50%) translate(${cropPosition.x}px, ${cropPosition.y}px) scale(${zoom})`,
                  width: imageDimensions.width > imageDimensions.height ? 'auto' : '100%',
                  height: imageDimensions.width > imageDimensions.height ? '100%' : 'auto',
                  minWidth: '100%',
                  minHeight: '100%',
                  objectFit: 'contain',
                }}
                draggable={false}
              />

              {/* Crop overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 border-4 border-white/30 rounded-full m-4" />
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <mask id="cropMask">
                      <rect width="100%" height="100%" fill="white" />
                      <circle cx="50%" cy="50%" r="calc(50% - 16px)" fill="black" />
                    </mask>
                  </defs>
                  <rect width="100%" height="100%" fill="rgba(0,0,0,0.5)" mask="url(#cropMask)" />
                </svg>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="p-4 border-t space-y-3">
              <div className="flex items-center gap-3">
                <ZoomOut className="h-4 w-4 text-muted-foreground" />
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="flex-1 accent-orange-500"
                />
                <ZoomIn className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                <Move className="h-3 w-3" />
                {t.dragToMove[language]}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 p-4 border-t">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleCropCancel}
              >
                {t.cancel[language]}
              </Button>
              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                onClick={handleCropApply}
              >
                {t.apply[language]}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden canvas for cropping */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
