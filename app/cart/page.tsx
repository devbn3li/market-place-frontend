"use client";

import Link from "next/link";
import { useLanguageStore, useCartStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Tag,
  Truck,
  Shield,
  ChevronRight,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CartPage() {
  const { language } = useLanguageStore();
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, appliedCoupon, applyCoupon, removeCoupon } = useCartStore();
  const [promoCode, setPromoCode] = useState("");

  const shipping = totalPrice > 50 ? 0 : 9.99;
  const discount = appliedCoupon ? totalPrice * (appliedCoupon.discount / 100) : 0;
  const finalTotal = totalPrice + shipping - discount;

  const handleApplyPromo = () => {
    if (applyCoupon(promoCode)) {
      toast.success(language === "ar" ? "تم تطبيق الكوبون بنجاح" : "Coupon applied successfully");
      setPromoCode("");
    } else {
      toast.error(language === "ar" ? "كود الخصم غير صالح" : "Invalid promo code");
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast.success(language === "ar" ? "تم إزالة الكوبون" : "Coupon removed");
  };

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen bg-muted/30 flex items-center justify-center"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="text-center px-4">
          <ShoppingCart className="h-24 w-24 mx-auto mb-6 text-muted-foreground/50" />
          <h1 className="text-2xl font-bold mb-2">
            {language === "ar" ? "سلة التسوق فارغة" : "Your Cart is Empty"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {language === "ar"
              ? "لم تقم بإضافة أي منتجات بعد"
              : "You haven't added any products yet"}
          </p>
          <Link href="/categories">
            <Button className="bg-orange-500 hover:bg-orange-600">
              <ShoppingBag className="h-4 w-4 mr-2" />
              {language === "ar" ? "تصفح المنتجات" : "Browse Products"}
            </Button>
          </Link>
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
      <div className="bg-linear-to-r from-orange-500 to-amber-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-8 w-8" />
            <h1 className="text-3xl font-bold">
              {language === "ar" ? "سلة التسوق" : "Shopping Cart"}
            </h1>
          </div>
          <p className="mt-2 opacity-90">
            {language === "ar"
              ? `لديك ${items.length} منتج في السلة`
              : `You have ${items.length} item${items.length > 1 ? "s" : ""} in your cart`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                {language === "ar" ? "مسح السلة" : "Clear Cart"}
              </Button>
            </div>

            {/* Items List */}
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-xl border p-4 flex gap-4"
              >
                {/* Product Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name[language]}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/product/${item.id}`}
                      className="font-semibold hover:text-orange-500 transition-colors"
                    >
                      {item.name[language]}
                    </Link>
                    {item.category && (
                      <p className="text-sm text-muted-foreground">
                        {item.category[language]}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-orange-500">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-muted-foreground">
                          ${item.price.toFixed(2)} {language === "ar" ? "للقطعة" : "each"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-muted-foreground hover:text-red-500 transition-colors self-start"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 mt-4"
            >
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              {language === "ar" ? "متابعة التسوق" : "Continue Shopping"}
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border p-6 sticky top-4">
              <h2 className="text-lg font-bold mb-4">
                {language === "ar" ? "ملخص الطلب" : "Order Summary"}
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-2 block">
                  {language === "ar" ? "كود الخصم" : "Promo Code"}
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-700 dark:text-green-400 uppercase">{appliedCoupon.code}</span>
                      <span className="text-green-600 text-sm">(-{appliedCoupon.discount}%)</span>
                    </div>
                    <button onClick={handleRemoveCoupon} className="text-red-500 hover:text-red-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder={language === "ar" ? "أدخل الكود" : "Enter code"}
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyPromo}
                      disabled={!promoCode}
                    >
                      {language === "ar" ? "تطبيق" : "Apply"}
                    </Button>
                  </div>
                )}
                {!appliedCoupon && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === "ar"
                      ? 'جرب: AMANOON10, AMANOON20, SAVE15'
                      : 'Try: AMANOON10, AMANOON20, SAVE15'}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
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
                {appliedCoupon && (
                  <div className="flex justify-between text-green-500">
                    <span className="flex items-center gap-1">
                      {language === "ar" ? "الخصم" : "Discount"}
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded uppercase">{appliedCoupon.code}</span>
                    </span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>{language === "ar" ? "الإجمالي" : "Total"}</span>
                  <span className="text-orange-500">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 py-6">
                  {language === "ar" ? "إتمام الشراء" : "Proceed to Checkout"}
                  <ChevronRight className="h-4 w-4 mr-2 rtl:rotate-180" />
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Truck className="h-4 w-4 text-green-500" />
                  {language === "ar"
                    ? "شحن مجاني للطلبات فوق $50"
                    : "Free shipping on orders over $50"}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4 text-blue-500" />
                  {language === "ar"
                    ? "دفع آمن 100%"
                    : "100% Secure Payment"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
