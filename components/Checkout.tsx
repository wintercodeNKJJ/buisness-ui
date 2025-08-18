"use client";
import { useStore } from "@/provider/store";
import { ArrowLeft, CreditCard, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";

export function Checkout() {
  const { cartItems: items, emptyCart } = useStore();
  const [step, setStep] = useState<"shipping" | "payment" | "review">(
    "shipping"
  );
  const router = useRouter();
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "US",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("review");
  };

  const handleCompleteOrder = () => {
    emptyCart();
    router.push("/history");
  };

  const renderShippingStep = () => (
    <form onSubmit={handleShippingSubmit} className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
          1
        </div>
        <h3 className="font-semibold">Shipping Information</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={shippingInfo.fullName}
            onChange={(e) =>
              setShippingInfo((prev) => ({ ...prev, fullName: e.target.value }))
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={shippingInfo.address}
            onChange={(e) =>
              setShippingInfo((prev) => ({ ...prev, address: e.target.value }))
            }
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={shippingInfo.city}
              onChange={(e) =>
                setShippingInfo((prev) => ({ ...prev, city: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              value={shippingInfo.zipCode}
              onChange={(e) =>
                setShippingInfo((prev) => ({
                  ...prev,
                  zipCode: e.target.value,
                }))
              }
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Select
            value={shippingInfo.country}
            onValueChange={(value) =>
              setShippingInfo((prev) => ({ ...prev, country: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="UK">United Kingdom</SelectItem>
              <SelectItem value="AU">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Continue to Payment
      </Button>
    </form>
  );

  const renderPaymentStep = () => (
    <form onSubmit={handlePaymentSubmit} className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
          2
        </div>
        <h3 className="font-semibold">Payment Information</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="cardName">Name on Card</Label>
          <Input
            id="cardName"
            value={paymentInfo.name}
            onChange={(e) =>
              setPaymentInfo((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={paymentInfo.cardNumber}
            onChange={(e) =>
              setPaymentInfo((prev) => ({
                ...prev,
                cardNumber: e.target.value,
              }))
            }
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              placeholder="MM/YY"
              value={paymentInfo.expiry}
              onChange={(e) =>
                setPaymentInfo((prev) => ({ ...prev, expiry: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              placeholder="123"
              value={paymentInfo.cvv}
              onChange={(e) =>
                setPaymentInfo((prev) => ({ ...prev, cvv: e.target.value }))
              }
              required
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep("shipping")}
          className="flex-1"
        >
          Back
        </Button>
        <Button type="submit" className="flex-1">
          Review Order
        </Button>
      </div>
    </form>
  );

  const renderReviewStep = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
          3
        </div>
        <h3 className="font-semibold">Review Order</h3>
      </div>

      {/* Shipping Address */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
          <div>
            <h4 className="font-medium">Shipping Address</h4>
            <p className="text-sm text-muted-foreground">
              {shippingInfo.fullName}
              <br />
              {shippingInfo.address}
              <br />
              {shippingInfo.city}, {shippingInfo.zipCode}
              <br />
              {shippingInfo.country}
            </p>
          </div>
        </div>
      </Card>

      {/* Payment Method */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <CreditCard className="h-5 w-5 text-muted-foreground mt-1" />
          <div>
            <h4 className="font-medium">Payment Method</h4>
            <p className="text-sm text-muted-foreground">
              **** **** **** {paymentInfo.cardNumber.slice(-4)}
              <br />
              {paymentInfo.name}
            </p>
          </div>
        </div>
      </Card>

      {/* Order Items */}
      <Card className="p-4">
        <h4 className="font-medium mb-3">Order Items</h4>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex gap-3">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                {item.size && (
                  <p className="text-xs text-muted-foreground">
                    Size: {item.size}
                  </p>
                )}
                <p className="text-sm">
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setStep("payment")}
          className="flex-1"
        >
          Back
        </Button>
        <Button onClick={handleCompleteOrder} className="flex-1">
          Complete Order
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href={"/cart"}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Checkout</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        {["shipping", "payment", "review"].map((stepName, index) => (
          <div key={stepName} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                step === stepName
                  ? "bg-primary text-primary-foreground"
                  : ["shipping", "payment", "review"].indexOf(step) > index
                  ? "bg-green-500 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            {index < 2 && <div className="w-8 h-px bg-border ml-2" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === "shipping" && renderShippingStep()}
      {step === "payment" && renderPaymentStep()}
      {step === "review" && renderReviewStep()}

      {/* Order Summary */}
      <Card className="p-4 mt-6">
        <h3 className="font-semibold mb-3">Order Summary</h3>
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
      </Card>
    </div>
  );
}
