'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Modulo } from '@/types/Modulo';
import { createModulo, updateModulo } from '@/services/moduloService';

// Importações do Material-UI
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import ActionButton from '@/components/common/ActionButton';

interface ModuloFormProps {
  modulo?: Modulo; 
}

export default function ModuloForm({ modulo }: ModuloFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (modulo) {
      setFormData({
        nome: modulo.nome,
        descricao: modulo.descricao,
      });
    }
  }, [modulo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (modulo) {
        await updateModulo(modulo.id, formData);
      } else {
        await createModulo(formData);
      }
      router.push('/modulo');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        bgcolor: 'background.paper', 
        borderRadius: 2,
        boxShadow: 24, 
        maxWidth: '700px',
        mx: 'auto', 
      }}
    >
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}
        
        <TextField
          label="Nome do Módulo"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          fullWidth
        />
        
        <TextField
          label="Descrição"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          required
          fullWidth
          multiline
          rows={4}
        />

        <Stack direction="row" justifyContent="flex-end" spacing={2} pt={2}>
          <ActionButton
            type="button"
            onClick={() => router.push('/modulo')}
            color="secondary" 
            disabled={isLoading}
          >
            Cancelar
          </ActionButton>
          <ActionButton
            type="submit"
            color="primary" 
            disabled={isLoading}
          >
            {isLoading ? 'A guardar...' : (modulo ? 'Guardar Alterações' : 'Criar Módulo')}
          </ActionButton>
        </Stack>
      </Stack>
    </Box>
  );
}