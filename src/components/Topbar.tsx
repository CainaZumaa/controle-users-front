"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AccountCircle, Logout } from "@mui/icons-material";
import { User } from "../types";

const Topbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState<string>("");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("usuario") : null;
    if (token && storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        setUserName(user.nome || "Usuário");
        setIsAuth(true);
      } catch {
        setUserName("Usuário");
        setIsAuth(true);
      }
    } else {
      setIsAuth(false);
    }
  }, [pathname]);

  // Não renderiza na tela de login ou se não autenticado
  if (!isAuth || pathname === "/") return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white/10 backdrop-blur-glass border-b border-white/20 z-50 flex items-center justify-between px-6 shadow-glass">
      <button
        className="flex items-center gap-2 text-white hover:text-primary-light transition-colors"
        onClick={() => router.push("/home")}
        aria-label="Ir para Home"
      >
        <AccountCircle className="w-8 h-8 " />
      </button>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline text-white font-semibold truncate max-w-[160px]">
          Bem-vindo, {userName}!
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gradient-primary hover:bg-gradient-primary-dark text-white font-bold px-4 py-2 rounded-xl shadow-button transition-all duration-300 ease-in-out"
        >
          <Logout className="w-5 h-5" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
