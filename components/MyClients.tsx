"use client";
import { Mail, MapPin, MoreVertical, Phone, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: "active" | "inactive";
  joinDate: string;
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    totalOrders: 12,
    totalSpent: 1456.0,
    lastOrder: "2024-01-15",
    status: "active",
    joinDate: "2023-08-15",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+1 (555) 234-5678",
    location: "Los Angeles, CA",
    totalOrders: 8,
    totalSpent: 892.0,
    lastOrder: "2024-01-10",
    status: "active",
    joinDate: "2023-10-22",
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@example.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    totalOrders: 15,
    totalSpent: 2134.0,
    lastOrder: "2024-01-08",
    status: "active",
    joinDate: "2023-06-10",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david@example.com",
    phone: "+1 (555) 456-7890",
    location: "Miami, FL",
    totalOrders: 3,
    totalSpent: 234.0,
    lastOrder: "2023-12-20",
    status: "inactive",
    joinDate: "2023-11-05",
  },
];

export function MyClients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState(mockClients);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleClientStatus = (clientId: string) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === clientId
          ? {
              ...client,
              status: client.status === "active" ? "inactive" : "active",
            }
          : client
      )
    );
  };

  const totalRevenue = clients.reduce(
    (sum, client) => sum + client.totalSpent,
    0
  );
  const activeClients = clients.filter(
    (client) => client.status === "active"
  ).length;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">My Clients</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-blue-600">{clients.length}</h3>
          <p className="text-sm text-muted-foreground">Total Clients</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-green-600">{activeClients}</h3>
          <p className="text-sm text-muted-foreground">Active Clients</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-purple-600">
            ${totalRevenue.toFixed(0)}
          </h3>
          <p className="text-sm text-muted-foreground">Total Revenue</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-orange-600">
            ${(totalRevenue / clients.length).toFixed(0)}
          </h3>
          <p className="text-sm text-muted-foreground">Avg. Value</p>
        </Card>
      </div>

      {/* Clients List */}
      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{client.name}</h3>
                    <Badge
                      variant={
                        client.status === "active" ? "default" : "secondary"
                      }
                    >
                      {client.status}
                    </Badge>
                  </div>

                  <div className="flex flex-col items-start text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {client.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {client.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {client.location}
                    </div>
                  </div>

                  <div className="flex gap-4 text-sm">
                    <span>
                      <strong>{client.totalOrders}</strong> orders
                    </span>
                    <span>
                      <strong>${client.totalSpent.toFixed(2)}</strong> spent
                    </span>
                    <span>
                      Last order:{" "}
                      {new Date(client.lastOrder).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Orders</DropdownMenuItem>
                  <DropdownMenuItem>Send Message</DropdownMenuItem>
                  <DropdownMenuItem>Edit Client</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => toggleClientStatus(client.id)}
                  >
                    {client.status === "active" ? "Deactivate" : "Activate"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
