"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../../types";
import StartButton from "../../components/StartButton";

const decodeUTF8 = (str: string): string => {
  try {
    return decodeURIComponent(str);
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

  return (
    <div className="h-screen bg-primary-main flex items-center justify-center overflow-hidden">
      <div className="max-w-1xl w-full flex flex-col items-center text-center gap-8 py-12">
        <h1 className="text-4xl md:text-4xl font-extrabold text-white drop-shadow-lg">
          Seu sistema de gerenciamento de usuários
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-4">
          Organize, controle e simplifique o acesso dos seus usuários com
          segurança e praticidade.
        </p>
        <div className="w-full flex justify-center">
          <img
            src="/personal_data.svg"
            alt="Gerenciamento de Usuários"
            className="w-full max-w-sm md:max-w-md h-auto drop-shadow-2xl rounded-2xl bg-white/10 p-2"
            draggable="false"
          />
        </div>
        <StartButton />
      </div>
    </div>
  );
};

export default HomePage;
