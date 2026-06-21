'use server'
import { VeiculoError } from "@/src/errors/veiculo-error";
import { respostaSessaoExpiradaAction, verificarSessaoAction } from "@/src/lib/auth/auth";
import { CreateVeiculoInput, UpdateVeiculoInput, VeiculoModel } from "@/src/model/veiculo/veiculo-model";
import { veiculoService } from "@/src/services/veiculo";
import { ActionResponse } from "@/src/types/action-response";
import { createVeiculoSchema, idVeiculoSchema, updateVeiculoSchema } from "@/src/validator/veiculo/veiculo-validator";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function registrarVeiculoAction(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse<VeiculoModel>> {
    const sessao = await verificarSessaoAction();
    if (!sessao) return respostaSessaoExpiradaAction<VeiculoModel>();

    const newVeiculo = {
        placa: formData.get("placa"),
        marca: formData.get("marca"),
        modelo: formData.get("modelo"),
        ano: formData.get("ano"),
        cor: formData.get("cor"),
        quilometragem: formData.get("quilometragem"),
        clienteId: formData.get("clienteId"),
    }

    const validationVeiculo = createVeiculoSchema.safeParse(newVeiculo);
    if (!validationVeiculo.success) return {
        success: false,
        errors: z.flattenError(validationVeiculo.error).fieldErrors,
        status: "WARNING",
    }

    try {
        const veiculo = await veiculoService.registrarVeiculo(validationVeiculo.data)
        revalidatePath("/veiculos");
        return {
            success: true,
            message: "Veículo registrado com sucesso.",
            data: veiculo,
            status: "SUCCESS"
        }
    } catch (error) {
        console.log("registrarVeiculoAction:: Erro ao cadastrar veículo:", error);
        return {
            success: false,
            errors: error instanceof VeiculoError ? error.message : "Não foi possível cadastrar o veículo no momento. Tente novamente mais tarde.",
            status: "ERROR",
        }
    };
};

export async function atualizarVeiculoAction(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse<VeiculoModel>> {
    const sessao = await verificarSessaoAction();
    if (!sessao) return respostaSessaoExpiradaAction<VeiculoModel>();

    const id = formData.get("id");
    const validationId = idVeiculoSchema.safeParse(id);
    if (!validationId.success) {
        return {
            success: false,
            errors: z.flattenError(validationId.error).formErrors[0],
            status:"WARNING",
        }
    };
    const updateVeiculo = {
        placa: formData.get("placa"),
        marca: formData.get("marca"),
        modelo: formData.get("modelo"),
        ano: formData.get("ano"),
        cor: formData.get("cor"),
        quilometragem: formData.get("quilometragem"),
        clienteId: formData.get("clienteId"),
    }

    const validationVeiculo = updateVeiculoSchema.safeParse(updateVeiculo);
    if (!validationVeiculo.success) {
        return {
            success: false,
            errors: z.flattenError(validationVeiculo.error).fieldErrors,
            status:"WARNING"
        }
    };

    try {
        const veiculo = await veiculoService.atualizarVeiculo(validationId.data, validationVeiculo.data);
        revalidatePath("/veiculos");
        return {
            success: true,
            message: "Veículo alterado com sucesso.",
            data: veiculo,
            status:"SUCCESS",
        }

    } catch (error) {
        console.log("atualizarVeiculoAction:: Erro ao atualizar veículo:", error);
        return {
            success: false,
            errors: error instanceof VeiculoError ? error.message : "Não foi possível atualizar o veículo no momento. Tente novamente mais tarde.",
            status:"ERROR",
        }
    };
};

export async function deletarVeiculoAction(id: number): Promise<ActionResponse> {
    const sessao = await verificarSessaoAction();
    if (!sessao) return respostaSessaoExpiradaAction();
    
    if (sessao.perfil !== "ADMIN") {
        return {
            success: false,
            errors: "Você não tem permissão para excluir Veículos.",
            status: "ERROR",
        }
    }

    const validationId = idVeiculoSchema.safeParse(id);
    if (!validationId.success) {
        return {
            success: false,
            errors: z.flattenError(validationId.error).formErrors[0],
            status:"WARNING",
        }
    };

    try {
       await veiculoService.deletarVeiculo(validationId.data)
       revalidatePath("/veiculos");
       return {
            success: true,
            message: "Veículo excluído com sucesso.",
            status: "SUCCESS"
        }
    } catch (error) {
        console.log("deletarVeiculoAction:: Erro ao excluir veículo:", error);
        return {
            success: false,
            errors: error instanceof VeiculoError ? error.message : "Não foi possível excluir o veículo no momento. Tente novamente mais tarde.",
            status:"ERROR",
        }
    };
};

