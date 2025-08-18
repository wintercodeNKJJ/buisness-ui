"use client";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Header } from "@/components/Header";
import { SideNavigation } from "@/components/SideNavigation";
import { useEffect } from "react";
import { useStore } from "./store";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

export default function AppBase({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, currentPage, isSideNavOpen, setIsSideNavOpen, cartItems } =
    useStore();
  // Mock user login
  useEffect(() => {}, [user]);

  return (
    <>
      <div className="min-h-screen bg-background flex max-w-md mx-auto relative">
        <SideNavigation user={user} currentPage={currentPage} />
        <div
          className={`flex-1 flex flex-col transition-transform duration-300 ${
            isSideNavOpen ? "transform translate-x-64" : ""
          }`}
        >
          <Header />

          <main className="flex-1 pb-16">{children}</main>

          <BottomNavigation
            currentPage={currentPage}
            cartItemsCount={cartItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            )}
          />
        </div>

        {isSideNavOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setIsSideNavOpen(false)}
          />
        )}
      </div>
    </>
  );
}
