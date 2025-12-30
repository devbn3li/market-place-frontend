"use client";

import { useEffect, useState } from "react";
import { useAuthStore, User, AccountType, useLanguageStore } from "@/stores";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  Trash2,
  Eye,
  Download,
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

type FilterType = "all" | "buyer" | "seller" | "admin";

const translations = {
  ar: {
    userManagement: "إدارة المستخدمين",
    totalUsers: "إجمالي {count} مستخدم في المنصة",
    exportData: "تصدير البيانات",
    searchPlaceholder: "بحث بالاسم أو البريد الإلكتروني...",
    all: "الكل",
    buyer: "مشتري",
    seller: "بائع",
    admin: "مسؤول",
    user: "المستخدم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    accountType: "نوع الحساب",
    registrationDate: "تاريخ التسجيل",
    actions: "إجراءات",
    noUsers: "لا يوجد مستخدمين",
    userDetails: "تفاصيل المستخدم",
    phoneNumber: "رقم الهاتف",
    notSpecified: "غير محدد",
    changeAccountType: "تغيير نوع الحساب",
    deleteUser: "حذف المستخدم",
    confirmDelete: "هل أنت متأكد من حذف هذا المستخدم؟",
    userDeleted: "تم حذف المستخدم بنجاح",
    accountTypeUpdated: "تم تحديث نوع الحساب بنجاح",
  },
  en: {
    userManagement: "User Management",
    totalUsers: "Total {count} users on the platform",
    exportData: "Export Data",
    searchPlaceholder: "Search by name or email...",
    all: "All",
    buyer: "Buyer",
    seller: "Seller",
    admin: "Admin",
    user: "User",
    email: "Email",
    phone: "Phone",
    accountType: "Account Type",
    registrationDate: "Registration Date",
    actions: "Actions",
    noUsers: "No users found",
    userDetails: "User Details",
    phoneNumber: "Phone Number",
    notSpecified: "Not specified",
    changeAccountType: "Change Account Type",
    deleteUser: "Delete User",
    confirmDelete: "Are you sure you want to delete this user?",
    userDeleted: "User deleted successfully",
    accountTypeUpdated: "Account type updated successfully",
  },
};

export default function AdminUsersPage() {
  const { getAllUsers, deleteUser, updateUserAccountType } = useAuthStore();
  const { language } = useLanguageStore();
  const t = translations[language];
  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    setMounted(true);
    useAuthStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (mounted) {
      loadUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const loadUsers = () => {
    const allUsers = getAllUsers();
    setUsers(allUsers);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterType === "all" || user.accountType === filterType;

    return matchesSearch && matchesFilter;
  });

  const handleDeleteUser = (userId: string) => {
    if (confirm(t.confirmDelete)) {
      const result = deleteUser(userId);
      if (result.success) {
        toast.success(t.userDeleted);
        loadUsers();
      } else {
        toast.error(result.message);
      }
    }
  };

  const handleChangeAccountType = (userId: string, newType: AccountType) => {
    const result = updateUserAccountType(userId, newType);
    if (result.success) {
      toast.success(t.accountTypeUpdated);
      loadUsers();
    } else {
      toast.error(result.message);
    }
  };

  const getAccountTypeBadge = (type: AccountType) => {
    switch (type) {
      case "admin":
        return (
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-medium">
            {t.admin}
          </span>
        );
      case "seller":
        return (
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
            {t.seller}
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
            {t.buyer}
          </span>
        );
    }
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
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.userManagement}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t.totalUsers.replace("{count}", users.length.toString())}
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          {t.exportData}
        </Button>
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
            {(["all", "buyer", "seller", "admin"] as FilterType[]).map(
              (type) => (
                <Button
                  key={type}
                  variant={filterType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(type)}
                >
                  {type === "all"
                    ? t.all
                    : type === "buyer"
                      ? t.buyer
                      : type === "seller"
                        ? t.seller
                        : t.admin}
                </Button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
              <tr>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.user}
                </th>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.email}
                </th>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.phone}
                </th>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.accountType}
                </th>
                <th className={`${language === 'ar' ? 'text-right' : 'text-left'} py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                  {t.registrationDate}
                </th>
                <th className="text-center py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-300">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500 dark:text-gray-400">
                    {t.noUsers}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.firstName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-gray-400">#{user.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {user.phone || "-"}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {getAccountTypeBadge(user.accountType || "buyer")}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(user.createdAt).toLocaleDateString(language === 'ar' ? "ar-SA" : "en-US")}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent side={language === 'ar' ? "left" : "right"}>
                            <SheetHeader>
                              <SheetTitle>{t.userDetails}</SheetTitle>
                            </SheetHeader>
                            {selectedUser && (
                              <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                                    {selectedUser.firstName.charAt(0)}
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold dark:text-white">
                                      {selectedUser.firstName}{" "}
                                      {selectedUser.lastName}
                                    </h3>
                                    {getAccountTypeBadge(
                                      selectedUser.accountType || "buyer"
                                    )}
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <div>
                                      <p className="text-xs text-gray-400">
                                        {t.email}
                                      </p>
                                      <p className="text-gray-800 dark:text-white">
                                        {selectedUser.email}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    <div>
                                      <p className="text-xs text-gray-400">
                                        {t.phoneNumber}
                                      </p>
                                      <p className="text-gray-800 dark:text-white">
                                        {selectedUser.phone || t.notSpecified}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    <div>
                                      <p className="text-xs text-gray-400">
                                        {t.registrationDate}
                                      </p>
                                      <p className="text-gray-800 dark:text-white">
                                        {new Date(
                                          selectedUser.createdAt
                                        ).toLocaleDateString(language === 'ar' ? "ar-SA" : "en-US")}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-4 border-t dark:border-gray-700">
                                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    {t.changeAccountType}
                                  </p>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant={
                                        selectedUser.accountType === "buyer"
                                          ? "default"
                                          : "outline"
                                      }
                                      onClick={() =>
                                        handleChangeAccountType(
                                          selectedUser.id,
                                          "buyer"
                                        )
                                      }
                                    >
                                      {t.buyer}
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant={
                                        selectedUser.accountType === "seller"
                                          ? "default"
                                          : "outline"
                                      }
                                      onClick={() =>
                                        handleChangeAccountType(
                                          selectedUser.id,
                                          "seller"
                                        )
                                      }
                                    >
                                      {t.seller}
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant={
                                        selectedUser.accountType === "admin"
                                          ? "default"
                                          : "outline"
                                      }
                                      onClick={() =>
                                        handleChangeAccountType(
                                          selectedUser.id,
                                          "admin"
                                        )
                                      }
                                    >
                                      {t.admin}
                                    </Button>
                                  </div>
                                </div>

                                <Button
                                  variant="destructive"
                                  className="w-full gap-2"
                                  onClick={() => {
                                    handleDeleteUser(selectedUser.id);
                                    setSelectedUser(null);
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                  {t.deleteUser}
                                </Button>
                              </div>
                            )}
                          </SheetContent>
                        </Sheet>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                          onClick={() => handleDeleteUser(user.id)}
                        >
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
    </div>
  );
}
