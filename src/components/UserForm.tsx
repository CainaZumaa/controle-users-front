"use client";

import React, { useState, useEffect } from "react";
import { UserFormData, UserResponse } from "../types";

interface UserFormProps {
  user?: UserResponse | null;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    nome: "",
    email: "",
    is_active: true,
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome,
        email: user.email,
        is_active: user.is_active ?? true,
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    } else if (formData.nome.length < 2) {
      newErrors.nome = "Nome deve ter pelo menos 2 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "is_active" ? value === "true" : value,
    }));

    // Limpar erro do campo qnd o user começa a digitar
    if (errors[name as keyof UserFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nome */}
      <div>
        <label
          htmlFor="nome"
          className="block text-sm font-medium text-white mb-2"
        >
          Nome *
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all duration-200 ${
            errors.nome ? "border-error-main" : ""
          }`}
          placeholder="Digite o nome completo"
          disabled={isLoading}
        />
        {errors.nome && (
          <p className="mt-1 text-sm text-error-light">{errors.nome}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-white mb-2"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all duration-200 ${
            errors.email ? "border-error-main" : ""
          }`}
          placeholder="Digite o email"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error-light">{errors.email}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label
          htmlFor="is_active"
          className="block text-sm font-medium text-white mb-2"
        >
          Status *
        </label>
        <select
          id="is_active"
          name="is_active"
          value={formData.is_active ? "true" : "false"}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all duration-200 ${
            errors.is_active ? "border-error-main" : ""
          }`}
          disabled={isLoading}
        >
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>
        {errors.is_active && (
          <p className="mt-1 text-sm text-error-light">{errors.is_active}</p>
        )}
      </div>

      {/* Botões */}
      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-6 py-3 text-white/70 hover:text-white transition-colors duration-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-primary hover:bg-gradient-primary-dark text-white font-bold rounded-xl shadow-button transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Salvando..." : user ? "Atualizar" : "Criar"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
