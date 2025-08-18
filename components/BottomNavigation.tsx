import { Home, Grid3X3, ShoppingBag, User } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface BottomNavigationProps {
  currentPage: string;
  cartItemsCount: number;
}

export function BottomNavigation({
  currentPage,
  cartItemsCount,
}: BottomNavigationProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Home", link: "/" },
    { id: "catalog", icon: Grid3X3, label: "Catalog", link: "/catalog" },
    { id: "cart", icon: ShoppingBag, label: "Cart", link: "/cart" },
    { id: "profile", icon: User, label: "Profile", link: "/auth/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border max-w-md mx-auto">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ id, icon: Icon, label, link }) => (
          <Link href={link} key={id}>
            <Button
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                currentPage === id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {id === "cart" && cartItemsCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs"
                  >
                    {cartItemsCount > 9 ? "9+" : cartItemsCount}
                  </Badge>
                )}
              </div>
              <span className="text-xs">{label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
}
