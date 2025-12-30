"use client";

import { useState } from "react";
import { useLanguageStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  Plus,
  Trash2,
  Check,
  Wallet,
  Building2,
  Star,
} from "lucide-react";
import { useToastAlert } from "@/hooks/use-toast-alert";
import Link from "next/link";

const t = {
  paymentMethods: { en: "Payment Methods", ar: "طرق الدفع" },
  managePayments: { en: "Manage your payment methods", ar: "إدارة طرق الدفع الخاصة بك" },
  addNewCard: { en: "Add New Card", ar: "إضافة بطاقة جديدة" },
  savedCards: { en: "Saved Cards", ar: "البطاقات المحفوظة" },
  noCards: { en: "No payment methods saved", ar: "لا توجد طرق دفع محفوظة" },
  addCardDesc: { en: "Add a card to make checkout faster", ar: "أضف بطاقة لتسريع عملية الدفع" },
  cardNumber: { en: "Card Number", ar: "رقم البطاقة" },
  cardHolder: { en: "Cardholder Name", ar: "اسم حامل البطاقة" },
  expiryDate: { en: "Expiry Date", ar: "تاريخ الانتهاء" },
  cvv: { en: "CVV", ar: "رمز الأمان" },
  saveCard: { en: "Save Card", ar: "حفظ البطاقة" },
  cancel: { en: "Cancel", ar: "إلغاء" },
  setAsDefault: { en: "Set as Default", ar: "تعيين كافتراضي" },
  default: { en: "Default", ar: "افتراضي" },
  delete: { en: "Delete", ar: "حذف" },
  expires: { en: "Expires", ar: "ينتهي في" },
  otherMethods: { en: "Other Payment Methods", ar: "طرق دفع أخرى" },
  cashOnDelivery: { en: "Cash on Delivery", ar: "الدفع عند الاستلام" },
  cashOnDeliveryDesc: { en: "Pay when you receive your order", ar: "ادفع عند استلام طلبك" },
  bankTransfer: { en: "Bank Transfer", ar: "التحويل البنكي" },
  bankTransferDesc: { en: "Transfer directly to our bank account", ar: "حوّل مباشرة إلى حسابنا البنكي" },
  wallet: { en: "Digital Wallet", ar: "المحفظة الرقمية" },
  walletDesc: { en: "Pay using your digital wallet balance", ar: "ادفع باستخدام رصيد محفظتك الرقمية" },
  available: { en: "Available", ar: "متاح" },
  cardAdded: { en: "Card added successfully", ar: "تمت إضافة البطاقة بنجاح" },
  cardDeleted: { en: "Card deleted", ar: "تم حذف البطاقة" },
  cardSetDefault: { en: "Card set as default", ar: "تم تعيين البطاقة كافتراضية" },
  visa: { en: "Visa", ar: "فيزا" },
  mastercard: { en: "Mastercard", ar: "ماستركارد" },
  backToSettings: { en: "Back to Settings", ar: "العودة للإعدادات" },
};

interface PaymentCard {
  id: string;
  type: "visa" | "mastercard";
  lastFour: string;
  holderName: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

const initialCards: PaymentCard[] = [
  {
    id: "1",
    type: "visa",
    lastFour: "4242",
    holderName: "Ahmed Mohamed",
    expiryMonth: "12",
    expiryYear: "26",
    isDefault: true,
  },
  {
    id: "2",
    type: "mastercard",
    lastFour: "8888",
    holderName: "Ahmed Mohamed",
    expiryMonth: "06",
    expiryYear: "25",
    isDefault: false,
  },
];

export default function PaymentMethodsPage() {
  const { language } = useLanguageStore();
  const toastAlert = useToastAlert();

  const [cards, setCards] = useState<PaymentCard[]>(initialCards);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    holderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();

    const cardNum = newCard.cardNumber.replace(/\s/g, "");
    const type = cardNum.startsWith("4") ? "visa" : "mastercard";

    const card: PaymentCard = {
      id: Date.now().toString(),
      type,
      lastFour: cardNum.slice(-4),
      holderName: newCard.holderName,
      expiryMonth: newCard.expiryMonth,
      expiryYear: newCard.expiryYear,
      isDefault: cards.length === 0,
    };

    setCards([...cards, card]);
    setNewCard({ cardNumber: "", holderName: "", expiryMonth: "", expiryYear: "", cvv: "" });
    setShowAddForm(false);
    toastAlert.success(t.cardAdded[language]);
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
    toastAlert.success(t.cardDeleted[language]);
  };

