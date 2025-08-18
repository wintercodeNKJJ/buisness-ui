"use client";
import {
  User,
  Settings,
  Heart,
  Package,
  MapPin,
  CreditCard,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

interface ProfileProps {
  user: User | null;
}

const profileMenuItems = [
  { icon: Package, label: "My Orders", subtitle: "Track your orders" },
  { icon: Heart, label: "Wishlist", subtitle: "5 items saved" },
  {
    icon: MapPin,
    label: "Address Book",
    subtitle: "Manage shipping addresses",
  },
  {
    icon: CreditCard,
    label: "Payment Methods",
    subtitle: "Manage cards & payment",
  },
  {
    icon: Settings,
    label: "Settings",
    subtitle: "Preferences & notifications",
  },
];

export function Profile({ user }: ProfileProps) {
  const router = useRouter();
  const onLogout = () => {
    router.push("/auth/login");
  };
  if (!user) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-96">
        <p>Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </div>
      </Card>

      {/* Profile Menu */}
      <div className="space-y-2">
        {profileMenuItems.map((item) => (
          <Card
            key={item.label}
            className="p-4 cursor-pointer hover:bg-accent transition-colors"
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Separator />

      {/* App Info */}
      <div className="space-y-2">
        <Card className="p-4 cursor-pointer hover:bg-accent transition-colors">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-xs">?</span>
            </div>
            <div>
              <p className="font-medium">Help & Support</p>
              <p className="text-sm text-muted-foreground">
                Get help with your orders
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 cursor-pointer hover:bg-accent transition-colors">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 rounded-full bg-purple-500 flex items-center justify-center">
              <span className="text-white text-xs">i</span>
            </div>
            <div>
              <p className="font-medium">About AROBIX</p>
              <p className="text-sm text-muted-foreground">
                Learn more about our brand
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Logout Button */}
      <Button
        variant="outline"
        className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
        onClick={onLogout}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  );
}
