"use server";
import { ClienteModel, CreateClienteInput, UpdateClienteInput } from "@/src/model/cliente/cliente-model";
import { clienteService } from "@/src/services/cliente";
import { ActionResponse } from "@/src/types/action-response";
import { createClienteSchema, updateClienteSchema } from "@/src/validator/cliente/cliente-validator";
import z from "zod";

export async function registrarClienteAction(newCliente:CreateClienteInput):Promise<ActionResponse<ClienteModel>>{
   const validationCliente = createClienteSchema.safeParse(newCliente);

   if (!validationCliente.success){
       return {
            success: false,
            errors: z.flattenError(validationCliente.error).fieldErrors
        }; 
   }

   try {
        const cliente = await clienteService.registrarCliente(validationCliente.data);
        return {
            success: true,
            message: "Cliente registrado com sucesso.",
            data: cliente,
        };
   } catch (error) {
        return {
            success: false,
            errors:error instanceof Error ? error.message : "Erro inesperado ao registrar cliente.",
        };
    }    
}

export async function atualizarClienteAction(id:number,updateCliente:UpdateClienteInput):Promise<ActionResponse<ClienteModel>>{
    const validationCliente = updateClienteSchema.safeParse(updateCliente);
    if(!validationCliente.success){
        return{
            success:false,
            errors:z.flattenError(validationCliente.error).fieldErrors  
        }
    }
    try{
        const cliente =await clienteService.atualizarCliente(id,validationCliente.data);
        return {
            success:true,
            message: "Cliente atualizado com sucesso.",
            data:cliente
        }

    } catch (error){
        return {
            success:false,
            errors: error instanceof Error ? error.message : "Erro inesperado ao atualizar dados do cliente."
        }
    }
}

export async function deletarClienteAction(id:number):Promise<ActionResponse>{
    try {
        await clienteService.deletarCliente(id);
        return{
            success:true,
            message:"Cliente deletado com sucesso."
        }    
    } catch (error) {
        return {
            success:false,
            errors: error instanceof Error ? error.message : "Erro inesperado ao deletar o cliente."
        }        
    }
    
}
    
