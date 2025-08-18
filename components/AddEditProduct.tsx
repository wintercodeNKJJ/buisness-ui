"use client";

import { useStore } from "@/provider/store";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
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
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

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

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const availableColors = [
  "Black",
  "White",
  "Gray",
  "Navy",
  "Brown",
  "Beige",
  "Red",
  "Blue",
  "Green",
];
const availableMaterials = [
  "Cotton",
  "Polyester",
  "Wool",
  "Linen",
  "Silk",
  "Denim",
  "Leather",
  "Cashmere",
];
const categories = [
  "T-Shirt",
  "Hoodie",
  "Jacket",
  "Jeans",
  "Dress",
  "Accessories",
  "Shoes",
];
const fits = ["Slim Fit", "Regular Fit", "Relaxed Fit", "Oversized"];

// Mock unsplash function
const generateImageForProduct = async (query: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const imageMap: Record<string, string> = {
    hoodie:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
    "t-shirt":
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop",
    jacket:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=600&fit=crop",
    jeans:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop",
    dress:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop",
    shoes:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
    accessories:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop",
  };

  const lowerQuery = query.toLowerCase();
  for (const [key, url] of Object.entries(imageMap)) {
    if (lowerQuery.includes(key)) {
      return url;
    }
  }

  return "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop";
};

