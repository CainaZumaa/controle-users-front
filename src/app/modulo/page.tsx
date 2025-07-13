// PASSO 1: Importar o tipo 'Modulo' para que o ficheiro o conheça.
import { Modulo } from "@/types/Modulo"; 
import { getModulos } from "@/services/moduloService";
import Box from '@mui/material/Box';
import PageHeader from "@/components/common/PageHeader";
import ActionButton from "@/components/common/ActionButton";
import ModuloDataTable from "@/components/modulo/list/ModuloDataTable";
import AddIcon from '@mui/icons-material/Add';

export default async function ModuloPage() {
  
  // PASSO 2: Declarar a variável com o tipo correto.
  let modulos: Modulo[] = [];
  let error: string | null = null;

  try {
    modulos = await getModulos();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Ocorreu um erro ao carregar os dados.';
    console.error(error);
  }

  if (error) {
    return (
      <Box component="main" sx={{ flexGrow: 1, p: 4, width: '100%', textAlign: 'center' }}>
        <PageHeader 
          title="Erro ao Carregar"
          subtitle={error}
        />
      </Box>
    );
  }
  
  return (
    <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 }, width: '100%' }}>
      
      <PageHeader 
        title="Painel de Módulos"
        subtitle="Gerencie, filtre e visualize todos os módulos do sistema de forma centralizada."
      />
      
      <Box sx={{ my: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <ActionButton
          href="/modulo/novo"
          startIcon={<AddIcon />}
          color="primary"
        >
          Novo Módulo
        </ActionButton>
      </Box>

      <ModuloDataTable modulos={modulos} />

    </Box>
  );
}
