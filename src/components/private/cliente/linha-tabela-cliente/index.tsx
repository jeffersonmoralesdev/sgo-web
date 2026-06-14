'use client'
import { UserRound } from "lucide-react";
import { AcoesCliente } from "../acoes-cliente";
import { useRouter } from "next/navigation";
import { alternarStatusClienteAction, deletarClienteAction} from "@/src/actions/cliente/cliente-actions";
import { ActionResponse } from "@/src/types/action-response";


type Cliente = {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    ativo: boolean;
};

type LinhaClienteProps = {
    cliente: Cliente;
    isAdmin: boolean;
    onTratarRespostaAction: (response: ActionResponse, titulo: string) => void;

};
export function LinhaTabelaCliente({ cliente, isAdmin, onTratarRespostaAction }: LinhaClienteProps) {
    const router = useRouter();
    async function alternarStatus() {
        const response = await alternarStatusClienteAction(cliente.id);
        onTratarRespostaAction(response, "Status do cliente")

    }

    async function deletarCliente() {
        const response = await deletarClienteAction(cliente.id);
        onTratarRespostaAction(response, "Exclusão de cliente")

    }

    async function editarCliente() {
        router.push(`/clientes/editar/${cliente.id}`);
    }
    return (
        <tr className={`
            flex flex-col gap-4 border-b border-slate-100 p-4 transition-colors md:table-row md:border-b-0 md:border-t md:p-0
            ${cliente.ativo ? "hover:bg-slate-50" : "bg-slate-50 opacity-60"}`}
        >
            <td className="p-0 md:px-5 md:py-4 md:table-cell">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <UserRound size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <strong className="block text-slate-950">{cliente.nome}</strong>
                        <span className="text-xs text-slate-500">ID #{cliente.id}</span>
                    </div>
                </div>
            </td>

            <td className="p-0 text-slate-600 md:px-5 md:py-4 md:table-cell">
                <span className="font-semibold text-slate-800 md:hidden">CPF: </span>
                {cliente.cpf}
            </td>

            <td className="p-0 text-slate-600 md:px-5 md:py-4 md:table-cell">
                <span className="font-semibold text-slate-800 md:hidden">Telefone: </span>
                {cliente.telefone}
            </td>

            <td className="p-0 text-slate-600 md:px-5 md:py-4 md:table-cell">
                <span className="font-semibold text-slate-800 md:hidden">E-mail: </span>
                {cliente.email}
            </td>

            <td className="p-0 md:px-5 md:py-4 md:table-cell">
                <div className="flex gap-2 md:justify-end">
                    <AcoesCliente
                        ativo={Boolean(cliente.ativo)}
                        isAdmin={isAdmin}
                        onEdit={editarCliente}
                        onInativar={alternarStatus}
                        onAtivar={alternarStatus}
                        onExcluir={deletarCliente}
                    />
                </div>
            </td>
        </tr>
    )

}