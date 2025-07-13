import { useState, useEffect, useCallback } from "react";
import { UserResponse, UserFormData, ApiError } from "../types";
import UserService from "../services/userService";

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

interface UseUsersReturn {
  users: UserResponse[];
  loading: boolean;
  error: string | null;
  notifications: Notification[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  createUser: (userData: UserFormData) => Promise<void>;
  updateUser: (id: string, userData: UserFormData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  loadUsers: (page?: number, limit?: number) => Promise<void>;
  clearError: () => void;
  removeNotification: (id: string) => void;
}

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const addNotification = useCallback(
    (message: string, type: "success" | "error" | "warning" | "info") => {
      const id = Date.now().toString();
      setNotifications((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 5000);
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const loadUsers = useCallback(
    async (page = 1, limit = 10) => {
      try {
        setLoading(true);
        setError(null);

        const response = await UserService.getUsers(page, limit);
        setUsers(response.users);

        // calc total de páginas
        const totalPages = Math.ceil(response.total / limit);

        setPagination({
          page: response.page,
          limit: response.limit,
          total: response.total,
          totalPages,
        });
      } catch (err) {
        const apiError = err as ApiError;
        const errorMessage = apiError.message || "Erro ao carregar usuários";
        setError(errorMessage);
        addNotification(errorMessage, "error");
      } finally {
        setLoading(false);
      }
    },
    [addNotification]
  );

  const createUser = useCallback(
    async (userData: UserFormData) => {
      try {
        setError(null);
        const newUser = await UserService.createUser(userData);
        setUsers((prev) => [...prev, newUser]);
        addNotification("Usuário criado com sucesso", "success");
      } catch (err) {
        const apiError = err as ApiError;
        const errorMessage = apiError.message || "Erro ao criar usuário";
        setError(errorMessage);
        addNotification(errorMessage, "error");
        throw err;
      }
    },
    [addNotification]
  );

  const updateUser = useCallback(
    async (id: string, userData: UserFormData) => {
      try {
        setError(null);
        const updatedUser = await UserService.updateUser({ id, ...userData });
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? updatedUser : user))
        );
        addNotification("Usuário atualizado com sucesso", "success");
      } catch (err) {
        const apiError = err as ApiError;
        const errorMessage = apiError.message || "Erro ao atualizar usuário";
        setError(errorMessage);
        addNotification(errorMessage, "error");
        throw err;
      }
    },
    [addNotification]
  );

  const deleteUser = useCallback(
    async (id: string) => {
      try {
        setError(null);
        await UserService.deleteUser(id);
        setUsers((prev) => prev.filter((user) => user.id !== id));
        addNotification("Usuário deletado com sucesso", "success");
      } catch (err) {
        const apiError = err as ApiError;
        const errorMessage = apiError.message || "Erro ao deletar usuário";
        setError(errorMessage);
        addNotification(errorMessage, "error");
        throw err;
      }
    },
    [addNotification]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    loadUsers(1, 10);
  }, [loadUsers]);

  return {
    users,
    loading,
    error,
    notifications,
    pagination,
    createUser,
    updateUser,
    deleteUser,
    loadUsers,
    clearError,
    removeNotification,
  };
};
