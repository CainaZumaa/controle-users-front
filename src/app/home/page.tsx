"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    <div className="h-screen bg-primary-main flex items-center justify-center overflow-hidden">
      {/* Conteúdo da página aqui */}
    </div>
  );
};

export default HomePage;
