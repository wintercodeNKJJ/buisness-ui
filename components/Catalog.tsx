"use client";
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Link from "next/link";
import { useStore } from "@/provider/store";

const categories = [
  { id: "all", name: "All" },
  { id: "t-shirt", name: "T-Shirts" },
  { id: "hoodie", name: "Hoodies" },
  { id: "jacket", name: "Jackets" },
  { id: "hat", name: "Hats" },
];

export function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { products } = useStore();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="whitespace-nowrap"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Filter Button */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} products found
        </p>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <Link href={`/catalog/${product.id}`} key={product.id}>
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
  );
}
