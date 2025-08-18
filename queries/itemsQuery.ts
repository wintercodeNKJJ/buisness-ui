import api from "./axios";

type CreateProduct = {
  title: string;
  description?: string;
  price: number;
  userId: number;
  categoryId: number;
  media?: Array<{
    url: string;
  }>;
};

type CreateCategory = { name: string; description?: string };

type UpdateCategory = { name?: string; description?: string };

type CreateProductWithCategory = {
  title: string;
  description?: string;
  price: number;
  userId: number;
  category: {
    name: string;
    description?: string;
  };
  media?: Array<{
    url: string;
  }>;
};

type UpdateItem = {
  title?: string;
  description?: string;
  price?: number;
  categoryId?: number;
};

export default class ItemsQuery {
  route = "items";

  createItem = async (data: CreateProduct): Promise<ProductWithRelations> =>
    api.post(`${this.route}/`, data).then((res) => res.data);

  createItemsWithCategory = async (
    data: CreateProductWithCategory
  ): Promise<ProductWithRelations> =>
    api.post(`${this.route}/with-category`, data).then((res) => res.data);

  getAllItems = async (): Promise<ProductWithRelations[]> =>
    api.get(`${this.route}/`).then((res) => res.data);

  getItemById = async (id: number): Promise<ProductWithRelations | null> =>
    api.get(`${this.route}/${id}`).then((res) => res.data);

  updateItemById = async (
    id: number,
    data: UpdateItem
  ): Promise<ProductWithRelations | null> =>
    api.put(`${this.route}/${id}`, data).then((res) => res.data);

  deleteItem = async (id: number): Promise<Item | null> =>
    api.delete(`${this.route}/${id}`).then((res) => res.data);

  createCategory = async (data: CreateCategory): Promise<Category | null> =>
    api.post(`${this.route}/categories`, data).then((res) => res.data);

  getAllCategories = async (): Promise<CategoryWithItems[]> =>
    api.get(`${this.route}/categories`).then((res) => res.data);

  getCategoryById = async (id: number): Promise<CategoryWithItems | null> =>
    api.get(`${this.route}/categories/${id}`).then((res) => res.data);

  updateCategory = async (
    id: number,
    data: UpdateCategory
  ): Promise<Category | null> =>
    api.put(`${this.route}/categories/${id}`, data).then((res) => res.data);

  deleteCategory = async (id: number): Promise<Category | null> =>
    api.delete(`${this.route}/categories/${id}`).then((res) => res.data);

  getItemByCategory = async (id: number): Promise<ProductWithRelations[]> =>
    api.get(`${this.route}/categories/${id}`).then((res) => res.data);

  getItemByUser = async (id: number): Promise<ProductWithRelations[]> =>
    api.get(`${this.route}/vendor/${id}`).then((res) => res.data);
}
