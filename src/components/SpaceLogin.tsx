"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AccountCircle,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowForward,
  CheckCircle,
} from "@mui/icons-material";
import AnimatedBackground from "./AnimatedBackground";
import GoogleLoginButton from "./GoogleLoginButton";
import { LoginFormData, AuthResponse, User } from "../types";

interface LoginResponse {
  token: string;
  usuario: User;
}

interface ValidateTokenResponse {
  valid: boolean;
  user?: {
    id: number;
    email: string;
    is_active: boolean;
  };
  token_info?: {
    issued_at: string;
    expires_at: string;
    expires_in_seconds: number;
  };
  error?: string;
}

// Atualizar o tipo User para incluir is_active
interface ExtendedUser extends User {
  is_active?: boolean;
}

const SpaceLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMagicMode, setIsMagicMode] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<ExtendedUser | null>(null);

  // Verificar autenticação qnd carregar
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3000/auth/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data: ValidateTokenResponse = await response.json();

      if (data.valid && data.user) {
        setIsAuthenticated(true);
        setUser({
          id: data.user.id.toString(),
          email: data.user.email,
          nome: data.user.email.split("@")[0], // Fallback
          is_active: data.user.is_active,
        });
        router.push("/home");
      } else {
        // Token inválido -> limpar local Storage
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      let endpoint: string;
      let requestBody: any;

      if (isMagicMode) {
        // Magic Link - only email
        endpoint = "/auth/magic";
        requestBody = {
          email: formData.email,
        };
      } else {
        // Login tradicional
        endpoint = "/auth/login";
        requestBody = {
          email: formData.email,
          senha: formData.password,
        };
      }

      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer login");
      }

      if (isMagicMode) {
        setSuccess("Link de acesso enviado! Verifique seu email.");
      } else {
        // Login tradicional OK
        const loginData = data as LoginResponse;

        localStorage.setItem("token", loginData.token);
        localStorage.setItem("usuario", JSON.stringify(loginData.usuario));

        setUser(loginData.usuario);
        setIsAuthenticated(true);
        setSuccess("Login realizado com sucesso!");

        setTimeout(() => {
          router.push("/home");
        }, 1000);
      }
    } catch (error) {
      console.error("❌ Erro no login:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Erro ao fazer login. Verifique suas credenciais."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = (data: AuthResponse) => {
    setSuccess("Login com Google realizado com sucesso!");

    // Salvar token e dados do usuário no localStorage
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    if (data.usuario) {
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      setUser(data.usuario);
      setIsAuthenticated(true);
    }

    setTimeout(() => {
      router.push("/home");
    }, 1000);
  };

  const handleGoogleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const toggleMode = () => {
    setIsMagicMode(!isMagicMode);
  };

  // Se já estiver autenticado, redirecionar para home
  if (isAuthenticated && user) {
    router.push("/home");
    return null; // Não renderizAr nada enquanto redireciona
  }

  return (
    <div className="h-screen relative flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-md w-full mx-4">
        <div className="animate-fade-in">
          {/* Logo e Título */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-secondary mb-4">
              <AccountCircle className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-2 text-white bg-transparent whitespace-nowrap">
              Users Management
            </h1>
            <p className="text-text-secondary">Your user control, simplified</p>
          </div>

          {/* Card de Login */}
          <div className="animate-scale-in">
            <div className="bg-white/10 backdrop-blur-glass border border-white/20 rounded-3xl shadow-glass p-6">
              {/* Alternador de Modo */}
              <div className="flex justify-center mb-6">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isMagicMode}
                      onChange={toggleMode}
                    />
                    <div className="block bg-white/30 w-14 h-8 rounded-full"></div>
                    <div
                      className={`absolute left-1 top-1 bg-gradient-secondary w-6 h-6 rounded-full transition-transform duration-300 ${
                        isMagicMode ? "translate-x-6" : ""
                      }`}
                    ></div>
                  </div>
                  <span className="ml-3 text-text-primary">
                    {isMagicMode ? "🔐 Login with Password" : "✨ Email Link"}
                  </span>
                </label>
              </div>

              {error && (
                <div className="w-full mb-4 p-4 bg-error-main/20 border border-error-main/50 text-error-light rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="w-full mb-4 p-4 bg-success-main/20 border border-success-main/50 text-success-light rounded-lg">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Campo de Email */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Email className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-black/30 text-text-primary border border-primary-main rounded-xl transition-all duration-200 focus:border-white focus:outline-none placeholder-text-secondary"
                    placeholder="Email Address"
                  />
                </div>

                {/* Campo de Senha (apenas no login tradicional) */}
                {!isMagicMode && (
                  <div className="relative animate-fade-in">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-12 py-3 bg-black/30 text-text-primary border border-primary-main rounded-xl transition-all duration-200 focus:border-white focus:outline-none placeholder-text-secondary"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <VisibilityOff className="w-5 h-5" />
                      ) : (
                        <Visibility className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    !formData.email ||
                    (!isMagicMode && !formData.password)
                  }
                  className="w-full mt-2 py-3 px-4 bg-gradient-primary text-text-primary font-bold rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-secondary hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-button flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {isMagicMode ? "Sending magic link..." : "Signing in..."}
                    </>
                  ) : (
                    <>
                      {isMagicMode ? "Log in with email" : "Sign in"}
                      <ArrowForward className="w-5 h-5" />
                    </>
                  )}
                </button>

                <GoogleLoginButton
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  isLoading={isLoading}
                />
              </form>

              {/* Informação adicional pra magic login */}
              {isMagicMode && (
                <div className="mt-6 p-4 bg-primary-main/20 border border-primary-main/70 text-white rounded-lg animate-fade-in">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5" />
                    <span>
                      ✨ We'll send you a secure login link - no password
                      needed!
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-text-secondary">
              Secure • Fast • Modern
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceLogin;
