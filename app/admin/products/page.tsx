"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/stores";
import {
  Search,
  Package,
  Eye,
  Edit,
  Trash2,
  Plus,
  Image as ImageIcon,
  Tag,
  Store,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  originalPrice?: number;
  category: string;
  seller: string;
  stock: number;
  status: "active" | "pending" | "rejected";
  image: string;
  createdAt: string;
}

// Mock products data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    nameAr: "سماعات لاسلكية",
    price: 299,
    originalPrice: 399,
    category: "إلكترونيات",
    seller: "TechStore",
    stock: 45,
    status: "active",
    image: "/api/placeholder/100/100",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Smart Watch",
    nameAr: "ساعة ذكية",
    price: 599,
    category: "إلكترونيات",
    seller: "GadgetWorld",
    stock: 23,
    status: "active",
    image: "/api/placeholder/100/100",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    name: "Running Shoes",
    nameAr: "حذاء رياضي",
    price: 450,
    originalPrice: 550,
    category: "رياضة",
    seller: "SportZone",
    stock: 0,
    status: "active",
    image: "/api/placeholder/100/100",
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    name: "Leather Wallet",
    nameAr: "محفظة جلدية",
    price: 199,
    category: "إكسسوارات",
    seller: "FashionHub",
    stock: 67,
    status: "pending",
    image: "/api/placeholder/100/100",
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    name: "Coffee Maker",
    nameAr: "آلة صنع القهوة",
    price: 899,
    originalPrice: 1099,
    category: "منزل",
    seller: "HomeAppliances",
    stock: 12,
    status: "active",
    image: "/api/placeholder/100/100",
    createdAt: "2024-01-11",
  },
];

type FilterStatus = "all" | "active" | "pending" | "rejected";

const translations = {
  ar: {
    productManagement: "إدارة المنتجات",
    totalProducts: "إجمالي {count} منتج",
    addProduct: "إضافة منتج",
    searchPlaceholder: "بحث بالاسم أو البائع...",
    all: "الكل",
    active: "نشط",
    pending: "قيد المراجعة",
    rejected: "مرفوض",
    totalProductsStat: "إجمالي المنتجات",
    activeProducts: "منتجات نشطة",
    underReview: "قيد المراجعة",
    outOfStock: "نفذ من المخزون",
    product: "المنتج",
    price: "السعر",
    category: "التصنيف",
    seller: "البائع",
    stock: "المخزون",
    status: "الحالة",
    actions: "إجراءات",
    noProducts: "لا يوجد منتجات",
    outOfStockLabel: "نفذ",
    currency: "ر.س",
  },
  en: {
    productManagement: "Product Management",
    totalProducts: "Total {count} products",
    addProduct: "Add Product",
    searchPlaceholder: "Search by name or seller...",
    all: "All",
    active: "Active",
    pending: "Pending",
    rejected: "Rejected",
    totalProductsStat: "Total Products",
    activeProducts: "Active Products",
    underReview: "Under Review",
    outOfStock: "Out of Stock",
    product: "Product",
    price: "Price",
    category: "Category",
    seller: "Seller",
    stock: "Stock",
    status: "Status",
    actions: "Actions",
    noProducts: "No products found",
    outOfStockLabel: "Out",
    currency: "SAR",
  },
};

export default function AdminProductsPage() {
  const [mounted, setMounted] = useState(false);
  const [products] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const { language } = useLanguageStore();
  const t = translations[language];

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameAr.includes(searchQuery) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || product.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            {t.active}
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-xs font-medium">
            {t.pending}
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-medium">
            <XCircle className="w-3 h-3" />
            {t.rejected}
          </span>
        );
    }
  };

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === "active").length,
    pending: products.filter((p) => p.status === "pending").length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  };

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
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.productManagement}</h1>
          <p className="text-gray-500 dark:text-gray-400">{t.totalProducts.replace("{count}", products.length.toString())}</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          {t.addProduct}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.totalProductsStat}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.active}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.activeProducts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Package className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {stats.pending}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.underReview}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {stats.outOfStock}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.outOfStock}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`} />
            <Input
              placeholder={t.searchPlaceholder}
              className={language === 'ar' ? 'pr-10' : 'pl-10'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["all", "active", "pending", "rejected"] as FilterStatus[]).map(
              (status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                >
                  {status === "all"
                    ? t.all
                    : status === "active"
                      ? t.active
                      : status === "pending"
                        ? t.pending
                        : t.rejected}
                </Button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
              <tr>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.product}
                </th>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.price}
                </th>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.category}
                </th>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.seller}
                </th>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.stock}
                </th>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.status}
                </th>
                <th className="text-center py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500 dark:text-gray-400">
                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    {t.noProducts}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {language === 'ar' ? product.nameAr : product.name}
                          </p>
                          <p className="text-xs text-gray-400">{language === 'ar' ? product.name : product.nameAr}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {product.price} {t.currency}
                        </p>
                        {product.originalPrice && (
                          <p className="text-xs text-gray-400 line-through">
                            {product.originalPrice} {t.currency}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                        <Tag className="w-4 h-4 text-gray-400" />
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                        <Store className="w-4 h-4 text-gray-400" />
                        {product.seller}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`font-medium ${product.stock === 0
                          ? "text-red-600 dark:text-red-400"
                          : product.stock < 10
                            ? "text-orange-600 dark:text-orange-400"
                            : "text-gray-800 dark:text-white"
                          }`}
                      >
                        {product.stock === 0 ? t.outOfStockLabel : product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
}
