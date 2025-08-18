"use client";
import { useState } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Link from "next/link";
import { useStore } from "@/provider/store";

interface ProductDetailsProps {
  productId: string;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export function ProductDetails({ productId }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isFavorited, setIsFavorited] = useState(false);

  const { addToCart, addToWishlist, products } = useStore();

  // const product =
  //   mockProductDetails[productId as keyof typeof mockProductDetails];

  const product = products.find((product) => product.id === productId);

  if (!product) {
    return (
      <div className="p-4">
        <Link href={"/catalog"}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <p className="text-center mt-8">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(product, 1, selectedSize);
    alert("Added to cart!");
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    setIsFavorited(true);
    alert("Added to wishlist!");
  };

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Link href={"/catalog"}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="font-semibold uppercase">
          {product.name.split(" ").slice(0, 2).join(" ")}
        </h1>
        <Button variant="ghost" size="icon" onClick={handleAddToWishlist}>
          <Heart
            className={`h-6 w-6 ${
              isFavorited ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
      </div>

      {/* Product Image */}
      <div className="px-4 mb-4">
        <div className="bg-muted rounded-2xl overflow-hidden">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold text-orange-500">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <h2 className="text-lg font-semibold">{product.name}</h2>

        <div className="flex gap-2">
          {product.isNew && <Badge className="bg-black text-white">NEW</Badge>}
          <Badge variant="outline">{product.brand}</Badge>
          <Badge variant="outline">{product.fit}</Badge>
        </div>

        {/* Size Selection */}
        <div>
          <h3 className="font-semibold mb-2">Size</h3>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSize(size)}
                className="min-w-[50px]"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">DETAIL</h3>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-black text-white rounded-full py-6 text-lg"
          disabled={!selectedSize}
        >
          🛍️ ADD TO SHOPPING BAG
        </Button>
      </div>
    </div>
  );
}
