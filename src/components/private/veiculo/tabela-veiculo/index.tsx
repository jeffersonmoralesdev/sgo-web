'use client'
import { ActionResponse } from "@/src/types/action-response";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ListaContagem } from "../../lista-contagem";
import { FiltroLista } from "../../filtro-lista";
import { SessaoExpiradaModal } from "../../sessao-expirada-modal";
import { ToastFeedback } from "../../toast-feedback";
import { VeiculoModel } from "@/src/model/veiculo/veiculo-model";
import { LinhaTabelaVeiculo } from "../linha-tabela-veiculo";

type TabelaVeiculoProps = {
    veiculos: VeiculoModel[];
    paramsFiltro?: string;
    isAdmin: boolean;
};

export function TabelaVeiculo({ veiculos, paramsFiltro = "", isAdmin }: TabelaVeiculoProps) {

    const router = useRouter();
    const existeFiltro = paramsFiltro.trim().length > 0;
    const [visivel, setVisivel] = useState(false);
    const [tipo, setTipo] = useState<"SUCCESS" | "ERROR">("SUCCESS");
    const [titulo, setTitulo] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [sessaoExpiradaOpen, setSessaoExpiradaOpen] = useState(false);

    function redirecionarParaLogin() {
        router.push("/login");
    }

    function tratarRespostaAction(response: ActionResponse, tituloToast: string) {
        if (response.status === "UNAUTHORIZED") {
            setSessaoExpiradaOpen(true);
            return;
        }

        if (response.status === "SUCCESS") {
            setTitulo(tituloToast);
            setTipo("SUCCESS");
            setMensagem(response.message ?? "");
            setVisivel(true);
            return;
        }

        if (response.status === "ERROR") {
            setTitulo(tituloToast);
            setTipo("ERROR");
            setMensagem(typeof response.errors === "string" ? response.errors : "");
            setVisivel(true);
            return;
        }
    }

    return (
        <>
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <ListaContagem
                        titulo="Lista de veículos"
                        total={veiculos.length}
                        nome="veículo"
                        existeFiltro={existeFiltro}
                        paramsFiltro={paramsFiltro} />
                    <FiltroLista paramsFiltro={paramsFiltro} placeHolder="veículo" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm flex flex-col md:table">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500 hidden md:table-header-group">
                            <tr>
                                <th className="px-5 py-4">Modelo</th>
                                <th className="px-5 py-4">Placa</th>
                                <th className="px-5 py-4">Marca</th>
                                <th className="px-5 py-4">Ano</th>
                                <th className="px-5 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 flex flex-col md:table-row-group md:divide-y-0">
                            {veiculos.map((veiculo) => (
                                <LinhaTabelaVeiculo veiculo={veiculo} key={veiculo.id} isAdmin={isAdmin} onTratarRespostaAction={tratarRespostaAction} />

                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <SessaoExpiradaModal
                open={sessaoExpiradaOpen}
                segundos={30}
                onRedirect={redirecionarParaLogin}
            />
            <ToastFeedback
                open={visivel}
                tipo={tipo}
                titulo={titulo}
                mensagem={mensagem}
                onClose={() => setVisivel(false)}
            />
        </>
    )
}