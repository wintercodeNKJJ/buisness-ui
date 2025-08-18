import api from "./axios";

type RegisterUser = Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "resetToken" | "resetTokenExpiry"
> & { userType?: "client" | "vendor" | "admin" };

type LoginUser = { email: string; password: string };

type CreateAddress = Omit<Address, "id" | "userId">;

type UserWithRole = User & {
  roles: Role[];
};

export default class UserQuery {
  route = "/users";

  login = async (
    data: LoginUser
  ): Promise<{ user: User & { roles: Role[] } } | null> =>
    api.post(`${this.route}/login`, data).then((res) => res.data);

  register = async (data: RegisterUser): Promise<User> =>
    api.post(`${this.route}/register`, data).then((res) => res.data);

  verify = async (data: { token: string }): Promise<boolean> =>
    api.post(`${this.route}/verify-email`, data).then((res) => res.data);

  resendVerify = async (data: { email: string }): Promise<boolean> =>
    api.post(`${this.route}/resend-verification`, data).then((res) => res.data);

  forgotPass = async (data: { email: string }): Promise<boolean> =>
    api.post(`${this.route}/forgot-password`, data).then((res) => res.data);

  verifyResetToken = async (data: {
    token: string;
  }): Promise<{ user: User } | null> =>
    api.post(`${this.route}/verify-reset-token`, data).then((res) => res.data);

  resetPass = async (data: {
    token: string;
    newPassword: string;
  }): Promise<boolean> =>
    api.post(`${this.route}/reset-password`, data).then((res) => res.data);

  changePass = async (
    id: number,
    data: { currentPassword: string; newPassword: string }
  ): Promise<boolean> =>
    api
      .put(`${this.route}/${id}/change-password`, data)
      .then((res) => res.data);

  createAddress = async (id: number, data: CreateAddress): Promise<Address> =>
    api.post(`${this.route}/${id}/addresses`, data).then((res) => res.data);

  getAddress = async (id: number): Promise<Address | null | undefined> =>
    api.post(`${this.route}/${id}/addresses`).then((res) => res.data);

  getProfile = async () => api.post(`${this.route}/me`).then((res) => res.data);

  updateProfile = async (data: RegisterUser): Promise<UserWithRole> =>
    api.put(`${this.route}/me`, data).then((res) => res.data);

  deleteProfile = async (): Promise<User | null> =>
    api.delete(`${this.route}/me`).then((res) => res.data);

  getAllUsers = async (): Promise<User[]> =>
    api.post(`${this.route}/`).then((res) => res.data);

  getUserById = async (id: number): Promise<User | null> =>
    api.post(`${this.route}/${id}`).then((res) => res.data);

  updateUserById = async (
    id: number,
    data: RegisterUser
  ): Promise<User | null> =>
    api.post(`${this.route}/${id}`).then((res) => res.data);

  deleteUser = async (id: number): Promise<User | null> =>
    api.post(`${this.route}/${id}`).then((res) => res.data);
}
