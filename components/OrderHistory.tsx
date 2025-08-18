"use client";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size?: string;
  }[];
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 156.0,
    items: [
      {
        id: "1",
        name: "UNISEX RELAXED FIT",
        price: 106.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        size: "M",
      },
      {
        id: "3",
        name: "PREMIUM COTTON TEE",
        price: 89.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
        size: "L",
      },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "shipped",
    total: 298.0,
    items: [
      {
        id: "2",
        name: "COTTON-TERRY HOODIE",
        price: 198.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        size: "XL",
      },
    ],
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "processing",
    total: 245.0,
    items: [
      {
        id: "4",
        name: "VINTAGE DENIM JACKET",
        price: 245.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
        size: "M",
      },
    ],
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "processing":
      return <Clock className="h-4 w-4" />;
    case "shipped":
      return <Truck className="h-4 w-4" />;
    case "delivered":
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "processing":
      return "bg-yellow-500";
    case "shipped":
      return "bg-blue-500";
    case "delivered":
      return "bg-green-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export function OrderHistory() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Order History</h1>

      {mockOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-96">
          <Package className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground text-center mb-6">
            When you place your first order, it will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{order.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    className={`${getStatusColor(
                      order.status
                    )} text-white mb-1`}
                  >
                    <div className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </Badge>
                  <p className="font-semibold">${order.total.toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
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

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm" className="flex-1">
                    Reorder
                  </Button>
                )}
                {order.status === "shipped" && (
                  <Button variant="outline" size="sm" className="flex-1">
                    Track Package
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
