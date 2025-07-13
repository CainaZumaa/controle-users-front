import { getModulo, incrementarAcesso } from "@/services/moduloService";
import ModuloForm from "@/components/modulo/form/ModuloForm";
import Box from '@mui/material/Box';
import PageHeader from "@/components/common/PageHeader";
import { notFound } from "next/navigation";


export default async function EditarModuloPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    notFound();
  }

  try {

    const modulo = await getModulo(id);
    

    incrementarAcesso(id).catch(console.error);

    return (
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 } }}>
        <PageHeader 
          title="Editar Módulo"
          subtitle={`A alterar os dados do módulo "${modulo.nome}".`}
        />


        <ModuloForm modulo={modulo} />
      </Box>
    );

  } catch (error) {
 
    notFound();
  }
}
