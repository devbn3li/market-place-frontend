"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();

  // Check if current route is admin
  const isAdminRoute = pathname?.startsWith("/admin");

  // For admin routes, render children directly without Navbar/Footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For regular routes, wrap with Navbar and Footer
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
