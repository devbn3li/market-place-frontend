"use client";

import { useEffect, useState } from "react";
import { useAuthStore, User, SellerInfo, useLanguageStore } from "@/stores";
import {
  Search,
  Store,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Mail,
  Calendar,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";

type FilterType = "all" | "pending" | "approved" | "rejected";

interface SellerWithUser extends User {
  sellerInfo: SellerInfo;
}

const translations = {
  ar: {
    sellerManagement: "إدارة البائعين",
    totalRequests: "إجمالي {count} طلب بائع",
    searchPlaceholder: "بحث بالاسم أو اسم المتجر...",
    all: "الكل",
    pending: "معلق",
    approved: "مقبول",
    rejected: "مرفوض",
    pendingRequests: "طلبات معلقة",
    activeSellers: "بائعين نشطين",
    rejectedRequests: "طلبات مرفوضة",
    statusApproved: "مقبول",
    statusRejected: "مرفوض",
    statusPending: "قيد المراجعة",
    individual: "فردي",
    company: "شركة",
    factory: "مصنع",
    appliedAt: "تقدم في",
    viewDetails: "عرض التفاصيل",
    sellerRequestDetails: "تفاصيل طلب البائع",
    ownerInfo: "معلومات المالك",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    notSpecified: "غير محدد",
    businessType: "نوع النشاط",
    storeDescription: "وصف المتجر",
    timeline: "التاريخ",
    submissionDate: "تاريخ التقديم",
    approvalDate: "تاريخ القبول",
    approveRequest: "قبول الطلب",
    rejectRequest: "رفض الطلب",
    noSellerRequests: "لا يوجد طلبات بائعين",
    requestApproved: "تم قبول طلب البائع بنجاح",
    requestRejected: "تم رفض طلب البائع",
    confirmReject: "هل أنت متأكد من رفض هذا الطلب؟",
  },
  en: {
    sellerManagement: "Seller Management",
    totalRequests: "Total {count} seller requests",
    searchPlaceholder: "Search by name or store name...",
    all: "All",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    pendingRequests: "Pending Requests",
    activeSellers: "Active Sellers",
    rejectedRequests: "Rejected Requests",
    statusApproved: "Approved",
    statusRejected: "Rejected",
    statusPending: "Under Review",
    individual: "Individual",
    company: "Company",
    factory: "Factory",
    appliedAt: "Applied on",
    viewDetails: "View Details",
    sellerRequestDetails: "Seller Request Details",
    ownerInfo: "Owner Information",
    name: "Name",
    email: "Email",
    phone: "Phone",
    notSpecified: "Not specified",
    businessType: "Business Type",
    storeDescription: "Store Description",
    timeline: "Timeline",
    submissionDate: "Submission Date",
    approvalDate: "Approval Date",
    approveRequest: "Approve Request",
    rejectRequest: "Reject Request",
    noSellerRequests: "No seller requests found",
    requestApproved: "Seller request approved successfully",
    requestRejected: "Seller request rejected",
    confirmReject: "Are you sure you want to reject this request?",
  },
};

export default function AdminSellersPage() {
  const { getAllUsers, approveSellerApplication, rejectSellerApplication } =
    useAuthStore();
  const { language } = useLanguageStore();
  const t = translations[language];
  const [mounted, setMounted] = useState(false);
  const [sellers, setSellers] = useState<SellerWithUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterType>("all");
  const [selectedSeller, setSelectedSeller] = useState<SellerWithUser | null>(
    null
  );

  useEffect(() => {
    setMounted(true);
    useAuthStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (mounted) {
      loadSellers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const loadSellers = () => {
    const allUsers = getAllUsers();
    const sellersWithInfo = allUsers.filter(
      (user): user is SellerWithUser =>
        user.sellerInfo !== undefined && user.sellerInfo !== null
    );
    setSellers(sellersWithInfo);
  };

  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch =
      seller.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.sellerInfo.storeName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      seller.sellerInfo.storeNameAr.includes(searchQuery);

    const matchesFilter =
      filterStatus === "all" || seller.sellerInfo.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleApprove = (userId: string) => {
    const result = approveSellerApplication(userId);
    if (result.success) {
      toast.success(t.requestApproved);
      loadSellers();
      setSelectedSeller(null);
    } else {
      toast.error(result.message);
    }
  };

  const handleReject = (userId: string) => {
    if (confirm(t.confirmReject)) {
      const result = rejectSellerApplication(userId);
      if (result.success) {
        toast.success(t.requestRejected);
        loadSellers();
        setSelectedSeller(null);
      } else {
        toast.error(result.message);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            {t.statusApproved}
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-medium">
            <XCircle className="w-3 h-3" />
            {t.statusRejected}
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" />
            {t.statusPending}
          </span>
        );
    }
  };

  const getBusinessTypeName = (type: string) => {
    switch (type) {
      case "individual":
        return t.individual;
      case "company":
        return t.company;
      case "factory":
        return t.factory;
      default:
        return type;
    }
  };

  const pendingCount = sellers.filter(
    (s) => s.sellerInfo.status === "pending"
  ).length;
  const approvedCount = sellers.filter(
    (s) => s.sellerInfo.status === "approved"
  ).length;
  const rejectedCount = sellers.filter(
    (s) => s.sellerInfo.status === "rejected"
  ).length;

  if (!mounted) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-gray-200 dark:bg-black/80 rounded-lg w-1/3"></div>
        <div className="h-96 bg-gray-200 dark:bg-black/80 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.sellerManagement}</h1>
          <p className="text-gray-500 dark:text-white/60">
            {t.totalRequests.replace("{count}", sellers.length.toString())}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-black rounded-xl p-4 shadow-sm border border-gray-100 dark:border-white/15">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{pendingCount}</p>
              <p className="text-sm text-gray-500 dark:text-white/60">{t.pendingRequests}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-black rounded-xl p-4 shadow-sm border border-gray-100 dark:border-white/15">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {approvedCount}
              </p>
              <p className="text-sm text-gray-500 dark:text-white/60">{t.activeSellers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-black rounded-xl p-4 shadow-sm border border-gray-100 dark:border-white/15">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {rejectedCount}
              </p>
              <p className="text-sm text-gray-500 dark:text-white/60">{t.rejectedRequests}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-black rounded-xl p-4 shadow-sm border border-gray-100 dark:border-white/15">
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
            {(
              ["all", "pending", "approved", "rejected"] as FilterType[]
            ).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
              >
                {status === "all"
                  ? t.all
                  : status === "pending"
                    ? t.pending
                    : status === "approved"
                      ? t.approved
                      : t.rejected}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSellers.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-white/60 bg-white dark:bg-black rounded-xl">
            <Store className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p>{t.noSellerRequests}</p>
          </div>
        ) : (
          filteredSellers.map((seller) => (
            <div
              key={seller.id}
              className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-100 dark:border-white/15 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {seller.sellerInfo.storeName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {seller.sellerInfo.storeNameAr}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-white/60">
                        {seller.sellerInfo.storeName}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(seller.sellerInfo.status)}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-white/80">
                    <Building className="w-4 h-4 text-gray-400" />
                    {getBusinessTypeName(seller.sellerInfo.businessType)}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-white/80">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {seller.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-white/80">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {t.appliedAt}{" "}
                    {new Date(
                      seller.sellerInfo.appliedAt || ""
                    ).toLocaleDateString(language === 'ar' ? "ar-SA" : "en-US")}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/15 flex gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={() => setSelectedSeller(seller)}
                      >
                        <Eye className="w-4 h-4" />
                        {t.viewDetails}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side={language === 'ar' ? "left" : "right"} className="w-full sm:max-w-lg">
                      <SheetHeader>
                        <SheetTitle>{t.sellerRequestDetails}</SheetTitle>
                      </SheetHeader>
                      {selectedSeller && (
                        <div className="mt-6 space-y-6 overflow-y-auto max-h-[calc(100vh-150px)]">
                          {/* Store Info */}
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                              {selectedSeller.sellerInfo.storeName.charAt(0)}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold dark:text-white">
                                {selectedSeller.sellerInfo.storeNameAr}
                              </h3>
                              <p className="text-gray-500 dark:text-white/60">
                                {selectedSeller.sellerInfo.storeName}
                              </p>
                              {getStatusBadge(selectedSeller.sellerInfo.status)}
                            </div>
                          </div>

                          {/* Owner Info */}
                          <div className="p-4 bg-gray-50 dark:bg-black/80 rounded-xl space-y-3">
                            <h4 className="font-medium text-gray-700 dark:text-gray-200">
                              {t.ownerInfo}
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs text-gray-400">{t.name}</p>
                                <p className="text-gray-800 dark:text-white">
                                  {selectedSeller.firstName}{" "}
                                  {selectedSeller.lastName}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">
                                  {t.email}
                                </p>
                                <p className="text-gray-800 dark:text-white">
                                  {selectedSeller.email}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">{t.phone}</p>
                                <p className="text-gray-800 dark:text-white">
                                  {selectedSeller.phone || t.notSpecified}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">
                                  {t.businessType}
                                </p>
                                <p className="text-gray-800 dark:text-white">
                                  {getBusinessTypeName(
                                    selectedSeller.sellerInfo.businessType
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Store Description */}
                          <div className="p-4 bg-gray-50 dark:bg-black/80 rounded-xl space-y-3">
                            <h4 className="font-medium text-gray-700 dark:text-gray-200">
                              {t.storeDescription}
                            </h4>
                            <p className="text-gray-600 dark:text-white/80 text-sm">
                              {selectedSeller.sellerInfo.storeDescriptionAr}
                            </p>
                            <p className="text-gray-500 dark:text-white/60 text-sm">
                              {selectedSeller.sellerInfo.storeDescription}
                            </p>
                          </div>

                          {/* Timeline */}
                          <div className="p-4 bg-gray-50 dark:bg-black/80 rounded-xl space-y-3">
                            <h4 className="font-medium text-gray-700 dark:text-gray-200">
                              {t.timeline}
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div>
                                  <p className="text-sm text-gray-800 dark:text-white">
                                    {t.submissionDate}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {new Date(
                                      selectedSeller.sellerInfo.appliedAt || ""
                                    ).toLocaleDateString(language === 'ar' ? "ar-SA" : "en-US")}
                                  </p>
                                </div>
                              </div>
                              {selectedSeller.sellerInfo.approvedAt && (
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <div>
                                    <p className="text-sm text-gray-800 dark:text-white">
                                      {t.approvalDate}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      {new Date(
                                        selectedSeller.sellerInfo.approvedAt
                                      ).toLocaleDateString(language === 'ar' ? "ar-SA" : "en-US")}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          {selectedSeller.sellerInfo.status === "pending" && (
                            <div className="flex gap-3 pt-4">
                              <Button
                                className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                                onClick={() =>
                                  handleApprove(selectedSeller.id)
                                }
                              >
                                <CheckCircle className="w-4 h-4" />
                                {t.approveRequest}
                              </Button>
                              <Button
                                variant="destructive"
                                className="flex-1 gap-2"
                                onClick={() => handleReject(selectedSeller.id)}
                              >
                                <XCircle className="w-4 h-4" />
                                {t.rejectRequest}
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </SheetContent>
                  </Sheet>

                  {seller.sellerInfo.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(seller.id)}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(seller.id)}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
