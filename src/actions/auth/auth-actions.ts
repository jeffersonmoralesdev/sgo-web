"use server";
import { createSessao, destroySessao } from "@/src/lib/auth/session";
import { LoginInput} from "@/src/model/auth/auth-model";
import { authService } from "@/src/services/auth/index";
import { ActionResponse } from "@/src/types/action-response";
import { loginSchema } from "@/src/validator/auth/auth-validator";
import { redirect } from "next/navigation";
import z from "zod";

export async function loginAction(_prevState: ActionResponse, formData:FormData): Promise<ActionResponse> {
    
    const loginData:LoginInput ={
        email:String(formData.get("email") ?? ""),
        senha:String(formData.get("senha") ?? ""),
    }
 
    const validationLogin = loginSchema.safeParse(loginData);
    if (!validationLogin.success) {
        return {
            success: false,
            errors: z.flattenError(validationLogin.error).fieldErrors        };
    }
    
    try {
        const loginResponse = await authService.login(validationLogin.data);
        await createSessao(loginResponse);
        
    } catch (error) {
        return {
            success: false,
            errors: error instanceof Error ? error.message : "Erro inesperado ao realizar login.",
        };
    }
    redirect("/")     
}

export async function logoutAction(): Promise<void> {
  await destroySessao();
  redirect("/login")
}