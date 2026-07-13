'use server'
import { OrdemServicoError } from "@/src/errors/ordem-servico-error";
import { respostaSessaoExpiradaAction, verificarSessaoAction } from "@/src/lib/auth/auth";
import { ordensServicoService } from "@/src/services/ordem-servico";
import { ActionResponse } from "@/src/types/action-response";
import { createOrdemServicoSchema, idOrdensServicoSchema } from "@/src/validator/ordens-servico/ordens-servico-validator";
import { revalidatePath } from "next/cache";

import z from "zod";

export async function registrarOrdemServicosAction(_prevState:ActionResponse, formData:FormData ):Promise<ActionResponse<void>>{
    const sessao = await verificarSessaoAction();
    if (!sessao) return respostaSessaoExpiradaAction();

    const ordemServico = {
        descricaoProblema:formData.get("descricaoProblema"),
        observacao:formData.get("observacao"),
        veiculoId:formData.get("veiculoId"),
    }
    const ordemServicoValidation = createOrdemServicoSchema.safeParse(ordemServico);
    if(!ordemServicoValidation.success){
        return{
            success:false,
            errors:z.flattenError(ordemServicoValidation.error).fieldErrors,
            status:"WARNING",
        };
    }

    try {
        await ordensServicoService.registrarOrdemServico(ordemServicoValidation.data, sessao.id);
        return{
            success:true,
            message:"Ordem de serviço registrada com sucesso.",
            status:"SUCCESS",
        }
    
    } catch (error) {
        console.log("registrarOrdemServicosAction:: Erro ao registrar ordem serviço:",error);
        return{
            success:false,
            errors: error instanceof OrdemServicoError ? error.message : "Não foi possível cadastrar ordem de serviço no momento. Tente novamente mais tarde.",
            status:"ERROR"
        }
    }
}

export async function iniciarAvaliacaoOrdemServicoAction(ordemServicoId:number):Promise<ActionResponse<void>>{
    const sessao = await verificarSessaoAction();
    if(!sessao) return respostaSessaoExpiradaAction();

    const validationId = idOrdensServicoSchema.safeParse(ordemServicoId);
    if(!validationId.success){
        return{
            success:false,
            errors:z.flattenError(validationId.error).formErrors[0],
            status:"WARNING",
        }
    }

    try {
        await ordensServicoService.iniciarAvaliacaoOrdemServico(validationId.data, sessao.id);
        revalidatePath("/ordens-servico");
        revalidatePath(`/ordens-servico/${validationId.data}`)
        return{
            success:true,
            message: "Avaliação da ordem de serviço iniciada com sucesso.",
            status:"SUCCESS"
        }

    } catch (error) {
        console.log("iniciarAvaliacaoOrdemServicoAction:: Erro ao iniciar avaliação da ordem serviço:",error);
        return{
            success:false,
            errors: error instanceof OrdemServicoError ? error.message : "Não foi possível iniciar avaliação da ordem de serviço no momento. Tente novamente mais tarde.",
            status:"ERROR"
        }
    }
}

export async function finalizarAvaliacaoOrdemServicoAction(ordemServicoId:number):Promise<ActionResponse<void>>{
    const sessao = await verificarSessaoAction();
    if(!sessao) return respostaSessaoExpiradaAction();

    const validationId = idOrdensServicoSchema.safeParse(ordemServicoId);
    if(!validationId.success){
        return{
            success:false,
            errors:z.flattenError(validationId.error).formErrors[0],
            status:"WARNING",
        }
    }

    try {
        await ordensServicoService.iniciarAvaliacaoOrdemServico(validationId.data, sessao.id);
        revalidatePath("/ordens-servico");
        revalidatePath(`/ordens-servico/${validationId.data}`)
        return{
            success:true,
            message: "Avaliação da ordem de serviço finalizada com sucesso.",
            status:"SUCCESS"
        }

    } catch (error) {
        console.log("iniciarAvaliacaoOrdemServicoAction:: Erro ao finalizar avaliação da ordem serviço:",error);
        return{
            success:false,
            errors: error instanceof OrdemServicoError ? error.message : "Não foi possível finalizar avaliação da ordem de serviço no momento. Tente novamente mais tarde.",
            status:"ERROR"
        }
    }
}