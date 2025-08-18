"use client";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Link from "next/link";
import { useStore } from "@/provider/store";

export function Cart() {
  const { cartItems: items, removeFromCart, updateCartQuantity } = useStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-96">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground text-center mb-6">
          Add some items to your cart to get started
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Shopping Cart ({items.length})</h1>

      {/* Cart Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <Card key={`${item.id}-${item.size}`} className="p-4">
            <div className="flex gap-3">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    {item.size && (
                      <p className="text-xs text-muted-foreground">
                        Size: {item.size}
                      </p>
                    )}
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity - 1, item.size)
                    }
                    className="h-8 w-8"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity + 1, item.size)
                    }
                    className="h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Separator />

      {/* Order Summary */}
      <div className="space-y-3">
        <h3 className="font-semibold">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className={shipping === 0 ? "text-green-600" : ""}>
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {subtotal < 100 && (
          <p className="text-sm text-muted-foreground">
            Add ${(100 - subtotal).toFixed(2)} more for free shipping
          </p>
        )}

        <Link href={"/checkout"}>
          <Button className="w-full bg-black text-white rounded-full py-6 text-lg">
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
