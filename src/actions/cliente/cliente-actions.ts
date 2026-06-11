"use server";
import { ClienteError } from "@/src/errors/cliente-error";
import { respostaSessaoExpiradaAction, verificarSessaoAction } from "@/src/lib/auth/auth";
import { ClienteModel, CreateClienteInput, UpdateClienteInput } from "@/src/model/cliente/cliente-model";
import { clienteService } from "@/src/services/cliente";
import { ActionResponse } from "@/src/types/action-response";
import { createClienteSchema, idClienteSchema, updateClienteSchema } from "@/src/validator/cliente/cliente-validator";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function registrarClienteAction(_prevState: ActionResponse<ClienteModel>, formData: FormData): Promise<ActionResponse<ClienteModel>> {
    const sessao = await verificarSessaoAction();
    if (!sessao) return respostaSessaoExpiradaAction<ClienteModel>();

    const newCliente: CreateClienteInput = {
        nome: String(formData.get("nome") ?? ""),
        cpf: String(formData.get("cpf") ?? ""),
        telefone: String(formData.get("telefone") ?? ""),
        email: String(formData.get("email") ?? "")
    }

    const validationCliente = createClienteSchema.safeParse(newCliente);
    if (!validationCliente.success) {
        return {
            success: false,
            errors: z.flattenError(validationCliente.error).fieldErrors,
            status: "WARNING"
        };
    }

    try {
        const cliente = await clienteService.registrarCliente(validationCliente.data);
        revalidatePath("/clientes");
        return {
            success: true,
            message: "Cliente registrado com sucesso.",
            data: cliente,
            status: "SUCCESS"
        };

    } catch (error) {
        console.log("Erro ao cadastrar cliente:", error);
        return {
            success: false,
            errors: error instanceof ClienteError ? error.message : "Não foi possível cadastrar o cliente no momento. Tente novamente mais tarde.",
            status: "ERROR"
        };
    }
}

export async function atualizarClienteAction(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse<ClienteModel>> {
    const sessao = await verificarSessaoAction();
    if (!sessao) return respostaSessaoExpiradaAction();

    const id: number = Number(formData.get("id"));
    const validationId = idClienteSchema.safeParse(id);
    if (!validationId.success) {
        return {
            success: false,
            errors: z.flattenError(validationId.error).formErrors[0],
            status: "WARNING",
        }
    }

    const updateCliente: UpdateClienteInput = {
        nome: String(formData.get("nome") ?? ""),
        cpf: String(formData.get("cpf") ?? ""),
        telefone: String(formData.get("telefone") ?? ""),
        email: String(formData.get("email") ?? "")
    }
    const validationCliente = updateClienteSchema.safeParse(updateCliente);
    if (!validationCliente.success) {
        return {
            success: false,
            errors: z.flattenError(validationCliente.error).fieldErrors,
            status: "WARNING",
        }
    }

    try {
        const cliente = await clienteService.atualizarCliente(validationId.data, validationCliente.data);
        revalidatePath("/clientes");
        return {
            success: true,
            message: "Cliente atualizado com sucesso.",
            data: cliente,
            status: "SUCCESS",
        }

    } catch (error) {
        return {
            success: false,
            errors: error instanceof ClienteError ? error.message : "Não foi possível atualizar o cliente no momento. Tente novamente mais tarde.",
            status: "ERROR",
        }
    }
}

export async function deletarClienteAction(id: number): Promise<ActionResponse> {
    const sessao = await verificarSessaoAction();
    if (!sessao) return respostaSessaoExpiradaAction();

    if (sessao.perfil !== "ADMIN") {
        return {
            success: false,
            errors: "Você não tem permissão para excluir clientes.",
            status: "ERROR",
        }
    }

    const validationId = idClienteSchema.safeParse(id);
    if (!validationId.success) {
        return {
            success: false,
            errors: z.flattenError(validationId.error).formErrors[0],
            status: "WARNING"
        }
    }

    try {
        await clienteService.deletarCliente(validationId.data);
        revalidatePath("/clientes");
        return {
            success: true,
            message: "Cliente excluído com sucesso.",
            status: "SUCCESS"
        }

    } catch (error) {
        return {
            success: false,
            errors: error instanceof ClienteError ? error.message : "Não foi possível excluir o cliente no momento. Tente novamente mais tarde.",
            status: "ERROR",
        }
    }
}

export async function alternarStatusClienteAction(id: number): Promise<ActionResponse> {
    const sessao = await verificarSessaoAction();
    if (!sessao) return respostaSessaoExpiradaAction();

    const validationId = idClienteSchema.safeParse(id);
    if (!validationId.success) {
        return {
            success: false,
            errors: z.flattenError(validationId.error).formErrors[0],
            status: "WARNING",
        }
    }

    try {
        const cliente = await clienteService.alternarStatusCliente(validationId.data);
        revalidatePath("/clientes");
        return {
            success: true,
            message: cliente.ativo ? "Cliente ativado com sucesso." : "Cliente desativado com sucesso.",
            status: "SUCCESS",
        }

    } catch (error) {
        console.log("Erro ao alterar status do cliente:", error);
        return {
            success: false,
            errors: error instanceof ClienteError ? error.message : "Não foi possível alterar status do cliente no momento. Tente novamente mais tarde.",
            status: "ERROR",
        }
    }
}



