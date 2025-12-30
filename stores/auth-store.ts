import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Address {
  id: string;
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

export type AccountType = "buyer" | "seller" | "admin";
export type SellerStatus = "none" | "pending" | "approved" | "rejected";

export interface SellerInfo {
  storeName: string;
  storeNameAr: string;
  storeDescription: string;
  storeDescriptionAr: string;
  businessType: string;
  status: SellerStatus;
  appliedAt?: string;
  approvedAt?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  addresses: Address[];
  accountType: AccountType;
  sellerInfo?: SellerInfo;
}

interface StoredUser extends User {
  password: string;
}

interface AuthStore {
  user: User | null;
  users: StoredUser[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => { success: boolean; message: string };
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    accountType?: AccountType;
  }) => { success: boolean; message: string };
  logout: () => void;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  applyToBecomeSeller: (
    sellerData: Omit<SellerInfo, "status" | "appliedAt" | "approvedAt">
  ) => { success: boolean; message: string };
  updateUser: (userData: Partial<User>) => void;
  // Admin functions
  getAllUsers: () => User[];
  approveSellerApplication: (userId: string) => {
    success: boolean;
    message: string;
  };
  rejectSellerApplication: (userId: string) => {
    success: boolean;
    message: string;
  };
  deleteUser: (userId: string) => { success: boolean; message: string };
  updateUserAccountType: (
    userId: string,
    accountType: AccountType
  ) => { success: boolean; message: string };
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isAuthenticated: false,
      isLoading: false,

      register: (userData) => {
        const { users } = get();
        const existingUser = users.find(
          (u) => u.email.toLowerCase() === userData.email.toLowerCase()
        );

        if (existingUser) {
          return {
            success: false,
            message: "البريد الإلكتروني مسجل بالفعل | Email already registered",
          };
        }

        const newUser: StoredUser = {
          id: crypto.randomUUID(),
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email.toLowerCase(),
          phone: userData.phone,
          password: userData.password,
          createdAt: new Date().toISOString(),
          addresses: [],
          accountType: userData.accountType || "buyer",
        };

        const userWithoutPassword: User = {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
          createdAt: newUser.createdAt,
          addresses: newUser.addresses,
          accountType: newUser.accountType,
        };

        set({
          users: [...users, newUser],
          user: userWithoutPassword,
          isAuthenticated: true,
        });

        return {
          success: true,
          message: "تم إنشاء الحساب بنجاح | Account created successfully",
        };
      },

      login: (email, password) => {
        const { users } = get();
        const foundUser = users.find(
          (u) =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        );

        if (!foundUser) {
          return {
            success: false,
            message:
              "البريد الإلكتروني أو كلمة المرور غير صحيحة | Invalid email or password",
          };
        }

        const userWithoutPassword: User = {
          id: foundUser.id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          phone: foundUser.phone,
          createdAt: foundUser.createdAt,
          addresses: foundUser.addresses || [],
          accountType: foundUser.accountType || "buyer",
          sellerInfo: foundUser.sellerInfo,
        };

        set({
          user: userWithoutPassword,
          isAuthenticated: true,
        });

        return {
          success: true,
          message: "تم تسجيل الدخول بنجاح | Login successful",
        };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      addAddress: (addressData) => {
        const { user, users } = get();
        if (!user) return;

        const newAddress: Address = {
          ...addressData,
          id: crypto.randomUUID(),
        };

        const addresses = user.addresses || [];
        if (addresses.length === 0 || addressData.isDefault) {
          addresses.forEach((addr) => (addr.isDefault = false));
          newAddress.isDefault = true;
        }

        const updatedUser = {
          ...user,
          addresses: [...addresses, newAddress],
        };

        const updatedUsers = users.map((u) =>
          u.id === user.id ? { ...u, addresses: updatedUser.addresses } : u
        );

        set({ user: updatedUser, users: updatedUsers });
      },

      updateAddress: (id, addressData) => {
        const { user, users } = get();
        if (!user) return;

        const addresses = user.addresses.map((addr) => {
          if (addr.id === id) {
            return { ...addr, ...addressData };
          }
          if (addressData.isDefault && addr.id !== id) {
            return { ...addr, isDefault: false };
          }
          return addr;
        });

        const updatedUser = { ...user, addresses };
        const updatedUsers = users.map((u) =>
          u.id === user.id ? { ...u, addresses } : u
        );

        set({ user: updatedUser, users: updatedUsers });
      },

      deleteAddress: (id) => {
        const { user, users } = get();
        if (!user) return;

        const addresses = user.addresses.filter((addr) => addr.id !== id);

        if (addresses.length > 0 && !addresses.some((addr) => addr.isDefault)) {
          addresses[0].isDefault = true;
        }

        const updatedUser = { ...user, addresses };
        const updatedUsers = users.map((u) =>
          u.id === user.id ? { ...u, addresses } : u
        );

        set({ user: updatedUser, users: updatedUsers });
      },

      setDefaultAddress: (id) => {
        const { user, users } = get();
        if (!user) return;

        const addresses = user.addresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === id,
        }));

        const updatedUser = { ...user, addresses };
        const updatedUsers = users.map((u) =>
          u.id === user.id ? { ...u, addresses } : u
        );

        set({ user: updatedUser, users: updatedUsers });
      },

      applyToBecomeSeller: (sellerData) => {
        const { user, users } = get();
        if (!user) {
          return { success: false, message: "User not found" };
        }

        const sellerInfo: SellerInfo = {
          ...sellerData,
          status: "pending",
          appliedAt: new Date().toISOString(),
        };

        const updatedUser = { ...user, sellerInfo };
        const updatedUsers = users.map((u) =>
          u.id === user.id ? { ...u, sellerInfo } : u
        );

        set({ user: updatedUser, users: updatedUsers });

        return {
          success: true,
          message: "Application submitted successfully",
        };
      },

      updateUser: (userData) => {
        const { user, users } = get();
        if (!user) return;

        const updatedUser = { ...user, ...userData };
        const updatedUsers = users.map((u) =>
          u.id === user.id ? { ...u, ...userData } : u
        );

        set({ user: updatedUser, users: updatedUsers });
      },

      // Admin functions
      getAllUsers: () => {
        const { users } = get();
        return users.map((u) => ({
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          phone: u.phone,
          createdAt: u.createdAt,
          addresses: u.addresses || [],
          accountType: u.accountType || "buyer",
          sellerInfo: u.sellerInfo,
        }));
      },

      approveSellerApplication: (userId) => {
        const { users, user } = get();
        const targetUser = users.find((u) => u.id === userId);

        if (!targetUser) {
          return { success: false, message: "User not found" };
        }

        if (!targetUser.sellerInfo) {
          return { success: false, message: "No seller application found" };
        }

        const updatedSellerInfo: SellerInfo = {
          ...targetUser.sellerInfo,
          status: "approved",
          approvedAt: new Date().toISOString(),
        };

        const updatedUsers = users.map((u) =>
          u.id === userId
            ? {
                ...u,
                accountType: "seller" as AccountType,
                sellerInfo: updatedSellerInfo,
              }
            : u
        );

        // Update current user if it's the same
        const updatedCurrentUser =
          user?.id === userId
            ? {
                ...user,
                accountType: "seller" as AccountType,
                sellerInfo: updatedSellerInfo,
              }
            : user;

        set({ users: updatedUsers, user: updatedCurrentUser });

        return { success: true, message: "Seller application approved" };
      },

      rejectSellerApplication: (userId) => {
        const { users, user } = get();
        const targetUser = users.find((u) => u.id === userId);

        if (!targetUser) {
          return { success: false, message: "User not found" };
        }

        if (!targetUser.sellerInfo) {
          return { success: false, message: "No seller application found" };
        }

        const updatedSellerInfo: SellerInfo = {
          ...targetUser.sellerInfo,
          status: "rejected",
        };

        const updatedUsers = users.map((u) =>
          u.id === userId ? { ...u, sellerInfo: updatedSellerInfo } : u
        );

        const updatedCurrentUser =
          user?.id === userId
            ? { ...user, sellerInfo: updatedSellerInfo }
            : user;

        set({ users: updatedUsers, user: updatedCurrentUser });

        return { success: true, message: "Seller application rejected" };
      },

      deleteUser: (userId) => {
        const { users, user } = get();
        const targetUser = users.find((u) => u.id === userId);

        if (!targetUser) {
          return { success: false, message: "User not found" };
        }

        // Prevent deleting current admin
        if (user?.id === userId) {
          return { success: false, message: "Cannot delete current user" };
        }

        const updatedUsers = users.filter((u) => u.id !== userId);
        set({ users: updatedUsers });

        return { success: true, message: "User deleted successfully" };
      },

      updateUserAccountType: (userId, accountType) => {
        const { users, user } = get();
        const targetUser = users.find((u) => u.id === userId);

        if (!targetUser) {
          return { success: false, message: "User not found" };
        }

        const updatedUsers = users.map((u) =>
          u.id === userId ? { ...u, accountType } : u
        );

        const updatedCurrentUser =
          user?.id === userId ? { ...user, accountType } : user;

        set({ users: updatedUsers, user: updatedCurrentUser });

        return { success: true, message: "Account type updated successfully" };
      },
    }),
    {
      name: "amanoon-auth",
      skipHydration: true,
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
    }
  )
);
