'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteModulo } from '@/services/moduloService';

// A palavra "default" aqui é a chave da solução.
export default function DeleteButton({ id }: { id: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja excluir este módulo?')) {
      setIsLoading(true);
      try {
        await deleteModulo(id);
        router.refresh(); 
      } catch (error) {
        console.error(error);
        alert('Ocorreu um erro ao excluir o módulo.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Excluindo...' : 'Excluir'}
    </button>
  );
}
