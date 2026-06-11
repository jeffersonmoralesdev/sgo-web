import { FiltroLista } from "../../filtro-lista";
import { ListaContagem } from "../../lista-contagem";
import { LinhaTabelaCliente } from "../linha-tabela-cliente";


type Cliente = {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    ativo: boolean;
};

type ClientesTableProps = {
    clientes: Cliente[];
    paramsFiltro?: string;
};

export function TabelaCliente({ clientes, paramsFiltro = "" }: ClientesTableProps) {
    const existeFiltro = paramsFiltro.trim().length > 0;

    return (
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <ListaContagem
                    titulo="Lista de clientes"
                    total={clientes.length}
                    nome="cliente"
                    existeFiltro={existeFiltro}
                    paramsFiltro={paramsFiltro} />
                <FiltroLista paramsFiltro={paramsFiltro} />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm flex flex-col md:table">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500 hidden md:table-header-group">
                        <tr>
                            <th className="px-5 py-4">Cliente</th>
                            <th className="px-5 py-4">CPF</th>
                            <th className="px-5 py-4">Telefone</th>
                            <th className="px-5 py-4">E-mail</th>
                            <th className="px-5 py-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 flex flex-col md:table-row-group md:divide-y-0">
                        {clientes.map((cliente) => (
                            <LinhaTabelaCliente cliente={cliente} key={cliente.id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}