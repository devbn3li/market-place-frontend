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

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  addresses: Address[];
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
  }) => { success: boolean; message: string };
  logout: () => void;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
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
        };

        const userWithoutPassword: User = {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
          createdAt: newUser.createdAt,
          addresses: newUser.addresses,
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
    }),
    {
      name: "amanoon-auth",
      skipHydration: true,
      storage: createJSONStorage(() => 
        typeof window !== 'undefined' ? window.localStorage : {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      ),
    }
  )
);