  const handleSetDefault = (id: string) => {
    setCards(
      cards.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
    toastAlert.success(t.cardSetDefault[language]);
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/settings"
            className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block"
          >
            ← {t.backToSettings[language]}
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t.paymentMethods[language]}</h1>
              <p className="text-muted-foreground">{t.managePayments[language]}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Saved Cards */}
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{t.savedCards[language]}</h2>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t.addNewCard[language]}
              </Button>
            </div>

            {cards.length === 0 ? (
              <div className="text-center py-12">
                <CreditCard className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium">{t.noCards[language]}</p>
                <p className="text-muted-foreground text-sm mt-1">
                  {t.addCardDesc[language]}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className={`relative p-4 rounded-xl border-2 transition-all ${card.isDefault
                        ? "border-orange-500 bg-orange-50/50 dark:bg-orange-900/10"
                        : "border-muted hover:border-orange-200"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Card Icon */}
                        <div
                          className={`w-14 h-10 rounded-md flex items-center justify-center ${card.type === "visa"
                              ? "bg-blue-600"
                              : "bg-linear-to-r from-red-500 to-yellow-500"
                            }`}
                        >
                          <span className="text-white text-xs font-bold">
                            {card.type === "visa" ? "VISA" : "MC"}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold">
                              •••• •••• •••• {card.lastFour}
                            </p>
                            {card.isDefault && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-medium flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {t.default[language]}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {card.holderName} • {t.expires[language]} {card.expiryMonth}/{card.expiryYear}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!card.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetDefault(card.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            {t.setAsDefault[language]}
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteCard(card.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Card Form */}
            {showAddForm && (
              <div className="mt-6 p-6 rounded-xl border-2 border-dashed border-orange-200 bg-orange-50/30 dark:bg-orange-900/10">
                <h3 className="font-bold mb-4">{t.addNewCard[language]}</h3>
                <form onSubmit={handleAddCard} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        {t.cardNumber[language]}
                      </label>
                      <Input
                        value={newCard.cardNumber}
                        onChange={(e) =>
                          setNewCard({
                            ...newCard,
                            cardNumber: formatCardNumber(e.target.value),
                          })
                        }
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        {t.cardHolder[language]}
                      </label>
                      <Input
                        value={newCard.holderName}
                        onChange={(e) =>
                          setNewCard({ ...newCard, holderName: e.target.value })
                        }
                        placeholder={language === "ar" ? "الاسم على البطاقة" : "Name on card"}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.expiryDate[language]}
                      </label>
                      <div className="flex gap-2">
                        <Input
                          value={newCard.expiryMonth}
                          onChange={(e) =>
                            setNewCard({
                              ...newCard,
                              expiryMonth: e.target.value.slice(0, 2),
                            })
                          }
                          placeholder="MM"
                          maxLength={2}
                          className="w-20"
                          required
                        />
                        <span className="flex items-center text-muted-foreground">/</span>
                        <Input
                          value={newCard.expiryYear}
                          onChange={(e) =>
                            setNewCard({
                              ...newCard,
                              expiryYear: e.target.value.slice(0, 2),
                            })
                          }
                          placeholder="YY"
                          maxLength={2}
                          className="w-20"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.cvv[language]}
                      </label>
                      <Input
                        type="password"
                        value={newCard.cvv}
                        onChange={(e) =>
                          setNewCard({ ...newCard, cvv: e.target.value.slice(0, 4) })
                        }
                        placeholder="•••"
                        maxLength={4}
                        className="w-24"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                      {t.saveCard[language]}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                    >
                      {t.cancel[language]}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Other Payment Methods */}
          <div className="bg-card rounded-xl border p-6">
            <h2 className="text-xl font-bold mb-6">{t.otherMethods[language]}</h2>

            <div className="space-y-4">
              {/* Cash on Delivery */}
              <div className="flex items-center justify-between p-4 rounded-xl border hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-bold">{t.cashOnDelivery[language]}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.cashOnDeliveryDesc[language]}
                    </p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium">
                  {t.available[language]}
                </span>
              </div>

              {/* Bank Transfer */}
              <div className="flex items-center justify-between p-4 rounded-xl border hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-bold">{t.bankTransfer[language]}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.bankTransferDesc[language]}
                    </p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium">
                  {t.available[language]}
                </span>
              </div>

              {/* Digital Wallet */}
              <div className="flex items-center justify-between p-4 rounded-xl border hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-bold">{t.wallet[language]}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.walletDesc[language]}
                    </p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium">
                  {t.available[language]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
