'use server'
import { UsuarioError } from "@/src/errors/usuario-error";
import { respostaSessaoExpiradaAction, verificarSessaoAction } from "@/src/lib/auth/auth";
import { CreateUsuarioInput, PerfilUsuario, UpdateUsuarioInput, UsuarioResponse } from "@/src/model/usuario/usuario-model";
import { usuarioService } from "@/src/services/usuario";
import { ActionResponse } from "@/src/types/action-response";
import { createUsuarioSchema, idUsuarioSchema, updateUsuarioInputSchema } from "@/src/validator/usuario/usuario-validator";
import { revalidatePath } from "next/cache";
import z, { success } from "zod";

export async function registrarUsuarioAction(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse<UsuarioResponse>> {
    const sessao = await verificarSessaoAction();
    if (!sessao) return respostaSessaoExpiradaAction<UsuarioResponse>();

    if (sessao.perfil !== "ADMIN") {
        return {
            success: false,
            errors: "Você não tem permissão para cadastrar novos usuários.",
            status: "ERROR",
        }
    }

    const newUsuario: CreateUsuarioInput = {
        nome: String(formData.get("nome") ?? ""),
        email: String(formData.get("email") ?? ""),
        senha: String(formData.get("senha") ?? ""),
        perfil: String(formData.get("perfil") ?? "") as PerfilUsuario
    };

    const validationUsuario = createUsuarioSchema.safeParse(newUsuario);
    if (!validationUsuario.success) {
        return {
            success: false,
            errors: z.flattenError(validationUsuario.error).fieldErrors,
            status: "WARNING",
        }
    }

    try {
        const usuario = await usuarioService.registrarUsuario(validationUsuario.data)
        revalidatePath("/usuarios");
        return {
            success: true,
            message: "Usuário registrado com sucesso.",
            data: usuario,
            status: "SUCCESS",
        }

    } catch (error) {
        console.log("registrarUsuarioAction:: Erro ao cadastrar usuário:", error);
        return {
            success: false,
            errors: error instanceof UsuarioError ? error.message : "Não foi possível cadastrar o usuário no momento. Tente novamente mais tarde.",
            status: "ERROR",
        }
    }
}

export async function atualizarUsuarioAction(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse<UsuarioResponse>> {
    const sessao = await verificarSessaoAction();

    if (!sessao) return respostaSessaoExpiradaAction<UsuarioResponse>();
    if (sessao.perfil !== "ADMIN") {
        return {
            success: false,
            errors: "Você não tem permissão para alterar dados de usuários.",
            status: "ERROR",
        }
    }

    const id: number = Number(formData.get("id"));
    const validationId = idUsuarioSchema.safeParse(id);
    if (!validationId.success) {
        return {
            success: false,
            errors: z.flattenError(validationId.error).formErrors[0],
            status: "WARNING",
        }
    };

    const updateUsuario: UpdateUsuarioInput = {
        nome: String(formData.get("nome") ?? ""),
        email: String(formData.get("email") ?? ""),
        senha: String(formData.get("senha") ?? ""),
        perfil: String(formData.get("perfil") ?? "") as PerfilUsuario,
    }
    const validationUsuario = updateUsuarioInputSchema.safeParse(updateUsuario);
    if (!validationUsuario.success) {
        return {
            success: false,
            errors: z.flattenError(validationUsuario.error).fieldErrors,
            status: "WARNING",
        }
    }

    try {
        const usuario = await usuarioService.atualizarUsuario(validationId.data, validationUsuario.data);
        revalidatePath("/usuarios");
        return {
            success: true,
            message: "Usuário atualizado com sucesso.",
            data: usuario,
            status: "SUCCESS",
        }
    } catch (error) {
        console.log("atualizarUsuarioAction:: Erro ao atualizar usuário:", error);
        return {
            success: false,
            errors: error instanceof UsuarioError ? error.message : "Não foi possível atualizar o usuário no momento. Tente novamente mais tarde.",
            status: "ERROR",
        }
    }
}

export async function deletarUsuarioAction(id: number): Promise<ActionResponse> {
    const sessao = await verificarSessaoAction();
    if (!sessao) return respostaSessaoExpiradaAction();

    if (sessao.perfil !== "ADMIN") {
        return {
            success: false,
            errors: "Você não tem permissão para excluir usuários.",
            status: "ERROR",
        }
    }

    const validationId = idUsuarioSchema.safeParse(id);
    if (!validationId.success) {
        return {
            success: false,
            errors: z.flattenError(validationId.error).formErrors[0],
            status: "WARNING",
        }
    }

    try {
        await usuarioService.deletarUsuario(validationId.data);
        revalidatePath("/usuarios");
        return {
            success: true,
            message: "Usuário excluído com sucesso.",
            status: "SUCCESS"
        }
    } catch (error) {
        console.log("deletarUsuarioAction:: Erro ao excluir usuário.", error);
        return {
            success: false,
            errors: error instanceof UsuarioError ? error.message : "Não foi possível excluir o usuário no momento. Tente novamente mais tarde.",
            status: "ERROR",
        }
    }
}

export async function alternarStatusUsuarioAction(id: number): Promise<ActionResponse> {
    const sessao = await verificarSessaoAction();
    if (!sessao) return respostaSessaoExpiradaAction();

    if (sessao.perfil !== "ADMIN") {
        return {
            success: false,
            errors: "Você não tem permissão para alterar status do usuário.",
            status: "ERROR",
        }
    }

    const validationId = idUsuarioSchema.safeParse(id);
    if (!validationId.success) {
        return {
            success: false,
            errors: z.flattenError(validationId.error).formErrors[0],
            status: "WARNING",
        }
    }

    try {
        const usuario = await usuarioService.alternarStatusUsuario(validationId.data);
        revalidatePath("/usuarios");
        return {
            success: true,
            message: usuario.ativo ? "Usuário ativado com sucesso." : "Usuário desativado com sucesso.",
            status: "SUCCESS"
        }

    } catch (error) {
        console.log("alternarStatusUsuarioAction:: erro ao alterar status do usuário.", error);
        return {
            success: false,
            errors: error instanceof UsuarioError ? error.message : "Não foi possível alterar o status do usuário no momento. Tente novamente mais tarde.",
            status: "ERROR",
        }
    }
}