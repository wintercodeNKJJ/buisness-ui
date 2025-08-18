type User = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  isEmailVerified: boolean;
  verificationToken: string | null;
  verificationTokenExpiry: Date | null;
  resetToken: string | null;
  resetTokenExpiry: Date | null;
  addressId: number | null;
};

type Address = {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  street: string;
  city: string;
  state: string | null;
  zip: string | null;
  country: string;
};

type Role = {
  id: number;
  name: string;
};

type Item = {
  id: number;
  price: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  categoryId: number;
};

type Media = {
  id: number;
  itemId: number;
  url: string;
};

type OrderWithRelations = Order & {
  user: User;
  items: (OrderItem & {
    item: Item;
  })[];
  transactions: Transaction[];
};

type Order = {
  id: number;
  totalAmount: number;
  userId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

type OrderItem = {
  id: number;
  itemId: number;
  quantity: number;
  price: number;
  orderId: number;
};

type Transaction = {
  id: number;
  status: string;
  createdAt: Date;
  orderId: number;
  amount: number;
  method: string;
  transactionId: string;
};

type ProductWithRelations = Item & {
  category: Category;
  user: User;
  media: Media[];
};

type Category = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
};

type CategoryWithItems = Category & { items: Item[] };
