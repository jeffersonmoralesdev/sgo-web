import { getSessao } from "@/src/lib/auth/session";
import { VeiculoModel } from "@/src/model/veiculo/veiculo-model";
import { veiculoService } from "@/src/services/veiculo";
import { QueryResponse } from "@/src/types/query-response";
import { redirect } from "next/navigation";


type ListaVeiculosResponseQuery = {
    veiculos: VeiculoModel[];
    isAdmin?: boolean;
}

type VeiculoResponseQuery = {
    veiculo?: VeiculoModel;
    isAdmin?: boolean;
}
export async function listarVeiculosQuery(busca?: string): Promise<QueryResponse<ListaVeiculosResponseQuery>> {
    const sessao = await getSessao();
    if (!sessao) redirect("/login?toast=sessao-expirada");

    try {
        const veiculos = await veiculoService.listarVeiculos(busca);
        return {
            success: true,
            data: { veiculos: veiculos, isAdmin: sessao.perfil === "ADMIN" },
            status: "SUCCESS",
        }

    } catch (error) {
        console.log("listarVeiculosQuery:: Erro ao listar veículos:", error)
        return {
            success: false,
            data: { veiculos: [] },
            error: "Não foi possível carregar os veículos no momento, tente novamente em instantes.",
            status: "ERROR",
        }
    }
}

export async function buscarVeiculoPorIdQuery(id: number): Promise<QueryResponse<VeiculoResponseQuery>> {
    const sessao = await getSessao();
    if (!sessao) redirect("/login?toast=sessao-expirada");

    try {
        const veiculo = await veiculoService.buscarVeiculoPorId(id);
        if (!veiculo) {
            return {
                success: false,
                data: { isAdmin: sessao.perfil === "ADMIN" },
                error: "Não foi possivel encontrar o veículo informado, verifique os dados e tente novamente.",
                status: "ERROR",
            }
        }
        return {
            success: true,
            data: { veiculo: veiculo, isAdmin: sessao.perfil === "ADMIN" },
            status: "SUCCESS",
        }

    } catch (error) {
        console.log("buscarVeiculoPorIdQuery:: Erro ao buscar veículo por id:", error)
        return {
            success: false,
            error: "Não foi possível carregar os dados do veículo informado no momento, tente novamente em instantes.",
            status: "ERROR",
        }
    }
}

export async function contarTotalVeiculosQuery(): Promise<QueryResponse<number>> {
    const sessao = await getSessao();
    if (!sessao) redirect("/login?toast=sessao-expirada");

    try {
        const totalVeiculos = await veiculoService.contarTotalVeiculos();
        return {
            success: true,
            data: totalVeiculos,
            status: "SUCCESS",
        }

    } catch (error) {
        console.log("contarTotalVeiculosQuery:: Erro ao buscar total veículo cadastrado:", error)
        return {
            success: false,
            data:0,
            error: "Não foi possível carregar total de veículo cadastrado no momento, tente novamente em instantes.",
            status: "ERROR",
        }
    }
}