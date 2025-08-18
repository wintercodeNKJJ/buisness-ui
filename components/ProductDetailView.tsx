"use client";
import { useStore } from "@/provider/store";
import {
  AlertTriangle,
  ArrowLeft,
  Edit,
  Eye,
  Heart,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";

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
}

interface ProductDetailViewProps {
  productId: string;
}

// Mock analytics data
const mockAnalytics = {
  views: 1247,
  sales: 89,
  revenue: 9434.0,
  conversionRate: 7.1,
  wishlistAdds: 156,
  cartAdds: 234,
  averageRating: 4.3,
  reviewCount: 67,
  returnRate: 2.1,
  profitMargin: 42.5,
};

const mockSalesData = [
  { month: "Jan", sales: 12, revenue: 1272 },
  { month: "Feb", sales: 18, revenue: 1908 },
  { month: "Mar", sales: 15, revenue: 1590 },
  { month: "Apr", sales: 22, revenue: 2332 },
  { month: "May", sales: 14, revenue: 1484 },
  { month: "Jun", sales: 8, revenue: 848 },
];

const mockTopSizes = [
  { size: "M", percentage: 35, count: 31 },
  { size: "L", percentage: 28, count: 25 },
  { size: "S", percentage: 20, count: 18 },
  { size: "XL", percentage: 12, count: 11 },
  { size: "XS", percentage: 5, count: 4 },
];

export function ProductDetailView({ productId }: ProductDetailViewProps) {
  const { products, handleEditProduct } = useStore();
  const router = useRouter();
  const onBack = () => router.push("/manage");
  const onEdit = (product: Product) => {
    handleEditProduct(product);
    router.push("/manage/edit");
  };
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="p-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <p className="text-center mt-8">Product not found</p>
      </div>
    );
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return {
        status: "Out of Stock",
        color: "text-red-600",
        bgColor: "bg-red-100",
      };
    if (stock < 10)
      return {
        status: "Low Stock",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
      };
    return {
      status: "In Stock",
      color: "text-green-600",
      bgColor: "bg-green-100",
    };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold truncate">Product Details</h1>
        <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>

      {/* Product Overview */}
      <Card className="p-4 space-y-4">
        <div className="flex gap-4">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
                <p className="text-sm text-muted-foreground">
                  SKU: {product.sku}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${product.price.toFixed(2)}</p>
                {product.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Badge
                variant={product.status === "active" ? "default" : "secondary"}
              >
                {product.status}
              </Badge>
              {product.isNew && (
                <Badge className="bg-black text-white">NEW</Badge>
              )}
              <Badge variant="outline">{product.category}</Badge>
              <Badge
                className={`${stockStatus.bgColor} ${stockStatus.color} border-0`}
              >
                {stockStatus.status}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Eye className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-muted-foreground">Views</span>
          </div>
          <p className="text-2xl font-bold">
            {mockAnalytics.views.toLocaleString()}
          </p>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShoppingCart className="h-4 w-4 text-green-600" />
            <span className="text-sm text-muted-foreground">Sales</span>
          </div>
          <p className="text-2xl font-bold">{mockAnalytics.sales}</p>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-purple-600" />
            <span className="text-sm text-muted-foreground">Revenue</span>
          </div>
          <p className="text-2xl font-bold">
            ${mockAnalytics.revenue.toFixed(0)}
          </p>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-red-600" />
            <span className="text-sm text-muted-foreground">Conversion</span>
          </div>
          <p className="text-2xl font-bold">{mockAnalytics.conversionRate}%</p>
        </Card>
      </div>

      {/* Sales Performance */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">
          Sales Performance (Last 6 Months)
        </h3>
        <div className="space-y-3">
          {mockSalesData.map((data) => (
            <div key={data.month} className="flex items-center justify-between">
              <span className="text-sm font-medium w-12">{data.month}</span>
              <div className="flex-1 mx-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(data.sales / 25) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold">
                  {data.sales} sales
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  ${data.revenue}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Product Analytics */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Product Analytics</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Wishlist Adds</p>
              <p className="text-lg font-semibold">
                {mockAnalytics.wishlistAdds}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cart Adds</p>
              <p className="text-lg font-semibold">{mockAnalytics.cartAdds}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
              <p className="text-lg font-semibold">
                {mockAnalytics.averageRating}/5
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reviews</p>
              <p className="text-lg font-semibold">
                {mockAnalytics.reviewCount}
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Return Rate</p>
              <p className="text-lg font-semibold text-red-600">
                {mockAnalytics.returnRate}%
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Profit Margin</p>
              <p className="text-lg font-semibold text-green-600">
                {mockAnalytics.profitMargin}%
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Size Performance */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Top Selling Sizes</h3>
        <div className="space-y-3">
          {mockTopSizes.map((sizeData) => (
            <div key={sizeData.size} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  Size {sizeData.size}
                </span>
                <span className="text-sm text-muted-foreground">
                  {sizeData.count} sold ({sizeData.percentage}%)
                </span>
              </div>
              <Progress value={sizeData.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Product Details */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Product Information</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium">Description</p>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Category</p>
              <p className="text-sm text-muted-foreground">
                {product.category}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Fit</p>
              <p className="text-sm text-muted-foreground">{product.fit}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">Available Sizes</p>
            <div className="flex gap-1 flex-wrap mt-1">
              {product.sizes.map((size) => (
                <Badge key={size} variant="outline" className="text-xs">
                  {size}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">Available Colors</p>
            <div className="flex gap-1 flex-wrap mt-1">
              {product.colors.map((color) => (
                <Badge key={color} variant="outline" className="text-xs">
                  {color}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">Materials</p>
            <div className="flex gap-1 flex-wrap mt-1">
              {product.materials.map((material) => (
                <Badge key={material} variant="outline" className="text-xs">
                  {material}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Created</p>
              <p className="text-muted-foreground">
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="font-medium">Last Updated</p>
              <p className="text-muted-foreground">
                {new Date(product.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Inventory Alert */}
      {product.stock < 10 && (
        <Card className="p-4 border-yellow-200 bg-yellow-50">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-800">Inventory Alert</p>
              <p className="text-sm text-yellow-700">
                {product.stock === 0
                  ? "This product is out of stock"
                  : `Only ${product.stock} items left in stock`}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
