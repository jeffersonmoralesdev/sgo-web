'use client'
import { ActionResponse } from "@/src/types/action-response";
import { FiltroLista } from "../../filtro-lista";
import { ListaContagem } from "../../lista-contagem";
import { LinhaTabelaCliente } from "../linha-tabela-cliente";
import { useState } from "react";
import { ToastFeedback } from "../../toast-feedback";
import { SessaoExpiradaModal } from "../../sessao-expirada-modal";
import { useRouter } from "next/navigation";

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
    isAdmin: boolean;
};

export function TabelaCliente({ clientes, paramsFiltro = "", isAdmin }: ClientesTableProps) {
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
                        titulo="Lista de clientes"
                        total={clientes.length}
                        nome="cliente"
                        existeFiltro={existeFiltro}
                        paramsFiltro={paramsFiltro} />
                    <FiltroLista paramsFiltro={paramsFiltro} placeHolder="cliente" />
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
                                <LinhaTabelaCliente cliente={cliente} key={cliente.id} isAdmin={isAdmin} onTratarRespostaAction={tratarRespostaAction} />
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