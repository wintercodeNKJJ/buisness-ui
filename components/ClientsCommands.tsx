"use client";
import { useState } from "react";
import { Package, Clock, CheckCircle, AlertCircle, Search } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ClientOrder {
  id: string;
  clientName: string;
  clientEmail: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: number;
  priority: "low" | "medium" | "high";
}

const mockClientOrders: ClientOrder[] = [
  {
    id: "CMD-001",
    clientName: "Alice Johnson",
    clientEmail: "alice@example.com",
    date: "2024-01-15",
    status: "pending",
    total: 299.0,
    items: 3,
    priority: "high",
  },
  {
    id: "CMD-002",
    clientName: "Bob Smith",
    clientEmail: "bob@example.com",
    date: "2024-01-14",
    status: "processing",
    total: 156.0,
    items: 2,
    priority: "medium",
  },
  {
    id: "CMD-003",
    clientName: "Carol Davis",
    clientEmail: "carol@example.com",
    date: "2024-01-13",
    status: "shipped",
    total: 89.0,
    items: 1,
    priority: "low",
  },
  {
    id: "CMD-004",
    clientName: "David Wilson",
    clientEmail: "david@example.com",
    date: "2024-01-12",
    status: "delivered",
    total: 445.0,
    items: 4,
    priority: "medium",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <AlertCircle className="h-4 w-4" />;
    case "processing":
      return <Clock className="h-4 w-4" />;
    case "shipped":
      return <Package className="h-4 w-4" />;
    case "delivered":
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-orange-500";
    case "processing":
      return "bg-blue-500";
    case "shipped":
      return "bg-purple-500";
    case "delivered":
      return "bg-green-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export function ClientsCommands() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState(mockClientOrders);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus as
                | "pending"
                | "processing"
                | "shipped"
                | "delivered"
                | "cancelled",
            }
          : order
      )
    );
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Client Orders</h1>
        <Badge className="bg-blue-500 text-white">
          {filteredOrders.length} orders
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders, clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-orange-600">
            {orders.filter((o) => o.status === "pending").length}
          </h3>
          <p className="text-sm text-muted-foreground">Pending</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-blue-600">
            {orders.filter((o) => o.status === "processing").length}
          </h3>
          <p className="text-sm text-muted-foreground">Processing</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-purple-600">
            {orders.filter((o) => o.status === "shipped").length}
          </h3>
          <p className="text-sm text-muted-foreground">Shipped</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-green-600">
            {orders.filter((o) => o.status === "delivered").length}
          </h3>
          <p className="text-sm text-muted-foreground">Delivered</p>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold">{order.id}</h3>
                <p className="text-sm text-muted-foreground">
                  {order.clientName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {order.clientEmail}
                </p>
              </div>
              <div className="text-right">
                <Badge className={`${getPriorityColor(order.priority)} mb-1`}>
                  {order.priority} priority
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 justify-between">
              <div className="flex items-center gap-4">
                <Badge className={`${getStatusColor(order.status)} text-white`}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {order.items} items • ${order.total.toFixed(2)}
                </span>
              </div>

              <div className="flex gap-2">
                <Select
                  value={order.status}
                  onValueChange={(value) => updateOrderStatus(order.id, value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
