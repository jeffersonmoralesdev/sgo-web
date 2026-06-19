import { getSessao } from "@/src/lib/auth/session";
import { UsuarioResponse } from "@/src/model/usuario/usuario-model";
import { usuarioService } from "@/src/services/usuario";
import { QueryResponse } from "@/src/types/query-response";
import { redirect } from "next/navigation";

type ListaUsuariosResponseQuery = {
    usuarios: UsuarioResponse[];
    isAdmin?: boolean;
}

type UsuarioResponseQuery = {
    usuario?: UsuarioResponse;
    isAdmin?: boolean;
}
export async function listarUsuariosQuery(busca?: string): Promise<QueryResponse<ListaUsuariosResponseQuery>> {
    const sessao = await getSessao();
    if (!sessao) redirect("/login?toast=sessao-expirada");

    try {
        const usuarios = await usuarioService.listarTodosUsuarios(busca)
        return {
            success: true,
            data: { usuarios: usuarios, isAdmin: sessao.perfil === "ADMIN" },
            status: "SUCCESS",
        }

    } catch (error) {
        console.log("listarUsuariosQuery: Erro ao listar Usuários:", error)
        return {
            success: false,
            data: { usuarios: [] },
            error: "Não foi possível carregar os usuários no momento, tente novamente em instantes.",
            status: "ERROR",
        }
    }
}

export async function buscarUsuarioPorIdQuery(id: number): Promise<QueryResponse<UsuarioResponseQuery>> {
    const sessao = await getSessao();
    if (!sessao) redirect("/login?toast=sessao-expirada");

    try {
        const usuario = await usuarioService.buscarUsuarioPorId(id);
        if (!usuario) {
            return {
                success: false,
                data: { isAdmin: sessao.perfil === "ADMIN" },
                error: "Não foi possivel encontrar o usuário informado, verifique os dados e tente novamente.",
                status: "ERROR",
            }
        }
        return {
            success: true,
            data: { usuario: usuario, isAdmin: sessao.perfil === "ADMIN" },
            status: "SUCCESS",
        }

    } catch (error) {
        console.log("buscarUsuarioPorIdQuery: Erro ao buscar usuário por id:", error)
        return {
            success: false,
            error: "Não foi possível carregar os dados do usuário informado no momento, tente novamente em instantes.",
            status: "ERROR",
        }
    }
}