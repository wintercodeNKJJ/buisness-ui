// store.ts
import { create } from "zustand";

type Page =
  | "home"
  | "catalog"
  | "product"
  | "cart"
  | "checkout"
  | "orderHistory"
  | "wishlist"
  | "manageProducts"
  | "addEditProduct"
  | "productDetailView"
  | "clientsCommands"
  | "myClients"
  | "myStatistics"
  | "clientRequest"
  | "profile"
  | "login";

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
  salePercentage?: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface StoreState {
  currentPage: Page;
  selectedProductId: string;
  selectedProductForEdit: Product | null;
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  user: (User & { role: string }) | null;
  isSideNavOpen: boolean;
  products: Product[];

  // Actions
  setCurrentPage: (page: Page) => void;
  setSelectedProductId: (id: string) => void;
  setSelectedProductForEdit: (product: Product | null) => void;
  setIsSideNavOpen: (open: boolean) => void;

  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateCartQuantity: (
    productId: string,
    quantity: number,
    size?: string
  ) => void;
  emptyCart: () => void;

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;

  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;

  navigateToProduct: (productId: string) => void;
  handleCheckout: () => void;

  handleAddProduct: () => void;
  handleEditProduct: (product: Product) => void;
  handleViewProductDetails: (productId: string) => void;
  handleSaveProduct: (productData: Product) => void;
  handleDeleteProduct: (productId: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  currentPage: "home",
  selectedProductId: "",
  selectedProductForEdit: null,
  cartItems: [],
  wishlistItems: [],
  user: {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    password: "string",
    isEmailVerified: true,
    verificationToken: "",
    verificationTokenExpiry: new Date(),
    resetToken: "",
    resetTokenExpiry: new Date(),
    addressId: 1,
  },
  isSideNavOpen: false,
  products: [
    {
      id: "1",
      name: "UNISEX RELAXED FIT",
      price: 106.0,
      originalPrice: 150.0,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      description:
        "A creatively styled unisex hoodie by BOSS. This hooded sweatshirt is cut to a straight fit in French Terry.",
      category: "Hoodie",
      brand: "BOSS X FREDDIE MERCURY",
      fit: "Regular Fit",
      stock: 25,
      status: "active",
      isNew: false,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Gray"],
      materials: ["Cotton", "Polyester"],
      sku: "PRD-001",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
      salePercentage: "25",
    },
    {
      id: "2",
      name: "COTTON-TERRY HOODIE",
      price: 198.0,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      description:
        "A creatively styled unisex hoodie by BOSS. This hooded sweatshirt is cut to a straight fit in French Terry.",
      category: "Hoodie",
      brand: "BOSS X FREDDIE MERCURY",
      fit: "Regular Fit",
      stock: 12,
      status: "active",
      isNew: true,
      sizes: ["M", "L", "XL"],
      colors: ["Navy", "Black"],
      materials: ["Cotton"],
      sku: "PRD-002",
      createdAt: "2024-01-05T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "3",
      name: "PREMIUM COTTON TEE",
      price: 89.0,
      image:
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
      description:
        "Premium quality cotton t-shirt with modern fit and superior comfort.",
      category: "T-Shirt",
      brand: "AROBIX PREMIUM",
      fit: "Slim Fit",
      stock: 0,
      status: "inactive",
      isNew: false,
      sizes: ["S", "M", "L"],
      colors: ["White", "Black", "Gray"],
      materials: ["Cotton"],
      sku: "PRD-003",
      createdAt: "2024-01-10T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "4",
      name: "VINTAGE DENIM JACKET",
      price: 245.0,
      image:
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
      description:
        "Classic vintage-style denim jacket with authentic wash and premium construction.",
      category: "Jacket",
      brand: "AROBIX VINTAGE",
      fit: "Regular Fit",
      stock: 8,
      status: "active",
      isNew: true,
      sizes: ["M", "L", "XL"],
      colors: ["Blue"],
      materials: ["Denim"],
      sku: "PRD-004",
      createdAt: "2024-01-12T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
  ],

  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedProductId: (id) => set({ selectedProductId: id }),
  setSelectedProductForEdit: (product) =>
    set({ selectedProductForEdit: product }),
  setIsSideNavOpen: (open) => set({ isSideNavOpen: open }),

  addToCart: (product, quantity = 1, size) => {
    const { cartItems } = get();
    const existingItem = cartItems.find(
      (item) => item.id === product.id && item.size === size
    );
    if (existingItem) {
      set({
        cartItems: cartItems.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({
        cartItems: [
          ...cartItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
            size,
          },
        ],
      });
    }
  },

  removeFromCart: (productId, size) => {
    set({
      cartItems: get().cartItems.filter(
        (item) => !(item.id === productId && item.size === size)
      ),
    });
  },

  updateCartQuantity: (productId, quantity, size) => {
    set({
      cartItems: get()
        .cartItems.map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        )
        .filter((item) => item.quantity > 0),
    });
  },

  emptyCart: () => {
    set({ cartItems: [] });
  },

  addToWishlist: (product) => {
    const { wishlistItems } = get();
    if (!wishlistItems.find((item) => item.id === product.id)) {
      set({
        wishlistItems: [
          ...wishlistItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          },
        ],
      });
    }
  },

  removeFromWishlist: (productId) => {
    set({
      wishlistItems: get().wishlistItems.filter(
        (item) => item.id !== productId
      ),
    });
  },

  handleLogin: (email) => {
    const isAdmin = email.includes("admin") || email === "john.doe@example.com";
    const mockUser: User & { role: string } = {
      id: 1,
      name: isAdmin ? "John Doe (Admin)" : "Customer User",
      email,
      role: isAdmin ? "admin" : "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
      password: "string",
      isEmailVerified: true,
      verificationToken: "",
      verificationTokenExpiry: new Date(),
      resetToken: "",
      resetTokenExpiry: new Date(),
      addressId: 1,
    };
    set({ user: mockUser, currentPage: "home" });
  },

  handleLogout: () => {
    set({
      user: null,
      currentPage: "login",
      cartItems: [],
      wishlistItems: [],
      isSideNavOpen: false,
    });
  },

  navigateToProduct: (productId) => {
    set({
      selectedProductId: productId,
      currentPage: "product",
      isSideNavOpen: false,
    });
  },

  handleCheckout: () => {
    set({ cartItems: [], currentPage: "orderHistory" });
  },

  handleAddProduct: () => {
    set({ selectedProductForEdit: null, currentPage: "addEditProduct" });
  },

  handleEditProduct: (product) => {
    set({ selectedProductForEdit: product, currentPage: "addEditProduct" });
  },

  handleViewProductDetails: (productId) => {
    set({ selectedProductId: productId, currentPage: "productDetailView" });
  },

  handleSaveProduct: (productData) => {
    const { selectedProductForEdit, products } = get();
    if (selectedProductForEdit) {
      set({
        products: products.map((p) =>
          p.id === productData.id ? productData : p
        ),
      });
    } else {
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set({ products: [...products, newProduct] });
    }
    set({ currentPage: "manageProducts" });
  },

  handleDeleteProduct: (productId) => {
    set({
      products: get().products.filter((p) => p.id !== productId),
    });
  },
}));
