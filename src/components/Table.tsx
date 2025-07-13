import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import api from '../services/API';

type Modulo = {
    id: number;
    nome: string;
    descricao: string;
}

type Lines = {
    modulos: Modulo[];
}

export default function Table({ modulos }: Lines) {
    const [Dados, setDados] = useState<Modulo[]>(modulos);
    useEffect(() => {
        setDados(modulos);
    }, [modulos]);
    
    const [isEditingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<Modulo | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [novoModulo, setNovoModulo] = useState<Modulo>({ id: 0, nome: '', descricao: '' });

    const startEditing = (modulo: Modulo) => {
        setEditingId(modulo.id);
        setEditData({ ...modulo });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditData(null);
    };

    const saveEditing = () => {
        console.log("Salvando dados:", editData);
        if (editData) {
            handllerEdita(editData)
        }
        cancelEditing();
    };

    const handleChange = (field: keyof Modulo, value: string) => {
        if (editData) {
            setEditData({ ...editData, [field]: value });
        }
    };

    function handleNovModulo(data: Modulo) {
        api.post("/modulos", { nome: data.nome, descricao: data.descricao })
            .then(response => console.log(response))
            .catch(error => console.log("Deu ruim: " + error))
    }

    function handllerEdita(data: Modulo) {
        api.put(`/modulos/${data.id}`, { nome: data.nome, descricao: data.descricao })
            .then(response => {
                console.log(response);
                if (editData) {
                    setDados((prev) =>
                        prev.map((modulo) =>
                            modulo.id === editData.id ? { ...modulo, ...editData } : modulo
                        )
                    );
                }
            })
            .catch(error => console.log("Deu ruim: " + error))
    }

    function handllerDelete(id: number) {
        const confirmacao = window.confirm("Tem certeza que deseja excluir este módulo?");
        if (!confirmacao) return;
        api.delete(`/modulos/${id}`)
            .then(() => {

            })
            .catch((error) => {
                console.error("Erro ao excluir:", error);
                alert("Não foi possível excluir o módulo.");
            });
    }
    
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow">
                <thead>
                    <tr className="bg-gray-100 text-center font-bold text-sky-700">
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Nome</th>
                        <th className="px-6 py-3">Descricao</th>
                        <th className="px-6 py-3">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Dados.map((modulo) => {
                        const isEditing = isEditingId === modulo.id
                        return (
                            <tr key={modulo.id} className="border-t hover:bg-gray-50">
                                <td className="text-stone-900 px-6 py-4 text-sky-700">{modulo.id}</td>
                                <td className="text-stone-900 text-left px-6 py-4 capitalize">
                                    {isEditing ? <input type="text"
                                        value={editData?.nome || ''}
                                        onChange={(e) => handleChange('nome', e.target.value)}
                                        className="bg-sky-600 border rounded px-2 py-1 w-full"
                                        autoFocus
                                    />
                                        :
                                        modulo.nome}
                                </td>
                                <td className="text-stone-900 text-left px-6 py-4 capitalize">
                                    {isEditing ? <input type="text"
                                        value={editData?.descricao || ''}
                                        onChange={(e) => handleChange('descricao', e.target.value)}
                                        className="bg-sky-600 border rounded px-2 py-1 w-full" />
                                        :
                                        modulo.descricao ? modulo.descricao : "Sem Descrição"}
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    {isEditing ? (
                                        <>
                                            <button onClick={saveEditing} title="Salvar">
                                                <SaveIcon className="text-green-600 hover:scale-110 transition" />
                                            </button>
                                            <button onClick={cancelEditing} title="Cancelar">
                                                <CloseIcon className="text-gray-600 hover:scale-110 transition" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => startEditing(modulo)} title="Editar">
                                                <EditIcon className="text-amber-600 hover:scale-110 transition" />
                                            </button>
                                            <button onClick={() => handllerDelete(modulo.id)} title="Excluir">
                                                <DeleteIcon className="text-red-600 hover:scale-110 transition" />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    <tr className="bg-gray-100 text-center font-bold text-sky-700">
                        <th className="px-6 py-3"></th>
                        <th className="px-6 py-3"></th>
                        <th className="px-6 py-3 text-green-600">Novo Módulo</th>
                        <th className="px-6 py-3">
                            <button onClick={() => setIsCreating(true)} title="Novo">
                                <AddCircleIcon className="text-green-600 hover:scale-110 transition" />
                            </button>
                        </th>
                    </tr>
                    {isCreating && (
                        <tr className="border-t bg-green-50">
                            <td></td>
                            <td className="px-6 py-4">
                                <input
                                    type="text"
                                    value={novoModulo.nome}
                                    onChange={(e) => setNovoModulo({ ...novoModulo, nome: e.target.value })}
                                    className="border rounded px-2 py-1 w-full bg-sky-600"
                                    placeholder="Nome"
                                    autoFocus
                                />
                            </td>
                            <td className="px-6 py-4">
                                <input
                                    type="text"
                                    value={novoModulo.descricao}
                                    onChange={(e) => setNovoModulo({ ...novoModulo, descricao: e.target.value })}
                                    className="border rounded px-2 py-1 w-full bg-sky-600"
                                    placeholder="Descrição"
                                />
                            </td>
                            <td className="px-6 py-4 flex gap-2">
                                <button onClick={() => handleNovModulo(novoModulo)}>
                                    <SaveIcon className="text-green-600" />
                                </button>
                                <button onClick={() => setIsCreating(false)}>
                                    <CloseIcon className="text-gray-600" />
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}