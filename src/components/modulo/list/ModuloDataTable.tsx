'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Importações do Material-UI
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

// Importações da Data Grid
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
} from '@mui/x-data-grid';

// Tipos e Serviços
import { Modulo } from '@/types/Modulo';
import { deleteModulo } from '@/services/moduloService';

// Ícones
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Propriedades para o componente ModuloDataTable.
 * @param {Modulo[]} modulos - A lista de módulos a serem exibidos na tabela.
 */
interface ModuloDataTableProps {
  modulos: Modulo[];
}

/**
 * ModuloDataTable é um componente cliente que exibe os módulos numa tabela avançada,
 * com funcionalidades de ordenação, paginação e ações (editar, deletar).
 */
export default function ModuloDataTable({ modulos }: ModuloDataTableProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<GridRowId | null>(null);

  /**
   * Lida com a ação de clique para deletar um módulo.
   * Pede confirmação, exibe um estado de carregamento e atualiza a tabela ao concluir.
   * @param {GridRowId} id - O ID do módulo a ser deletado.
   */
  const handleDelete = async (id: GridRowId) => {
    // Usamos o 'confirm' do navegador como uma camada simples de segurança
    if (window.confirm('Tem a certeza que deseja excluir este módulo?')) {
      setIsDeleting(id);
      try {
        await deleteModulo(id as number);
        router.refresh(); // Atualiza os dados do Server Component pai
      } catch (error) {
        console.error('Falha ao deletar:', error);
        alert('Ocorreu um erro ao excluir o módulo.');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  // Definição das colunas para a Data Grid
  const columns: GridColDef<Modulo>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nome', headerName: 'Nome', flex: 1, minWidth: 150 },
    { field: 'descricao', headerName: 'Descrição', flex: 2, minWidth: 250 },
    {
      field: 'acessos',
      headerName: 'Acessos',
      type: 'number',
      width: 110,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        // Se a linha atual estiver a ser deletada, mostramos um ícone de carregamento
        if (isDeleting === id) {
          return [<CircularProgress size={24} key="deleting" sx={{ m: 1 }} />];
        }

        return [
          <Tooltip title="Editar" key="edit">
            <IconButton onClick={() => router.push(`/modulo/${id}`)}>
              <EditIcon />
            </IconButton>
          </Tooltip>,
          <Tooltip title="Deletar" key="delete">
            <IconButton onClick={() => handleDelete(id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>,
        ];
      },
    },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          // Props de Dados
          rows={modulos}
          columns={columns}
          
          // Props de Paginação e Ordenação
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
            sorting: {
              sortModel: [{ field: 'nome', sort: 'asc' }],
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          
          // Props de Comportamento e Estilo
          disableRowSelectionOnClick
          sx={{
            '--DataGrid-overlayHeight': '300px', // Ajusta a altura da mensagem "Nenhuma linha"
            border: '1px solid rgba(255, 255, 255, 0.12)',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'background.paper',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            },
          }}
        />
      </Box>
    </Box>
  );
}
