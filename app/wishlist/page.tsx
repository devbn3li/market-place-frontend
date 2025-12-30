"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguageStore, useWishlistStore, useCartStore } from "@/stores";
import { Button } from "@/components/ui/button";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Star,
} from "lucide-react";
import { toast } from "sonner";

export default function WishlistPage() {
  const { language } = useLanguageStore();
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      originalPrice: item.originalPrice,
      category: item.category,
    });
    toast.success(
      language === "ar"
        ? `تمت إضافة ${item.name.ar} إلى السلة`
        : `${item.name.en} added to cart`
    );
  };

  const handleRemove = (id: number, name: { en: string; ar: string }) => {
    removeFromWishlist(id);
    toast.success(
      language === "ar"
        ? `تم إزالة ${name.ar} من قائمة الرغبات`
        : `${name.en} removed from wishlist`
    );
  };

  return (
    <div
      className="min-h-screen bg-muted/30"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="bg-linear-to-r from-pink-500 via-red-500 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === "ar" ? "العودة للتسوق" : "Continue Shopping"}
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Heart className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {language === "ar" ? "قائمة الرغبات" : "My Wishlist"}
              </h1>
              <p className="text-white/90">
                {language === "ar"
                  ? `لديك ${items.length} ${items.length === 1 ? "منتج" : "منتجات"} في قائمة الرغبات`
                  : `You have ${items.length} item${items.length !== 1 ? "s" : ""} in your wishlist`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {items.length > 0 ? (
          <>
            {/* Actions Bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {language === "ar"
                  ? `${items.length} منتج في قائمة الرغبات`
                  : `${items.length} items in wishlist`}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  clearWishlist();
                  toast.success(
                    language === "ar"
                      ? "تم مسح قائمة الرغبات"
                      : "Wishlist cleared"
                  );
                }}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {language === "ar" ? "مسح الكل" : "Clear All"}
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group bg-card rounded-xl border overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Link href={`/product/${item.id}`}>
                      <Image
                        src={item.image}
                        alt={item.name[language]}
                        fill
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.id, item.name)}
                      className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-red-500 hover:text-white rounded-full transition-colors shadow-md"
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500 group-hover:fill-current group-hover:text-current" />
                    </button>
                    {/* Discount Badge */}
                    {item.originalPrice && item.originalPrice > item.price && (
                      <div
                        className={`absolute top-2 ${language === "ar" ? "right-12" : "left-2"} bg-red-500 text-white text-xs font-bold px-2 py-1 rounded`}
                      >
                        -
                        {Math.round(
                          ((item.originalPrice - item.price) /
                            item.originalPrice) *
                          100
                        )}
                        %
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    {item.category && (
                      <span className="text-xs text-muted-foreground">
                        {item.category[language]}
                      </span>
                    )}
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-medium text-sm line-clamp-2 mt-1 mb-2 hover:text-orange-500 transition-colors">
                        {item.name[language]}
                      </h3>
                    </Link>
                    {item.rating && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        {item.reviews && (
                          <span className="text-xs text-muted-foreground">
                            ({item.reviews.toLocaleString()})
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-orange-500">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {language === "ar" ? "أضف للسلة" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="bg-card rounded-2xl border p-12 text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h2 className="text-xl font-bold mb-2">
              {language === "ar"
                ? "قائمة الرغبات فارغة"
                : "Your Wishlist is Empty"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {language === "ar"
                ? "ابدأ بإضافة المنتجات التي تعجبك بالضغط على أيقونة القلب"
                : "Start adding products you love by clicking the heart icon"}
            </p>
            <Link href="/categories">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <ShoppingBag className="h-4 w-4 mr-2" />
                {language === "ar" ? "تصفح المنتجات" : "Browse Products"}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
