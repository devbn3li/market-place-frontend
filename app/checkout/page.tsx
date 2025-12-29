"use client";

import { useLanguageStore, useCartStore, useAuthStore, useOrdersStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  Lock,
  Truck,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  User,
  Building,
  CheckCircle,
  Shield,
  ArrowLeft,
  Plus,
  Star,
  Home,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { language } = useLanguageStore();
  const { items, totalPrice, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const { addOrder } = useOrdersStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>("");

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  // Load user data and select default address
  useEffect(() => {
    if (user) {
      // Pre-fill email from user
      setShippingInfo(prev => ({ ...prev, email: user.email }));

      // Select default address if exists
      const defaultAddress = user.addresses?.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
      } else if (user.addresses?.length > 0) {
        setSelectedAddressId(user.addresses[0].id);
      }
    }
  }, [user]);

  // Get selected address
  const selectedAddress = user?.addresses?.find(addr => addr.id === selectedAddressId);

  const shipping = totalPrice > 50 ? 0 : 9.99;
  const tax = totalPrice * 0.05;
  const finalTotal = totalPrice + shipping + tax;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const name = e.target.name;

    // Format card number with spaces
    if (name === "cardNumber") {
      value = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      if (value.length > 19) return;
    }

    // Format expiry date
    if (name === "expiryDate") {
      value = value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      if (value.length > 5) return;
    }

    // Limit CVV
    if (name === "cvv" && value.length > 4) return;

    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const validateShipping = () => {
    // If using saved address, it's already valid
    if (selectedAddressId && !useNewAddress && selectedAddress) {
      return true;
    }

    // Validate new address form
    const required = ["firstName", "lastName", "email", "phone", "address", "city", "country"];
    for (const field of required) {
      if (!shippingInfo[field as keyof typeof shippingInfo]) {
        toast.error(language === "ar" ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields");
        return false;
      }
    }
    return true;
  };

  const validatePayment = () => {
    if (!paymentInfo.cardNumber || paymentInfo.cardNumber.replace(/\s/g, "").length < 16) {
      toast.error(language === "ar" ? "رقم البطاقة غير صحيح" : "Invalid card number");
      return false;
    }
    if (!paymentInfo.cardName) {
      toast.error(language === "ar" ? "يرجى إدخال اسم حامل البطاقة" : "Please enter cardholder name");
      return false;
    }
    if (!paymentInfo.expiryDate || paymentInfo.expiryDate.length < 5) {
      toast.error(language === "ar" ? "تاريخ الانتهاء غير صحيح" : "Invalid expiry date");
      return false;
    }
    if (!paymentInfo.cvv || paymentInfo.cvv.length < 3) {
      toast.error(language === "ar" ? "رمز CVV غير صحيح" : "Invalid CVV");
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (step === 1 && validateShipping()) {
      setStep(2);
    } else if (step === 2 && validatePayment()) {
      processPayment();
    }
  };

  const processPayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Get shipping address (from saved address or form)
    const shippingAddr = selectedAddress && !useNewAddress
      ? {
        firstName: selectedAddress.firstName,
        lastName: selectedAddress.lastName,
        address: selectedAddress.address,
        city: selectedAddress.city,
        country: selectedAddress.country,
        postalCode: selectedAddress.postalCode,
        phone: selectedAddress.phone,
      }
      : {
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        country: shippingInfo.country,
        postalCode: shippingInfo.postalCode,
        phone: shippingInfo.phone,
      };

    // Create order
    const newOrderNumber = addOrder({
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress: shippingAddr,
      subtotal: totalPrice,
      shipping: shipping,
      tax: tax,
      total: finalTotal,
      userId: user?.id,
    });

    setOrderNumber(newOrderNumber);
    setIsProcessing(false);
    setStep(3);
    clearCart();
  };

  if (items.length === 0 && step !== 3) {
    router.push("/cart");
    return null;
  }

  // Confirmation Step
  if (step === 3) {
    return (
      <div
        className="min-h-screen bg-muted/30 flex items-center justify-center"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="bg-card rounded-2xl border p-8 max-w-md w-full mx-4 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {language === "ar" ? "تم الطلب بنجاح!" : "Order Confirmed!"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {language === "ar"
              ? "شكراً لتسوقك معنا. سيتم إرسال تفاصيل الطلب إلى بريدك الإلكتروني."
              : "Thank you for shopping with us. Order details will be sent to your email."}
          </p>
          <div className="bg-muted rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              {language === "ar" ? "رقم الطلب" : "Order Number"}
            </p>
            <p className="text-lg font-bold text-orange-500">
              #{orderNumber}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link href="/orders" className="w-full">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                {language === "ar" ? "عرض طلباتي" : "View My Orders"}
              </Button>
            </Link>
            <Link href="/categories" className="w-full">
              <Button variant="outline" className="w-full">
                {language === "ar" ? "متابعة التسوق" : "Continue Shopping"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-muted/30"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {language === "ar" ? "العودة للسلة" : "Back to Cart"}
          </Link>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-orange-500" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-orange-500 text-white" : "bg-muted"
                }`}>
                1
              </div>
              <span className="hidden sm:inline font-medium">
                {language === "ar" ? "الشحن" : "Shipping"}
              </span>
            </div>
            <div className={`w-16 h-0.5 ${step >= 2 ? "bg-orange-500" : "bg-muted"}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-orange-500" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-orange-500 text-white" : "bg-muted"
                }`}>
                2
              </div>
              <span className="hidden sm:inline font-medium">
                {language === "ar" ? "الدفع" : "Payment"}
              </span>
            </div>
            <div className={`w-16 h-0.5 ${step >= 3 ? "bg-orange-500" : "bg-muted"}`} />
            <div className={`flex items-center gap-2 ${step >= 3 ? "text-orange-500" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? "bg-orange-500 text-white" : "bg-muted"
                }`}>
                3
              </div>
              <span className="hidden sm:inline font-medium">
                {language === "ar" ? "التأكيد" : "Confirm"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {/* Shipping Form */}
            {step === 1 && (
              <div className="bg-card rounded-xl border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Truck className="h-5 w-5 text-orange-500" />
                  </div>
                  <h2 className="text-xl font-bold">
                    {language === "ar" ? "معلومات الشحن" : "Shipping Information"}
                  </h2>
                </div>

                {/* Saved Addresses Section */}
                {isAuthenticated && user?.addresses && user.addresses.length > 0 && !useNewAddress && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3">
                      {language === "ar" ? "اختر من عناوينك المحفوظة" : "Choose from your saved addresses"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      {user.addresses.map((addr) => {
                        const isSelected = selectedAddressId === addr.id;
                        return (
                          <button
                            key={addr.id}
                            type="button"
                            onClick={() => setSelectedAddressId(addr.id)}
                            className={`p-4 rounded-xl border-2 text-left rtl:text-right transition-all ${isSelected
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
                              : "border-border hover:border-orange-300"
                              }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {addr.label === "Home" ? (
                                <Home className="h-4 w-4 text-muted-foreground" />
                              ) : addr.label === "Work" ? (
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="font-medium text-sm">
                                {addr.label === "Home"
                                  ? (language === "ar" ? "المنزل" : "Home")
                                  : addr.label === "Work"
                                    ? (language === "ar" ? "العمل" : "Work")
                                    : (language === "ar" ? "آخر" : "Other")
                                }
                              </span>
                              {addr.isDefault && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-xs rounded-full ml-auto rtl:mr-auto rtl:ml-0">
                                  <Star className="h-3 w-3 fill-current" />
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-medium">{addr.firstName} {addr.lastName}</p>
                            <p className="text-xs text-muted-foreground truncate">{addr.address}</p>
                            <p className="text-xs text-muted-foreground">{addr.city}, {addr.country}</p>
                          </button>
                        );
                      })}
                    </div>

                    {/* Use New Address Button */}
                    <button
                      type="button"
                      onClick={() => setUseNewAddress(true)}
                      className="flex items-center gap-2 text-orange-500 hover:text-orange-600 text-sm font-medium"
                    >
                      <Plus className="h-4 w-4" />
                      {language === "ar" ? "استخدام عنوان جديد" : "Use a new address"}
                    </button>

                    {/* Selected Address Summary */}
                    {selectedAddress && (
                      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                        <h4 className="text-sm font-medium mb-2">
                          {language === "ar" ? "سيتم الشحن إلى:" : "Shipping to:"}
                        </h4>
                        <p className="text-sm">{selectedAddress.firstName} {selectedAddress.lastName}</p>
                        <p className="text-sm text-muted-foreground">{selectedAddress.address}</p>
                        <p className="text-sm text-muted-foreground">{selectedAddress.city}, {selectedAddress.country} {selectedAddress.postalCode}</p>
                        <p className="text-sm text-muted-foreground">{selectedAddress.phone}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Back to Saved Addresses Button */}
                {useNewAddress && isAuthenticated && user?.addresses && user.addresses.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setUseNewAddress(false)}
                    className="flex items-center gap-2 text-orange-500 hover:text-orange-600 text-sm font-medium mb-4"
                  >
                    <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                    {language === "ar" ? "العودة للعناوين المحفوظة" : "Back to saved addresses"}
                  </button>
                )}

                {/* New Address Form - Show if no saved addresses OR useNewAddress is true */}
                {(!isAuthenticated || !user?.addresses?.length || useNewAddress) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {language === "ar" ? "الاسم الأول *" : "First Name *"}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingChange}
                          className="pl-10 rtl:pr-10 rtl:pl-3"
                          placeholder={language === "ar" ? "محمد" : "John"}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {language === "ar" ? "اسم العائلة *" : "Last Name *"}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleShippingChange}
                          className="pl-10 rtl:pr-10 rtl:pl-3"
                          placeholder={language === "ar" ? "أحمد" : "Doe"}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {language === "ar" ? "البريد الإلكتروني *" : "Email *"}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          name="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={handleShippingChange}
                          className="pl-10 rtl:pr-10 rtl:pl-3"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {language === "ar" ? "رقم الهاتف *" : "Phone *"}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={handleShippingChange}
                          className="pl-10 rtl:pr-10 rtl:pl-3"
                          placeholder="+1 234 567 890"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium mb-2 block">
                        {language === "ar" ? "العنوان *" : "Address *"}
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleShippingChange}
                          className="pl-10 rtl:pr-10 rtl:pl-3"
                          placeholder={language === "ar" ? "شارع الملك فهد، رقم 123" : "123 Main Street"}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {language === "ar" ? "المدينة *" : "City *"}
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingChange}
                          className="pl-10 rtl:pr-10 rtl:pl-3"
                          placeholder={language === "ar" ? "الرياض" : "New York"}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {language === "ar" ? "البلد *" : "Country *"}
                      </label>
                      <Input
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingChange}
                        placeholder={language === "ar" ? "السعودية" : "United States"}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {language === "ar" ? "الرمز البريدي" : "Postal Code"}
                      </label>
                      <Input
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleShippingChange}
                        placeholder="12345"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Payment Form */}
            {step === 2 && (
              <div className="bg-card rounded-xl border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <CreditCard className="h-5 w-5 text-orange-500" />
                  </div>
                  <h2 className="text-xl font-bold">
                    {language === "ar" ? "معلومات الدفع" : "Payment Information"}
                  </h2>
                </div>

                {/* Card Preview */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 mb-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded" />
                    <span className="text-sm opacity-80">Credit Card</span>
                  </div>

                  <p className="text-xl tracking-widest mb-6 font-mono">
                    {paymentInfo.cardNumber || "•••• •••• •••• ••••"}
                  </p>

                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-xs opacity-60 mb-1">Card Holder</p>
                      <p className="uppercase">{paymentInfo.cardName || "YOUR NAME"}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-60 mb-1">Expires</p>
                      <p>{paymentInfo.expiryDate || "MM/YY"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {language === "ar" ? "رقم البطاقة *" : "Card Number *"}
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        className="pl-10 rtl:pr-10 rtl:pl-3 font-mono"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {language === "ar" ? "اسم حامل البطاقة *" : "Cardholder Name *"}
                    </label>
                    <Input
                      name="cardName"
                      value={paymentInfo.cardName}
                      onChange={handlePaymentChange}
                      placeholder={language === "ar" ? "الاسم كما يظهر على البطاقة" : "Name as shown on card"}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {language === "ar" ? "تاريخ الانتهاء *" : "Expiry Date *"}
                      </label>
                      <Input
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        className="font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        CVV *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          name="cvv"
                          type="password"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          className="pl-10 rtl:pr-10 rtl:pl-3 font-mono"
                          placeholder="•••"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Note */}
                <div className="flex items-center gap-2 mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm text-green-700 dark:text-green-400">
                  <Shield className="h-4 w-4" />
                  {language === "ar"
                    ? "معاملاتك محمية بتشفير SSL"
                    : "Your transaction is secured with SSL encryption"}
                </div>

                {/* Back Button */}
                <button
                  onClick={() => setStep(1)}
                  className="mt-4 text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                  {language === "ar" ? "العودة لمعلومات الشحن" : "Back to shipping"}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border p-6 sticky top-4">
              <h2 className="text-lg font-bold mb-4">
                {language === "ar" ? "ملخص الطلب" : "Order Summary"}
              </h2>

              {/* Items */}
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name[language]}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">
                        {item.name[language]}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {language === "ar" ? "الكمية:" : "Qty:"} {item.quantity}
                      </p>
                      <p className="text-sm font-bold text-orange-500">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {language === "ar" ? "المجموع الفرعي" : "Subtotal"}
                  </span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {language === "ar" ? "الشحن" : "Shipping"}
                  </span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-500">
                        {language === "ar" ? "مجاني" : "Free"}
                      </span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {language === "ar" ? "الضريبة (5%)" : "Tax (5%)"}
                  </span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>{language === "ar" ? "الإجمالي" : "Total"}</span>
                  <span className="text-orange-500">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Continue Button */}
              <Button
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 py-6"
                onClick={handleContinue}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {language === "ar" ? "جاري المعالجة..." : "Processing..."}
                  </span>
                ) : step === 1 ? (
                  <>
                    {language === "ar" ? "متابعة للدفع" : "Continue to Payment"}
                    <ChevronRight className="h-4 w-4 mr-2 rtl:rotate-180" />
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    {language === "ar" ? `ادفع $${finalTotal.toFixed(2)}` : `Pay $${finalTotal.toFixed(2)}`}
                  </>
                )}
              </Button>

              {/* Trust Badges */}
              <div className="mt-4 flex justify-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/512px-Stripe_Logo%2C_revised_2016.svg.png"
                  alt="Stripe"
                  className="h-6 opacity-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