export function AddEditProduct() {
  const { selectedProductForEdit, handleSaveProduct } = useStore();
  const router = useRouter();
  const onSave = (productData: Product) => {
    handleSaveProduct(productData);
    router.push("/manage");
  };
  const onCancel = () => router.push("/manage");
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    originalPrice: 0,
    image: "",
    description: "",
    category: "",
    brand: "",
    fit: "",
    stock: 0,
    status: "active",
    isNew: false,
    sizes: [],
    colors: [],
    materials: [],
    sku: "",
  });

  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newMaterial, setNewMaterial] = useState("");
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  useEffect(() => {
    if (selectedProductForEdit) {
      setFormData(selectedProductForEdit);
    } else {
      // Generate SKU for new selectedProductForEdit
      const sku = `PRD-${Date.now().toString().slice(-6)}`;
      setFormData((prev) => ({ ...prev, sku }));
    }
  }, [selectedProductForEdit]);

  const handleInputChange = (
    field: keyof Product,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayAdd = (
    field: "sizes" | "colors" | "materials",
    value: string
  ) => {
    if (value && !formData[field]?.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field] || []), value],
      }));
    }
  };

  const handleArrayRemove = (
    field: "sizes" | "colors" | "materials",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field]?.filter((item) => item !== value) || [],
    }));
  };

  const generateImageFromName = async () => {
    if (!formData.name) return;

    setIsLoadingImage(true);
    try {
      const searchQuery = `${formData.category || "clothing"} ${
        formData.name
      }`.trim();
      const imageUrl = await generateImageForProduct(searchQuery);
      handleInputChange("image", imageUrl);
    } catch (error) {
      console.error("Failed to generate image:", error);
    } finally {
      setIsLoadingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData: Product = {
      id: selectedProductForEdit?.id || "",
      name: formData.name || "",
      price: Number(formData.price) || 0,
      originalPrice: formData.originalPrice
        ? Number(formData.originalPrice)
        : undefined,
      image: formData.image || "",
      description: formData.description || "",
      category: formData.category || "",
      brand: formData.brand || "",
      fit: formData.fit || "",
      stock: Number(formData.stock) || 0,
      status: formData.status || "active",
      isNew: formData.isNew || false,
      sizes: formData.sizes || [],
      colors: formData.colors || [],
      materials: formData.materials || [],
      sku: formData.sku || "",
      createdAt: selectedProductForEdit?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(productData);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold">
          {selectedProductForEdit ? "Edit Product" : "Add New Product"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold">Basic Information</h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => handleInputChange("sku", e.target.value)}
                placeholder="Product SKU"
                disabled={!!selectedProductForEdit}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fit">Fit</Label>
                <Select
                  value={formData.fit}
                  onValueChange={(value) => handleInputChange("fit", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fit" />
                  </SelectTrigger>
                  <SelectContent>
                    {fits.map((fit) => (
                      <SelectItem key={fit} value={fit}>
                        {fit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                placeholder="Enter brand name"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter product description"
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* Pricing & Inventory */}
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold">Pricing & Inventory</h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  handleInputChange("price", parseFloat(e.target.value) || 0)
                }
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <Label htmlFor="originalPrice">Original Price</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.originalPrice || ""}
                onChange={(e) =>
                  handleInputChange(
                    "originalPrice",
                    parseFloat(e.target.value) || 0
                  )
                }
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="stock">Stock Quantity *</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) =>
                handleInputChange("stock", parseInt(e.target.value) || 0)
              }
              placeholder="0"
              required
            />
          </div>
        </Card>

        {/* Product Image */}
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold">Product Image</h3>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="Enter image URL"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={generateImageFromName}
                disabled={isLoadingImage || !formData.name}
              >
                {isLoadingImage ? "Loading..." : "Generate"}
              </Button>
            </div>

            {formData.image && (
              <div className="w-32 h-32 border-2 border-dashed border-border rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={formData.image}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </Card>

        {/* Variants */}
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold">Product Variants</h3>

          {/* Sizes */}
          <div>
            <Label>Available Sizes</Label>
            <div className="flex gap-2 mb-2">
              <Select value={newSize} onValueChange={setNewSize}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {availableSizes
                    .filter((size) => !formData.sizes?.includes(size))
                    .map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  if (newSize) {
                    handleArrayAdd("sizes", newSize);
                    setNewSize("");
                  }
                }}
                disabled={!newSize}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-1 flex-wrap">
              {formData.sizes?.map((size) => (
                <Badge
                  key={size}
                  variant="secondary"
                  className="cursor-pointer"
                >
                  {size}
                  <X
                    className="h-3 w-3 ml-1"
                    onClick={() => handleArrayRemove("sizes", size)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <Label>Available Colors</Label>
            <div className="flex gap-2 mb-2">
              <Select value={newColor} onValueChange={setNewColor}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {availableColors
                    .filter((color) => !formData.colors?.includes(color))
                    .map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  if (newColor) {
                    handleArrayAdd("colors", newColor);
                    setNewColor("");
                  }
                }}
                disabled={!newColor}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-1 flex-wrap">
              {formData.colors?.map((color) => (
                <Badge
                  key={color}
                  variant="secondary"
                  className="cursor-pointer"
                >
                  {color}
                  <X
                    className="h-3 w-3 ml-1"
                    onClick={() => handleArrayRemove("colors", color)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div>
            <Label>Materials</Label>
            <div className="flex gap-2 mb-2">
              <Select value={newMaterial} onValueChange={setNewMaterial}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  {availableMaterials
                    .filter(
                      (material) => !formData.materials?.includes(material)
                    )
                    .map((material) => (
                      <SelectItem key={material} value={material}>
                        {material}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  if (newMaterial) {
                    handleArrayAdd("materials", newMaterial);
                    setNewMaterial("");
                  }
                }}
                disabled={!newMaterial}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-1 flex-wrap">
              {formData.materials?.map((material) => (
                <Badge
                  key={material}
                  variant="secondary"
                  className="cursor-pointer"
                >
                  {material}
                  <X
                    className="h-3 w-3 ml-1"
                    onClick={() => handleArrayRemove("materials", material)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold">Product Settings</h3>

          <div className="flex items-center justify-between">
            <div>
              <Label>Product Status</Label>
              <p className="text-sm text-muted-foreground">
                {formData.status === "active"
                  ? "Product is visible and available for purchase"
                  : "Product is hidden from customers"}
              </p>
            </div>
            <Switch
              checked={formData.status === "active"}
              onCheckedChange={(checked) =>
                handleInputChange("status", checked ? "active" : "inactive")
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>New Product Badge</Label>
              <p className="text-sm text-muted-foreground">
                {'Show "NEW" badge on this product'}
              </p>
            </div>
            <Switch
              checked={formData.isNew || false}
              onCheckedChange={(checked) => handleInputChange("isNew", checked)}
            />
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            {selectedProductForEdit ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
