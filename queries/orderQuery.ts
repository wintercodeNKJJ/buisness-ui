import axios from "./axios";

type CreateOrder = {
  userId: number;
  totalAmount: number;
  items: Array<{
    itemId: number;
    quantity: number;
    price: number;
  }>;
};

type CreateTransaction = {
  orderId: number;
  amount: number;
  method: string;
};

type OrderStats = {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<string, number>;
};

export default class OrderQuery {
  route = "/orders";
  createOrder = async (data: CreateOrder): Promise<OrderWithRelations> =>
    axios.post(`${this.route}/`, data).then((res) => res.data);

  getAll = async (): Promise<OrderWithRelations[]> =>
    axios.get(`${this.route}/`).then((res) => res.data);

  getStat = async (id?: number): Promise<OrderStats> =>
    axios.get(`${this.route}/stats?userId=${id}`).then((res) => res.data);

  getByStatus = async (status: string): Promise<OrderWithRelations[]> =>
    axios
      .get(`${this.route}/by-status?status=${status}`)
      .then((res) => res.data);

  getByDateRange = async (data: {
    start: string;
    end: string;
  }): Promise<OrderWithRelations[]> =>
    axios
      .get(`${this.route}/by-date-range?start=${data.start}&end=${data.end}`)
      .then((res) => res.data);

  getOrderByAmountRange = async (data: {
    min: number;
    max: number;
  }): Promise<OrderWithRelations[]> =>
    axios
      .get(`${this.route}/by-amount-range?min=${data.min}&max=${data.max}`)
      .then((res) => res.data);

  getOrdersByUserId = async (id: number): Promise<OrderWithRelations[]> =>
    axios.get(`${this.route}/user/${id}`).then((res) => res.data);

  getOrderById = async (id: number) =>
    axios.get(`${this.route}/${id}`).then((res) => res.data);

  getOrderStatus = async (id: number) =>
    axios.get(`${this.route}/${id}/status`).then((res) => res.data);

  deleteOrder = async (id: number) =>
    axios.delete(`${this.route}/${id}`).then((res) => res.data);

  createTransaction = async (id: number, data: CreateTransaction) =>
    axios
      .post(`${this.route}/transactions/${id}/status`, data)
      .then((res) => res.data);
}
