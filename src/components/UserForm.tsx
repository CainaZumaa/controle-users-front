"use client";

import React, { useState, useEffect } from "react";
import { UserFormData, UserResponse } from "../types";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { usePasswordValidation } from "../hooks/usePasswordValidation";

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
    senha: "",
    is_active: true,
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});
  const [showPassword, setShowPassword] = useState(false);

  const {
    strength,
    score,
    checks,
    recommendations,
    isLoading: isPasswordValidating,
    validatePassword,
  } = usePasswordValidation();

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");

    if (user) {
      setFormData({
        nome: user.nome,
        email: user.email,
        senha: "",
        is_active: user.is_active ?? true,
      });
    } else {
      // Limpar formulário quando criando novo usuário

      setFormData({
        nome: "",
        email: "",
        senha: "",
        is_active: true,
      });
    }
    // e limpar erros quando mudar o modo
    setErrors({});
    setShowPassword(false);
  }, [user]);

  // Validar senha em tempo real
  useEffect(() => {
    if (formData.senha) {
      validatePassword(formData.senha);
    }
  }, [formData.senha, validatePassword]);

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

    if (!user && !formData.senha) {
      newErrors.senha = "Senha é obrigatória";
    } else if (!user && formData.senha && strength === "weak") {
      newErrors.senha = "Senha muito fraca";
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
      const submitData = { ...formData };

      if (user && !submitData.senha) {
        delete submitData.senha;
      }

      if (!user) {
        delete submitData.is_active;
      }

      onSubmit(submitData);
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
          autoComplete="off"
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
          autoComplete="off"
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

      {/* Senha */}
      {!user && (
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white mb-2"
          >
            Senha *
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
              autoComplete="new-password"
              className={`w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all duration-200 ${
                errors.senha ? "border-error-main" : ""
              }`}
              placeholder="Digite a senha"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
              disabled={isLoading}
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.senha && (
            <p className="mt-1 text-sm text-error-light">{errors.senha}</p>
          )}
          {/* Indicador de força da senha */}
          {formData.senha && (
            <div className="mt-3">
              <PasswordStrengthIndicator
                password={formData.senha}
                strength={strength}
                score={score}
                checks={checks}
                recommendations={recommendations}
                isLoading={isPasswordValidating}
              />
            </div>
          )}
        </div>
      )}

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
