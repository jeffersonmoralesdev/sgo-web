import { getSessao } from "@/src/lib/auth/session";
import { ListagemOrdemServico } from "@/src/model/ordens-servico/ordens-servico-model";

import { ordensServicoService } from "@/src/services/ordem-servico";

import { QueryResponse } from "@/src/types/query-response";
import { redirect } from "next/navigation";

type ListaOrdemServicoResponseQuery = {
    ordensServico: ListagemOrdemServico[];
    isAdmin: boolean;
}

export async function listarOrdensServicoQuery(busca?: string): Promise<QueryResponse<ListaOrdemServicoResponseQuery>> {
    const sessao = await getSessao();
    if (!sessao) redirect("/login?toast=sessao-expirada");

    try {
        const ordensServico = await ordensServicoService.listarOrdensServico(busca)
        return {
            success: true,
            data: { ordensServico: ordensServico, isAdmin: sessao.perfil === "ADMIN" },
            status: "SUCCESS",
        }

    } catch (error) {
        console.log("listarOrdensServicoQuery:: Erro ao listar ordens de serviço:", error)
        return {
            success: false,
            error: "Não foi possível carregar as ordens de serviço no momento, tente novamente em instantes.",
            status: "ERROR",
        }
    }
}