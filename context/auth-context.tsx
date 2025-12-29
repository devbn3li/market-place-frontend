"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "amanoon_users";
const CURRENT_USER_KEY = "amanoon_current_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load current user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Get all registered users from localStorage
  const getStoredUsers = (): StoredUser[] => {
    const users = localStorage.getItem(USERS_KEY);
    if (users) {
      try {
        return JSON.parse(users);
      } catch {
        return [];
      }
    }
    return [];
  };

  // Save users to localStorage
  const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  // Register new user
  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<{ success: boolean; message: string }> => {
    const users = getStoredUsers();

    // Check if email already exists
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        message: "البريد الإلكتروني مسجل بالفعل | Email already registered",
      };
    }

    // Create new user
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email.toLowerCase(),
      phone: userData.phone,
      password: userData.password,
      createdAt: new Date().toISOString(),
    };

    // Save to users list
    users.push(newUser);
    saveUsers(users);

    // Auto login after registration
    const userWithoutPassword: User = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      createdAt: newUser.createdAt,
    };
    setUser(userWithoutPassword);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return {
      success: true,
      message: "تم إنشاء الحساب بنجاح | Account created successfully",
    };
  };

  // Login user
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    const users = getStoredUsers();

    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "البريد الإلكتروني أو كلمة المرور غير صحيحة | Invalid email or password",
      };
    }

    // Login successful - save without password
    const userWithoutPassword: User = {
      id: foundUser.id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      phone: foundUser.phone,
      createdAt: foundUser.createdAt,
    };
    setUser(userWithoutPassword);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return {
      success: true,
      message: "تم تسجيل الدخول بنجاح | Login successful",
    };
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
