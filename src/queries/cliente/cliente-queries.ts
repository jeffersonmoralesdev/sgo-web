import { getSessao } from "@/src/lib/auth/session";
import { ClienteModel } from "@/src/model/cliente/cliente-model";
import { clienteService } from "@/src/services/cliente";
import { QueryResponse } from "@/src/types/query-response";
import { redirect } from "next/navigation";


type ListarClientesData = {
    clientes: ClienteModel[];
    isAdmin?: boolean;
}
export async function listarClientesQuery(busca?: string): Promise<QueryResponse<ListarClientesData>> {
    const sessao = await getSessao();
    if (!sessao) redirect("/login?motivo=sessao-expirada");

    try {
        const clientes = await clienteService.listarClientes(busca);
        return {
            success: true,
            data: { clientes: clientes, isAdmin: sessao.perfil === "ADMIN" },
            status: "SUCCESS",
        }

    } catch (error) {
        console.log("Erro ao listar clientes:", error)
        return {
            success: false,
            data: { clientes: [] },
            error: "Não foi possível carregar os clientes no momento, tente novamente em instantes.",
            status: "ERROR",
        }
    }
}