import z from "zod";
export const loginSchema = z.object({
    email: z.email("Email inválido").trim().toLowerCase(),
    senha: z.string().min(6, "A senha deve conter pelo menos 6 caracteres"),
});