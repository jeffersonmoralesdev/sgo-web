import { ClipboardList, Eye } from "lucide-react";
import { ListagemOrdemServico } from "@/src/model/ordens-servico/ordens-servico-model";
import { formatarStatusOrdemServico, obterClasseStatusOrdemServico } from "@/src/components/private/ordem-servico/status-ordem-servico/status-ordem-servico.config";
import { formataDataPadraoBrasil } from "@/src/utils/formatar-data";
import { aplicarMascaraPlaca } from "@/src/utils/mascara";
import Link from "next/link";

type LinhaOrdemServicoProps = {
    ordemServico: ListagemOrdemServico;
};

export function LinhaTabelaOrdemServico({ ordemServico }: LinhaOrdemServicoProps) {
    return (
        <tr className={`
            flex flex-col gap-4 border-b border-slate-100 p-4 transition-colors md:table-row md:border-b-0 md:border-t md:p-0`}
        >
            <td className="p-0 md:px-5 md:py-4 md:table-cell">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <ClipboardList size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <strong className="block text-slate-950">{formataDataPadraoBrasil(ordemServico.criadoEm)}</strong>
                        <span className="text-xs text-slate-500">ID #{ordemServico.id}</span>
                    </div>
                </div>
            </td>

            <td className="p-0 text-slate-600 md:px-5 md:py-4 md:table-cell">
                <span className="font-semibold text-slate-800 md:hidden">Placa: </span>
                <strong className="hidden text-slate-950 md:block ">{ordemServico.veiculo.modelo}</strong>
                <strong className="text-xs text-slate-500">{aplicarMascaraPlaca(ordemServico.veiculo.placa)}</strong>
            </td>

            <td className="p-0 text-slate-600 md:px-5 md:py-4 md:table-cell">
                <span className="font-semibold text-slate-800 md:hidden">Cliente: </span>
                <strong className="text-xs text-slate-500 md:block md:text-slate-950">{ordemServico.cliente.nome}</strong>
                <strong className="hidden text-xs text-slate-500 md:block">ID #{ordemServico.cliente.id}</strong>

            </td>

            <td className="p-0 text-slate-600 md:px-5 md:py-4 md:table-cell">
                <span className="font-semibold text-slate-800 md:hidden">Status: </span>
                <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold${obterClasseStatusOrdemServico(ordemServico.status)}`}
                >
                    {formatarStatusOrdemServico(ordemServico.status)}
                </span>
            </td>

            <td className="p-0 md:px-5 md:py-4  md:table-cell">
                <div className="flex gap-2 md:justify-end">
                    <Link className="flex px-3 h-9 gap-2 items-center bg-white font-semibold text-slate-700 shadow-sm border border-slate-300 rounded-lg  transition-colors
                    hover:border-blue-600  hover:bg-blue-50  hover:text-blue-700" aria-label={`Ordem de serviço ${ordemServico.id}`} href={`/ordens-servico/detalhes/${ordemServico.id}`}>
                        <Eye size={16} className="shrink-0" />
                        <span>Ver detalhes</span>
                    </Link>
                </div>
            </td>
        </tr>
    )
}
