import Box from '@mui/material/Box';
import PageHeader from '@/components/common/PageHeader';
import ModuloForm from '@/components/modulo/form/ModuloForm';

export default function NovoModuloPage() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 } }}>
      <PageHeader
        title="Criar Novo Módulo"
        subtitle="Preencha os dados abaixo para adicionar um novo módulo ao sistema."
      />

      <ModuloForm />
    </Box>
  );
}
