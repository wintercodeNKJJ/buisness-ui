import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useStore } from "@/provider/store";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
  brand: string;
  fit: string;
  stock: number;
  status: "active" | "inactive";
  isNew?: boolean;
  sizes: string[];
  colors: string[];
  materials: string[];
  sku: string;
  createdAt: string;
  updatedAt: string;
  salePercentage?: string;
}

interface WishlistProps {
  items: Product[];
}

export function Wishlist({ items }: WishlistProps) {
  const { removeFromWishlist, addToCart } = useStore();
  const onRemoveItem = removeFromWishlist;
  const onAddToCart = addToCart;

  if (items.length === 0) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-96">
        <Heart className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground text-center mb-6">
          {`Save items you love to your wishlist and they'll appear here`}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Wishlist</h1>
        <p className="text-muted-foreground">{items.length} items</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <Link href={`/catalog/${item.id}`}>
              <div className="relative cursor-pointer">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveItem(item.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </Link>
            <div className="p-3 space-y-2">
              <p className="text-sm text-muted-foreground">{item.name}</p>
              <p className="font-semibold">${item.price.toFixed(2)}</p>
              <Button
                size="sm"
                className="w-full"
                onClick={() => onAddToCart(item, 1)}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
