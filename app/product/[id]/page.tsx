"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguageStore, useCartStore, useWishlistStore } from "@/stores";
import { Button } from "@/components/ui/button";
import {
  Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Minus,
  Plus, Share2, ChevronRight, Check, Package, Clock, CreditCard,
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { getProductById, getRelatedProducts, toProduct, toProducts } from "@/lib/products";

export default function ProductPage() {
  const params = useParams();
  const { language } = useLanguageStore();
  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const productId = Number(params.id);
  // Use getProductById from JSON data
  const productBasic = getProductById(productId);
  const product = productBasic ? toProduct(productBasic) : null;

  if (!product) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-muted-foreground mb-6">
            {language === "ar" ? "المنتج غير موجود" : "Product not found"}
          </p>
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600">
              {language === "ar" ? "العودة للرئيسية" : "Back to Home"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
      });
    }
    toast.success(
      language === "ar" ? "تمت الإضافة للسلة" : "Added to cart",
      {
        description: `${quantity}x ${product.name[language]}`,
      }
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/cart";
  };

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Generate additional images for gallery
  const productImages = [
    product.image,
    product.image.replace("w=400", "w=401"),
    product.image.replace("w=400", "w=402"),
    product.image.replace("w=400", "w=403"),
  ];

  // Related products from JSON data
  const relatedProductsBasic = product ? getRelatedProducts(product.id, 4) : [];
  const relatedProducts = toProducts(relatedProductsBasic);

  return (
    <div
      className="min-h-screen bg-muted/30"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Breadcrumb */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-orange-500">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/categories" className="hover:text-orange-500">
              {product.category[language]}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground truncate max-w-[200px]">
              {product.name[language]}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative flex gap-4">
              {/* Main Image with Zoom */}
              <div
                ref={imageRef}
                className="relative bg-card rounded-xl border overflow-hidden aspect-square flex-1 cursor-crosshair"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={productImages[selectedImage]}
                  alt={product.name[language]}
                  className="w-full h-full object-cover pointer-events-none"
                />
                {discount > 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
                    -{discount}%
                  </span>
                )}
                {product.badge && (
                  <span className="absolute top-4 right-4 bg-orange-500 text-white text-sm font-medium px-3 py-1 rounded-full z-10">
                    {product.badge[language]}
                  </span>
                )}
                <button
                  onClick={() => {
                    toggleWishlist({
                      id: product.id,
                      name: product.name,
                      image: product.image,
                      price: product.price,
                      originalPrice: product.originalPrice,
                      category: product.category,
                      rating: product.rating,
                      reviews: product.reviews,
                    });
                    const inWishlist = isInWishlist(product.id);
                    toast.success(
                      inWishlist
                        ? language === "ar"
                          ? "تم إزالة المنتج من قائمة الرغبات"
                          : "Removed from wishlist"
                        : language === "ar"
                          ? "تمت إضافة المنتج لقائمة الرغبات"
                          : "Added to wishlist"
                    );
                  }}
                  className={`absolute bottom-4 right-4 p-3 rounded-full hover:scale-110 transition-transform z-10 ${isInWishlist(product.id)
                    ? "bg-red-500 text-white"
                    : "bg-white/90 dark:bg-gray-800/90"
                    }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-current" : ""}`}
                  />
                </button>
                {/* Zoom Lens Indicator */}
                {isZooming && (
                  <div
                    className="absolute w-32 h-32 border-2 border-orange-500 rounded-full pointer-events-none bg-white/20 flex items-center justify-center"
                    style={{
                      left: `${zoomPosition.x}%`,
                      top: `${zoomPosition.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                  </div>
                )}
              </div>

              {/* Zoomed Image Panel */}
              {isZooming && (
                <div className="hidden lg:block absolute left-full ml-4 w-[750px] h-[700px] bg-card rounded-xl border overflow-hidden shadow-2xl z-50">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${productImages[selectedImage].replace("w=400", "w=1200")})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: "300%",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </div>
              )}
            </div>
            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${selectedImage === index
                    ? "border-orange-500"
                    : "border-transparent hover:border-gray-300"
                    }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${product.name[language]} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {product.category[language]}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                {product.name[language]}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews.toLocaleString()}{" "}
                  {language === "ar" ? "تقييم" : "reviews"})
                </span>
                {product.soldCount && (
                  <span className="text-muted-foreground">
                    • {product.soldCount.toLocaleString()}{" "}
                    {language === "ar" ? "تم بيعه" : "sold"}
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-bold text-orange-500">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-green-600 font-medium">
                      {language === "ar" ? `وفر ${discount}%` : `Save ${discount}%`}
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {language === "ar"
                  ? "شامل ضريبة القيمة المضافة"
                  : "Inclusive of VAT"}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-medium">
                    {language === "ar" ? "متوفر في المخزون" : "In Stock"}
                  </span>
                  {product.stockCount && (
                    <span className="text-muted-foreground">
                      ({product.stockCount} {language === "ar" ? "قطعة" : "units"})
                    </span>
                  )}
                </>
              ) : (
                <span className="text-red-500 font-medium">
                  {language === "ar" ? "غير متوفر" : "Out of Stock"}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium">
                {language === "ar" ? "الكمية:" : "Quantity:"}
              </span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount || 100, quantity + 1))}
                  className="p-3 hover:bg-muted transition-colors"
                  disabled={quantity >= (product.stockCount || 100)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-orange-500 hover:bg-orange-600 h-14 text-lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {language === "ar" ? "أضف للسلة" : "Add to Cart"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 h-14 text-lg border-orange-500 text-orange-500 hover:bg-orange-50"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                {language === "ar" ? "اشتري الآن" : "Buy Now"}
              </Button>
              <Button size="lg" variant="outline" className="h-14">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Truck className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {language === "ar" ? "توصيل مجاني" : "Free Delivery"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === "ar" ? "للطلبات فوق $50" : "Orders over $50"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <RotateCcw className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {language === "ar" ? "إرجاع مجاني" : "Free Returns"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === "ar" ? "خلال 30 يوم" : "Within 30 days"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Shield className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {language === "ar" ? "ضمان سنتين" : "2 Year Warranty"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === "ar" ? "ضمان الجودة" : "Quality guarantee"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <CreditCard className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {language === "ar" ? "دفع آمن" : "Secure Payment"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === "ar" ? "100% محمي" : "100% protected"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-card rounded-xl border p-6 mb-12">
          <h2 className="text-xl font-bold mb-4">
            {language === "ar" ? "وصف المنتج" : "Product Description"}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {product.description?.[language] || (language === "ar"
              ? "منتج عالي الجودة مع مواصفات ممتازة. يأتي مع ضمان الشركة المصنعة وخدمة ما بعد البيع."
              : "High quality product with excellent specifications. Comes with manufacturer warranty and after-sales service.")}
          </p>

          {/* Additional Details */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-4">
              {language === "ar" ? "مميزات المنتج" : "Product Features"}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{language === "ar" ? "جودة عالية" : "High Quality"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{language === "ar" ? "ضمان الشركة المصنعة" : "Manufacturer Warranty"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{language === "ar" ? "شحن سريع" : "Fast Shipping"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{language === "ar" ? "دعم فني متاح" : "Technical Support Available"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-card rounded-xl border p-6 mb-12">
          <h2 className="text-xl font-bold mb-4">
            {language === "ar" ? "معلومات التوصيل" : "Delivery Information"}
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Package className="h-5 w-5 text-orange-500 mt-1" />
              <div>
                <p className="font-medium">
                  {language === "ar" ? "التوصيل القياسي" : "Standard Delivery"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "ar" ? "3-5 أيام عمل" : "3-5 business days"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="h-5 w-5 text-orange-500 mt-1" />
              <div>
                <p className="font-medium">
                  {language === "ar" ? "التوصيل السريع" : "Express Delivery"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "ar" ? "1-2 يوم عمل (رسوم إضافية)" : "1-2 business days (additional fee)"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {language === "ar" ? "منتجات مشابهة" : "Related Products"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="group bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-orange-500">
                      {relatedProduct.name[language]}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{relatedProduct.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-orange-500">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                      {relatedProduct.originalPrice > relatedProduct.price && (
                        <span className="text-xs text-muted-foreground line-through">
                          ${relatedProduct.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
