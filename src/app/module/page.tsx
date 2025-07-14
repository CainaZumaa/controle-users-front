"use client";

import Table from "@/components/Table";
import api from "@/services/API";
import { useEffect, useState } from "react";

type Modulo = {
  id: number;
  nome: string;
  descricao: string;
};

export default function ModulePage() {
  const [modulos, setModulos] = useState<Modulo[]>([]);
  useEffect(() => {
    api
      .get("/modulos")
      .then((response) => setModulos(response.data))
      .catch((error) => console.error("Erro:", error));
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-primary-main overflow-y-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">MODULOS</h1>
        <div>
          <Table modulos={modulos} />
        </div>
      </div>
    </div>
  );
}
