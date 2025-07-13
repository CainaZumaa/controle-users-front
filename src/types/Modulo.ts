
export interface Modulo {
  id: number;
  nome: string;
  descricao: string;
  acessos?: number; // O '?' indica que este campo é opcional
}