import { getSessao } from "@/src/lib/auth/session";
import { ClienteModel } from "@/src/model/cliente/cliente-model";
import { clienteService } from "@/src/services/cliente";
import { QueryResponse } from "@/src/types/query-response";
import { redirect } from "next/navigation";


type ListaClientesResponseQuery = {
    clientes: ClienteModel[];
    isAdmin?: boolean;
}

type ClienteResponseQuery = {
    cliente?: ClienteModel;
    isAdmin?: boolean;
}
export async function listarClientesQuery(busca?: string): Promise<QueryResponse<ListaClientesResponseQuery>> {
    const sessao = await getSessao();
    if (!sessao) redirect("/login?toast=sessao-expirada");

    try {
        const clientes = await clienteService.listarClientes(busca);
        return {
            success: true,
            data: { clientes: clientes, isAdmin: sessao.perfil === "ADMIN" },
            status: "SUCCESS",
        }

    } catch (error) {
        console.log("listarClientesQuery: Erro ao listar clientes:", error)
        return {
            success: false,
            data: { clientes: [] },
            error: "Não foi possível carregar os clientes no momento, tente novamente em instantes.",
            status: "ERROR",
        }
    }
}

export async function buscarClientePorIdQuery(id: number): Promise<QueryResponse<ClienteResponseQuery>> {
    const sessao = await getSessao();
    if (!sessao) redirect("/login?toast=sessao-expirada");

    try {
        const cliente = await clienteService.buscarClientePorId(id);
        if (!cliente) {
            return {
                success: false,
                data: { isAdmin: sessao.perfil === "ADMIN" },
                error: "Não foi possivel encontrar o cliente informado, verifique os dados e tente novamente.",
                status: "ERROR",
            }
        }
        return {
            success: true,
            data: { cliente: cliente, isAdmin: sessao.perfil === "ADMIN" },
            status: "SUCCESS",
        }

    } catch (error) {
        console.log("buscarClientePorIdQuery: Erro ao buscar cliente por id:", error)
        return {
            success: false,
            error: "Não foi possível carregar os dados do cliente informado no momento, tente novamente em instantes.",
            status: "ERROR",
        }
    }
}

export async function contarTotalClientesQuery(): Promise<QueryResponse<number>> {
    const sessao = await getSessao();
    if (!sessao) redirect("/login?toast=sessao-expirada");

    try {
        const totalClientes = await clienteService.contarTotalClientes();
        return {
            success: true,
            data: totalClientes,
            status: "SUCCESS",
        }

    } catch (error) {
        console.log("contarTotalClientesQuery:: Erro ao buscar total clíentes cadastrado:", error)
        return {
            success: false,
            data:0,
            error: "Não foi possível carregar total de clíentes cadastrado no momento, tente novamente em instantes.",
            status: "ERROR",
        }
    }
}