'use server'
import { CreateUsuarioInput, PerfilUsuario, UpdateUsuarioInput, UsuarioResponse } from "@/src/model/usuario/usuario-model";
import { usuarioService } from "@/src/services/usuario";
import { ActionResponse } from "@/src/types/action-response";
import { createUsuarioSchema, idUsuarioSchema, updateUsuarioInputSchema } from "@/src/validator/usuario/usuario-validator";
import z from "zod";

export async function registrarUsuarioAction(_prevState:ActionResponse , formData:FormData):Promise<ActionResponse<UsuarioResponse>>{
     const newUsuario:CreateUsuarioInput={
        nome:String(formData.get("nome")),
        email:String(formData.get("email")),
        senha:String(formData.get("senha")),
        perfil:formData.get("perfil") as PerfilUsuario
    };

    const validationUsuario = createUsuarioSchema.safeParse(newUsuario);
    if(!validationUsuario.success){
        return{
            success:false,
            errors:z.flattenError(validationUsuario.error).fieldErrors
        }
    }

    try {
        const usuario = await usuarioService.registrarUsuario(validationUsuario.data) 
        return {
            success:true,
            message:"Usuário registrado com sucesso.",
            data:usuario
        }
        
    } catch (error) {
        return{
            success:false,
            errors: error instanceof Error ? error.message : "Erro inesperado ao registrar usuário."
        }
    }
}

export async function atualizarUsuarioAction(id:number,updateUsuario:UpdateUsuarioInput):Promise<ActionResponse<UsuarioResponse>>{
    const validationId = idUsuarioSchema.safeParse(id);
    if(!validationId.success){
        return{
            success:false,
            errors:z.flattenError(validationId.error).formErrors[0]
        }
    };

    const validationUsuario = updateUsuarioInputSchema.safeParse(updateUsuario);
    if(!validationUsuario.success){
        return{
            success:false,
            errors:z.flattenError(validationUsuario.error).fieldErrors
        }
    }

    try{
        const usuario = await usuarioService.atualizarUsuario(validationId.data, validationUsuario.data);
        return {
            success:true,
            message:"Usuário atualizado com sucesso.",
            data:usuario
        }
    } catch (error) {
        return{
            success:false,
            errors: error instanceof Error ? error.message : "Erro inesperado ao atualizar usuário."
        }
    }
}

export async function deletarUsuarioAction(id:number):Promise<ActionResponse<boolean>>{
    const validationId = idUsuarioSchema.safeParse(id);
    if(!validationId.success){
        return{
            success:false,
            errors:z.flattenError(validationId.error).formErrors[0]
        }
    }

    try {
        const resultado = await usuarioService.deletarUsuario(validationId.data);
        return {
            success:true,
            message:"Usuário deletado com sucesso.",
            data:resultado
        }
    } catch (error) {
        return{
            success:false,
            errors: error instanceof Error ? error.message : "Erro inesperado ao deletar usuário."
        }
    }
}