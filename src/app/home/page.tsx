"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logout } from "@mui/icons-material";
import { User } from "../../types";

const decodeUTF8 = (str: string): string => {
  try {
    return decodeURIComponent(escape(str));
  } catch {
    return str;
  }
};

const HomePage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("usuario");

    if (!token) {
      router.push("/");
      return;
    }

    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        setUserName(user.nome || "Usuário");
      } catch {
        setUserName("Usuário");
      }
    } else {
      // Fallback para o token se não houver usuário no localStorage
      try {
        const [, payload] = token.split(".");
        const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        const { nome }: { nome: string } = JSON.parse(decoded);
        setUserName(decodeUTF8(nome));
      } catch {
        setUserName("Usuário");
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario"); // Limpar também o usuário
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-primary-main flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white/10 backdrop-blur-glass border border-white/20 rounded-3xl shadow-glass p-6">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold text-white">
              Bem-vindo, {userName}!
            </h1>

            <p className="text-text-secondary text-center">
              Você está logado com sucesso!
            </p>

            <button
              onClick={handleLogout}
              className="mt-2 bg-gradient-primary hover:bg-gradient-secondary hover:-translate-y-0.5 transition-all duration-300 ease-in-out text-text-primary font-bold shadow-button px-6 py-2 rounded-xl flex items-center gap-2"
            >
              <Logout className="w-5 h-5" />
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
