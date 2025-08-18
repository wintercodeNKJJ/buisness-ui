"use client";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

const stats: StatCard[] = [
  {
    title: "Total Revenue",
    value: "$24,567",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Active Clients",
    value: "456",
    change: "-2.1%",
    trend: "down",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Products Sold",
    value: "2,890",
    change: "+15.7%",
    trend: "up",
    icon: Package,
    color: "text-orange-600",
  },
];

const topProducts = [
  { name: "UNISEX RELAXED FIT", sold: 45, revenue: 4770, percentage: 85 },
  { name: "COTTON-TERRY HOODIE", sold: 32, revenue: 6336, percentage: 72 },
  { name: "PREMIUM COTTON TEE", sold: 28, revenue: 2492, percentage: 65 },
  { name: "VINTAGE DENIM JACKET", sold: 18, revenue: 4410, percentage: 45 },
];

const monthlyData = [
  { month: "Jan", revenue: 12000, orders: 85 },
  { month: "Feb", revenue: 15000, orders: 110 },
  { month: "Mar", revenue: 18000, orders: 125 },
  { month: "Apr", revenue: 22000, orders: 140 },
  { month: "May", revenue: 19000, orders: 130 },
  { month: "Jun", revenue: 24567, orders: 165 },
];

export function MyStatistics() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">Business Statistics</h1>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <Badge
                variant={stat.trend === "up" ? "default" : "destructive"}
                className="text-xs"
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {stat.change}
              </Badge>
            </div>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </Card>
        ))}
      </div>

      {/* Revenue Chart Simulation */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Monthly Revenue</h3>
        <div className="space-y-3">
          {monthlyData.map((data) => (
            <div key={data.month} className="flex items-center justify-between">
              <span className="text-sm font-medium w-12">{data.month}</span>
              <div className="flex-1 mx-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(data.revenue / 25000) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-semibold w-16 text-right">
                ${(data.revenue / 1000).toFixed(1)}k
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Products */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Top Selling Products</h3>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={product.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.sold} sold • ${product.revenue.toFixed(2)} revenue
                  </p>
                </div>
                <Badge variant={index === 0 ? "default" : "secondary"}>
                  #{index + 1}
                </Badge>
              </div>
              <Progress value={product.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Key Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Revenue Growth</p>
                <p className="text-xs text-muted-foreground">
                  Your revenue increased by 12.5% this month compared to last
                  month
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Best Performing Product</p>
                <p className="text-xs text-muted-foreground">
                  UNISEX RELAXED FIT is your top seller with 45 units sold
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Client Retention</p>
                <p className="text-xs text-muted-foreground">
                  85% of your clients made repeat purchases this quarter
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
