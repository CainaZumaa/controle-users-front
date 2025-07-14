"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AuthenticatedLayout from "./AuthenticatedLayout";
import LoadingSpinner from "./LoadingSpinner";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Rotas que não precisam de autenticação
  const publicRoutes = ["/"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        if (!isPublicRoute) {
          router.push("/");
        }
        setIsLoading(false);
        return;
      }

      try {
        // Verify token no backend
        const response = await fetch("http://localhost:3000/auth/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.valid) {
          setIsAuthenticated(true);
          if (isPublicRoute) {
            // Se está em rota pública mas autenticado, ir para home
            router.push("/home");
          }
        } else {
          // Token inválido
          localStorage.removeItem("token");
          localStorage.removeItem("usuario");
          setIsAuthenticated(false);
          if (!isPublicRoute) {
            router.push("/");
          }
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setIsAuthenticated(false);
        if (!isPublicRoute) {
          router.push("/");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router, isPublicRoute]);

  // Loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-main">
        <LoadingSpinner
          message="Verificando autenticação..."
          fullScreen={true}
        />
      </div>
    );
  }

  // qnd a route é pública sempre mostra sem Topbar/Sidebar
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // if, não está autenticado && não é rota pública -> mostrar loading até redirecionar
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary-main">
        <LoadingSpinner message="Redirecionando..." fullScreen={true} />
      </div>
    );
  }

  // Usuário autenticado, mostrar conteúdo com Topbar e Sidebar
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
};

export default AuthGuard;
