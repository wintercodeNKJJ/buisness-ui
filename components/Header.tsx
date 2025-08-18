import { Search, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useStore } from "@/provider/store";
import Link from "next/link";

export function Header() {
  const { setIsSideNavOpen } = useStore();
  return (
    <header className="flex items-center justify-between p-4 bg-background border-b border-border sticky top-0 z-30">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSideNavOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <h1 className="text-xl font-bold tracking-wider">AROBIX</h1>

      <Link href="/catalog">
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
      </Link>
    </header>
  );
}
