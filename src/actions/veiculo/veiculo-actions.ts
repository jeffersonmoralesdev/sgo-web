'use server'
import { CreateVeiculoInput, UpdateVeiculoInput, VeiculoModel } from "@/src/model/veiculo/veiculo-model";
import { veiculoService} from "@/src/services/veiculo";
import { ActionResponse } from "@/src/types/action-response";
import { createVeiculoSchema, idVeiculoSchema, updateVeiculoSchema } from "@/src/validator/veiculo/veiculo-validator";
import z from "zod";

export async function registrarVeiculoAction(newVeiculo:CreateVeiculoInput):Promise<ActionResponse<VeiculoModel>>{
    const validationVeiculo = createVeiculoSchema.safeParse(newVeiculo);
    if(!validationVeiculo.success) return {
        success:false,
        errors: z.flattenError(validationVeiculo.error).fieldErrors
    }
    
    try {
        const veiculo = await veiculoService.registrarVeiculo(validationVeiculo.data)
        return {
            success:true,
            message:"Veículo registrado com sucesso.",
            data:veiculo
        }
    } catch (error) {
        return{
            success:false,
            errors: error instanceof Error ? error.message : "Erro inesperado ao registrar Veiculo."
        }
    };
};

export async function atualizarVeiculoAction(id:number,updateVeiculo:UpdateVeiculoInput):Promise<ActionResponse<VeiculoModel>>{
    const validationId = idVeiculoSchema.safeParse(id);
    if(!validationId.success){
        return{
            success:false,
            errors:z.flattenError(validationId.error).formErrors[0]
        }
    };

    const validationVeiculo = updateVeiculoSchema.safeParse(updateVeiculo);
    if(!validationVeiculo.success){
        return{
            success:false,
            errors:z.flattenError(validationVeiculo.error).fieldErrors
        }
    };

    try {
        const veiculo = await veiculoService.atualizarVeiculo(validationId.data,validationVeiculo.data);
        return{
            success:true,
            message:"Veículo alterado com sucesso.",
            data:veiculo
        }
        
    } catch (error) {
        return{
            success:false,
            errors: error instanceof Error ? error.message :"Erro inesperado ao alterar dados do Veiculo."
        }
    };
};

export async function deletarVeiculoAction(id:number):Promise<ActionResponse<boolean>>{
    const validationId = idVeiculoSchema.safeParse(id);
    if(!validationId.success){
        return{
            success:false,
            errors: z.flattenError(validationId.error).formErrors[0]
        }
    };

    try {
        const veiculoDeletado = await veiculoService.deletarVeiculo(validationId.data)
        return{
            success:true,
            message:"Veículo deletado com sucesso.",
            data:veiculoDeletado
        }    
    } catch (error) {
        return {
            success:false,
            errors: error instanceof Error ? error.message : "Erro inesperado ao deletar o veiculo."
        }        
    };  
};

