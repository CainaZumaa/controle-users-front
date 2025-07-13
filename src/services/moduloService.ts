import { Modulo } from "@/types/Modulo";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";


export const getModulos = async (): Promise<Modulo[]> => {
  const response = await fetch(`${API_URL}/modulos`);
  if (!response.ok) {
    throw new Error("Falha ao buscar a lista de módulos");
  }
  return response.json();
};


export const getModuloMaisAcessado = async (): Promise<Modulo> => {
  const response = await fetch(`${API_URL}/modulos/mais-acessado`);
  if (!response.ok) {
    throw new Error("Falha ao buscar o módulo mais acessado");
  }
  return response.json();
};


export const getModuloMenosAcessado = async (): Promise<Modulo> => {
  const response = await fetch(`${API_URL}/modulos/menos-acessado`);
  if (!response.ok) {
    throw new Error("Falha ao buscar o módulo menos acessado");
  }
  return response.json();
};


export const getModulo = async (id: number): Promise<Modulo> => {
  const response = await fetch(`${API_URL}/modulos/${id}`);
  if (!response.ok) {
    throw new Error(`Falha ao buscar o módulo com ID: ${id}`);
  }
  return response.json();
};


export const createModulo = async (dados: Omit<Modulo, 'id' | 'acessos'>): Promise<Modulo> => {
  const response = await fetch(`${API_URL}/modulos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!response.ok) {
    throw new Error("Falha ao criar módulo");
  }
  return response.json();
};

 
export const updateModulo = async (id: number, dados: Partial<Omit<Modulo, 'id' | 'acessos'>>): Promise<Modulo> => {
  const response = await fetch(`${API_URL}/modulos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!response.ok) {
    throw new Error(`Falha ao atualizar o módulo com ID: ${id}`);
  }
  return response.json();
};



export const deleteModulo = async (id: number): Promise<Modulo> => {
  const response = await fetch(`${API_URL}/modulos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Falha ao deletar o módulo com ID: ${id}`);
  }
  return response.json();
};



 * Incrementa o contador de acessos de um módulo.
 */
export const incrementarAcesso = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/modulos/${id}/incrementar-acesso`, { method: 'POST' });
  if (!response.ok) {
    // Apenas loga o erro para não quebrar a navegação do usuário
    console.error(`Falha ao incrementar acesso para o módulo ${id}`);
  }
};

export const deleteModulo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/modulos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Falha ao deletar o módulo com ID: ${id}`);
  }
 
};