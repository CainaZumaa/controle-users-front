import { getModulos, getModuloMaisAcessado, getModuloMenosAcessado } from "@/services/moduloService";
import Link from 'next/link';
import DeleteButton from "@/components/modulo/list/DeleteButton";
import { Modulo } from "@/types/Modulo"; // <-- Adicione esta importação

// Este é um Server Component: ele busca os dados no servidor antes de enviar a página para o navegador.
export default async function ModuloPage() {
  
  // --- CORREÇÃO APLICADA AQUI ---
  // Informamos ao TypeScript os tipos corretos desde o início.
  let modulos: Modulo[] = [];
  let maisAcessado: Modulo | null = null;
  let menosAcessado: Modulo | null = null;
  let error: string | null = null;
  // --- FIM DA CORREÇÃO ---

  try {
    // Usamos Promise.all para buscar todos os dados em paralelo e otimizar o tempo de carregamento.
    [modulos, maisAcessado, menosAcessado] = await Promise.all([
      getModulos(),
      getModuloMaisAcessado(),
      getModuloMenosAcessado(),
    ]);
  } catch (err) {
    // Capturamos qualquer erro que o serviço possa lançar
    error = err instanceof Error ? err.message : 'Ocorreu um erro ao carregar os dados.';
    console.error(error);
  }

  // Se um erro foi capturado, mostramos uma mensagem amigável.
  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Falha ao Carregar</h1>
        <p className="text-gray-700">{error}</p>
        <p className="mt-4">Por favor, verifique se o servidor backend está rodando e tente novamente.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Painel de Módulos</h1>
          <p className="text-lg text-gray-600">Gerencie e visualize os módulos do sistema.</p>
        </div>
        <Link href="/modulo/novo" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors">
            + Novo Módulo
        </Link>
      </header>

      {/* Seção de Estatísticas */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-xl mb-2">Módulo Mais Acessado</h2>
          <p className="text-lg">{maisAcessado?.nome || 'N/A'}</p>
          <span className="text-sm">Acessos: {maisAcessado?.acessos || 0}</span>
        </div>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-xl mb-2">Módulo Menos Acessado</h2>
          <p className="text-lg">{menosAcessado?.nome || 'N/A'}</p>
          <span className="text-sm">Acessos: {menosAcessado?.acessos || 0}</span>
        </div>
      </section>
      
      {/* Seção da Tabela de Módulos */}
      <section className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase">Nome</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase">Descrição</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody>
            {modulos.map((modulo) => (
              <tr key={modulo.id} className="hover:bg-gray-100">
                <td className="px-5 py-4 border-b text-sm">{modulo.nome}</td>
                <td className="px-5 py-4 border-b text-sm">{modulo.descricao}</td>
                <td className="px-5 py-4 border-b text-sm space-x-4">
                  <Link href={`/modulo/${modulo.id}`} className="text-indigo-600 hover:text-indigo-900">
                    Editar
                  </Link>
                  <DeleteButton id={modulo.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}