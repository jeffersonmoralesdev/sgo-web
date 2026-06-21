'use client'
import { Car, UserRound } from "lucide-react";

import { useRouter } from "next/navigation";

import { ActionResponse } from "@/src/types/action-response";

import { alternarStatusUsuarioAction, deletarUsuarioAction } from "@/src/actions/usuario/usuario-actions";
import { VeiculoModel } from "@/src/model/veiculo/veiculo-model";
import { AcoesVeiculo } from "../acoes-veiculo";
import { deletarVeiculoAction } from "@/src/actions/veiculo/veiculo-actions";




type LinhaTabelaVeiculoProps = {
    veiculo: VeiculoModel;
    isAdmin: boolean;
    onTratarRespostaAction: (response: ActionResponse, titulo: string) => void;

};
export function LinhaTabelaVeiculo({ veiculo, isAdmin, onTratarRespostaAction }: LinhaTabelaVeiculoProps) {
    const router = useRouter();

    async function deletarVeiculo() {
        const response = await deletarVeiculoAction(veiculo.id);
        onTratarRespostaAction(response, "Exclusão de veículo")

    }

    async function editarVeiculo() {
        router.push(`/veiculos/editar/${veiculo.id}`);
    }
    return (
        <tr className={`
            flex flex-col gap-4 border-b border-slate-100 p-4 transition-colors md:table-row md:border-b-0 md:border-t md:p-0
        `}>
            <td className="p-0 md:px-5 md:py-4 md:table-cell">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <Car size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <strong className="block text-slate-950">{veiculo.modelo}</strong>
                        <span className="text-xs text-slate-500">ID #{veiculo.id}</span>
                    </div>
                </div>
            </td>

            <td className="p-0 text-slate-600 md:px-5 md:py-4 md:table-cell">
                <span className="font-semibold text-slate-800 md:hidden">Placa: </span>
                {veiculo.placa}
            </td>

            <td className="p-0 text-slate-600 md:px-5 md:py-4 md:table-cell">
                <span className="font-semibold text-slate-800 md:hidden">Marca: </span>
                {veiculo.marca}
            </td>

            <td className="p-0 text-slate-600 md:px-5 md:py-4 md:table-cell">
                <span className="font-semibold text-slate-800 md:hidden">Ano:</span>
                {veiculo.ano}
            </td>

            <td className="p-0 md:px-5 md:py-4 md:table-cell">
                <div className="flex gap-2 md:justify-end">
                    <AcoesVeiculo
                        isAdmin={isAdmin}
                        onEdit={editarVeiculo}
                        onExcluir={deletarVeiculo}
                    />
                </div>
            </td>
        </tr>
    )

}