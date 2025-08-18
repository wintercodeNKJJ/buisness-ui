"use client";
import { useStore } from "@/provider/store";
import {
  BarChart3,
  Clock,
  Grid3X3,
  Heart,
  Home,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'customer' | 'admin';
// }

interface SideNavigationProps {
  user: (User & { role: string }) | null;
  currentPage: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  roles: ("customer" | "admin")[];
  link: string;
}

const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    roles: ["customer", "admin"],
    link: "/",
  },
  {
    id: "catalog",
    label: "Catalog",
    icon: Grid3X3,
    roles: ["customer", "admin"],
    link: "/catalog",
  },
  {
    id: "cart",
    label: "Cart",
    icon: ShoppingBag,
    roles: ["customer", "admin"],
    link: "/cart",
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: Heart,
    roles: ["customer", "admin"],
    link: "/wishlist",
  },
  {
    id: "orderHistory",
    label: "Order History",
    icon: Clock,
    roles: ["customer", "admin"],
    link: "/history",
  },
];

const adminMenuItems: MenuItem[] = [
  {
    id: "manageProducts",
    label: "Manage Products",
    icon: Package,
    roles: ["admin"],
    link: "/manage",
  },
  {
    id: "clientsCommands",
    label: "Client Orders",
    icon: ShoppingBag,
    roles: ["admin"],
    link: "/manage/clients/orders",
  },
  {
    id: "myClients",
    label: "My Clients",
    icon: Users,
    roles: ["admin"],
    link: "/manage/clients",
  },
  {
    id: "myStatistics",
    label: "Statistics",
    icon: BarChart3,
    roles: ["admin"],
    link: "/manage/stats",
  },
  {
    id: "clientRequest",
    label: "Client Requests",
    icon: MessageSquare,
    roles: ["admin"],
    link: "/manage/clients/request",
  },
];

export function SideNavigation({ user, currentPage }: SideNavigationProps) {
  const router = useRouter();
  const { isSideNavOpen, setIsSideNavOpen } = useStore();

  const onNavigate = (page: string) => {
    setIsSideNavOpen(false);
    router.push(page);
  };
  if (!user) return null;

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes((user.role as "admin") || "customer")
  );
  const filteredAdminItems = adminMenuItems.filter((item) =>
    item.roles.includes((user.role as "admin") || "customer")
  );

  return (
    <div
      className={`fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-300 ${
        isSideNavOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            AROBIX
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSideNavOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sidebar-foreground truncate">
                {user.name}
              </p>
              <p className="text-sm text-sidebar-foreground/60 truncate">
                {user.email}
              </p>
              <span className="inline-block px-2 py-1 text-xs bg-sidebar-accent text-sidebar-accent-foreground rounded-full capitalize">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <nav className="space-y-1">
              {filteredMenuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    currentPage === item.id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => onNavigate(item.link)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </nav>

            {user.role === "admin" && filteredAdminItems.length > 0 && (
              <>
                <Separator className="my-4" />
                <div className="px-2 py-1">
                  <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider">
                    Admin Panel
                  </p>
                </div>
                <nav className="space-y-1">
                  {filteredAdminItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? "secondary" : "ghost"}
                      className={`w-full justify-start gap-3 ${
                        currentPage === item.id
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                      onClick={() => onNavigate(item.link)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => onNavigate("/auth/profile")}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
