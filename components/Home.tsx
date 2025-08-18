"use client";

import Link from "next/link";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const mockProducts = [
  {
    id: "1",
    name: "UNISEX RELAXED FIT",
    price: 106.0,
    originalPrice: 150.0,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    isNew: false,
    salePercentage: 40,
  },
  {
    id: "2",
    name: "COTTON-TERRY HOODIE",
    price: 198.0,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    isNew: true,
    salePercentage: null,
  },
  {
    id: "3",
    name: "PREMIUM COTTON TEE",
    price: 89.0,
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
    isNew: false,
    salePercentage: null,
  },
  {
    id: "4",
    name: "VINTAGE DENIM JACKET",
    price: 245.0,
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
    isNew: true,
    salePercentage: null,
  },
];

const categories = [
  { name: "Discount", icon: "🏷️" },
  { name: "T-shirt", icon: "👕" },
  { name: "Hoodie", icon: "👘" },
  { name: "Hat", icon: "🧢" },
];

export function Home() {
  return (
    <div className="p-4 space-y-6">
      {/* Promotional Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-100 to-green-100">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Buy 1<br />
                Get 3
              </h2>
              <Button
                size="sm"
                className="bg-black text-white rounded-full px-6"
              >
                SHOP NOW
              </Button>
            </div>
            <div className="flex space-x-2">
              <div className="w-16 h-20 bg-orange-200 rounded-lg"></div>
              <div className="w-16 h-20 bg-yellow-200 rounded-lg"></div>
              <div className="w-16 h-20 bg-green-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center space-y-2"
          >
            <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center">
              <span className="text-2xl">{category.icon}</span>
            </div>
            <span className="text-sm text-center">{category.name}</span>
          </div>
        ))}
      </div>

      {/* New Arrivals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">New Arrival</h3>
          <Link href={"/catalog"}>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              See all
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {mockProducts.map((product) => (
            <Link key={product.id} href={`/catalog/${product.id}`}>
              <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow pt-0">
                <div className="relative">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-2 left-2 bg-black text-white">
                      NEW
                    </Badge>
                  )}
                  {product.salePercentage && (
                    <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
                      SALE -{product.salePercentage}%
                    </Badge>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm text-muted-foreground mb-1">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
