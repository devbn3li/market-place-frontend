"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguageStore, useAuthStore, Address } from "@/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Star,
  Phone,
  User,
  Building,
  Globe,
  X,
  Check,
  Home,
  Briefcase,
  ArrowLeft,
} from "lucide-react";

interface AddressFormData {
  label: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

const initialFormData: AddressFormData = {
  label: "Home",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
  isDefault: false,
};

export default function AddressesPage() {
  const { language } = useLanguageStore();
  const { user, isAuthenticated, isLoading, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAuthStore();
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AddressFormData>(initialFormData);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.address || !formData.city || !formData.country) {
      toast.error(language === "ar" ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields");
      return;
    }

    if (editingId) {
      updateAddress(editingId, formData);
      toast.success(language === "ar" ? "تم تحديث العنوان" : "Address updated");
    } else {
      addAddress(formData);
      toast.success(language === "ar" ? "تم إضافة العنوان" : "Address added");
    }

    setShowForm(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const handleEdit = (address: Address) => {
    setFormData({
      label: address.label,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      country: address.country,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
    });
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteAddress(id);
    toast.success(language === "ar" ? "تم حذف العنوان" : "Address deleted");
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddress(id);
    toast.success(language === "ar" ? "تم تعيين العنوان الافتراضي" : "Default address set");
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) return null;

  const addresses = user.addresses || [];
  const labelOptions = [
    { value: "Home", labelEn: "Home", labelAr: "المنزل", icon: Home },
    { value: "Work", labelEn: "Work", labelAr: "العمل", icon: Briefcase },
    { value: "Other", labelEn: "Other", labelAr: "آخر", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-muted/30" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-500 text-white py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {language === "ar" ? "العودة للحساب" : "Back to Account"}
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl">
              <MapPin className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {language === "ar" ? "عناويني" : "My Addresses"}
              </h1>
              <p className="text-white/80">
                {language === "ar" ? "إدارة عناوين التوصيل" : "Manage your delivery addresses"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Add Address Button */}
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="mb-6 bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            {language === "ar" ? "إضافة عنوان جديد" : "Add New Address"}
          </Button>
        )}

        {/* Address Form */}
        {showForm && (
          <div className="bg-card rounded-2xl border p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editingId
                  ? (language === "ar" ? "تعديل العنوان" : "Edit Address")
                  : (language === "ar" ? "إضافة عنوان جديد" : "Add New Address")
                }
              </h2>
              <Button variant="ghost" size="icon" onClick={cancelForm}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Label Selection */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">
                  {language === "ar" ? "نوع العنوان" : "Address Type"}
                </label>
                <div className="flex gap-3">
                  {labelOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, label: option.value })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${formData.label === option.value
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-background hover:bg-muted border-border"
                        }`}
                    >
                      <option.icon className="h-4 w-4" />
                      {language === "ar" ? option.labelAr : option.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {language === "ar" ? "الاسم الأول *" : "First Name *"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
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
                      value={formData.lastName}
                      onChange={handleChange}
                      className="pl-10 rtl:pr-10 rtl:pl-3"
                      placeholder={language === "ar" ? "أحمد" : "Doe"}
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
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 rtl:pr-10 rtl:pl-3"
                      placeholder="+20 123 456 7890"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {language === "ar" ? "الرمز البريدي" : "Postal Code"}
                  </label>
                  <Input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="12345"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">
                    {language === "ar" ? "العنوان التفصيلي *" : "Street Address *"}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="pl-10 rtl:pr-10 rtl:pl-3"
                      placeholder={language === "ar" ? "123 شارع التحرير، الدور الخامس" : "123 Main Street, Apt 5"}
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
                      value={formData.city}
                      onChange={handleChange}
                      className="pl-10 rtl:pr-10 rtl:pl-3"
                      placeholder={language === "ar" ? "القاهرة" : "Cairo"}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {language === "ar" ? "الدولة *" : "Country *"}
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="pl-10 rtl:pr-10 rtl:pl-3"
                      placeholder={language === "ar" ? "مصر" : "Egypt"}
                    />
                  </div>
                </div>
              </div>

              {/* Default Address Toggle */}
              <div className="mt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm">
                    {language === "ar" ? "تعيين كعنوان افتراضي" : "Set as default address"}
                  </span>
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 mt-6">
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  <Check className="h-4 w-4 mr-2" />
                  {editingId
                    ? (language === "ar" ? "حفظ التغييرات" : "Save Changes")
                    : (language === "ar" ? "إضافة العنوان" : "Add Address")
                  }
                </Button>
                <Button type="button" variant="outline" onClick={cancelForm}>
                  {language === "ar" ? "إلغاء" : "Cancel"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Addresses List */}
        {addresses.length === 0 ? (
          <div className="bg-card rounded-2xl border p-12 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {language === "ar" ? "لا توجد عناوين محفوظة" : "No saved addresses"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {language === "ar"
                ? "أضف عنوانك الأول لتسهيل عملية الشراء"
                : "Add your first address to make checkout easier"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => {
              const labelOption = labelOptions.find(l => l.value === address.label) || labelOptions[2];
              const LabelIcon = labelOption.icon;

              return (
                <div
                  key={address.id}
                  className={`bg-card rounded-xl border p-5 relative ${address.isDefault ? "ring-2 ring-orange-500" : ""
                    }`}
                >
                  {/* Default Badge */}
                  {address.isDefault && (
                    <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-xs font-medium rounded-full">
                        <Star className="h-3 w-3 fill-current" />
                        {language === "ar" ? "افتراضي" : "Default"}
                      </span>
                    </div>
                  )}

                  {/* Label */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <LabelIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="font-semibold">
                      {language === "ar" ? labelOption.labelAr : labelOption.labelEn}
                    </span>
                  </div>

                  {/* Address Details */}
                  <div className="space-y-1 text-sm mb-4">
                    <p className="font-medium">{address.firstName} {address.lastName}</p>
                    <p className="text-muted-foreground">{address.address}</p>
                    <p className="text-muted-foreground">{address.city}, {address.country} {address.postalCode}</p>
                    <p className="text-muted-foreground">{address.phone}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(address)}
                      className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      {language === "ar" ? "تعديل" : "Edit"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(address.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      {language === "ar" ? "حذف" : "Delete"}
                    </Button>
                    {!address.isDefault && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetDefault(address.id)}
                        className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-500/10 ml-auto rtl:mr-auto rtl:ml-0"
                      >
                        <Star className="h-4 w-4 mr-1" />
                        {language === "ar" ? "تعيين افتراضي" : "Set Default"}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
