"use client";

import React, { useState, useMemo, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  Add,
  Search,
  Refresh,
  Person,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import { UserResponse, UserFormData } from "../types";
import { useUsers } from "../hooks/useUsers";
import Modal from "./Modal";
import UserForm from "./UserForm";
import Notification from "./Notification";
import { UserCreateRequest, UserUpdateRequest } from "../types";

interface UsersDataGridProps {
  className?: string;
}

const UsersDataGrid: React.FC<UsersDataGridProps> = ({ className = "" }) => {
  const {
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
  } = useUsers();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "create" | "edit" | "view" | "delete"
  >("create");
  const [formLoading, setFormLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserResponse | null>(null);
  const [formKey, setFormKey] = useState(0);

  // Filtra usuários por termo de busca
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Carregar usuários quando a paginação mudar
  useEffect(() => {
    const currentPage = paginationModel.page + 1;
    const currentLimit = paginationModel.pageSize;

    if (currentPage !== pagination.page || currentLimit !== pagination.limit) {
      loadUsers(currentPage, currentLimit);
    }
  }, [paginationModel, pagination.page, pagination.limit, loadUsers]);

  // Abrir modal
  const openModal = (
    type: "create" | "edit" | "view" | "delete",
    user?: UserResponse
  ) => {
    setModalType(type);
    setSelectedUser(user || null);
    setModalOpen(true);
    setFormKey((prev) => prev + 1);
    clearError();
  };

  // Fechar modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const openDeleteConfirm = (user: UserResponse) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setUserToDelete(null);
  };

  // Create usuário
  const handleCreateUser = async (userData: UserFormData) => {
    try {
      setFormLoading(true);
      const createData: UserCreateRequest = {
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha!,
      };
      await createUser(createData);
      closeModal();
      // Recarregar a página atual após criar
      loadUsers(pagination.page, pagination.limit);
    } catch (err) {
      // Erro já é tratado pelo hook
    } finally {
      setFormLoading(false);
    }
  };

  // Update usuário
  const handleUpdateUser = async (userData: UserFormData) => {
    if (!selectedUser) return;

    try {
      setFormLoading(true);
      // Converter UserFormData para UserUpdateRequest
      const updateData: UserUpdateRequest = {
        id: selectedUser.id,
        nome: userData.nome,
        email: userData.email,
        is_active: userData.is_active,
      };
      // Adicionar senha apenas se foi fornecida
      if (userData.senha) {
        updateData.senha = userData.senha;
      }
      await updateUser(updateData);
      closeModal();
      // Recarregar a página atual após atualizar
      loadUsers(pagination.page, pagination.limit);
    } catch (err) {
      // Erro já é tratado pelo hook
    } finally {
      setFormLoading(false);
    }
  };

  // Deletar usuário
  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.id);
      closeDeleteConfirm();
      // Recarregar a página atual após deletar
      loadUsers(pagination.page, pagination.limit);
    } catch (err) {
      // Erro já é tratado pelo hook
    }
  };

  // Formatar data
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Columns do DataGrid
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      sortable: false,
    },
    {
      field: "foto_perfil",
      headerName: "Foto",
      width: 80,
      sortable: false,
      renderCell: (params: any) => (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
          {params.value ? (
            <img
              src={params.value}
              alt="Foto de perfil"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <Person className="w-6 h-6 text-white/60" />
          )}
        </div>
      ),
    },
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 120,
      sortable: false,
      renderCell: (params: any) => (
        <div className="flex items-center space-x-2">
          {params.value ? (
            <CheckCircle className="w-4 h-4 text-success-main" />
          ) : (
            <Cancel className="w-4 h-4 text-error-main" />
          )}
          <span
            className={params.value ? "text-success-light" : "text-error-light"}
          >
            {params.value ? "Ativo" : "Inativo"}
          </span>
        </div>
      ),
    },
    {
      field: "created_at",
      headerName: "Criado em",
      width: 150,
      sortable: false,
      renderCell: (params: any) => (
        <span className="text-white/70 text-sm">
          {formatDate(params.value)}
        </span>
      ),
    },
    {
      field: "last_login",
      headerName: "Último Login",
      width: 150,
      sortable: false,
      renderCell: (params: any) => (
        <span className="text-white/70 text-sm">
          {formatDate(params.value)}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 200,
      sortable: false,
      renderCell: (params: any) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => openModal("view", params.row)}
            className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
            title="Visualizar"
          >
            <Visibility className="w-4 h-4" />
          </button>
          <button
            onClick={() => openModal("edit", params.row)}
            className="p-2 text-success-main hover:text-success-light transition-colors"
            title="Editar"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => openDeleteConfirm(params.row)}
            className="p-2 text-error-main hover:text-error-light transition-colors"
            title="Deletar"
          >
            <Delete className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  // Render modal baseado no tipo
  const renderModalContent = () => {
    switch (modalType) {
      case "create":
        return (
          <UserForm
            key={`create-form-${formKey}`}
            onSubmit={handleCreateUser}
            onCancel={closeModal}
            isLoading={formLoading}
          />
        );
      case "edit":
        return (
          <UserForm
            key={`edit-form-${selectedUser?.id}-${formKey}`}
            user={selectedUser}
            onSubmit={handleUpdateUser}
            onCancel={closeModal}
            isLoading={formLoading}
          />
        );
      case "view":
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                {selectedUser?.foto_perfil ? (
                  <img
                    src={selectedUser.foto_perfil}
                    alt="Foto de perfil"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <Person className="w-8 h-8 text-white/60" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {selectedUser?.nome}
                </h3>
                <p className="text-white/70">{selectedUser?.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  {selectedUser?.is_active ? (
                    <CheckCircle className="w-4 h-4 text-success-main" />
                  ) : (
                    <Cancel className="w-4 h-4 text-error-main" />
                  )}
                  <span
                    className={
                      selectedUser?.is_active
                        ? "text-success-light"
                        : "text-error-light"
                    }
                  >
                    {selectedUser?.is_active ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-white/70">ID</label>
                <p className="text-white">{selectedUser?.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-white/70">
                  Nome
                </label>
                <p className="text-white">{selectedUser?.nome}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-white/70">
                  Email
                </label>
                <p className="text-white">{selectedUser?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-white/70">
                  Criado em
                </label>
                <p className="text-white">
                  {formatDate(selectedUser?.created_at)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-white/70">
                  Último Login
                </label>
                <p className="text-white">
                  {formatDate(selectedUser?.last_login)}
                </p>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-gradient-primary hover:bg-gradient-primary-dark text-white font-bold rounded-xl shadow-button transition-all duration-300 ease-in-out"
              >
                Fechar
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case "create":
        return "Criar Novo Usuário";
      case "edit":
        return "Editar Usuário";
      case "view":
        return "Detalhes do Usuário";
      case "delete":
        return "Confirmar Exclusão";
      default:
        return "";
    }
  };

  return (
    <>
      <div
        className={`bg-white/10 border border-white/20 rounded-2xl shadow-glass p-6 ${className}`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Gerenciamento de Usuários
            </h2>
            <p className="text-white/70">
              {loading
                ? "Carregando usuários..."
                : `${pagination.total} usuários total`}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => loadUsers(pagination.page, pagination.limit)}
              disabled={loading}
              className="p-3 text-white/70 hover:text-white transition-colors"
              title="Atualizar"
            >
              {loading ? (
                <CircularProgress size={20} className="text-white" />
              ) : (
                <Refresh className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => openModal("create")}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-primary hover:bg-gradient-primary-dark text-white font-bold rounded-xl shadow-button transition-all duration-300 ease-in-out"
            >
              <Add className="w-5 h-5" />
              <span>Novo Usuário</span>
            </button>
          </div>
        </div>

        {/*Search Bar*/}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all duration-200"
            />
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-white/60">
              Mostrando {filteredUsers.length} de {users.length} usuários na
              página atual
            </p>
          )}
        </div>

        {/* Mensagem de erro */}
        {error && (
          <div className="mb-4 p-4 bg-error-main/20 border border-error-main/30 rounded-xl text-error-light">
            {error}
          </div>
        )}

        {/* DataGrid */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px] h-[600px]">
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              loading={loading}
              pagination
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5, 10, 25, 50]}
              rowCount={pagination.total}
              paginationMode="server"
              disableRowSelectionOnClick
              sx={{
                backgroundColor: "transparent",
                border: "none",
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "white",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "white",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  color: "white",
                  fontWeight: "600",
                },
                "& .MuiDataGrid-columnHeaderTitleContainer": {
                  color: "white",
                },
                "& .MuiDataGrid-columnHeaderTitleContainerContent": {
                  color: "white",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white",
                },
                "& .MuiTablePagination-root": {
                  color: "white",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "transparent",
                },
                "& .MuiDataGrid-columnSeparator": {
                  color: "rgba(255, 255, 255, 0.2)",
                },
                "& .MuiDataGrid-columnHeader:focus": {
                  outline: "none",
                },
                "& .MuiDataGrid-columnHeader:focus-within": {
                  outline: "none",
                },
                "& .MuiDataGrid-overlay": {
                  backgroundColor: "transparent",
                  color: "rgba(255, 255, 255, 0.7)",
                },
                "& .MuiDataGrid-overlayWrapper": {
                  backgroundColor: "transparent",
                },
                "& .MuiDataGrid-overlayWrapperInner": {
                  backgroundColor: "transparent",
                },
                "& .MuiDataGrid-overlayWrapperInner .MuiDataGrid-overlay": {
                  backgroundColor: "transparent",
                  color: "rgba(255, 255, 255, 0.7)",
                },
              }}
            />
          </div>
        </div>

        {/* Modal */}
        <Modal
          open={modalOpen}
          onClose={closeModal}
          title={getModalTitle()}
          maxWidth={modalType === "view" ? "sm" : "md"}
        >
          {renderModalContent()}
        </Modal>

        {/* Modal de confirmação de exclusão */}
        <Modal
          open={deleteConfirmOpen}
          onClose={closeDeleteConfirm}
          title="Confirmar Exclusão"
          maxWidth="sm"
        >
          <div className="text-center py-6">
            <p className="text-white/70 text-lg">
              Tem certeza que deseja excluir o usuário "{userToDelete?.nome}"?
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={closeDeleteConfirm}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-xl shadow-button transition-all duration-300 ease-in-out"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-6 py-3 bg-error-main hover:bg-error-dark text-white font-bold rounded-xl shadow-button transition-all duration-300 ease-in-out"
              >
                Excluir
              </button>
            </div>
          </div>
        </Modal>
      </div>

      {/* Notificações */}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          isVisible={true}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </>
  );
};

export default UsersDataGrid;
