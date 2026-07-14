'use client'
import { ListaContagem } from "../../lista-contagem";
import { FiltroLista } from "../../filtro-lista";
import { LinhaTabelaOrdemServico } from "../linha-tabela-ordem-servico";
import { ListaOrdemServicoDTO } from "@/src/dtos/ordem-servico";


type TabelaOrdemServicoProps = {
    ordensServico: ListaOrdemServicoDTO[];
    paramsFiltro?: string;
};

export function TabelaOrdemServico({ ordensServico, paramsFiltro = "" }: TabelaOrdemServicoProps) {

    const existeFiltro = paramsFiltro.trim().length > 0;

    return (
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <ListaContagem
                    titulo="Lista de ordens de serviço"
                    total={ordensServico.length}
                    nome="ordem de serviço"
                    existeFiltro={existeFiltro}
                    paramsFiltro={paramsFiltro} />
                <FiltroLista paramsFiltro={paramsFiltro} placeHolder="ordem serviço" />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm flex flex-col md:table">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500 hidden md:table-header-group">
                        <tr>
                            <th className="px-5 py-4">Data de abertura</th>
                            <th className="px-5 py-4">Veículo</th>
                            <th className="px-5 py-4">Cliente</th>
                            <th className="px-5 py-4">Status</th>
                            <th className="px-5 py-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 flex flex-col md:table-row-group md:divide-y-0">
                        {
                            ordensServico.map((ordemServico) => (
                                <LinhaTabelaOrdemServico ordemServico={ordemServico} key={ordemServico.id} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </section>

    )
}