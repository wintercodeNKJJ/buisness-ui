"use client";
import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useStore } from "@/provider/store";
import { useRouter } from "next/navigation";

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

export function ManageProducts() {
  const {
    products,
    handleDeleteProduct,
    handleAddProduct,
    handleEditProduct,
    handleViewProductDetails,
  } = useStore();
  const router = useRouter();

  const onAddProduct = () => {
    handleAddProduct();
    router.push("/manage/edit");
  };

  const onEditProduct = (product: Product) => {
    handleEditProduct(product);
    router.push("/manage/edit");
  };

  const onViewProduct = (productId: string) => {
    handleViewProductDetails(productId);
    router.push(`/manage/${productId}`);
  };

  const onDeleteProduct = handleDeleteProduct;

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderGridView = () => (
    <div className="grid grid-cols-2 gap-4">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden pt-0">
          <div className="relative">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => onViewProduct(product.id)}
            />
            <div className="absolute top-2 left-2 flex gap-1">
              {product.isNew && (
                <Badge className="bg-black text-white text-xs">NEW</Badge>
              )}
              <Badge
                variant={product.status === "active" ? "default" : "secondary"}
                className="text-xs"
              >
                {product.status}
              </Badge>
            </div>
            <div className="absolute top-2 right-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 bg-white/80 hover:bg-white"
                  >
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onViewProduct(product.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEditProduct(product)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Product
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDeleteProduct(product.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="p-3 space-y-2">
            <h3 className="text-sm font-medium truncate">{product.name}</h3>
            <p className="text-xs text-muted-foreground">
              {product.category} • {product.brand}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">
                ${product.price.toFixed(2)}
              </span>
              <span
                className={`text-xs ${
                  product.stock === 0
                    ? "text-red-500"
                    : product.stock < 10
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                Stock: {product.stock}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              SKU: {product.sku}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderTableView = () => (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded cursor-pointer"
                    onClick={() => onViewProduct(product.id)}
                  />
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.sku}
                    </p>
                    {product.isNew && (
                      <Badge className="bg-black text-white text-xs">NEW</Badge>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>
                <span
                  className={`${
                    product.stock === 0
                      ? "text-red-500"
                      : product.stock < 10
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {product.stock}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    product.status === "active" ? "default" : "secondary"
                  }
                >
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewProduct(product.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditProduct(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => onDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Manage Products</h1>
        <Button onClick={onAddProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
        >
          {viewMode === "grid" ? "Table" : "Grid"}
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-blue-600">
            {products.length}
          </h3>
          <p className="text-sm text-muted-foreground">Total Products</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-green-600">
            {products.filter((p) => p.status === "active").length}
          </h3>
          <p className="text-sm text-muted-foreground">Active</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-red-600">
            {products.filter((p) => p.stock === 0).length}
          </h3>
          <p className="text-sm text-muted-foreground">Out of Stock</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-2xl font-bold text-yellow-600">
            {products.filter((p) => p.stock < 10 && p.stock > 0).length}
          </h3>
          <p className="text-sm text-muted-foreground">Low Stock</p>
        </Card>
      </div>

      {filteredProducts.length === 0 ? (
        <Card className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery
              ? "Try adjusting your search terms"
              : "Get started by adding your first product"}
          </p>
          <Button onClick={onAddProduct}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Card>
      ) : viewMode === "grid" ? (
        renderGridView()
      ) : (
        renderTableView()
      )}
    </div>
  );
}
