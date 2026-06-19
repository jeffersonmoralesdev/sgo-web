'use client'
import { UserRound } from "lucide-react";

import { useRouter } from "next/navigation";

import { ActionResponse } from "@/src/types/action-response";
import { UsuarioResponse } from "@/src/model/usuario/usuario-model";
import { AcoesUsuario } from "../acoes-usuario";
import { alternarStatusUsuarioAction, deletarUsuarioAction } from "@/src/actions/usuario/usuario-actions";




type LinhaTabelaUsuarioProps = {
    usuario: UsuarioResponse;
    isAdmin: boolean;
    onTratarRespostaAction: (response: ActionResponse, titulo: string) => void;

};
export function LinhaTabelaUsuario({ usuario, isAdmin, onTratarRespostaAction }: LinhaTabelaUsuarioProps) {
    const router = useRouter();
    async function alternarStatus() {
        const response = await alternarStatusUsuarioAction(usuario.id);
        onTratarRespostaAction(response, "Status do cliente")

    }

    async function deletarUsuario() {
        const response = await deletarUsuarioAction(usuario.id);
        onTratarRespostaAction(response, "Exclusão de usuário")

    }

    async function editarUsuario() {
        router.push(`/usuarios/editar/${usuario.id}`);
    }
    return (
        <tr className={`
            flex flex-col gap-4 border-b border-slate-100 p-4 transition-colors md:table-row md:border-b-0 md:border-t md:p-0
            ${usuario.ativo ? "hover:bg-slate-50" : "bg-slate-50 opacity-60"}`}
        >
            <td className="p-0 md:px-5 md:py-4 md:table-cell">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <UserRound size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <strong className="block text-slate-950">{usuario.nome}</strong>
                        <span className="text-xs text-slate-500">ID #{usuario.id}</span>
                    </div>
                </div>
            </td>

            <td className="p-0 text-slate-600 md:px-5 md:py-4 md:table-cell">
                <span className="font-semibold text-slate-800 md:hidden">E-mail: </span>
                {usuario.email}
            </td>

            <td className="p-0 text-slate-600 md:px-5 md:py-4 md:table-cell">
                <span className="font-semibold text-slate-800 md:hidden">Perfil: </span>
                {usuario.perfil}
            </td>

            <td className="p-0 text-slate-600 md:px-5 md:py-4 md:table-cell">
                <span className="font-semibold text-slate-800 md:hidden">Status:</span>
                {usuario.ativo ? "Ativo" : "Desativado"}
            </td>

            <td className="p-0 md:px-5 md:py-4 md:table-cell">
                <div className="flex gap-2 md:justify-end">
                    <AcoesUsuario
                        ativo={Boolean(usuario.ativo)}
                        isAdmin={isAdmin}
                        onEdit={editarUsuario}
                        onInativar={alternarStatus}
                        onAtivar={alternarStatus}
                        onExcluir={deletarUsuario}
                    />
                </div>
            </td>
        </tr>
    )

}