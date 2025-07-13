import axios from "axios";
import {
  UserResponse,
  UserCreateRequest,
  UserUpdateRequest,
  UserDeleteRequest,
  UsersListResponse,
  ApiResponse,
  ApiError,
} from "../types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// interceptor p/ tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || "Erro na requisição",
      status: error.response?.status || 500,
      details: error.response?.data,
    };
    return Promise.reject(apiError);
  }
);

export class UserService {
  // Listar usuários com paginação
  static async getUsers(page = 1, limit = 10): Promise<UsersListResponse> {
    try {
      const response = await api.get(`/usuarios?page=${page}&limit=${limit}`);

      const apiData = response.data;
      const users = apiData.data.map((user: any) => ({
        id: user.id.toString(),
        nome: user.nome,
        email: user.email,
        foto_perfil: user.foto_perfil,
        is_active: user.is_active,
        created_at: user.created_at,
        last_login: user.last_login,
      }));

      return {
        users,
        total: apiData.pagination?.total || users.length,
        page: apiData.pagination?.page || page,
        limit: apiData.pagination?.limit || limit,
      };
    } catch (error) {
      throw error as ApiError;
    }
  }

  // Search usuário por ID
  static async getUserById(id: string): Promise<UserResponse> {
    try {
      const response = await api.get(`/usuarios/${id}`);
      const user = response.data.data;

      return {
        id: user.id.toString(),
        nome: user.nome,
        email: user.email,
        foto_perfil: user.foto_perfil,
        is_active: user.is_active,
        created_at: user.created_at,
        last_login: user.last_login,
      };
    } catch (error) {
      throw error as ApiError;
    }
  }

  // Create novo usuário
  static async createUser(userData: UserCreateRequest): Promise<UserResponse> {
    const response = await api.post("/usuarios", userData);
    const user = response.data.data;
    return {
      id: user.id.toString(),
      nome: user.nome,
      email: user.email,
      foto_perfil: user.foto_perfil || null,
      is_active: user.is_active,
      created_at: user.created_at,
      last_login: user.last_login,
    };
  }

  // Update usuário
  static async updateUser(userData: UserUpdateRequest): Promise<UserResponse> {
    try {
      const { id, ...data } = userData;

      const updateData: any = {};

      if (data.nome) updateData.nome = data.nome;
      if (data.email) updateData.email = data.email;
      if (data.senha) updateData.senha = data.senha;
      if (data.is_active !== undefined) updateData.is_active = data.is_active;

      const response = await api.put(`/usuarios/${id}`, updateData);

      // Tratar diferentes formatos de resposta
      let user;
      if (response.data && response.data.data) {
        user = response.data.data;
      } else if (response.data && response.data.user) {
        user = response.data.user;
      } else if (response.data && response.data.id) {
        user = response.data;
      } else {
        user = {
          id: id,
          nome: data.nome,
          email: data.email,
          is_active: data.is_active,
          foto_perfil: null,
          created_at: new Date().toISOString(),
          last_login: null,
        };
      }

      return {
        id: user?.id?.toString() || id,
        nome: user?.nome || data.nome || "",
        email: user?.email || data.email || "",
        foto_perfil: user?.foto_perfil || null,
        is_active:
          user?.is_active !== undefined ? user.is_active : data.is_active,
        created_at: user?.created_at || new Date().toISOString(),
        last_login: user?.last_login || null,
      };
    } catch (error) {
      console.error("Error updating user:", error);
      throw error as ApiError;
    }
  }

  // Delete usuário
  static async deleteUser(id: string): Promise<void> {
    try {
      await api.delete(`/usuarios/${id}`);
    } catch (error) {
      throw error as ApiError;
    }
  }
}

export default UserService;
